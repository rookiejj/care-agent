import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LocationHeader = ({ currentLocation }) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");

  // 저장된 지역 정보 불러오기
  useEffect(() => {
    const savedRegion = localStorage.getItem("selectedRegion");
    if (savedRegion) {
      try {
        const regionData = JSON.parse(savedRegion);
        // fullName 속성을 사용하여 표시할 위치 결정
        if (regionData.fullName) {
          setLocation(regionData.fullName);
        }
      } catch (e) {
        console.error("Failed to parse saved region", e);
      }
    }
  }, []);

  // 현재 표시할 위치 텍스트 결정
  const displayLocation = location || currentLocation || "전체지역";

  // 위치 텍스트 처리 - 말줄임 제거
  const shortenLocation = (text) => {
    if (!text) return "전체지역";
    return text;
  };

  return (
    <button
      onClick={() => navigate("/region-select")}
      className="location-button"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.25rem",
        background: "none",
        border: "none",
        padding: "0.5rem",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      <MapPin size={18} color="#3b82f6" strokeWidth={2} />
      <span
        className="location-text"
        style={{
          fontSize: "0.75rem",
          fontWeight: "500",
          color: "#374151",
          whiteSpace: "nowrap",
        }}
      >
        {shortenLocation(displayLocation)}
      </span>
    </button>
  );
};

export default LocationHeader;
