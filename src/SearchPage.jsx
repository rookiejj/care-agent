import React, { useState } from "react";
import "./SearchPage.css";
import { PageHeader } from "./App";
import SearchBar from "./SearchBar";
import CategoryFilterButtons from "./CategoryFilterButtons";

const SearchPage = ({ currentLocation, notificationCount }) => {
  const [filters, setFilters] = useState({ medical: true, cosmetic: true });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // 필터 변경에 따른 추가 로직...
  };

  return (
    <div className="container">
      <PageHeader
        title="검색"
        showLocationButton={true}
        currentLocation={currentLocation}
        backButtonVisible={false}
        notificationCount={notificationCount}
        showNotification={true}
      />
      <div className="content">
        <SearchBar style={{ marginBottom: "1rem" }} />
        <CategoryFilterButtons onFilterChange={handleFilterChange} />
      </div>
    </div>
  );
};

export default SearchPage;
