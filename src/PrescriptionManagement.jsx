import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "./App";
import {
  Calendar,
  Clock,
  Search,
  FileText,
  ChevronRight,
  ChevronDown,
  Pill,
  Package,
  Repeat,
  AlertCircle,
  Download,
  Share2,
  X,
  ExternalLink,
  Phone,
  MapPin,
} from "lucide-react";
import "./PrescriptionManagement.css";

const PrescriptionManagement = () => {
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedPrescriptions, setExpandedPrescriptions] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showDetail, setShowDetail] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  useEffect(() => {
    // 페이지 로드 시 스크롤을 상단으로 이동
    window.scrollTo(0, 0);

    // 더미 처방전 데이터 생성
    const dummyPrescriptions = [
      {
        id: 1,
        appointmentId: 101,
        hospitalName: "서울 연세 내과",
        doctorName: "김민석",
        department: "내과",
        date: "2025-03-15",
        time: "14:30",
        diagnosis: "급성 기관지염",
        medications: [
          {
            name: "아목시실린 500mg",
            dosage: "1일 3회, 식후 30분",
            duration: "5일간",
            note: "항생제",
          },
          {
            name: "기관지 확장제",
            dosage: "1일 2회, 아침/저녁",
            duration: "5일간",
            note: "기관지 확장",
          },
          {
            name: "타이레놀 500mg",
            dosage: "통증 시 1정",
            duration: "필요시",
            note: "해열진통제",
          },
        ],
        instructions: "충분한 휴식과 수분 섭취를 권장합니다.",
        refills: 0,
        expiryDate: "2025-04-15",
        pharmacyInfo: {
          name: "건강약국",
          phone: "02-123-4567",
          address: "서울시 강남구 테헤란로 123",
        },
        status: "dispensed", // dispensed, active, expired
        dispensedDate: "2025-03-15",
      },
      {
        id: 2,
        appointmentId: 102,
        hospitalName: "강남 피부과",
        doctorName: "이지원",
        department: "피부과",
        date: "2025-02-20",
        time: "11:00",
        diagnosis: "접촉성 피부염",
        medications: [
          {
            name: "프레드니솔론 연고",
            dosage: "1일 2회, 환부에 도포",
            duration: "7일간",
            note: "스테로이드 연고",
          },
          {
            name: "세티리진 10mg",
            dosage: "1일 1회, 취침 전",
            duration: "7일간",
            note: "항히스타민제",
          },
        ],
        instructions: "환부를 청결하게 유지하고 자극을 피하세요.",
        refills: 1,
        expiryDate: "2025-03-20",
        pharmacyInfo: {
          name: "메디팜 약국",
          phone: "02-456-7890",
          address: "서울시 강남구 역삼로 45",
        },
        status: "active", // dispensed, active, expired
        dispensedDate: "2025-02-20",
      },
      {
        id: 3,
        appointmentId: 103,
        hospitalName: "튼튼 정형외과",
        doctorName: "박준호",
        department: "정형외과",
        date: "2025-01-10",
        time: "15:45",
        diagnosis: "반월상 연골 손상",
        medications: [
          {
            name: "디클로페낙 75mg",
            dosage: "1일 2회, 식후",
            duration: "7일간",
            note: "소염진통제",
          },
          {
            name: "미오릴 4mg",
            dosage: "1일 3회, 식후",
            duration: "7일간",
            note: "근이완제",
          },
          {
            name: "판토록 40mg",
            dosage: "1일 1회, 아침 식전",
            duration: "7일간",
            note: "위장 보호제",
          },
        ],
        instructions:
          "관절에 무리가 가지 않도록 하고, 처방된 무릎 보호대를 착용하세요.",
        refills: 0,
        expiryDate: "2025-02-10",
        pharmacyInfo: {
          name: "미소약국",
          phone: "02-789-1234",
          address: "서울시 송파구 올림픽로 100",
        },
        status: "expired", // dispensed, active, expired
        dispensedDate: "2025-01-10",
      },
      {
        id: 4,
        appointmentId: 104,
        hospitalName: "마음사랑 정신건강의학과",
        doctorName: "최수진",
        department: "정신건강의학과",
        date: "2025-01-05",
        time: "13:00",
        diagnosis: "적응장애, 불안 증상",
        medications: [
          {
            name: "알프라졸람 0.25mg",
            dosage: "1일 1회, 취침 전",
            duration: "14일간",
            note: "수면유도제",
          },
          {
            name: "에스시탈로프람 10mg",
            dosage: "1일 1회, 아침",
            duration: "14일간",
            note: "항우울제",
          },
        ],
        instructions:
          "약물 복용 중 운전이나 위험한 기계 조작은 피하세요. 알코올 섭취를 삼가주세요.",
        refills: 1,
        expiryDate: "2025-02-05",
        pharmacyInfo: {
          name: "참사랑약국",
          phone: "02-345-6789",
          address: "서울시 마포구 와우산로 50",
        },
        status: "active", // dispensed, active, expired
        dispensedDate: "2025-01-05",
      },
      {
        id: 5,
        appointmentId: 105,
        hospitalName: "청각케어 이비인후과",
        doctorName: "강동훈",
        department: "이비인후과",
        date: "2024-12-15",
        time: "10:30",
        diagnosis: "급성 인후두염",
        medications: [
          {
            name: "세프트리악손 500mg",
            dosage: "1일 2회, 식후",
            duration: "5일간",
            note: "항생제",
          },
          {
            name: "암브록솔 시럽",
            dosage: "1일 3회, 식후",
            duration: "5일간",
            note: "진해거담제",
          },
          {
            name: "포비돈 가글액",
            dosage: "1일 3회, 식후 및 취침 전",
            duration: "7일간",
            note: "구강 살균제",
          },
        ],
        instructions: "목을 따뜻하게 하고 충분한 휴식을 취하세요.",
        refills: 0,
        expiryDate: "2025-01-15",
        pharmacyInfo: {
          name: "하나약국",
          phone: "02-987-6543",
          address: "서울시 종로구 종로 150",
        },
        status: "expired", // dispensed, active, expired
        dispensedDate: "2024-12-15",
      },
    ];

    setTimeout(() => {
      setPrescriptions(dummyPrescriptions);
      setIsLoading(false);
    }, 500); // 로딩 시뮬레이션
  }, []);

  // 처방전 확장/축소 토글 함수
  const togglePrescription = (id) => {
    setExpandedPrescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 상세 보기 함수
  const viewDetail = (prescription) => {
    setSelectedPrescription(prescription);
    setShowDetail(true);
  };

  // 처방전 필터링 함수
  const filterPrescriptions = () => {
    return prescriptions.filter((prescription) => {
      // 검색어 필터링
      const matchesSearch =
        prescription.hospitalName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        prescription.doctorName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        prescription.diagnosis
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        prescription.department
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        prescription.medications.some((med) =>
          med.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

      // 상태 필터링
      const matchesType =
        filterType === "all" || prescription.status === filterType;

      return matchesSearch && matchesType;
    });
  };

  // 상태 필터 옵션
  const filterOptions = [
    { value: "all", label: "전체 처방전" },
    { value: "active", label: "조제 가능" },
    { value: "dispensed", label: "처방 완료" },
    { value: "expired", label: "기간 만료" },
  ];

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    const dayName = dayNames[date.getDay()];

    return `${year}년 ${month}월 ${day}일 (${dayName})`;
  };

  // 상태에 따른 배지 컴포넌트
  const StatusBadge = ({ status }) => {
    switch (status) {
      case "active":
        return <span className="status-badge active">조제 가능</span>;
      case "dispensed":
        return <span className="status-badge dispensed">처방 완료</span>;
      case "expired":
        return <span className="status-badge expired">기간 만료</span>;
      default:
        return null;
    }
  };

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  // 상세 처방전 모달
  const PrescriptionDetailModal = () => {
    if (!selectedPrescription) return null;

    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">처방전 상세</h2>
            <button
              onClick={() => setShowDetail(false)}
              className="modal-close-button"
            >
              <X size={20} />
            </button>
          </div>

          <div className="modal-body">
            <div className="modal-prescription-header">
              <div className="modal-header-left">
                <h3 className="modal-hospital-name">
                  {selectedPrescription.hospitalName}
                </h3>
                <p className="modal-department">
                  {selectedPrescription.department} |{" "}
                  {selectedPrescription.doctorName} 의사
                </p>
              </div>
              <StatusBadge status={selectedPrescription.status} />
            </div>

            <div className="modal-date-section">
              <div className="modal-date-item">
                <div className="modal-date-icon">
                  <Calendar size={16} />
                </div>
                <div className="modal-date-content">
                  <p className="modal-date-label">처방일</p>
                  <p className="modal-date-value">
                    {formatDate(selectedPrescription.date)}
                  </p>
                </div>
              </div>

              <div className="modal-date-item">
                <div className="modal-date-icon">
                  <Clock size={16} />
                </div>
                <div className="modal-date-content">
                  <p className="modal-date-label">만료일</p>
                  <p className="modal-date-value">
                    {formatDate(selectedPrescription.expiryDate)}
                  </p>
                </div>
              </div>
            </div>

            <div className="modal-section">
              <h4 className="modal-section-title">진단명</h4>
              <p className="modal-section-content">
                {selectedPrescription.diagnosis}
              </p>

              <h4 className="modal-section-title">처방 약품</h4>
              <div className="medication-list">
                {selectedPrescription.medications.map((med, index) => (
                  <div key={index} className="medication-item">
                    <div className="medication-icon">
                      <Pill size={20} />
                    </div>
                    <div className="medication-content">
                      <h5 className="medication-name">{med.name}</h5>
                      <p className="medication-info">
                        <span className="dosage">{med.dosage}</span>
                        <span className="duration">{med.duration}</span>
                      </p>
                      {med.note && (
                        <p className="medication-note">{med.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {selectedPrescription.instructions && (
                <>
                  <h4 className="modal-section-title">복약 지시사항</h4>
                  <p className="modal-section-content">
                    {selectedPrescription.instructions}
                  </p>
                </>
              )}

              <h4 className="modal-section-title">재처방 정보</h4>
              <p className="modal-section-content">
                {selectedPrescription.refills > 0
                  ? `재처방 ${selectedPrescription.refills}회 가능`
                  : "재처방 불가"}
              </p>

              <h4 className="modal-section-title">조제 약국</h4>
              <div className="pharmacy-info">
                <h5 className="pharmacy-name">
                  {selectedPrescription.pharmacyInfo.name}
                </h5>
                <div className="pharmacy-contact">
                  <div className="pharmacy-contact-item">
                    <Phone size={16} />
                    <span>{selectedPrescription.pharmacyInfo.phone}</span>
                  </div>
                  <div className="pharmacy-contact-item">
                    <MapPin size={16} />
                    <span>{selectedPrescription.pharmacyInfo.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="modal-actions">
              <button className="modal-action-button">
                <Download size={16} />
                <span>처방전 저장</span>
              </button>
              <button className="modal-action-button">
                <Share2 size={16} />
                <span>공유하기</span>
              </button>
              {selectedPrescription.status === "active" && (
                <button className="modal-action-button primary">
                  <ExternalLink size={16} />
                  <span>약국 찾기</span>
                </button>
              )}
            </div> */}
          </div>
        </div>
      </div>
    );
  };

  const filteredPrescriptions = filterPrescriptions();

  return (
    <div className="container">
      <div className="fixed-header">
        <PageHeader
          title="처방전 관리"
          backButtonVisible={true}
          onBack={handleBackClick}
        />
      </div>

      <div className="prescription-content">
        <div className="search-filter-area">
          <div className="search-input-container">
            <div className="search-icon">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="병원명, 의사, 약품명 검색..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>처방전 정보를 불러오는 중...</p>
          </div>
        ) : filteredPrescriptions.length === 0 ? (
          <div className="empty-container">
            <FileText size={40} className="empty-icon" />
            <p className="empty-text">처방전이 없거나 검색 결과가 없습니다.</p>
          </div>
        ) : (
          <div className="prescription-list">
            {filteredPrescriptions.map((prescription) => (
              <div key={prescription.id} className="prescription-card">
                <div
                  className="prescription-header"
                  onClick={() => togglePrescription(prescription.id)}
                >
                  <div className="prescription-title-area">
                    <h3 className="prescription-title">
                      {prescription.hospitalName}
                    </h3>
                    <p className="prescription-subtitle">
                      {prescription.department} |{" "}
                      {formatDate(prescription.date)}
                    </p>
                  </div>
                  <div className="prescription-status-arrow">
                    <StatusBadge status={prescription.status} />
                    {expandedPrescriptions[prescription.id] ? (
                      <ChevronDown
                        size={20}
                        className="prescription-arrow expanded"
                      />
                    ) : (
                      <ChevronRight size={20} className="prescription-arrow" />
                    )}
                  </div>
                </div>

                {expandedPrescriptions[prescription.id] && (
                  <div className="prescription-content-expanded">
                    <div className="prescription-info-section">
                      <div className="prescription-info-item">
                        <FileText
                          size={16}
                          className="prescription-info-icon"
                        />
                        <div className="prescription-info-content">
                          <p className="prescription-info-label">진단명</p>
                          <p className="prescription-info-value">
                            {prescription.diagnosis}
                          </p>
                        </div>
                      </div>

                      <div className="prescription-info-item">
                        <Package size={16} className="prescription-info-icon" />
                        <div className="prescription-info-content">
                          <p className="prescription-info-label">약품 수</p>
                          <p className="prescription-info-value">
                            {prescription.medications.length}개 약품
                          </p>
                        </div>
                      </div>

                      <div className="prescription-info-item">
                        <Clock size={16} className="prescription-info-icon" />
                        <div className="prescription-info-content">
                          <p className="prescription-info-label">만료일</p>
                          <p className="prescription-info-value">
                            {formatDate(prescription.expiryDate)}
                          </p>
                        </div>
                      </div>

                      <div className="prescription-info-item">
                        <Repeat size={16} className="prescription-info-icon" />
                        <div className="prescription-info-content">
                          <p className="prescription-info-label">재처방</p>
                          <p className="prescription-info-value">
                            {prescription.refills > 0
                              ? `${prescription.refills}회 가능`
                              : "불가"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="prescription-medications">
                      <p className="medication-title">처방 약품</p>
                      <ul className="medication-summary">
                        {prescription.medications
                          .slice(0, 2)
                          .map((med, index) => (
                            <li key={index} className="medication-summary-item">
                              <Pill
                                size={14}
                                className="medication-summary-icon"
                              />
                              <span>{med.name}</span>
                            </li>
                          ))}
                        {prescription.medications.length > 2 && (
                          <li className="medication-summary-item more">
                            외 {prescription.medications.length - 2}개
                          </li>
                        )}
                      </ul>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        viewDetail(prescription);
                      }}
                      className="prescription-detail-button"
                    >
                      <FileText size={16} />
                      <span>처방전 상세 보기</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showDetail && <PrescriptionDetailModal />}
    </div>
  );
};

export default PrescriptionManagement;
