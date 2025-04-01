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

  const { favoritesData } = useData();

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
    </div>
  );
};

export default SearchPage;
