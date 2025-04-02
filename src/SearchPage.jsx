import React, { useState, useEffect } from "react";
import { useData } from "./DataContext";
import { PageHeader } from "./App";
import EventCard from "./EventCard";
import HospitalCard from "./HospitalCard";
import SearchBar from "./SearchBar";
import CategoryFilterButtons from "./CategoryFilterButtons";
import RecentSearches from "./RecentSearches";

import "./SearchPage.css";

const SearchPage = ({ currentLocation, notificationCount }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [filters, setFilters] = useState({ medical: true, cosmetic: true });
  const [recentSearches, setRecentSearches] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  const { favoritesData } = useData();

  // 컴포넌트가 마운트되었음을 표시
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // iOS 탐지 함수
  const isIOS = () => {
    return (
      ["iPad", "iPhone", "iPod"].includes(navigator.platform) ||
      (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    );
  };

  // 입력 필드에 강제로 포커스 및 키보드 표시
  const forceKeyboardOpen = () => {
    // Hidden input technique for iOS
    const hiddenInput = document.createElement("input");
    hiddenInput.setAttribute("type", "text");
    hiddenInput.style.position = "absolute";
    hiddenInput.style.opacity = 0;
    hiddenInput.style.height = "0px";
    hiddenInput.style.fontSize = "16px"; // iOS에서 16px 이상이면 줌 없이 키보드가 나타남

    // 문서에 추가
    document.body.appendChild(hiddenInput);

    // 포커스 및 클릭
    hiddenInput.focus();

    // 짧은 시간 후 실제 검색창으로 포커스 이동
    setTimeout(() => {
      const searchInput = document.getElementById("search-bar-input");
      if (searchInput) {
        searchInput.focus();
        searchInput.click();
      }

      // 임시 입력 필드 제거
      document.body.removeChild(hiddenInput);
    }, 100);
  };

  // 페이지 로드 시 iOS에 최적화된 키보드 표시 처리
  useEffect(() => {
    if (!isMounted) return;

    // iOS 디바이스에 특화된 처리
    if (isIOS()) {
      // 여러 번 시도하여 키보드가 확실히 표시되도록 함
      const timers = [
        setTimeout(forceKeyboardOpen, 300),
        setTimeout(forceKeyboardOpen, 500),
        setTimeout(forceKeyboardOpen, 800),
        setTimeout(forceKeyboardOpen, 1000),
        setTimeout(forceKeyboardOpen, 1500),
      ];

      return () => timers.forEach((timer) => clearTimeout(timer));
    } else {
      // iOS가 아닌 기기에서는 간단한 포커스만 적용
      const timer = setTimeout(() => {
        const searchInput = document.getElementById("search-bar-input");
        if (searchInput) searchInput.focus();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isMounted]);

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

  // 검색창을 클릭했을 때 수동으로 키보드 올리기
  const handleSearchBarAreaClick = () => {
    if (isIOS()) {
      forceKeyboardOpen();
    } else {
      const searchInput = document.getElementById("search-bar-input");
      if (searchInput) searchInput.focus();
    }
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
        <div className="header-function" onClick={handleSearchBarAreaClick}>
          <SearchBar
            onSearch={handleSearch}
            initialValue={searchTerm}
            forceKeyboard={true}
            shouldAutoFocus={true}
          />

          {/* Category Filter Buttons */}
          <CategoryFilterButtons onFilterChange={handleFilterChange} />
        </div>
      </div>
      <div className="content">
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
            </>
          ) : (
            <>
              <div className="search-empty">
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
            </>
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
