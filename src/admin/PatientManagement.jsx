import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";
import "./PatientManagement.css";
import PatientCard from "./components/PatientCard";
import PatientModal from "./components/PatientModal";
import ExportButton from "./components/ExportButton";
import { formatPatientDataForExport } from "../utils/exportUtils";

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
    patientType: "all",
    serviceInterest: "all",
  });

  const patientsPerPage = 10;

  useEffect(() => {
    // 목업 데이터 생성 함수
    const generateMockPatients = () => {
      const mockPatients = [];
      const genders = ["남성", "여성"];
      const bloodTypes = ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"];
      const statuses = ["정기 방문", "신규 환자", "장기 미방문"];
      const patientTypes = ["일반 환자", "성형 고객", "복합 서비스"];

      // 성형 관련 관심사/서비스
      const cosmeticInterests = [
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
        "리프팅",
        "윤곽 성형",
      ];

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
        const patientType =
          patientTypes[Math.floor(Math.random() * patientTypes.length)];

        // 성형 관련 정보 추가
        const cosmeticInterestsCount = Math.floor(Math.random() * 4);
        const selectedInterests = [];
        for (let j = 0; j < cosmeticInterestsCount; j++) {
          const interest =
            cosmeticInterests[
              Math.floor(Math.random() * cosmeticInterests.length)
            ];
          if (!selectedInterests.includes(interest)) {
            selectedInterests.push(interest);
          }
        }

        const hasPreviousCosmeticProcedures = Math.random() > 0.7;
        const previousProcedures = hasPreviousCosmeticProcedures
          ? [
              cosmeticInterests[
                Math.floor(Math.random() * cosmeticInterests.length)
              ],
            ]
          : [];

        const hasBeforeAfterPhotos =
          patientType !== "일반 환자" && Math.random() > 0.5;

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
          patientType,
          cosmeticInterests: selectedInterests,
          previousProcedures,
          hasBeforeAfterPhotos,
          address: `서울시 ${
            ["강남구", "서초구", "종로구", "마포구", "송파구"][
              Math.floor(Math.random() * 5)
            ]
          } ${Math.floor(Math.random() * 100) + 1}번길 ${
            Math.floor(Math.random() * 100) + 1
          }`,
          insuranceType: [
            "국민건강보험",
            "의료급여",
            "자동차보험",
            "산재보험",
            "자비부담",
          ][Math.floor(Math.random() * 5)],
          medicalHistory:
            Math.random() > 0.7
              ? ["고혈압", "당뇨", "천식", "알레르기"][
                  Math.floor(Math.random() * 4)
                ]
              : "",
          upcomingAppointment:
            Math.random() > 0.7
              ? new Date(
                  new Date().getTime() +
                    Math.floor(Math.random() * 14 * 24 * 60 * 60 * 1000)
                )
              : null,
          recommendedBy:
            Math.random() > 0.6
              ? ["지인", "인터넷", "광고", "SNS"][Math.floor(Math.random() * 4)]
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
    }, 500);
  }, []);

  // 필터링 함수
  const applyFilters = () => {
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
            patient.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (patient.cosmeticInterests &&
            patient.cosmeticInterests.some((interest) =>
              interest.toLowerCase().includes(searchTerm.toLowerCase())
            ))
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

    // 환자 타입 필터링
    if (filterOptions.patientType !== "all") {
      results = results.filter(
        (patient) => patient.patientType === filterOptions.patientType
      );
    }

    // 관심 서비스 필터링
    if (filterOptions.serviceInterest !== "all") {
      results = results.filter(
        (patient) =>
          patient.cosmeticInterests &&
          patient.cosmeticInterests.includes(filterOptions.serviceInterest)
      );
    }

    return results;
  };

  // 필터와 검색어 변경 시 필터링 적용
  useEffect(() => {
    if (patients.length > 0) {
      const filteredResults = applyFilters();
      setFilteredPatients(filteredResults);
      setCurrentPage(1);
    }
  }, [searchTerm, filterOptions, patients]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // 필터 변경 핸들러
  const handleFilterChange = (filter, value) => {
    setFilterOptions((prev) => ({
      ...prev,
      [filter]: value,
    }));
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

  // 성형 관심 분야 목록
  const cosmeticInterestsList = [
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
    "리프팅",
    "윤곽 성형",
  ];

  // 필터 초기화 함수
  const resetFilters = () => {
    setFilterOptions({
      gender: "all",
      ageGroup: "all",
      visitStatus: "all",
      patientType: "all",
      serviceInterest: "all",
    });
    setSearchTerm("");
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
        <h2 className="admin-section-title">환자/고객 관리</h2>
        <p className="admin-section-description">
          모든 환자 및 성형 고객 정보를 조회하고 관리할 수 있습니다.
        </p>
      </div>

      <div className="patient-management-actions">
        <div className="patient-management-search-filter-container">
          <div className="patient-management-admin-search-bar">
            <Search size={18} className="patient-management-search-icon" />
            <input
              type="text"
              placeholder="환자/고객 이름, 전화번호, 관심 시술 검색..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="patient-management-admin-search-input"
            />
          </div>

          <button
            className={`admin-button admin-button-secondary ${
              showFilters ? "active-filter-button" : ""
            }`}
            onClick={toggleFilters}
            type="button"
          >
            <Filter size={16} />
            필터 {showFilters ? "닫기" : "열기"}
          </button>
        </div>

        <div className="patient-action-buttons">
          <ExportButton
            data={formatPatientDataForExport(filteredPatients)}
            filename="환자_목록"
            sheetName="환자 목록"
          />
          <button
            className="admin-button admin-button-primary"
            onClick={handleAddPatient}
            type="button"
          >
            <Plus size={16} />
            고객 등록
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="admin-filters">
          <div className="admin-filter-group">
            <label className="admin-filter-label">성별</label>
            <div className="admin-filter-options">
              <button
                type="button"
                className={`admin-filter-option ${
                  filterOptions.gender === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("gender", "all")}
              >
                전체
              </button>
              <button
                type="button"
                className={`admin-filter-option ${
                  filterOptions.gender === "남성" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("gender", "남성")}
              >
                남성
              </button>
              <button
                type="button"
                className={`admin-filter-option ${
                  filterOptions.gender === "여성" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("gender", "여성")}
              >
                여성
              </button>
            </div>
          </div>

          <div className="admin-filter-group">
            <label className="admin-filter-label">연령대</label>
            <div className="admin-filter-options">
              <button
                type="button"
                className={`admin-filter-option ${
                  filterOptions.ageGroup === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("ageGroup", "all")}
              >
                전체
              </button>
              <button
                type="button"
                className={`admin-filter-option ${
                  filterOptions.ageGroup === "0-19" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("ageGroup", "0-19")}
              >
                ~19세
              </button>
              <button
                type="button"
                className={`admin-filter-option ${
                  filterOptions.ageGroup === "20-39" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("ageGroup", "20-39")}
              >
                20~39세
              </button>
              <button
                type="button"
                className={`admin-filter-option ${
                  filterOptions.ageGroup === "40-59" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("ageGroup", "40-59")}
              >
                40~59세
              </button>
              <button
                type="button"
                className={`admin-filter-option ${
                  filterOptions.ageGroup === "60+" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("ageGroup", "60+")}
              >
                60세~
              </button>
            </div>
          </div>

          <div className="admin-filter-group">
            <label className="admin-filter-label">방문 상태</label>
            <div className="admin-filter-options">
              <button
                type="button"
                className={`admin-filter-option ${
                  filterOptions.visitStatus === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("visitStatus", "all")}
              >
                전체
              </button>
              <button
                type="button"
                className={`admin-filter-option ${
                  filterOptions.visitStatus === "정기 방문" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("visitStatus", "정기 방문")}
              >
                정기 방문
              </button>
              <button
                type="button"
                className={`admin-filter-option ${
                  filterOptions.visitStatus === "신규 환자" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("visitStatus", "신규 환자")}
              >
                신규 고객
              </button>
              <button
                type="button"
                className={`admin-filter-option ${
                  filterOptions.visitStatus === "장기 미방문" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("visitStatus", "장기 미방문")}
              >
                장기 미방문
              </button>
            </div>
          </div>

          {/* 고객 유형 필터 추가 */}
          <div className="admin-filter-group">
            <label className="admin-filter-label">고객 유형</label>
            <div className="admin-filter-options">
              <button
                type="button"
                className={`admin-filter-option ${
                  filterOptions.patientType === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("patientType", "all")}
              >
                전체
              </button>
              <button
                type="button"
                className={`admin-filter-option ${
                  filterOptions.patientType === "일반 환자" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("patientType", "일반 환자")}
              >
                일반 환자
              </button>
              <button
                type="button"
                className={`admin-filter-option ${
                  filterOptions.patientType === "성형 고객" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("patientType", "성형 고객")}
              >
                성형 고객
              </button>
              <button
                type="button"
                className={`admin-filter-option ${
                  filterOptions.patientType === "복합 서비스" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("patientType", "복합 서비스")}
              >
                복합 서비스
              </button>
            </div>
          </div>

          {/* 관심 시술 필터 추가 */}
          <div className="admin-filter-group">
            <label className="admin-filter-label">관심 시술</label>
            <div className="admin-filter-options">
              <button
                type="button"
                className={`admin-filter-option ${
                  filterOptions.serviceInterest === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("serviceInterest", "all")}
              >
                전체
              </button>
              {cosmeticInterestsList.map((interest, index) => (
                <button
                  type="button"
                  key={index}
                  className={`admin-filter-option ${
                    filterOptions.serviceInterest === interest ? "active" : ""
                  }`}
                  onClick={() =>
                    handleFilterChange("serviceInterest", interest)
                  }
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* 필터 초기화 버튼 추가 */}
          <div className="admin-filter-actions">
            <button
              type="button"
              className="admin-button admin-button-secondary"
              onClick={resetFilters}
            >
              필터 초기화
            </button>
          </div>
        </div>
      )}

      <div className="patient-list-header">
        <h3 className="patient-list-title">환자/고객 목록</h3>
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
          <h3 className="admin-empty-title">환자/고객이 없습니다</h3>
          <p className="admin-empty-description">
            검색 조건에 맞는 환자나 고객이 없습니다. 다른 검색어나 필터를
            사용해보세요.
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
                type="button"
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
                      type="button"
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
                type="button"
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
          cosmeticInterestsList={cosmeticInterestsList}
        />
      )}
    </div>
  );
};

export default PatientManagement;
