import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "./App";

const BookingPage = ({ currentLocation }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBookingRequestClick = () => {
    alert("결제완료 페이지로 이동");
  };

  return (
    <div className="container">
      <div className="fixed-header">
        <PageHeader
          title="예약하기"
          // showLocationButton={true}
          currentLocation={currentLocation}
          backButtonVisible={true}
          onBack={() => navigate(-1)}
        />
      </div>
      <div className="detail-page-content">
        <div className="no-detail-info">
          <p>예약시간, 결제금액, 결제수단</p>
        </div>
      </div>
      <div className="detail-page-footer">
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            className="primary-button"
            onClick={handleBookingRequestClick}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
