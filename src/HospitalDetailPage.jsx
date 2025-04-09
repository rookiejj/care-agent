import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  MapPin,
  Phone,
  Clock,
  Star,
  User,
  Calendar,
  MessageCircle,
  Share2,
  ChevronRight,
  Bookmark,
} from "lucide-react";
import { PageHeader, getHospitalImage } from "./App";
import "./HospitalDetailPage.css";

const HospitalDetailPage = () => {
  const navigate = useNavigate();
  const { id, type } = useParams();
  const location = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("info");

  // 위치 상태에서 병원 정보 가져오기
  const hospitalData = location.state?.item || {
    id: 1,
    type: "medical",
    title: "서울 연세 내과",
    image: getHospitalImage("all", 1),
    subtitle: "심장내과 전문 병원",
    rating: 4.8,
    reviewCount: 124,
    description:
      "혈액검사, CT, 초음파, 암 표지자 검사까지 한번에! 건강한 삶을 위한 첫걸음, 지금 예약하세요.",
    tags: ["내과", "검진", "할인 이벤트"],
    price: "검진 비용 문의",
    location: "서울시 강남구 테헤란로 123",
    distance: "2.3km",
    isEvent: true,
    eventPeriod: "3.25 - 4.30",
    eventContent: "종합검진 패키지 특별 할인",
    originalPrice: "150,000원",
    discountPrice: "120,000원",
    discountRate: "20%",
    mainCategory: "chest",
    subCategory: "chest-pain",
    specialty: "cardiology",
    facilityType: "clinic",
    phone: "02-123-4567",
    businessHours: "평일 09:00-18:00, 토요일 09:00-13:00, 일요일 휴진",
    address: "서울시 강남구 테헤란로 123 연세빌딩 5층",
  };

  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "김민석",
      specialty: "심장내과",
      experience: "15년",
      education: "서울대학교 의과대학 졸업",
      image: "/images/doctors/doctor.jpg",
    },
    {
      id: 2,
      name: "이지원",
      specialty: "내과",
      experience: "10년",
      education: "연세대학교 의과대학 졸업",
      image: "/images/doctors/doctor.jpg",
    },
  ]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="detail-page-header">
        <button onClick={handleBack} className="back-button">
          <ArrowLeft size={24} />
        </button>
        <h1 className="detail-page-title">{hospitalData.title}</h1>
        <button
          className="favorite-button"
          onClick={toggleFavorite}
          aria-label={isFavorite ? "찜 취소" : "찜하기"}
        >
          <Heart
            size={24}
            fill={isFavorite ? "#ef4444" : "none"}
            color={isFavorite ? "#ef4444" : "#6b7280"}
          />
        </button>
      </div>

      <div className="hospital-detail-content">
        <div className="hospital-image-container">
          <img
            src={hospitalData.image}
            alt={hospitalData.title}
            className="hospital-detail-image"
          />
          {hospitalData.isEvent && (
            <div className="event-badge">이벤트 진행중</div>
          )}
        </div>

        <div className="hospital-info-section">
          <div className="hospital-info-header">
            <div className="hospital-rating-container">
              <Star size={18} color="#fbbf24" fill="#fbbf24" />
              <span className="hospital-rating">{hospitalData.rating}</span>
              <span className="hospital-reviews">
                리뷰 {hospitalData.reviewCount}개
              </span>
            </div>
            <div className="hospital-tags-container">
              {hospitalData.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`hospital-tag ${
                    hospitalData.type === "medical"
                      ? "hospital-tag-medical"
                      : "hospital-tag-cosmetic"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <p className="hospital-description">{hospitalData.description}</p>

          <div className="hospital-contact-info">
            <div className="info-item">
              <MapPin size={16} className="info-icon" />
              <span>{hospitalData.address}</span>
            </div>
            <div className="info-item">
              <Phone size={16} className="info-icon" />
              <span>{hospitalData.phone}</span>
            </div>
            <div className="info-item">
              <Clock size={16} className="info-icon" />
              <span>{hospitalData.businessHours}</span>
            </div>
          </div>
        </div>

        <div className="hospital-detail-tabs">
          <button
            className={`hospital-tab ${activeTab === "info" ? "active" : ""}`}
            onClick={() => setActiveTab("info")}
          >
            병원 정보
          </button>
          <button
            className={`hospital-tab ${
              activeTab === "doctors" ? "active" : ""
            }`}
            onClick={() => setActiveTab("doctors")}
          >
            의료진
          </button>
          <button
            className={`hospital-tab ${
              activeTab === "reviews" ? "active" : ""
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            리뷰
          </button>
        </div>

        {activeTab === "info" && (
          <div className="hospital-tab-content">
            <div className="info-section">
              <h3>진료 과목</h3>
              <p>
                {hospitalData.specialty === "cardiology"
                  ? "심장내과"
                  : hospitalData.specialty}
              </p>
            </div>

            {hospitalData.isEvent && (
              <div className="info-section event-section">
                <h3>진행 중인 이벤트</h3>
                <div className="event-info">
                  <div className="event-period">
                    <Calendar size={16} className="event-icon" />
                    <span>{hospitalData.eventPeriod}</span>
                  </div>
                  <h4 className="event-content">{hospitalData.eventContent}</h4>
                  <div className="event-price">
                    <span className="original-price">
                      {hospitalData.originalPrice}
                    </span>
                    <span className="discount-price">
                      {hospitalData.discountPrice}
                    </span>
                    <span className="discount-rate">
                      {hospitalData.discountRate}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="info-section">
              <h3>시설 안내</h3>
              <div className="facility-list">
                <div className="facility-item">
                  <span className="facility-icon">🅿️</span>
                  <span>주차시설</span>
                </div>
                <div className="facility-item">
                  <span className="facility-icon">🧑‍🦽</span>
                  <span>장애인 편의시설</span>
                </div>
                <div className="facility-item">
                  <span className="facility-icon">💳</span>
                  <span>카드결제</span>
                </div>
                <div className="facility-item">
                  <span className="facility-icon">🏥</span>
                  <span>최신 의료장비</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "doctors" && (
          <div className="hospital-tab-content">
            <div className="doctors-list">
              {doctors.map((doctor) => (
                <div key={doctor.id} className="doctor-card">
                  <img
                    src={doctor.image || "/images/doctors/doctor.jpg"}
                    alt={doctor.name}
                    className="doctor-image"
                  />
                  <div className="doctor-info">
                    <h3 className="doctor-name">
                      {doctor.name} <span className="doctor-title">원장</span>
                    </h3>
                    <p className="doctor-specialty">
                      {doctor.specialty} | 경력 {doctor.experience}
                    </p>
                    <p className="doctor-education">{doctor.education}</p>
                  </div>
                  <button className="doctor-detail-button">
                    <ChevronRight size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="hospital-tab-content">
            <div className="review-summary">
              <div className="review-rating">
                <h3>{hospitalData.rating}</h3>
                <div className="review-stars">
                  <Star size={16} color="#fbbf24" fill="#fbbf24" />
                  <Star size={16} color="#fbbf24" fill="#fbbf24" />
                  <Star size={16} color="#fbbf24" fill="#fbbf24" />
                  <Star size={16} color="#fbbf24" fill="#fbbf24" />
                  <Star size={16} color="#fbbf24" fill="#fbbf24" />
                </div>
                <p>{hospitalData.reviewCount}개의 리뷰</p>
              </div>
              <button className="write-review-button">리뷰 작성하기</button>
            </div>

            <div className="reviews-list">
              {/* 예시 리뷰 */}
              <div className="review-item">
                <div className="review-header">
                  <div className="reviewer-info">
                    <User size={16} className="reviewer-icon" />
                    <span className="reviewer-name">김환자</span>
                  </div>
                  <div className="review-date">2025.03.15</div>
                </div>
                <div className="review-rating">
                  <Star size={14} color="#fbbf24" fill="#fbbf24" />
                  <Star size={14} color="#fbbf24" fill="#fbbf24" />
                  <Star size={14} color="#fbbf24" fill="#fbbf24" />
                  <Star size={14} color="#fbbf24" fill="#fbbf24" />
                  <Star size={14} color="#fbbf24" fill="#fbbf24" />
                </div>
                <p className="review-content">
                  의사 선생님이 친절하게 설명해주시고 진료도 꼼꼼하게
                  해주셨어요. 검사 결과도 자세히 알려주셔서 안심이 되었습니다.
                  병원 시설도 깨끗하고 대기 시간도 짧아서 좋았습니다.
                </p>
              </div>

              <div className="review-item">
                <div className="review-header">
                  <div className="reviewer-info">
                    <User size={16} className="reviewer-icon" />
                    <span className="reviewer-name">이용자</span>
                  </div>
                  <div className="review-date">2025.03.10</div>
                </div>
                <div className="review-rating">
                  <Star size={14} color="#fbbf24" fill="#fbbf24" />
                  <Star size={14} color="#fbbf24" fill="#fbbf24" />
                  <Star size={14} color="#fbbf24" fill="#fbbf24" />
                  <Star size={14} color="#fbbf24" fill="#fbbf24" />
                  <Star size={14} color="#e5e7eb" fill="#e5e7eb" />
                </div>
                <p className="review-content">
                  진료는 좋았지만 대기 시간이 조금 길었어요. 그래도 의료진이
                  친절하고 전문적이어서 만족했습니다.
                </p>
              </div>

              <button className="more-reviews-button">더 많은 리뷰 보기</button>
            </div>
          </div>
        )}
      </div>

      <div className="floating-action-buttons">
        <button className="action-button share-button">
          <Share2 size={20} />
          공유
        </button>
        <button className="action-button bookmark-button">
          <Bookmark size={20} />
          저장
        </button>
        <button className="action-button chat-button">
          <MessageCircle size={20} />
          상담
        </button>
        <button className="action-button appointment-button">
          <Calendar size={20} />
          예약
        </button>
      </div>
    </div>
  );
};

export default HospitalDetailPage;
