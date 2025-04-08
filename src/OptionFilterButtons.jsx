import React, { useState, useEffect } from "react";
import "./OptionFilterButtons.css";

const OptionFilterButtons = ({
  onFilterChange,
  initialFilter = "all",
  filterOptions = null, // 커스텀 필터 옵션 추가
}) => {
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  // 기본 필터 옵션 정의
  const defaultFilterOptions = [
    { id: "all", label: "전체" },
    { id: "event", label: "이벤트" },
    { id: "recent", label: "최신순" },
    { id: "rating", label: "평점 높은 순" },
  ];

  // 커스텀 옵션이 제공되면 그것을 사용, 아니면 기본 옵션 사용
  const options = filterOptions || defaultFilterOptions;

  useEffect(() => {
    setActiveFilter(initialFilter);
  }, [initialFilter]);

  const handleFilterClick = (filterId) => {
    // 이미 선택된 필터를 다시 클릭하면 무시 (옵션은 하나만 선택 가능)
    if (filterId === activeFilter) {
      return;
    }

    setActiveFilter(filterId);

    // 상위 컴포넌트에 필터 변경 알림
    if (onFilterChange) {
      onFilterChange(filterId);
    }
  };

  return (
    <div className="option-filter-container">
      {options.map((option) => (
        <button
          key={option.id}
          className={`option-filter-button ${
            activeFilter === option.id ? "active" : ""
          }`}
          onClick={() => handleFilterClick(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default OptionFilterButtons;
