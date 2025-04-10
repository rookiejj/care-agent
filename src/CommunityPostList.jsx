import React from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageCircle,
  Heart,
  Eye,
  Image,
  Scissors,
  Stethoscope,
} from "lucide-react";
import { mainCommunityCategories } from "./communityCategoryData";
import CommunityCard from "./CommunityCard";
import "./CommunityPostList.css";

const CommunityPostList = ({ posts, getFormattedDate }) => {
  const navigate = useNavigate();

  // 숫자 포맷팅 유틸리티 함수
  const formatNumber = (num) => {
    if (num === undefined || num === null) return "0";
    return Number(num).toLocaleString();
  };

  // 카테고리 레이블 가져오기
  const getCategoryLabel = (categoryId) => {
    const category = mainCommunityCategories.find(
      (cat) => cat.id === categoryId
    );
    return category ? category.label : categoryId;
  };

  if (posts.length === 0) {
    return (
      <div className="community-empty-state">
        <MessageCircle size={40} className="community-empty-state-icon" />
        <p className="community-empty-state-message">아직 게시글이 없습니다</p>
        <p className="community-empty-state-submessage">
          첫 게시글을 작성해보세요!
        </p>
      </div>
    );
  }

  return (
    <>
      {posts.map((post) => (
        <CommunityCard
          key={post.id}
          post={post}
          getFormattedDate={getFormattedDate}
        />
      ))}
    </>
  );
};

export default CommunityPostList;
