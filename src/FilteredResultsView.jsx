import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "./DataContext";
import HospitalCard from "./HospitalCard";
import EventCard from "./EventCard";
import "./FilteredResultsView.css";

// 필터링된 결과를 보여주는 컴포넌트
const FilteredResultsView = ({ serviceType, mainCategory, subCategory }) => {
  const { favoritesData } = useData();
  const navigate = useNavigate();
  const [filteredResults, setFilteredResults] = useState([]);

  const testRef = useRef(null);

  // 카테고리별 필터링 함수 구현
  const filterByCategory = (
    data,
    serviceType,
    mainCategory = null,
    subCategory = null
  ) => {
    let filtered = data.filter((item) => item.type === serviceType);

    if (mainCategory) {
      filtered = filtered.filter((item) => item.mainCategory === mainCategory);

      if (subCategory) {
        filtered = filtered.filter((item) => item.subCategory === subCategory);
      }
    }

    return filtered;
  };

  useEffect(() => {
    // 선택된 카테고리에 따라 데이터 필터링
    const results = filterByCategory(
      favoritesData,
      serviceType,
      mainCategory,
      subCategory
    );
    setFilteredResults(results);
  }, [serviceType, mainCategory, subCategory, favoritesData]);

  // 결과 항목 클릭 처리
  const handleItemClick = (item) => {
    // 상세 페이지로 이동 (구현 예시)
    navigate(`/detail/${item.type}/${item.id}`, { state: { item } });
  };

  // 검색 결과가 없을 때 표시할 내용
  if (filteredResults.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results-message">
          <p>선택하신 카테고리에 해당하는 항목이 없습니다.</p>
          <p className="no-results-sub">다른 카테고리를 선택해보세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="filtered-results-view-container">
      <h4>
        {serviceType === "medical" ? "진료 결과" : "시술 결과"} (
        {filteredResults.length}건)
      </h4>

      {filteredResults.map((item) => (
        <div key={item.id}>
          {item.isEvent ? (
            <div>
              <EventCard key={item.id} item={item} />
            </div>
          ) : (
            <HospitalCard key={item.id} item={item} />
          )}
        </div>
      ))}
    </div>
  );
};

export default FilteredResultsView;
