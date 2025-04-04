import React, { useState } from "react";
import { useData } from "./DataContext";
import { PageHeader } from "./App";
import CategoryFilterButtons from "./CategoryFilterButtons";
import {
  MessageCircle,
  Heart,
  Edit,
  Star,
  Calendar,
  Scissors,
  Stethoscope,
  Eye,
  Image,
} from "lucide-react";
import "./CommunityPage.css";
import { mainCommunityCategories } from "./communityCategoryData";

const CommunityPage = ({ currentLocation, notificationCount }) => {
  const { communityPosts } = useData(); // 데이터 컨텍스트에서 커뮤니티 게시글 가져오기
  const [filters, setFilters] = useState({ medical: true, cosmetic: true });

  // 정렬 옵션
  const sortOptions = [
    { id: "latest", label: "최신순", icon: <Calendar size={16} /> },
    { id: "popular", label: "인기순", icon: <Star size={16} /> },
    { id: "comments", label: "댓글순", icon: <MessageCircle size={16} /> },
  ];
  const [activeSortOption, setActiveSortOption] = useState("latest");

  // 필터링 로직
  const filteredPosts = communityPosts.filter((post) => {
    if (filters.medical && filters.cosmetic) return true;
    if (filters.medical && post.type === "medical") return true;
    if (filters.cosmetic && post.type === "cosmetic") return true;
    return false;
  });

  // 정렬 로직
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (activeSortOption === "latest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (activeSortOption === "popular") {
      return b.likeCount - a.likeCount;
    } else if (activeSortOption === "comments") {
      return b.commentCount - a.commentCount;
    }
    return 0;
  });

  const handleCreatePost = () => {
    alert("글쓰기 페이지로 이동");
  };

  const getCategoryLabel = (categoryId) => {
    const category = mainCommunityCategories.find(
      (cat) => cat.id === categoryId
    );
    return category ? category.label : categoryId;
  };

  const getFormattedDate = (dateString) => {
    const postDate = new Date(dateString);
    const now = new Date();

    const diffMs = now - postDate;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins}분 전`;
    } else if (diffHours < 24) {
      return `${diffHours}시간 전`;
    } else if (diffDays < 7) {
      return `${diffDays}일 전`;
    } else {
      return `${postDate.getMonth() + 1}월 ${postDate.getDate()}일`;
    }
  };

  // 태그 처리 함수
  const getDisplayTags = (tags) => {
    if (!tags || tags.length === 0) return [];

    // 주요 태그 최대 2개 추출
    const filteredTags = tags.slice(0, 2).map((tag) => {
      // tag-xxx 형식에서 xxx 부분만 추출
      const parts = tag.split("-");
      return parts.length > 1 ? parts[parts.length - 1] : tag;
    });

    return filteredTags;
  };

  // 숫자 포맷팅 유틸리티 함수
  const formatNumber = (num) => {
    if (num === undefined || num === null) return "0";
    return Number(num).toLocaleString();
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
        {sortedPosts.length === 0 ? (
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
          sortedPosts.map((post) => (
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
                  <span>{getCategoryLabel(post.category)}</span>
                </div>
                <span className="community-post-date">
                  {getFormattedDate(post.createdAt)}
                </span>
              </div>

              <h3 className="community-post-title">{post.title}</h3>

              {post.content.length > 100 ? (
                <div className="community-post-preview">
                  {post.content.substring(0, 100).replace(/\n/g, " ")}...
                </div>
              ) : null}

              {post.images && post.images.length > 0 && (
                <div className="community-post-image-indicator">
                  <Image size={14} />
                  <span>{post.images.length}</span>
                </div>
              )}

              <div className="community-post-footer">
                <div className="community-post-stats">
                  <span className="community-post-stat">
                    <Eye size={16} /> {formatNumber(post.viewCount)}
                  </span>
                  <span className="community-post-stat">
                    <Heart size={16} /> {formatNumber(post.likeCount)}
                  </span>
                  <span className="community-post-stat">
                    <MessageCircle size={16} />{" "}
                    {formatNumber(post.commentCount)}
                  </span>
                </div>

                {post.author && (
                  <span className="community-post-author">
                    {post.author.nickname}
                  </span>
                )}
              </div>

              <div className="community-post-tags">
                {getDisplayTags(post.tags).map((tag) => (
                  <span key={tag} className="community-post-tag">
                    #{tag}
                  </span>
                ))}
                {post.hospitalInfo && (
                  <span className="community-post-tag hospital">
                    {post.hospitalInfo.name}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommunityPage;
