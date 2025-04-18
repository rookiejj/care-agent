import React, { useState } from "react";
import { MessageCircle, Heart, Eye, ChevronRight } from "lucide-react";
import "./TrendingCommunityPosts.css";

const TrendingCommunityPosts = () => {
  const [activeTab, setActiveTab] = useState("medical");

  // 샘플 게시물 데이터
  const posts = {
    medical: [
      {
        id: 1,
        title: "치통이 너무 심한데 응급실 가야 하나요?",
        author: "건강지킴이",
        time: "3시간 전",
        views: 156,
        likes: 32,
        comments: 17,
        tags: ["치통", "응급", "치과"],
      },
      {
        id: 2,
        title: "건강검진 후 지방간 발견됨. 관리 방법 공유해요",
        author: "다이어트중",
        time: "5시간 전",
        views: 254,
        likes: 89,
        comments: 43,
        tags: ["지방간", "건강검진", "식이요법"],
      },
      {
        id: 3,
        title: "수면무호흡증 부모님 치료한 경험 있으신 분?",
        author: "잠못드는밤",
        time: "어제",
        views: 198,
        likes: 41,
        comments: 22,
        tags: ["수면무호흡증", "치료", "경험담"],
      },
    ],
    cosmetic: [
      {
        id: 4,
        title: "레이저 토닝 1년 결과 공유 (사진 첨부)",
        author: "피부좋아짐",
        time: "2시간 전",
        views: 321,
        likes: 145,
        comments: 32,
        tags: ["레이저토닝", "색소침착", "후기"],
      },
      {
        id: 5,
        title: "필러 맞은 지 1주일, 부기 언제 빠지나요?",
        author: "예뻐질래",
        time: "6시간 전",
        views: 178,
        likes: 24,
        comments: 19,
        tags: ["필러", "부기", "회복기"],
      },
      {
        id: 6,
        title: "보톡스 시술 비용 병원별 비교해봤어요",
        author: "미용정보통",
        time: "어제",
        views: 267,
        likes: 120,
        comments: 45,
        tags: ["보톡스", "비용", "병원비교"],
      },
    ],
  };

  const currentPosts = posts[activeTab] || [];

  return (
    <div className="section-container trending-posts-container">
      <div className="trending-posts-header">
        <h3 className="section-title trending-posts-title">커뮤니티 인기글</h3>
        <span className="trending-posts-more">
          더보기
          <ChevronRight className="trending-posts-more-icon" />
        </span>
      </div>

      <div className="posts-tab-container">
        <button
          className={`posts-tab-button medical ${
            activeTab === "medical" ? "active" : ""
          }`}
          onClick={() => setActiveTab("medical")}
        >
          의료/진료
        </button>
        <button
          className={`posts-tab-button cosmetic ${
            activeTab === "cosmetic" ? "active" : ""
          }`}
          onClick={() => setActiveTab("cosmetic")}
        >
          미용/성형
        </button>
      </div>

      <div className="posts-list">
        {currentPosts.map((post) => (
          <div key={post.id} className="post-item">
            <h4 className="post-title">{post.title}</h4>

            <div className="post-meta">
              <div className="post-author-info">
                <span>{post.author}</span>
                <span className="mx-1">·</span>
                <span>{post.time}</span>
              </div>

              <div className="post-stats">
                <div className="post-stat">
                  <Eye className="post-stat-icon" />
                  <span>{post.views}</span>
                </div>
                <div className="post-stat">
                  <Heart className="post-stat-icon" />
                  <span>{post.likes}</span>
                </div>
                <div className="post-stat">
                  <MessageCircle className="post-stat-icon" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>

            <div className="post-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className={`post-tag ${activeTab}`}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button className="posts-more-button">
        {activeTab === "medical" ? "의료/진료" : "미용/성형"} 커뮤니티 가기
      </button>
    </div>
  );
};

export default TrendingCommunityPosts;
