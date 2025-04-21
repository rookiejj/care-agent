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
  User,
  Calendar,
  Phone,
  Mail,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import "./DoctorManagement.css";
import DoctorModal from "./components/DoctorModal";

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    department: "all",
    status: "all",
  });

  // 페이지네이션 설정
  const doctorsPerPage = 10;

  useEffect(() => {
    // 실제 앱에서는 API 호출을 통해 의사 데이터를 가져옴
    // 여기서는 목업 데이터 사용
    const generateMockDoctors = () => {
      const mockDoctors = [];
      const departments = [
        "내과",
        "정형외과",
        "피부과",
        "소아과",
        "이비인후과",
        "치과",
        "신경과",
        "산부인과",
      ];
      const statuses = ["active", "vacation", "leave", "inactive"];

      for (let i = 1; i <= 20; i++) {
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
        const name = firstName + lastName + " 의사";

        const department =
          departments[Math.floor(Math.random() * departments.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const gender = ["남성", "여성"][Math.floor(Math.random() * 2)];
        const phoneNumber = `010-${1000 + Math.floor(Math.random() * 9000)}-${
          1000 + Math.floor(Math.random() * 9000)
        }`;
        const email = `${firstName}${lastName}${Math.floor(
          Math.random() * 100
        )}@example.com`;

        // 경력 생성
        const experienceYears = Math.floor(Math.random() * 30) + 1;

        // 전문 분야 생성
        const specialties = [
          "일반",
          "소화기",
          "순환기",
          "호흡기",
          "감염",
          "내분비",
          "류마티스",
          "신장",
          "혈액",
          "종양",
          "척추",
          "관절",
          "스포츠 의학",
          "재활",
          "통증 의학",
          "알레르기",
          "여드름",
          "아토피",
          "건선",
          "모발",
          "소아과학",
          "신생아",
          "발달",
          "청소년",
        ];

        const doctorSpecialties = [];
        const specialtyCount = Math.floor(Math.random() * 3) + 1;
        for (let j = 0; j < specialtyCount; j++) {
          const specialty =
            specialties[Math.floor(Math.random() * specialties.length)];
          if (!doctorSpecialties.includes(specialty)) {
            doctorSpecialties.push(specialty);
          }
        }

        // 일정 생성
        const schedule = {
          monday: "09:00 - 18:00",
          tuesday: "09:00 - 18:00",
          wednesday: "09:00 - 18:00",
          thursday: "09:00 - 18:00",
          friday: "09:00 - 18:00",
          saturday: Math.random() > 0.5 ? "09:00 - 13:00" : "휴진",
          sunday: "휴진",
        };

        // 오늘 예약 수
        const todayAppointments = Math.floor(Math.random() * 15);

        mockDoctors.push({
          id: i,
          name,
          department,
          status,
          gender,
          phoneNumber,
          email,
          specialties: doctorSpecialties,
          experienceYears,
          schedule,
          todayAppointments,
          totalPatients: Math.floor(Math.random() * 1000),
          joinDate: new Date(
            new Date().getFullYear() - Math.floor(Math.random() * 10),
            Math.floor(Math.random() * 12),
            Math.floor(Math.random() * 28) + 1
          ),
        });
      }

      return mockDoctors;
    };

    // 데이터 로딩 시뮬레이션
    setTimeout(() => {
      const mockDoctors = generateMockDoctors();
      setDoctors(mockDoctors);
      setFilteredDoctors(mockDoctors);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // 검색어와 필터 적용
    let results = [...doctors];

    // 검색어 필터링
    if (searchTerm) {
      results = results.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.phoneNumber.includes(searchTerm) ||
          (doctor.email &&
            doctor.email.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // 진료과 필터링
    if (filterOptions.department !== "all") {
      results = results.filter(
        (doctor) => doctor.department === filterOptions.department
      );
    }

    // 상태 필터링
    if (filterOptions.status !== "all") {
      results = results.filter(
        (doctor) => doctor.status === filterOptions.status
      );
    }

    // 결과 정렬 (기본: 의사 이름순)
    results.sort((a, b) => a.name.localeCompare(b.name));

    setFilteredDoctors(results);
    setCurrentPage(1);
  }, [searchTerm, filterOptions, doctors]);

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

  const handleAddDoctor = () => {
    setSelectedDoctor(null);
    setShowModal(true);
  };

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDoctor(null);
  };

  const handleSaveDoctor = (doctorData) => {
    if (selectedDoctor) {
      // 기존 의사 정보 수정
      setDoctors(
        doctors.map((doctor) =>
          doctor.id === selectedDoctor.id
            ? { ...doctor, ...doctorData }
            : doctor
        )
      );
    } else {
      // 새 의사 추가
      const newDoctor = {
        id: doctors.length + 1,
        ...doctorData,
        status: "active",
        todayAppointments: 0,
        totalPatients: 0,
        joinDate: new Date(),
      };
      setDoctors([...doctors, newDoctor]);
    }
    setShowModal(false);
  };

  const handleDeleteDoctor = (id) => {
    setDoctors(doctors.filter((doctor) => doctor.id !== id));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 진료과 목록 추출
  const departmentsList = [
    ...new Set(doctors.map((doctor) => doctor.department)),
  ];

  // 페이지네이션 계산
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  // 날짜 포맷 함수
  const formatDate = (date) => {
    if (!date || !(date instanceof Date)) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 상태에 따른 배지 렌더링
  const renderStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="status-badge active">
            <CheckCircle size={14} /> 근무중
          </span>
        );
      case "vacation":
        return (
          <span className="status-badge vacation">
            <Calendar size={14} /> 휴가
          </span>
        );
      case "leave":
        return (
          <span className="status-badge leave">
            <Clock size={14} /> 휴직
          </span>
        );
      case "inactive":
        return (
          <span className="status-badge inactive">
            <XCircle size={14} /> 비활성
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
        <p>의사 데이터 로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="doctor-management">
      <div className="admin-section-header">
        <h2 className="admin-section-title">의사 관리</h2>
        <p className="admin-section-description">
          병원에 소속된 의사 정보를 관리하고 일정을 확인할 수 있습니다.
        </p>
      </div>

      <div className="doctor-management-actions">
        <div className="search-filter-container">
          <div className="admin-search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="의사 이름, 진료과, 전화번호 검색..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="admin-search-input"
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

        <div className="doctor-action-buttons">
          <button className="admin-button admin-button-secondary">
            <Download size={16} />
            내보내기
          </button>
          <button
            className="admin-button admin-button-primary"
            onClick={handleAddDoctor}
          >
            <Plus size={16} />
            의사 등록
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="doctor-filters">
          <div className="filter-group">
            <label className="filter-label">진료과</label>
            <div className="filter-options">
              <button
                className={`filter-option ${
                  filterOptions.department === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("department", "all")}
              >
                전체
              </button>
              {departmentsList.map((department, index) => (
                <button
                  key={index}
                  className={`filter-option ${
                    filterOptions.department === department ? "active" : ""
                  }`}
                  onClick={() => handleFilterChange("department", department)}
                >
                  {department}
                </button>
              ))}
            </div>
          </div>

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
                  filterOptions.status === "active" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "active")}
              >
                근무중
              </button>
              <button
                className={`filter-option ${
                  filterOptions.status === "vacation" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "vacation")}
              >
                휴가
              </button>
              <button
                className={`filter-option ${
                  filterOptions.status === "leave" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "leave")}
              >
                휴직
              </button>
              <button
                className={`filter-option ${
                  filterOptions.status === "inactive" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "inactive")}
              >
                비활성
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="doctor-list-header">
        <h3 className="doctor-list-title">의사 목록</h3>
        <div className="doctor-count">
          총 <span className="count-highlight">{filteredDoctors.length}</span>명
        </div>
      </div>

      {filteredDoctors.length === 0 ? (
        <div className="admin-empty-state">
          <div className="admin-empty-icon">
            <User size={32} />
          </div>
          <h3 className="admin-empty-title">의사 정보가 없습니다</h3>
          <p className="admin-empty-description">
            검색 조건에 맞는 의사가 없습니다. 다른 검색어나 필터를 사용해보세요.
          </p>
        </div>
      ) : (
        <>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>이름</th>
                  <th>진료과</th>
                  <th>전문 분야</th>
                  <th>연락처</th>
                  <th>상태</th>
                  <th>오늘 예약</th>
                  <th>경력</th>
                  <th>작업</th>
                </tr>
              </thead>
              <tbody>
                {currentDoctors.map((doctor) => (
                  <tr key={doctor.id} onClick={() => handleDoctorClick(doctor)}>
                    <td>
                      <div className="doctor-name">{doctor.name}</div>
                    </td>
                    <td>{doctor.department}</td>
                    <td>
                      <div className="specialties-tags">
                        {doctor.specialties.map((specialty, index) => (
                          <span key={index} className="specialty-tag">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="doctor-contact">
                        <div className="doctor-phone">
                          <Phone size={14} />
                          {doctor.phoneNumber}
                        </div>
                        <div className="doctor-email">
                          <Mail size={14} />
                          {doctor.email}
                        </div>
                      </div>
                    </td>
                    <td>{renderStatusBadge(doctor.status)}</td>
                    <td>
                      <div className="appointment-count">
                        <Calendar size={14} />
                        {doctor.todayAppointments}건
                      </div>
                    </td>
                    <td>{doctor.experienceYears}년</td>
                    <td>
                      <div
                        className="doctor-actions"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="action-button edit"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDoctorClick(doctor);
                          }}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="action-button delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteDoctor(doctor.id);
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
        <DoctorModal
          doctor={selectedDoctor}
          onClose={handleCloseModal}
          onSave={handleSaveDoctor}
          departments={departmentsList}
        />
      )}
    </div>
  );
};

export default DoctorManagement;
