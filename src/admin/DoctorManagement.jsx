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
  Camera,
  Scissors,
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
    doctorType: "all", // 의사 타입 필터 추가 (일반/성형)
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
        "성형외과", // 성형 관련 과 추가
        "미용성형과", // 성형 관련 과 추가
        "피부미용과", // 성형 관련 과 추가
      ];
      const statuses = ["active", "vacation", "leave", "inactive"];
      const doctorTypes = ["일반 의사", "성형 전문의", "복합 진료"]; // 의사 타입 추가

      // 성형 관련 세부 전문 분야 추가
      const cosmeticSpecialties = [
        "안면 성형",
        "코 성형",
        "눈 성형",
        "지방 이식",
        "지방 흡입",
        "가슴 성형",
        "안티에이징",
        "보톡스/필러",
        "레이저 시술",
        "윤곽 성형",
        "모발 이식",
        "주름 개선",
        "리프팅",
        "쁘띠 성형",
        "메디컬 스킨케어",
      ];

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
          "준호",
          "민규",
          "서민",
          "지우",
          "현성",
          "우현",
          "영교",
          "수일",
          "은희",
          "연성",
          "호현",
        ][Math.floor(Math.random() * 11)];
        const name = firstName + lastName + " 의사";

        const doctorType =
          doctorTypes[Math.floor(Math.random() * doctorTypes.length)];

        // 의사 타입에 따라 부서 배정 확률 조정
        let department;
        if (doctorType === "성형 전문의") {
          // 성형 전문의는 성형 관련 과에 배정될 확률이 높음
          department = ["성형외과", "미용성형과", "피부미용과", "피부과"][
            Math.floor(Math.random() * 4)
          ];
        } else if (doctorType === "복합 진료") {
          // 복합 진료는 모든 과에 배정 가능
          department =
            departments[Math.floor(Math.random() * departments.length)];
        } else {
          // 일반 의사는 비성형 과에 배정될 확률이 높음
          department = departments.filter(
            (d) => !["성형외과", "미용성형과", "피부미용과"].includes(d)
          )[Math.floor(Math.random() * (departments.length - 3))];
        }

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

        // 의사 타입에 따라 전문 분야 선택
        if (
          doctorType === "성형 전문의" ||
          (doctorType === "복합 진료" && Math.random() > 0.5)
        ) {
          // 성형 전문 분야 추가
          const cosmeticSpecialtyCount = Math.floor(Math.random() * 3) + 1;
          for (let j = 0; j < cosmeticSpecialtyCount; j++) {
            const specialty =
              cosmeticSpecialties[
                Math.floor(Math.random() * cosmeticSpecialties.length)
              ];
            if (!doctorSpecialties.includes(specialty)) {
              doctorSpecialties.push(specialty);
            }
          }
        }

        // 일반 전문 분야 추가 (성형 전문의도 일부는 일반 전문 분야 가질 수 있음)
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

        // 성형 관련 추가 정보
        const hasCosmeticCertifications =
          (doctorType === "성형 전문의" || doctorType === "복합 진료") &&
          Math.random() > 0.3;
        const certifications = hasCosmeticCertifications
          ? ["미용성형 전문의", "국제성형외과학회 회원", "레이저 시술 인증"][
              Math.floor(Math.random() * 3)
            ]
          : "";

        const hasBeforeAfterGallery =
          doctorType === "성형 전문의" && Math.random() > 0.5;
        const galleryItemCount = hasBeforeAfterGallery
          ? Math.floor(Math.random() * 10) + 5
          : 0;

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
          doctorType, // 의사 타입 (일반/성형/복합)
          certifications, // 성형 관련 자격증
          hasBeforeAfterGallery, // 전후 사진 갤러리 보유 여부
          galleryItemCount, // 갤러리 항목 수
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
            doctor.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          doctor.specialties.some((specialty) =>
            specialty.toLowerCase().includes(searchTerm.toLowerCase())
          )
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

    // 의사 타입 필터링
    if (filterOptions.doctorType !== "all") {
      results = results.filter(
        (doctor) => doctor.doctorType === filterOptions.doctorType
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

  // 의사 타입에 따른 배지 렌더링
  const renderDoctorTypeBadge = (doctorType) => {
    switch (doctorType) {
      case "성형 전문의":
        return (
          <span className="doctor-type-badge cosmetic">
            <Scissors size={14} /> 성형 전문
          </span>
        );
      case "복합 진료":
        return (
          <span className="doctor-type-badge combined">
            <User size={14} /> 복합 진료
          </span>
        );
      case "일반 의사":
      default:
        return (
          <span className="doctor-type-badge regular">
            <User size={14} /> 일반 진료
          </span>
        );
    }
  };

  // 갤러리 정보 렌더링
  const renderGalleryInfo = (doctor) => {
    if (doctor.hasBeforeAfterGallery) {
      return (
        <div className="gallery-info">
          <Camera size={14} />
          <span>{doctor.galleryItemCount}장</span>
        </div>
      );
    }
    return null;
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
        <h2 className="admin-section-title">의료진 관리</h2>
        <p className="admin-section-description">
          병원/성형 시설에 소속된 의사 정보를 관리하고 일정을 확인할 수
          있습니다.
        </p>
      </div>

      <div className="doctor-management-actions">
        <div className="doctor-management-search-filter-container">
          <div className="doctor-management-admin-search-bar">
            <Search size={18} className="doctor-management-search-icon" />
            <input
              type="text"
              placeholder="의사 이름, 진료과, 전문분야 검색..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="doctor-management-admin-search-input"
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
        <div className="admin-filters">
          <div className="admin-filter-group">
            <label className="admin-filter-label">진료과</label>
            <div className="admin-filter-options">
              <button
                className={`admin-filter-option ${
                  filterOptions.department === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("department", "all")}
              >
                전체
              </button>
              {departmentsList.map((department, index) => (
                <button
                  key={index}
                  className={`admin-filter-option ${
                    filterOptions.department === department ? "active" : ""
                  }`}
                  onClick={() => handleFilterChange("department", department)}
                >
                  {department}
                </button>
              ))}
            </div>
          </div>

          <div className="admin-filter-group">
            <label className="admin-filter-label">상태</label>
            <div className="admin-filter-options">
              <button
                className={`admin-filter-option ${
                  filterOptions.status === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "all")}
              >
                전체
              </button>
              <button
                className={`admin-filter-option ${
                  filterOptions.status === "active" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "active")}
              >
                근무중
              </button>
              <button
                className={`admin-filter-option ${
                  filterOptions.status === "vacation" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "vacation")}
              >
                휴가
              </button>
              <button
                className={`admin-filter-option ${
                  filterOptions.status === "leave" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "leave")}
              >
                휴직
              </button>
              <button
                className={`admin-filter-option ${
                  filterOptions.status === "inactive" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "inactive")}
              >
                비활성
              </button>
            </div>
          </div>

          {/* 의사 타입 필터 추가 */}
          <div className="admin-filter-group">
            <label className="admin-filter-label">의사 타입</label>
            <div className="admin-filter-options">
              <button
                className={`admin-filter-option ${
                  filterOptions.doctorType === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("doctorType", "all")}
              >
                전체
              </button>
              <button
                className={`admin-filter-option ${
                  filterOptions.doctorType === "일반 의사" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("doctorType", "일반 의사")}
              >
                일반 의사
              </button>
              <button
                className={`admin-filter-option ${
                  filterOptions.doctorType === "성형 전문의" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("doctorType", "성형 전문의")}
              >
                성형 전문의
              </button>
              <button
                className={`admin-filter-option ${
                  filterOptions.doctorType === "복합 진료" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("doctorType", "복합 진료")}
              >
                복합 진료
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
              <colgroup>
                <col style={{ minWidth: "130px" }} />
                <col style={{ minWidth: "100px" }} />
                <col style={{ minWidth: "100px" }} />
                <col style={{ minWidth: "130px" }} />
                <col style={{ minWidth: "180px" }} />
                <col style={{ minWidth: "180px" }} />
                <col style={{ minWidth: "100px" }} />
                <col style={{ minWidth: "100px" }} />
                <col style={{ minWidth: "80px" }} />
              </colgroup>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>진료과</th>
                  <th>의사 타입</th>
                  <th>전문 분야</th>
                  <th>연락처</th>
                  <th>상태</th>
                  <th>오늘 예약</th>
                  <th>갤러리</th>
                  <th>작업</th>
                </tr>
              </thead>
              <tbody>
                {currentDoctors.map((doctor) => (
                  <tr key={doctor.id} onClick={() => handleDoctorClick(doctor)}>
                    <td>
                      <div className="doctor-management-doctor-name">
                        {doctor.name}
                      </div>
                      {doctor.certifications && (
                        <div className="doctor-certification">
                          {doctor.certifications}
                        </div>
                      )}
                    </td>
                    <td>{doctor.department}</td>
                    <td>{renderDoctorTypeBadge(doctor.doctorType)}</td>
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
                    <td>{renderGalleryInfo(doctor)}</td>
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
          doctorTypes={["일반 의사", "성형 전문의", "복합 진료"]}
          cosmeticSpecialties={[
            "안면 성형",
            "코 성형",
            "눈 성형",
            "지방 이식",
            "지방 흡입",
            "가슴 성형",
            "안티에이징",
            "보톡스/필러",
            "레이저 시술",
            "윤곽 성형",
            "모발 이식",
            "주름 개선",
            "리프팅",
            "쁘띠 성형",
            "메디컬 스킨케어",
          ]}
        />
      )}
    </div>
  );
};

export default DoctorManagement;
