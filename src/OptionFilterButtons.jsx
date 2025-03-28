import React, { useState } from "react";
import "./OptionFilterButtons.css";

const OptionFilterButtons = ({ onFilterChange, initialFilter = "all" }) => {
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  // 필터 옵션 정의 - 추후 옵션 추가/삭제가 용이하도록 배열로 정의
  const filterOptions = [
    { id: "all", label: "전체" },
    { id: "event", label: "이벤트" },
    { id: "recent", label: "최신순" },
    { id: "nearby", label: "가까운 순" },
    { id: "rating", label: "평점 높은 순" },
  ];

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
      {filterOptions.map((option) => (
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
