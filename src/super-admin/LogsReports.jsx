import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileBarChart,
  Calendar,
  Users,
  DollarSign,
  Activity,
  Server,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Bug,
  Clock,
  User,
  Globe,
  Database,
  Cpu,
  HardDrive,
  Wifi,
  X,
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react";
import "./LogsReports.css";
import LogDetailModal from "./components/LogDetailModal";

const LogsReports = ({ viewMode = "list", itemId, onBack, onViewDetail }) => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLog, setSelectedLog] = useState(null);
  const [showLogModal, setShowLogModal] = useState(false);
  const [activeSection, setActiveSection] = useState("reports");
  const [filterOptions, setFilterOptions] = useState({
    level: "all",
    category: "all",
    dateRange: "all",
  });

  // 시스템 상태 데이터
  const [systemStatus, setSystemStatus] = useState({
    server: { status: "healthy", value: "99.9%", detail: "8일 14시간 가동" },
    database: { status: "healthy", value: "45ms", detail: "평균 응답 시간" },
    api: { status: "warning", value: "98.5%", detail: "일부 지연 발생" },
    storage: { status: "healthy", value: "78%", detail: "1.2TB / 1.5TB 사용" },
  });

  // 보고서 데이터
  const [reports, setReports] = useState([]);

  // 페이지네이션 설정
  const logsPerPage = 20;

  useEffect(() => {
    const loadData = () => {
      setIsLoading(true);

      setTimeout(() => {
        const mockLogs = generateMockLogs();
        setLogs(mockLogs);
        setFilteredLogs(mockLogs);

        const mockReports = generateMockReports();
        setReports(mockReports);

        setIsLoading(false);
      }, 800);
    };

    loadData();
  }, []);

  useEffect(() => {
    // 검색어와 필터 적용
    let results = [...logs];

    // 검색어 필터링
    if (searchTerm) {
      results = results.filter(
        (log) =>
          log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.ip.includes(searchTerm)
      );
    }

    // 로그 레벨 필터링
    if (filterOptions.level !== "all") {
      results = results.filter((log) => log.level === filterOptions.level);
    }

    // 카테고리 필터링
    if (filterOptions.category !== "all") {
      results = results.filter(
        (log) => log.category === filterOptions.category
      );
    }

    // 날짜 범위 필터링
    if (filterOptions.dateRange !== "all") {
      const now = new Date();
      const periodMap = {
        "1hour": 1,
        "6hours": 6,
        "24hours": 24,
        "7days": 24 * 7,
        "30days": 24 * 30,
      };
      const hours = periodMap[filterOptions.dateRange];
      if (hours) {
        const cutoffDate = new Date(now.getTime() - hours * 60 * 60 * 1000);
        results = results.filter(
          (log) => new Date(log.timestamp) >= cutoffDate
        );
      }
    }

    // 결과 정렬 (기본: 시간 최신순)
    results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setFilteredLogs(results);
    setCurrentPage(1);
  }, [searchTerm, filterOptions, logs]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (filter, value) => {
    setFilterOptions({
      ...filterOptions,
      [filter]: value,
    });
  };

  const handleLogClick = (log) => {
    setSelectedLog(log);
    setShowLogModal(true);
  };

  const handleCloseLogModal = () => {
    setShowLogModal(false);
    setSelectedLog(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleReportGenerate = (reportType) => {
    // 보고서 생성 로직
    console.log("보고서 생성:", reportType);
  };

  const handleReportDownload = (reportId) => {
    // 보고서 다운로드 로직
    console.log("보고서 다운로드:", reportId);
  };

  // 페이지네이션 계산
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

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

  // 상대 시간 포맷 함수
  const formatRelativeTime = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "방금 전";
    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    if (diffDays < 7) return `${diffDays}일 전`;
    return formatDateTime(dateString);
  };

  // 로그 레벨 배지 렌더링
  const renderLogLevelBadge = (level) => {
    const icons = {
      info: <Info size={12} />,
      warning: <AlertTriangle size={12} />,
      error: <XCircle size={12} />,
      success: <CheckCircle size={12} />,
      debug: <Bug size={12} />,
    };

    const labels = {
      info: "정보",
      warning: "경고",
      error: "오류",
      success: "성공",
      debug: "디버그",
    };

    return (
      <span className={`log-level-badge ${level}`}>
        {icons[level]}
        {labels[level] || level}
      </span>
    );
  };

  // 로그 카테고리 배지 렌더링
  const renderLogCategoryBadge = (category) => {
    const labels = {
      system: "시스템",
      user: "사용자",
      payment: "결제",
      security: "보안",
      api: "API",
    };

    return (
      <span className={`log-category-badge ${category}`}>
        {labels[category] || category}
      </span>
    );
  };

  // 로그 엔트리 아이콘 렌더링
  const renderLogEntryIcon = (level) => {
    const icons = {
      info: <Info size={16} />,
      warning: <AlertTriangle size={16} />,
      error: <XCircle size={16} />,
      success: <CheckCircle size={16} />,
      debug: <Bug size={16} />,
    };

    return (
      <div className={`log-entry-icon ${level}`}>
        {icons[level] || <Info size={16} />}
      </div>
    );
  };

  // 시스템 상태 아이콘 렌더링
  const renderSystemStatusIcon = (status) => {
    switch (status) {
      case "healthy":
        return <CheckCircle size={24} />;
      case "warning":
        return <AlertTriangle size={24} />;
      case "critical":
        return <XCircle size={24} />;
      default:
        return <Info size={24} />;
    }
  };

  // 목업 로그 데이터 생성
  function generateMockLogs() {
    const mockLogs = [];
    const levels = ["info", "warning", "error", "success", "debug"];
    const categories = ["system", "user", "payment", "security", "api"];
    const users = [
      "admin",
      "system",
      "user123",
      "hospital_manager",
      "doctor01",
    ];
    const messages = {
      system: [
        "시스템 백업이 완료되었습니다",
        "서버 재시작이 예정되어 있습니다",
        "데이터베이스 연결이 복구되었습니다",
        "메모리 사용량이 임계값을 초과했습니다",
        "자동 업데이트가 설치되었습니다",
      ],
      user: [
        "새로운 사용자가 가입했습니다",
        "사용자 로그인에 실패했습니다",
        "비밀번호가 변경되었습니다",
        "계정이 잠금 해제되었습니다",
        "프로필 정보가 업데이트되었습니다",
      ],
      payment: [
        "결제가 성공적으로 처리되었습니다",
        "환불이 요청되었습니다",
        "결제 승인이 대기 중입니다",
        "카드 정보 검증에 실패했습니다",
        "정산이 완료되었습니다",
      ],
      security: [
        "의심스러운 로그인 시도가 감지되었습니다",
        "IP 주소가 차단되었습니다",
        "보안 스캔이 완료되었습니다",
        "권한 없는 접근이 시도되었습니다",
        "보안 정책이 업데이트되었습니다",
      ],
      api: [
        "API 요청이 성공했습니다",
        "API 응답 시간이 지연되고 있습니다",
        "인증 토큰이 만료되었습니다",
        "요청 한도를 초과했습니다",
        "새로운 API 키가 생성되었습니다",
      ],
    };

    for (let i = 1; i <= 200; i++) {
      const level = levels[Math.floor(Math.random() * levels.length)];
      const category =
        categories[Math.floor(Math.random() * categories.length)];
      const user = users[Math.floor(Math.random() * users.length)];
      const categoryMessages = messages[category];
      const message =
        categoryMessages[Math.floor(Math.random() * categoryMessages.length)];

      // 타임스탬프 생성 (최근 30일 내)
      const timestamp = new Date(
        new Date().getTime() -
          Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
      ).toISOString();

      mockLogs.push({
        id: i,
        level,
        category,
        message,
        user,
        ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(
          Math.random() * 255
        )}`,
        timestamp,
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        endpoint:
          category === "api"
            ? `/api/v1/${category}/${Math.floor(Math.random() * 100)}`
            : null,
        statusCode:
          category === "api"
            ? [200, 400, 401, 403, 404, 500][Math.floor(Math.random() * 6)]
            : null,
        duration:
          category === "api" ? Math.floor(Math.random() * 1000) + 50 : null,
        details: {
          requestId: `req_${Math.random().toString(36).substr(2, 9)}`,
          sessionId: `sess_${Math.random().toString(36).substr(2, 9)}`,
          userId:
            user !== "system" ? Math.floor(Math.random() * 1000) + 1 : null,
        },
      });
    }

    return mockLogs;
  }

  // 목업 보고서 데이터 생성
  function generateMockReports() {
    return [
      {
        id: 1,
        title: "일간 활동 보고서",
        description: "사용자 활동 및 시스템 성능 일간 요약",
        type: "daily",
        status: "ready",
        icon: "blue",
        stats: {
          총방문자: "1,234",
          신규가입: "89",
          활성사용자: "567",
        },
        lastGenerated: new Date().toISOString(),
        schedule: "매일 오전 9시",
      },
      {
        id: 2,
        title: "주간 매출 보고서",
        description: "병원별 매출 현황 및 수수료 정산 내역",
        type: "weekly",
        status: "ready",
        icon: "green",
        stats: {
          총매출: "45.2M",
          수수료: "6.8M",
          정산완료: "38.4M",
        },
        lastGenerated: new Date(
          new Date().getTime() - 24 * 60 * 60 * 1000
        ).toISOString(),
        schedule: "매주 월요일 오전 10시",
      },
      {
        id: 3,
        title: "월간 성장 분석",
        description: "플랫폼 성장 지표 및 트렌드 분석",
        type: "monthly",
        status: "generating",
        icon: "purple",
        stats: {
          성장률: "+15.8%",
          신규병원: "12",
          예약증가: "+23.4%",
        },
        lastGenerated: new Date(
          new Date().getTime() - 7 * 24 * 60 * 60 * 1000
        ).toISOString(),
        schedule: "매월 1일 오전 11시",
      },
      {
        id: 4,
        title: "보안 감사 보고서",
        description: "시스템 보안 상태 및 위협 탐지 현황",
        type: "security",
        status: "ready",
        icon: "red",
        stats: {
          위협차단: "45",
          보안스캔: "완료",
          취약점: "0",
        },
        lastGenerated: new Date(
          new Date().getTime() - 2 * 60 * 60 * 1000
        ).toISOString(),
        schedule: "매일 자정",
      },
      {
        id: 5,
        title: "시스템 성능 보고서",
        description: "서버 성능, 응답 시간, 에러율 모니터링",
        type: "performance",
        status: "scheduled",
        icon: "amber",
        stats: {
          가동률: "99.9%",
          응답시간: "120ms",
          에러율: "0.1%",
        },
        lastGenerated: new Date(
          new Date().getTime() - 6 * 60 * 60 * 1000
        ).toISOString(),
        schedule: "매 6시간마다",
      },
      {
        id: 6,
        title: "사용자 행동 분석",
        description: "사용자 여정, 이탈률, 전환율 분석",
        type: "analytics",
        status: "ready",
        icon: "blue",
        stats: {
          이탈률: "12.5%",
          전환율: "3.2%",
          세션시간: "8분",
        },
        lastGenerated: new Date(
          new Date().getTime() - 12 * 60 * 60 * 1000
        ).toISOString(),
        schedule: "매일 오후 6시",
      },
    ];
  }

  if (isLoading) {
    return (
      <div className="super-admin-loading-container">
        <div className="super-admin-loading-spinner"></div>
        <p>보고서 및 로그 데이터 로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="logs-reports">
      <div className="super-admin-section-header">
        <h2 className="super-admin-section-title">보고서 및 로그</h2>
        <p className="super-admin-section-description">
          시스템 보고서 생성 및 로그 모니터링을 통합 관리합니다.
        </p>
      </div>

      {/* 섹션 탭 */}
      <div className="super-admin-card" style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
          <button
            className={`super-admin-button ${
              activeSection === "reports"
                ? "super-admin-button-primary"
                : "super-admin-button-secondary"
            }`}
            onClick={() => setActiveSection("reports")}
          >
            <FileBarChart size={16} />
            보고서
          </button>
          <button
            className={`super-admin-button ${
              activeSection === "logs"
                ? "super-admin-button-primary"
                : "super-admin-button-secondary"
            }`}
            onClick={() => setActiveSection("logs")}
          >
            <Activity size={16} />
            시스템 로그
          </button>
          <button
            className={`super-admin-button ${
              activeSection === "status"
                ? "super-admin-button-primary"
                : "super-admin-button-secondary"
            }`}
            onClick={() => setActiveSection("status")}
          >
            <Server size={16} />
            시스템 상태
          </button>
        </div>
      </div>

      {/* 보고서 섹션 */}
      {activeSection === "reports" && (
        <div className="reports-section">
          <div className="logs-reports-actions">
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <h3 className="logs-list-title">시스템 보고서</h3>
            </div>
            <div className="logs-action-buttons">
              <button className="super-admin-button super-admin-button-secondary">
                <Calendar size={16} />
                스케줄 설정
              </button>
              <button className="super-admin-button super-admin-button-primary">
                <Plus size={16} />
                커스텀 보고서
              </button>
            </div>
          </div>

          <div className="reports-grid">
            {reports.map((report) => (
              <div key={report.id} className="report-card">
                <div className={`report-status-badge ${report.status}`}>
                  {report.status === "ready"
                    ? "준비됨"
                    : report.status === "generating"
                    ? "생성 중"
                    : "예약됨"}
                </div>
                <div className="report-card-header">
                  <div className={`report-card-icon ${report.icon}`}>
                    {report.type === "daily" && <Calendar size={24} />}
                    {report.type === "weekly" && <BarChart3 size={24} />}
                    {report.type === "monthly" && <TrendingUp size={24} />}
                    {report.type === "security" && <Shield size={24} />}
                    {report.type === "performance" && <Activity size={24} />}
                    {report.type === "analytics" && <PieChart size={24} />}
                  </div>
                  <div className="report-card-info">
                    <h4 className="report-card-title">{report.title}</h4>
                    <p className="report-card-description">
                      {report.description}
                    </p>
                  </div>
                </div>
                <div className="report-card-content">
                  <div className="report-card-stats">
                    {Object.entries(report.stats).map(([key, value]) => (
                      <div key={key} className="report-stat">
                        <h5 className="report-stat-value">{value}</h5>
                        <p className="report-stat-label">{key}</p>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#6b7280",
                      marginBottom: "1rem",
                    }}
                  >
                    마지막 생성: {formatRelativeTime(report.lastGenerated)}
                    <br />
                    스케줄: {report.schedule}
                  </div>
                  <div className="report-card-actions">
                    <button
                      className="report-action-button"
                      onClick={() => handleReportDownload(report.id)}
                      disabled={report.status !== "ready"}
                    >
                      <Download size={16} />
                      다운로드
                    </button>
                    <button
                      className="report-action-button primary"
                      onClick={() => handleReportGenerate(report.type)}
                    >
                      <FileBarChart size={16} />
                      새로 생성
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 시스템 상태 섹션 */}
      {activeSection === "status" && (
        <div>
          <div className="logs-list-header">
            <h3 className="logs-list-title">시스템 상태 모니터링</h3>
            <button className="super-admin-button super-admin-button-secondary">
              <Download size={16} />
              상태 보고서
            </button>
          </div>

          <div className="system-status-grid">
            <div className="system-status-card">
              <div
                className={`system-status-icon ${systemStatus.server.status}`}
              >
                <Server size={24} />
              </div>
              <div className="system-status-info">
                <p className="system-status-label">서버 가동률</p>
                <h3 className="system-status-value">
                  {systemStatus.server.value}
                </h3>
                <p className="system-status-detail">
                  {systemStatus.server.detail}
                </p>
              </div>
            </div>
            <div className="system-status-card">
              <div
                className={`system-status-icon ${systemStatus.database.status}`}
              >
                <Database size={24} />
              </div>
              <div className="system-status-info">
                <p className="system-status-label">데이터베이스</p>
                <h3 className="system-status-value">
                  {systemStatus.database.value}
                </h3>
                <p className="system-status-detail">
                  {systemStatus.database.detail}
                </p>
              </div>
            </div>
            <div className="system-status-card">
              <div className={`system-status-icon ${systemStatus.api.status}`}>
                <Wifi size={24} />
              </div>
              <div className="system-status-info">
                <p className="system-status-label">API 서비스</p>
                <h3 className="system-status-value">
                  {systemStatus.api.value}
                </h3>
                <p className="system-status-detail">
                  {systemStatus.api.detail}
                </p>
              </div>
            </div>
            <div className="system-status-card">
              <div
                className={`system-status-icon ${systemStatus.storage.status}`}
              >
                <HardDrive size={24} />
              </div>
              <div className="system-status-info">
                <p className="system-status-label">저장소</p>
                <h3 className="system-status-value">
                  {systemStatus.storage.value}
                </h3>
                <p className="system-status-detail">
                  {systemStatus.storage.detail}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 로그 섹션 */}
      {activeSection === "logs" && (
        <div>
          <div className="logs-reports-actions">
            <div className="logs-search-filter-container">
              <div className="logs-admin-search-bar">
                <Search size={18} className="logs-search-icon" />
                <input
                  type="text"
                  placeholder="로그 메시지, 사용자, IP 주소 검색..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="logs-admin-search-input"
                />
              </div>

              <button
                className="super-admin-button super-admin-button-secondary"
                onClick={toggleFilters}
              >
                <Filter size={16} />
                필터
              </button>
            </div>

            <div className="logs-action-buttons">
              <button className="super-admin-button super-admin-button-secondary">
                <Download size={16} />
                로그 내보내기
              </button>
              <button className="super-admin-button super-admin-button-secondary">
                <AlertTriangle size={16} />
                알림 설정
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="super-admin-filters">
              <div className="super-admin-filter-group">
                <label className="super-admin-filter-label">로그 레벨</label>
                <div className="super-admin-filter-options">
                  <button
                    className={`super-admin-filter-option ${
                      filterOptions.level === "all" ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("level", "all")}
                  >
                    전체
                  </button>
                  <button
                    className={`super-admin-filter-option ${
                      filterOptions.level === "info" ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("level", "info")}
                  >
                    정보
                  </button>
                  <button
                    className={`super-admin-filter-option ${
                      filterOptions.level === "warning" ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("level", "warning")}
                  >
                    경고
                  </button>
                  <button
                    className={`super-admin-filter-option ${
                      filterOptions.level === "error" ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("level", "error")}
                  >
                    오류
                  </button>
                  <button
                    className={`super-admin-filter-option ${
                      filterOptions.level === "success" ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("level", "success")}
                  >
                    성공
                  </button>
                  <button
                    className={`super-admin-filter-option ${
                      filterOptions.level === "debug" ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("level", "debug")}
                  >
                    디버그
                  </button>
                </div>
              </div>

              <div className="super-admin-filter-group">
                <label className="super-admin-filter-label">카테고리</label>
                <div className="super-admin-filter-options">
                  <button
                    className={`super-admin-filter-option ${
                      filterOptions.category === "all" ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("category", "all")}
                  >
                    전체
                  </button>
                  <button
                    className={`super-admin-filter-option ${
                      filterOptions.category === "system" ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("category", "system")}
                  >
                    시스템
                  </button>
                  <button
                    className={`super-admin-filter-option ${
                      filterOptions.category === "user" ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("category", "user")}
                  >
                    사용자
                  </button>
                  <button
                    className={`super-admin-filter-option ${
                      filterOptions.category === "payment" ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("category", "payment")}
                  >
                    결제
                  </button>
                  <button
                    className={`super-admin-filter-option ${
                      filterOptions.category === "security" ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("category", "security")}
                  >
                    보안
                  </button>
                  <button
                    className={`super-admin-filter-option ${
                      filterOptions.category === "api" ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("category", "api")}
                  >
                    API
                  </button>
                </div>
              </div>

              <div className="super-admin-filter-group">
                <label className="super-admin-filter-label">시간 범위</label>
                <div className="super-admin-filter-options">
                  <button
                    className={`super-admin-filter-option ${
                      filterOptions.dateRange === "all" ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("dateRange", "all")}
                  >
                    전체
                  </button>
                  <button
                    className={`super-admin-filter-option ${
                      filterOptions.dateRange === "1hour" ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("dateRange", "1hour")}
                  >
                    1시간
                  </button>
                  <button
                    className={`super-admin-filter-option ${
                      filterOptions.dateRange === "6hours" ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("dateRange", "6hours")}
                  >
                    6시간
                  </button>
                  <button
                    className={`super-admin-filter-option ${
                      filterOptions.dateRange === "24hours" ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("dateRange", "24hours")}
                  >
                    24시간
                  </button>
                  <button
                    className={`super-admin-filter-option ${
                      filterOptions.dateRange === "7days" ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("dateRange", "7days")}
                  >
                    7일
                  </button>
                  <button
                    className={`super-admin-filter-option ${
                      filterOptions.dateRange === "30days" ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("dateRange", "30days")}
                  >
                    30일
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="logs-list-header">
            <h3 className="logs-list-title">시스템 로그</h3>
            <div className="logs-count">
              총 <span className="count-highlight">{filteredLogs.length}</span>
              건
            </div>
          </div>

          {filteredLogs.length === 0 ? (
            <div className="super-admin-empty-state">
              <div className="super-admin-empty-icon">
                <Activity size={48} />
              </div>
              <h3 className="super-admin-empty-title">로그가 없습니다</h3>
              <p className="super-admin-empty-description">
                검색 조건에 맞는 로그가 없습니다. 다른 검색어나 필터를
                사용해보세요.
              </p>
            </div>
          ) : (
            <>
              <div className="super-admin-card">
                <div style={{ padding: "0" }}>
                  {currentLogs.map((log) => (
                    <div
                      key={log.id}
                      className="log-entry"
                      onClick={() => handleLogClick(log)}
                      style={{ cursor: "pointer" }}
                    >
                      {renderLogEntryIcon(log.level)}
                      <div className="log-entry-content">
                        <div className="log-entry-header">
                          {renderLogLevelBadge(log.level)}
                          {renderLogCategoryBadge(log.category)}
                          <div className="log-entry-time">
                            {formatRelativeTime(log.timestamp)}
                          </div>
                        </div>
                        <p className="log-entry-message">{log.message}</p>
                        <div className="log-entry-details">
                          <div className="log-entry-detail">
                            <User
                              size={12}
                              style={{ marginRight: "0.25rem" }}
                            />
                            {log.user}
                          </div>
                          <div className="log-entry-detail">
                            <Globe
                              size={12}
                              style={{ marginRight: "0.25rem" }}
                            />
                            {log.ip}
                          </div>
                          {log.endpoint && (
                            <div className="log-entry-detail">
                              {log.endpoint}
                            </div>
                          )}
                          {log.statusCode && (
                            <div className="log-entry-detail">
                              HTTP {log.statusCode}
                            </div>
                          )}
                          {log.duration && (
                            <div className="log-entry-detail">
                              {log.duration}ms
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {totalPages > 1 && (
                <div className="super-admin-pagination">
                  <button
                    className={`super-admin-pagination-button ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;

                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 2 &&
                        pageNumber <= currentPage + 2)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          className={`super-admin-pagination-button ${
                            pageNumber === currentPage ? "active" : ""
                          }`}
                          onClick={() => handlePageChange(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      );
                    } else if (
                      (pageNumber === currentPage - 3 && currentPage > 3) ||
                      (pageNumber === currentPage + 3 &&
                        currentPage < totalPages - 2)
                    ) {
                      return (
                        <span key={pageNumber} className="pagination-ellipsis">
                          ...
                        </span>
                      );
                    }

                    return null;
                  })}

                  <button
                    className={`super-admin-pagination-button ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {showLogModal && selectedLog && (
        <LogDetailModal log={selectedLog} onClose={handleCloseLogModal} />
      )}
    </div>
  );
};

export default LogsReports;
