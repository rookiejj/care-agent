import React from "react";
import { PageHeader, getProfileImage } from "./App";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ChevronRight,
  Award,
  MapPin,
  Calendar,
  MessageCircle,
  Heart,
  Gift,
  Edit,
  Bell,
} from "lucide-react";
import "./MyPage.css";

const MyPage = ({ currentLocation, notificationCount }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <div className="container">
      <PageHeader title={t("mypage.medical.title")} />
      <div className="content">
        {/* Profile Section */}
        <div
          className="card profile-section"
          style={{ marginBottom: "1.5rem" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <img
              src={getProfileImage()}
              alt={name}
              className="profile-avatar"
              style={{
                objectFit: "cover", // 이미지가 원형에 맞게 조정
              }}
            />
            <div style={{ marginLeft: "1rem" }}>
              <h2 style={{ fontWeight: "bold", fontSize: "1.125rem" }}>
                Doctor King
              </h2>
              <p style={{ color: "#6b7280" }}>user@example.com</p>
            </div>
          </div>
          <button className="secondary-button">
            {t("mypage.medical.profile.edit")}
          </button>{" "}
        </div>

        {/* Medical Records Section */}
        <div
          className="card profile-section"
          style={{ marginBottom: "1.5rem" }}
        >
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
              marginBottom: "0.75rem",
            }}
          >
            {t("mypage.medical.menu.treatmentManagement")}
          </h3>
          <button className="mypage-card-button">
            <span className="mypage-card-button-text">
              {t("mypage.medical.menu.appointmentHistory")}
            </span>
            <span className="mypage-card-button-icon">→</span>
          </button>
          <button className="mypage-card-button">
            <span className="mypage-card-button-text">
              {t("mypage.medical.menu.medicalRecords")}
            </span>
            <span className="mypage-card-button-icon">→</span>
          </button>
          <button className="mypage-card-button">
            <span className="mypage-card-button-text">
              {t("mypage.medical.menu.prescriptionManagement")}
            </span>
            <span className="mypage-card-button-icon">→</span>
          </button>
          <button className="mypage-card-button">
            <span className="mypage-card-button-text">
              {t("mypage.medical.menu.healthCheckupResults")}
            </span>
            <span className="mypage-card-button-icon">→</span>
          </button>
        </div>

        {/* Payment Section */}
        <div
          className="card profile-section"
          style={{ marginBottom: "1.5rem" }}
        >
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
              marginBottom: "0.75rem",
            }}
          >
            {t("mypage.medical.menu.paymentManagement")}
          </h3>
          <button className="mypage-card-button">
            <span className="mypage-card-button-text">
              {t("mypage.medical.menu.paymentDetails")}
            </span>
            <span className="mypage-card-button-icon">→</span>
          </button>
          <button className="mypage-card-button">
            <span className="mypage-card-button-text">
              {t("mypage.medical.menu.medicalCertificates")}
            </span>
            <span className="mypage-card-button-icon">→</span>
          </button>
          <button className="mypage-card-button">
            <span className="mypage-card-button-text">
              {t("mypage.medical.menu.medicalReports")}
            </span>
            <span className="mypage-card-button-icon">→</span>
          </button>
        </div>

        {/* Settings Section */}
        <div
          className="card profile-section"
          style={{ marginBottom: "1.5rem" }}
        >
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "bold",
              marginBottom: "0.75rem",
            }}
          >
            {t("mypage.medical.menu.settings")}
          </h3>
          <button className="mypage-card-button">
            <span className="mypage-card-button-text">
              {t("mypage.medical.menu.alarmSettings")}
            </span>
            <span className="mypage-card-button-icon">→</span>
          </button>
          <button className="mypage-card-button">
            <span className="mypage-card-button-text">
              {t("mypage.medical.menu.personalInfoSettings")}
            </span>
            <span className="mypage-card-button-icon">→</span>
          </button>
          <button className="mypage-card-button">
            <span className="mypage-card-button-text">
              {t("mypage.medical.menu.termsOfUse")}
            </span>
            <span className="mypage-card-button-icon">→</span>
          </button>
          <button className="mypage-card-button">
            <span className="mypage-card-button-text">
              {t("mypage.medical.menu.privacyPolicy")}
            </span>
            <span className="mypage-card-button-icon">→</span>
          </button>
          <button className="mypage-card-button">
            <span className="mypage-card-button-text">
              {t("mypage.medical.menu.frequentlyAskedQuestions")}
            </span>
            <span className="mypage-card-button-icon">→</span>
          </button>
          <button className="mypage-card-button">
            <span className="mypage-card-button-text">
              {t("mypage.medical.menu.customerService")}
            </span>
            <span className="mypage-card-button-icon">→</span>
          </button>
        </div>

        {/* Logout Button */}
        <button
          style={{
            width: "100%",
            padding: "1rem",
            textAlign: "left",
            color: "#ef4444",
            backgroundColor: "white",
            borderRadius: "0.75rem",
            border: "none",
            cursor: "pointer",
            marginBottom: "5rem", // Add bottom margin to ensure visibility
          }}
        >
          {t("mypage.medical.logout")}
        </button>
      </div>
    </div>
  );
};

export default MyPage;
