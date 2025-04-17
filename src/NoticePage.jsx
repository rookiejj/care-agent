import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "./App";
import {
  AlertCircle,
  Calendar,
  ChevronRight,
  Search,
  Speaker,
  Bell,
  Info,
  Tag,
} from "lucide-react";
import "./SettingsPages.css";

const NoticePage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [notices, setNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNotice, setSelectedNotice] = useState(null);

  useEffect(() => {
    // 실제 구현에서는 API에서 공지사항을 가져오는 로직이 들어갈 것입니다.
    // 여기서는 더미 데이터로 대체합니다.
    const dummyNotices = [
      {
        id: 1,
        category: "service",
        title: "서비스 개편 안내",
        content:
          "안녕하세요. 서비스 개편 사항을 안내드립니다. 2025년 5월 1일부터 예약 시스템이 개선되어 더욱 편리하게 이용하실 수 있습니다.\n\n주요 개선 사항은 다음과 같습니다.\n\n1. 실시간 예약 확인 시스템 도입\n2. 의사별 상세 프로필 및 전문 분야 정보 강화\n3. 예약 변경 및 취소 프로세스 간소화\n4. 진료 후 리마인더 및 후속 관리 알림 시스템 추가\n\n새롭게 개편된 서비스를 통해 더욱 편리한 의료 서비스를 경험하시기 바랍니다.\n\n감사합니다.",
        date: "2025-04-15",
        important: true,
      },
      {
        id: 2,
        category: "update",
        title: "앱 업데이트 안내 (v2.5.0)",
        content:
          "새로운 버전이 출시되었습니다.\n\n주요 변경사항:\n1) 예약 시스템 개선\n2) 결제 프로세스 간소화\n3) 버그 수정 및 성능 향상\n\n앱스토어나 플레이스토어에서 최신 버전으로 업데이트해 주세요.",
        date: "2025-04-10",
        important: false,
      },
      {
        id: 3,
        category: "event",
        title: "봄맞이 건강검진 이벤트",
        content:
          "4월 한 달간 특별 건강검진 이벤트를 진행합니다. 앱을 통해 건강검진을 예약하시면 10% 할인 혜택을 드립니다.\n\n이벤트 기간: 2025년 4월 1일 ~ 4월 30일\n대상: 모든 회원\n혜택: 건강검진 10% 할인\n\n앱 내 '이벤트' 탭에서 쿠폰을 발급받으신 후 예약 시 사용해주세요.",
        date: "2025-04-01",
        important: true,
      },
      {
        id: 4,
        category: "service",
        title: "고객센터 운영시간 변경 안내",
        content:
          "2025년 4월부터 고객센터 운영시간이 평일 09:00~19:00로 확대됩니다. 더 나은 서비스로 찾아뵙겠습니다.\n\n변경 전: 평일 09:00~18:00\n변경 후: 평일 09:00~19:00\n\n주말 및 공휴일은 휴무입니다. 문의사항은 앱 내 1:1 문의하기를 이용해주세요.",
        date: "2025-03-25",
        important: false,
      },
      {
        id: 5,
        category: "update",
        title: "개인정보처리방침 개정 안내",
        content:
          "2025년 4월 1일부터 개인정보처리방침이 일부 개정됩니다. 자세한 내용은 본문을 참고해주세요.\n\n주요 변경사항:\n1) 개인정보 수집 항목 추가 (건강정보 관련)\n2) 개인정보 보유기간 명확화\n3) 제3자 제공 항목 업데이트\n\n자세한 내용은 '설정 > 이용약관 및 정책 > 개인정보처리방침'에서 확인하실 수 있습니다.",
        date: "2025-03-15",
        important: true,
      },
      {
        id: 6,
        category: "event",
        title: "신규 회원 가입 이벤트",
        content:
          "신규 가입 회원님께 첫 예약 시 사용 가능한 3,000원 할인 쿠폰을 드립니다.\n\n이벤트 기간: 2025년 3월 1일 ~ 3월 31일\n대상: 이벤트 기간 내 신규 가입 회원\n쿠폰 유효기간: 발급일로부터 30일\n\n별도의 쿠폰 발급 절차 없이 첫 예약 시 자동으로 적용됩니다.",
        date: "2025-03-01",
        important: false,
      },
      {
        id: 7,
        category: "service",
        title: "협력 의료기관 확대 안내",
        content:
          "서울, 경기 지역 협력 의료기관이 확대되었습니다.\n\n새롭게 추가된 의료기관:\n- 강남세브란스병원\n- 분당서울대병원\n- 일산백병원\n- 여의도성모병원\n외 20개 의료기관\n\n앱에서 새롭게 추가된 의료기관을 검색하고 예약해보세요.",
        date: "2025-02-15",
        important: false,
      },
      {
        id: 8,
        category: "update",
        title: "결제 시스템 업데이트 안내",
        content:
          "결제 시스템이 업데이트되어 더욱 안전하고 편리하게 서비스를 이용하실 수 있습니다.\n\n주요 변경사항:\n1) 간편결제 서비스 추가 (네이버페이, 카카오페이)\n2) 보안 인증 프로세스 강화\n3) 결제 내역 확인 및 영수증 발급 기능 개선\n\n새로운 결제 시스템을 통해 더욱 편리하게 서비스를 이용해보세요.",
        date: "2025-02-01",
        important: true,
      },
    ];

    setNotices(dummyNotices);
  }, []);

  const handleBackClick = () => {
    if (selectedNotice) {
      setSelectedNotice(null);
    } else {
      navigate(-1);
    }
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSelectedNotice(null);
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSelectedNotice(null);
  };

  // 공지사항 선택 핸들러
  const handleNoticeClick = (notice) => {
    setSelectedNotice(notice);
    window.scrollTo(0, 0);
  };

  // 카테고리와 검색어에 따라 공지사항 필터링
  const filteredNotices = notices.filter((notice) => {
    const matchesCategory =
      activeCategory === "all" || notice.category === activeCategory;
    const matchesSearch =
      notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 날짜 포맷 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  return (
    <div className="container">
      <div className="fixed-header">
        <PageHeader
          title={selectedNotice ? "공지사항 상세" : "공지사항"}
          backButtonVisible={true}
          onBack={handleBackClick}
        />
      </div>

      <div className="settings-content">
        {!selectedNotice ? (
          <>
            {/* 검색창 */}
            <div className="search-bar" style={{ margin: "0 0 0.5rem 0" }}>
              <div
                style={{
                  //   position: "relative",
                  display: "flex",
                  alignItems: "center",
                  //   background: "#f3f4f6",
                  //   borderRadius: "0.5rem",
                  //   padding: "0.5rem 1rem",
                }}
              >
                <Search
                  size={18}
                  color="#9ca3af"
                  style={{ marginRight: "0.5rem" }}
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="검색어를 입력하세요"
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontSize: "0.875rem",
                    color: "#4b5563",
                  }}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: "0.25rem",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ fontSize: "1rem", color: "#9ca3af" }}>
                      ×
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* 카테고리 필터 */}
            <div className="category-filter">
              <button
                className={`category-button ${
                  activeCategory === "all" ? "active" : ""
                }`}
                onClick={() => handleCategoryChange("all")}
              >
                전체
              </button>
              <button
                className={`category-button ${
                  activeCategory === "service" ? "active" : ""
                }`}
                onClick={() => handleCategoryChange("service")}
              >
                서비스 안내
              </button>
              <button
                className={`category-button ${
                  activeCategory === "update" ? "active" : ""
                }`}
                onClick={() => handleCategoryChange("update")}
              >
                업데이트
              </button>
              <button
                className={`category-button ${
                  activeCategory === "event" ? "active" : ""
                }`}
                onClick={() => handleCategoryChange("event")}
              >
                이벤트
              </button>
            </div>

            {/* 공지사항 목록 */}
            <div className="settings-1card">
              {/* <h3 className="settings-section-title">
                <AlertCircle size={18} />
                공지사항
              </h3> */}

              {filteredNotices.length > 0 ? (
                <div
                  className="notice-list"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {filteredNotices.map((notice) => (
                    <div
                      key={notice.id}
                      className="notice-item"
                      onClick={() => handleNoticeClick(notice)}
                      style={{
                        padding: "1rem",
                        backgroundColor: notice.important
                          ? "#f0f9ff"
                          : "#f9fafb",
                        borderRadius: "0.5rem",
                        cursor: "pointer",
                        border: "1px solid",
                        borderColor: notice.important ? "#bfdbfe" : "#e5e7eb",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          {notice.important && (
                            <span
                              style={{
                                backgroundColor: "#3b82f6",
                                color: "white",
                                padding: "0.125rem 0.5rem",
                                borderRadius: "9999px",
                                fontSize: "0.75rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.25rem",
                              }}
                            >
                              <Info size={12} />
                              중요
                            </span>
                          )}
                          <span
                            style={{
                              backgroundColor: getCategoryColor(notice.category)
                                .bg,
                              color: getCategoryColor(notice.category).text,
                              padding: "0.125rem 0.5rem",
                              borderRadius: "9999px",
                              fontSize: "0.75rem",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.25rem",
                            }}
                          >
                            <Tag size={12} />
                            {getCategoryLabel(notice.category)}
                          </span>
                        </div>
                        <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                          {formatDate(notice.date)}
                        </span>
                      </div>
                      <h4
                        style={{
                          fontSize: "1rem",
                          fontWeight: "500",
                          color: "#1f2937",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {notice.title}
                      </h4>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "#4b5563",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          lineHeight: "1.5",
                        }}
                      >
                        {notice.content.split("\n")[0]}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "2rem 0",
                    color: "#6b7280",
                  }}
                >
                  검색 결과가 없습니다.
                </div>
              )}
            </div>
          </>
        ) : (
          // 공지사항 상세 페이지
          <div className="settings-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                {selectedNotice.important && (
                  <span
                    style={{
                      backgroundColor: "#3b82f6",
                      color: "white",
                      padding: "0.125rem 0.5rem",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <Info size={12} />
                    중요
                  </span>
                )}
                <span
                  style={{
                    backgroundColor: getCategoryColor(selectedNotice.category)
                      .bg,
                    color: getCategoryColor(selectedNotice.category).text,
                    padding: "0.125rem 0.5rem",
                    borderRadius: "9999px",
                    fontSize: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <Tag size={12} />
                  {getCategoryLabel(selectedNotice.category)}
                </span>
              </div>
              <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                {formatDate(selectedNotice.date)}
              </span>
            </div>

            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "1rem",
                marginTop: "0.5rem",
              }}
            >
              {selectedNotice.title}
            </h3>

            <div
              style={{
                fontSize: "0.9375rem",
                color: "#4b5563",
                lineHeight: "1.6",
                whiteSpace: "pre-line",
              }}
            >
              {selectedNotice.content}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 카테고리별 색상 정의
const getCategoryColor = (category) => {
  switch (category) {
    case "service":
      return { bg: "#e0f2fe", text: "#0369a1" }; // 파란색
    case "update":
      return { bg: "#f1f5f9", text: "#475569" }; // 회색
    case "event":
      return { bg: "#f0fdf4", text: "#15803d" }; // 녹색
    default:
      return { bg: "#f3f4f6", text: "#4b5563" };
  }
};

// 카테고리별 레이블 정의
const getCategoryLabel = (category) => {
  switch (category) {
    case "service":
      return "서비스 안내";
    case "update":
      return "업데이트";
    case "event":
      return "이벤트";
    default:
      return "기타";
  }
};

export default NoticePage;
