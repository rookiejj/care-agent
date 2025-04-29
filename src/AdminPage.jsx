import React, { useState, useEffect } from "react";
import { useData } from "./DataContext";
import AdminSidebar from "./admin/AdminSidebar";
import AdminHeader from "./admin/AdminHeader";
import Dashboard from "./admin/Dashboard";
import PatientManagement from "./admin/PatientManagement";
import AppointmentManagement from "./admin/AppointmentManagement";
import DoctorManagement from "./admin/DoctorManagement";
import CosmeticProcedureManagement from "./admin/CosmeticProcedureManagement";
import ConsultationManagement from "./admin/ConsultationManagement";
import BeforeAfterManagement from "./admin/BeforeAfterManagement";
import PackageManagement from "./admin/PackageManagement";
import Settings from "./admin/Settings";
import HospitalProfile from "./admin/HospitalProfile";
import Reports from "./admin/Reports";
import "./AdminPage.css";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { userData } = useData();
  const [hospitalData, setHospitalData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 실제 앱에서는 API 호출을 통해 병원 데이터를 가져옴
    // 여기서는 목업 데이터 사용
    const mockHospitalData = {
      id: 1,
      name: "서울 뷰티메디 센터",
      address: "서울시 강남구 테헤란로 123",
      phone: "02-123-4567",
      departments: [
        "내과",
        "소아과",
        "정형외과",
        "피부과",
        "성형외과",
        "미용성형",
        "피부미용",
      ],
      facilityType: "의료/성형 시설",
      doctors: 15,
      patients: 1458,
      appointments: {
        today: 32,
        pending: 5,
        thisWeek: 187,
      },
      hasCosmeticServices: true,
    };

    // 데이터 로딩 시뮬레이션
    setTimeout(() => {
      setHospitalData(mockHospitalData);
      setLoading(false);
    }, 800);
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // 현재 활성화된 섹션에 따라 컴포넌트 렌더링
  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard hospitalData={hospitalData} />;
      case "patients":
        return <PatientManagement />;
      case "appointments":
        return <AppointmentManagement />;
      case "doctors":
        return <DoctorManagement />;
      case "cosmetic":
        return <CosmeticProcedureManagement />;
      case "consultations":
        return <ConsultationManagement />;
      case "beforeafter":
        return <BeforeAfterManagement />;
      case "packages":
        return <PackageManagement />;
      case "profile":
        return <HospitalProfile />;
      case "reports":
        return <Reports />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard hospitalData={hospitalData} />;
    }
  };

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-spinner"></div>
        <p>관리자 페이지 로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        collapsed={sidebarCollapsed}
        hospitalData={hospitalData}
      />
      <div
        className={`admin-main-content ${sidebarCollapsed ? "expanded" : ""}`}
      >
        <AdminHeader
          toggleSidebar={toggleSidebar}
          sidebarCollapsed={sidebarCollapsed}
          hospitalData={hospitalData}
          activeSection={activeSection}
        />
        <div className="admin-content-container">{renderActiveSection()}</div>
      </div>
    </div>
  );
};

export default AdminPage;
