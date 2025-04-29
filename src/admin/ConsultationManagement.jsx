import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  MessageSquare,
  Calendar,
  User,
  Phone,
  Mail,
  Clock,
  Scissors,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import "./ConsultationManagement.css";
import ConsultationModal from "./components/ConsultationModal";

const ConsultationManagement = () => {
  const [consultations, setConsultations] = useState([]);
  const [filteredConsultations, setFilteredConsultations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    status: "all",
    consultationType: "all",
    dateRange: "all",
  });

  // 페이지네이션 설정
  const consultationsPerPage = 10;

  useEffect(() => {
    // 실제 앱에서는 API 호출을 통해 상담 데이터를 가져옴
    // 여기서는 목업 데이터 사용
    const generateMockConsultations = () => {
      const mockConsultations = [];
      const statuses = ["pending", "scheduled", "completed", "canceled"];
      const consultationTypes = [
        "initial",
        "followup",
        "online",
        "procedure-specific",
      ];
      const procedureInterests = [
        "안면 성형",
        "코 성형",
        "눈 성형",
        "지방 이식",
        "지방 흡입",
        "가슴 성형",
        "안티에이징",
        "보톡스",
        "필러",
        "레이저 시술",
        "피부 관리",
        "모발 이식",
        "윤곽 성형",
      ];

      // 오늘 날짜의 0시 0분으로 설정 (시작점)
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // 지난 30일부터 향후 30일까지의 상담 생성
      const startDate = new Date(today);
      startDate.setDate(startDate.getDate() - 30);

      const endDate = new Date(today);
      endDate.setDate(endDate.getDate() + 30);

      for (let i = 1; i <= 50; i++) {
        const firstName = [
          "김",
          "이",
          "박",
          "최",
          "정",
          "강",
          "조",
          "윤",
          "장",
          "임",
        ][Math.floor(Math.random() * 10)];
        const lastName = [
          "준",
          "민",
          "서",
          "지",
          "현",
          "우",
          "영",
          "수",
          "은",
          "연",
          "호",
        ][Math.floor(Math.random() * 11)];
        const name = firstName + lastName;

        // 랜덤 상담 일시 생성 (지난 30일부터 향후 30일 사이)
        const consultationDate = new Date(
          startDate.getTime() +
            Math.random() * (endDate.getTime() - startDate.getTime())
        );

        // 상담 시간 (9시-18시)
        const hours = 9 + Math.floor(Math.random() * 9);
        const minutes = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
        consultationDate.setHours(hours, minutes, 0, 0);

        // 과거 상담은 completed 또는 canceled, 현재/미래 상담은 pending 또는 scheduled
        let status;
        if (consultationDate < new Date()) {
          status = Math.random() > 0.2 ? "completed" : "canceled";
        } else {
          status = Math.random() > 0.5 ? "scheduled" : "pending";
        }

        // 관심 시술 (1-3개)
        const interestCount = Math.floor(Math.random() * 3) + 1;
        const interests = [];
        for (let j = 0; j < interestCount; j++) {
          const interest =
            procedureInterests[
              Math.floor(Math.random() * procedureInterests.length)
            ];
          if (!interests.includes(interest)) {
            interests.push(interest);
          }
        }

        const consultationType =
          consultationTypes[
            Math.floor(Math.random() * consultationTypes.length)
          ];
        const gender = ["남성", "여성"][Math.floor(Math.random() * 2)];
        const age = 20 + Math.floor(Math.random() * 50);
        const phoneNumber = `010-${1000 + Math.floor(Math.random() * 9000)}-${
          1000 + Math.floor(Math.random() * 9000)
        }`;
        const email = `${name}${Math.floor(Math.random() * 100)}@example.com`;

        // 상담 내용
        const notes =
          status === "completed"
            ? "상담 완료. " +
              (Math.random() > 0.5 ? "시술 예약 진행함." : "추가 상담 필요.")
            : status === "canceled"
            ? "고객 취소. " +
              (Math.random() > 0.5 ? "일정 조율 문제." : "개인 사유.")
            : "성형 시술에 관한 상담 예정. " +
              (interests.length > 0
                ? `관심 시술: ${interests.join(", ")}`
                : "");

        // 상담사/의사 배정
        const consultant = ["김상담", "이의사", "박상담사", "최의사", "정실장"][
          Math.floor(Math.random() * 5)
        ];

        mockConsultations.push({
          id: i,
          clientName: name,
          gender,
          age,
          phoneNumber,
          email,
          date: consultationDate,
          duration: 30 + Math.floor(Math.random() * 4) * 15, // 30, 45, 60, 75, 90분
          type: consultationType,
          status,
          interests,
          notes,
          consultant,
          createdAt: new Date(
            consultationDate.getTime() -
              Math.floor(Math.random() * 14 * 24 * 60 * 60 * 1000)
          ),
          beforeImages: Math.random() > 0.7,
          previousConsultation: Math.random() > 0.8,
        });
      }

      return mockConsultations.sort((a, b) => a.date - b.date);
    };

    // 데이터 로딩 시뮬레이션
    setTimeout(() => {
      const mockConsultations = generateMockConsultations();
      setConsultations(mockConsultations);
      setFilteredConsultations(mockConsultations);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // 검색어와 필터 적용
    let results = [...consultations];

    // 검색어 필터링
    if (searchTerm) {
      results = results.filter(
        (consultation) =>
          consultation.clientName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          consultation.phoneNumber
            .replace(/-/g, "")
            .includes(searchTerm.replace(/-/g, "")) ||
          consultation.email
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          consultation.consultant
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          consultation.interests.some((interest) =>
            interest.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // 상태 필터링
    if (filterOptions.status !== "all") {
      results = results.filter(
        (consultation) => consultation.status === filterOptions.status
      );
    }

    // 상담 유형 필터링
    if (filterOptions.consultationType !== "all") {
      results = results.filter(
        (consultation) => consultation.type === filterOptions.consultationType
      );
    }

    // 날짜 범위 필터링
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    switch (filterOptions.dateRange) {
      case "today":
        results = results.filter((consultation) => {
          const consultationDate = new Date(consultation.date);
          consultationDate.setHours(0, 0, 0, 0);
          return consultationDate.getTime() === today.getTime();
        });
        break;
      case "tomorrow":
        results = results.filter((consultation) => {
          const consultationDate = new Date(consultation.date);
          consultationDate.setHours(0, 0, 0, 0);
          return consultationDate.getTime() === tomorrow.getTime();
        });
        break;
      case "thisWeek":
        results = results.filter((consultation) => {
          const consultationDate = new Date(consultation.date);
          return consultationDate >= today && consultationDate < nextWeek;
        });
        break;
      case "lastWeek":
        results = results.filter((consultation) => {
          const consultationDate = new Date(consultation.date);
          return consultationDate >= lastWeek && consultationDate < today;
        });
        break;
      case "upcoming":
        results = results.filter((consultation) => {
          return new Date(consultation.date) >= today;
        });
        break;
      case "past":
        results = results.filter((consultation) => {
          return new Date(consultation.date) < today;
        });
        break;
      case "all":
      default:
        // 모든 날짜 포함
        break;
    }

    // 결과 날짜순 정렬 (과거순)
    results.sort((a, b) => new Date(a.date) - new Date(b.date));

    setFilteredConsultations(results);
    setCurrentPage(1);
  }, [searchTerm, filterOptions, consultations]);

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

  const handleAddConsultation = () => {
    setSelectedConsultation(null);
    setShowModal(true);
  };

  const handleConsultationClick = (consultation) => {
    setSelectedConsultation(consultation);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedConsultation(null);
  };

  const handleSaveConsultation = (consultationData) => {
    if (selectedConsultation) {
      // 기존 상담 정보 수정
      setConsultations(
        consultations.map((consultation) =>
          consultation.id === selectedConsultation.id
            ? { ...consultation, ...consultationData }
            : consultation
        )
      );
    } else {
      // 새 상담 추가
      const newConsultation = {
        id: consultations.length + 1,
        ...consultationData,
        createdAt: new Date(),
      };
      setConsultations([...consultations, newConsultation]);
    }
    setShowModal(false);
  };

  const handleDeleteConsultation = (id) => {
    setConsultations(
      consultations.filter((consultation) => consultation.id !== id)
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 페이지네이션 계산
  const indexOfLastConsultation = currentPage * consultationsPerPage;
  const indexOfFirstConsultation =
    indexOfLastConsultation - consultationsPerPage;
  const currentConsultations = filteredConsultations.slice(
    indexOfFirstConsultation,
    indexOfLastConsultation
  );
  const totalPages = Math.ceil(
    filteredConsultations.length / consultationsPerPage
  );

  // 날짜/시간 포맷 함수
  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString("ko-KR", options);
  };

  const formatTime = (date) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    return new Date(date).toLocaleTimeString("ko-KR", options);
  };

  // 상담 유형에 따른 디스플레이 이름
  const getConsultationType = (type) => {
    switch (type) {
      case "initial":
        return "초기 상담";
      case "followup":
        return "후속 상담";
      case "online":
        return "온라인 상담";
      case "procedure-specific":
        return "시술 상담";
      default:
        return "기타";
    }
  };

  // 상태에 따른 배지 렌더링
  const renderStatusBadge = (status) => {
    switch (status) {
      case "scheduled":
        return (
          <span className="status-badge scheduled">
            <Calendar size={14} /> 예약됨
          </span>
        );
      case "completed":
        return (
          <span className="status-badge completed">
            <CheckCircle size={14} /> 완료
          </span>
        );
      case "canceled":
        return (
          <span className="status-badge canceled">
            <XCircle size={14} /> 취소됨
          </span>
        );
      case "pending":
        return (
          <span className="status-badge pending">
            <Clock size={14} /> 대기중
          </span>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-spinner"></div>
        <p>상담 데이터 로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="consultation-management">
      <div className="admin-section-header">
        <h2 className="admin-section-title">상담 관리</h2>
        <p className="admin-section-description">
          성형 상담 예약을 관리하고 상담 내용을 기록할 수 있습니다.
        </p>
      </div>

      <div className="consultation-management-actions">
        <div className="consultation-management-search-filter-container">
          <div className="consultation-management-admin-search-bar">
            <Search size={18} className="consultation-management-search-icon" />
            <input
              type="text"
              placeholder="고객 이름, 연락처, 관심 시술 검색..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="consultation-management-admin-search-input"
            />
          </div>

          <button
            className="admin-button admin-button-secondary"
            onClick={toggleFilters}
          >
            <Filter size={16} />
            필터
          </button>
        </div>

        <div className="consultation-action-buttons">
          <button className="admin-button admin-button-secondary">
            <Download size={16} />
            내보내기
          </button>
          <button
            className="admin-button admin-button-primary"
            onClick={handleAddConsultation}
          >
            <Plus size={16} />
            상담 등록
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="consultation-filters">
          <div className="filter-group">
            <label className="filter-label">상태</label>
            <div className="filter-options">
              <button
                className={`filter-option ${
                  filterOptions.status === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "all")}
              >
                전체
              </button>
              <button
                className={`filter-option ${
                  filterOptions.status === "pending" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "pending")}
              >
                대기중
              </button>
              <button
                className={`filter-option ${
                  filterOptions.status === "scheduled" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "scheduled")}
              >
                예약됨
              </button>
              <button
                className={`filter-option ${
                  filterOptions.status === "completed" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "completed")}
              >
                완료
              </button>
              <button
                className={`filter-option ${
                  filterOptions.status === "canceled" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "canceled")}
              >
                취소됨
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">상담 유형</label>
            <div className="filter-options">
              <button
                className={`filter-option ${
                  filterOptions.consultationType === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("consultationType", "all")}
              >
                전체
              </button>
              <button
                className={`filter-option ${
                  filterOptions.consultationType === "initial" ? "active" : ""
                }`}
                onClick={() =>
                  handleFilterChange("consultationType", "initial")
                }
              >
                초기 상담
              </button>
              <button
                className={`filter-option ${
                  filterOptions.consultationType === "followup" ? "active" : ""
                }`}
                onClick={() =>
                  handleFilterChange("consultationType", "followup")
                }
              >
                후속 상담
              </button>
              <button
                className={`filter-option ${
                  filterOptions.consultationType === "online" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("consultationType", "online")}
              >
                온라인 상담
              </button>
              <button
                className={`filter-option ${
                  filterOptions.consultationType === "procedure-specific"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  handleFilterChange("consultationType", "procedure-specific")
                }
              >
                시술 상담
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">날짜</label>
            <div className="filter-options">
              <button
                className={`filter-option ${
                  filterOptions.dateRange === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "all")}
              >
                전체
              </button>
              <button
                className={`filter-option ${
                  filterOptions.dateRange === "today" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "today")}
              >
                오늘
              </button>
              <button
                className={`filter-option ${
                  filterOptions.dateRange === "tomorrow" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "tomorrow")}
              >
                내일
              </button>
              <button
                className={`filter-option ${
                  filterOptions.dateRange === "thisWeek" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "thisWeek")}
              >
                이번 주
              </button>
              <button
                className={`filter-option ${
                  filterOptions.dateRange === "upcoming" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "upcoming")}
              >
                예정된 상담
              </button>
              <button
                className={`filter-option ${
                  filterOptions.dateRange === "past" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "past")}
              >
                지난 상담
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="consultation-list-header">
        <h3 className="consultation-list-title">상담 목록</h3>
        <div className="consultation-count">
          총{" "}
          <span className="count-highlight">
            {filteredConsultations.length}
          </span>
          건
        </div>
      </div>

      {filteredConsultations.length === 0 ? (
        <div className="admin-empty-state">
          <div className="admin-empty-icon">
            <MessageSquare size={32} />
          </div>
          <h3 className="admin-empty-title">상담 정보가 없습니다</h3>
          <p className="admin-empty-description">
            검색 조건에 맞는 상담이 없습니다. 다른 검색어나 필터를 사용해보세요.
          </p>
        </div>
      ) : (
        <>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>고객 정보</th>
                  <th>상담 일시</th>
                  <th>상담 유형</th>
                  <th>상태</th>
                  <th>관심 시술</th>
                  <th>메모</th>
                  <th>담당자</th>
                  <th>작업</th>
                </tr>
              </thead>
              <tbody>
                {currentConsultations.map((consultation) => (
                  <tr
                    key={consultation.id}
                    onClick={() => handleConsultationClick(consultation)}
                  >
                    <td>
                      <div className="client-info">
                        <span className="client-name">
                          {consultation.clientName}
                        </span>
                        <div className="client-details">
                          <span>
                            {consultation.gender} / {consultation.age}세
                          </span>
                          <span>{consultation.phoneNumber}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="consultation-datetime">
                        <div className="consultation-date">
                          {formatDate(consultation.date)}
                        </div>
                        <div className="consultation-time">
                          {formatTime(consultation.date)} (
                          {consultation.duration}분)
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="consultation-type">
                        {getConsultationType(consultation.type)}
                      </span>
                      {consultation.previousConsultation && (
                        <span className="previous-badge">재방문</span>
                      )}
                    </td>
                    <td>{renderStatusBadge(consultation.status)}</td>
                    <td>
                      <div className="interest-list">
                        {consultation.interests.map((interest, index) => (
                          <span key={index} className="interest-tag">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="consultation-notes">
                        {consultation.notes ? (
                          <span>
                            {consultation.notes.substring(0, 50)}
                            {consultation.notes.length > 50 ? "..." : ""}
                          </span>
                        ) : (
                          <span className="no-notes">메모 없음</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="consultant">
                        {consultation.consultant}
                      </div>
                    </td>
                    <td>
                      <div
                        className="consultation-actions"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="action-button edit"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleConsultationClick(consultation);
                          }}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="action-button delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteConsultation(consultation.id);
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="admin-pagination">
              <button
                className={`admin-pagination-button ${
                  currentPage === 1 ? "disabled" : ""
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;

                // 현재 페이지 주변 5개의 페이지만 표시
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 2 &&
                    pageNumber <= currentPage + 2)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      className={`admin-pagination-button ${
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
                  // 생략 부호 표시
                  return (
                    <span key={pageNumber} className="pagination-ellipsis">
                      ...
                    </span>
                  );
                }

                return null;
              })}

              <button
                className={`admin-pagination-button ${
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

      {showModal && (
        <ConsultationModal
          consultation={selectedConsultation}
          onClose={handleCloseModal}
          onSave={handleSaveConsultation}
        />
      )}
    </div>
  );
};

export default ConsultationManagement;
