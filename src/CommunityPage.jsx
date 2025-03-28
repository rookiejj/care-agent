import React, { useState } from "react";
import { PageHeader, getHospitalImage } from "./App";
import CategoryFilterButtons from "./CategoryFilterButtons";
import {
  MessageCircle,
  Heart,
  Edit,
  Star,
  Calendar,
  Scissors,
  Stethoscope,
} from "lucide-react";
import "./CommunityPage.css";

const CommunityPage = ({ currentLocation, notificationCount }) => {
  const [filters, setFilters] = useState({ medical: true, cosmetic: true });

  // 정렬 옵션
  const sortOptions = [
    { id: "latest", label: "최신순", icon: <Calendar size={16} /> },
    { id: "popular", label: "인기순", icon: <Star size={16} /> },
    { id: "comments", label: "댓글순", icon: <MessageCircle size={16} /> },
  ];
  const [activeSortOption, setActiveSortOption] = useState("latest");

  // 커뮤니티 게시글 데이터
  const communityPosts = [
    {
      id: 1,
      type: "medical",
      title: "무릎 관절 치료 후기",
      author: "건강한사람",
      category: "정형외과",
      likes: 42,
      comments: 12,
      date: "1일 전",
      hospital: "김연아 정형외과",
      tags: ["관절", "통증", "치료"],
    },
    {
      id: 2,
      type: "cosmetic",
      title: "쌍꺼풀 수술 1개월 후기",
      author: "미모닝",
      category: "눈 성형",
      likes: 87,
      comments: 24,
      date: "3일 전",
      hospital: "라인 성형외과",
      tags: ["쌍꺼풀", "성형", "회복"],
    },
    {
      id: 3,
      type: "medical",
      title: "당뇨 관리 팁 공유합니다",
      author: "건강지기",
      category: "내과",
      likes: 35,
      comments: 8,
      date: "4일 전",
      hospital: "서울 연세 내과",
      tags: ["당뇨", "건강관리", "식단"],
    },
    {
      id: 4,
      type: "cosmetic",
      title: "지방이식 상담 고민 중입니다",
      author: "미의추구",
      category: "안면윤곽",
      likes: 29,
      comments: 17,
      date: "5일 전",
      hospital: "뷰티 클리닉 센터",
      tags: ["지방이식", "상담", "성형"],
    },
    {
      id: 5,
      type: "cosmetic",
      title: "쌍꺼풀 수술 1개월 후기",
      author: "미모닝",
      category: "눈 성형",
      likes: 87,
      comments: 24,
      date: "3일 전",
      hospital: "라인 성형외과",
      tags: ["쌍꺼풀", "성형", "회복"],
    },
  ];

  // 필터링 로직
  const filteredPosts = communityPosts.filter((post) => {
    if (filters.medical && filters.cosmetic) return true;
    if (filters.medical && post.type === "medical") return true;
    if (filters.cosmetic && post.type === "cosmetic") return true;
    return false;
  });

  const handleCreatePost = () => {
    alert("글쓰기 페이지로 이동");
  };

  return (
    <div className="container">
      <PageHeader
        title="커뮤니티"
        showLocationButton={true}
        currentLocation={currentLocation}
        backButtonVisible={false}
        notificationCount={notificationCount}
        showNotification={true}
        rightComponent={
          <button onClick={handleCreatePost} className="community-write-button">
            <Edit size={18} /> 글쓰기
          </button>
        }
      />

      <div className="content">
        {/* 카테고리 필터 버튼 */}
        <CategoryFilterButtons
          onFilterChange={(newFilters) => setFilters(newFilters)}
        />

        {/* 정렬 옵션 */}
        <div className="sort-options-container">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setActiveSortOption(option.id)}
              className={`sort-option-button ${
                activeSortOption === option.id ? "active" : ""
              }`}
            >
              {option.icon}
              {option.label}
            </button>
          ))}
        </div>

        {/* 커뮤니티 게시글 목록 */}
        {filteredPosts.length === 0 ? (
          <div className="community-empty-state">
            <MessageCircle size={40} className="community-empty-state-icon" />
            <p className="community-empty-state-message">
              아직 게시글이 없습니다
            </p>
            <p className="community-empty-state-submessage">
              첫 게시글을 작성해보세요!
            </p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="card"
              style={{ marginBottom: "1rem" }}
            >
              <div className="community-post-header">
                <div className="community-post-category">
                  {post.type === "medical" ? (
                    <Stethoscope size={16} color="#0ea5e9" />
                  ) : (
                    <Scissors size={16} color="#e879f9" />
                  )}
                  <span>{post.category}</span>
                </div>
                <span className="community-post-date">{post.date}</span>
              </div>

              <h3 className="community-post-title">{post.title}</h3>

              <div className="community-post-footer">
                <div className="community-post-stats">
                  <span className="community-post-stat">
                    <Heart size={16} /> {post.likes}
                  </span>
                  <span className="community-post-stat">
                    <MessageCircle size={16} /> {post.comments}
                  </span>
                </div>

                <span className="community-post-hospital">{post.hospital}</span>
              </div>

              <div className="community-post-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="community-post-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommunityPage;
