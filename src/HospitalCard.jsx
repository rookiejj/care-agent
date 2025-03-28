import React, { useState } from "react";
import { PageHeader, getHospitalImage } from "./App";
import { Heart, MessageCircle, Calendar, X } from "lucide-react";
import "./HospitalCard.css";

const HospitalCard = ({ item }) => (
  <div className="card" style={{ marginBottom: "1rem" }}>
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
          <span className="hospital-card-item-rating-value">{item.rating}</span>
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
      <button className="hospital-card-action-button" aria-label="찜 삭제">
        <Heart
          size={18}
          className={`hospital-card-action-button-${"active"}`}
        />
      </button>
    </div>

    {/* <div className="hospital-card-item-footer">
      <div className="hospital-card-item-price">{item.price}</div>
      <div className="hospital-card-item-actions">
        <button className="hospital-card-action-button" aria-label="예약">
          <Calendar size={18} />
        </button>
        <button className="hospital-card-action-button" aria-label="문의">
          <MessageCircle size={18} />
        </button>
        <button
          className="hospital-card-action-button danger"
          aria-label="찜 삭제"
        >
          <X size={18} />
        </button>
      </div>
    </div> */}
  </div>
);

export default HospitalCard;
