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
  LayoutGrid,
  Scissors,
  Camera,
  MessageSquare,
  Package,
  FilePlus,
} from "lucide-react";
import { getProfileImage } from "../App";
import "./SuperAdminHeader.css";

const SuperAdminHeader = ({
  toggleSidebar,
  sidebarCollapsed,
  platformData,
  activeSection,
}) => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "새로운 병원 가입 요청이 3건 있습니다.",
      time: "1시간 전",
      read: false,
    },
    {
      id: 2,
      message: "시스템 업데이트가 완료되었습니다.",
      time: "3시간 전",
      read: false,
    },
    {
      id: 3,
      message: "서버 백업이 성공적으로 완료되었습니다.",
      time: "4시간 전",
      read: false,
    },
    {
      id: 4,
      message: "신규 사용자 100명 달성!",
      time: "어제",
      read: true,
    },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleServiceClick = () => {
    navigate("/");
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case "dashboard":
        return "대시보드";
      case "hospitals":
        return "병원/시설 관리";
      case "users":
        return "사용자 관리";
      case "content":
        return "컨텐츠 관리";
      case "payments":
        return "결제 및 정산 관리";
      case "settings":
        return "시스템 설정";
      case "logs":
        return "보고서 및 로그";
      case "support":
        return "고객 지원";
      default:
        return "대시보드";
    }
  };

  const getSearchPlaceholder = () => {
    switch (activeSection) {
      case "hospitals":
        return "병원명, 지역, 카테고리 검색...";
      case "users":
        return "사용자명, 이메일, ID 검색...";
      case "content":
        return "카테고리, 제목, 태그 검색...";
      case "payments":
        return "결제 ID, 병원명, 날짜 검색...";
      case "logs":
        return "로그 타입, 날짜, 사용자 검색...";
      case "support":
        return "문의 ID, 제목, 상태 검색...";
      default:
        return "전체 검색...";
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
    <header className="super-admin-header">
      <div className="super-admin-header-left">
        <button
          className="super-admin-header-menu-button"
          onClick={toggleSidebar}
        >
          <Menu size={24} />
        </button>
        <h1 className="super-admin-header-title">{getSectionTitle()}</h1>
      </div>

      {/* <div className="super-admin-header-search">
        <div className="super-admin-search-container">
          <Search size={18} className="super-admin-search-icon" />
          <input
            type="text"
            placeholder={getSearchPlaceholder()}
            className="super-admin-search-input"
          />
        </div>
      </div> */}

      <div className="super-admin-header-right">
        <div className="super-admin-header-item">
          <button
            className="super-admin-service-button"
            onClick={handleServiceClick}
            title="서비스 페이지로 이동"
          >
            <LayoutGrid size={20} />
            <span>서비스</span>
          </button>
        </div>

        <div className="super-admin-header-item">
          <div className="super-admin-notification-container">
            <button
              className="super-admin-notification-button"
              onClick={toggleNotifications}
            >
              <Bell size={20} />
              {unreadNotifications > 0 && (
                <span className="super-admin-notification-badge">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="super-admin-notification-dropdown">
                <div className="super-admin-notification-header">
                  <h3>알림</h3>
                  {unreadNotifications > 0 && (
                    <button
                      className="super-admin-notification-read-all"
                      onClick={markAllAsRead}
                    >
                      모두 읽음 처리
                    </button>
                  )}
                </div>
                <div className="super-admin-notification-list">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`super-admin-notification-item ${
                          !notification.read ? "unread" : ""
                        }`}
                      >
                        <div className="super-admin-notification-content">
                          <p className="super-admin-notification-message">
                            {notification.message}
                          </p>
                          <span className="super-admin-notification-time">
                            {notification.time}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="super-admin-notification-empty">
                      <p>새로운 알림이 없습니다</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="super-admin-header-item">
          <div className="super-admin-user-menu-container">
            <button
              className="super-admin-user-menu-button"
              onClick={toggleUserMenu}
            >
              <img
                src={getProfileImage()}
                alt="Profile"
                className="super-admin-user-avatar"
              />
              <div className="super-admin-user-info">
                <span className="super-admin-user-name">슈퍼 관리자</span>
              </div>
              <ChevronDown size={16} />
            </button>

            {showUserMenu && (
              <div className="super-admin-user-dropdown">
                <div className="super-admin-user-dropdown-header">
                  <img
                    src={getProfileImage()}
                    alt="Profile"
                    className="super-admin-user-dropdown-avatar"
                  />
                  <div>
                    <h4 className="super-admin-user-dropdown-name">
                      슈퍼 관리자
                    </h4>
                    <p className="super-admin-user-dropdown-email">
                      superadmin@example.com
                    </p>
                  </div>
                </div>
                <div className="super-admin-user-dropdown-menu">
                  <a href="#" className="super-admin-user-dropdown-item">
                    <User size={16} />
                    <span>내 프로필</span>
                  </a>
                  <a href="#" className="super-admin-user-dropdown-item">
                    <Settings size={16} />
                    <span>계정 설정</span>
                  </a>
                  <a href="#" className="super-admin-user-dropdown-item">
                    <HelpCircle size={16} />
                    <span>도움말</span>
                  </a>
                </div>
                <div className="super-admin-user-dropdown-footer">
                  <a href="#" className="super-admin-user-dropdown-item">
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

export default SuperAdminHeader;
