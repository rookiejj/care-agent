import React from "react";
import { TrendingUp } from "lucide-react";
import "./PopularSearches.css";

const PopularSearches = ({ onSearchClick }) => {
  // 인기 검색어 더미 데이터 (10개)
  const popularSearches = [
    "위장 내시경",
    "피부과",
    "치과 임플란트",
    "한의원",
    "보톡스",
    "다이어트",
    "두통",
    "불면증",
    "필러",
    "건강검진",
  ];

  return (
    <div className="popular-searches-container">
      <div className="recent-searches-header">
        <div style={{ display: "flex", alignItems: "center" }}>
          <TrendingUp size={16} color="#3b82f6" />
          <h3
            style={{
              marginLeft: "0.5rem",
              fontSize: "0.9rem",
              fontWeight: "600",
            }}
          >
            인기 검색어
          </h3>
        </div>
      </div>
      <div
        className="popular-searches-list"
        style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
      >
        {popularSearches.map((term, index) => (
          <button
            key={index}
            onClick={() => onSearchClick(term)}
            style={{
              background: "#f3f4f6",
              border: "none",
              borderRadius: "16px",
              padding: "0.5rem 0.75rem",
              fontSize: "0.85rem",
              color: "#4b5563",
              cursor: "pointer",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "0.25rem" }}>{index + 1}</span>
            <span>{term}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularSearches;
