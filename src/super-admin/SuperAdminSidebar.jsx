import React from "react";
import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  CreditCard,
  Settings,
  FileBarChart,
  HelpCircle,
  LogOut,
  ChevronLeft,
  Command,
  Server,
  LineChart,
  Layers,
} from "lucide-react";
import "./SuperAdminSidebar.css";

const SuperAdminSidebar = ({
  activeSection,
  onSectionChange,
  collapsed,
  platformData,
}) => {
  return (
    <div className={`super-admin-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="super-admin-sidebar-header">
        <div className="super-admin-sidebar-title">
          <h1>슈퍼 관리자</h1>
        </div>
        {/* {!collapsed && (
          <button
            className="super-admin-header-menu-button"
            onClick={() => {}}
            style={{ color: "#e2e8f0" }}
          >
            <ChevronLeft size={20} />
          </button>
        )} */}
      </div>

      <div className="super-admin-platform-info">
        <div className="super-admin-platform-avatar">
          <Command size={24} />
        </div>
        <div className="super-admin-platform-details">
          <h2 className="super-admin-platform-name">
            {platformData?.name || "메디컬 케어 플랫폼"}
          </h2>
          <p className="super-admin-platform-type">
            버전 {platformData?.version || "1.0.0"}
          </p>
        </div>
      </div>

      <div className="super-admin-sidebar-menu">
        <div className="super-admin-sidebar-section">
          <h3 className="super-admin-sidebar-section-title">메인 메뉴</h3>
          <div
            className={`super-admin-sidebar-item ${
              activeSection === "dashboard" ? "active" : ""
            }`}
            onClick={() => onSectionChange("dashboard")}
          >
            <div className="super-admin-sidebar-icon">
              <LayoutDashboard size={20} />
            </div>
            <span className="super-admin-sidebar-label">대시보드</span>
          </div>
          <div
            className={`super-admin-sidebar-item ${
              activeSection === "hospitals" ? "active" : ""
            }`}
            onClick={() => onSectionChange("hospitals")}
          >
            <div className="super-admin-sidebar-icon">
              <Building2 size={20} />
            </div>
            <span className="super-admin-sidebar-label">병원/시설 관리</span>
          </div>
          <div
            className={`super-admin-sidebar-item ${
              activeSection === "users" ? "active" : ""
            }`}
            onClick={() => onSectionChange("users")}
          >
            <div className="super-admin-sidebar-icon">
              <Users size={20} />
            </div>
            <span className="super-admin-sidebar-label">사용자 관리</span>
          </div>
        </div>

        <div className="super-admin-sidebar-section">
          <h3 className="super-admin-sidebar-section-title">컨텐츠</h3>
          <div
            className={`super-admin-sidebar-item ${
              activeSection === "content" ? "active" : ""
            }`}
            onClick={() => onSectionChange("content")}
          >
            <div className="super-admin-sidebar-icon">
              <Layers size={20} />
            </div>
            <span className="super-admin-sidebar-label">컨텐츠 관리</span>
          </div>
        </div>

        <div className="super-admin-sidebar-section">
          <h3 className="super-admin-sidebar-section-title">금융</h3>
          <div
            className={`super-admin-sidebar-item ${
              activeSection === "payments" ? "active" : ""
            }`}
            onClick={() => onSectionChange("payments")}
          >
            <div className="super-admin-sidebar-icon">
              <CreditCard size={20} />
            </div>
            <span className="super-admin-sidebar-label">결제 및 정산</span>
          </div>
        </div>

        <div className="super-admin-sidebar-section">
          <h3 className="super-admin-sidebar-section-title">분석</h3>
          <div
            className={`super-admin-sidebar-item ${
              activeSection === "logs" ? "active" : ""
            }`}
            onClick={() => onSectionChange("logs")}
          >
            <div className="super-admin-sidebar-icon">
              <FileBarChart size={20} />
            </div>
            <span className="super-admin-sidebar-label">보고서 및 로그</span>
          </div>
        </div>

        <div className="super-admin-sidebar-section">
          <h3 className="super-admin-sidebar-section-title">고객 지원</h3>
          <div
            className={`super-admin-sidebar-item ${
              activeSection === "support" ? "active" : ""
            }`}
            onClick={() => onSectionChange("support")}
          >
            <div className="super-admin-sidebar-icon">
              <HelpCircle size={20} />
            </div>
            <span className="super-admin-sidebar-label">고객 지원</span>
          </div>
        </div>

        <div className="super-admin-sidebar-section">
          <h3 className="super-admin-sidebar-section-title">시스템</h3>
          <div
            className={`super-admin-sidebar-item ${
              activeSection === "settings" ? "active" : ""
            }`}
            onClick={() => onSectionChange("settings")}
          >
            <div className="super-admin-sidebar-icon">
              <Settings size={20} />
            </div>
            <span className="super-admin-sidebar-label">시스템 설정</span>
          </div>
        </div>
      </div>

      <div className="super-admin-sidebar-footer">
        <div className="super-admin-sidebar-item">
          <div className="super-admin-sidebar-icon">
            <LogOut size={20} />
          </div>
          <span className="super-admin-sidebar-label">로그아웃</span>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminSidebar;
