import React, { useState, useEffect } from "react";
import { MapPinIcon, ChevronRightIcon } from "lucide-react";
import { topRegions, midRegions } from "./regionData";
import { subRegions } from "./subregions";
import "./RegionSelector.css";

const RegionSelector = ({ onRegionSelect = () => {} }) => {
  // 선택된 지역 상태 - 초기값은 전체 선택으로 설정하고 나중에 덮어씀
  const [selectedCity, setSelectedCity] = useState({
    id: "all",
    label: "전체",
    isAll: true,
  });
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(null);

  // 저장된 지역 정보 불러와서 초기화
  useEffect(() => {
    const loadSavedRegion = () => {
      const savedRegion = localStorage.getItem("selectedRegion");
      if (savedRegion) {
        try {
          const regionData = JSON.parse(savedRegion);

          // 시/도 정보 복원
          if (regionData.isAllCity) {
            setSelectedCity({
              id: "all",
              label: "전체",
              isAll: true,
            });
          } else if (regionData.city && regionData.cityName) {
            const city = {
              id: regionData.city,
              label: regionData.cityName,
              isAll: false,
            };
            setSelectedCity(city);

            // 구/군 정보 복원 (시/도가 전체가 아닐 경우)
            if (regionData.district !== null) {
              if (regionData.isAllDistrict) {
                // 전체 구/군 선택된 경우
                setTimeout(() => {
                  setSelectedDistrict({
                    id: "all",
                    label: "전체",
                    isAll: true,
                  });
                }, 100); // 시/도 선택 후 구/군 목록이 로드될 시간 부여
              } else if (regionData.district && regionData.districtName) {
                // 특정 구/군 선택된 경우
                setTimeout(() => {
                  setSelectedDistrict({
                    id: regionData.district,
                    label: regionData.districtName,
                    isAll: false,
                  });

                  // 동/읍/면 정보 복원 (구/군이 전체가 아닐 경우)
                  if (regionData.neighborhood !== null) {
                    if (regionData.isAllNeighborhood) {
                      // 전체 동/읍/면 선택된 경우
                      setTimeout(() => {
                        setSelectedNeighborhood({
                          id: "all",
                          label: "전체",
                          isAll: true,
                        });
                      }, 200); // 구/군 선택 후 동/읍/면 목록이 로드될 시간 부여
                    } else if (
                      regionData.neighborhood &&
                      regionData.neighborhoodName
                    ) {
                      // 특정 동/읍/면 선택된 경우
                      setTimeout(() => {
                        setSelectedNeighborhood({
                          id: regionData.neighborhood,
                          label: regionData.neighborhoodName,
                          isAll: false,
                        });
                      }, 200);
                    }
                  }
                }, 100);
              }
            }
          }
        } catch (e) {
          console.error("Failed to parse saved region", e);
        }
      }
    };

    loadSavedRegion();
  }, []);

  // 현재 표시할 리스트
  const [districtList, setDistrictList] = useState([]);
  const [neighborhoodList, setNeighborhoodList] = useState([]);

  // 선택된 시/도가 변경되면 해당 시/도의 구/군 목록 업데이트
  useEffect(() => {
    if (selectedCity) {
      // 전체 시/도 선택시에는 구/군 목록 비우기
      if (selectedCity.isAll) {
        setDistrictList([]);
      } else {
        setDistrictList(midRegions[selectedCity.id] || []);
      }
      setSelectedDistrict(null);
      setSelectedNeighborhood(null);
    } else {
      setDistrictList([]);
    }
  }, [selectedCity]);

  // 선택된 구/군이 변경되면 해당 구/군의 동/읍/면 목록 업데이트
  useEffect(() => {
    if (selectedCity && selectedDistrict && !selectedDistrict.isAll) {
      const key = `${selectedCity.id}.${selectedDistrict.id}`;
      setNeighborhoodList(subRegions[key] || []);
      setSelectedNeighborhood(null);
    } else {
      setNeighborhoodList([]);
    }
  }, [selectedCity, selectedDistrict]);

  // 지역 선택 완료 시 콜백
  useEffect(() => {
    let selection = {
      city: selectedCity ? selectedCity.id : null,
      cityName: selectedCity ? selectedCity.label : null,
      district: selectedDistrict ? selectedDistrict.id : null,
      districtName: selectedDistrict ? selectedDistrict.label : null,
      neighborhood: selectedNeighborhood ? selectedNeighborhood.id : null,
      neighborhoodName: selectedNeighborhood
        ? selectedNeighborhood.label
        : null,
      fullName: getFullSelectionName(),
      isAllCity: selectedCity?.isAll || false,
      isAllDistrict: selectedDistrict?.isAll || false,
      isAllNeighborhood: selectedNeighborhood?.isAll || false,
    };

    onRegionSelect(selection);
  }, [selectedCity, selectedDistrict, selectedNeighborhood]);

  // 전체 선택된 지역명 생성 - 수정된 버전
  const getFullSelectionName = () => {
    // 1. 전체 지역 선택 (최상위 전체)
    if (selectedCity && selectedCity.isAll) {
      return "전체지역";
    }

    // 2. 시/도만 선택
    if (selectedCity && !selectedDistrict) {
      return selectedCity.label;
    }

    // 3. 시/도 및 구/군 전체 선택
    if (selectedCity && selectedDistrict && selectedDistrict.isAll) {
      return selectedCity.label;
    }

    // 4. 시/도, 구/군 선택, 동/읍/면 선택 안함
    if (
      selectedCity &&
      selectedDistrict &&
      !selectedDistrict.isAll &&
      !selectedNeighborhood
    ) {
      return `${selectedCity.label} ${selectedDistrict.label}`;
    }

    // 5. 시/도, 구/군, 동/읍/면 전체 선택
    if (
      selectedCity &&
      selectedDistrict &&
      !selectedDistrict.isAll &&
      selectedNeighborhood &&
      selectedNeighborhood.isAll
    ) {
      return `${selectedCity.label} ${selectedDistrict.label}`;
    }

    // 6. 시/도, 구/군, 특정 동/읍/면 선택
    if (
      selectedCity &&
      selectedDistrict &&
      !selectedDistrict.isAll &&
      selectedNeighborhood &&
      !selectedNeighborhood.isAll
    ) {
      return `${selectedCity.label} ${selectedDistrict.label} ${selectedNeighborhood.label}`;
    }

    // 기본값, 아무것도 선택 안된 경우
    return "";
  };

  // 도시 선택 핸들러
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedDistrict(null);
    setSelectedNeighborhood(null);
  };

  // 구/군 선택 핸들러
  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setSelectedNeighborhood(null);
  };

  // 동/읍/면 선택 핸들러
  const handleNeighborhoodSelect = (neighborhood) => {
    setSelectedNeighborhood(neighborhood);
  };

  // "전체" 선택 핸들러
  const handleSelectAll = (level) => {
    const allRegion = {
      id: "all",
      label: "전체",
      isAll: true,
    };

    if (level === "city") {
      // 시/도 전체 선택
      setSelectedCity(allRegion);
      setSelectedDistrict(null);
      setSelectedNeighborhood(null);
    } else if (level === "district") {
      // 구/군 전체 선택 (선택된 시/도는 유지)
      setSelectedDistrict(allRegion);
      setSelectedNeighborhood(null);
    } else if (level === "neighborhood") {
      // 동/읍/면 전체 선택 (선택된 시/도, 구/군은 유지)
      setSelectedNeighborhood(allRegion);
    }
  };

  // 현재 선택 경로 표시용 텍스트
  const getPathDisplayText = (level) => {
    if (level === "city") {
      return selectedCity.isAll ? "전체지역" : selectedCity.label;
    } else if (level === "district") {
      return selectedDistrict.isAll ? "전체" : selectedDistrict.label;
    } else if (level === "neighborhood") {
      return selectedNeighborhood.isAll ? "전체" : selectedNeighborhood.label;
    }
    return "";
  };

  // 지역 선택 해제 핸들러
  const clearSelection = (level) => {
    if (level === "city") {
      setSelectedCity(null);
      setSelectedDistrict(null);
      setSelectedNeighborhood(null);
    } else if (level === "district") {
      setSelectedDistrict(null);
      setSelectedNeighborhood(null);
    } else if (level === "neighborhood") {
      setSelectedNeighborhood(null);
    }
  };

  // 특수 태그 렌더링 함수
  const renderSpecialtyTag = (region) => {
    if (!region) return null;

    const tags = [];
    if (region.isMedicalHub) {
      tags.push(
        <span key="hub" className="tag medical-hub">
          의료특화
        </span>
      );
    } else if (region.hospitalDensity === "very_high") {
      tags.push(
        <span key="hospital" className="tag hospital-high">
          병원多
        </span>
      );
    } else if (
      region.medicalSpecialty &&
      region.medicalSpecialty.includes("plastic")
    ) {
      tags.push(
        <span key="plastic" className="tag specialty-plastic">
          성형
        </span>
      );
    } else if (
      region.medicalSpecialty &&
      region.medicalSpecialty.includes("dermatology")
    ) {
      tags.push(
        <span key="derm" className="tag specialty-dermatology">
          피부
        </span>
      );
    }

    return tags.length > 0 ? <div className="tag-container">{tags}</div> : null;
  };

  return (
    <div className="region-selector">
      {/* 헤더: 현재 선택된 지역 표시 - 고정 위치 */}
      <div className="region-header-fixed">
        <div className="region-title">
          <MapPinIcon size={20} className="icon" />
          <h3>지역 선택</h3>
        </div>

        <div className="region-path">
          {selectedCity ? (
            <>
              <span
                className="path-item city"
                onClick={() => clearSelection("city")}
              >
                {getPathDisplayText("city")}
              </span>

              {selectedDistrict && (
                <>
                  <ChevronRightIcon size={16} className="path-separator" />
                  <span
                    className="path-item district"
                    onClick={() => clearSelection("district")}
                  >
                    {getPathDisplayText("district")}
                  </span>
                </>
              )}

              {selectedNeighborhood && (
                <>
                  <ChevronRightIcon size={16} className="path-separator" />
                  <span
                    className="path-item neighborhood"
                    onClick={() => clearSelection("neighborhood")}
                  >
                    {getPathDisplayText("neighborhood")}
                  </span>
                </>
              )}
            </>
          ) : (
            <span className="path-empty">지역을 선택해주세요</span>
          )}
        </div>
      </div>
      {/* 스크롤 가능한 본문 영역 */}
      <div className="region-content-scrollable">
        {/* 시/도 선택 섹션 */}
        <div className="region-section">
          <div className="section-header">
            <h4>시/도 선택</h4>
          </div>

          <div className="region-grid city-grid">
            {/* 전체 옵션 추가 */}
            <button
              key="city-all"
              className={`region-item city-item all-item ${
                selectedCity && selectedCity.isAll ? "selected" : ""
              }`}
              onClick={() => handleSelectAll("city")}
            >
              <div className="region-item-content">
                <span className="region-name">전체</span>
              </div>
            </button>

            {topRegions.map((city) => (
              <button
                key={city.id}
                className={`region-item city-item ${
                  selectedCity && selectedCity.id === city.id ? "selected" : ""
                }`}
                onClick={() => handleCitySelect(city)}
              >
                <div className="region-item-content">
                  <span className="region-name">{city.label}</span>
                  {renderSpecialtyTag(city)}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 구/군 선택 섹션 - 시/도가 선택되고 전체가 아닌 경우에만 표시 */}
        {selectedCity && !selectedCity.isAll && districtList.length > 0 && (
          <div className="region-section">
            <div className="section-header">
              <h4>{selectedCity.label} 내 구/군 선택</h4>
            </div>

            <div className="region-grid district-grid">
              {/* 전체 옵션 추가 */}
              <button
                key="district-all"
                className={`region-item district-item all-item ${
                  selectedDistrict && selectedDistrict.isAll ? "selected" : ""
                }`}
                onClick={() => handleSelectAll("district")}
              >
                <div className="region-item-content">
                  <span className="region-name">전체</span>
                </div>
              </button>

              {districtList.map((district) => (
                <button
                  key={district.id}
                  className={`region-item district-item ${
                    selectedDistrict && selectedDistrict.id === district.id
                      ? "selected"
                      : ""
                  } ${
                    district.hospitalDensity
                      ? `density-${district.hospitalDensity}`
                      : ""
                  }`}
                  onClick={() => handleDistrictSelect(district)}
                >
                  <div className="region-item-content">
                    <span className="region-name">{district.label}</span>
                    {renderSpecialtyTag(district)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 동/읍/면 선택 섹션 - 구/군이 선택된 경우에만 표시 */}
        {selectedDistrict &&
          !selectedDistrict.isAll &&
          neighborhoodList.length > 0 && (
            <div className="region-section">
              <div className="section-header">
                <h4>{selectedDistrict.label} 내 동/읍/면 선택</h4>
              </div>

              <div className="region-grid neighborhood-grid">
                {/* 전체 옵션 추가 */}
                <button
                  key="neighborhood-all"
                  className={`region-item neighborhood-item all-item ${
                    selectedNeighborhood && selectedNeighborhood.isAll
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleSelectAll("neighborhood")}
                >
                  <div className="region-item-content">
                    <span className="region-name">전체</span>
                  </div>
                </button>

                {neighborhoodList.map((neighborhood) => (
                  <button
                    key={neighborhood.id}
                    className={`region-item neighborhood-item ${
                      selectedNeighborhood &&
                      selectedNeighborhood.id === neighborhood.id
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleNeighborhoodSelect(neighborhood)}
                  >
                    <div className="region-item-content">
                      <span className="region-name">{neighborhood.label}</span>
                      {renderSpecialtyTag(neighborhood)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
      </div>{" "}
      {/* 스크롤 가능한 영역 끝 */}
    </div>
  );
};

export default RegionSelector;
