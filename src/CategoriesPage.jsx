import React, { useState, useRef, useEffect } from "react";
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
import {
  Brain,
  Wind,
  Pill,
  UserRound,
  Bone,
  Heart,
  Bed,
  Eye,
  Ear,
  Clipboard,
  Sun,
  Thermometer,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Scissors,
  Smile,
  Sparkles,
  Brush,
  Dumbbell,
  Zap,
  Gem,
} from "lucide-react";
import "./CategoriesPage.css";

const CategoriesPage = ({ currentLocation }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const categoryListRef = useRef(null);

  // 검색 페이지에서 전달받은 서비스 타입 (기본값은 medical)
  const serviceType = location.state?.serviceType || "medical";

  // 메인 페이지에서 선택한 카테고리 ID 가져오기
  const selectedCategory = location.state?.selectedCategory;

  // 메인 카테고리 및 하위 카테고리 상태 관리
  // 전달받은 카테고리 ID가 있으면 해당 카테고리를 초기값으로 설정, 없으면 첫 번째 카테고리 설정
  const [selectedMainCategory, setSelectedMainCategory] = useState(
    selectedCategory ||
      (serviceType === "medical"
        ? mainCategories[0]?.id || ""
        : mainCosmeticCategories[0]?.id || "")
  );

  // 카테고리 목록 표시 상태
  const [showCategoryList, setShowCategoryList] = useState(false);

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

  // Icon mapping for categories based on service type
  const getCategoryIcon = (categoryId) => {
    // 의료 카테고리 아이콘 매핑
    const medicalIconMap = {
      head: <Brain size={24} strokeWidth={1.5} color="#9D65C9" />,
      cold: <Wind size={24} strokeWidth={1.5} color="#FF6B6B" />,
      stomach: <Pill size={24} strokeWidth={1.5} color="#FDA65D" />,
      skin: <UserRound size={24} strokeWidth={1.5} color="#FF9D7B" />,
      joint: <Bone size={24} strokeWidth={1.5} color="#6BCB77" />,
      chest: <Heart size={24} strokeWidth={1.5} color="#FF5A5A" />,
      sleep: <Bed size={24} strokeWidth={1.5} color="#6495ED" />,
      eye: <Eye size={24} strokeWidth={1.5} color="#4D96FF" />,
      ear: <Ear size={24} strokeWidth={1.5} color="#BB86FC" />,
      mental: <Clipboard size={24} strokeWidth={1.5} color="#9C7BFF" />,
      allergy: <Sun size={24} strokeWidth={1.5} color="#FFB74D" />,
      fever: <Thermometer size={24} strokeWidth={1.5} color="#F06292" />,
      default: <Pill size={24} strokeWidth={1.5} color="#555555" />,
    };

    // 시술/성형 카테고리 아이콘 매핑 - CosmeticCategories.jsx에서 동일한 색상 유지
    const cosmeticIconMap = {
      skin: <Brush size={24} strokeWidth={1.5} color="#FF96AD" />,
      face: <Smile size={24} strokeWidth={1.5} color="#B388EB" />,
      body: <Dumbbell size={24} strokeWidth={1.5} color="#44BBA4" />,
      hair: <Scissors size={24} strokeWidth={1.5} color="#3A86FF" />,
      antiaging: <Sparkles size={24} strokeWidth={1.5} color="#FB8379" />,
      dental: <Gem size={24} strokeWidth={1.5} color="#8BD3DD" />,
      injectable: <Zap size={24} strokeWidth={1.5} color="#E07BE0" />,
      lip: <Heart size={24} strokeWidth={1.5} color="#FF6B6B" />,
      scar: <Brush size={24} strokeWidth={1.5} color="#6BCB77" />,
      eyebrow: <Eye size={24} strokeWidth={1.5} color="#FFA69E" />,
      laser: <Zap size={24} strokeWidth={1.5} color="#4D96FF" />,
      weight: <UserRound size={24} strokeWidth={1.5} color="#59A96A" />,
      default: <Sparkles size={24} strokeWidth={1.5} color="#555555" />,
    };

    // 서비스 타입에 따라 다른 아이콘 맵 사용
    const iconMap =
      serviceType === "medical" ? medicalIconMap : cosmeticIconMap;
    return iconMap[categoryId] || iconMap.default;
  };

  // 현재 선택된 카테고리의 라벨 찾기
  const getCurrentCategoryLabel = () => {
    const categories =
      serviceType === "medical" ? mainCategories : mainCosmeticCategories;
    const category = categories.find((cat) => cat.id === selectedMainCategory);
    return category ? category.label : "";
  };

  // 메인 카테고리 변경 핸들러
  const handleMainCategoryChange = (categoryId) => {
    setSelectedMainCategory(categoryId);
    setShowCategoryList(false); // 선택 후 카테고리 목록 닫기

    // 결과 표시 여부 업데이트
    const newSubCategories =
      serviceType === "medical"
        ? subCategories[categoryId] || []
        : subCosmeticCategories[categoryId] || [];

    if (newSubCategories.length > 0) {
      setShowResults(true);
      setSelectedSubCategory(newSubCategories[0]?.id || "");
    } else {
      setShowResults(false);
      setSelectedSubCategory("");
    }
  };

  // 하위 카테고리 변경 핸들러
  const handleSubCategoryChange = (categoryId) => {
    setSelectedSubCategory(categoryId);
    setShowResults(true);
  };

  // 페이지 타이틀 동적 설정
  const getPageTitle = () => {
    return serviceType === "medical" ? "증상" : "부위";
  };

  // 카테고리 목록 토글
  const toggleCategoryList = () => {
    setShowCategoryList(!showCategoryList);
  };

  // 카테고리 목록이 표시될 때 해당 영역으로 스크롤
  useEffect(() => {
    if (showCategoryList && categoryListRef.current) {
      setTimeout(() => {
        categoryListRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [showCategoryList]);

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
        {/* 선택된 메인 카테고리 표시 (아이콘+텍스트) */}
        <div
          className="selected-main-category"
          data-service-type={serviceType}
          onClick={toggleCategoryList}
        >
          <div className="selected-category-content">
            <div
              className={`${
                serviceType === "medical" ? "medical" : "cosmetic"
              }-category-icon-wrapper`}
            >
              {getCategoryIcon(selectedMainCategory)}
            </div>
            <span className="selected-category-name">
              {getCurrentCategoryLabel()}
            </span>
          </div>
          <div className="category-toggle-button">
            {showCategoryList ? (
              <ChevronUp
                size={20}
                strokeWidth={1.5}
                color={serviceType === "medical" ? "#0369a1" : "#c5587d"}
              />
            ) : (
              <ChevronDown
                size={20}
                strokeWidth={1.5}
                color={serviceType === "medical" ? "#0369a1" : "#c5587d"}
              />
            )}
          </div>
        </div>

        {/* 모든 메인 카테고리 목록 (토글 가능) */}
        {showCategoryList && (
          <div
            className="main-category-list"
            data-service-type={serviceType}
            ref={categoryListRef}
          >
            <div className="category-list-header">
              <h3>{serviceType === "medical" ? "증상 선택" : "부위 선택"}</h3>
              <button className="close-button" onClick={toggleCategoryList}>
                <ChevronUp
                  size={20}
                  strokeWidth={1.5}
                  color={serviceType === "medical" ? "#0369a1" : "#c5587d"}
                />
              </button>
            </div>
            <div
              className={`${
                serviceType === "medical" ? "medical" : "cosmetic"
              }-categories`}
            >
              {(serviceType === "medical"
                ? mainCategories
                : mainCosmeticCategories
              ).map((category) => (
                <div
                  key={category.id}
                  className={`${
                    serviceType === "medical" ? "medical" : "cosmetic"
                  }-category-item ${
                    selectedMainCategory === category.id ? "selected" : ""
                  }`}
                  onClick={() => handleMainCategoryChange(category.id)}
                >
                  <div
                    className={`${
                      serviceType === "medical" ? "medical" : "cosmetic"
                    }-category-icon-wrapper`}
                  >
                    {getCategoryIcon(category.id)}
                  </div>
                  <span
                    className={`${
                      serviceType === "medical" ? "medical" : "cosmetic"
                    }-category-name`}
                  >
                    {category.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 하위 카테고리 선택 */}
        <div
          className={`subcategory-selector ${
            showCategoryList ? "with-category-list" : ""
          }`}
        >
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
        </div>

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
