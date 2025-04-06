import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "./App";
import RegionSelector from "./RegionSelector";

const RegionSelectPage = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState(null);

  const handleRegionSelect = (regionData) => {
    setSelectedRegion(regionData);
    // 데이터 저장을 위한 로직은 여기에 추가할 수 있습니다
    // 예: localStorage, context API 등
  };

  const handleComplete = () => {
    // 선택 완료 시 이전 페이지로 돌아갑니다
    if (selectedRegion && selectedRegion.fullName) {
      // 여기서 지역 정보를 전역 상태나 localStorage에 저장할 수 있습니다
      localStorage.setItem("selectedRegion", JSON.stringify(selectedRegion));
    }
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="fixed-header">
        <PageHeader
          backButtonVisible={true}
          onBack={() => navigate(-1)}
          rightComponent={
            selectedRegion && selectedRegion.fullName ? (
              <button
                onClick={handleComplete}
                style={{
                  backgroundColor: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  padding: "0.5rem 1rem",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                }}
              >
                완료
              </button>
            ) : null
          }
        />
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0.5rem" }}>
        <RegionSelector onRegionSelect={handleRegionSelect} />
      </div>
    </div>
  );
};

export default RegionSelectPage;
