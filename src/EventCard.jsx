import React, { useState } from "react";
import { PageHeader, getHospitalImage } from "./App";
import { Clock, Calendar, X, MapPin } from "lucide-react";
import "./EventCard.css";

const EventCard = ({ item }) => (
  <div className="card" style={{ marginBottom: "1rem" }}>
    {/* 이미지 */}
    <img
      src={item.image}
      alt={item.title}
      style={{ width: "100%", height: "100px", objectFit: "cover" }}
    />

    {/* 이벤트 내용 */}
    <div>
      {/* 이벤트 제목 - 눈에 띄게 */}
      <h4
        style={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#1f2937",
          margin: "0.5rem 0",
        }}
      >
        {item.eventContent}
      </h4>

      {/* 가격 정보와 할인율 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <span
          style={{
            color: "#9ca3af",
            fontSize: "0.875rem",
            textDecoration: "line-through",
            marginRight: "8px",
          }}
        >
          {item.originalPrice}
        </span>
        <span
          style={{
            color: "#ef4444",
            fontWeight: "bold",
            fontSize: "1.125rem",
            marginRight: "8px",
          }}
        >
          {item.discountPrice}
        </span>
        <span
          style={{
            backgroundColor: "#fee2e2",
            color: "#ef4444",
            fontSize: "0.75rem",
            fontWeight: "600",
            padding: "2px 8px",
            borderRadius: "4px",
          }}
        >
          {item.discountRate} 할인
        </span>
      </div>

      {/* 이벤트 기간 */}
      <div
        style={{
          display: "flex",
          gap: "8px", // 두 요소 사이의 간격
          marginBottom: "12px",
        }}
      >
        <span
          style={{
            backgroundColor: "#dbeafe",
            color: "#1d4ed8",
            fontSize: "0.75rem",
            fontWeight: "500",
            padding: "2px 8px",
            borderRadius: "9999px",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <Clock size={12} style={{ marginRight: "4px" }} /> {item.eventPeriod}
        </span>

        {/* 태그 - 병원 카드와 동일한 스타일 */}
        <div className="favorites-item-tags">
          <span className={`tag tag-${item.type}`}>
            {item.type === "medical" ? "진료" : "시술"}
          </span>
          <span className="tag tag-event">이벤트</span>
        </div>
      </div>

      {/* 병원 이름과 위치 - 덜 중요하게 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.75rem",
          color: "#6b7280",
          marginBottom: "12px",
          borderBottom: "1px solid #f3f4f6",
          paddingBottom: "12px",
        }}
      >
        <span style={{ fontWeight: "500" }}>{item.title}</span>
        <span style={{ display: "flex", alignItems: "center" }}>
          <MapPin size={10} style={{ marginRight: "4px" }} /> {item.location}
        </span>
      </div>

      {/* 버튼 영역 */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          paddingTop: "4px",
        }}
      >
        <button
          style={{
            flex: 1,
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "8px 0",
            borderRadius: "8px",
            fontSize: "0.875rem",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
          }}
        >
          <Calendar size={16} style={{ marginRight: "4px" }} /> 예약하기
        </button>
        <button className="favorites-action-button danger" aria-label="찜 삭제">
          <X size={18} />
        </button>
      </div>
    </div>
  </div>
);

export default EventCard;
