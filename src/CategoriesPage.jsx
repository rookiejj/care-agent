import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./CategoriesPage.css";
import { PageHeader } from "./App";
import SymptomSelector from "./SymptomSelector";
import CosmeticSelector from "./CosmeticSelector";

const CategoriesPage = ({ currentLocation }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // 검색 페이지에서 전달받은 서비스 타입 (기본값은 medical)
  const serviceType = location.state?.serviceType || "medical";

  // 페이지 타이틀 동적 설정
  const getPageTitle = () => {
    return serviceType === "medical" ? "진료 카테고리" : "시술 카테고리";
  };

  return (
    <div className="container">
      <PageHeader
        title={getPageTitle()}
        showLocationButton={true}
        currentLocation={currentLocation}
        backButtonVisible={true}
        onBack={() => navigate(-1)}
      />

      <div className="content">
        {/* 서비스 타입에 따라 다른 선택자 컴포넌트 렌더링 */}
        {serviceType === "medical" ? <SymptomSelector /> : <CosmeticSelector />}
      </div>
    </div>
  );
};

export default CategoriesPage;
