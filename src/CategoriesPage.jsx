import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "./App";
import SymptomSelector from "./SymptomSelector";
import CosmeticSelector from "./CosmeticSelector";
import FilteredResultsView from "./FilteredResultsView";
import DoctorResultsView from "./DoctorResultsView"; // 새로 만든 의사 결과 뷰 컴포넌트 가져오기
import {
  mainCategories,
  subCategories,
  medicalSpecialties,
} from "./medicalCategoryData";
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
  Stethoscope,
  Baby,
  Syringe,
  Activity,
  Leaf,
  Microscope,
  Hospital,
  Clock,
} from "lucide-react";
import "./CategoriesPage.css";
import OptionFilterButtons from "./OptionFilterButtons";
import RegionSelector from "./RegionSelector";

const CategoriesPage = ({ currentLocation }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const categoryListRef = useRef(null);

  // 검색 페이지에서 전달받은 서비스 타입 (기본값은 medical)
  const serviceType = location.state?.serviceType || "medical";

  // 메인 페이지에서 선택한 카테고리 ID 가져오기
  const selectedCategory = location.state?.selectedCategory;
  const selectedSpecialty = location.state?.selectedSpecialty;

  // 메인 카테고리 및 하위 카테고리 상태 관리
  // 전달받은 카테고리 ID가 있으면 해당 카테고리를 초기값으로 설정, 없으면 첫 번째 카테고리 설정
  const [selectedMainCategory, setSelectedMainCategory] = useState(
    selectedCategory ||
      (serviceType === "medical"
        ? mainCategories[0]?.id || ""
        : serviceType === "cosmetic"
        ? mainCosmeticCategories[0]?.id || ""
        : selectedSpecialty || "internal")
  );

  // 카테고리 목록 표시 상태
  const [showCategoryList, setShowCategoryList] = useState(false);

  // 필터 옵션 상태 (진료과목 전용)
  const [selectedFilter, setSelectedFilter] = useState("all");

  // 필터 옵션 정의 (진료과목 전용)
  const filterOptions = [
    { id: "all", label: "전체" },
    { id: "recent", label: "최신순" },
    { id: "rating", label: "평점 높은 순" },
    { id: "reviews", label: "리뷰 많은 순" },
  ];

  // 현재 선택된 메인 카테고리에 해당하는 하위 카테고리 목록
  const currentSubCategories =
    serviceType === "medical"
      ? subCategories[selectedMainCategory] || []
      : serviceType === "cosmetic"
      ? subCosmeticCategories[selectedMainCategory] || []
      : [];

  const [selectedSubCategory, setSelectedSubCategory] = useState(
    currentSubCategories[0]?.id || ""
  );

  // 결과 표시 상태 관리
  const [showResults, setShowResults] = useState(true);

  // Icon mapping for categories based on service type
  const getCategoryIcon = (categoryId, type = serviceType) => {
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

    // 진료과목 아이콘 매핑
    const specialtyIconMap = {
      internal: <Stethoscope size={24} strokeWidth={1.5} color="#3b82f6" />,
      surgery: <Scissors size={24} strokeWidth={1.5} color="#f43f5e" />,
      obgyn: <Baby size={24} strokeWidth={1.5} color="#ec4899" />,
      pediatrics: <Baby size={24} strokeWidth={1.5} color="#8b5cf6" />,
      neurology: <Brain size={24} strokeWidth={1.5} color="#6366f1" />,
      psychiatry: <Brain size={24} strokeWidth={1.5} color="#a855f7" />,
      orthopedics: <Bone size={24} strokeWidth={1.5} color="#2563eb" />,
      dermatology: <UserRound size={24} strokeWidth={1.5} color="#db2777" />,
      ophthalmology: <Eye size={24} strokeWidth={1.5} color="#0ea5e9" />,
      ent: <Ear size={24} strokeWidth={1.5} color="#f59e0b" />,
      urology: <Syringe size={24} strokeWidth={1.5} color="#4f46e5" />,
      dentistry: <Smile size={24} strokeWidth={1.5} color="#0d9488" />,
      rehabilitation: <Clock size={24} strokeWidth={1.5} color="#0891b2" />,
      family: <Heart size={24} strokeWidth={1.5} color="#f97316" />,
      oriental: <Leaf size={24} strokeWidth={1.5} color="#16a34a" />,
      cardiology: <Heart size={24} strokeWidth={1.5} color="#dc2626" />,
      gastroenterology: <Pill size={24} strokeWidth={1.5} color="#9333ea" />,
      pulmonology: <Wind size={24} strokeWidth={1.5} color="#4338ca" />,
      allergy: <Microscope size={24} strokeWidth={1.5} color="#15803d" />,
      endocrinology: <Activity size={24} strokeWidth={1.5} color="#7c3aed" />,
      plastic: <Smile size={24} strokeWidth={1.5} color="#be185d" />,
      pain: <Syringe size={24} strokeWidth={1.5} color="#b91c1c" />,

      // 진료과목 그룹 관련 아이콘
      internalMedicine: (
        <Stethoscope size={24} strokeWidth={1.5} color="#0ea5e9" />
      ),
      surgery: <Scissors size={24} strokeWidth={1.5} color="#8b5cf6" />,
      neuro: <Brain size={24} strokeWidth={1.5} color="#f43f5e" />,
      specializedClinic: (
        <Hospital size={24} strokeWidth={1.5} color="#10b981" />
      ),
      generalPractice: (
        <UserRound size={24} strokeWidth={1.5} color="#f59e0b" />
      ),
      dental: <Gem size={24} strokeWidth={1.5} color="#6366f1" />,
      oriental: <Leaf size={24} strokeWidth={1.5} color="#84cc16" />,

      default: <Stethoscope size={24} strokeWidth={1.5} color="#555555" />,
    };

    // 서비스 타입에 따라 다른 아이콘 맵 사용
    const iconMap =
      type === "medical"
        ? medicalIconMap
        : type === "cosmetic"
        ? cosmeticIconMap
        : specialtyIconMap;

    return iconMap[categoryId] || iconMap.default;
  };

  // 현재 선택된 카테고리의 라벨 찾기
  const getCurrentCategoryLabel = () => {
    if (serviceType === "medical") {
      const category = mainCategories.find(
        (cat) => cat.id === selectedMainCategory
      );
      return category ? category.label : "";
    } else if (serviceType === "cosmetic") {
      const category = mainCosmeticCategories.find(
        (cat) => cat.id === selectedMainCategory
      );
      return category ? category.label : "";
    } else if (serviceType === "specialty") {
      const specialty = medicalSpecialties.find(
        (spec) => spec.id === selectedMainCategory
      );
      return specialty ? specialty.label : "";
    }
    return "";
  };

  // 현재 선택된 카테고리의 설명 찾기
  const getCurrentCategoryDescription = () => {
    if (serviceType === "medical") {
      const category = mainCategories.find(
        (cat) => cat.id === selectedMainCategory
      );
      return category && category.description ? category.description : "";
    } else if (serviceType === "cosmetic") {
      const category = mainCosmeticCategories.find(
        (cat) => cat.id === selectedMainCategory
      );
      return category && category.description ? category.description : "";
    } else if (serviceType === "specialty") {
      const category = medicalSpecialties.find(
        (cat) => cat.id === selectedMainCategory
      );
      return category && category.description ? category.description : "";
    }
    return "";
  };

  // 메인 카테고리 변경 핸들러
  const handleMainCategoryChange = (categoryId) => {
    setSelectedMainCategory(categoryId);
    setShowCategoryList(false); // 선택 후 카테고리 목록 닫기

    // 결과 표시 여부 업데이트
    if (serviceType === "medical" || serviceType === "cosmetic") {
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
    } else if (serviceType === "specialty") {
      setSelectedFilter("all"); // 필터 초기화
      setShowResults(true);
    }
  };

  // 하위 카테고리 변경 핸들러
  const handleSubCategoryChange = (categoryId) => {
    setSelectedSubCategory(categoryId);
    setShowResults(true);
    if (showCategoryList) {
      setShowCategoryList(!showCategoryList);
    }
  };

  // 필터 변경 핸들러 (진료과목 전용)
  const handleFilterChange = (filterId) => {
    setSelectedFilter(filterId);
  };

  // 페이지 타이틀 동적 설정
  const getPageTitle = () => {
    if (serviceType === "medical") return "증상";
    if (serviceType === "cosmetic") return "부위";
    if (serviceType === "specialty") return "진료과목";
    return "카테고리";
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

  // 주 카테고리 목록 렌더링
  const renderMainCategoryList = () => {
    if (serviceType === "medical") {
      return mainCategories.map((category) => (
        <div
          key={category.id}
          className={`${serviceType}-category-item ${
            selectedMainCategory === category.id ? "selected" : ""
          }`}
          onClick={() => handleMainCategoryChange(category.id)}
        >
          <div className={`${serviceType}-category-icon-wrapper`}>
            {getCategoryIcon(category.id)}
          </div>
          <span className={`${serviceType}-category-name`}>
            {category.label}
          </span>
        </div>
      ));
    } else if (serviceType === "cosmetic") {
      return mainCosmeticCategories.map((category) => (
        <div
          key={category.id}
          className={`${serviceType}-category-item ${
            selectedMainCategory === category.id ? "selected" : ""
          }`}
          onClick={() => handleMainCategoryChange(category.id)}
        >
          <div className={`${serviceType}-category-icon-wrapper`}>
            {getCategoryIcon(category.id)}
          </div>
          <span className={`${serviceType}-category-name`}>
            {category.label}
          </span>
        </div>
      ));
    } else if (serviceType === "specialty") {
      return medicalSpecialties.map((specialty) => (
        <div
          key={specialty.id}
          className={`${serviceType}-category-item ${
            selectedMainCategory === specialty.id ? "selected" : ""
          }`}
          onClick={() => handleMainCategoryChange(specialty.id)}
        >
          <div className={`${serviceType}-category-icon-wrapper`}>
            {getCategoryIcon(specialty.id)}
          </div>
          <span className={`${serviceType}-category-name`}>
            {specialty.label}
          </span>
        </div>
      ));
    }
    return null;
  };

  // 서브 카테고리 / 전문과목 선택기 렌더링
  const renderSubCategorySelector = () => {
    if (serviceType === "medical") {
      return (
        <SymptomSelector
          selectedMainCategory={selectedMainCategory}
          selectedSubCategory={selectedSubCategory}
          onMainCategoryChange={handleMainCategoryChange}
          onSubCategoryChange={handleSubCategoryChange}
        />
      );
    } else if (serviceType === "cosmetic") {
      return (
        <CosmeticSelector
          selectedMainCategory={selectedMainCategory}
          selectedSubCategory={selectedSubCategory}
          onMainCategoryChange={handleMainCategoryChange}
          onSubCategoryChange={handleSubCategoryChange}
        />
      );
    } else if (serviceType === "specialty") {
      return (
        <OptionFilterButtons
          onFilterChange={handleFilterChange}
          initialFilter={selectedFilter}
          filterOptions={filterOptions}
        />
      );
    }
    return null;
  };

  // 결과 영역 렌더링
  const renderResults = () => {
    if (!showResults) return null;
    if (showCategoryList) return null;

    // 진료과목(specialty) 페이지인 경우 DoctorResultsView 사용
    if (serviceType === "specialty") {
      return (
        <div className="filtered-results-container">
          <DoctorResultsView
            specialty={selectedMainCategory}
            mainCategory={null}
            subCategory={null}
            filter={selectedFilter}
          />
        </div>
      );
    }
    // 증상 및 부위 페이지에서도 의사 목록을 표시하려면
    // else if (serviceType === "medical") {
    //   return (
    //     <div className="filtered-results-container">
    //       <DoctorResultsView
    //         specialty={null}
    //         mainCategory={selectedMainCategory}
    //         subCategory={selectedSubCategory}
    //       />
    //     </div>
    //   );
    // }
    // 시술/성형 카테고리의 경우 기존 FilteredResultsView 사용
    else {
      return (
        <div className="filtered-results-container">
          <FilteredResultsView
            serviceType={serviceType}
            mainCategory={selectedMainCategory}
            subCategory={selectedSubCategory}
          />
        </div>
      );
    }
  };

  // localStorage에서 선택된 지역 정보 가져오기
  const [selectedRegionName, setSelectedRegionName] = useState("");

  return (
    <div className="container">
      <div className="fixed-header">
        <PageHeader
          title={getPageTitle()}
          showLocationButton={true}
          currentLocation={selectedRegionName || currentLocation}
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
          <div className={`${serviceType}-category-icon-wrapper`}>
            {getCategoryIcon(selectedMainCategory)}
          </div>
          <div className="selected-category-content">
            <div className="selected-category-text">
              <span className="selected-category-name">
                {getCurrentCategoryLabel()}
              </span>
              <span className="selected-category-description">
                {getCurrentCategoryDescription()}
              </span>
            </div>
          </div>
          <div className="category-toggle-button">
            {showCategoryList ? (
              <ChevronUp
                size={20}
                strokeWidth={1.5}
                color={
                  serviceType === "medical"
                    ? "#0369a1"
                    : serviceType === "cosmetic"
                    ? "#c5587d"
                    : "#0d9488"
                }
              />
            ) : (
              <ChevronDown
                size={20}
                strokeWidth={1.5}
                color={
                  serviceType === "medical"
                    ? "#0369a1"
                    : serviceType === "cosmetic"
                    ? "#c5587d"
                    : "#0d9488"
                }
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
            <div className={`${serviceType}-categories-page`}>
              {renderMainCategoryList()}
            </div>
          </div>
        )}

        {/* 하위 카테고리 선택 또는 필터 옵션 */}
        <div
          className={`subcategory-selector ${
            showCategoryList ? "with-category-list" : ""
          }`}
        >
          {renderSubCategorySelector()}
        </div>

        {/* 필터링된 결과 컴포넌트 */}
        {renderResults()}
      </div>
    </div>
  );
};

export default CategoriesPage;
