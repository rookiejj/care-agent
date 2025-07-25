import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader, getHospitalImage, getProfileImage } from "./App";
import { useData } from "./DataContext";
import {
  Heart,
  Share2,
  MapPin,
  Phone,
  Clock,
  Star,
  Info,
  Image,
  Check,
  Award,
  Siren,
} from "lucide-react";
import "./HospitalDetailPage.css";
import DoctorCard from "./DoctorCard";

const HospitalDetailPage = ({ currentLocation }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctorsData } = useData();

  const [item, setItem] = useState(location.state?.item || {});
  const [isFavorite, setIsFavorite] = useState(true);
  const [activeTab, setActiveTab] = useState("info");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAllDoctors, setShowAllDoctors] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    if (item.isEvent) {
      setActiveTab("events");
    }
  }, []);

  // Mock data for demonstration
  const hospitalDetails = {
    address: "서울시 강남구 역삼동 123-45",
    phone: "02-1234-5678",
    website: "www.hospital-name.com",
    openingHours: [
      { day: "월요일", hours: "09:00 - 18:00" },
      { day: "화요일", hours: "09:00 - 18:00" },
      { day: "수요일", hours: "09:00 - 18:00" },
      { day: "목요일", hours: "09:00 - 18:00" },
      { day: "금요일", hours: "09:00 - 18:00" },
      { day: "토요일", hours: "09:00 - 13:00" },
      { day: "일요일", hours: "휴진" },
    ],
    facilities: ["주차", "와이파이", "장애인 시설", "수유실"],
    insurances: ["국민건강보험", "자동차보험", "산재보험"],
    description:
      "저희 병원은 20년 이상의 경력을 가진 전문의들이 최신 의료 장비와 기술을 사용하여 정확한 진단과 맞춤형 치료를 제공합니다. 환자 중심의 의료 서비스를 지향하며, 편안하고 안전한 진료 환경을 조성하기 위해 노력합니다. 특히 본원은 해당 분야에서 다수의 학술 논문과 연구 성과를 발표한 전문의들로 구성되어 있으며, 지속적인 교육과 훈련을 통해 최신 의료 트렌드를 반영한 진료를 제공합니다. 또한 환자 개인별 상태에 맞는 맞춤형 치료 계획을 수립하여 최상의 치료 결과를 도출하기 위해 최선을 다하고 있습니다.",
    images: [
      { id: 1, url: getHospitalImage("all", 1) },
      { id: 2, url: getHospitalImage("all", 2) },
      { id: 3, url: getHospitalImage("all", 3) },
    ],
  };

  // Filter doctors matching this hospital's specialty
  const relevantDoctors = doctorsData
    .filter((doctor) => doctor.specialty === item.specialty)
    .slice(0, 10);

  const displayedDoctors = showAllDoctors
    ? relevantDoctors
    : relevantDoctors.slice(0, 3);

  // Mock reviews
  const reviews = [
    {
      id: 1,
      author: "김지은",
      profileImage: getProfileImage(),
      date: "2025-03-15",
      rating: 5,
      content:
        "의사선생님이 친절하게 설명해주시고 진료도 꼼꼼하게 해주셔서 만족스러웠습니다. 대기 시간도 짧고 시설도 깨끗했어요.",
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
        "정말 친절하게 진료해주셨어요. 증상에 대해 자세히 물어보시고 적절한 치료 방법을 알려주셨습니다. 다음에도 이용할 예정입니다.",
    },
    {
      id: 4,
      author: "최유진",
      profileImage: getProfileImage(),
      date: "2025-03-01",
      rating: 4,
      content:
        "병원이 깨끗하고 접수부터 진료까지 시스템이 잘 갖춰져 있어요. 의사선생님도 친절하셨습니다.",
    },
    {
      id: 5,
      author: "정준호",
      profileImage: getProfileImage(),
      date: "2025-02-25",
      rating: 5,
      content:
        "여러 병원을 다녀봤지만 이곳이 가장 만족스러웠습니다. 증상이 많이 호전되었고, 의료진들도 모두 친절했어요.",
    },
  ];

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 2);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleBookingClick = () => {
    setActiveTab("doctors");
    window.scrollTo(0, 0);
  };

  const handleShareClick = () => {
    // Web Share API를 사용하여 공유 기능 구현
    if (navigator.share) {
      navigator
        .share({
          title: item.title,
          text: `${item.title} - ${item.description}`,
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
          onBack={() => navigate(-1)}
        />
        <div
          style={{
            alignContent: "center",
            marginTop: "0.5rem",
            marginRight: "1rem",
          }}
        >
          <div className="hospital-actions">
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

      <div className="hospital-detail-content">
        {/* 이미지 슬라이더 */}
        <div className="hospital-image-slider">
          <img
            src={item.image || hospitalDetails.images[0].url}
            alt={item.title}
            className="hospital-main-image"
          />
          <div className="image-count-badge">
            <Image size={14} />
            <span>{hospitalDetails.images.length}</span>
          </div>
        </div>

        {/* 병원 기본 정보 */}
        <div className="hospital-basic-info">
          <div className="hospital-header">
            <h2 className="hospital-title">{item.title}</h2>
            <div className="hospital-specialty">
              <span className={`specialty-tag specialty-tag-${item.specialty}`}>
                {item.specialty === "neurology"
                  ? "신경과"
                  : item.specialty === "cardiology"
                  ? "심장내과"
                  : item.specialty === "dermatology"
                  ? "피부과"
                  : item.specialty === "orthopedics"
                  ? "정형외과"
                  : item.specialty === "gastroenterology"
                  ? "소화기내과"
                  : item.specialty === "ophthalmology"
                  ? "안과"
                  : item.specialty === "ent"
                  ? "이비인후과"
                  : item.specialty === "psychiatry"
                  ? "정신건강의학과"
                  : item.specialty === "pulmonology"
                  ? "호흡기내과"
                  : item.specialty === "plastic"
                  ? "성형외과"
                  : item.specialty}
              </span>
            </div>
          </div>

          <div className="hospital-rating">
            <Star size={20} color="#fbbf24" fill="#fbbf24" />
            <span className="rating-value">{item.rating}</span>
            <span className="review-count">({item.reviewCount})</span>
          </div>

          <div className="hospital-address">
            <MapPin size={16} color="#6b7280" />
            <span>{hospitalDetails.address}</span>
          </div>

          <div className="hospital-phone">
            <Phone size={16} color="#6b7280" />
            <span>{hospitalDetails.phone}</span>
          </div>

          <div className="hospital-hours">
            <Clock size={16} color="#6b7280" />
            <span>
              {hospitalDetails.openingHours[0].day}:
              {hospitalDetails.openingHours[0].hours}
            </span>
          </div>
        </div>

        <div className="tab-navigation">
          <button
            className={`tab-button ${activeTab === "info" ? "active" : ""}`}
            onClick={() => setActiveTab("info")}
          >
            정보
          </button>
          <button
            className={`tab-button ${activeTab === "doctors" ? "active" : ""}`}
            onClick={() => setActiveTab("doctors")}
          >
            의사 ({relevantDoctors.length})
          </button>
          <button
            className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            후기 ({reviews.length})
          </button>
          <button
            className={`tab-button ${activeTab === "events" ? "active" : ""}`}
            onClick={() => setActiveTab("events")}
          >
            이벤트
          </button>
        </div>

        {/* 탭 콘텐츠 */}
        <div className="tab-content">
          {/* 정보 탭 */}
          {activeTab === "info" && (
            <div className="info-tab">
              <div className="info-section">
                <h3 className="section-title">소개</h3>
                <p
                  className={`hospital-description ${
                    showFullDescription ? "show-full" : ""
                  }`}
                >
                  {hospitalDetails.description}
                </p>
                {!showFullDescription &&
                  hospitalDetails.description.length > 10 && (
                    <button
                      className="view-more-text"
                      onClick={() => setShowFullDescription(true)}
                    >
                      더보기
                    </button>
                  )}
              </div>

              <div className="info-section">
                <h3 className="section-title">진료 시간</h3>
                <ul className="opening-hours-list">
                  {hospitalDetails.openingHours.map((item, index) => (
                    <li key={index} className="opening-hours-item">
                      <span className="day">{item.day}</span>
                      <span className="hours">{item.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="info-section">
                <h3 className="section-title">시설 정보</h3>
                <ul className="facilities-list">
                  {hospitalDetails.facilities.map((facility, index) => (
                    <li key={index} className="facility-item">
                      <Check size={16} color="#3b82f6" />
                      <span>{facility}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="info-section">
                <h3 className="section-title">건강보험 정보</h3>
                <ul className="insurance-list">
                  {hospitalDetails.insurances.map((insurance, index) => (
                    <li key={index} className="insurance-item">
                      <Check size={16} color="#3b82f6" />
                      <span>{insurance}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="info-section">
                <h3 className="section-title">위치 정보</h3>
                <div className="hospital-map-container">
                  <img
                    src="/images/map.png"
                    alt="병원 위치 지도"
                    className="hospital-map"
                  />
                  <div className="map-address">
                    <MapPin size={16} color="#6b7280" />
                    <span>{hospitalDetails.address}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 의사 탭 */}
          {activeTab === "doctors" && (
            <div className="doctors-tab">
              {displayedDoctors.length > 0 ? (
                <>
                  {displayedDoctors.map((doctor) => (
                    <DoctorCard
                      key={doctor.id}
                      item={{ ...doctor, type: item.type }}
                      showBooking={true}
                    />
                  ))}

                  {relevantDoctors.length > 3 && !showAllDoctors && (
                    <button
                      className="view-more-button centered"
                      onClick={() => setShowAllDoctors(true)}
                    >
                      의사 더보기 ({relevantDoctors.length - 3}명 더보기)
                    </button>
                  )}
                </>
              ) : (
                <div className="no-doctors-message">
                  <Info size={20} color="#6b7280" />
                  <p>등록된 의사 정보가 없습니다.</p>
                </div>
              )}
            </div>
          )}

          {/* 후기 탭 */}
          {activeTab === "reviews" && (
            <div className="reviews-tab">
              <div className="reviews-summary">
                <div className="average-rating">
                  <h3>{item.rating}</h3>
                  <div className="rating-stars">{renderStars(item.rating)}</div>
                  <p className="total-reviews">
                    총 {item.reviewCount}개의 후기
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

          {/* 이벤트 탭 */}
          {activeTab === "events" && (
            <div className="reviews-tab">
              {item.isEvent && (
                <div className="hospital-event-banner">
                  <div className="event-badge">이벤트</div>
                  <div className="event-info">
                    <div className="event-period">{item.eventPeriod}</div>
                    <div className="event-content">{item.eventContent}</div>
                  </div>
                  <div className="event-price">
                    <div className="original-price">{item.originalPrice}</div>
                    <div className="discount-price">{item.discountPrice}</div>
                    <div className="discount-rate">
                      {item.discountRate} 할인
                    </div>
                  </div>
                </div>
              )}
              {item.isEvent && (
                <div className="hospital-event-banner">
                  <div className="event-badge">이벤트</div>
                  <div className="event-info">
                    <div className="event-period">{item.eventPeriod}</div>
                    <div className="event-content">{item.eventContent}</div>
                  </div>
                  <div className="event-price">
                    <div className="original-price">{item.originalPrice}</div>
                    <div className="discount-price">{item.discountPrice}</div>
                    <div className="discount-rate">
                      {item.discountRate} 할인
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="detail-page-footer">
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button className="primary-button" onClick={handleBookingClick}>
            예약하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetailPage;
