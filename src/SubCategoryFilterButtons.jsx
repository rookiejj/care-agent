import React, { useState, useEffect, useRef } from "react";
import "./SubCategoryFilterButtons.css";

/**
 * 재사용 가능한 서브 카테고리 필터 버튼 컴포넌트
 * @param {Object} props
 * @param {Array} props.filterOptions - 필터 옵션 배열 [{id: string, label: string}, ...]
 * @param {string} props.initialFilter - 초기 선택 필터 ID (기본값: 첫 번째 필터 또는 "all")
 * @param {Function} props.onFilterChange - 필터 변경 시 호출되는 콜백 함수 (filterId, filterGroupId)
 * @param {string} props.filterGroupId - 여러 필터 그룹을 구분하기 위한 고유 ID
 * @param {string} props.color - 활성화된 버튼의 색상 (blue, purple, green, red, yellow)
 * @returns {JSX.Element}
 */
const SubCategoryFilterButtons = ({
  filterOptions = [],
  initialFilter = "",
  onFilterChange,
  filterGroupId = "default",
  color = "blue",
}) => {
  // 옵션이 없는 경우 기본 옵션 제공
  const options =
    filterOptions.length > 0 ? filterOptions : [{ id: "all", label: "전체" }];

  // 초기 필터 설정 (제공된 initialFilter 또는 첫 번째 옵션의 id)
  const defaultFilter = initialFilter || options[0]?.id || "all";

  const [activeFilter, setActiveFilter] = useState(defaultFilter);
  const containerRef = useRef(null);

  // initialFilter prop이 변경되면 activeFilter 상태 업데이트
  useEffect(() => {
    if (initialFilter && initialFilter !== activeFilter) {
      setActiveFilter(initialFilter);
    }
  }, [initialFilter]);

  // 선택된 필터 버튼으로 스크롤
  useEffect(() => {
    const scrollToActiveFilter = () => {
      if (!containerRef.current) return;

      const activeButton = containerRef.current.querySelector(
        `.subcategory-filter-button[data-filter-id="${activeFilter}"]`
      );

      if (activeButton) {
        const container = containerRef.current;
        const containerWidth = container.offsetWidth;
        const buttonLeft = activeButton.offsetLeft;
        const buttonWidth = activeButton.offsetWidth;

        // 버튼이 컨테이너 중앙에 오도록 스크롤 계산
        const scrollPosition =
          buttonLeft - containerWidth / 2 + buttonWidth / 2;

        container.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: "smooth",
        });
      }
    };

    // DOM이 업데이트된 후 스크롤 실행
    const timer = setTimeout(scrollToActiveFilter, 100);
    return () => clearTimeout(timer);
  }, [activeFilter]);

  const handleFilterClick = (filterId) => {
    // 이미 선택된 필터를 다시 클릭하면 무시
    if (filterId === activeFilter) {
      return;
    }

    setActiveFilter(filterId);

    // 상위 컴포넌트에 필터 변경 알림 (필터 ID와 필터 그룹 ID 함께 전달)
    if (onFilterChange) {
      onFilterChange(filterId, filterGroupId);
    }
  };

  return (
    <div
      className="subcategory-filter-container"
      data-filter-group-id={filterGroupId}
      data-color={color}
      ref={containerRef}
    >
      {options.map((option) => (
        <button
          key={`${filterGroupId}-${option.id}`}
          className={`subcategory-filter-button ${
            activeFilter === option.id ? "active" : ""
          }`}
          onClick={() => handleFilterClick(option.id)}
          data-filter-id={option.id}
          data-category={option.id}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SubCategoryFilterButtons;
