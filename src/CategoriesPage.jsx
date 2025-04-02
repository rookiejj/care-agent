import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "./App";
import SymptomSelector from "./SymptomSelector";
import CosmeticSelector from "./CosmeticSelector";
import FilteredResultsView from "./FilteredResultsView";
import { mainCategories, subCategories } from "./medicalCategoryData";
import {
  mainCosmeticCategories,
  subCosmeticCategories,
} from "./cosmeticCategoryData";
import "./CategoriesPage.css";

const CategoriesPage = ({ currentLocation }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // 검색 페이지에서 전달받은 서비스 타입 (기본값은 medical)
  const serviceType = location.state?.serviceType || "medical";

  // 메인 카테고리 및 하위 카테고리 상태 관리
  // 서비스 타입에 따라 초기값 설정
  const [selectedMainCategory, setSelectedMainCategory] = useState(
    serviceType === "medical"
      ? mainCategories[0]?.id || ""
      : mainCosmeticCategories[0]?.id || ""
  );

  // 현재 선택된 메인 카테고리에 해당하는 하위 카테고리 목록
  const currentSubCategories =
    serviceType === "medical"
      ? subCategories[selectedMainCategory] || []
      : subCosmeticCategories[selectedMainCategory] || [];

  const [selectedSubCategory, setSelectedSubCategory] = useState(
    currentSubCategories[0]?.id || ""
  );

  // 결과 표시 상태 관리
  const [showResults, setShowResults] = useState(true);

  // 메인 카테고리 변경 핸들러
  const handleMainCategoryChange = (categoryId) => {
    setSelectedMainCategory(categoryId);

    // 결과 표시 여부 업데이트
    const newSubCategories =
      serviceType === "medical"
        ? subCategories[categoryId] || []
        : subCosmeticCategories[categoryId] || [];

    if (newSubCategories.length > 0) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  // 하위 카테고리 변경 핸들러
  const handleSubCategoryChange = (categoryId) => {
    setSelectedSubCategory(categoryId);
    setShowResults(true);
  };

  // 페이지 타이틀 동적 설정
  const getPageTitle = () => {
    return serviceType === "medical" ? "진료 카테고리" : "시술 카테고리";
  };

  return (
    <div className="container">
      <div className="fixed-header">
        <PageHeader
          title={getPageTitle()}
          showLocationButton={true}
          currentLocation={currentLocation}
          backButtonVisible={true}
          onBack={() => navigate(-1)}
        />
      </div>

      <div className="categories-content">
        {/* 서비스 타입에 따라 다른 선택자 컴포넌트 렌더링 */}
        {serviceType === "medical" ? (
          <SymptomSelector
            selectedMainCategory={selectedMainCategory}
            selectedSubCategory={selectedSubCategory}
            onMainCategoryChange={handleMainCategoryChange}
            onSubCategoryChange={handleSubCategoryChange}
          />
        ) : (
          <CosmeticSelector
            selectedMainCategory={selectedMainCategory}
            selectedSubCategory={selectedSubCategory}
            onMainCategoryChange={handleMainCategoryChange}
            onSubCategoryChange={handleSubCategoryChange}
          />
        )}

        {/* 필터링된 결과 컴포넌트 - 선택된 카테고리에 따라 조건부 렌더링 */}
        {selectedSubCategory && showResults && (
          <div className="filtered-results-container">
            <FilteredResultsView
              serviceType={serviceType}
              mainCategory={selectedMainCategory}
              subCategory={selectedSubCategory}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
