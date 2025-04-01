import React, { useState, useEffect } from "react";
import { useData } from "./DataContext";
import { PageHeader } from "./App";
import { Search } from "lucide-react";
import EventCard from "./EventCard";
import HospitalCard from "./HospitalCard";
import SearchBar from "./SearchBar";
import CategoryFilterButtons from "./CategoryFilterButtons";
import MedicalCategories from "./MedicalCategories";
import CosmeticCategories from "./CosmeticCategories";

import "./SearchPage.css";

const SearchPage = ({ currentLocation, notificationCount }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [filters, setFilters] = useState({ medical: true, cosmetic: true });
  const [showKeyboardHint, setShowKeyboardHint] = useState(false);

  const { favoritesData } = useData();

  // 페이지 로드 시 실행
  useEffect(() => {
    // 메인 페이지에서 검색창 클릭으로 이동했는지 확인
    const redirectFlag = localStorage.getItem("searchRedirectFlag");

    if (redirectFlag === "true") {
      // 플래그 재설정
      localStorage.removeItem("searchRedirectFlag");

      // iOS 기기 확인
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

      // 타이머 설정 - 페이지 전환 애니메이션 완료 후 실행
      setTimeout(() => {
        // SearchBar 내부 input 엘리먼트를 직접 가져옴
        const searchInput = document.querySelector(".header-function input");

        if (searchInput) {
          // 포커스 시도
          searchInput.focus();

          // iOS에서는 키보드 표시 힌트 활성화 (사용자가 한 번 탭하도록 유도)
          if (isIOS) {
            setShowKeyboardHint(true);

            // 5초 후 힌트 숨김
            setTimeout(() => {
              setShowKeyboardHint(false);
            }, 5000);
          }
        }
      }, 600);
    }
  }, []);

  // Filter items when search term or filters change
  useEffect(() => {
    // 검색어가 비어있으면 빈 배열로 설정
    if (searchTerm.trim() === "") {
      setFilteredItems([]);
      return;
    }

    // 검색어가 있는 경우 필터링 진행
    let filtered = favoritesData || [];

    // Filter by type (medical or cosmetic)
    filtered = filtered.filter(
      (item) =>
        (filters.medical && item.type === "medical") ||
        (filters.cosmetic && item.type === "cosmetic")
    );

    // Filter by search term
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.title?.toLowerCase().includes(term) ||
        item.description?.toLowerCase().includes(term) ||
        (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(term)))
    );

    setFilteredItems(filtered);
  }, [searchTerm, filters, favoritesData]);

  // Handle search action - 항상 현재 입력값을 반영하도록 개선
  const handleSearch = (term) => {
    setSearchTerm(term || ""); // null이나 undefined인 경우 빈 문자열로 처리
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="container">
      <div className="fixed-header">
        <PageHeader
          title="검색"
          showLocationButton={true}
          currentLocation={currentLocation}
          backButtonVisible={false}
          notificationCount={notificationCount}
          showNotification={true}
        />
        <div className="header-function">
          <SearchBar
            onSearch={handleSearch}
            initialValue={searchTerm}
            shouldAutoFocus={true}
          />

          {/* Category Filter Buttons - keeping original bubble style */}
          <CategoryFilterButtons onFilterChange={handleFilterChange} />

          {/* iOS에서 키보드 표시 힌트 (선택적) */}
          {showKeyboardHint && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(0,0,0,0.7)",
                color: "white",
                padding: "8px 12px",
                borderRadius: "8px",
                fontSize: "13px",
                marginTop: "10px",
                zIndex: 100,
                animation: "pulse 1.5s infinite",
              }}
            >
              검색창을 탭하여 키보드 열기
            </div>
          )}
        </div>
      </div>
      <div className="content">
        {/* Search results */}
        {filteredItems.length === 0 ? (
          searchTerm.trim() === "" ? (
            <div className="section-container">
              <div className="section-header">
                <h3 className="section-title">자주 찾는</h3>
              </div>
              <MedicalCategories />
              <div style={{ padding: "0.5rem 0.5rem" }}>
                <div
                  style={{
                    width: "100%",
                    borderBottom: "1px solid #eee",
                  }}
                />
              </div>
              <CosmeticCategories />
            </div>
          ) : (
            <div className="search-empty">
              {/* <Search size={40} color="#e5e7eb" strokeWidth={1.5} /> */}
              <p style={{ marginTop: "1rem" }}>검색 결과가 없습니다</p>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#9ca3af",
                  marginTop: "0.5rem",
                }}
              >
                다른 검색어를 입력하거나 필터를 변경해보세요
              </p>
            </div>
          )
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

      {/* iOS에서 키보드 열기를 위한 CSS 애니메이션 */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.8; }
            50% { opacity: 1; }
            100% { opacity: 0.8; }
          }
        `}
      </style>
    </div>
  );
};

export default SearchPage;
