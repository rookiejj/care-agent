import React from "react";
import { Clock, X } from "lucide-react";
import "./RecentSearches.css";

const RecentSearches = ({
  searches,
  onSearchClick,
  onClearOne,
  onClearAll,
}) => {
  if (searches.length === 0) return null;

  return (
    <div className="recent-searches-container">
      <div className="recent-searches-header">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Clock size={16} color="#6b7280" />
          <h3
            style={{
              marginLeft: "0.5rem",
              fontSize: "0.9rem",
              fontWeight: "600",
            }}
          >
            최근 검색어
          </h3>
        </div>
        <button
          onClick={onClearAll}
          style={{
            background: "none",
            border: "none",
            fontSize: "0.8rem",
            color: "#6b7280",
            cursor: "pointer",
          }}
        >
          전체 삭제
        </button>
      </div>

      <div
        className="recent-searches-list"
        style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
      >
        {searches.map((term, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              background: "#f3f4f6",
              borderRadius: "16px",
              padding: "0.4rem 0.75rem",
            }}
          >
            <button
              onClick={() => onSearchClick(term)}
              style={{
                background: "none",
                border: "none",
                fontSize: "0.85rem",
                color: "#4b5563",
                padding: "0",
                marginRight: "0.5rem",
                cursor: "pointer",
              }}
            >
              {term}
            </button>
            <button
              onClick={() => onClearOne(term)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0",
              }}
              aria-label={`Remove ${term} from recent searches`}
            >
              <X size={14} color="#9ca3af" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
