import React, { useState } from "react";
import { PageHeader, getHospitalImage } from "./App";
import { Clock, Calendar, Heart, MapPin } from "lucide-react";
import "./EventCard.css";

const EventCard = ({ item }) => {
  return (
    <div className="card" style={{ marginBottom: "1rem" }}>
      <div className="event-card-item-header">
        <img
          src={item.image}
          alt={item.title}
          className="event-card-item-image"
        />
        <div className="event-card-item-info">
          <h3 className="event-card-item-title">{item.eventContent}</h3>
          <div className="event-card-item-price-container">
            <span className="event-card-item-price-original">
              {item.originalPrice}
            </span>
            <span className="event-card-item-price-discount">
              {item.discountPrice}
            </span>
          </div>
          <span className="event-card-item-description">
            {item.description}
          </span>
        </div>
      </div>

      <div style={{ display: "flex", marginTop: "0.5rem" }}>
        <div className="event-card-item-tags-container">
          <span className="event-tag event-tag-date">
            <Clock size={12} style={{ marginRight: "4px" }} />
            {item.eventPeriod}
          </span>
          <span className={`event-tag event-tag-${item.type}`}>
            {item.type === "medical" ? "진료" : "시술"}
          </span>
          <span className="event-tag event-tag-event">이벤트</span>
        </div>
        <button className="event-card-action-button" aria-label="찜 삭제">
          <Heart size={18} className={`event-card-action-button-${"active"}`} />
        </button>
      </div>

      {/* <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: "0.75rem",
        color: "#6b7280",
        marginBottom: "8px",
      }}
    >
      <span>{item.title}</span>
      <span style={{ display: "flex", alignItems: "center" }}>
        <MapPin size={10} style={{ marginRight: "4px" }} /> {item.location}
      </span>
    </div> */}

      {/* <div className="event-card-item-footer">
      <span style={{ flex: 1, fontSize: "0.8rem" }}>{item.description}</span>
      <button className="event-card-action-button" aria-label="찜 삭제">
        <Heart size={18} className={`event-card-action-button-${"active"}`} />
      </button>
    </div> */}
    </div>
  );
};

export default EventCard;
