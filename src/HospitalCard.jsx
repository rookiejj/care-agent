import React, { useState } from "react";
import { PageHeader, getHospitalImage } from "./App";
import { Heart, MessageCircle, Calendar, X } from "lucide-react";
import "./HospitalCard.css";

const HospitalCard = ({ item }) => (
  <div className="card" style={{ marginBottom: "1rem" }}>
    <div className="favorites-item-header">
      <img src={item.image} alt={item.title} className="favorites-item-image" />
      <div className="favorites-item-info">
        <h3 className="favorites-item-title">{item.title}</h3>
        <p className="favorites-item-subtitle">{item.subtitle}</p>
        <div className="favorites-item-rating">
          <div className="favorites-item-rating-stars">★★★★★</div>
          <span className="favorites-item-rating-value">{item.rating}</span>
          <span className="favorites-item-rating-count">
            ({item.reviewCount})
          </span>
        </div>
      </div>
    </div>
    <div className="favorites-item-body">
      <p className="favorites-item-description">{item.description}</p>
      <div className="favorites-item-tags">
        <span className={`tag tag-${item.type}`}>
          {item.type === "medical" ? "진료" : "시술"}
        </span>
        {item.tags.map((tag, index) => (
          <span
            key={index}
            className="tag"
            style={{ backgroundColor: "#f3f4f6", color: "#6b7280" }}
          >
            {tag}
          </span>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.75rem",
          color: "#6b7280",
          marginTop: "12px",
        }}
      >
        <span>{item.location}</span>
        <span>{item.distance}</span>
      </div>
    </div>
    <div className="favorites-item-footer">
      <div className="favorites-item-price">{item.price}</div>
      <div className="favorites-item-actions">
        <button className="favorites-action-button" aria-label="예약">
          <Calendar size={18} />
        </button>
        <button className="favorites-action-button" aria-label="문의">
          <MessageCircle size={18} />
        </button>
        <button className="favorites-action-button danger" aria-label="찜 삭제">
          <X size={18} />
        </button>
      </div>
    </div>
  </div>
);

export default HospitalCard;
