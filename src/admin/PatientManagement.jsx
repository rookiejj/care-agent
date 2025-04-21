import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  User,
  Phone,
  Calendar,
  Mail,
  FileText,
  Activity,
} from "lucide-react";
import "./PatientManagement.css";
import PatientCard from "./components/PatientCard";
import PatientModal from "./components/PatientModal";

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    gender: "all",
    ageGroup: "all",
    visitStatus: "all",
  });

  const patientsPerPage = 10;

  useEffect(() => {
    // 실제 앱에서는 API 호출을 통해 환자 데이터를 가져옴
    // 여기서는 목업 데이터 사용
    const generateMockPatients = () => {
      const mockPatients = [];
      const genders = ["남성", "여성"];
      const bloodTypes = ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"];
      const statuses = ["정기 방문", "신규 환자", "장기 미방문"];

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
        const middleName = [
          "우",
          "민",
          "서",
          "지",
          "현",
          "경",
          "영",
          "수",
          "은",
          "연",
          "호",
        ][Math.floor(Math.random() * 11)];

        const name =
          firstName + (Math.random() > 0.5 ? middleName : "") + lastName;
        const gender = genders[Math.floor(Math.random() * genders.length)];
        const age = 20 + Math.floor(Math.random() * 60);
        const birthDate = new Date(
          new Date().getFullYear() - age,
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 28) + 1
        );
        const phoneNumber = `010-${1000 + Math.floor(Math.random() * 9000)}-${
          1000 + Math.floor(Math.random() * 9000)
        }`;
        const email = `${name}${Math.floor(Math.random() * 1000)}@example.com`;
        const bloodType =
          bloodTypes[Math.floor(Math.random() * bloodTypes.length)];
        const lastVisit = new Date(
          new Date().getTime() -
            Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
        );
        const visitCount = Math.floor(Math.random() * 20) + 1;
        const status = statuses[Math.floor(Math.random() * statuses.length)];

        mockPatients.push({
          id: i,
          name,
          gender,
          age,
          birthDate,
          phoneNumber,
          email,
          bloodType,
          lastVisit,
          visitCount,
          status,
          address: `서울시 ${
            ["강남구", "서초구", "종로구", "마포구", "송파구"][
              Math.floor(Math.random() * 5)
            ]
          } ${Math.floor(Math.random() * 100) + 1}번길 ${
            Math.floor(Math.random() * 100) + 1
          }`,
          insuranceType: ["국민건강보험", "의료급여", "자동차보험", "산재보험"][
            Math.floor(Math.random() * 4)
          ],
          medicalHistory:
            Math.random() > 0.7
              ? ["고혈압", "당뇨", "천식"][Math.floor(Math.random() * 3)]
              : "",
          upcomingAppointment:
            Math.random() > 0.7
              ? new Date(
                  new Date().getTime() +
                    Math.floor(Math.random() * 14 * 24 * 60 * 60 * 1000)
                )
              : null,
        });
      }

      return mockPatients;
    };

    // 데이터 로딩 시뮬레이션
    setTimeout(() => {
      const mockPatients = generateMockPatients();
      setPatients(mockPatients);
      setFilteredPatients(mockPatients);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // 검색어와 필터 적용
    let results = [...patients];

    // 검색어 필터링
    if (searchTerm) {
      results = results.filter(
        (patient) =>
          patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.phoneNumber
            .replace(/-/g, "")
            .includes(searchTerm.replace(/-/g, "")) ||
          (patient.email &&
            patient.email.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // 성별 필터링
    if (filterOptions.gender !== "all") {
      results = results.filter(
        (patient) => patient.gender === filterOptions.gender
      );
    }

    // 연령대 필터링
    if (filterOptions.ageGroup !== "all") {
      const ageRanges = {
        "0-19": (age) => age < 20,
        "20-39": (age) => age >= 20 && age < 40,
        "40-59": (age) => age >= 40 && age < 60,
        "60+": (age) => age >= 60,
      };

      results = results.filter((patient) =>
        ageRanges[filterOptions.ageGroup](patient.age)
      );
    }

    // 방문 상태 필터링
    if (filterOptions.visitStatus !== "all") {
      results = results.filter(
        (patient) => patient.status === filterOptions.visitStatus
      );
    }

    setFilteredPatients(results);
    setCurrentPage(1);
  }, [searchTerm, filterOptions, patients]);

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

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setShowModal(true);
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPatient(null);
  };

  const handleSavePatient = (patientData) => {
    if (selectedPatient) {
      // 기존 환자 수정
      setPatients(
        patients.map((patient) =>
          patient.id === selectedPatient.id
            ? { ...patient, ...patientData }
            : patient
        )
      );
    } else {
      // 새 환자 추가
      const newPatient = {
        id: patients.length + 1,
        ...patientData,
        visitCount: 0,
        status: "신규 환자",
      };
      setPatients([...patients, newPatient]);
    }
    setShowModal(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 페이지네이션 계산
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );
  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  // 날짜 포맷 함수
  const formatDate = (date) => {
    if (!(date instanceof Date)) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (isLoading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-spinner"></div>
        <p>환자 데이터 로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="patient-management">
      <div className="admin-section-header">
        <h2 className="admin-section-title">환자 관리</h2>
        <p className="admin-section-description">
          모든 환자 정보를 조회하고 관리할 수 있습니다.
        </p>
      </div>

      <div className="patient-management-actions">
        <div className="patient-management-search-filter-container">
          <div className="patient-management-admin-search-bar">
            <Search size={18} className="patient-management-search-icon" />
            <input
              type="text"
              placeholder="환자 이름, 전화번호 검색..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="patient-management-admin-search-input"
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

        <div className="patient-action-buttons">
          <button className="admin-button admin-button-secondary">
            <Download size={16} />
            내보내기
          </button>
          <button
            className="admin-button admin-button-primary"
            onClick={handleAddPatient}
          >
            <Plus size={16} />
            환자 등록
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="patient-filters">
          <div className="filter-group">
            <label className="filter-label">성별</label>
            <div className="filter-options">
              <button
                className={`filter-option ${
                  filterOptions.gender === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("gender", "all")}
              >
                전체
              </button>
              <button
                className={`filter-option ${
                  filterOptions.gender === "남성" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("gender", "남성")}
              >
                남성
              </button>
              <button
                className={`filter-option ${
                  filterOptions.gender === "여성" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("gender", "여성")}
              >
                여성
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">연령대</label>
            <div className="filter-options">
              <button
                className={`filter-option ${
                  filterOptions.ageGroup === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("ageGroup", "all")}
              >
                전체
              </button>
              <button
                className={`filter-option ${
                  filterOptions.ageGroup === "0-19" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("ageGroup", "0-19")}
              >
                ~19세
              </button>
              <button
                className={`filter-option ${
                  filterOptions.ageGroup === "20-39" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("ageGroup", "20-39")}
              >
                20~39세
              </button>
              <button
                className={`filter-option ${
                  filterOptions.ageGroup === "40-59" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("ageGroup", "40-59")}
              >
                40~59세
              </button>
              <button
                className={`filter-option ${
                  filterOptions.ageGroup === "60+" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("ageGroup", "60+")}
              >
                60세~
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">방문 상태</label>
            <div className="filter-options">
              <button
                className={`filter-option ${
                  filterOptions.visitStatus === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("visitStatus", "all")}
              >
                전체
              </button>
              <button
                className={`filter-option ${
                  filterOptions.visitStatus === "정기 방문" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("visitStatus", "정기 방문")}
              >
                정기 방문
              </button>
              <button
                className={`filter-option ${
                  filterOptions.visitStatus === "신규 환자" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("visitStatus", "신규 환자")}
              >
                신규 환자
              </button>
              <button
                className={`filter-option ${
                  filterOptions.visitStatus === "장기 미방문" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("visitStatus", "장기 미방문")}
              >
                장기 미방문
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="patient-list-header">
        <h3 className="patient-list-title">환자 목록</h3>
        <div className="patient-count">
          총 <span className="count-highlight">{filteredPatients.length}</span>
          명
        </div>
      </div>

      {currentPatients.length === 0 ? (
        <div className="admin-empty-state">
          <div className="admin-empty-icon">
            <User size={32} />
          </div>
          <h3 className="admin-empty-title">환자가 없습니다</h3>
          <p className="admin-empty-description">
            검색 조건에 맞는 환자가 없습니다. 다른 검색어나 필터를 사용해보세요.
          </p>
        </div>
      ) : (
        <>
          <div className="patient-cards">
            {currentPatients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onClick={() => handlePatientClick(patient)}
              />
            ))}
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
        <PatientModal
          patient={selectedPatient}
          onClose={handleCloseModal}
          onSave={handleSavePatient}
        />
      )}
    </div>
  );
};

export default PatientManagement;
