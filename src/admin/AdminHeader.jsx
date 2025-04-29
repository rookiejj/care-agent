import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Bell,
  Search,
  User,
  ChevronDown,
  LogOut,
  Settings,
  HelpCircle,
  Home,
  Scissors, // 성형 아이콘 추가
  Camera, // 사진 아이콘 추가
  MessageSquare, // 상담 아이콘 추가
  Package, // 패키지 아이콘 추가
} from "lucide-react";
import { getProfileImage } from "../App";
import "./AdminHeader.css";

const AdminHeader = ({
  toggleSidebar,
  sidebarCollapsed,
  hospitalData,
  activeSection,
}) => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "오늘 예약이 3건 추가되었습니다.",
      time: "1시간 전",
      read: false,
    },
    {
      id: 2,
      message: "김환자님이 예약을 취소했습니다.",
      time: "3시간 전",
      read: false,
    },
    {
      id: 3,
      message: "성형 상담 요청이 2건 접수되었습니다.",
      time: "4시간 전",
      read: false,
    },
    {
      id: 4,
      message: "의사 정보가 업데이트되었습니다.",
      time: "어제",
      read: true,
    },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleBackToMain = () => {
    navigate("/");
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case "dashboard":
        return "대시보드";
      case "patients":
        return "환자/고객 관리";
      case "appointments":
        return "예약 관리";
      case "doctors":
        return "의료진 관리";
      case "cosmetic":
        return "성형 시술 관리";
      case "consultations":
        return "상담 관리";
      case "beforeafter":
        return "전후사진 관리";
      case "packages":
        return "패키지 관리";
      case "profile":
        return "시설 프로필";
      case "reports":
        return "통계 및 보고서";
      case "settings":
        return "설정";
      default:
        return "대시보드";
    }
  };

  const getSearchPlaceholder = () => {
    switch (activeSection) {
      case "patients":
        return "환자/고객 이름, 전화번호 검색...";
      case "appointments":
        return "예약자, 진료/시술 검색...";
      case "doctors":
        return "의료진, 전문분야 검색...";
      case "cosmetic":
        return "시술명, 카테고리 검색...";
      case "consultations":
        return "상담 고객, 시술 검색...";
      case "beforeafter":
        return "시술명, 고객 검색...";
      case "packages":
        return "패키지명, 시술 검색...";
      default:
        return "환자, 의사, 시술 또는 예약 검색...";
    }
  };

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    if (showNotifications) setShowNotifications(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showUserMenu) setShowUserMenu(false);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <button className="admin-header-menu-button" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <h1 className="admin-header-title">{getSectionTitle()}</h1>
      </div>

      <div className="admin-header-search">
        <div className="admin-search-container">
          <Search size={18} className="admin-search-icon" />
          <input
            type="text"
            placeholder={getSearchPlaceholder()}
            className="admin-search-input"
          />
        </div>
      </div>

      <div className="admin-header-right">
        <div className="admin-header-item">
          <button
            className="admin-home-button"
            onClick={handleBackToMain}
            title="메인 페이지로 이동"
          >
            <Home size={20} />
            <span>홈으로</span>
          </button>
        </div>

        <div className="admin-header-item">
          <div className="admin-notification-container">
            <button
              className="admin-notification-button"
              onClick={toggleNotifications}
            >
              <Bell size={20} />
              {unreadNotifications > 0 && (
                <span className="admin-notification-badge">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="admin-notification-dropdown">
                <div className="admin-notification-header">
                  <h3>알림</h3>
                  {unreadNotifications > 0 && (
                    <button
                      className="admin-notification-read-all"
                      onClick={markAllAsRead}
                    >
                      모두 읽음 처리
                    </button>
                  )}
                </div>
                <div className="admin-notification-list">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`admin-notification-item ${
                          !notification.read ? "unread" : ""
                        }`}
                      >
                        <div className="admin-notification-content">
                          <p className="admin-notification-message">
                            {notification.message}
                          </p>
                          <span className="admin-notification-time">
                            {notification.time}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="admin-notification-empty">
                      <p>새로운 알림이 없습니다</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="admin-header-item">
          <div className="admin-user-menu-container">
            <button className="admin-user-menu-button" onClick={toggleUserMenu}>
              <img
                src={getProfileImage()}
                alt="Profile"
                className="admin-user-avatar"
              />
              <div className="admin-user-info">
                <span className="admin-user-name">관리자</span>
              </div>
              <ChevronDown size={16} />
            </button>

            {showUserMenu && (
              <div className="admin-user-dropdown">
                <div className="admin-user-dropdown-header">
                  <img
                    src={getProfileImage()}
                    alt="Profile"
                    className="admin-user-dropdown-avatar"
                  />
                  <div>
                    <h4 className="admin-user-dropdown-name">관리자</h4>
                    <p className="admin-user-dropdown-email">
                      admin@example.com
                    </p>
                  </div>
                </div>
                <div className="admin-user-dropdown-menu">
                  <a href="#" className="admin-user-dropdown-item">
                    <User size={16} />
                    <span>내 프로필</span>
                  </a>
                  <a href="#" className="admin-user-dropdown-item">
                    <Settings size={16} />
                    <span>계정 설정</span>
                  </a>
                  <a href="#" className="admin-user-dropdown-item">
                    <HelpCircle size={16} />
                    <span>도움말</span>
                  </a>
                </div>
                <div className="admin-user-dropdown-footer">
                  <a href="#" className="admin-user-dropdown-item">
                    <LogOut size={16} />
                    <span>로그아웃</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
