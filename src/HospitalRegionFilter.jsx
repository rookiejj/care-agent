import React, { useState, useEffect } from "react";
import RegionSelector from "./RegionSelector";
import { regionMedicalStrengths, regionMetadata } from "./regionData";
import "./hospitalRegionFilter.css";

/**
 * 지역 기반 병원 필터 컴포넌트
 * - 지역 선택 및 해당 지역의 의료 특성에 기반한 필터링 제공
 */
const HospitalRegionFilter = ({
  onFilterChange,
  initialFilters = {},
  allowMultipleRegions = false,
}) => {
  // 필터 상태
  const [filters, setFilters] = useState({
    regions: initialFilters.regions || [],
    specialties: initialFilters.specialties || [],
    hospitalTypes: initialFilters.hospitalTypes || [],
    radius: initialFilters.radius || 5, // km 단위 (기본값 5km)
    ...initialFilters,
  });

  // 선택한 지역 정보
  const [selectedRegions, setSelectedRegions] = useState([]);

  // 필터 변경 시 상위 컴포넌트에 알림
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  }, [filters]);

  // 지역 선택 핸들러
  const handleRegionSelect = (regionInfo) => {
    if (allowMultipleRegions) {
      // 이미 선택된 지역이면 제거, 아니면 추가
      const isAlreadySelected = selectedRegions.some(
        (r) => r.id === regionInfo.id
      );

      if (isAlreadySelected) {
        const updatedRegions = selectedRegions.filter(
          (r) => r.id !== regionInfo.id
        );
        setSelectedRegions(updatedRegions);

        // 필터에서도 제거
        setFilters((prev) => ({
          ...prev,
          regions: prev.regions.filter((id) => id !== regionInfo.id),
        }));
      } else {
        // 최대 3개까지만 선택 가능하도록 제한
        if (selectedRegions.length < 3) {
          setSelectedRegions([...selectedRegions, regionInfo]);

          // 필터에 추가
          setFilters((prev) => ({
            ...prev,
            regions: [...prev.regions, regionInfo.id],
          }));
        }
      }
    } else {
      // 단일 선택 모드
      setSelectedRegions([regionInfo]);

      // 필터 업데이트
      setFilters((prev) => ({
        ...prev,
        regions: [regionInfo.id],
      }));

      // 지역별 특화 진료과목이 있으면 자동으로 필터 추천
      if (
        regionInfo.medicalSpecialties &&
        regionInfo.medicalSpecialties.length > 0
      ) {
        // 특화 진료과목 필터 자동 설정 (옵션)
        // setFilters(prev => ({
        //   ...prev,
        //   specialties: regionInfo.medicalSpecialties
        // }));
      }
    }
  };

  // 선택한 지역 제거 핸들러
  const handleRemoveRegion = (regionId) => {
    const updatedRegions = selectedRegions.filter((r) => r.id !== regionId);
    setSelectedRegions(updatedRegions);

    // 필터에서도 제거
    setFilters((prev) => ({
      ...prev,
      regions: prev.regions.filter((id) => id !== regionId),
    }));
  };

  // 반경 변경 핸들러
  const handleRadiusChange = (radius) => {
    setFilters((prev) => ({
      ...prev,
      radius,
    }));
  };

  // 진료과목 필터 변경 핸들러
  const handleSpecialtyChange = (specialty) => {
    setFilters((prev) => {
      const specialties = [...prev.specialties];
      const index = specialties.indexOf(specialty);

      if (index > -1) {
        specialties.splice(index, 1); // 이미 있으면 제거
      } else {
        specialties.push(specialty); // 없으면 추가
      }

      return {
        ...prev,
        specialties,
      };
    });
  };

  // 병원 유형 필터 변경 핸들러
  const handleHospitalTypeChange = (type) => {
    setFilters((prev) => {
      const hospitalTypes = [...prev.hospitalTypes];
      const index = hospitalTypes.indexOf(type);

      if (index > -1) {
        hospitalTypes.splice(index, 1); // 이미 있으면 제거
      } else {
        hospitalTypes.push(type); // 없으면 추가
      }

      return {
        ...prev,
        hospitalTypes,
      };
    });
  };

  // 필터 모두 초기화
  const resetAllFilters = () => {
    setSelectedRegions([]);
    setFilters({
      regions: [],
      specialties: [],
      hospitalTypes: [],
      radius: 5,
    });
  };

  return (
    <div className="hrf-container">
      <div className="hrf-filter-section">
        <h3 className="hrf-heading3">지역 선택</h3>
        <RegionSelector
          onRegionSelect={handleRegionSelect}
          highlightMedicalHubs={true}
          showMedicalSpecialties={true}
        />

        {/* 현재 선택된 지역 표시 */}
        {selectedRegions.length > 0 && (
          <div className="hrf-selected-regions">
            <h4 className="hrf-heading4">선택된 지역</h4>
            <div className="hrf-region-tags">
              {selectedRegions.map((region) => (
                <div key={region.id} className="hrf-region-tag">
                  <span>{region.label}</span>
                  <button
                    className="hrf-remove-btn"
                    onClick={() => handleRemoveRegion(region.id)}
                  >
                    ×
                  </button>
                  {region.isMedicalHub && (
                    <span className="hrf-tag hrf-tag-medical-hub">
                      의료특화
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 검색 반경 설정 */}
      {selectedRegions.length > 0 && (
        <div className="hrf-filter-section">
          <h3 className="hrf-heading3">검색 반경</h3>
          <div className="hrf-radius-selector">
            <input
              type="range"
              min="1"
              max="20"
              value={filters.radius}
              onChange={(e) => handleRadiusChange(parseInt(e.target.value))}
            />
            <span>{filters.radius}km</span>
          </div>
        </div>
      )}

      {/* 진료과목 필터 */}
      <div className="hrf-filter-section">
        <h3 className="hrf-heading3">진료과목</h3>
        <div className="hrf-specialty-filters">
          {/* 주요 진료과목 체크박스 */}
          <div className="hrf-checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={filters.specialties.includes("plastic")}
                onChange={() => handleSpecialtyChange("plastic")}
              />
              성형외과
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.specialties.includes("dermatology")}
                onChange={() => handleSpecialtyChange("dermatology")}
              />
              피부과
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.specialties.includes("dental")}
                onChange={() => handleSpecialtyChange("dental")}
              />
              치과
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.specialties.includes("ophthalmology")}
                onChange={() => handleSpecialtyChange("ophthalmology")}
              />
              안과
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.specialties.includes("internal")}
                onChange={() => handleSpecialtyChange("internal")}
              />
              내과
            </label>
            {/* 필요에 따라 더 추가 */}
          </div>
        </div>
      </div>

      {/* 병원 유형 필터 */}
      <div className="hrf-filter-section">
        <h3 className="hrf-heading3">병원 유형</h3>
        <div className="hrf-hospital-type-filters">
          <div className="hrf-checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={filters.hospitalTypes.includes("clinic")}
                onChange={() => handleHospitalTypeChange("clinic")}
              />
              의원
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.hospitalTypes.includes("hospital")}
                onChange={() => handleHospitalTypeChange("hospital")}
              />
              병원
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.hospitalTypes.includes("general")}
                onChange={() => handleHospitalTypeChange("general")}
              />
              종합병원
            </label>
            <label>
              <input
                type="checkbox"
                checked={filters.hospitalTypes.includes("university")}
                onChange={() => handleHospitalTypeChange("university")}
              />
              대학병원
            </label>
          </div>
        </div>
      </div>

      {/* 필터 초기화 버튼 */}
      <div className="hrf-filter-actions">
        <button className="hrf-reset-btn" onClick={resetAllFilters}>
          필터 초기화
        </button>
        <button className="hrf-apply-btn">적용하기</button>
      </div>
    </div>
  );
};

export default HospitalRegionFilter;
