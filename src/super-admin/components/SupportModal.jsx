import React, { useState } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  Building2,
  Calendar,
  Clock,
  Send,
  Paperclip,
  Image,
  MessageSquare,
  HeadphonesIcon,
  Flag,
  UserCheck,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Activity,
  Eye,
  EyeOff,
  Download,
  Star,
  Stethoscope,
} from "lucide-react";
import "./SupportModal.css";

const SupportModal = ({
  inquiry,
  onClose,
  onStatusChange,
  onAssign,
  onAddReply,
  assignees,
  formatDate,
  getTimeAgo,
  renderStatusBadge,
  renderPriorityBadge,
  renderCategoryBadge,
  renderUserTypeIcon,
}) => {
  const [activeTab, setActiveTab] = useState("conversation");
  const [replyMessage, setReplyMessage] = useState("");
  const [isInternalNote, setIsInternalNote] = useState(false);
  const [showAssignMenu, setShowAssignMenu] = useState(false);

  const handleSendReply = () => {
    if (replyMessage.trim()) {
      onAddReply(inquiry.id, replyMessage, isInternalNote);
      setReplyMessage("");
    }
  };

  const handleStatusChange = (newStatus) => {
    onStatusChange(inquiry.id, newStatus);
  };

  const handleAssign = (assignee) => {
    onAssign(inquiry.id, assignee);
    setShowAssignMenu(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "긴급":
        return "#dc2626";
      case "높음":
        return "#f59e0b";
      case "보통":
        return "#10b981";
      case "낮음":
        return "#6b7280";
      default:
        return "#6b7280";
    }
  };

  const getStatusOptions = () => {
    const currentStatus = inquiry.status;
    const allStatuses = ["접수", "처리중", "해결", "종료", "에스컬레이션"];
    return allStatuses.filter((status) => status !== currentStatus);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="support-modal" onClick={(e) => e.stopPropagation()}>
        {/* 모달 헤더 */}
        <div className="support-modal-header">
          <div className="support-modal-header-left">
            <div className="support-modal-title-section">
              <h2 className="support-modal-title">{inquiry.title}</h2>
              <div className="support-modal-subtitle">
                {inquiry.inquiryId} • {formatDate(inquiry.createdAt)}
              </div>
            </div>
          </div>
          <div className="support-modal-header-right">
            <div className="support-modal-badges">
              {renderStatusBadge(inquiry.status)}
              {renderPriorityBadge(inquiry.priority)}
              {renderCategoryBadge(inquiry.category)}
            </div>
            <button className="modal-close-button" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="support-modal-tabs">
          <button
            className={`support-modal-tab ${
              activeTab === "conversation" ? "active" : ""
            }`}
            onClick={() => setActiveTab("conversation")}
          >
            <MessageSquare size={16} />
            대화
          </button>
          <button
            className={`support-modal-tab ${
              activeTab === "details" ? "active" : ""
            }`}
            onClick={() => setActiveTab("details")}
          >
            <User size={16} />
            상세 정보
          </button>
          <button
            className={`support-modal-tab ${
              activeTab === "history" ? "active" : ""
            }`}
            onClick={() => setActiveTab("history")}
          >
            <Clock size={16} />
            처리 기록
          </button>
        </div>

        {/* 탭 컨텐츠 */}
        <div className="support-modal-content">
          {activeTab === "conversation" && (
            <div className="support-conversation-tab">
              {/* 문의자 정보 요약 */}
              <div className="support-customer-summary">
                <div className="support-customer-avatar-section">
                  <div
                    className="support-customer-avatar-large"
                    style={{ backgroundColor: inquiry.avatar.color }}
                  >
                    {inquiry.avatar.initials}
                  </div>
                  {renderUserTypeIcon(inquiry.userType)}
                </div>
                <div className="support-customer-info-section">
                  <h3 className="support-customer-name-large">
                    {inquiry.customerName}
                  </h3>
                  <p className="support-customer-role-large">
                    {inquiry.userRole}
                  </p>
                  {inquiry.hospitalName && (
                    <p className="support-customer-hospital">
                      <Building2 size={14} />
                      {inquiry.hospitalName}
                    </p>
                  )}
                  <div className="support-customer-contacts">
                    <span className="support-customer-contact-item">
                      <Mail size={12} />
                      {inquiry.customerEmail}
                    </span>
                    <span className="support-customer-contact-item">
                      <Phone size={12} />
                      {inquiry.customerPhone}
                    </span>
                  </div>
                </div>
                <div className="support-customer-actions">
                  <div className="support-status-controls">
                    <label className="support-control-label">상태 변경</label>
                    <select
                      value={inquiry.status}
                      onChange={(e) => handleStatusChange(e.target.value)}
                      className="support-status-select"
                    >
                      <option value={inquiry.status}>{inquiry.status}</option>
                      {getStatusOptions().map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="support-assign-controls">
                    <label className="support-control-label">담당자</label>
                    <div className="support-assign-wrapper">
                      <button
                        className="support-assign-button"
                        onClick={() => setShowAssignMenu(!showAssignMenu)}
                      >
                        <UserCheck size={16} />
                        {inquiry.assignedTo || "미배정"}
                      </button>
                      {showAssignMenu && (
                        <div className="support-assign-menu">
                          {assignees.map((assignee) => (
                            <button
                              key={assignee}
                              className="support-assign-menu-item"
                              onClick={() => handleAssign(assignee)}
                            >
                              {assignee}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 문의 내용 */}
              <div className="support-inquiry-content">
                <h4 className="support-content-title">문의 내용</h4>
                <div className="support-content-description">
                  {inquiry.description}
                </div>
                {inquiry.attachments.length > 0 && (
                  <div className="support-content-attachments">
                    <h5 className="support-attachments-title">첨부파일</h5>
                    <div className="support-attachments-list">
                      {inquiry.attachments.map((attachment, index) => (
                        <div key={index} className="support-attachment-item">
                          <div className="support-attachment-icon">
                            {attachment.type === "image" ? (
                              <Image size={16} />
                            ) : (
                              <Paperclip size={16} />
                            )}
                          </div>
                          <div className="support-attachment-info">
                            <span className="support-attachment-name">
                              {attachment.name}
                            </span>
                            <span className="support-attachment-size">
                              {(attachment.size / 1024).toFixed(1)}KB
                            </span>
                          </div>
                          <button className="support-attachment-download">
                            <Download size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 메시지 스레드 */}
              <div className="support-message-thread">
                <h4 className="support-thread-title">
                  대화 내역 ({inquiry.messages.length}개 메시지)
                </h4>
                <div className="support-messages-container">
                  {inquiry.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`support-message-item ${
                        message.sender === "customer" ? "customer" : "agent"
                      } ${message.isInternal ? "internal" : ""}`}
                    >
                      <div className="support-message-avatar">
                        {message.sender === "customer" ? (
                          <div
                            className="support-message-customer-avatar"
                            style={{ backgroundColor: inquiry.avatar.color }}
                          >
                            {inquiry.avatar.initials}
                          </div>
                        ) : (
                          <div className="support-message-agent-avatar">
                            <HeadphonesIcon size={16} />
                          </div>
                        )}
                      </div>
                      <div className="support-message-content">
                        <div className="support-message-header">
                          <span className="support-message-sender">
                            {message.sender === "customer"
                              ? inquiry.customerName
                              : "상담원"}
                          </span>
                          {message.isInternal && (
                            <span className="support-message-internal-badge">
                              <EyeOff size={12} />
                              내부 메모
                            </span>
                          )}
                          <span className="support-message-time">
                            {getTimeAgo(message.timestamp)}
                          </span>
                        </div>
                        <div className="support-message-text">
                          {message.content}
                        </div>
                        {message.attachments &&
                          message.attachments.length > 0 && (
                            <div className="support-message-attachments">
                              {message.attachments.map((attachment, index) => (
                                <div
                                  key={index}
                                  className="support-message-attachment"
                                >
                                  <Paperclip size={12} />
                                  {attachment.name}
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 답변 작성 */}
              <div className="support-reply-section">
                <div className="support-reply-header">
                  <h4 className="support-reply-title">답변 작성</h4>
                  <div className="support-reply-options">
                    <label className="support-reply-option">
                      <input
                        type="checkbox"
                        checked={isInternalNote}
                        onChange={(e) => setIsInternalNote(e.target.checked)}
                      />
                      <span className="support-reply-option-label">
                        <EyeOff size={14} />
                        내부 메모
                      </span>
                    </label>
                  </div>
                </div>
                <div className="support-reply-input-section">
                  <textarea
                    className="support-reply-textarea"
                    placeholder={
                      isInternalNote
                        ? "내부 메모를 작성하세요..."
                        : "고객에게 보낼 답변을 작성하세요..."
                    }
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    rows={4}
                  />
                  <div className="support-reply-actions">
                    <div className="support-reply-tools">
                      <button className="support-reply-tool-button">
                        <Paperclip size={16} />
                        첨부
                      </button>
                      <button className="support-reply-tool-button">
                        <Image size={16} />
                        이미지
                      </button>
                    </div>
                    <div className="support-reply-buttons">
                      <button
                        className="support-reply-send-button"
                        onClick={handleSendReply}
                        disabled={!replyMessage.trim()}
                      >
                        <Send size={16} />
                        {isInternalNote ? "메모 저장" : "답변 전송"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "details" && (
            <div className="support-details-tab">
              <div className="support-details-grid">
                <div className="support-details-section">
                  <h4 className="support-details-section-title">문의 정보</h4>
                  <div className="support-details-list">
                    <div className="support-details-item">
                      <label>문의 ID</label>
                      <span>{inquiry.inquiryId}</span>
                    </div>
                    <div className="support-details-item">
                      <label>카테고리</label>
                      <span>{inquiry.category}</span>
                    </div>
                    <div className="support-details-item">
                      <label>우선순위</label>
                      <span
                        style={{ color: getPriorityColor(inquiry.priority) }}
                      >
                        <Flag size={14} />
                        {inquiry.priority}
                      </span>
                    </div>
                    <div className="support-details-item">
                      <label>상태</label>
                      <span>{inquiry.status}</span>
                    </div>
                    <div className="support-details-item">
                      <label>담당자</label>
                      <span>{inquiry.assignedTo || "미배정"}</span>
                    </div>
                    <div className="support-details-item">
                      <label>응답 시간</label>
                      <span>
                        {inquiry.responseTime
                          ? `${inquiry.responseTime}시간`
                          : "-"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="support-details-section">
                  <h4 className="support-details-section-title">문의자 정보</h4>
                  <div className="support-details-list">
                    <div className="support-details-item">
                      <label>이름</label>
                      <span>{inquiry.customerName}</span>
                    </div>
                    <div className="support-details-item">
                      <label>유형</label>
                      <span>
                        {inquiry.userType === "환자" && <User size={14} />}
                        {inquiry.userType === "병원관리자" && (
                          <Building2 size={14} />
                        )}
                        {inquiry.userType === "의사" && (
                          <Stethoscope size={14} />
                        )}
                        {inquiry.userType} ({inquiry.userRole})
                      </span>
                    </div>
                    <div className="support-details-item">
                      <label>이메일</label>
                      <span>{inquiry.customerEmail}</span>
                    </div>
                    <div className="support-details-item">
                      <label>전화번호</label>
                      <span>{inquiry.customerPhone}</span>
                    </div>
                    {inquiry.hospitalName && (
                      <div className="support-details-item">
                        <label>소속 병원</label>
                        <span>
                          <Building2 size={14} />
                          {inquiry.hospitalName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="support-details-section">
                  <h4 className="support-details-section-title">처리 현황</h4>
                  <div className="support-details-list">
                    <div className="support-details-item">
                      <label>접수일</label>
                      <span>{formatDate(inquiry.createdAt)}</span>
                    </div>
                    <div className="support-details-item">
                      <label>최근 업데이트</label>
                      <span>{formatDate(inquiry.updatedAt)}</span>
                    </div>
                    <div className="support-details-item">
                      <label>메시지 수</label>
                      <span>{inquiry.messages.length}개</span>
                    </div>
                    <div className="support-details-item">
                      <label>첨부파일</label>
                      <span>{inquiry.attachments.length}개</span>
                    </div>
                    {inquiry.satisfactionRating && (
                      <div className="support-details-item">
                        <label>만족도</label>
                        <span className="support-satisfaction-rating">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              fill={
                                i < inquiry.satisfactionRating
                                  ? "#f59e0b"
                                  : "none"
                              }
                              color="#f59e0b"
                            />
                          ))}
                          ({inquiry.satisfactionRating}/5)
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="support-details-section">
                  <h4 className="support-details-section-title">빠른 작업</h4>
                  <div className="support-quick-actions">
                    <button
                      className="support-quick-action-button priority"
                      onClick={() => {
                        /* 우선순위 변경 로직 */
                      }}
                    >
                      <Flag size={16} />
                      우선순위 변경
                    </button>
                    <button
                      className="support-quick-action-button"
                      onClick={() => handleStatusChange("에스컬레이션")}
                    >
                      <AlertTriangle size={16} />
                      에스컬레이션
                    </button>
                    <button
                      className="support-quick-action-button resolved"
                      onClick={() => handleStatusChange("해결")}
                      disabled={
                        inquiry.status === "해결" || inquiry.status === "종료"
                      }
                    >
                      <CheckCircle size={16} />
                      해결 완료
                    </button>
                    <button
                      className="support-quick-action-button closed"
                      onClick={() => handleStatusChange("종료")}
                      disabled={inquiry.status === "종료"}
                    >
                      <XCircle size={16} />
                      문의 종료
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="support-history-tab">
              <div className="support-timeline">
                <h4 className="support-timeline-title">처리 기록</h4>
                <div className="support-timeline-container">
                  <div className="support-timeline-item">
                    <div className="support-timeline-marker created">
                      <MessageSquare size={16} />
                    </div>
                    <div className="support-timeline-content">
                      <div className="support-timeline-header">
                        <span className="support-timeline-action">
                          문의 접수
                        </span>
                        <span className="support-timeline-time">
                          {formatDate(inquiry.createdAt)}
                        </span>
                      </div>
                      <div className="support-timeline-description">
                        {inquiry.customerName}님이 "{inquiry.title}" 문의를
                        접수했습니다.
                      </div>
                    </div>
                  </div>

                  {inquiry.assignedTo && (
                    <div className="support-timeline-item">
                      <div className="support-timeline-marker assigned">
                        <UserCheck size={16} />
                      </div>
                      <div className="support-timeline-content">
                        <div className="support-timeline-header">
                          <span className="support-timeline-action">
                            담당자 배정
                          </span>
                          <span className="support-timeline-time">
                            {getTimeAgo(inquiry.updatedAt)}
                          </span>
                        </div>
                        <div className="support-timeline-description">
                          {inquiry.assignedTo}님에게 배정되었습니다.
                        </div>
                      </div>
                    </div>
                  )}

                  {inquiry.messages
                    .filter((m) => m.sender === "agent")
                    .map((message, index) => (
                      <div key={message.id} className="support-timeline-item">
                        <div
                          className={`support-timeline-marker ${
                            message.isInternal ? "internal" : "replied"
                          }`}
                        >
                          {message.isInternal ? (
                            <EyeOff size={16} />
                          ) : (
                            <HeadphonesIcon size={16} />
                          )}
                        </div>
                        <div className="support-timeline-content">
                          <div className="support-timeline-header">
                            <span className="support-timeline-action">
                              {message.isInternal
                                ? "내부 메모 작성"
                                : "답변 완료"}
                            </span>
                            <span className="support-timeline-time">
                              {formatDate(message.timestamp)}
                            </span>
                          </div>
                          <div className="support-timeline-description">
                            {message.isInternal
                              ? "내부 메모가 작성되었습니다."
                              : "고객에게 답변을 전송했습니다."}
                          </div>
                        </div>
                      </div>
                    ))}

                  {inquiry.status === "해결" && (
                    <div className="support-timeline-item">
                      <div className="support-timeline-marker resolved">
                        <CheckCircle size={16} />
                      </div>
                      <div className="support-timeline-content">
                        <div className="support-timeline-header">
                          <span className="support-timeline-action">
                            문의 해결
                          </span>
                          <span className="support-timeline-time">
                            {formatDate(inquiry.updatedAt)}
                          </span>
                        </div>
                        <div className="support-timeline-description">
                          문의가 해결 완료 처리되었습니다.
                        </div>
                      </div>
                    </div>
                  )}

                  {inquiry.status === "종료" && (
                    <div className="support-timeline-item">
                      <div className="support-timeline-marker closed">
                        <XCircle size={16} />
                      </div>
                      <div className="support-timeline-content">
                        <div className="support-timeline-header">
                          <span className="support-timeline-action">
                            문의 종료
                          </span>
                          <span className="support-timeline-time">
                            {formatDate(inquiry.updatedAt)}
                          </span>
                        </div>
                        <div className="support-timeline-description">
                          문의가 최종 종료되었습니다.
                        </div>
                      </div>
                    </div>
                  )}

                  {inquiry.satisfactionRating && (
                    <div className="support-timeline-item">
                      <div className="support-timeline-marker satisfaction">
                        <Star size={16} />
                      </div>
                      <div className="support-timeline-content">
                        <div className="support-timeline-header">
                          <span className="support-timeline-action">
                            만족도 평가
                          </span>
                          <span className="support-timeline-time">
                            {formatDate(inquiry.updatedAt)}
                          </span>
                        </div>
                        <div className="support-timeline-description">
                          고객이 {inquiry.satisfactionRating}점으로
                          평가했습니다.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 관련 문의 */}
              <div className="support-related-inquiries">
                <h4 className="support-related-title">관련 문의</h4>
                <div className="support-related-list">
                  <div className="support-related-item">
                    <div className="support-related-info">
                      <span className="support-related-id">
                        INQ000{inquiry.id - 1}
                      </span>
                      <span className="support-related-title-text">
                        이전 문의사항
                      </span>
                    </div>
                    <span className="support-related-date">2일 전</span>
                  </div>
                  <div className="support-related-item">
                    <div className="support-related-info">
                      <span className="support-related-id">
                        INQ000{inquiry.id + 5}
                      </span>
                      <span className="support-related-title-text">
                        유사한 문의
                      </span>
                    </div>
                    <span className="support-related-date">1주일 전</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 모달 푸터 */}
        <div className="support-modal-footer">
          <div className="support-modal-footer-info">
            <span className="support-modal-footer-text">
              마지막 업데이트: {getTimeAgo(inquiry.updatedAt)}
            </span>
          </div>
          <div className="support-modal-footer-actions">
            <button
              className="support-modal-footer-button secondary"
              onClick={onClose}
            >
              닫기
            </button>
            {inquiry.status !== "종료" && (
              <button
                className="support-modal-footer-button primary"
                onClick={() => handleStatusChange("해결")}
                disabled={inquiry.status === "해결"}
              >
                <CheckCircle size={16} />
                해결 완료
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportModal;
