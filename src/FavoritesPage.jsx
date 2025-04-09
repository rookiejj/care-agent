import React, { useState } from "react";
import { useData } from "./DataContext";
import { PageHeader } from "./App";
import { Heart } from "lucide-react";
import EventCard from "./EventCard";
import HospitalCard from "./HospitalCard";
import OptionFilterButtons from "./OptionFilterButtons";

import "./FavoritesPage.css";

const FavoritesPage = ({ currentLocation, notificationCount }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [optionFilter, setOptionFilter] = useState("all");

  const { favoritesData } = useData();

  // 탭에 따른 필터링 (전체/진료/시술)
  const filteredByTab =
    activeTab === "all"
      ? favoritesData
      : favoritesData.filter((item) => item.type === activeTab);

  // 옵션 필터에 따른 필터링 및 정렬 적용
  const applyOptionFilter = (items, filter) => {
    let result = [...items]; // 배열 복사

    // 필터 적용
    if (filter === "event") {
      result = result.filter((item) => item.isEvent === true);
    }

    // 정렬 적용
    if (filter === "recent") {
      // id 기준으로 내림차순 정렬 (가장 최근 = 가장 높은 ID)
      result.sort((a, b) => b.id - a.id);
    } else if (filter === "nearby") {
      // 거리 기준으로 오름차순 정렬
      result.sort((a, b) => {
        const distanceA = parseFloat(a.distance);
        const distanceB = parseFloat(b.distance);
        return distanceA - distanceB;
      });
    } else if (filter === "rating") {
      // 평점 기준으로 내림차순 정렬
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  };

  // 옵션 필터 적용
  const filteredItems = applyOptionFilter(filteredByTab, optionFilter);

  // 옵션 필터 변경 핸들러
  const handleOptionFilterChange = (newFilter) => {
    setOptionFilter(newFilter);
  };

  return (
    <div className="container">
      <div className="fixed-header">
        <PageHeader
          title="찜 목록"
          showLocationButton={true}
          currentLocation={currentLocation}
          backButtonVisible={false}
          notificationCount={notificationCount}
          showNotification={true}
        />
        <div className="header-function">
          {/* 탭 네비게이션 (전체/진료/시술) */}
          <div className="favorites-tabs">
            <button
              className={`favorites-tab ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              전체
            </button>
            <button
              className={`favorites-tab ${
                activeTab === "medical" ? "active" : ""
              }`}
              onClick={() => setActiveTab("medical")}
            >
              진료
            </button>
            <button
              className={`favorites-tab ${
                activeTab === "cosmetic" ? "active" : ""
              }`}
              onClick={() => setActiveTab("cosmetic")}
            >
              시술
            </button>
          </div>

          {/* 옵션 필터 버튼 */}
          <OptionFilterButtons
            onFilterChange={handleOptionFilterChange}
            initialFilter={optionFilter}
          />
        </div>
      </div>
      <div className="content" style={{ marginTop: "1rem" }}>
        {/* 찜 목록 아이템 */}
        {filteredItems.length === 0 ? (
          <div className="favorites-empty">
            <Heart size={40} color="#e5e7eb" strokeWidth={1.5} />
            <p style={{ marginTop: "1rem" }}>찜한 항목이 없습니다</p>
            <p
              style={{
                fontSize: "0.85rem",
                color: "#9ca3af",
                marginTop: "0.5rem",
              }}
            >
              관심 있는 병원이나 시술을 찜해보세요
            </p>
          </div>
        ) : (
          filteredItems.map((item) =>
            item.isEvent ? (
              <EventCard key={item.id} item={item} />
            ) : (
              <HospitalCard key={item.id} item={item} />
            )
          )
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
