import React, { useState } from "react";
import "./CategoryFilterButtons.css";

const CategoryFilterButtons = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    switch (filter) {
      case "all":
        onFilterChange({ medical: true, cosmetic: true });
        break;
      case "medical":
        onFilterChange({ medical: true, cosmetic: false });
        break;
      case "cosmetic":
        onFilterChange({ medical: false, cosmetic: true });
        break;
    }
  };

  return (
    <div className="category-filter-container">
      <button
        className={`filter-button ${activeFilter === "all" ? "active" : ""}`}
        onClick={() => handleFilterClick("all")}
      >
        전체
      </button>
      <button
        className={`filter-button medical ${
          activeFilter === "medical" ? "active" : ""
        }`}
        onClick={() => handleFilterClick("medical")}
      >
        진료
      </button>
      <button
        className={`filter-button cosmetic ${
          activeFilter === "cosmetic" ? "active" : ""
        }`}
        onClick={() => handleFilterClick("cosmetic")}
      >
        시술
      </button>
    </div>
  );
};

export default CategoryFilterButtons;
