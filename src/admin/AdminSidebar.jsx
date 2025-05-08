import React from "react";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Stethoscope,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Building,
  User,
  Scissors, // 성형 관련 아이콘 추가
  Camera, // 사진 관리 아이콘 추가
  Package, // 패키지 아이콘 추가
  MessageSquare, // 상담 아이콘 추가
  Bell, // 알림 아이콘 추가
} from "lucide-react";
import "./AdminSidebar.css";

const AdminSidebar = ({
  activeSection,
  onSectionChange,
  collapsed,
  hospitalData,
}) => {
  const menuItems = [
    {
      id: "dashboard",
      label: "대시보드",
      icon: <LayoutDashboard size={20} />,
    },
    {
      id: "patients",
      label: "환자/고객 관리",
      icon: <Users size={20} />,
    },
    {
      id: "appointments",
      label: "예약 관리",
      icon: <Calendar size={20} />,
    },
    {
      id: "doctors",
      label: "의료진 관리",
      icon: <Stethoscope size={20} />,
    },
    {
      id: "cosmetic",
      label: "성형 시술 관리",
      icon: <Scissors size={20} />,
    },
    {
      id: "consultations",
      label: "상담 관리",
      icon: <MessageSquare size={20} />,
    },
    {
      id: "beforeafter",
      label: "전후사진 관리",
      icon: <Camera size={20} />,
    },
    {
      id: "packages",
      label: "패키지 관리",
      icon: <Package size={20} />,
    },
    {
      id: "notifications",
      label: "알림 관리",
      icon: <Bell size={20} />,
    },
    {
      id: "profile",
      label: "시설 프로필",
      icon: <Building size={20} />,
    },
    {
      id: "reports",
      label: "통계 및 보고서",
      icon: <FileText size={20} />,
    },
    {
      id: "settings",
      label: "설정",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <div className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="admin-sidebar-header">
        {!collapsed && (
          <div className="admin-sidebar-title">
            <h1>의료/성형 관리 시스템</h1>
          </div>
        )}
      </div>

      {!collapsed && hospitalData && (
        <div className="admin-hospital-info">
          <div className="admin-hospital-avatar">
            <Building size={24} />
          </div>
          <div className="admin-hospital-details">
            <h2 className="admin-hospital-name">{hospitalData.name}</h2>
            <p className="admin-hospital-type">
              {hospitalData.facilityType || "의료기관"} 관리자
            </p>
          </div>
        </div>
      )}

      <div className="admin-sidebar-menu">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`admin-sidebar-item ${
              activeSection === item.id ? "active" : ""
            }`}
            onClick={() => onSectionChange(item.id)}
          >
            <div className="admin-sidebar-icon">{item.icon}</div>
            {!collapsed && (
              <span className="admin-sidebar-label">{item.label}</span>
            )}
          </div>
        ))}
      </div>

      <div className="admin-sidebar-footer">
        <div className="admin-sidebar-item">
          <div className="admin-sidebar-icon">
            <LogOut size={20} />
          </div>
          {!collapsed && <span className="admin-sidebar-label">로그아웃</span>}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
