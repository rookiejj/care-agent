import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "./App";
import { Send } from "lucide-react";
import "./CommunityDetailPage.css";

const CommunityDetailPage = ({ currentLocation }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");

  const post = location.state?.post;

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      // 댓글 제출 로직
      console.log("댓글 제출:", comment);
      setComment("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

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
          <p>게시글 내용</p>
        </div>
      </div>
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
              placeholder="댓글을 입력하세요..."
              className="comment-input"
            />
            <button
              type="submit"
              className="comment-submit-button"
              aria-label="댓글 작성"
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
