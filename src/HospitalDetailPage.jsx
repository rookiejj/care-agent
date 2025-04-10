import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "./App";
import "./HospitalDetailPage.css";

const HospitalDetailPage = ({ currentLocation }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const item = location.state?.item;

  const handleBookingClick = () => {
    navigate(`/booking`, { state: { item } });
  };

  const handleReviewClick = () => {
    alert("후기보기 페이지로 이동");
  };

  return (
    <div className="container">
      <div className="fixed-header">
        <PageHeader
          title={item.title}
          // showLocationButton={true}
          currentLocation={currentLocation}
          backButtonVisible={true}
          onBack={() => navigate(-1)}
        />
      </div>
      <div className="detail-page-content">
        <div className="no-detail-info">
          <p>{item.isEvent ? "이벤트 정보" : "병원 정보"}</p>
        </div>
      </div>
      <div className="detail-page-footer">
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button className="primary-button" onClick={handleBookingClick}>
            예약하기
          </button>
          <button className="primary-button" onClick={handleReviewClick}>
            후기보기
          </button>
          {/* <button
            className="primary-button"
            onClick={() =>
              onNavigate("consultation", {
                source: "hospital",
                type: type,
                hospitalName: currentHospital.name,
              })
            }
          >
            {t("hospital.medical.consultation")}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default HospitalDetailPage;
