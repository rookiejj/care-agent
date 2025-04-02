import React, { useRef, useEffect } from "react";
import SubCategoryFilterButtons from "./SubCategoryFilterButtons";
import { mainCategories, subCategories } from "./medicalCategoryData";
import "./SymptomSelector.css";

// 리팩토링된 비대면 진료 증상 선택 컴포넌트 - 필터링 결과를 직접 포함하지 않음
const SymptomSelector = ({
  selectedMainCategory,
  selectedSubCategory,
  onMainCategoryChange,
  onSubCategoryChange,
}) => {
  // 현재 선택된 메인 카테고리에 해당하는 하위 카테고리 목록
  const currentSubCategories = subCategories[selectedMainCategory] || [];

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
    // 메인 카테고리가 변경되면 해당 카테고리의 첫 번째 하위 카테고리 선택
    const newSubCategories = subCategories[categoryId] || [];
    const firstSubCategory = newSubCategories[0]?.id || "";

    // 부모 컴포넌트에 상태 변경 알림
    onMainCategoryChange(categoryId);
    onSubCategoryChange(firstSubCategory);

    // DOM 업데이트 후 스크롤 위치 부드럽게 초기화
    setTimeout(() => {
      // 실제 스크롤이 발생하는 요소 선택 시도
      const directScrollElement = document.querySelector(
        "#sub-symptoms .scrollable-container"
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
    onSubCategoryChange(categoryId);
  };

  return (
    <div className="category-fixed-container">
      {/* 메인 카테고리 선택 (큰 증상 영역) */}
      <div className="symptom-selector-main-category">
        <SubCategoryFilterButtons
          filterOptions={mainCategories}
          initialFilter={selectedMainCategory}
          onFilterChange={handleMainCategoryChange}
          filterGroupId="main-symptoms"
          color="blue"
        />
      </div>

      {/* 하위 카테고리 선택 (세부 증상) */}
      <div
        className="symptom-selector-sub-category"
        ref={subCategoryContainerRef}
      >
        {currentSubCategories.length > 0 ? (
          <SubCategoryFilterButtons
            filterOptions={currentSubCategories}
            initialFilter={selectedSubCategory}
            onFilterChange={handleSubCategoryChange}
            filterGroupId="sub-symptoms"
            color="green"
          />
        ) : (
          <p className="symptom-selector-no-selection">
            먼저 증상 영역을 선택해주세요.
          </p>
        )}
      </div>
    </div>
  );
};

export default SymptomSelector;
