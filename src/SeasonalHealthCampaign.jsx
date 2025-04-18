import React from "react";
import { Shield, Droplets, Sun, Check } from "lucide-react";
import "./SeasonalHealthCampaign.css";

const SeasonalHealthCampaign = () => {
  // 현재 시즌에 맞는 캠페인 데이터
  // 실제로는 서버에서 현재 계절이나 시기에 맞는 캠페인 정보를 가져와야 함
  const campaign = {
    id: 1,
    title: "봄철 알레르기 예방",
    subtitle: "꽃가루 알레르기 시즌이 찾아왔습니다",
    description:
      "꽃가루와 황사로 인한 알레르기 증상을 예방하고 관리하는 방법을 알려드립니다.",
    tips: [
      "외출 시 마스크 착용하기",
      "귀가 후 손과 얼굴 깨끗이 씻기",
      "환기는 오전 6시 이전이나 저녁에 하기",
      "항히스타민제 상비약 준비하기",
      "공기청정기 사용하기",
    ],
    relatedSymptoms: ["비염", "결막염", "기침", "피부발진"],
    color: "spring", // spring, summer, autumn, winter
  };

  // 계절별 아이콘 선택
  const getSeasonIcon = (season) => {
    switch (season) {
      case "spring":
        return <Droplets className="campaign-icon" />;
      case "summer":
        return <Sun className="campaign-icon" />;
      case "autumn":
        return <Droplets className="campaign-icon" />;
      case "winter":
        return <Shield className="campaign-icon" />;
      default:
        return <Shield className="campaign-icon" />;
    }
  };

  return (
    <div
      className={`section-container campaign-container season-${campaign.color}`}
    >
      <div className="campaign-header">
        <h3 className="section-title campaign-title">건강 캠페인</h3>
        <span className="campaign-view-all">전체보기</span>
      </div>

      <div className="campaign-card">
        <div className="campaign-content">
          <div className="campaign-icon-wrapper">
            <div className="campaign-icon-container">
              {getSeasonIcon(campaign.color)}
            </div>

            <div>
              <h3 className="campaign-heading" style={{ margin: 0 }}>
                {campaign.title}
              </h3>
              <p className="campaign-subtitle" style={{ margin: 0 }}>
                {campaign.subtitle}
              </p>
            </div>
          </div>

          <p className="campaign-description">{campaign.description}</p>

          <div className="campaign-tips">
            <h5 className="campaign-tips-title">알레르기 예방 팁</h5>
            <ul className="campaign-tips-list">
              {campaign.tips.slice(0, 3).map((tip, index) => (
                <li key={index} className="campaign-tip-item">
                  <Check className="campaign-tip-icon" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="campaign-symptoms">
            {campaign.relatedSymptoms.map((symptom, index) => (
              <span key={index} className="campaign-symptom-tag">
                #{symptom}
              </span>
            ))}
          </div>
        </div>

        <div className="campaign-footer">
          <span className="campaign-footer-text">관련 병원 보기</span>
          <button className="campaign-learn-more">자세히 알아보기</button>
        </div>
      </div>
    </div>
  );
};

export default SeasonalHealthCampaign;
