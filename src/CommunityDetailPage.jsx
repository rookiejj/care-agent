import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { PageHeader, getProfileImage } from "./App";
import { useData } from "./DataContext";
import {
  MessageCircle,
  Heart,
  Eye,
  Share2,
  Send,
  MoreVertical,
  Clock,
  AlertTriangle,
  Copy,
} from "lucide-react";
import { mainCommunityCategories } from "./communityCategoryData";
import { getSubSpecialtyKoreanName } from "./medicalCategoryData";
import "./CommunityDetailPage.css";

const CommunityDetailPage = ({ currentLocation }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, id } = useParams();
  const { communityPosts } = useData();

  const [comment, setComment] = useState("");
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showImagesModal, setShowImagesModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  useEffect(() => {
    // URL에서 가져온 ID와 일치하는 게시글을 찾거나 location.state에서 게시글 정보를 가져옴
    let currentPost = location.state?.post;

    if (!currentPost && communityPosts.length > 0) {
      currentPost = communityPosts.find(
        (p) => p.id === parseInt(id) || p.id === id
      );
    }

    if (currentPost) {
      setPost(currentPost);
      setLikeCount(currentPost.likeCount || 0);

      // 댓글 데이터 가져오기
      if (currentPost.comments && currentPost.comments.length > 0) {
        setComments(currentPost.comments);
      } else {
        // 더미 댓글 데이터 생성
        const dummyComments = generateDummyComments(
          currentPost.id,
          currentPost.commentCount || 3
        );
        setComments(dummyComments);
      }
    }
  }, [location.state, id, communityPosts]);

  // 지정된 수의 더미 댓글을 생성하는 함수
  const generateDummyComments = (postId, count = 3) => {
    const userNames = ["사용자1", "슈퍼맨임", "미용왕", "성형고수", "피부좋아"];
    const profileImages = [getProfileImage()];
    const commentTexts = [
      "정말 좋은 정보 감사합니다! 저도 비슷한 경험이 있어요.",
      "어느 병원에서 받으셨어요? 저도 고민 중인데 추천해주실 수 있나요?",
      "효과가 얼마나 지속되나요? 부작용은 없었는지 궁금해요.",
      "가격대가 어떻게 되나요? 가능하면 알려주세요!",
      "사진 좀 더 올려주실 수 있나요? 비포애프터가 궁금합니다.",
      "선생님이 친절하셨나요? 상담은 어떻게 진행되었어요?",
      "통증은 어느 정도였나요? 견딜만 했나요?",
      "회복 기간은 얼마나 걸렸어요? 일상생활하는데 불편함은 없었나요?",
      "저도 다음 주에 예약했어요! 팁 있으면 알려주세요.",
      "혹시 다른 곳과 비교해보셨나요? 왜 그곳을 선택하셨어요?",
    ];

    const dummyComments = [];
    const replyTexts = [
      "네 감사합니다. 더 궁금한 점 있으시면 물어보세요!",
      "안녕하세요, 제가 방문한 곳은 강남 미소성형외과에요. 의사선생님이 친절하고 시설도 깨끗했어요.",
      "약 3개월 정도 효과가 지속되었고, 부작용은 특별히 없었어요.",
      "가격은 시술 종류에 따라 다른데, 제가 받은 건 30만원 정도였어요.",
      "네, 나중에 추가 사진 올려드릴게요!",
    ];

    // 메인 댓글 생성
    for (let i = 0; i < count; i++) {
      const randomUserIndex = Math.floor(Math.random() * userNames.length);
      const randomCommentIndex = Math.floor(
        Math.random() * commentTexts.length
      );
      const randomDaysAgo = Math.floor(Math.random() * 7) + 1;

      const createdDate = new Date();
      createdDate.setDate(createdDate.getDate() - randomDaysAgo);

      dummyComments.push({
        id: `comment-${postId}-${i}`,
        author: {
          id: `user-${randomUserIndex}`,
          nickname: userNames[randomUserIndex],
          profileImage: profileImages[0],
          level: Math.floor(Math.random() * 4) + 1,
        },
        content: commentTexts[randomCommentIndex],
        createdAt: createdDate.toISOString(),
        likeCount: Math.floor(Math.random() * 10),
        isLiked: Math.random() > 0.7,
        isReply: false,
      });
    }

    // 랜덤하게 1-2개의 답글 추가
    const replyCount = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < replyCount; i++) {
      if (dummyComments.length > i) {
        const randomReplyIndex = Math.floor(Math.random() * replyTexts.length);
        const replyCreatedDate = new Date(dummyComments[i].createdAt);
        replyCreatedDate.setHours(replyCreatedDate.getHours() + 2); // 원 댓글 2시간 후

        dummyComments.push({
          id: `reply-${postId}-${i}`,
          author: {
            id: "post-author",
            nickname: post?.author?.nickname || "글쓴이",
            profileImage: post?.author?.profileImage || profileImages[0],
            level: post?.author?.level || 3,
            isAuthor: true,
          },
          content: replyTexts[randomReplyIndex],
          createdAt: replyCreatedDate.toISOString(),
          likeCount: Math.floor(Math.random() * 5),
          isLiked: Math.random() > 0.7,
          isReply: true,
          parentCommentId: dummyComments[i].id,
        });
      }
    }

    // 날짜순으로 정렬 (최신순)
    return dummyComments.sort((a, b) => {
      // 답글은 부모 댓글 바로 다음에 표시
      if (a.parentCommentId === b.id) return 1;
      if (b.parentCommentId === a.id) return -1;

      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const newComment = {
        id: `comment-${post.id}-${comments.length + 1}`,
        author: {
          id: "current-user",
          nickname: "나",
          profileImage: "/images/profile.png",
        },
        content: comment,
        createdAt: new Date().toISOString(),
        likeCount: 0,
      };

      setComments([newComment, ...comments]);
      setComment("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleShare = () => {
    // 공유 기능 구현
    try {
      const url = window.location.href;
      navigator.clipboard.writeText(url);

      // 툴팁 표시
      setShowShareTooltip(true);
      setTimeout(() => {
        setShowShareTooltip(false);
      }, 2000);
    } catch (err) {
      alert("링크 복사에 실패했습니다.");
    }
  };

  const formatTimeAgo = (dateString) => {
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

  // 카테고리 레이블 가져오기
  const getCategoryLabel = (categoryId) => {
    const category = mainCommunityCategories.find(
      (cat) => cat.id === categoryId
    );
    return category ? category.label : categoryId;
  };

  // 숫자 포맷팅 유틸리티 함수
  const formatNumber = (num) => {
    if (num === undefined || num === null) return "0";
    return Number(num).toLocaleString();
  };

  // 이미지 모달 열기
  const openImageModal = (index) => {
    setCurrentImageIndex(index);
    setShowImagesModal(true);
  };

  // 게시글 신고하기
  const handleReport = () => {
    setShowActionsMenu(false);
    alert("게시글이 신고되었습니다.");
  };

  if (!post) {
    return (
      <div className="container">
        <div className="fixed-header">
          <PageHeader
            title={"게시글 상세"}
            currentLocation={currentLocation}
            backButtonVisible={true}
            onBack={() => navigate(-1)}
          />
        </div>
        <div className="detail-page-content">
          <div className="no-detail-info">
            <p>게시글을 불러오는 중입니다...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="fixed-header">
        <PageHeader
          title={"게시글 상세"}
          currentLocation={currentLocation}
          backButtonVisible={true}
          onBack={() => navigate(-1)}
          rightComponent={
            <button
              className="community-more-button"
              onClick={() => setShowActionsMenu(!showActionsMenu)}
            >
              <MoreVertical size={20} color="#666" />
            </button>
          }
        />

        {/* 액션 메뉴 (신고하기 등) */}
        {showActionsMenu && (
          <div className="community-actions-menu">
            <button className="community-action-item" onClick={handleReport}>
              <AlertTriangle size={16} />
              <span>게시글 신고</span>
            </button>
          </div>
        )}
      </div>

      <div className="community-detail-content">
        {/* 게시글 헤더 */}
        <div className="community-detail-header">
          <div className="community-detail-tag-container">
            <span
              className={`community-detail-tag category ${
                post.type || "medical"
              }`}
            >
              #{getCategoryLabel(post.category)}
            </span>

            {post.hospitalInfo && (
              <span
                className={`community-detail-tag hospital ${
                  post.type || "medical"
                }`}
              >
                #{post.hospitalInfo.name}
              </span>
            )}

            {post.tags &&
              post.tags.length > 0 &&
              post.tags.map((tag, index) => (
                <span key={index} className="community-detail-tag tag">
                  #{getSubSpecialtyKoreanName(tag)}
                </span>
              ))}
          </div>
          <div className="community-detail-meta">
            <h1 className="community-detail-title">{post.title}</h1>

            <div className="community-detail-info">
              <div className="community-detail-author">
                <div className="community-detail-avatar">
                  {post.author?.profileImage ? (
                    <img
                      src={post.author.profileImage}
                      alt={post.author.nickname}
                    />
                  ) : (
                    <img
                      src={getProfileImage()}
                      alt={post.author?.nickname || "익명"}
                    />
                  )}
                </div>
                <div className="community-detail-author-info">
                  <span className="community-detail-author-name">
                    {post.author?.nickname || "익명"}
                  </span>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                    }}
                  >
                    {post.author?.level && (
                      <span className="community-detail-author-level">
                        Lv.{post.author.level}
                      </span>
                    )}
                    {post.author?.badges && post.author.badges.length > 0 && (
                      <span className="community-detail-author-badge">
                        {post.author.badges[0]}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="community-detail-date">
                <Clock size={14} />
                <span>{formatTimeAgo(post.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 게시글 본문 */}
        <div className="community-detail-body">
          <div
            className="community-detail-text"
            dangerouslySetInnerHTML={{
              __html: post.content.replace(/\n/g, "<br/>"),
            }}
          ></div>

          {/* 이미지 갤러리 */}
          {post.images && post.images.length > 0 && (
            <div className="community-detail-images">
              {post.images.map((image, index) => (
                <div
                  key={index}
                  className="community-detail-image"
                  onClick={() => openImageModal(index)}
                >
                  <img src={image} alt={`${post.title} 이미지 ${index + 1}`} />
                </div>
              ))}
            </div>
          )}

          {/* 이미지 모달 */}
          {showImagesModal && (
            <div
              className="community-image-modal"
              onClick={() => setShowImagesModal(false)}
            >
              <div className="community-image-modal-content">
                <button className="community-image-modal-close">×</button>
                <img
                  src={post.images[currentImageIndex]}
                  alt={`${post.title} 이미지 확대`}
                />
                <div className="community-image-modal-counter">
                  {currentImageIndex + 1} / {post.images.length}
                </div>
              </div>
            </div>
          )}

          {/* 게시글 통계 및 액션 */}
          <div className="community-detail-stats">
            <div className="community-detail-stats-left">
              <div className="community-detail-stat">
                <Eye size={16} />
                <span>{formatNumber(post.viewCount || 0)}</span>
              </div>
              <div className="community-detail-stat">
                <MessageCircle size={16} />
                <span>{formatNumber(comments.length)}</span>
              </div>
            </div>

            <div className="community-detail-actions">
              <button
                className={`community-detail-action ${isLiked ? "active" : ""}`}
                onClick={handleLikeToggle}
              >
                <Heart
                  size={20}
                  fill={isLiked ? "#ff4757" : "none"}
                  color={isLiked ? "#ff4757" : "#666"}
                />
                <span>{formatNumber(likeCount)}</span>
              </button>

              <div className="community-detail-share-wrapper">
                <button
                  className="community-detail-action"
                  onClick={handleShare}
                >
                  <Share2 size={20} color="#666" />
                </button>
                {showShareTooltip && (
                  <div className="community-detail-share-tooltip">
                    <Copy size={14} />
                    <span>링크가 복사되었습니다</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 댓글 섹션 */}
        <div className="community-detail-comments">
          <div className="community-detail-comments-header">
            <h3>댓글 {formatNumber(comments.length)}개</h3>
          </div>

          {/* 댓글 목록 */}
          <div className="community-detail-comments-list">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className={`community-comment-item ${
                  comment.isReply ? "comment-reply" : ""
                }`}
              >
                <div className="community-comment-avatar">
                  {comment.author?.profileImage ? (
                    <img
                      src={comment.author.profileImage}
                      alt={comment.author.nickname}
                    />
                  ) : (
                    <img
                      src={getProfileImage()}
                      alt={comment.author.nickname}
                    />
                  )}
                </div>

                <div className="community-comment-content">
                  <div className="community-comment-header">
                    <div className="community-comment-author-info">
                      <span className="community-comment-author">
                        {comment.author.nickname}
                      </span>
                      {comment.author.level && (
                        <span className="community-comment-author-level">
                          Lv.{comment.author.level}
                        </span>
                      )}
                    </div>
                    <span className="community-comment-date">
                      {formatTimeAgo(comment.createdAt)}
                    </span>
                  </div>

                  <p className="community-comment-text">{comment.content}</p>

                  <div className="community-comment-actions">
                    <button className="community-comment-like">
                      <Heart
                        size={14}
                        fill={comment.isLiked ? "#ff4757" : "none"}
                        color={comment.isLiked ? "#ff4757" : "#9ca3af"}
                      />
                      <span>{comment.likeCount}</span>
                    </button>

                    {!comment.isReply && (
                      <button className="community-comment-reply-button">
                        <MessageCircle size={14} />
                        <span>답글</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 댓글 입력창 (하단 고정) */}
      <div className="detail-page-footer">
        <div className="comment-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommentSubmit();
            }}
            style={{ display: "flex", width: "100%" }}
          >
            <input
              type="text"
              value={comment}
              onChange={handleCommentChange}
              onKeyDown={handleKeyDown}
              placeholder="댓글을 입력하세요..."
              className="comment-input"
            />
            <button
              type="submit"
              className="comment-submit-button"
              aria-label="댓글 작성"
              disabled={!comment.trim()}
            >
              <Send
                size={20}
                strokeWidth={2}
                color={comment.trim() ? "#2196f3" : "#9ca3af"}
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetailPage;
