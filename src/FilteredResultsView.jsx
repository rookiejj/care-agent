import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "./DataContext";
import HospitalCard from "./HospitalCard";
import EventCard from "./EventCard";
import { Toggle } from "./Toggle"; // 토글 컴포넌트 임포트
import { Calendar } from "lucide-react"; // 이벤트 아이콘 (선택사항)
import "./FilteredResultsView.css";

// 이벤트 보기 상태를 로컬 스토리지에 저장/불러오는 함수들
const saveEventVisibilityPreference = (serviceType, value) => {
  localStorage.setItem(`showEvents_${serviceType}`, JSON.stringify(value));
};

const getEventVisibilityPreference = (serviceType) => {
  const savedValue = localStorage.getItem(`showEvents_${serviceType}`);
  if (savedValue === null) {
    // 기본값: medical은 false(이벤트 숨김), cosmetic은 true(이벤트 표시)
    return serviceType === "medical" ? false : true;
  }
  return JSON.parse(savedValue);
};

// 필터링된 결과를 보여주는 컴포넌트
const FilteredResultsView = ({ serviceType, mainCategory, subCategory }) => {
  const { favoritesData } = useData();
  const navigate = useNavigate();
  const [filteredResults, setFilteredResults] = useState([]);
  const [allResults, setAllResults] = useState([]); // 모든 결과를 저장

  // 서비스 타입별 기본값 설정 및 로컬 스토리지에서 불러오기
  const [showEvents, setShowEvents] = useState(() =>
    getEventVisibilityPreference(serviceType)
  );

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

  // 서비스 타입이 변경될 때 해당 타입의 이벤트 보기 설정 불러오기
  useEffect(() => {
    setShowEvents(getEventVisibilityPreference(serviceType));
  }, [serviceType]);

  // 필터링 로직
  useEffect(() => {
    // 선택된 카테고리에 따라 데이터 필터링
    const results = filterByCategory(
      favoritesData,
      serviceType,
      mainCategory,
      subCategory
    );
    setAllResults(results); // 모든 결과 저장

    // 이벤트 토글 상태에 따라 최종 결과 필터링
    if (showEvents) {
      setFilteredResults(results); // 이벤트 포함 모든 결과 표시
    } else {
      setFilteredResults(results.filter((item) => !item.isEvent)); // 이벤트 제외
    }
  }, [serviceType, mainCategory, subCategory, favoritesData, showEvents]);

  // 이벤트 토글 핸들러
  const handleToggleEvents = () => {
    const newShowEvents = !showEvents;
    setShowEvents(newShowEvents);
    // 로컬 스토리지에 설정 저장
    saveEventVisibilityPreference(serviceType, newShowEvents);
  };

  // 이벤트 항목 수 계산
  const eventCount = allResults.filter((item) => item.isEvent).length;

  return (
    <div className="filtered-results-view-container">
      <div className="results-header">
        <h4>
          {serviceType === "medical" ? "검색 결과" : "검색 결과"} (
          {filteredResults.length}/{allResults.length}건)
        </h4>
        <div className="events-toggle">
          <span className="toggle-label">이벤트 보기 ({eventCount})</span>
          <Toggle
            checked={showEvents}
            onChange={handleToggleEvents}
            size="small"
            serviceType={serviceType}
          />
        </div>
      </div>

      {filteredResults.length > 0 ? (
        <div className="results-list">
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
      ) : (
        <div className="no-results">
          <div className="no-results-message">
            <p>선택하신 카테고리에 해당하는 항목이 없습니다.</p>
            <p className="no-results-sub">다른 카테고리를 선택해보세요.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilteredResultsView;
