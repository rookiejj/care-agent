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
        if (regionData.fullName) {
          setLocation(regionData.fullName);
        }
      } catch (e) {
        console.error("Failed to parse saved region", e);
      }
    }
  }, []);

  const displayLocation = location || currentLocation || "전체지역";

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
        maxWidth: "100%", // 컨테이너의 너비에 맞춤
      }}
    >
      <MapPin
        size={18}
        color="#3b82f6"
        strokeWidth={2}
        style={{ flexShrink: 0 }}
      />
      <span
        className="location-text"
        style={{
          fontSize: "0.75rem",
          fontWeight: "500",
          color: "#374151",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {displayLocation}
      </span>
    </button>
  );
};

export default LocationHeader;
