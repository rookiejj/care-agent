import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Filter,
  Calendar,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Download,
  Edit,
  Trash2,
} from "lucide-react";
import "./AppointmentManagement.css";
import AppointmentModal from "./components/AppointmentModal";

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterOptions, setFilterOptions] = useState({
    status: "all",
    dateRange: "today",
    doctor: "all",
  });
  const [viewMode, setViewMode] = useState("list"); // list, calendar

  // 페이지네이션 설정
  const appointmentsPerPage = 10;

  useEffect(() => {
    // 실제 앱에서는 API 호출을 통해 예약 데이터를 가져옴
    // 여기서는 목업 데이터 사용
    const generateMockAppointments = () => {
      const mockAppointments = [];
      const statuses = [
        "confirmed",
        "completed",
        "cancelled",
        "rescheduled",
        "noshow",
      ];
      const departments = [
        "내과",
        "정형외과",
        "피부과",
        "소아과",
        "이비인후과",
        "치과",
      ];
      const doctors = [
        { id: 1, name: "김의사", department: "내과" },
        { id: 2, name: "이의사", department: "정형외과" },
        { id: 3, name: "박의사", department: "피부과" },
        { id: 4, name: "최의사", department: "소아과" },
        { id: 5, name: "정의사", department: "이비인후과" },
        { id: 6, name: "강의사", department: "치과" },
      ];

      // 오늘 날짜의 0시 0분으로 설정 (시작점)
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // 지난 1주일부터 향후 3주일까지의 예약 생성
      const startDate = new Date(today);
      startDate.setDate(startDate.getDate() - 7);

      const endDate = new Date(today);
      endDate.setDate(endDate.getDate() + 21);

      let appointmentId = 1;

      // 날짜별 반복
      for (
        let currentDate = new Date(startDate);
        currentDate <= endDate;
        currentDate.setDate(currentDate.getDate() + 1)
      ) {
        // 병원 영업일만 (월-토)
        if (currentDate.getDay() !== 0) {
          // 하루 5-15개의 예약 생성
          const numAppointments = 5 + Math.floor(Math.random() * 11);

          for (let i = 0; i < numAppointments; i++) {
            // 예약 시간 (9시-18시)
            const hours = 9 + Math.floor(Math.random() * 9);
            const minutes = [0, 15, 30, 45][Math.floor(Math.random() * 4)];

            const appointmentDate = new Date(currentDate);
            appointmentDate.setHours(hours, minutes, 0, 0);

            // 방문 이유
            const visitReasons = [
              "정기 검진",
              "감기 증상",
              "두통",
              "복통",
              "알레르기",
              "피부 발진",
              "소화불량",
              "건강검진",
              "예방접종",
              "치아 통증",
              "상담",
            ];

            // 현재 시점 기준으로 과거 예약은 상태가 변경됨
            let status;
            if (appointmentDate < new Date()) {
              // 과거 예약: 완료, 취소, 노쇼 중 하나
              status = ["completed", "cancelled", "noshow"][
                Math.floor(Math.random() * 3)
              ];
            } else {
              // 미래 예약: 확정 또는 일정 변경
              status = ["confirmed", "rescheduled"][
                Math.floor(Math.random() * 2)
              ];
            }

            // 환자 생성
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
              "준서",
              "민서",
              "서준",
              "지영",
              "현우",
              "우식",
              "영호",
              "수진",
              "은비",
              "연수",
              "호영",
            ][Math.floor(Math.random() * 11)];
            const patientName = firstName + lastName;
            const phoneNumber = `010-${
              1000 + Math.floor(Math.random() * 9000)
            }-${1000 + Math.floor(Math.random() * 9000)}`;

            // 담당 의사 선택
            const doctor = doctors[Math.floor(Math.random() * doctors.length)];

            // 예약 생성
            mockAppointments.push({
              id: appointmentId++,
              patientName,
              patientId: Math.floor(Math.random() * 1000) + 1,
              phoneNumber,
              date: appointmentDate,
              doctor: doctor.name,
              department: doctor.department,
              status,
              reason:
                visitReasons[Math.floor(Math.random() * visitReasons.length)],
              note:
                Math.random() > 0.7
                  ? "특이사항: " +
                    ["약물 알레르기", "고혈압 환자", "당뇨 환자", "임산부"][
                      Math.floor(Math.random() * 4)
                    ]
                  : "",
              createdAt: new Date(
                appointmentDate.getTime() -
                  Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
              ),
            });
          }
        }
      }

      return mockAppointments.sort((a, b) => a.date - b.date);
    };

    // 데이터 로딩 시뮬레이션
    setTimeout(() => {
      const mockAppointments = generateMockAppointments();
      setAppointments(mockAppointments);
      setFilteredAppointments(mockAppointments);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // 검색어와 필터 적용
    let results = [...appointments];

    // 검색어 필터링
    if (searchTerm) {
      results = results.filter(
        (appointment) =>
          appointment.patientName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          appointment.phoneNumber.includes(searchTerm) ||
          appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 상태 필터링
    if (filterOptions.status !== "all") {
      results = results.filter(
        (appointment) => appointment.status === filterOptions.status
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
        results = results.filter((appointment) => {
          const appointmentDate = new Date(appointment.date);
          appointmentDate.setHours(0, 0, 0, 0);
          return appointmentDate.getTime() === today.getTime();
        });
        break;
      case "tomorrow":
        results = results.filter((appointment) => {
          const appointmentDate = new Date(appointment.date);
          appointmentDate.setHours(0, 0, 0, 0);
          return appointmentDate.getTime() === tomorrow.getTime();
        });
        break;
      case "thisWeek":
        results = results.filter((appointment) => {
          const appointmentDate = new Date(appointment.date);
          return appointmentDate >= today && appointmentDate < nextWeek;
        });
        break;
      case "lastWeek":
        results = results.filter((appointment) => {
          const appointmentDate = new Date(appointment.date);
          return appointmentDate >= lastWeek && appointmentDate < today;
        });
        break;
      case "all":
      default:
        // 모든 날짜 포함
        break;
    }

    // 의사 필터링
    if (filterOptions.doctor !== "all") {
      results = results.filter(
        (appointment) => appointment.doctor === filterOptions.doctor
      );
    }

    // 캘린더 뷰에서는 선택한 날짜의 예약만 필터링
    if (viewMode === "calendar") {
      results = results.filter((appointment) => {
        const appointmentDate = new Date(appointment.date);
        return (
          appointmentDate.getDate() === selectedDate.getDate() &&
          appointmentDate.getMonth() === selectedDate.getMonth() &&
          appointmentDate.getFullYear() === selectedDate.getFullYear()
        );
      });
    }

    // 결과 날짜순 정렬
    results.sort((a, b) => new Date(a.date) - new Date(b.date));

    setFilteredAppointments(results);
    setCurrentPage(1);
  }, [searchTerm, filterOptions, appointments, viewMode, selectedDate]);

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

  const handleAddAppointment = () => {
    setSelectedAppointment(null);
    setShowModal(true);
  };

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  const handleSaveAppointment = (appointmentData) => {
    if (selectedAppointment) {
      // 기존 예약 수정
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === selectedAppointment.id
            ? { ...appointment, ...appointmentData }
            : appointment
        )
      );
    } else {
      // 새 예약 추가
      const newAppointment = {
        id: appointments.length + 1,
        ...appointmentData,
        status: "confirmed",
        createdAt: new Date(),
      };
      setAppointments([...appointments, newAppointment]);
    }
    setShowModal(false);
  };

  const handleCancelAppointment = (id) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "cancelled" }
          : appointment
      )
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // 의사 목록 추출
  const doctorsList = [
    ...new Set(appointments.map((appointment) => appointment.doctor)),
  ];

  // 페이지네이션 계산
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );
  const totalPages = Math.ceil(
    filteredAppointments.length / appointmentsPerPage
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

  // 예약 상태에 따른 배지 렌더링
  const renderStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="status-badge confirmed">
            <CheckCircle size={14} /> 확정
          </span>
        );
      case "completed":
        return (
          <span className="status-badge completed">
            <CheckCircle size={14} /> 완료
          </span>
        );
      case "cancelled":
        return (
          <span className="status-badge cancelled">
            <XCircle size={14} /> 취소
          </span>
        );
      case "rescheduled":
        return (
          <span className="status-badge rescheduled">
            <Clock size={14} /> 일정변경
          </span>
        );
      case "noshow":
        return (
          <span className="status-badge noshow">
            <AlertCircle size={14} /> 노쇼
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
        <p>예약 데이터 로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="appointment-management">
      <div className="admin-section-header">
        <h2 className="admin-section-title">예약 관리</h2>
        <p className="admin-section-description">
          모든 예약을 조회하고 관리할 수 있습니다.
        </p>
      </div>

      <div className="appointment-management-actions">
        <div className="appointment-management-search-filter-container">
          <div className="appointment-management-admin-search-bar">
            <Search size={18} className="appointment-management-search-icon" />
            <input
              type="text"
              placeholder="환자 이름, 전화번호, 의사 검색..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="appointment-management-admin-search-input"
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

        <div className="view-mode-buttons">
          <button
            className={`view-mode-button ${
              viewMode === "list" ? "active" : ""
            }`}
            onClick={() => toggleViewMode("list")}
          >
            리스트 보기
          </button>
          <button
            className={`view-mode-button ${
              viewMode === "calendar" ? "active" : ""
            }`}
            onClick={() => toggleViewMode("calendar")}
          >
            캘린더 보기
          </button>
        </div>

        <div className="appointment-action-buttons">
          <button className="admin-button admin-button-secondary">
            <Download size={16} />
            내보내기
          </button>
          <button
            className="admin-button admin-button-primary"
            onClick={handleAddAppointment}
          >
            <Plus size={16} />
            예약 등록
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="appointment-filters">
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
                  filterOptions.status === "confirmed" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "confirmed")}
              >
                확정
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
                  filterOptions.status === "cancelled" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "cancelled")}
              >
                취소
              </button>
              <button
                className={`filter-option ${
                  filterOptions.status === "rescheduled" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "rescheduled")}
              >
                일정변경
              </button>
              <button
                className={`filter-option ${
                  filterOptions.status === "noshow" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "noshow")}
              >
                노쇼
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
                  filterOptions.dateRange === "lastWeek" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "lastWeek")}
              >
                지난 주
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">담당 의사</label>
            <div className="filter-options">
              <button
                className={`filter-option ${
                  filterOptions.doctor === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("doctor", "all")}
              >
                전체
              </button>
              {doctorsList.map((doctor, index) => (
                <button
                  key={index}
                  className={`filter-option ${
                    filterOptions.doctor === doctor ? "active" : ""
                  }`}
                  onClick={() => handleFilterChange("doctor", doctor)}
                >
                  {doctor}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="appointment-list-header">
        <h3 className="appointment-list-title">
          {viewMode === "list"
            ? "모든 예약"
            : `${selectedDate.getFullYear()}년 ${
                selectedDate.getMonth() + 1
              }월 ${selectedDate.getDate()}일 예약`}
        </h3>
        <div className="appointment-count">
          총{" "}
          <span className="count-highlight">{filteredAppointments.length}</span>
          건
        </div>
      </div>

      {viewMode === "list" ? (
        <>
          {filteredAppointments.length === 0 ? (
            <div className="admin-empty-state">
              <div className="admin-empty-icon">
                <Calendar size={32} />
              </div>
              <h3 className="admin-empty-title">예약이 없습니다</h3>
              <p className="admin-empty-description">
                검색 조건에 맞는 예약이 없습니다. 다른 검색어나 필터를
                사용해보세요.
              </p>
            </div>
          ) : (
            <>
              <div className="admin-table-container">
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <colgroup>
                      <col style={{ width: "150px" }} />
                      <col style={{ width: "120px" }} />
                      <col style={{ width: "100px" }} />
                      <col style={{ width: "100px" }} />
                      <col style={{ width: "120px" }} />
                      <col style={{ width: "120px" }} />
                      <col style={{ width: "80px" }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>환자 정보</th>
                        <th>일시</th>
                        <th>진료과</th>
                        <th>담당 의사</th>
                        <th>상태</th>
                        <th>방문 이유</th>
                        <th>작업</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentAppointments.map((appointment) => (
                        <tr
                          key={appointment.id}
                          onClick={() => handleAppointmentClick(appointment)}
                        >
                          <td>
                            <div className="patient-info">
                              <span className="patient-name">
                                {appointment.patientName}
                              </span>
                              <span className="patient-phone">
                                {appointment.phoneNumber}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="appointment-datetime">
                              <div className="appointment-date">
                                {formatDate(appointment.date)}
                              </div>
                              <div className="appointment-time">
                                {formatTime(appointment.date)}
                              </div>
                            </div>
                          </td>
                          <td> {appointment.department}</td>
                          <td> {appointment.doctor}</td>
                          <td> {renderStatusBadge(appointment.status)}</td>
                          <td> {appointment.reason}</td>
                          <td>
                            <div
                              className="appointment-management-table-actions"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                className="action-button edit"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAppointmentClick(appointment);
                                }}
                              >
                                <Edit size={16} />
                              </button>
                              {appointment.status === "confirmed" && (
                                <button
                                  className="action-button cancel"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCancelAppointment(appointment.id);
                                  }}
                                >
                                  <XCircle size={16} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
        </>
      ) : (
        <div className="calendar-view">
          <div className="calendar-navigation">
            <button
              className="calendar-nav-button"
              onClick={() => {
                const prevDate = new Date(selectedDate);
                prevDate.setDate(prevDate.getDate() - 1);
                handleDateChange(prevDate);
              }}
            >
              <ChevronLeft size={16} />
              이전 날짜
            </button>

            <div className="calendar-date-picker">
              <input
                type="date"
                value={selectedDate.toISOString().split("T")[0]}
                onChange={(e) => handleDateChange(new Date(e.target.value))}
                className="calendar-date-input"
              />
            </div>

            <button
              className="calendar-nav-button"
              onClick={() => {
                const nextDate = new Date(selectedDate);
                nextDate.setDate(nextDate.getDate() + 1);
                handleDateChange(nextDate);
              }}
            >
              다음 날짜
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="calendar-schedule">
            <div className="time-slots">
              {Array.from({ length: 10 }, (_, i) => i + 9).map((hour) => (
                <div key={hour} className="time-slot">
                  <div className="time-label">{`${hour}:00`}</div>
                  <div className="time-content">
                    {filteredAppointments
                      .filter((appointment) => {
                        const appointmentHour = new Date(
                          appointment.date
                        ).getHours();
                        return appointmentHour === hour;
                      })
                      .map((appointment) => (
                        <div
                          key={appointment.id}
                          className={`calendar-appointment ${appointment.status}`}
                          onClick={() => handleAppointmentClick(appointment)}
                        >
                          <div className="calendar-appointment-time">
                            {formatTime(appointment.date)}
                          </div>
                          <div className="calendar-appointment-info">
                            <div className="calendar-appointment-patient">
                              {appointment.patientName}
                            </div>
                            <div className="calendar-appointment-doctor">
                              {appointment.department} | {appointment.doctor}
                            </div>
                          </div>
                          <div className="calendar-appointment-status">
                            {renderStatusBadge(appointment.status)}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <AppointmentModal
          appointment={selectedAppointment}
          onClose={handleCloseModal}
          onSave={handleSaveAppointment}
          doctors={doctorsList}
        />
      )}
    </div>
  );
};

export default AppointmentManagement;
