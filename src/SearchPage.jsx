import React, { useState, useEffect } from "react";
import { useData } from "./DataContext";
import { PageHeader } from "./App";
import EventCard from "./EventCard";
import HospitalCard from "./HospitalCard";
import SearchBar from "./SearchBar";
import CategoryFilterButtons from "./CategoryFilterButtons";
import RecentSearches from "./RecentSearches";
import PopularSearches from "./PopularSearches";
import PromotionBanners from "./PromotionBanners";

import "./SearchPage.css";

const SearchPage = ({ currentLocation, notificationCount }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [filters, setFilters] = useState({ medical: true, cosmetic: true });
  const [recentSearches, setRecentSearches] = useState([]);

  const { favoritesData } = useData();

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (e) {
        console.error("Error parsing recent searches:", e);
        setRecentSearches([]);
      }
    }
  }, []);

  // Save recent searches to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Filter items when search term or filters change
  useEffect(() => {
    // 검색어가 비어있으면 빈 배열로 설정
    if (searchTerm.trim() === "") {
      setFilteredItems([]);
      return;
    }

    // 검색어가 있는 경우 필터링 진행
    let filtered = favoritesData;

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
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(term)))
    );

    setFilteredItems(filtered);
  }, [searchTerm, filters, favoritesData]);

  // Handle search action and add to recent searches
  const handleSearch = (term) => {
    if (term.trim() !== "") {
      // Add to recent searches if it's not empty
      addToRecentSearches(term);
    }
    setSearchTerm(term);
  };

  // Add a search term to recent searches
  const addToRecentSearches = (term) => {
    const trimmedTerm = term.trim();
    if (trimmedTerm === "") return;

    // Remove if it already exists to avoid duplicates
    const updatedSearches = recentSearches.filter(
      (search) => search.toLowerCase() !== trimmedTerm.toLowerCase()
    );

    // Add to the beginning of the array and limit to 10 items
    setRecentSearches([trimmedTerm, ...updatedSearches].slice(0, 10));
  };

  // Handle recent search term click
  const handleRecentSearchClick = (term) => {
    setSearchTerm(term);
    addToRecentSearches(term); // Move to top of list
  };

  // Handle popular search term click
  const handlePopularSearchClick = (term) => {
    setSearchTerm(term);
    addToRecentSearches(term);
  };

  // Remove a single search term
  const handleClearOne = (term) => {
    setRecentSearches(recentSearches.filter((search) => search !== term));
  };

  // Clear all recent searches
  const handleClearAll = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // 검색결과가 없거나 검색어가 없을 때 인기 검색어를 표시할지 여부
  const showPopularSearches =
    searchTerm.trim() === "" || filteredItems.length === 0;

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
          <SearchBar onSearch={handleSearch} initialValue={searchTerm} />

          {/* Category Filter Buttons - keeping original bubble style */}
          <CategoryFilterButtons onFilterChange={handleFilterChange} />
        </div>
      </div>
      <div className="content" style={{ marginTop: "0.5rem" }}>
        {/* Search results */}
        {filteredItems.length === 0 ? (
          searchTerm.trim() === "" ? (
            <>
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <RecentSearches
                  searches={recentSearches}
                  onSearchClick={handleRecentSearchClick}
                  onClearOne={handleClearOne}
                  onClearAll={handleClearAll}
                />
              )}

              {/* 인기 검색어 */}
              {showPopularSearches && (
                <PopularSearches onSearchClick={handlePopularSearchClick} />
              )}

              <div className="section-container">
                <PromotionBanners />
              </div>
            </>
          ) : (
            <>
              <div className="search-empty">
                {/* <Search size={40} color="#e5e7eb" strokeWidth={1.5} /> */}
                <p style={{ marginTop: "1rem" }}>검색 결과가 없습니다</p>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#9ca3af",
                    marginTop: "0.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  다른 검색어를 입력하거나 필터를 변경해보세요
                </p>
              </div>

              {/* 검색 결과가 없을 때도 최근 검색어 표시 */}
              {recentSearches.length > 0 && (
                <RecentSearches
                  searches={recentSearches}
                  onSearchClick={handleRecentSearchClick}
                  onClearOne={handleClearOne}
                  onClearAll={handleClearAll}
                />
              )}

              {/* 검색 결과가 없을 때도 인기 검색어 표시 */}
              {showPopularSearches && (
                <PopularSearches onSearchClick={handlePopularSearchClick} />
              )}

              <div className="section-container">
                <PromotionBanners />
              </div>
            </>
          )
        ) : (
          /* 검색 결과가 있을 때는 인기 검색어를 표시하지 않음 */
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
