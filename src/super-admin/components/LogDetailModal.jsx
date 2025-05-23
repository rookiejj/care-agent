import React from "react";
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
} from "lucide-react";

const LogDetailModal = ({ log, onClose }) => {
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
      system: { label: "시스템", icon: <Monitor size={16} /> },
      user: { label: "사용자", icon: <User size={16} /> },
      payment: { label: "결제", icon: <Database size={16} /> },
      security: { label: "보안", icon: <AlertTriangle size={16} /> },
      api: { label: "API", icon: <Code size={16} /> },
    };
    return (
      categoryInfo[category] || {
        label: category,
        icon: <FileText size={16} />,
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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="log-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="log-detail-header">
          <h2>로그 상세 정보</h2>
          <button className="modal-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="log-detail-content">
          {/* 기본 정보 */}
          <div className="log-detail-section">
            <h3 className="log-detail-section-title">기본 정보</h3>
            <div className="log-detail-grid">
              <div className="log-detail-item">
                <div className="log-detail-label">로그 ID</div>
                <div className="log-detail-value">{log.id}</div>
              </div>
              <div className="log-detail-item">
                <div className="log-detail-label">타임스탬프</div>
                <div className="log-detail-value">
                  {formatDateTime(log.timestamp)}
                </div>
              </div>
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
                <div className="log-detail-value">
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
            </div>
          </div>

          {/* 메시지 */}
          <div className="log-detail-section">
            <h3 className="log-detail-section-title">메시지</h3>
            <div className="log-detail-code">{log.message}</div>
          </div>

          {/* 사용자 정보 */}
          <div className="log-detail-section">
            <h3 className="log-detail-section-title">사용자 정보</h3>
            <div className="log-detail-grid">
              <div className="log-detail-item">
                <div className="log-detail-label">사용자</div>
                <div className="log-detail-value">{log.user}</div>
              </div>
              <div className="log-detail-item">
                <div className="log-detail-label">IP 주소</div>
                <div className="log-detail-value">{log.ip}</div>
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

          {/* API 정보 (API 카테고리인 경우) */}
          {log.category === "api" && (
            <div className="log-detail-section">
              <h3 className="log-detail-section-title">API 정보</h3>
              <div className="log-detail-grid">
                {log.endpoint && (
                  <div className="log-detail-item">
                    <div className="log-detail-label">엔드포인트</div>
                    <div className="log-detail-value">{log.endpoint}</div>
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
                    <div className="log-detail-value">{log.duration}ms</div>
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
                    <div className="log-detail-value">
                      {log.details.requestId}
                    </div>
                  </div>
                )}
                {log.details.sessionId && (
                  <div className="log-detail-item">
                    <div className="log-detail-label">세션 ID</div>
                    <div className="log-detail-value">
                      {log.details.sessionId}
                    </div>
                  </div>
                )}
                {log.details.userId && (
                  <div className="log-detail-item">
                    <div className="log-detail-label">사용자 ID</div>
                    <div className="log-detail-value">{log.details.userId}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 원본 로그 데이터 */}
          <div className="log-detail-section">
            <h3 className="log-detail-section-title">
              원본 로그 데이터 (JSON)
            </h3>
            <div className="log-detail-json">{getLogDetailsJson()}</div>
          </div>

          {/* 관련 액션 */}
          <div className="log-detail-section">
            <h3 className="log-detail-section-title">관련 액션</h3>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <button
                className="super-admin-button super-admin-button-secondary"
                onClick={() => {
                  navigator.clipboard.writeText(getLogDetailsJson());
                  alert("로그 데이터가 클립보드에 복사되었습니다.");
                }}
              >
                <Code size={16} />
                JSON 복사
              </button>
              <button
                className="super-admin-button super-admin-button-secondary"
                onClick={() => {
                  const blob = new Blob([getLogDetailsJson()], {
                    type: "application/json",
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `log_${log.id}_${
                    new Date().toISOString().split("T")[0]
                  }.json`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
              >
                <FileText size={16} />
                파일 다운로드
              </button>
              {log.level === "error" && (
                <button
                  className="super-admin-button super-admin-button-danger"
                  onClick={() => {
                    // 에러 로그에 대한 추가 조치
                    console.log("에러 로그 분석:", log.id);
                  }}
                >
                  <AlertTriangle size={16} />
                  에러 분석
                </button>
              )}
              {log.category === "security" && (
                <button
                  className="super-admin-button super-admin-button-danger"
                  onClick={() => {
                    // 보안 관련 추가 조치
                    console.log("보안 조치:", log.ip);
                  }}
                >
                  <AlertTriangle size={16} />
                  보안 조치
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogDetailModal;
