import React, { useState } from "react";
import {
  X,
  Info,
  AlertTriangle,
  XCircle,
  CheckCircle,
  Bug,
  Clock,
  User,
  Globe,
  Monitor,
  Database,
  Code,
  FileText,
  Copy,
  Download,
  Share,
  Eye,
  EyeOff,
  RefreshCw,
  Shield,
  Ban,
  Flag,
} from "lucide-react";

const LogDetailModal = ({ log, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showRawData, setShowRawData] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

  if (!log) return null;

  // 날짜 포맷 함수
  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  // 로그 레벨 정보 가져오기
  const getLogLevelInfo = (level) => {
    const levelInfo = {
      info: { icon: <Info size={20} />, label: "정보", color: "#3b82f6" },
      warning: {
        icon: <AlertTriangle size={20} />,
        label: "경고",
        color: "#f59e0b",
      },
      error: { icon: <XCircle size={20} />, label: "오류", color: "#ef4444" },
      success: {
        icon: <CheckCircle size={20} />,
        label: "성공",
        color: "#10b981",
      },
      debug: { icon: <Bug size={20} />, label: "디버그", color: "#6b7280" },
    };
    return levelInfo[level] || levelInfo.info;
  };

  // 카테고리 정보 가져오기
  const getCategoryInfo = (category) => {
    const categoryInfo = {
      system: {
        label: "시스템",
        icon: <Monitor size={16} />,
        color: "#8b5cf6",
      },
      user: { label: "사용자", icon: <User size={16} />, color: "#10b981" },
      payment: {
        label: "결제",
        icon: <Database size={16} />,
        color: "#f59e0b",
      },
      security: { label: "보안", icon: <Shield size={16} />, color: "#ef4444" },
      api: { label: "API", icon: <Code size={16} />, color: "#0d9488" },
    };
    return (
      categoryInfo[category] || {
        label: category,
        icon: <FileText size={16} />,
        color: "#6b7280",
      }
    );
  };

  const levelInfo = getLogLevelInfo(log.level);
  const categoryInfo = getCategoryInfo(log.category);

  // 상세 정보를 JSON 형태로 생성
  const getLogDetailsJson = () => {
    return JSON.stringify(
      {
        id: log.id,
        timestamp: log.timestamp,
        level: log.level,
        category: log.category,
        message: log.message,
        user: log.user,
        ip: log.ip,
        userAgent: log.userAgent,
        endpoint: log.endpoint,
        statusCode: log.statusCode,
        duration: log.duration,
        details: log.details,
      },
      null,
      2
    );
  };

  // 클립보드 복사
  const handleCopyToClipboard = (text, type) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopySuccess(type);
        setTimeout(() => setCopySuccess(""), 2000);
      })
      .catch(() => {
        alert("복사에 실패했습니다.");
      });
  };

  // 파일 다운로드
  const handleDownload = (content, filename) => {
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // IP 차단 처리
  const handleBlockIP = () => {
    if (window.confirm(`IP 주소 ${log.ip}를 차단하시겠습니까?`)) {
      console.log("IP 차단:", log.ip);
      alert(`IP ${log.ip}가 차단되었습니다.`);
    }
  };

  // 사용자 차단 처리
  const handleBlockUser = () => {
    if (window.confirm(`사용자 ${log.user}를 차단하시겠습니까?`)) {
      console.log("사용자 차단:", log.user);
      alert(`사용자 ${log.user}가 차단되었습니다.`);
    }
  };

  // 보안 알림 생성
  const handleCreateSecurityAlert = () => {
    const alertData = {
      type: "security_incident",
      logId: log.id,
      severity: log.level === "error" ? "high" : "medium",
      description: `보안 로그에서 발견된 이슈: ${log.message}`,
      ip: log.ip,
      user: log.user,
      timestamp: log.timestamp,
    };

    console.log("보안 알림 생성:", alertData);
    alert("보안 알림이 생성되었습니다.");
  };

  // 관련 로그 조회 (모의)
  const getRelatedLogs = () => {
    return [
      {
        id: log.id + 1,
        timestamp: new Date(
          new Date(log.timestamp).getTime() + 60000
        ).toISOString(),
        level: "info",
        message: "후속 처리 완료",
        relation: "subsequent",
      },
      {
        id: log.id - 1,
        timestamp: new Date(
          new Date(log.timestamp).getTime() - 60000
        ).toISOString(),
        level: "warning",
        message: "사전 경고 발생",
        relation: "previous",
      },
    ];
  };

  const relatedLogs = getRelatedLogs();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="log-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="log-detail-header">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ color: levelInfo.color }}>{levelInfo.icon}</div>
            <div>
              <h2>로그 상세 정보</h2>
              <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                ID: {log.id} • {formatDateTime(log.timestamp)}
              </div>
            </div>
          </div>
          <button className="modal-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* 탭 네비게이션 */}
        <div style={{ borderBottom: "1px solid #e5e7eb", padding: "0 1.5rem" }}>
          <div style={{ display: "flex", gap: "2rem" }}>
            <button
              className={`tab-button ${
                activeTab === "overview" ? "active" : ""
              }`}
              onClick={() => setActiveTab("overview")}
              style={{
                padding: "0.75rem 0",
                border: "none",
                background: "none",
                borderBottom:
                  activeTab === "overview"
                    ? "2px solid #3b82f6"
                    : "2px solid transparent",
                color: activeTab === "overview" ? "#3b82f6" : "#6b7280",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              개요
            </button>
            <button
              className={`tab-button ${
                activeTab === "technical" ? "active" : ""
              }`}
              onClick={() => setActiveTab("technical")}
              style={{
                padding: "0.75rem 0",
                border: "none",
                background: "none",
                borderBottom:
                  activeTab === "technical"
                    ? "2px solid #3b82f6"
                    : "2px solid transparent",
                color: activeTab === "technical" ? "#3b82f6" : "#6b7280",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              기술 정보
            </button>
            <button
              className={`tab-button ${
                activeTab === "actions" ? "active" : ""
              }`}
              onClick={() => setActiveTab("actions")}
              style={{
                padding: "0.75rem 0",
                border: "none",
                background: "none",
                borderBottom:
                  activeTab === "actions"
                    ? "2px solid #3b82f6"
                    : "2px solid transparent",
                color: activeTab === "actions" ? "#3b82f6" : "#6b7280",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              액션
            </button>
            <button
              className={`tab-button ${
                activeTab === "related" ? "active" : ""
              }`}
              onClick={() => setActiveTab("related")}
              style={{
                padding: "0.75rem 0",
                border: "none",
                background: "none",
                borderBottom:
                  activeTab === "related"
                    ? "2px solid #3b82f6"
                    : "2px solid transparent",
                color: activeTab === "related" ? "#3b82f6" : "#6b7280",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              관련 로그
            </button>
          </div>
        </div>

        <div className="log-detail-content">
          {/* 개요 탭 */}
          {activeTab === "overview" && (
            <>
              {/* 기본 정보 */}
              <div className="log-detail-section">
                <h3 className="log-detail-section-title">기본 정보</h3>
                <div className="log-detail-grid">
                  <div className="log-detail-item">
                    <div className="log-detail-label">로그 레벨</div>
                    <div
                      className="log-detail-value"
                      style={{ color: levelInfo.color }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        {levelInfo.icon}
                        {levelInfo.label}
                      </div>
                    </div>
                  </div>
                  <div className="log-detail-item">
                    <div className="log-detail-label">카테고리</div>
                    <div
                      className="log-detail-value"
                      style={{ color: categoryInfo.color }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        {categoryInfo.icon}
                        {categoryInfo.label}
                      </div>
                    </div>
                  </div>
                  <div className="log-detail-item">
                    <div className="log-detail-label">발생 시간</div>
                    <div className="log-detail-value">
                      {formatDateTime(log.timestamp)}
                    </div>
                  </div>
                  <div className="log-detail-item">
                    <div className="log-detail-label">로그 ID</div>
                    <div className="log-detail-value">{log.id}</div>
                  </div>
                </div>
              </div>

              {/* 메시지 */}
              <div className="log-detail-section">
                <h3 className="log-detail-section-title">메시지</h3>
                <div
                  className="log-detail-code"
                  style={{ position: "relative" }}
                >
                  {log.message}
                  <button
                    onClick={() =>
                      handleCopyToClipboard(log.message, "message")
                    }
                    style={{
                      position: "absolute",
                      top: "0.5rem",
                      right: "0.5rem",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#6b7280",
                      padding: "0.25rem",
                    }}
                    title="메시지 복사"
                  >
                    {copySuccess === "message" ? (
                      <CheckCircle size={16} />
                    ) : (
                      <Copy size={16} />
                    )}
                  </button>
                </div>
              </div>

              {/* 사용자 정보 */}
              <div className="log-detail-section">
                <div className="log-detail-grid">
                  <div className="log-detail-item">
                    <div className="log-detail-label">사용자</div>
                    <div className="log-detail-value">{log.user}</div>
                  </div>
                  <div className="log-detail-item">
                    <div className="log-detail-label">IP 주소</div>
                    <div
                      className="log-detail-value"
                      style={{ fontFamily: "monospace" }}
                    >
                      {log.ip}
                    </div>
                  </div>
                  {log.userAgent && (
                    <div
                      className="log-detail-item"
                      style={{ gridColumn: "1 / -1" }}
                    >
                      <div className="log-detail-label">User Agent</div>
                      <div
                        className="log-detail-value"
                        style={{ fontSize: "0.875rem", wordBreak: "break-all" }}
                      >
                        {log.userAgent}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* 기술 정보 탭 */}
          {activeTab === "technical" && (
            <>
              {/* API 정보 (API 카테고리인 경우) */}
              {log.category === "api" && (
                <div className="log-detail-section">
                  <h3 className="log-detail-section-title">API 정보</h3>
                  <div className="log-detail-grid">
                    {log.endpoint && (
                      <div className="log-detail-item">
                        <div className="log-detail-label">엔드포인트</div>
                        <div
                          className="log-detail-value"
                          style={{ fontFamily: "monospace" }}
                        >
                          {log.endpoint}
                        </div>
                      </div>
                    )}
                    {log.statusCode && (
                      <div className="log-detail-item">
                        <div className="log-detail-label">HTTP 상태 코드</div>
                        <div className="log-detail-value">
                          <span
                            style={{
                              color:
                                log.statusCode >= 200 && log.statusCode < 300
                                  ? "#10b981"
                                  : log.statusCode >= 400
                                  ? "#ef4444"
                                  : "#f59e0b",
                              fontWeight: "600",
                            }}
                          >
                            {log.statusCode}
                          </span>
                        </div>
                      </div>
                    )}
                    {log.duration && (
                      <div className="log-detail-item">
                        <div className="log-detail-label">응답 시간</div>
                        <div className="log-detail-value">
                          <span
                            style={{
                              color:
                                log.duration > 1000
                                  ? "#ef4444"
                                  : log.duration > 500
                                  ? "#f59e0b"
                                  : "#10b981",
                              fontWeight: "600",
                            }}
                          >
                            {log.duration}ms
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 추가 세부 정보 */}
              {log.details && (
                <div className="log-detail-section">
                  <h3 className="log-detail-section-title">추가 정보</h3>
                  <div className="log-detail-grid">
                    {log.details.requestId && (
                      <div className="log-detail-item">
                        <div className="log-detail-label">요청 ID</div>
                        <div
                          className="log-detail-value"
                          style={{ fontFamily: "monospace" }}
                        >
                          {log.details.requestId}
                        </div>
                      </div>
                    )}
                    {log.details.sessionId && (
                      <div className="log-detail-item">
                        <div className="log-detail-label">세션 ID</div>
                        <div
                          className="log-detail-value"
                          style={{ fontFamily: "monospace" }}
                        >
                          {log.details.sessionId}
                        </div>
                      </div>
                    )}
                    {log.details.userId && (
                      <div className="log-detail-item">
                        <div className="log-detail-label">사용자 ID</div>
                        <div className="log-detail-value">
                          {log.details.userId}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 원본 로그 데이터 */}
              <div className="log-detail-section">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <h3
                    className="log-detail-section-title"
                    style={{ margin: 0 }}
                  >
                    원본 로그 데이터
                  </h3>
                  <button
                    onClick={() => setShowRawData(!showRawData)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.5rem 1rem",
                      background: "none",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.375rem",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      color: "#4b5563",
                    }}
                  >
                    {showRawData ? <EyeOff size={16} /> : <Eye size={16} />}
                    {showRawData ? "숨기기" : "보기"}
                  </button>
                </div>
                {showRawData && (
                  <div
                    className="log-detail-json"
                    style={{ position: "relative" }}
                  >
                    {getLogDetailsJson()}
                    <button
                      onClick={() =>
                        handleCopyToClipboard(getLogDetailsJson(), "json")
                      }
                      style={{
                        position: "absolute",
                        top: "0.5rem",
                        right: "0.5rem",
                        background: "rgba(0, 0, 0, 0.1)",
                        border: "none",
                        cursor: "pointer",
                        color: "#f9fafb",
                        padding: "0.25rem",
                        borderRadius: "0.25rem",
                      }}
                      title="JSON 복사"
                    >
                      {copySuccess === "json" ? (
                        <CheckCircle size={16} />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* 액션 탭 */}
          {activeTab === "actions" && (
            <div className="log-detail-section">
              <h3 className="log-detail-section-title">사용 가능한 액션</h3>

              {/* 일반 액션 */}
              <div style={{ marginBottom: "2rem" }}>
                <h4
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    marginBottom: "1rem",
                    color: "#374151",
                  }}
                >
                  일반 액션
                </h4>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "0.75rem",
                  }}
                >
                  <button
                    className="super-admin-button super-admin-button-secondary"
                    onClick={() =>
                      handleCopyToClipboard(getLogDetailsJson(), "json")
                    }
                    style={{ justifyContent: "flex-start" }}
                  >
                    {copySuccess === "json" ? (
                      <CheckCircle size={16} />
                    ) : (
                      <Code size={16} />
                    )}
                    JSON 복사
                  </button>
                  <button
                    className="super-admin-button super-admin-button-secondary"
                    onClick={() =>
                      handleDownload(
                        getLogDetailsJson(),
                        `log_${log.id}_${
                          new Date().toISOString().split("T")[0]
                        }.json`
                      )
                    }
                    style={{ justifyContent: "flex-start" }}
                  >
                    <Download size={16} />
                    파일 다운로드
                  </button>
                  <button
                    className="super-admin-button super-admin-button-secondary"
                    onClick={() =>
                      handleCopyToClipboard(
                        window.location.href + `?logId=${log.id}`,
                        "link"
                      )
                    }
                    style={{ justifyContent: "flex-start" }}
                  >
                    {copySuccess === "link" ? (
                      <CheckCircle size={16} />
                    ) : (
                      <Share size={16} />
                    )}
                    링크 복사
                  </button>
                  <button
                    className="super-admin-button super-admin-button-secondary"
                    onClick={() =>
                      window.open(
                        `/logs?search=${encodeURIComponent(log.user)}`,
                        "_blank"
                      )
                    }
                    style={{ justifyContent: "flex-start" }}
                  >
                    <User size={16} />
                    사용자 로그 보기
                  </button>
                </div>
              </div>

              {/* 보안 액션 (보안 관련 로그인 경우) */}
              {(log.category === "security" || log.level === "error") && (
                <div style={{ marginBottom: "2rem" }}>
                  <h4
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      marginBottom: "1rem",
                      color: "#dc2626",
                    }}
                  >
                    보안 액션
                  </h4>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "0.75rem",
                    }}
                  >
                    <button
                      className="super-admin-button super-admin-button-danger"
                      onClick={handleBlockIP}
                      style={{ justifyContent: "flex-start" }}
                    >
                      <Ban size={16} />
                      IP 차단 ({log.ip})
                    </button>
                    {log.user !== "system" && (
                      <button
                        className="super-admin-button super-admin-button-danger"
                        onClick={handleBlockUser}
                        style={{ justifyContent: "flex-start" }}
                      >
                        <Ban size={16} />
                        사용자 차단
                      </button>
                    )}
                    <button
                      className="super-admin-button super-admin-button-danger"
                      onClick={handleCreateSecurityAlert}
                      style={{ justifyContent: "flex-start" }}
                    >
                      <Flag size={16} />
                      보안 알림 생성
                    </button>
                    <button
                      className="super-admin-button super-admin-button-secondary"
                      onClick={() =>
                        window.open(`/security-analysis?ip=${log.ip}`, "_blank")
                      }
                      style={{ justifyContent: "flex-start" }}
                    >
                      <Shield size={16} />
                      보안 분석
                    </button>
                  </div>
                </div>
              )}

              {/* 분석 액션 */}
              <div>
                <h4
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    marginBottom: "1rem",
                    color: "#7c3aed",
                  }}
                >
                  분석 액션
                </h4>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "0.75rem",
                  }}
                >
                  <button
                    className="super-admin-button super-admin-button-secondary"
                    onClick={() =>
                      window.open(
                        `/logs?search=${encodeURIComponent(`ip:${log.ip}`)}`,
                        "_blank"
                      )
                    }
                    style={{ justifyContent: "flex-start" }}
                  >
                    <Globe size={16} />
                    동일 IP 로그 분석
                  </button>
                  <button
                    className="super-admin-button super-admin-button-secondary"
                    onClick={() =>
                      window.open(
                        `/logs?search=${encodeURIComponent(
                          `level:${log.level}`
                        )}`,
                        "_blank"
                      )
                    }
                    style={{ justifyContent: "flex-start" }}
                  >
                    <AlertTriangle size={16} />
                    동일 레벨 로그 분석
                  </button>
                  <button
                    className="super-admin-button super-admin-button-secondary"
                    onClick={() =>
                      window.open(`/trends?category=${log.category}`, "_blank")
                    }
                    style={{ justifyContent: "flex-start" }}
                  >
                    <Monitor size={16} />
                    트렌드 분석
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 관련 로그 탭 */}
          {activeTab === "related" && (
            <div className="log-detail-section">
              <h3 className="log-detail-section-title">관련 로그</h3>

              {relatedLogs.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  {relatedLogs.map((relatedLog) => (
                    <div
                      key={relatedLog.id}
                      style={{
                        padding: "1rem",
                        border: "1px solid #e5e7eb",
                        borderRadius: "0.5rem",
                        backgroundColor: "#f9fafb",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onClick={() =>
                        console.log("Navigate to log:", relatedLog.id)
                      }
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#f3f4f6";
                        e.target.style.borderColor = "#d1d5db";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#f9fafb";
                        e.target.style.borderColor = "#e5e7eb";
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <span
                            style={{
                              padding: "0.25rem 0.5rem",
                              borderRadius: "9999px",
                              fontSize: "0.75rem",
                              fontWeight: "500",
                              backgroundColor:
                                relatedLog.level === "error"
                                  ? "#fef2f2"
                                  : relatedLog.level === "warning"
                                  ? "#fffbeb"
                                  : "#eff6ff",
                              color:
                                relatedLog.level === "error"
                                  ? "#dc2626"
                                  : relatedLog.level === "warning"
                                  ? "#d97706"
                                  : "#3b82f6",
                            }}
                          >
                            {relatedLog.level}
                          </span>
                          <span
                            style={{
                              padding: "0.25rem 0.5rem",
                              borderRadius: "9999px",
                              fontSize: "0.75rem",
                              fontWeight: "500",
                              backgroundColor:
                                relatedLog.relation === "previous"
                                  ? "#ecfdf5"
                                  : "#f0f9ff",
                              color:
                                relatedLog.relation === "previous"
                                  ? "#059669"
                                  : "#0284c7",
                            }}
                          >
                            {relatedLog.relation === "previous"
                              ? "이전 로그"
                              : "후속 로그"}
                          </span>
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                          ID: {relatedLog.id}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: "0.875rem",
                          color: "#374151",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {relatedLog.message}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                        {formatDateTime(relatedLog.timestamp)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "2rem",
                    color: "#6b7280",
                  }}
                >
                  <Monitor
                    size={48}
                    style={{ margin: "0 auto 1rem", opacity: 0.5 }}
                  />
                  <p>관련 로그가 없습니다.</p>
                  <p style={{ fontSize: "0.875rem" }}>
                    동일한 사용자, IP 또는 시간대의 로그를 찾을 수 없습니다.
                  </p>
                </div>
              )}

              {/* 검색 바로가기 */}
              <div
                style={{
                  marginTop: "1.5rem",
                  padding: "1rem",
                  backgroundColor: "#f0f9ff",
                  borderRadius: "0.5rem",
                  border: "1px solid #bfdbfe",
                }}
              >
                <h4
                  style={{
                    margin: "0 0 0.75rem 0",
                    color: "#1e40af",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                  }}
                >
                  빠른 검색
                </h4>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                >
                  <button
                    onClick={() =>
                      window.open(
                        `/logs?search=${encodeURIComponent(
                          `user:${log.user}`
                        )}`,
                        "_blank"
                      )
                    }
                    style={{
                      padding: "0.375rem 0.75rem",
                      fontSize: "0.75rem",
                      backgroundColor: "white",
                      border: "1px solid #bfdbfe",
                      borderRadius: "0.375rem",
                      color: "#1e40af",
                      cursor: "pointer",
                    }}
                  >
                    사용자: {log.user}
                  </button>
                  <button
                    onClick={() =>
                      window.open(
                        `/logs?search=${encodeURIComponent(`ip:${log.ip}`)}`,
                        "_blank"
                      )
                    }
                    style={{
                      padding: "0.375rem 0.75rem",
                      fontSize: "0.75rem",
                      backgroundColor: "white",
                      border: "1px solid #bfdbfe",
                      borderRadius: "0.375rem",
                      color: "#1e40af",
                      cursor: "pointer",
                    }}
                  >
                    IP: {log.ip}
                  </button>
                  <button
                    onClick={() =>
                      window.open(
                        `/logs?search=${encodeURIComponent(
                          `category:${log.category}`
                        )}`,
                        "_blank"
                      )
                    }
                    style={{
                      padding: "0.375rem 0.75rem",
                      fontSize: "0.75rem",
                      backgroundColor: "white",
                      border: "1px solid #bfdbfe",
                      borderRadius: "0.375rem",
                      color: "#1e40af",
                      cursor: "pointer",
                    }}
                  >
                    카테고리: {log.category}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 복사 성공 알림 */}
          {copySuccess && (
            <div
              style={{
                position: "fixed",
                bottom: "2rem",
                right: "2rem",
                padding: "0.75rem 1rem",
                backgroundColor: "#10b981",
                color: "white",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                zIndex: 1000,
              }}
            >
              ✓{" "}
              {copySuccess === "message"
                ? "메시지"
                : copySuccess === "json"
                ? "JSON 데이터"
                : "링크"}
              가 복사되었습니다
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogDetailModal;
