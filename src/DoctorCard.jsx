import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Calendar, X } from "lucide-react";
import "./DoctorCard.css";
import {
  getSpecialtyTagClass,
  getSpecialtyKoreanName,
  getSubSpecialtyKoreanName,
} from "./medicalCategoryData";

const DoctorCard = ({ item, showBooking = false }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(true);

  const medicalType = item.type || "medical";

  const handleCardClick = () => {
    // 상세 페이지로 이동
    navigate(`/detail/doctor/${item.id}`, {
      state: { item, type: medicalType },
    });
  };

  const handleBookingClick = (e) => {
    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
    navigate("/booking", {
      state: { item: item, selectedDoctor: item, type: medicalType },
    });
  };

  const toggleFavorite = (e) => {
    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
    setIsFavorite(!isFavorite);
  };

  // 별점을 표현하는 함수
  const renderStars = (rating) => {
    // 소수점 반올림하여 별 표시
    const fullStars = Math.floor(rating);
    let stars = "";
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars += "★";
      } else {
        stars += "☆";
      }
    }
    return stars;
  };

  return (
    <div
      className="card"
      style={{ marginBottom: "1rem", cursor: "pointer" }}
      onClick={handleCardClick}
    >
      <div className="doctor-card-item-header">
        <div className="doctor-card-item-info">
          <h3 className="doctor-card-item-title">{item.name} 의사</h3>
          <p className="doctor-card-item-hospital">{item.hospitalName}</p>
          <div className="doctor-card-item-rating-container">
            <div className="doctor-card-item-rating-stars">
              {renderStars(item.rating)}
            </div>
            <span className="doctor-card-item-rating-value">{item.rating}</span>
            <span className="doctor-card-item-rating-count">
              ({item.reviewCount})
            </span>
          </div>
          <span className="doctor-card-item-description">
            {item.description}
          </span>
        </div>
        <img
          src={item.profileImage}
          alt={item.name}
          className="doctor-card-item-image"
        />
      </div>
      <div style={{ display: "flex", marginTop: "0.5rem" }}>
        <div className="doctor-card-item-tags-container">
          <span
            className={`doctor-tag doctor-tag-${getSpecialtyTagClass(
              item.specialty
            )}`}
          >
            {getSpecialtyKoreanName(item.specialty)}
          </span>
          {item.subSpecialty &&
            item.subSpecialty.map((tag, index) => (
              <span key={index} className="doctor-tag">
                {tag.includes("-") ? getSubSpecialtyKoreanName(tag) : tag}
              </span>
            ))}
        </div>
        <button
          className="doctor-card-action-button"
          aria-label="찜하기"
          onClick={toggleFavorite}
        >
          <Heart
            size={18}
            className={`doctor-card-action-button-${
              isFavorite ? "active" : ""
            }`}
            fill={isFavorite ? "#ef4444" : "none"}
          />
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "right" }}>
        {showBooking ? (
          <button className="booking-button" onClick={handleBookingClick}>
            예약하기
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;
