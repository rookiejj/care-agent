import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SuperAdminSidebar from "./super-admin/SuperAdminSidebar";
import SuperAdminHeader from "./super-admin/SuperAdminHeader";
import SuperAdminDashboard from "./super-admin/SuperAdminDashboard";
import HospitalManagement from "./super-admin/HospitalManagement";
import UserManagement from "./super-admin/UserManagement";
import ContentManagement from "./super-admin/ContentManagement";
import PaymentManagement from "./super-admin/PaymentManagement";
import SystemSettings from "./super-admin/SystemSettings";
import LogsReports from "./super-admin/LogsReports";
import CustomerSupport from "./super-admin/CustomerSupport";
import "./SuperAdminPage.css";

const SuperAdminPage = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [platformData, setPlatformData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDetailView, setSelectedDetailView] = useState(null);

  useEffect(() => {
    // 실제 앱에서는 API 호출을 통해 플랫폼 데이터를 가져옴
    // 여기서는 목업 데이터 사용
    const mockPlatformData = {
      name: "메디컬 케어 플랫폼",
      version: "1.5.2",
      stats: {
        hospitals: 287,
        users: 12458,
        appointments: 8754,
        revenue: 457890000,
      },
      lastUpdate: "2025-05-15T12:34:56Z",
    };

    // 데이터 로딩 시뮬레이션
    setTimeout(() => {
      setPlatformData(mockPlatformData);
      setLoading(false);
    }, 800);
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    // 상세 보기가 열려있다면 닫기
    if (selectedDetailView) {
      setSelectedDetailView(null);
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // 현재 활성화된 섹션에 따라 컴포넌트 렌더링
  const renderActiveSection = () => {
    // 상세 페이지가 선택되었을 경우 해당 컴포넌트를 렌더링
    if (selectedDetailView) {
      switch (selectedDetailView.type) {
        case "hospitalDetail":
          return (
            <HospitalManagement
              viewMode="detail"
              itemId={selectedDetailView.id}
              onBack={() => setSelectedDetailView(null)}
            />
          );
        case "userDetail":
          return (
            <UserManagement
              viewMode="detail"
              itemId={selectedDetailView.id}
              onBack={() => setSelectedDetailView(null)}
            />
          );
        default:
          return (
            <SuperAdminDashboard
              platformData={platformData}
              onSectionChange={handleSectionChange}
            />
          );
      }
    }

    switch (activeSection) {
      case "dashboard":
        return (
          <SuperAdminDashboard
            platformData={platformData}
            onSectionChange={handleSectionChange}
            onViewDetail={(type, id) => setSelectedDetailView({ type, id })}
          />
        );
      case "hospitals":
        return (
          <HospitalManagement
            onViewDetail={(id) =>
              setSelectedDetailView({ type: "hospitalDetail", id })
            }
          />
        );
      case "users":
        return (
          <UserManagement
            onViewDetail={(id) =>
              setSelectedDetailView({ type: "userDetail", id })
            }
          />
        );
      case "content":
        return <ContentManagement />;
      case "payments":
        return <PaymentManagement />;
      case "settings":
        return <SystemSettings />;
      case "logs":
        return <LogsReports />;
      case "support":
        return <CustomerSupport />;
      default:
        return (
          <SuperAdminDashboard
            platformData={platformData}
            onSectionChange={handleSectionChange}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="super-admin-loading-container">
        <div className="super-admin-loading-spinner"></div>
        <p>슈퍼 관리자 페이지 로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="super-admin-page">
      <SuperAdminSidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        collapsed={sidebarCollapsed}
        platformData={platformData}
      />
      <div
        className={`super-admin-main-content ${
          sidebarCollapsed ? "expanded" : ""
        }`}
      >
        <SuperAdminHeader
          toggleSidebar={toggleSidebar}
          sidebarCollapsed={sidebarCollapsed}
          platformData={platformData}
          activeSection={activeSection}
        />
        <div className="super-admin-content-container">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminPage;
