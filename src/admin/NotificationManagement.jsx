import React, { useState, useEffect } from "react";
import {
  Bell,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  Calendar,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Settings,
  MessageCircle,
  Clock,
  Check,
} from "lucide-react";
import "./NotificationManagement.css";

const NotificationManagement = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    type: "all",
    read: "all",
    dateRange: "all",
  });

  // 페이지네이션 설정
  const notificationsPerPage = 10;

  useEffect(() => {
    // 실제 앱에서는 API 호출을 통해 알림 데이터를 가져옴
    // 여기서는 목업 데이터 사용
    const generateMockNotifications = () => {
      const mockNotifications = [];
      const types = ["info", "success", "warning", "error"];
      const messages = [
        "신규 환자가 등록되었습니다.",
        "예약이 확정되었습니다.",
        "예약이 취소되었습니다.",
        "환자가 대기 중입니다.",
        "의사가 진료를 시작했습니다.",
        "진료가 완료되었습니다.",
        "상담 요청이 접수되었습니다.",
        "결제가 완료되었습니다.",
        "정기 검진 알림이 발송되었습니다.",
        "시스템 점검이 예정되어 있습니다.",
        "의료진 일정이 변경되었습니다.",
        "새로운 리뷰가 등록되었습니다.",
      ];

      // 현재 날짜
      const now = new Date();

      // 최근 2주 동안의 알림 생성
      for (let i = 0; i < 50; i++) {
        const notificationDate = new Date(now);
        // 랜덤하게 최근 14일 내의 알림 생성
        notificationDate.setDate(
          notificationDate.getDate() - Math.floor(Math.random() * 14)
        );
        notificationDate.setHours(
          Math.floor(Math.random() * 24),
          Math.floor(Math.random() * 60),
          0,
          0
        );

        const type = types[Math.floor(Math.random() * types.length)];
        const message = messages[Math.floor(Math.random() * messages.length)];

        // 특정 환자나 예약 ID 생성
        const relatedId = Math.floor(Math.random() * 1000) + 1;
        let relatedInfo;

        // 메시지에 따라 관련 정보 추가
        if (message.includes("환자")) {
          relatedInfo = `환자 ID: ${relatedId}`;
        } else if (message.includes("예약")) {
          relatedInfo = `예약 ID: ${relatedId}`;
        } else if (message.includes("의사") || message.includes("의료진")) {
          relatedInfo = `의사 ID: ${relatedId}`;
        } else if (message.includes("결제")) {
          relatedInfo = `결제 ID: ${relatedId}`;
        } else {
          relatedInfo = "";
        }

        mockNotifications.push({
          id: i + 1,
          type,
          message,
          relatedInfo,
          date: notificationDate,
          isRead: Math.random() > 0.3, // 70%는 읽은 알림
        });
      }

      // 날짜 순 정렬 (최신순)
      return mockNotifications.sort((a, b) => b.date - a.date);
    };

    // 데이터 로딩 시뮬레이션
    setTimeout(() => {
      const mockNotifications = generateMockNotifications();
      setNotifications(mockNotifications);
      setFilteredNotifications(mockNotifications);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // 검색어와 필터 적용
    let results = [...notifications];

    // 검색어 필터링
    if (searchTerm) {
      results = results.filter(
        (notification) =>
          notification.message
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          notification.relatedInfo
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // 타입 필터링
    if (filterOptions.type !== "all") {
      results = results.filter(
        (notification) => notification.type === filterOptions.type
      );
    }

    // 읽음/안읽음 필터링
    if (filterOptions.read !== "all") {
      const isRead = filterOptions.read === "read";
      results = results.filter(
        (notification) => notification.isRead === isRead
      );
    }

    // 날짜 범위 필터링
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    switch (filterOptions.dateRange) {
      case "today":
        results = results.filter((notification) => {
          const notificationDate = new Date(notification.date);
          return notificationDate >= today;
        });
        break;
      case "yesterday":
        results = results.filter((notification) => {
          const notificationDate = new Date(notification.date);
          return notificationDate >= yesterday && notificationDate < today;
        });
        break;
      case "week":
        results = results.filter((notification) => {
          const notificationDate = new Date(notification.date);
          return notificationDate >= weekAgo;
        });
        break;
      case "all":
      default:
        // 모든 날짜 포함
        break;
    }

    // 결과 날짜순 정렬 (최신순)
    results.sort((a, b) => b.date - a.date);

    setFilteredNotifications(results);
    setCurrentPage(1);
  }, [searchTerm, filterOptions, notifications]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (filter, value) => {
    setFilterOptions({
      ...filterOptions,
      [filter]: value,
    });
  };

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    );
  };

  const handleDeleteNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 날짜 포맷 함수
  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString("ko-KR", options);
  };

  const formatTime = (date) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    return new Date(date).toLocaleTimeString("ko-KR", options);
  };

  // 알림 유형에 따른 아이콘 렌더링
  const renderTypeIcon = (type) => {
    switch (type) {
      case "info":
        return <Bell size={16} className="notification-icon info" />;
      case "success":
        return <CheckCircle size={16} className="notification-icon success" />;
      case "warning":
        return <AlertCircle size={16} className="notification-icon warning" />;
      case "error":
        return <AlertCircle size={16} className="notification-icon error" />;
      default:
        return <Bell size={16} className="notification-icon info" />;
    }
  };

  // 시간 경과에 따른 표시
  const getTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}일 전`;
    } else if (hours > 0) {
      return `${hours}시간 전`;
    } else if (minutes > 0) {
      return `${minutes}분 전`;
    } else {
      return "방금 전";
    }
  };

  // 페이지네이션 계산
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification =
    indexOfLastNotification - notificationsPerPage;
  const currentNotifications = filteredNotifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );
  const totalPages = Math.ceil(
    filteredNotifications.length / notificationsPerPage
  );

  // 읽지 않은 알림 수 계산
  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  if (isLoading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-spinner"></div>
        <p>알림 데이터 로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="notification-management">
      <div className="admin-section-header">
        <h2 className="admin-section-title">알림 관리</h2>
        <p className="admin-section-description">
          시스템 알림을 확인하고 관리할 수 있습니다.
        </p>
      </div>

      <div className="notification-management-header">
        <div className="notification-stats">
          <div className="notification-stat-item">
            <h4 className="notification-stat-title">전체 알림</h4>
            <p className="notification-stat-value">{notifications.length}</p>
          </div>
          <div className="notification-stat-item">
            <h4 className="notification-stat-title">읽지 않은 알림</h4>
            <p className="notification-stat-value unread">{unreadCount}</p>
          </div>
        </div>

        <div className="notification-actions">
          {unreadCount > 0 && (
            <button
              className="admin-button admin-button-secondary"
              onClick={handleMarkAllAsRead}
            >
              <Check size={16} />
              모두 읽음 처리
            </button>
          )}
          <button
            className="admin-button admin-button-secondary"
            onClick={() => {}}
          >
            <Settings size={16} />
            알림 설정
          </button>
        </div>
      </div>

      <div className="notification-management-actions">
        <div className="notification-search-filter-container">
          <div className="notification-admin-search-bar">
            <Search size={18} className="notification-search-icon" />
            <input
              type="text"
              placeholder="알림 내용 검색..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="notification-admin-search-input"
            />
          </div>

          <button
            className="admin-button admin-button-secondary filter-button"
            onClick={toggleFilters}
            style={{ flexShrink: 0 }}
          >
            <Filter size={16} style={{ marginRight: "4px" }} />
            필터
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="admin-filters">
          <div className="admin-filter-group">
            <label className="admin-filter-label">유형</label>
            <div className="admin-filter-options">
              <button
                className={`admin-filter-option ${
                  filterOptions.type === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("type", "all")}
              >
                전체
              </button>
              <button
                className={`admin-filter-option ${
                  filterOptions.type === "info" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("type", "info")}
              >
                정보
              </button>
              <button
                className={`admin-filter-option ${
                  filterOptions.type === "success" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("type", "success")}
              >
                완료
              </button>
              <button
                className={`admin-filter-option ${
                  filterOptions.type === "warning" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("type", "warning")}
              >
                경고
              </button>
              <button
                className={`admin-filter-option ${
                  filterOptions.type === "error" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("type", "error")}
              >
                오류
              </button>
            </div>
          </div>

          <div className="admin-filter-group">
            <label className="admin-filter-label">읽음 상태</label>
            <div className="admin-filter-options">
              <button
                className={`admin-filter-option ${
                  filterOptions.read === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("read", "all")}
              >
                전체
              </button>
              <button
                className={`admin-filter-option ${
                  filterOptions.read === "read" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("read", "read")}
              >
                읽음
              </button>
              <button
                className={`admin-filter-option ${
                  filterOptions.read === "unread" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("read", "unread")}
              >
                읽지 않음
              </button>
            </div>
          </div>

          <div className="admin-filter-group">
            <label className="admin-filter-label">기간</label>
            <div className="admin-filter-options">
              <button
                className={`admin-filter-option ${
                  filterOptions.dateRange === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "all")}
              >
                전체 기간
              </button>
              <button
                className={`admin-filter-option ${
                  filterOptions.dateRange === "today" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "today")}
              >
                오늘
              </button>
              <button
                className={`admin-filter-option ${
                  filterOptions.dateRange === "yesterday" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "yesterday")}
              >
                어제
              </button>
              <button
                className={`admin-filter-option ${
                  filterOptions.dateRange === "week" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "week")}
              >
                최근 7일
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="notification-list-container">
        {filteredNotifications.length === 0 ? (
          <div className="admin-empty-state">
            <div className="admin-empty-icon">
              <Bell size={32} />
            </div>
            <h3 className="admin-empty-title">알림이 없습니다</h3>
            <p className="admin-empty-description">
              검색 조건에 맞는 알림이 없습니다. 다른 검색어나 필터를
              사용해보세요.
            </p>
          </div>
        ) : (
          <>
            <div className="notification-list">
              {currentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${
                    !notification.isRead ? "unread" : ""
                  }`}
                >
                  <div className="notification-item-left">
                    {renderTypeIcon(notification.type)}
                    <div className="notification-content">
                      <p className="notification-message">
                        {notification.message}
                      </p>
                      {notification.relatedInfo && (
                        <span className="notification-related-info">
                          {notification.relatedInfo}
                        </span>
                      )}
                      <div className="notification-meta">
                        <span className="notification-time">
                          {formatDate(notification.date)}{" "}
                          {formatTime(notification.date)}
                        </span>
                        <span className="notification-time-ago">
                          ({getTimeAgo(notification.date)})
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="notification-actions">
                    {!notification.isRead && (
                      <button
                        className="notification-action-button read"
                        onClick={() => handleMarkAsRead(notification.id)}
                        title="읽음으로 표시"
                      >
                        <Check size={16} />
                      </button>
                    )}
                    <button
                      className="notification-action-button delete"
                      onClick={() => handleDeleteNotification(notification.id)}
                      title="삭제"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="admin-pagination">
                <button
                  className={`admin-pagination-button ${
                    currentPage === 1 ? "disabled" : ""
                  }`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={16} />
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;

                  // 현재 페이지 주변 5개의 페이지만 표시
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 2 &&
                      pageNumber <= currentPage + 2)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        className={`admin-pagination-button ${
                          pageNumber === currentPage ? "active" : ""
                        }`}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    (pageNumber === currentPage - 3 && currentPage > 3) ||
                    (pageNumber === currentPage + 3 &&
                      currentPage < totalPages - 2)
                  ) {
                    // 생략 부호 표시
                    return (
                      <span key={pageNumber} className="pagination-ellipsis">
                        ...
                      </span>
                    );
                  }

                  return null;
                })}

                <button
                  className={`admin-pagination-button ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationManagement;
