import React, { useState, useRef, useEffect } from "react";
import SubCategoryFilterButtons from "./SubCategoryFilterButtons";
import {
  mainCosmeticCategories,
  subCosmeticCategories,
} from "./cosmeticCategoryData";
import "./CosmeticSelector.css";

// 시술/성형 선택 컴포넌트
const CosmeticSelector = () => {
  // 선택된 메인 카테고리 관리
  const [selectedMainCategory, setSelectedMainCategory] = useState(
    mainCosmeticCategories[0]?.id || ""
  );

  // 현재 선택된 메인 카테고리에 해당하는 하위 카테고리 목록
  const currentSubCategories =
    subCosmeticCategories[selectedMainCategory] || [];

  // 선택된 하위 카테고리 관리 (초기값으로 첫 번째 하위 카테고리 설정)
  const [selectedSubCategory, setSelectedSubCategory] = useState(
    currentSubCategories[0]?.id || ""
  );

  // 서브 카테고리 컨테이너에 대한 ref 생성
  const subCategoryContainerRef = useRef(null);

  // 부드러운 스크롤 함수
  const smoothScrollToLeft = (element, duration = 300) => {
    if (!element) return;

    const start = element.scrollLeft;
    const change = -start; // 0으로 이동하기 위한 변화량
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;

      if (elapsedTime > duration) {
        element.scrollLeft = 0;
        return;
      }

      // easeOutQuad 애니메이션 함수 사용
      const progress = elapsedTime / duration;
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      element.scrollLeft = start + change * easeProgress;

      requestAnimationFrame(animateScroll);
    };

    requestAnimationFrame(animateScroll);
  };

  // 메인 카테고리 변경 처리
  const handleMainCategoryChange = (categoryId) => {
    setSelectedMainCategory(categoryId);

    // 메인 카테고리가 변경되면 해당 카테고리의 첫 번째 하위 카테고리로 자동 선택
    const newSubCategories = subCosmeticCategories[categoryId] || [];
    const firstSubCategory = newSubCategories[0]?.id || "";
    setSelectedSubCategory(firstSubCategory);

    // DOM 업데이트 후 스크롤 위치 부드럽게 초기화
    setTimeout(() => {
      // 실제 스크롤이 발생하는 요소 선택 시도
      const directScrollElement = document.querySelector(
        "#sub-cosmetic .scrollable-container"
      );

      if (directScrollElement) {
        smoothScrollToLeft(directScrollElement);
        return;
      }

      // 다른 가능한 스크롤 요소들 찾기
      const scrollableElements =
        subCategoryContainerRef.current?.querySelectorAll(
          ".horizontal-scrollable"
        );
      if (scrollableElements && scrollableElements.length > 0) {
        scrollableElements.forEach((element) => {
          smoothScrollToLeft(element);
        });
        return;
      }

      // 스크롤 가능한 모든 div 요소 찾기
      const allPossibleScrollElements =
        subCategoryContainerRef.current?.querySelectorAll("div");
      if (allPossibleScrollElements) {
        allPossibleScrollElements.forEach((element) => {
          if (element.scrollWidth > element.clientWidth) {
            smoothScrollToLeft(element);
          }
        });
      }
    }, 100); // DOM 업데이트를 위한 짧은 지연
  };

  // 하위 카테고리 변경 처리
  const handleSubCategoryChange = (categoryId) => {
    setSelectedSubCategory(categoryId);
  };

  // 선택된 메인 카테고리 정보 가져오기
  const selectedMainCategoryInfo = mainCosmeticCategories.find(
    (c) => c.id === selectedMainCategory
  );

  // 선택된 하위 카테고리 정보 가져오기
  const selectedSubCategoryInfo = currentSubCategories.find(
    (c) => c.id === selectedSubCategory
  );

  return (
    <div className="section-container">
      {/* 메인 카테고리 선택 (분야) */}
      <div className="cosmetic-selector-main-category">
        <SubCategoryFilterButtons
          filterOptions={mainCosmeticCategories}
          initialFilter={selectedMainCategory}
          onFilterChange={handleMainCategoryChange}
          filterGroupId="main-cosmetic"
          color="purple"
        />
      </div>

      {/* 하위 카테고리 선택 (세부 시술) */}
      <div
        className="cosmetic-selector-sub-category"
        ref={subCategoryContainerRef}
      >
        {currentSubCategories.length > 0 ? (
          <SubCategoryFilterButtons
            filterOptions={currentSubCategories}
            initialFilter={selectedSubCategory}
            onFilterChange={handleSubCategoryChange}
            filterGroupId="sub-cosmetic"
            color="pink"
          />
        ) : (
          <p className="cosmetic-selector-no-selection">
            먼저 시술 분야를 선택해주세요.
          </p>
        )}
      </div>

      {/* 선택된 시술/성형 표시 */}
      {selectedSubCategory && (
        <div className="cosmetic-selector-result">
          <h3 className="cosmetic-selector-result-title">선택하신 시술</h3>
          <p className="cosmetic-selector-result-item">
            <span className="cosmetic-selector-result-label">분야: </span>
            {selectedMainCategoryInfo?.label || ""}
          </p>
          <p className="cosmetic-selector-result-item">
            <span className="cosmetic-selector-result-label">세부 시술: </span>
            {selectedSubCategoryInfo?.label || ""}
          </p>
          <button className="cosmetic-selector-start-button">
            이 시술로 상담 시작하기
          </button>
        </div>
      )}
    </div>
  );
};

export default CosmeticSelector;
