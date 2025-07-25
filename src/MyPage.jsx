import React, { useState } from "react";
import { PageHeader, getProfileImage } from "./App";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ChevronRight,
  Calendar,
  MessageCircle,
  Heart,
  Edit,
  Bell,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  ClipboardList,
  Pill,
  Activity,
  Shield,
  User,
  AlertCircle,
  KeyRound,
} from "lucide-react";
import "./MyPage.css";

const MyPage = ({ currentLocation, notificationCount }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("medical");

  // 구현된 페이지 목록
  const implementedPages = [
    "/favorites",
    "/notifications",
    "/mypage",
    "/appointments",
    "/medical-records",
    "/prescriptions", // 새로 추가한 처방전 관리 페이지
    "/checkups", // 새로 추가한 건강검진 결과 페이지
    "/payments", // 결제 내역 페이지 추가
    "/payment-receipt",
    "/payment-statement",
    "/personal",
    "/terms",
    "/notice",
    "/faq",
    "/service",
    "/notification-settings",
    "/profile-edit",
    "/admin",
    "/super-admin",
  ];

  const handleMenuClick = (path) => {
    // 구현된 페이지인 경우에만 이동
    if (implementedPages.includes(path)) {
      navigate(path);
    } else {
      // 구현되지 않은 페이지는 아무 동작 없음
      console.log(`페이지 ${path}는 아직 구현되지 않았습니다.`);
    }
  };

  // 진료 관리 메뉴 아이템
  const medicalMenuItems = [
    {
      id: "appointments",
      icon: <Calendar size={20} />,
      label: t("mypage.medical.menu.appointmentHistory"),
      color: "#3b82f6",
    },
    {
      id: "medical-records",
      icon: <ClipboardList size={20} />,
      label: t("mypage.medical.menu.medicalRecords"),
      color: "#8b5cf6",
    },
    {
      id: "prescriptions",
      icon: <Pill size={20} />,
      label: t("mypage.medical.menu.prescriptionManagement"),
      color: "#ec4899",
    },
    {
      id: "checkups",
      icon: <Activity size={20} />,
      label: t("mypage.medical.menu.healthCheckupResults"),
      color: "#10b981",
    },
  ];

  // 결제 관리 메뉴 아이템
  const paymentMenuItems = [
    {
      id: "payments",
      icon: <CreditCard size={20} />,
      label: t("mypage.medical.menu.paymentDetails"),
      color: "#f59e0b",
    },
    // {
    //   id: "payment-receipt",
    //   icon: <Award size={20} />,
    //   label: t("mypage.medical.menu.medicalCertificates"),
    //   color: "#6366f1",
    // },
    // {
    //   id: "payment-statement",
    //   icon: <FileText size={20} />,
    //   label: t("mypage.medical.menu.medicalReports"),
    //   color: "#0ea5e9",
    // },
  ];

  // 설정 메뉴 아이템
  const settingsMenuItems = [
    {
      id: "notification-settings",
      icon: <Bell size={20} />,
      label: t("mypage.medical.menu.alarmSettings"),
      color: "#ef4444",
    },
    {
      id: "personal",
      icon: <User size={20} />,
      label: t("mypage.medical.menu.personalInfoSettings"),
      color: "#8b5cf6",
    },
    {
      id: "terms",
      icon: <Shield size={20} />,
      label: t("mypage.medical.menu.termsOfUse"),
      color: "#6366f1",
    },
    {
      id: "notice",
      icon: <AlertCircle size={20} />,
      label: "공지사항", // 번역 키가 없을 경우 직접 문자열 사용
      color: "#0ea5e9",
    },
    {
      id: "faq",
      icon: <HelpCircle size={20} />,
      label: t("mypage.medical.menu.frequentlyAskedQuestions"),
      color: "#10b981",
    },
    {
      id: "service",
      icon: <MessageCircle size={20} />,
      label: t("mypage.medical.menu.customerService"),
      color: "#f59e0b",
    },
    // {
    //   id: "admin",
    //   icon: <KeyRound size={20} />,
    //   label: "관리자 페이지",
    //   color: "#f59e0b",
    // },
    // {
    //   id: "super-admin",
    //   icon: <KeyRound size={20} />,
    //   label: "슈퍼관리자 페이지",
    //   color: "#f59e0b",
    // },
  ];

  return (
    <div className="container">
      <PageHeader
        title={t("mypage.medical.title")}
        notificationCount={notificationCount}
        showNotification={true}
      />
      <div className="content">
        {/* 프로필 섹션 */}
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar-container">
              <img
                src={getProfileImage()}
                alt="Profile"
                className="profile-avatar"
              />
              {/* 트렌디한 프로필 수정 버튼 - 사진 아래에 배치 */}
              <button
                className="avatar-edit-btn"
                onClick={() => handleMenuClick("/profile-edit")}
              >
                <Edit size={14} />
                <span>편집</span>
              </button>
            </div>
            <div className="profile-info">
              <div className="profile-name-container">
                <h2 className="profile-name">Doctor King</h2>
                <p className="profile-email">user@example.com</p>
              </div>
              <div className="profile-stats">
                <div className="profile-stat">
                  <span className="stat-value">7</span>
                  <span className="stat-label">방문</span>
                </div>
                <div className="profile-stat">
                  <span className="stat-value">4</span>
                  <span className="stat-label">리뷰</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 활동 요약 */}
        <div className="activity-cards-container">
          <div
            className="activity-card"
            onClick={() => handleMenuClick("/appointments")}
          >
            <div className="card-content">
              <Calendar size={24} className="card-icon" />
              <div className="card-info">
                <div className="card-label">다음 예약</div>
                <div className="card-value">오늘 15:30</div>
              </div>
            </div>
          </div>
          <div
            className="activity-card"
            onClick={() => handleMenuClick("/prescriptions")}
          >
            <div className="card-content">
              <Pill size={24} className="card-icon" />
              <div className="card-info">
                <div className="card-label">처방전</div>
                <div className="card-value">2개</div>
              </div>
            </div>
          </div>
          <div
            className="activity-card"
            onClick={() => handleMenuClick("/favorites")}
          >
            <div className="card-content">
              <Heart size={24} className="card-icon" />
              <div className="card-info">
                <div className="card-label">찜 목록</div>
                <div className="card-value">12개</div>
              </div>
            </div>
          </div>
        </div>

        {/* 메뉴 섹션 */}
        <div className="menu-section">
          <h3 className="menu-title">
            <ClipboardList size={18} />
            {t("mypage.medical.menu.treatmentManagement")}
          </h3>
          <div className="menu-grid">
            {medicalMenuItems.map((item) => (
              <button
                key={item.id}
                className="menu-item"
                onClick={() => handleMenuClick(`/${item.id}`)}
              >
                <div
                  className="menu-icon-wrapper"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <div className="menu-icon" style={{ color: item.color }}>
                    {item.icon}
                  </div>
                </div>
                <span className="menu-label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="menu-section">
          <h3 className="menu-title">
            <CreditCard size={18} />
            {t("mypage.medical.menu.paymentManagement")}
          </h3>
          <div className="menu-grid">
            {paymentMenuItems.map((item) => (
              <button
                key={item.id}
                className="menu-item"
                onClick={() => handleMenuClick(`/${item.id}`)}
              >
                <div
                  className="menu-icon-wrapper"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <div className="menu-icon" style={{ color: item.color }}>
                    {item.icon}
                  </div>
                </div>
                <span className="menu-label">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="menu-section">
          <h3 className="menu-title">
            <Settings size={18} />
            {t("mypage.medical.menu.settings")}
          </h3>
          <div className="settings-menu">
            {settingsMenuItems.map((item) => (
              <button
                key={item.id}
                className="settings-item"
                onClick={() => handleMenuClick(`/${item.id}`)}
              >
                <div className="settings-item-content">
                  <div className="settings-icon" style={{ color: item.color }}>
                    {item.icon}
                  </div>
                  <span className="settings-label">{item.label}</span>
                </div>
                <ChevronRight size={16} className="settings-arrow" />
              </button>
            ))}
          </div>
        </div>

        {/* 로그아웃 버튼 */}
        <button className="logout-button">
          <LogOut size={18} />
          {t("mypage.medical.logout")}
        </button>
      </div>
    </div>
  );
};

export default MyPage;
