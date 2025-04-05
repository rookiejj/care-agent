import React, { useState, useEffect } from "react";
import {
  topRegions,
  midRegions,
  subRegions,
  regionMedicalStrengths,
  popularRegionSearches,
} from "./regionData";
import "./regionStyles.css";

/**
 * 지역 선택 컴포넌트
 * - 시/도, 구/군, 동/읍/면 3단계 계층 구조로 지역 선택 가능
 * - 인기 지역 바로 선택 기능
 * - 의료 특화 지역 하이라이트 기능
 */
const RegionSelector = ({
  onRegionSelect,
  initialRegionId = null,
  showMedicalSpecialties = true,
  highlightMedicalHubs = true,
}) => {
  // 현재 선택된 지역 상태
  const [selectedTopRegion, setSelectedTopRegion] = useState(null);
  const [selectedMidRegion, setSelectedMidRegion] = useState(null);
  const [selectedSubRegion, setSelectedSubRegion] = useState(null);

  // 현재 단계에 표시할 선택 옵션들
  const [midOptions, setMidOptions] = useState([]);
  const [subOptions, setSubOptions] = useState([]);

  // 초기 지역 ID가 있을 경우 파싱
  useEffect(() => {
    if (initialRegionId) {
      const parts = initialRegionId.split(".");

      if (parts.length >= 1) {
        const topRegion = topRegions.find((r) => r.id === parts[0]);
        setSelectedTopRegion(topRegion || null);
      }

      if (parts.length >= 2 && midRegions[parts[0]]) {
        const midRegion = midRegions[parts[0]].find((r) => r.id === parts[1]);
        setSelectedMidRegion(midRegion || null);
      }

      if (parts.length >= 3 && subRegions[`${parts[0]}.${parts[1]}`]) {
        const subRegion = subRegions[`${parts[0]}.${parts[1]}`].find(
          (r) => r.id === parts[2]
        );
        setSelectedSubRegion(subRegion || null);
      }
    }
  }, [initialRegionId]);

  // 상위 지역 선택 시 하위 옵션 업데이트
  useEffect(() => {
    if (selectedTopRegion) {
      setMidOptions(midRegions[selectedTopRegion.id] || []);
      setSelectedMidRegion(null);
      setSelectedSubRegion(null);
    } else {
      setMidOptions([]);
    }
  }, [selectedTopRegion]);

  useEffect(() => {
    if (selectedTopRegion && selectedMidRegion) {
      const key = `${selectedTopRegion.id}.${selectedMidRegion.id}`;
      setSubOptions(subRegions[key] || []);
      setSelectedSubRegion(null);
    } else {
      setSubOptions([]);
    }
  }, [selectedTopRegion, selectedMidRegion]);

  // 지역 선택 완료 시 콜백
  useEffect(() => {
    if (onRegionSelect) {
      let regionId = null;
      let regionLabel = "";
      let regionSpecialties = [];

      if (selectedTopRegion) {
        regionId = selectedTopRegion.id;
        regionLabel = selectedTopRegion.label;

        if (selectedMidRegion) {
          regionId = `${regionId}.${selectedMidRegion.id}`;
          regionLabel = `${regionLabel} ${selectedMidRegion.label}`;

          const midRegionKey = `${selectedTopRegion.id}.${selectedMidRegion.id}`;
          if (regionMedicalStrengths[midRegionKey]) {
            regionSpecialties = regionMedicalStrengths[midRegionKey];
          }

          if (selectedSubRegion) {
            regionId = `${regionId}.${selectedSubRegion.id}`;
            regionLabel = `${regionLabel} ${selectedSubRegion.label}`;

            // 동/읍/면 단위의 특화 정보가 있으면 추가
            if (selectedSubRegion.medicalSpecialty) {
              regionSpecialties = selectedSubRegion.medicalSpecialty;
            }
          }
        }

        onRegionSelect({
          id: regionId,
          label: regionLabel,
          medicalSpecialties: regionSpecialties,
          isMedicalHub: selectedMidRegion?.isMedicalHub || false,
          hospitalDensity:
            selectedMidRegion?.hospitalDensity ||
            selectedTopRegion.hospitalDensity,
        });
      }
    }
  }, [selectedTopRegion, selectedMidRegion, selectedSubRegion]);

  // 인기 지역 선택 핸들러
  const handlePopularRegionSelect = (regionInfo) => {
    const parts = regionInfo.id.split(".");

    if (parts.length >= 1) {
      const topRegion = topRegions.find((r) => r.id === parts[0]);
      setSelectedTopRegion(topRegion || null);
    }

    if (parts.length >= 2 && midRegions[parts[0]]) {
      setTimeout(() => {
        const midRegion = midRegions[parts[0]].find((r) => r.id === parts[1]);
        setSelectedMidRegion(midRegion || null);
      }, 10);
    }
  };

  return (
    <div className="region-selector">
      <div className="region-selector-popular">
        <h4>인기 지역</h4>
        <div className="popular-regions-wrapper">
          {popularRegionSearches.slice(0, 8).map((region) => (
            <button
              key={region.id}
              onClick={() => handlePopularRegionSelect(region)}
              className={`popular-region-btn ${region.category}`}
            >
              {region.label}
              {region.category === "plastic_beauty" && (
                <span className="specialty-tag">성형/미용</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="region-selection-steps">
        {/* 1단계: 시/도 선택 */}
        <div className="region-step">
          <h4>시/도 선택</h4>
          <div className="region-options">
            {topRegions.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedTopRegion(region)}
                className={`region-btn ${
                  selectedTopRegion?.id === region.id ? "selected" : ""
                } ${region.hospitalDensity}`}
              >
                {region.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2단계: 구/군 선택 */}
        {selectedTopRegion && (
          <div className="region-step">
            <h4>{selectedTopRegion.label} 내 구/군 선택</h4>
            <div className="region-options">
              {midOptions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setSelectedMidRegion(region)}
                  className={`region-btn ${
                    selectedMidRegion?.id === region.id ? "selected" : ""
                  } ${region.hospitalDensity}`}
                >
                  {region.label}
                  {highlightMedicalHubs && region.isMedicalHub && (
                    <span className="medical-hub-tag">의료특화</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 3단계: 동/읍/면 선택 (선택사항) */}
        {selectedTopRegion && selectedMidRegion && subOptions.length > 0 && (
          <div className="region-step">
            <h4>{selectedMidRegion.label} 내 동/읍/면 선택 (선택사항)</h4>
            <div className="region-options">
              {subOptions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setSelectedSubRegion(region)}
                  className={`region-btn ${
                    selectedSubRegion?.id === region.id ? "selected" : ""
                  }`}
                >
                  {region.label}
                  {showMedicalSpecialties &&
                    region.medicalSpecialty?.includes("plastic") && (
                      <span className="specialty-tag plastic">성형</span>
                    )}
                  {showMedicalSpecialties &&
                    region.medicalSpecialty?.includes("dermatology") && (
                      <span className="specialty-tag dermatology">피부</span>
                    )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 현재 선택 경로 표시 */}
      <div className="selected-path">
        {selectedTopRegion && (
          <span>
            {selectedTopRegion.label}
            {selectedMidRegion && (
              <>
                {" "}
                &gt; {selectedMidRegion.label}
                {selectedSubRegion && <> &gt; {selectedSubRegion.label}</>}
              </>
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default RegionSelector;
