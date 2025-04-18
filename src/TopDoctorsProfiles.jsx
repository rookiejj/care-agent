import React, { useState } from "react";
import { Star, ChevronRight, User, Clock, MapPin, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useData } from "./DataContext";
import { getSpecialtyKoreanName } from "./medicalCategoryData";
import "./TopDoctorsProfiles.css";

const TopDoctorsProfiles = () => {
  const navigate = useNavigate();
  const { doctorsData } = useData();
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter top doctors by rating, with at least 4.8
  const topDoctors = doctorsData
    ? doctorsData
        .filter((doc) => doc.rating >= 4.8)
        .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount)
        .slice(0, 10)
    : [];

  // Create categories from available doctor specialties
  const categories = [
    { id: "all", label: "전체" },
    ...Array.from(new Set(topDoctors.map((doc) => doc.specialty))).map(
      (specialty) => ({
        id: specialty,
        label: getSpecialtyKoreanName(specialty),
      })
    ),
  ].slice(0, 5); // Limit to 5 categories including 'all'

  // Filter doctors by active category
  const filteredDoctors =
    activeCategory === "all"
      ? topDoctors
      : topDoctors.filter((doc) => doc.specialty === activeCategory);

  const displayDoctors = filteredDoctors.slice(0, 3);

  const getDoctorAvailability = (doctor) => {
    // Get today's day of the week in Korean
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const today = days[new Date().getDay()];

    // Return availability if we have it
    if (doctor.availableTime && doctor.availableTime[today]) {
      return doctor.availableTime[today] === "휴진"
        ? "오늘 휴진"
        : `오늘 진료: ${doctor.availableTime[today]}`;
    }

    // Default message
    return "예약 가능 여부 확인";
  };

  const handleDoctorClick = (doctorId) => {
    // Navigate to doctor detail page
    navigate(`/detail/doctor/${doctorId}`);
  };

  if (!topDoctors.length) {
    return null;
  }

  return (
    <div className="top-doctors-container">
      <div className="section-header">
        <h3 className="section-title">추천 의사</h3>
        <span
          className="view-more-link"
          onClick={() =>
            navigate("/search", { state: { initialTab: "doctors" } })
          }
        >
          더 많은 의사 보기
          <ChevronRight className="view-more-icon" />
        </span>
      </div>

      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-button ${
              activeCategory === category.id
                ? "category-button-active"
                : "category-button-inactive"
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="doctors-list">
        {displayDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="doctor-card"
            onClick={() => handleDoctorClick(doctor.id)}
          >
            <div className="profile-image-container">
              {doctor.profileImage ? (
                <img
                  src={doctor.profileImage}
                  alt={doctor.name}
                  className="profile-image"
                />
              ) : (
                <div className="placeholder-image">
                  <User className="placeholder-icon" />
                </div>
              )}
            </div>

            <div className="doctor-info">
              <div className="doctor-name-container">
                <h4 className="doctor-name">{doctor.name} 의사</h4>
                <div className="rating-container">
                  <Star className="star-icon" />
                  <span className="rating-value">{doctor.rating}</span>
                  <span className="review-count">({doctor.reviewCount})</span>
                </div>
              </div>

              <div className="specialty-info">
                {getSpecialtyKoreanName(doctor.specialty)}
                {doctor.subSpecialty && doctor.subSpecialty.length > 0 && (
                  <span className="sub-specialty">
                    {" "}
                    · {doctor.subSpecialty.length}개 전문 분야
                  </span>
                )}
              </div>

              <div className="experience-info">
                <Award className="experience-icon" />
                <span>경력 {doctor.experience}년</span>
              </div>

              <div className="bottom-info">
                <div className="hospital-info">
                  <MapPin className="hospital-icon" />
                  <span>{doctor.hospitalName || "병원 정보"}</span>
                </div>

                <div className="availability-info">
                  <Clock className="availability-icon" />
                  <span>{getDoctorAvailability(doctor)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="load-more-button">더 많은 의사 보기</button>
    </div>
  );
};

export default TopDoctorsProfiles;
