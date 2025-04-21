import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import "./StatCard.css";

const StatCard = ({
  title,
  value,
  icon,
  color,
  change,
  changeType,
  subtitle,
}) => {
  const formatValue = (value) => {
    if (typeof value === "number") {
      return value.toLocaleString();
    }
    return value;
  };

  const getColorClass = () => {
    switch (color) {
      case "blue":
        return "stat-card-blue";
      case "green":
        return "stat-card-green";
      case "purple":
        return "stat-card-purple";
      case "orange":
        return "stat-card-orange";
      case "red":
        return "stat-card-red";
      default:
        return "stat-card-blue";
    }
  };

  return (
    <div className={`stat-card ${getColorClass()}`}>
      <div className="stat-card-icon">{icon}</div>
      <div className="stat-card-content">
        <h3 className="stat-card-title">{title}</h3>
        <div className="stat-card-value-container">
          <p className="stat-card-value">{formatValue(value)}</p>
          {change !== undefined && (
            <div
              className={`stat-card-change ${
                changeType === "decrease" ? "decrease" : "increase"
              }`}
            >
              {changeType === "decrease" ? (
                <ArrowDown size={14} />
              ) : (
                <ArrowUp size={14} />
              )}
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        {subtitle && <p className="stat-card-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
};

export default StatCard;
