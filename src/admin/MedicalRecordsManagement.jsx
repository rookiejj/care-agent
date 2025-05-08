import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Filter,
  FileText,
  ChevronLeft,
  ChevronRight,
  Check,
  AlertCircle,
  Download,
  Edit,
  Trash2,
  Calendar,
  User,
  Stethoscope,
} from "lucide-react";
import "./MedicalRecordsManagement.css";
import MedicalRecordModal from "./components/MedicalRecordModal";

const MedicalRecordsManagement = () => {
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    department: "all",
    doctor: "all",
    dateRange: "all",
  });

  // 페이지네이션 설정
  const recordsPerPage = 10;

  useEffect(() => {
    // 실제 앱에서는 API 호출을 통해 진료 기록 데이터를 가져옴
    // 여기서는 목업 데이터 사용
    const generateMockMedicalRecords = () => {
      const mockRecords = [];
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
      const diagnosisTypes = [
        "감기",
        "위장염",
        "알레르기",
        "고혈압",
        "당뇨",
        "관절염",
        "피부염",
        "중이염",
        "충치",
        "편두통",
      ];
      const symptoms = [
        "발열",
        "기침",
        "두통",
        "복통",
        "관절통",
        "피부발진",
        "어지러움",
        "소화불량",
        "만성피로",
        "호흡곤란",
      ];
      const treatments = [
        "약물치료",
        "물리치료",
        "수술",
        "주사치료",
        "운동요법",
        "식이요법",
        "레이저치료",
        "정신요법",
      ];
      const medications = [
        "항생제",
        "진통제",
        "소염제",
        "제산제",
        "항히스타민제",
        "혈압약",
        "당뇨약",
        "스테로이드",
        "수면제",
        "비타민",
      ];

      // 날짜 범위 설정 (최근 3개월)
      const endDate = new Date();
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 3);

      for (let i = 0; i < 50; i++) {
        // 무작위 환자 정보
        const patientId = Math.floor(Math.random() * 1000) + 1;
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

        // 무작위 날짜 (최근 3개월 내)
        const recordDate = new Date(
          startDate.getTime() +
            Math.random() * (endDate.getTime() - startDate.getTime())
        );

        // 무작위 부서 및 의사
        const department =
          departments[Math.floor(Math.random() * departments.length)];
        const doctor =
          doctors.find((d) => d.department === department) ||
          doctors[Math.floor(Math.random() * doctors.length)];

        // 무작위 증상 (1-3개)
        const numSymptoms = Math.floor(Math.random() * 3) + 1;
        const recordSymptoms = [];
        for (let j = 0; j < numSymptoms; j++) {
          const symptom = symptoms[Math.floor(Math.random() * symptoms.length)];
          if (!recordSymptoms.includes(symptom)) {
            recordSymptoms.push(symptom);
          }
        }

        // 무작위 진단
        const diagnosis =
          diagnosisTypes[Math.floor(Math.random() * diagnosisTypes.length)];

        // 무작위 치료 (1-2개)
        const numTreatments = Math.floor(Math.random() * 2) + 1;
        const recordTreatments = [];
        for (let j = 0; j < numTreatments; j++) {
          const treatment =
            treatments[Math.floor(Math.random() * treatments.length)];
          if (!recordTreatments.includes(treatment)) {
            recordTreatments.push(treatment);
          }
        }

        // 무작위 약물 (0-3개)
        const numMedications = Math.floor(Math.random() * 4);
        const recordMedications = [];
        for (let j = 0; j < numMedications; j++) {
          const medication =
            medications[Math.floor(Math.random() * medications.length)];
          if (!recordMedications.includes(medication)) {
            recordMedications.push(medication);
          }
        }

        // 진료 기록 생성
        mockRecords.push({
          id: i + 1,
          patientId,
          patientName,
          date: recordDate,
          department,
          doctor: doctor.name,
          symptoms: recordSymptoms.join(", "),
          diagnosis,
          treatment: recordTreatments.join(", "),
          medication: recordMedications.join(", "),
          notes:
            Math.random() > 0.7
              ? "특이사항: " +
                [
                  "약물 알레르기 있음",
                  "고혈압 환자",
                  "당뇨 환자",
                  "임산부",
                  "정기 검진 필요",
                ][Math.floor(Math.random() * 5)]
              : "",
          createdBy: doctor.name,
          isReviewed: Math.random() > 0.3, // 70%는 검토됨
        });
      }

      return mockRecords.sort((a, b) => b.date - a.date);
    };

    // 데이터 로딩 시뮬레이션
    setTimeout(() => {
      const mockRecords = generateMockMedicalRecords();
      setMedicalRecords(mockRecords);
      setFilteredRecords(mockRecords);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // 검색어와 필터 적용
    let results = [...medicalRecords];

    // 검색어 필터링
    if (searchTerm) {
      results = results.filter(
        (record) =>
          record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.symptoms.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.doctor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 부서 필터링
    if (filterOptions.department !== "all") {
      results = results.filter(
        (record) => record.department === filterOptions.department
      );
    }

    // 의사 필터링
    if (filterOptions.doctor !== "all") {
      results = results.filter(
        (record) => record.doctor === filterOptions.doctor
      );
    }

    // 날짜 범위 필터링
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const lastThreeMonths = new Date(today);
    lastThreeMonths.setMonth(lastThreeMonths.getMonth() - 3);

    switch (filterOptions.dateRange) {
      case "today":
        results = results.filter((record) => {
          const recordDate = new Date(record.date);
          recordDate.setHours(0, 0, 0, 0);
          return recordDate.getTime() === today.getTime();
        });
        break;
      case "week":
        results = results.filter((record) => new Date(record.date) >= lastWeek);
        break;
      case "month":
        results = results.filter(
          (record) => new Date(record.date) >= lastMonth
        );
        break;
      case "threemonths":
        results = results.filter(
          (record) => new Date(record.date) >= lastThreeMonths
        );
        break;
      case "all":
      default:
        // 모든 날짜 포함
        break;
    }

    // 결과 날짜순 정렬 (최신순)
    results.sort((a, b) => new Date(b.date) - new Date(a.date));

    setFilteredRecords(results);
    setCurrentPage(1);
  }, [searchTerm, filterOptions, medicalRecords]);

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

  const handleAddRecord = () => {
    setSelectedRecord(null);
    setShowModal(true);
  };

  const handleRecordClick = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRecord(null);
  };

  const handleSaveRecord = (recordData) => {
    if (selectedRecord) {
      // 기존 기록 수정
      setMedicalRecords(
        medicalRecords.map((record) =>
          record.id === selectedRecord.id
            ? { ...record, ...recordData }
            : record
        )
      );
    } else {
      // 새 기록 추가
      const newRecord = {
        id: medicalRecords.length + 1,
        ...recordData,
        date: new Date(),
        createdBy: "현재 로그인 의사", // 실제 앱에서는 로그인한 의사 정보를 사용
        isReviewed: false,
      };
      setMedicalRecords([newRecord, ...medicalRecords]);
    }
    setShowModal(false);
  };

  const handleDeleteRecord = (id) => {
    setMedicalRecords(medicalRecords.filter((record) => record.id !== id));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 페이지네이션 계산
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  // 의사 및 부서 목록 추출
  const departmentsList = [
    ...new Set(medicalRecords.map((record) => record.department)),
  ];
  const doctorsList = [
    ...new Set(medicalRecords.map((record) => record.doctor)),
  ];

  // 날짜 포맷 함수
  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString("ko-KR", options);
  };

  if (isLoading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-spinner"></div>
        <p>진료 기록 데이터 로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="medical-records-management">
      <div className="admin-section-header">
        <h2 className="admin-section-title">진료 기록 관리</h2>
        <p className="admin-section-description">
          환자의 진료 기록을 조회하고 관리할 수 있습니다.
        </p>
      </div>

      <div className="records-management-actions">
        <div className="records-search-filter-container">
          <div className="records-admin-search-bar">
            <Search size={18} className="records-search-icon" />
            <input
              type="text"
              placeholder="환자 이름, 진단명, 증상, 의사 검색..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="records-admin-search-input"
            />
          </div>

          <button
            className="admin-button admin-button-secondary filter-button"
            onClick={toggleFilters}
            style={{ flexShrink: 0 }}
          >
            <Filter size={16} style={{ marginRight: "4px" }} />
            필터
          </button>
        </div>

        <div className="records-action-buttons">
          <button className="admin-button admin-button-secondary">
            <Download size={16} />
            내보내기
          </button>
          <button
            className="admin-button admin-button-primary"
            onClick={handleAddRecord}
          >
            <Plus size={16} />
            진료 기록 작성
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="records-filters">
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
            <label className="filter-label">의사</label>
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

          <div className="filter-group">
            <label className="filter-label">기간</label>
            <div className="filter-options">
              <button
                className={`filter-option ${
                  filterOptions.dateRange === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "all")}
              >
                전체 기간
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
                  filterOptions.dateRange === "week" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "week")}
              >
                최근 1주
              </button>
              <button
                className={`filter-option ${
                  filterOptions.dateRange === "month" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "month")}
              >
                최근 1개월
              </button>
              <button
                className={`filter-option ${
                  filterOptions.dateRange === "threemonths" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "threemonths")}
              >
                최근 3개월
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="records-list-header">
        <h3 className="records-list-title">진료 기록</h3>
        <div className="records-count">
          총 <span className="count-highlight">{filteredRecords.length}</span>건
        </div>
      </div>

      {filteredRecords.length === 0 ? (
        <div className="admin-empty-state">
          <div className="admin-empty-icon">
            <FileText size={32} />
          </div>
          <h3 className="admin-empty-title">진료 기록이 없습니다</h3>
          <p className="admin-empty-description">
            검색 조건에 맞는 진료 기록이 없습니다. 다른 검색어나 필터를
            사용해보세요.
          </p>
        </div>
      ) : (
        <>
          <div className="admin-table-container">
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>날짜</th>
                    <th>환자 정보</th>
                    <th>진료과</th>
                    <th>담당 의사</th>
                    <th>증상</th>
                    <th>진단</th>
                    <th>상태</th>
                    <th>작업</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((record) => (
                    <tr
                      key={record.id}
                      onClick={() => handleRecordClick(record)}
                      className="record-row"
                    >
                      <td>{formatDate(record.date)}</td>
                      <td>
                        <div className="patient-info">
                          <span className="patient-name">
                            {record.patientName}
                          </span>
                          <span className="patient-id">
                            ID: {record.patientId}
                          </span>
                        </div>
                      </td>
                      <td>{record.department}</td>
                      <td>{record.doctor}</td>
                      <td className="symptoms-cell">
                        <div className="symptoms-content">
                          {record.symptoms}
                        </div>
                      </td>
                      <td>{record.diagnosis}</td>
                      <td>
                        <span
                          className={`record-status ${
                            record.isReviewed ? "reviewed" : "pending"
                          }`}
                        >
                          {record.isReviewed ? (
                            <>
                              <Check size={14} /> 검토완료
                            </>
                          ) : (
                            <>
                              <AlertCircle size={14} /> 검토대기
                            </>
                          )}
                        </span>
                      </td>
                      <td>
                        <div
                          className="records-table-actions"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            className="action-button edit"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRecordClick(record);
                            }}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="action-button delete"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteRecord(record.id);
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
        <MedicalRecordModal
          record={selectedRecord}
          onClose={handleCloseModal}
          onSave={handleSaveRecord}
          departments={departmentsList}
          doctors={doctorsList}
        />
      )}
    </div>
  );
};

export default MedicalRecordsManagement;
