import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "./App";

const DetailPageSample = ({ currentLocation }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="fixed-header">
        <PageHeader
          title="타이틀"
          // showLocationButton={true}
          currentLocation={currentLocation}
          backButtonVisible={true}
          onBack={() => navigate(-1)}
        />
      </div>
      <div className="detail-page-content">
        <div className="no-detail-info">
          <p>정보</p>
        </div>
      </div>
      <div className="detail-page-footer">
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button className="primary-button">버튼1</button>
          <button className="primary-button">버튼2</button>
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

export default DetailPageSample;
