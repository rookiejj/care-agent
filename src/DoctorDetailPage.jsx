import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { PageHeader, getHospitalImage, getProfileImage } from "./App";
import { useData } from "./DataContext";
import {
  Heart,
  Share2,
  Phone,
  Star,
  Award,
  Building2,
  Clipboard,
  BookOpen,
  Calendar,
  MessageCircle,
  Siren,
  X,
  Check,
} from "lucide-react";
import {
  getSpecialtyTagClass,
  getSpecialtyKoreanName,
  getSubSpecialtyKoreanName,
} from "./medicalCategoryData";
import "./DoctorDetailPage.css";

const DoctorDetailPage = ({ currentLocation }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctorsData } = useData();
  const { id } = useParams();

  // Try to get doctor data from location state or find by ID in doctorsData
  const [doctor, setDoctor] = useState(() => {
    if (location.state?.item) {
      return location.state.item;
    } else if (id && doctorsData.length > 0) {
      const foundDoctor = doctorsData.find((d) => d.id === parseInt(id));
      return foundDoctor || {};
    }
    return {};
  });
  const [isFavorite, setIsFavorite] = useState(true);
  const [activeTab, setActiveTab] = useState("info");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAllExperience, setShowAllExperience] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showAllPublications, setShowAllPublications] = useState(false);

  useEffect(() => {
    // If we have the ID but no doctor data yet, try to find the doctor
    if (id && Object.keys(doctor).length === 0 && doctorsData.length > 0) {
      const foundDoctor = doctorsData.find((d) => d.id === parseInt(id));
      if (foundDoctor) {
        setDoctor(foundDoctor);
      } else {
        // If doctor not found, redirect to home
        navigate("/");
      }
    } else if (!doctor || Object.keys(doctor).length === 0) {
      // If no doctor data and no ID, redirect to home
      navigate("/");
      return;
    }

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id, doctorsData]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const toggleFavorite = (e) => {
    if (e) e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleBookingClick = () => {
    navigate("/booking", { state: { item: doctor, selectedDoctor: doctor } });
  };

  const handleReviewClick = () => {
    setActiveTab("reviews");
    window.scrollTo(0, 0);
  };

  const handleShareClick = () => {
    // Web Share API를 사용하여 공유 기능 구현
    if (navigator.share) {
      navigator
        .share({
          title: `${doctor.name} ${getSpecialtyKoreanName(doctor.specialty)}`,
          text: `${doctor.name} ${getSpecialtyKoreanName(doctor.specialty)} - ${
            doctor.description
          }`,
          url: window.location.href,
        })
        .catch((error) => console.log("공유 실패:", error));
    } else {
      // 공유 API가 지원되지 않는 경우 URL 복사
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert("URL이 클립보드에 복사되었습니다."))
        .catch((err) => console.error("URL 복사 실패:", err));
    }
  };

  // Mock reviews data based on real patterns
  const reviews = [
    {
      id: 1,
      author: "김지은",
      profileImage: getProfileImage(),
      date: "2025-03-15",
      rating: 5,
      content:
        `${doctor.name} 선생님이 친절하게 설명해주시고 진료도 꼼꼼하게 해주셨습니다. ` +
        `${getSpecialtyKoreanName(
          doctor.specialty
        )} 전문의답게 정확한 진단과 처방을 해주셔서 증상이 빠르게 호전되었어요.`,
    },
    {
      id: 2,
      author: "이상현",
      profileImage: getProfileImage(),
      date: "2025-03-10",
      rating: 4,
      content:
        "진료는 만족스러웠으나 대기 시간이 조금 길었습니다. 그래도 의사선생님이 충분한 설명을 해주셔서 좋았어요.",
    },
    {
      id: 3,
      author: "박민수",
      profileImage: getProfileImage(),
      date: "2025-03-05",
      rating: 5,
      content:
        `${
          doctor.subSpecialty && doctor.subSpecialty.length > 0
            ? getSubSpecialtyKoreanName(doctor.subSpecialty[0])
            : ""
        } 증상으로 진료받았는데, ` +
        "정말 친절하게 진료해주셨어요. 증상에 대해 자세히 물어보시고 적절한 치료 방법을 알려주셨습니다. 다음에도 이용할 예정입니다.",
    },
    {
      id: 4,
      author: "최유진",
      profileImage: getProfileImage(),
      date: "2025-03-01",
      rating: 4,
      content:
        "병원이 깨끗하고 접수부터 진료까지 시스템이 잘 갖춰져 있어요. 의사선생님의 설명이 자세해서 이해하기 쉬웠습니다.",
    },
    {
      id: 5,
      author: "정준호",
      profileImage: getProfileImage(),
      date: "2025-02-25",
      rating: 5,
      content:
        `여러 ${getSpecialtyKoreanName(doctor.specialty)}를 다녀봤지만 ${
          doctor.name
        } 선생님이 가장 만족스러웠습니다. ` +
        "증상이 많이 호전되었고, 질문에도 친절히 답해주셨어요.",
    },
  ];

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 2);

  // Get next available appointment slots based on doctor's schedule
  const getAvailableSlots = () => {
    const today = new Date();
    const slots = [];
    const dayNames = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const koreanDayNames = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];

    // Check up to 14 days to find 3 available days
    for (let i = 0; i < 14 && slots.length < 1; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const dayIndex = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const dayName = dayNames[dayIndex];
      const koreanDayName = koreanDayNames[dayIndex];
      const dateString = date.toLocaleDateString("ko-KR", {
        month: "long",
        day: "numeric",
      });

      // Get time range from doctor's schedule
      let timeRange = doctor.availableTime
        ? doctor.availableTime[dayName]
        : null;

      // Skip if 휴진 (closed) or unavailable
      if (!timeRange || timeRange === "휴진") {
        continue;
      }

      // Parse time range
      const [start, end] = timeRange.split("-");
      const [startHour, startMinute] = start
        .split(":")
        .map((num) => parseInt(num));
      const [endHour, endMinute] = end.split(":").map((num) => parseInt(num));

      // Create evenly distributed time slots
      const availableTimes = [];

      // Calculate total minutes in the time range
      const startTotalMinutes = startHour * 60 + (startMinute || 0);
      const endTotalMinutes = endHour * 60 + (endMinute || 0);
      const totalMinutes = endTotalMinutes - startTotalMinutes;

      // Number of slots to create (at least 3, but proportional to the time range)
      const numSlots = Math.max(3, Math.floor(totalMinutes / 120));

      // If more than 5 hours, create slots every 60-90 minutes
      const interval = totalMinutes / numSlots;

      // Create time slots
      for (let j = 0; j < numSlots; j++) {
        // Distribute slots evenly within the time range, but add some randomness
        const randomOffset = Math.floor(Math.random() * 20) - 10; // -10 to +10 minutes
        const slotMinutes =
          startTotalMinutes + Math.floor(j * interval) + randomOffset;

        // Ensure slot is within range
        if (slotMinutes >= startTotalMinutes && slotMinutes < endTotalMinutes) {
          const slotHour = Math.floor(slotMinutes / 60);
          const slotMinute = slotMinutes % 60;

          // Format properly with leading zeros if needed
          const formattedHour = slotHour.toString().padStart(2, "0");
          const formattedMinute = slotMinute.toString().padStart(2, "0");

          availableTimes.push(`${formattedHour}:${formattedMinute}`);
        }
      }

      // Sort times
      availableTimes.sort();

      // Only keep times that are in the future for today
      const filteredTimes =
        i === 0
          ? availableTimes.filter((time) => {
              const [hour, minute] = time
                .split(":")
                .map((num) => parseInt(num));
              const timeDate = new Date();
              timeDate.setHours(hour, minute, 0, 0);
              return timeDate > new Date();
            })
          : availableTimes;

      // Only add day if it has available times
      if (filteredTimes.length > 0) {
        slots.push({
          date: dateString,
          day: koreanDayName,
          times: filteredTimes.slice(0, 3), // Limit to 3 times per day
        });
      }
    }

    return slots;
  };

  const availableSlots = getAvailableSlots();

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    return (
      <div className="stars-container">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={
              i < fullStars
                ? "star filled"
                : i === fullStars && halfStar
                ? "star half-filled"
                : "star empty"
            }
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <div
        className="fixed-header"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <PageHeader
          currentLocation={currentLocation}
          backButtonVisible={true}
          onBack={handleBackClick}
        />
        <div
          style={{
            alignContent: "center",
            marginTop: "0.5rem",
            marginRight: "1rem",
          }}
        >
          <div className="doctor-actions">
            <button
              className="icon-button"
              onClick={toggleFavorite}
              aria-label="찜하기"
            >
              <Heart
                fill={isFavorite ? "#ef4444" : "none"}
                color={isFavorite ? "#ef4444" : "#6b7280"}
                size={20}
              />
            </button>
            <button
              className="icon-button"
              onClick={handleShareClick}
              aria-label="공유하기"
            >
              <Share2 size={20} color="#6b7280" />
            </button>
          </div>
        </div>
      </div>

      <div className="doctor-detail-content">
        {/* Doctor profile header */}
        <div className="doctor-profile-header">
          <div className="doctor-basic-info">
            <div className="doctor-name-container">
              <h2 className="doctor-name">{doctor.name}</h2>
              <div className="doctor-specialty-tag">
                <span
                  className={`specialty-tag specialty-tag-${getSpecialtyTagClass(
                    doctor.specialty
                  )}`}
                >
                  {getSpecialtyKoreanName(doctor.specialty)} 전문의
                </span>
              </div>
            </div>

            <div className="doctor-rating">
              <Star size={16} color="#fbbf24" fill="#fbbf24" />
              <span className="rating-value">{doctor.rating}</span>
              <span className="review-count">({doctor.reviewCount})</span>
            </div>

            <div className="doctor-hospital">
              <Building2 size={16} color="#6b7280" />
              <span>{doctor.hospitalName || "개인 진료"}</span>
            </div>

            {/* {doctor.consultationFee && (
              <div className="doctor-fee">
                <span className="consultation-fee-label">진료비</span>
                <span className="consultation-fee-value">
                  ₩{doctor.consultationFee.toLocaleString()}
                </span>
              </div>
            )} */}
          </div>
          <div className="doctor-image-container">
            <img
              src={doctor.profileImage}
              alt={doctor.name}
              className="doctor-profile-image"
            />
            {doctor.awards && doctor.awards.length > 0 && (
              <div className="doctor-badge-container">
                <span className="doctor-badge">
                  <Award size={12} />
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Quick appointment */}
        <div className="quick-appointment-section">
          <span className="specialty-tag specialty-tag-psychiatry">
            빠른 예약
          </span>
          <div className="appointment-slots">
            {availableSlots.map((slot, slotIndex) => (
              <div key={slotIndex} className="appointment-day">
                <div className="appointment-date">
                  <span className="date">{slot.date}</span>
                  <span className="day">{slot.day}</span>
                </div>
                <div className="appointment-times">
                  {slot.times.map((time, timeIndex) => (
                    <button
                      key={timeIndex}
                      className="time-slot-button"
                      onClick={handleBookingClick}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="tab-navigation">
          <button
            className={`tab-button ${activeTab === "info" ? "active" : ""}`}
            onClick={() => setActiveTab("info")}
          >
            의사 정보
          </button>
          <button
            className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            후기 ({reviews.length})
          </button>
          <button
            className={`tab-button ${activeTab === "schedule" ? "active" : ""}`}
            onClick={() => setActiveTab("schedule")}
          >
            진료 시간
          </button>
        </div>

        {/* 탭 콘텐츠 */}
        <div className="tab-content">
          {/* 정보 탭 */}
          {activeTab === "info" && (
            <div className="info-tab">
              {doctor.description && (
                <div className="info-section">
                  <h3 className="section-title">소개</h3>
                  <p
                    className={`doctor-description ${
                      showFullDescription ? "show-full" : ""
                    }`}
                  >
                    {doctor.description}
                  </p>
                  {!showFullDescription && doctor.description.length > 10 && (
                    <button
                      className="view-more-text"
                      onClick={() => setShowFullDescription(true)}
                    >
                      더보기
                    </button>
                  )}
                </div>
              )}

              {/* Doctor subspecialties */}
              {doctor.subSpecialty && doctor.subSpecialty.length > 0 ? (
                <div className="info-section">
                  <h3 className="section-title">전문 분야</h3>
                  <div className="subspecialty-tags">
                    {doctor.subSpecialty.map((subspecialty, index) => (
                      <span key={index} className="subspecialty-tag">
                        {getSubSpecialtyKoreanName(subspecialty)}
                      </span>
                    ))}
                  </div>
                </div>
              ) : doctor.specialty ? (
                <div className="info-section">
                  <h3 className="section-title">전문 분야</h3>
                  <div className="subspecialty-tags">
                    <span className="subspecialty-tag">
                      {getSpecialtyKoreanName(doctor.specialty)} 전반
                    </span>
                  </div>
                </div>
              ) : null}

              {doctor.education && doctor.education.length > 0 && (
                <div className="info-section">
                  <h3 className="section-title">학력 및 경력</h3>
                  <ul className="education-list">
                    {doctor.education.map((edu, index) => (
                      <li key={index} className="education-item">
                        <BookOpen size={16} color="#3b82f6" />
                        <span>{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {doctor.certifications && doctor.certifications.length > 0 && (
                <div className="info-section">
                  <h3 className="section-title">자격 및 학회</h3>
                  <ul className="certification-list">
                    {doctor.certifications.map((cert, index) => (
                      <li key={index} className="certification-item">
                        <Clipboard size={16} color="#3b82f6" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {doctor.awards && doctor.awards.length > 0 && (
                <div className="info-section">
                  <h3 className="section-title">수상 내역</h3>
                  <ul className="awards-list">
                    {doctor.awards.map((award, index) => (
                      <li key={index} className="award-item">
                        <Award size={16} color="#3b82f6" />
                        <span>{award}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {doctor.publications && doctor.publications.length > 0 && (
                <div className="info-section">
                  <h3 className="section-title">논문 및 저서</h3>
                  <ul className="publications-list">
                    {(showAllPublications
                      ? doctor.publications
                      : doctor.publications.slice(0, 2)
                    ).map((pub, index) => (
                      <li key={index} className="publication-item">
                        <BookOpen size={16} color="#3b82f6" />
                        <span>{pub}</span>
                      </li>
                    ))}
                  </ul>
                  {!showAllPublications && doctor.publications.length > 2 && (
                    <button
                      className="view-more-text"
                      onClick={() => setShowAllPublications(true)}
                    >
                      더보기 ({doctor.publications.length - 2}개)
                    </button>
                  )}
                </div>
              )}

              {doctor.languages && doctor.languages.length > 0 && (
                <div className="info-section">
                  <h3 className="section-title">사용 가능 언어</h3>
                  <div className="language-tags">
                    {doctor.languages.map((lang, index) => (
                      <span key={index} className="language-tag">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {doctor.hospitalName && (
                <div className="info-section">
                  <h3 className="section-title">진료 병원</h3>
                  <div className="hospital-card">
                    <div className="hospital-card-image">
                      <img
                        src={getHospitalImage("all", (doctor.id % 3) + 1)}
                        alt={doctor.hospitalName}
                      />
                    </div>
                    <div className="hospital-card-info">
                      <h4 className="hospital-card-name">
                        {doctor.hospitalName}
                      </h4>
                      <p className="hospital-card-address">
                        서울시 {doctor.id % 2 === 0 ? "강남구" : "서초구"}{" "}
                        {doctor.id * 123}번지
                      </p>
                      <button
                        className="view-hospital-button"
                        onClick={() =>
                          navigate(`/detail/medical/${doctor.hospitalId}`)
                        }
                      >
                        병원 정보 보기
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 후기 탭 */}
          {activeTab === "reviews" && (
            <div className="reviews-tab">
              <div className="reviews-summary">
                <div className="average-rating">
                  <h3>{doctor.rating}</h3>
                  <div className="rating-stars">
                    {renderStars(doctor.rating)}
                  </div>
                  <p className="total-reviews">
                    총 {doctor.reviewCount}개의 후기
                  </p>
                </div>

                <div className="rating-bars">
                  <div className="rating-bar-item">
                    <span className="rating-label">5점</span>
                    <div className="rating-bar-container">
                      <div
                        className="rating-bar-fill"
                        style={{ width: "70%" }}
                      ></div>
                    </div>
                    <span className="rating-percentage">70%</span>
                  </div>
                  <div className="rating-bar-item">
                    <span className="rating-label">4점</span>
                    <div className="rating-bar-container">
                      <div
                        className="rating-bar-fill"
                        style={{ width: "20%" }}
                      ></div>
                    </div>
                    <span className="rating-percentage">20%</span>
                  </div>
                  <div className="rating-bar-item">
                    <span className="rating-label">3점</span>
                    <div className="rating-bar-container">
                      <div
                        className="rating-bar-fill"
                        style={{ width: "7%" }}
                      ></div>
                    </div>
                    <span className="rating-percentage">7%</span>
                  </div>
                  <div className="rating-bar-item">
                    <span className="rating-label">2점</span>
                    <div className="rating-bar-container">
                      <div
                        className="rating-bar-fill"
                        style={{ width: "2%" }}
                      ></div>
                    </div>
                    <span className="rating-percentage">2%</span>
                  </div>
                  <div className="rating-bar-item">
                    <span className="rating-label">1점</span>
                    <div className="rating-bar-container">
                      <div
                        className="rating-bar-fill"
                        style={{ width: "1%" }}
                      ></div>
                    </div>
                    <span className="rating-percentage">1%</span>
                  </div>
                </div>
              </div>

              <div className="reviews-list-container">
                <h3 className="section-title">후기 {reviews.length}개</h3>
                <ul className="reviews-list">
                  {displayedReviews.map((review) => (
                    <li key={review.id} className="review-item">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <img
                            src={review.profileImage}
                            alt={review.author}
                            className="reviewer-image"
                          />
                          <div>
                            <h4 className="reviewer-name">{review.author}</h4>
                            <div className="review-rating">
                              {renderStars(review.rating)}
                              <span className="review-date">
                                {review.date.substring(0, 10)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button className="report-button">
                          <Siren size={16} color="#6b7280" />
                        </button>
                      </div>
                      <p className="review-content">{review.content}</p>
                    </li>
                  ))}
                </ul>

                {reviews.length > 2 && !showAllReviews && (
                  <button
                    className="view-more-button centered"
                    onClick={() => setShowAllReviews(true)}
                  >
                    후기 더보기 ({reviews.length - 2}개 더보기)
                  </button>
                )}
              </div>
            </div>
          )}

          {/* 진료 시간 탭 */}
          {activeTab === "schedule" && (
            <div className="schedule-tab">
              <div className="info-section">
                <h3 className="section-title">진료 시간</h3>
                <ul className="opening-hours-list">
                  {Object.entries(doctor.availableTime || {}).map(
                    ([day, hours], index) => {
                      const koreanDay =
                        day === "monday"
                          ? "월요일"
                          : day === "tuesday"
                          ? "화요일"
                          : day === "wednesday"
                          ? "수요일"
                          : day === "thursday"
                          ? "목요일"
                          : day === "friday"
                          ? "금요일"
                          : day === "saturday"
                          ? "토요일"
                          : day === "sunday"
                          ? "일요일"
                          : day;

                      return (
                        <li key={index} className="opening-hours-item">
                          <span className="day">{koreanDay}</span>
                          <span
                            className={`hours ${
                              hours === "휴진" ? "closed" : ""
                            }`}
                          >
                            {hours}
                          </span>
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>

              <div className="info-section">
                <h3 className="section-title">진료 예약 방법</h3>
                <div className="booking-methods">
                  <div className="booking-method">
                    <div className="booking-method-icon">
                      <Calendar size={20} color="#3b82f6" />
                    </div>
                    <div className="booking-method-info">
                      <h4>앱에서 예약</h4>
                      <p>
                        원하는 날짜와 시간을 선택하여 빠르게 예약할 수 있습니다.
                      </p>
                    </div>
                  </div>
                  <div className="booking-method">
                    <div className="booking-method-icon">
                      <Phone size={20} color="#3b82f6" />
                    </div>
                    <div className="booking-method-info">
                      <h4>전화 예약</h4>
                      <p>
                        병원에 직접 전화하여 예약할 수 있습니다. (02-
                        {1000 + doctor.id}-{5000 + doctor.id})
                      </p>
                    </div>
                  </div>
                  <div className="booking-method">
                    <div className="booking-method-icon">
                      <MessageCircle size={20} color="#3b82f6" />
                    </div>
                    <div className="booking-method-info">
                      <h4>상담 문의</h4>
                      <p>
                        예약 전 궁금한 점은 앱 내 상담을 통해 문의할 수
                        있습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h3 className="section-title">진료 준비 사항</h3>
                <ul className="preparation-list">
                  <li>
                    <Check size={16} color="#3b82f6" />
                    <span>건강보험증 또는 주민등록증</span>
                  </li>
                  <li>
                    <Check size={16} color="#3b82f6" />
                    <span>기존 검사 결과지나 진단서(해당 시)</span>
                  </li>
                  <li>
                    <Check size={16} color="#3b82f6" />
                    <span>복용 중인 약물 목록</span>
                  </li>
                  <li>
                    <Check size={16} color="#3b82f6" />
                    <span>진료비(카드/현금)</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="detail-page-footer">
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button className="primary-button" onClick={handleBookingClick}>
            비대면 진료 예약하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailPage;
