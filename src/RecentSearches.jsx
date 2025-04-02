import React from "react";
import { Clock, X } from "lucide-react";
import "./RecentSearches.css";

const RecentSearches = ({
  searches = [],
  onSearchClick,
  onClearOne,
  onClearAll,
}) => {
  if (searches.length === 0) return null;

  return (
    <div className="recent-searches-container">
      <div className="recent-searches-header">
        <div className="recent-searches-title">
          <Clock size={16} strokeWidth={1.5} />
          <span>최근 검색어</span>
        </div>
        {searches.length > 0 && (
          <button className="recent-searches-clear-all" onClick={onClearAll}>
            전체 삭제
          </button>
        )}
      </div>

      <div className="recent-searches-list">
        {searches.map((term, index) => (
          <div key={index} className="recent-search-item">
            <button
              className="recent-search-term"
              onClick={() => onSearchClick(term)}
            >
              {term}
            </button>
            <button
              className="recent-search-remove"
              onClick={(e) => {
                e.stopPropagation();
                onClearOne(term);
              }}
              aria-label="검색어 삭제"
              style={{ padding: 0 }}
            >
              <X size={14} strokeWidth={2} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
