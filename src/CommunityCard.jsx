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
import "./CommunityCard.css";

const CommunityCard = ({ post, getFormattedDate }) => {
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

  const handleCardClick = () => {
    // 게시글 상세 페이지로 이동
    navigate(`/detail/community/${post.id}`, { state: { post } });
  };

  return (
    <div className="community-card-item" onClick={handleCardClick}>
      <div className="community-card-header">
        <div className="community-card-tags">
          <span className={`community-card-tag category ${post.type}`}>
            #{getCategoryLabel(post.category)}
          </span>

          {post.hospitalInfo && (
            <span className={`community-card-tag hospital ${post.type}`}>
              #{post.hospitalInfo.name}
            </span>
          )}
        </div>
        <span className="community-card-date">
          {getFormattedDate(post.createdAt)}
        </span>
      </div>

      <h3 className="community-card-title">{post.title}</h3>

      {post.content.length > 100 ? (
        <div className="community-card-preview">
          {post.content.substring(0, 100).replace(/\n/g, " ")}...
        </div>
      ) : null}

      <div className="community-card-footer">
        <div className="community-card-stats">
          <span className="community-card-stat">
            <Eye size={16} /> {formatNumber(post.viewCount)}
          </span>
          <span className="community-card-stat">
            <Heart size={14} /> {formatNumber(post.likeCount)}
          </span>
          <span className="community-card-stat">
            <MessageCircle size={14} /> {formatNumber(post.commentCount)}
          </span>
          {post.images && post.images.length > 0 && (
            <span className="community-card-stat">
              <div className="community-card-image-indicator">
                <Image size={14} />
                <span>{post.images.length}</span>
              </div>
            </span>
          )}
        </div>

        {post.author && (
          <span className="community-card-author">{post.author.nickname}</span>
        )}
      </div>
    </div>
  );
};

export default CommunityCard;
