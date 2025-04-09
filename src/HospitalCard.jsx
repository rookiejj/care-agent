import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader, getHospitalImage } from "./App";
import { Heart, MessageCircle, Calendar, X } from "lucide-react";
import "./HospitalCard.css";

const HospitalCard = ({ item }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(true);

  const handleCardClick = () => {
    // 상세 페이지로 이동
    navigate(`/detail/${item.type}/${item.id}`, { state: { item } });
  };

  const toggleFavorite = (e) => {
    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      className="card"
      style={{ marginBottom: "1rem" }}
      onClick={handleCardClick}
    >
      <div className="hospital-card-item-header">
        {/* <img
        src={item.image}
        alt={item.title}
        className="hospital-card-item-image"
      /> */}
        <div className="hospital-card-item-info">
          <h3 className="hospital-card-item-title">{item.title}</h3>
          {/* <p className="hospital-card-item-subtitle">{item.subtitle}</p> */}
          <div className="hospital-card-item-rating-container">
            <div className="hospital-card-item-rating-stars">★★★★★</div>
            <span className="hospital-card-item-rating-value">
              {item.rating}
            </span>
            <span className="hospital-card-item-rating-count">
              ({item.reviewCount})
            </span>
          </div>
          <span className="hospital-card-item-description">
            {item.description}
          </span>
        </div>
        <img
          src={item.image}
          alt={item.title}
          className="hospital-card-item-image"
        />
      </div>

      <div style={{ display: "flex", marginTop: "0.5rem" }}>
        <div className="hospital-card-item-tags-container">
          <span className={`hospital-tag hospital-tag-${item.type}`}>
            {item.type === "medical" ? "진료" : "시술"}
          </span>
          {item.tags.map((tag, index) => (
            <span key={index} className="hospital-tag">
              {tag}
            </span>
          ))}
        </div>
        <button
          className="hospital-card-action-button"
          aria-label="찜하기"
          onClick={toggleFavorite}
        >
          <Heart
            size={18}
            className={`hospital-card-action-button-${
              isFavorite ? "active" : ""
            }`}
            fill={isFavorite ? "#ef4444" : "none"}
          />
        </button>
      </div>
    </div>
  );
};

export default HospitalCard;
