import React, { useState } from "react";
import { Heart, Bookmark, Share2 } from "lucide-react";
import "./HealthTipsSection.css";

const HealthTipsSection = () => {
  const [activeTab, setActiveTab] = useState("tips");
  const [savedItems, setSavedItems] = useState({});

  const tips = [
    {
      id: 1,
      title: "건강한 수면을 위한 5가지 습관",
      content:
        "충분한 수면은 건강 유지와 면역력 강화에 필수적입니다. 규칙적인 수면 시간, 블루라이트 차단, 이른 저녁 식사 등 실천해보세요.",
      category: "건강 습관",
      readTime: "3분",
      liked: false,
    },
    {
      id: 2,
      title: "여름철 피부 관리 방법",
      content:
        "자외선 차단제 사용, 수분 공급, 가벼운 스킨케어로 여름철 피부 건강을 지키세요.",
      category: "뷰티/피부",
      readTime: "2분",
      liked: false,
    },
    {
      id: 3,
      title: "목과 어깨 통증 완화 스트레칭",
      content:
        "컴퓨터 작업이 많은 현대인을 위한 간단한 스트레칭으로 만성 통증을 예방하세요.",
      category: "운동/자세",
      readTime: "4분",
      liked: false,
    },
  ];

  const news = [
    {
      id: 4,
      title: "새로운 피부 레이저 치료법 개발",
      content:
        "기존 대비 회복 기간을 절반으로 줄인 혁신적인 레이저 치료 기술이 국내 병원에 도입됩니다.",
      category: "의료 기술",
      date: "오늘",
      liked: false,
    },
    {
      id: 5,
      title: "코로나 이후 건강검진 중요성 강조",
      content:
        "전문가들은 코로나19 이후 지연된 정기 건강검진의 중요성을 강조하고 있습니다.",
      category: "건강 소식",
      date: "어제",
      liked: false,
    },
    {
      id: 6,
      title: "여름철 식중독 예방법",
      content:
        "기온 상승으로 인한 식중독 발생 가능성이 높아졌습니다. 식품 관리에 주의하세요.",
      category: "건강 경보",
      date: "2일 전",
      liked: false,
    },
  ];

  const toggleLike = (id) => {
    setSavedItems((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        liked: !(prev[id]?.liked || false),
      },
    }));
  };

  const toggleSave = (id) => {
    setSavedItems((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        saved: !(prev[id]?.saved || false),
      },
    }));
  };

  const isLiked = (id) => savedItems[id]?.liked || false;
  const isSaved = (id) => savedItems[id]?.saved || false;

  const activeContent = activeTab === "tips" ? tips : news;

  return (
    <div className="health-tips-container">
      <div className="health-tips-header">
        <h3 className="health-tips-title">건강 정보</h3>
        <span className="health-tips-view-more">더보기</span>
      </div>

      <div className="health-tips-tab-container">
        <button
          className={`health-tips-tab-button ${
            activeTab === "tips" ? "tab-button-active" : "tab-button-inactive"
          }`}
          onClick={() => setActiveTab("tips")}
        >
          건강 팁
        </button>
        <button
          className={`health-tips-tab-button ${
            activeTab === "news" ? "tab-button-active" : "tab-button-inactive"
          }`}
          onClick={() => setActiveTab("news")}
        >
          최신 소식
        </button>
      </div>

      <div className="content-list">
        {activeContent.map((item) => (
          <div key={item.id} className="content-card">
            <div className="card-header">
              <div>
                <span className="category-badge">{item.category}</span>
                {activeTab === "tips" && (
                  <span className="meta-info">읽는 시간: {item.readTime}</span>
                )}
                {activeTab === "news" && (
                  <span className="meta-info">{item.date}</span>
                )}
              </div>
              <div className="action-buttons">
                <button
                  onClick={() => toggleLike(item.id)}
                  className="action-button action-button-like"
                >
                  <Heart
                    className={`action-icon ${
                      isLiked(item.id) ? "liked-icon" : ""
                    }`}
                  />
                </button>
                <button
                  onClick={() => toggleSave(item.id)}
                  className="action-button action-button-save"
                >
                  <Bookmark
                    className={`action-icon ${
                      isSaved(item.id) ? "saved-icon" : ""
                    }`}
                  />
                </button>
                <button className="action-button">
                  <Share2 className="action-icon" />
                </button>
              </div>
            </div>

            <h4 className="content-title">{item.title}</h4>
            <p className="content-text">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthTipsSection;
