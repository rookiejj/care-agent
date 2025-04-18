import React from "react";
import { ArrowRight, Calendar, Sparkles, Clock } from "lucide-react";
import "./PromotionBanners.css";

const PromotionBanners = () => {
  const promos = [
    {
      id: 1,
      title: "신규 회원 혜택",
      subtitle: "첫 진료 예약 30% 할인",
      description: "슈퍼휴먼 신규 가입 회원 대상 첫 예약 특별 할인",
      color: "promo-blue",
      icon: <Sparkles className="promo-icon" />,
      endDate: "2025-05-31",
    },
    {
      id: 2,
      title: "정기 건강검진 캠페인",
      subtitle: "종합검진 20% 할인",
      description: "봄맞이 건강검진, 연계 병원 전체 할인 혜택",
      color: "promo-green",
      icon: <Calendar className="promo-icon" />,
      endDate: "2025-05-15",
    },
  ];

  const getDaysRemaining = (endDateStr) => {
    const endDate = new Date(endDateStr);
    const today = new Date();
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="promotion-container">
      <div className="promotion-header">
        <h3 className="promotion-title">특별 프로모션</h3>
        <span className="promotion-view-all">모두 보기</span>
      </div>

      <div className="promotion-list">
        {promos.map((promo) => {
          const daysRemaining = getDaysRemaining(promo.endDate);

          return (
            <div key={promo.id} className={`promotion-card ${promo.color}`}>
              {/* 배경 장식 */}
              <div className="promo-decoration promo-decoration-top"></div>
              <div className="promo-decoration promo-decoration-bottom"></div>

              <div className="promotion-content">
                <div className="promotion-info">
                  <div className="promotion-header-row">
                    {promo.icon}
                    <h4 className="promotion-card-title">{promo.title}</h4>
                  </div>
                  <p className="promotion-subtitle">{promo.subtitle}</p>
                  <p className="promotion-description">{promo.description}</p>

                  <div className="promotion-action">
                    <button className="promotion-button">
                      자세히 보기
                      <ArrowRight className="promotion-arrow-icon" />
                    </button>
                  </div>
                </div>

                <div className="promotion-timer">
                  <div className="promotion-countdown">
                    <Clock className="promotion-clock-icon" />
                    <span>D-{daysRemaining}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PromotionBanners;
