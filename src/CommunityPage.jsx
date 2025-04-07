import React, { useState } from "react";
import { useData } from "./DataContext";
import { PageHeader } from "./App";
import CategoryFilterButtons from "./CategoryFilterButtons";
import CommunityPostList from "./CommunityPostList";
import OptionFilterButtons from "./OptionFilterButtons";
import {
  communitySortOptions,
  mainCommunityCategories,
} from "./communityCategoryData";
import {
  MessageCircle,
  Edit,
  Star,
  Calendar,
  Scissors,
  Stethoscope,
} from "lucide-react";
import "./CommunityPage.css";

const CommunityPage = ({ currentLocation, notificationCount }) => {
  const { communityPosts } = useData();
  const [filters, setFilters] = useState({ medical: true, cosmetic: true });
  const [activeFilterOption, setActiveFilterOption] = useState("latest");

  // 통합 필터 옵션 - 정렬 + 카테고리 필터
  const combinedFilterOptions = [
    // 정렬 옵션
    { id: "latest", label: "최신순" },
    { id: "popular", label: "인기순" },
    { id: "comments", label: "댓글순" },

    // 카테고리 필터 옵션 ("전체" 옵션 제외)
    ...mainCommunityCategories.map((category) => ({
      id: category.id,
      label: category.label,
    })),
  ];

  // 의료/미용 타입 필터링 로직
  const typeFilteredPosts = communityPosts.filter((post) => {
    if (filters.medical && filters.cosmetic) return true;
    if (filters.medical && post.type === "medical") return true;
    if (filters.cosmetic && post.type === "cosmetic") return true;
    return false;
  });

  // 통합 필터링 및 정렬 로직
  const filteredAndSortedPosts = [...typeFilteredPosts]
    .filter((post) => {
      // 카테고리 필터링
      if (["latest", "popular", "comments"].includes(activeFilterOption)) {
        return true; // 정렬 옵션인 경우 필터링 없음
      } else {
        return post.category === activeFilterOption; // 특정 카테고리 필터링
      }
    })
    .sort((a, b) => {
      // 정렬 로직
      if (
        activeFilterOption === "latest" ||
        !["latest", "popular", "comments"].includes(activeFilterOption)
      ) {
        return new Date(b.createdAt) - new Date(a.createdAt); // 기본 정렬은 최신순
      } else if (activeFilterOption === "popular") {
        return b.likeCount - a.likeCount; // 인기순 정렬
      } else if (activeFilterOption === "comments") {
        return b.commentCount - a.commentCount; // 댓글순 정렬
      }
      return 0;
    });

  const handleCreatePost = () => {
    alert("글쓰기 페이지로 이동");
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

  // 필터 옵션 변경 핸들러
  const handleFilterOptionChange = (newFilter) => {
    setActiveFilterOption(newFilter);
  };

  return (
    <div className="container">
      <div className="fixed-header">
        <PageHeader
          title="커뮤니티"
          backButtonVisible={false}
          notificationCount={notificationCount}
          showNotification={true}
          // rightComponent={
          //   <button
          //     onClick={handleCreatePost}
          //     className="community-write-button"
          //   >
          //     <Edit size={18} /> 글쓰기
          //   </button>
          // }
        />

        {/* 고정된 필터 영역 */}
        <div className="header-function">
          {/* 카테고리 필터 버튼 (의료/미용) */}
          <CategoryFilterButtons
            onFilterChange={(newFilters) => setFilters(newFilters)}
          />

          {/* 통합 필터 옵션 (정렬 + 카테고리) */}
          <OptionFilterButtons
            onFilterChange={handleFilterOptionChange}
            initialFilter={activeFilterOption}
            filterOptions={combinedFilterOptions}
          />
        </div>
      </div>

      <div className="content">
        {/* 커뮤니티 게시글 목록 */}
        <CommunityPostList
          posts={filteredAndSortedPosts}
          getFormattedDate={getFormattedDate}
        />
      </div>
    </div>
  );
};

export default CommunityPage;
