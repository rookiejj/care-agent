import React, { useState } from "react";
import { PageHeader, getHospitalImage } from "./App";
import {
  Heart,
  MessageCircle,
  Clock,
  Check,
  Calendar,
  X,
  MapPin,
} from "lucide-react";
import "./FavoritesPage.css";

const FavoritesPage = ({ currentLocation, notificationCount }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [activeFilter, setActiveFilter] = useState("all");

  // 찜 목록 데이터 (실제 구현시 props나 context로 받아오거나 API 호출)
  const favoritesData = [
    {
      id: 1,
      type: "medical",
      title: "서울 연세 내과",
      image: getHospitalImage("all", 1),
      subtitle: "심장내과 전문 병원",
      rating: 4.8,
      reviewCount: 124,
      description: "내과 종합검진 20% 할인 이벤트 진행 중. 건강보험 검진 가능.",
      tags: ["내과", "검진", "할인 이벤트"],
      price: "검진 비용 문의",
      location: "서울시 강남구",
      distance: "2.3km",
      isEvent: true,
      eventPeriod: "3.25 - 4.30",
      eventContent: "종합검진 패키지 특별 할인",
      originalPrice: "150,000원",
      discountPrice: "120,000원",
      discountRate: "20%",
    },
    {
      id: 2,
      type: "cosmetic",
      title: "뷰티 클리닉 센터",
      image: getHospitalImage("all", 2),
      subtitle: "피부 관리 전문",
      rating: 4.6,
      reviewCount: 86,
      description: "개인 맞춤형 피부 관리 프로그램. 첫 방문 고객 상담료 무료.",
      tags: ["피부 관리", "레이저", "할인 이벤트"],
      price: "시술 60,000원~",
      location: "서울시 마포구",
      distance: "1.5km",
      isEvent: true,
      eventPeriod: "3.15 - 4.15",
      eventContent: "첫 방문 고객 상담료 무료",
      originalPrice: "60,000원",
      discountPrice: "무료 (상담)",
      discountRate: "100%",
    },
    {
      id: 3,
      type: "medical",
      title: "김연아 정형외과",
      image: getHospitalImage("all", 3),
      subtitle: "관절 전문",
      rating: 4.9,
      reviewCount: 213,
      description: "관절 통증이나 스포츠 손상에 특화된 클리닉. 예약 필수.",
      tags: ["정형외과", "관절", "스포츠"],
      price: "진료비 5,000원~",
      location: "서울시 서초구",
      distance: "3.7km",
      isEvent: false,
    },
    {
      id: 4,
      type: "cosmetic",
      title: "라인 성형외과",
      image: getHospitalImage("all", 4),
      subtitle: "안면윤곽 전문",
      rating: 4.7,
      reviewCount: 156,
      description: "개인별 맞춤 안면윤곽 디자인. 상담 예약 후 방문 필수.",
      tags: ["성형외과", "안면윤곽"],
      price: "상담 무료",
      location: "서울시 강남구",
      distance: "0.8km",
      isEvent: false,
    },
  ];

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

  // 일반 병원 카드 컴포넌트
  const RegularHospitalCard = ({ item }) => (
    <div className="card" style={{ marginBottom: "1rem" }}>
      <div className="favorites-item-header">
        <img
          src={item.image}
          alt={item.title}
          className="favorites-item-image"
        />
        <div className="favorites-item-info">
          <h3 className="favorites-item-title">{item.title}</h3>
          <p className="favorites-item-subtitle">{item.subtitle}</p>
          <div className="favorites-item-rating">
            <div className="favorites-item-rating-stars">★★★★★</div>
            <span className="favorites-item-rating-value">{item.rating}</span>
            <span className="favorites-item-rating-count">
              ({item.reviewCount})
            </span>
          </div>
        </div>
      </div>
      <div className="favorites-item-body">
        <p className="favorites-item-description">{item.description}</p>
        <div className="favorites-item-tags">
          <span className={`tag tag-${item.type}`}>
            {item.type === "medical" ? "진료" : "시술"}
          </span>
          {item.tags.map((tag, index) => (
            <span
              key={index}
              className="tag"
              style={{ backgroundColor: "#f3f4f6", color: "#6b7280" }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.8rem",
            color: "#6b7280",
          }}
        >
          <span>{item.location}</span>
          <span>{item.distance}</span>
        </div>
      </div>
      <div className="favorites-item-footer">
        <div className="favorites-item-price">{item.price}</div>
        <div className="favorites-item-actions">
          <button className="favorites-action-button" aria-label="예약">
            <Calendar size={18} />
          </button>
          <button className="favorites-action-button" aria-label="문의">
            <MessageCircle size={18} />
          </button>
          <button
            className="favorites-action-button danger"
            aria-label="찜 삭제"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  // 이벤트 카드 컴포넌트
  const EventCard = ({ item }) => (
    <div className="card" style={{ marginBottom: "1rem" }}>
      {/* 이미지 */}
      <img
        src={item.image}
        alt={item.title}
        style={{ width: "100%", height: "160px", objectFit: "cover" }}
      />

      {/* 이벤트 내용 */}
      <div>
        {/* 이벤트 제목 - 눈에 띄게 */}
        <h4
          style={{
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#1f2937",
            margin: "0.5rem 0",
          }}
        >
          {item.eventContent}
        </h4>

        {/* 가격 정보와 할인율 */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginBottom: "12px",
          }}
        >
          <span
            style={{
              color: "#9ca3af",
              fontSize: "0.875rem",
              textDecoration: "line-through",
              marginRight: "8px",
            }}
          >
            {item.originalPrice}
          </span>
          <span
            style={{
              color: "#ef4444",
              fontWeight: "bold",
              fontSize: "1.125rem",
              marginRight: "8px",
            }}
          >
            {item.discountPrice}
          </span>
          <span
            style={{
              backgroundColor: "#fee2e2",
              color: "#ef4444",
              fontSize: "0.75rem",
              fontWeight: "600",
              padding: "2px 8px",
              borderRadius: "4px",
            }}
          >
            {item.discountRate} 할인
          </span>
        </div>

        {/* 이벤트 기간 */}
        <div style={{ marginBottom: "12px" }}>
          <span
            style={{
              backgroundColor: "#dbeafe",
              color: "#1d4ed8",
              fontSize: "0.75rem",
              fontWeight: "500",
              padding: "2px 8px",
              borderRadius: "9999px",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <Clock size={12} style={{ marginRight: "4px" }} />{" "}
            {item.eventPeriod}
          </span>
        </div>

        {/* 태그 - 병원 카드와 동일한 스타일 */}
        <div className="favorites-item-tags" style={{ marginBottom: "12px" }}>
          <span className={`tag tag-${item.type}`}>
            {item.type === "medical" ? "진료" : "시술"}
          </span>
          <span className="tag tag-event">이벤트</span>
        </div>

        {/* 병원 이름과 위치 - 덜 중요하게 */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.75rem",
            color: "#6b7280",
            marginBottom: "12px",
            borderTop: "1px solid #f3f4f6",
            paddingTop: "12px",
          }}
        >
          <span style={{ fontWeight: "500" }}>{item.title}</span>
          <span style={{ display: "flex", alignItems: "center" }}>
            <MapPin size={10} style={{ marginRight: "4px" }} /> {item.location}
          </span>
        </div>

        {/* 버튼 영역 */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            paddingTop: "4px",
          }}
        >
          <button
            style={{
              flex: 1,
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "8px 0",
              borderRadius: "8px",
              fontSize: "0.875rem",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
            }}
          >
            <Calendar size={16} style={{ marginRight: "4px" }} /> 예약하기
          </button>
          <button
            style={{
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              backgroundColor: "#fee2e2",
              color: "#ef4444",
              border: "none",
            }}
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container">
      <PageHeader
        title="찜 목록"
        showLocationButton={true}
        currentLocation={currentLocation}
        backButtonVisible={false}
        notificationCount={notificationCount}
        showNotification={true}
      />
      <div className="content" style={{ marginBottom: "3rem" }}>
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
              <RegularHospitalCard key={item.id} item={item} />
            )
          )
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
