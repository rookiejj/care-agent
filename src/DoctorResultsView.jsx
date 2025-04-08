import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "./DataContext";
import DoctorCard from "./DoctorCard";
import { filterDoctors } from "./doctorFilterHelper";
import "./FilteredResultsView.css"; // 같은 스타일 재사용

/**
 * 의사 검색 결과를 표시하는 간소화된 컴포넌트
 * @param {string} specialty - 의사 전문 과목 (예: "neurology", "cardiology")
 * @param {string} mainCategory - 증상 메인 카테고리 (예: "head", "chest")
 * @param {string} subCategory - 증상 서브 카테고리 (예: "head-pain", "chest-pain")
 */
const DoctorResultsView = ({
  specialty,
  mainCategory,
  subCategory,
  filter = "all",
}) => {
  const { doctorsData } = useData();
  const navigate = useNavigate();
  const [filteredResults, setFilteredResults] = useState([]);

  // 디버깅용 로그
  useEffect(() => {
    console.log("DoctorResultsView props:", {
      specialty,
      mainCategory,
      subCategory,
    });
    console.log("doctorsData type:", typeof doctorsData);
    console.log(
      "doctorsData keys:",
      doctorsData ? Object.keys(doctorsData) : "undefined"
    );
  }, [specialty, mainCategory, subCategory, doctorsData]);

  // 의사 데이터 필터링
  // 의사 데이터 필터링 useEffect 내부 (약 라인 25)
  useEffect(() => {
    // 기존의 filterDoctors 함수를 사용하여 의사 데이터 필터링
    const results = filterDoctors(doctorsData, {
      specialty,
      mainCategory,
      subCategory,
    });

    // 필터에 따라 결과 정렬 (이 부분이 중요)
    let sortedResults = [...results];

    switch (filter) {
      case "rating":
        // 평점 높은 순 정렬
        sortedResults.sort((a, b) => b.rating - a.rating);
        break;
      case "recent":
        // 경력이 적은 순(최신 의사) 정렬
        sortedResults.sort((a, b) => a.experience - b.experience);
        break;
      case "reviews":
        // 리뷰 많은 순 정렬
        sortedResults.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // 기본 정렬(all): 평점과 리뷰 수를 종합적으로 고려
        sortedResults.sort(
          (a, b) =>
            b.rating * Math.log(b.reviewCount + 1) -
            a.rating * Math.log(a.reviewCount + 1)
        );
        break;
    }

    setFilteredResults(sortedResults);
  }, [specialty, mainCategory, subCategory, filter, doctorsData]); // filter 의존성 추가

  // 의사 카드 클릭 처리
  const handleDoctorClick = (doctor) => {
    navigate(`/doctor/${doctor.id}`, { state: { doctor } });
  };

  return (
    <div className="filtered-results-view-container">
      <div className="results-header">
        <h4>의사 검색 결과 ({filteredResults.length}건)</h4>
      </div>

      {filteredResults.length > 0 ? (
        <div className="results-list">
          {filteredResults.map((doctor) => (
            <div key={doctor.id} onClick={() => handleDoctorClick(doctor)}>
              <DoctorCard item={doctor} />
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <div className="no-results-message">
            <p>선택하신 조건에 맞는 의사가 없습니다.</p>
            <p className="no-results-sub">다른 조건으로 검색해보세요.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorResultsView;
