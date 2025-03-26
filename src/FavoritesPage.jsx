import React, { useState, useRef, useEffect } from "react";
import { useData } from "./DataContext";
import { PageHeader } from "./App";
import { Heart } from "lucide-react";
import EventCard from "./EventCard";
import HospitalCard from "./HospitalCard";

import "./FavoritesPage.css";

const FavoritesPage = ({ currentLocation, notificationCount }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");

  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const tabsRef = useRef(null);

  const { favoritesData } = useData();

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const containerElement = containerRef.current;
    const contentElement = contentRef.current;
    const headerElement = headerRef.current;
    const tabsElement = tabsRef.current;

    if (!containerElement || !contentElement || !headerElement || !tabsElement)
      return;

    let headerHeight = headerElement.offsetHeight;
    let lastScrollY = 0;
    let ticking = false;

    // 초기 상태 설정
    tabsElement.style.top = `${headerHeight}px`;

    const handleScroll = () => {
      const scrollY = contentElement.scrollTop;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // 헤더 애니메이션
          if (scrollY <= 0) {
            // 스크롤이 최상단일 때
            headerElement.style.transform = "translateY(0)";
          } else if (scrollY <= headerHeight) {
            // 헤더 영역 내에서 스크롤 중
            const translateY = -scrollY * 7;
            headerElement.style.transform = `translateY(${translateY}px)`;
          } else {
            // 헤더 영역을 벗어난 스크롤
            headerElement.style.transform = `translateY(-${headerHeight}px)`;
          }

          // 탭 애니메이션
          if (scrollY <= headerHeight) {
            // 헤더가 보이는 영역
            tabsElement.style.position = "absolute";
            tabsElement.style.top = `${headerHeight}px`;
            tabsElement.style.transform = "translateY(0)";
          } else {
            // 헤더가 완전히 올라간 영역
            tabsElement.style.position = "fixed";
            tabsElement.style.top = "0";
            tabsElement.style.width = `${containerElement.offsetWidth}px`;
            tabsElement.style.transform = "translateY(0)";
          }

          lastScrollY = scrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    // 이벤트 리스너 등록
    contentElement.addEventListener("scroll", handleScroll, { passive: true });

    // 윈도우 리사이즈 이벤트
    const handleResize = () => {
      headerHeight = headerElement.offsetHeight;
      tabsElement.style.width = `${containerElement.offsetWidth}px`;
      handleScroll(); // 리사이즈 후 스크롤 상태 업데이트
    };

    window.addEventListener("resize", handleResize);

    // 초기 높이 설정
    headerHeight = headerElement.offsetHeight;
    handleScroll();

    return () => {
      contentElement.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 탭 변경 핸들러
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // 스크롤을 맨 위로 올림
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // 필터 변경 핸들러
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    // 스크롤을 맨 위로 올림
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
      return true;
    } else if (activeFilter === "rating") {
      return true;
    }
    return true;
  });

  // 추가 정렬 적용
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
    <div ref={containerRef} className="container">
      {/* 헤더 영역 - fixed 포지셔닝 */}
      <header ref={headerRef} className="favorites-page-header">
        <PageHeader
          title="찜 목록"
          showLocationButton={true}
          currentLocation={currentLocation}
          backButtonVisible={false}
          notificationCount={notificationCount}
          showNotification={true}
        />
      </header>

      {/* 스크롤 가능한 콘텐츠 영역 */}
      <div ref={contentRef} className="favorites-content">
        {/* 탭/필터 영역 - 동적 포지셔닝 */}
        <div ref={tabsRef} className="favorites-tabs-container">
          {/* 탭 네비게이션 */}
          <div className="favorites-tabs">
            <button
              className={`favorites-tab ${activeTab === "all" ? "active" : ""}`}
              onClick={() => handleTabChange("all")}
            >
              전체
            </button>
            <button
              className={`favorites-tab ${
                activeTab === "medical" ? "active" : ""
              }`}
              onClick={() => handleTabChange("medical")}
            >
              진료
            </button>
            <button
              className={`favorites-tab ${
                activeTab === "cosmetic" ? "active" : ""
              }`}
              onClick={() => handleTabChange("cosmetic")}
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
                onClick={() => handleFilterChange(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* 리스트 영역 - 탭 아래에 위치 */}
        <div className="favorites-list">
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
    </div>
  );
};

export default FavoritesPage;
