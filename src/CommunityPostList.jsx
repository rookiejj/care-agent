import React from "react";
import {
  MessageCircle,
  Heart,
  Eye,
  Image,
  Scissors,
  Stethoscope,
} from "lucide-react";
import { mainCommunityCategories } from "./communityCategoryData";
import "./CommunityPostList.css";

const CommunityPostList = ({ posts, getFormattedDate }) => {
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
        <div
          key={post.id}
          className={`card ${post.type}`}
          style={{ marginBottom: "1rem" }}
        >
          <div className="community-post-header">
            {/* <div className="community-post-category">
              {post.type === "medical" ? (
                <Stethoscope size={16} color="#0ea5e9" />
              ) : (
                <Scissors size={16} color="#e879f9" />
              )}
              <span>{getCategoryLabel(post.category)}</span>
            </div> */}
            <div className="community-post-tags">
              <span className="community-post-tag category">
                #{getCategoryLabel(post.category)}
              </span>

              {post.hospitalInfo && (
                <span className="community-post-tag hospital">
                  #{post.hospitalInfo.name}
                </span>
              )}
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

          <div className="community-post-footer">
            <div className="community-post-stats">
              <span className="community-post-stat">
                <Eye size={16} /> {formatNumber(post.viewCount)}
              </span>
              <span className="community-post-stat">
                <Heart size={14} /> {formatNumber(post.likeCount)}
              </span>
              <span className="community-post-stat">
                <MessageCircle size={14} /> {formatNumber(post.commentCount)}
              </span>
              <span className="community-post-stat">
                {post.images && post.images.length > 0 && (
                  <div className="community-post-image-indicator">
                    <Image size={14} />
                    <span>{post.images.length}</span>
                  </div>
                )}
              </span>
            </div>

            {post.author && (
              <span className="community-post-author">
                {post.author.nickname}
              </span>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default CommunityPostList;
