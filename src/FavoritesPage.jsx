import React, { useState } from "react";
import { useData } from "./DataContext";
import { PageHeader } from "./App";
import { Heart } from "lucide-react";
import EventCard from "./EventCard";
import HospitalCard from "./HospitalCard";

import "./FavoritesPage.css";

const FavoritesPage = ({ currentLocation, notificationCount }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");

  const { favoritesData } = useData();

  // 탭에 따른 필터링
  const filteredByTab =
    activeTab === "all"
      ? favoritesData
      : favoritesData.filter((item) => item.type === activeTab);

  // 필터에 따른 추가 필터링
  const filteredItems = filteredByTab.filter((item) => {
    if (activeFilter === "all") {
      return true;
    } else if (activeFilter === "event") {
      return item.isEvent === true;
    } else if (activeFilter === "nearby") {
      return true; // 여기서는 필터링만 보여주기 위해 모든 항목 반환
    } else if (activeFilter === "rating") {
      return true; // 여기서는 필터링만 보여주기 위해 모든 항목 반환
    }
    return true;
  });

  // 추가 정렬 적용 (필요한 경우)
  if (activeFilter === "nearby") {
    filteredItems.sort(
      (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
    );
  } else if (activeFilter === "rating") {
    filteredItems.sort((a, b) => b.rating - a.rating);
  }

  // 필터 옵션
  const filterOptions = [
    { id: "all", label: "전체" },
    { id: "event", label: "이벤트" },
    { id: "nearby", label: "가까운 순" },
    { id: "rating", label: "평점 높은 순" },
  ];

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
          {/* 탭 네비게이션 */}
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

          {/* 필터 옵션 */}
          <div className="favorites-filters">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                className={`filter-chip ${
                  activeFilter === filter.id ? "active" : ""
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="content">
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
