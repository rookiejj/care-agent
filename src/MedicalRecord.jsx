import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  ChevronRight,
  ChevronDown,
  Search,
  FileText,
  Clipboard,
  Download,
  Share2,
  Printer,
  X,
  Activity,
} from "lucide-react";
import "./MedicalRecord.css";

const MedicalRecord = ({ selectedAppointmentId = null }) => {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedRecords, setExpandedRecords] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showDetail, setShowDetail] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const params = useParams();
  const location = useLocation();

  // URL 파라미터 또는 props로 전달된 특정 진료 ID
  let appointmentId =
    selectedAppointmentId ||
    params.appointmentId ||
    (location.state && location.state.appointmentId);

  appointmentId != null ? (appointmentId = (appointmentId % 5) + 101) : null;

  // 가상의 진료 기록 데이터 생성
  useEffect(() => {
    // 실제 구현 시에는 API에서 데이터를 가져오는 부분이 들어갈 것입니다
    const dummyRecords = [
      {
        id: 1,
        appointmentId: 101,
        hospitalName: "서울 연세 내과",
        doctorName: "김민석",
        department: "내과",
        date: "2025-03-15",
        time: "14:30",
        chiefComplaint: "가슴 통증, 호흡 곤란",
        diagnosis: "급성 기관지염",
        treatment: "항생제 처방, 안정 권고",
        prescription:
          "아목시실린 500mg 1일 3회, 5일간\n기관지 확장제 1일 2회, 5일간\n해열진통제 필요시 복용",
        followUp: "증상 지속 시 1주일 후 재방문 권고",
        medicalImages: [],
        labResults: [
          { name: "혈액 검사", result: "정상", date: "2025-03-15" },
          {
            name: "흉부 X-ray",
            result: "경미한 염증 소견",
            date: "2025-03-15",
          },
        ],
      },
      {
        id: 2,
        appointmentId: 102,
        hospitalName: "강남 피부과",
        doctorName: "이지원",
        department: "피부과",
        date: "2025-02-20",
        time: "11:00",
        chiefComplaint: "얼굴 발진, 가려움",
        diagnosis: "접촉성 피부염",
        treatment: "스테로이드 연고 처방, 알레르기 유발 요인 회피 권고",
        prescription:
          "스테로이드 연고 1일 2회, 7일간\n항히스타민제 1일 1회, 7일간",
        followUp: "2주 후 경과 확인",
        medicalImages: ["/images/medical_record_1.jpg"],
        labResults: [],
      },
      {
        id: 3,
        appointmentId: 103,
        hospitalName: "튼튼 정형외과",
        doctorName: "박준호",
        department: "정형외과",
        date: "2025-01-10",
        time: "15:45",
        chiefComplaint: "오른쪽 무릎 통증, 부종",
        diagnosis: "반월상 연골 손상",
        treatment: "물리치료, 소염진통제 처방, 무릎 보호대 착용 권고",
        prescription: "소염진통제 1일 3회, 7일간\n근이완제 1일 2회, 7일간",
        followUp: "2주 후 재평가, MRI 검사 필요 여부 결정",
        medicalImages: ["/images/medical_record_2.jpg"],
        labResults: [
          { name: "무릎 X-ray", result: "뼈 손상 없음", date: "2025-01-10" },
        ],
      },
      {
        id: 4,
        appointmentId: 104,
        hospitalName: "마음사랑 정신건강의학과",
        doctorName: "최수진",
        department: "정신건강의학과",
        date: "2025-01-05",
        time: "13:00",
        chiefComplaint: "불면증, 불안감",
        diagnosis: "적응장애, 불안 증상",
        treatment: "약물 치료, 인지행동치료 권고",
        prescription:
          "수면유도제 1일 1회, 취침 전, 14일간\n항불안제 1일 2회, 14일간",
        followUp: "2주 후 재진료",
        medicalImages: [],
        labResults: [],
      },
      {
        id: 5,
        appointmentId: 105,
        hospitalName: "청각케어 이비인후과",
        doctorName: "강동훈",
        department: "이비인후과",
        date: "2024-12-15",
        time: "10:30",
        chiefComplaint: "목 통증, 목소리 변화, 연하 곤란",
        diagnosis: "급성 인후두염",
        treatment: "항생제 처방, 충분한 수분 섭취 권고",
        prescription:
          "항생제 1일 2회, 5일간\n진해거담제 1일 3회, 5일간\n가글액 식후 및 취침 전 사용",
        followUp: "증상 악화 시 즉시 재방문",
        medicalImages: [],
        labResults: [
          {
            name: "인후 배양검사",
            result: "일반 세균 검출",
            date: "2024-12-15",
          },
        ],
      },
    ];

    // 특정 appointmentId가 있는 경우, 해당 진료 기록만 필터링
    let filteredRecords = dummyRecords;
    if (appointmentId) {
      filteredRecords = dummyRecords.filter(
        (record) => record.appointmentId === parseInt(appointmentId)
      );

      // 특정 진료에 대한 기록이 있으면 자동으로 상세 보기 열기
      if (filteredRecords.length === 1) {
        setSelectedRecord(filteredRecords[0]);
        setShowDetail(true);
      }
    }

    setTimeout(() => {
      setRecords(filteredRecords);
      setIsLoading(false);

      // 단일 레코드인 경우 자동으로 확장
      if (filteredRecords.length === 1) {
        setExpandedRecords({ [filteredRecords[0].id]: true });
      }
    }, 500); // 로딩 시뮬레이션
  }, [appointmentId]);

  // 레코드 확장/축소 토글 함수
  const toggleRecord = (id) => {
    setExpandedRecords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 상세 보기 함수
  const viewDetail = (record) => {
    setSelectedRecord(record);
    setShowDetail(true);
  };

  // 레코드 필터링 함수
  const filterRecords = () => {
    return records.filter((record) => {
      // 검색어 필터링
      const matchesSearch =
        record.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.department.toLowerCase().includes(searchTerm.toLowerCase());

      // 진료과 필터링
      const matchesType =
        filterType === "all" || record.department === filterType;

      return matchesSearch && matchesType;
    });
  };

  // 진료과별 필터 옵션
  const filterOptions = [
    { value: "all", label: "전체 진료과" },
    { value: "내과", label: "내과" },
    { value: "피부과", label: "피부과" },
    { value: "정형외과", label: "정형외과" },
    { value: "정신건강의학과", label: "정신건강의학과" },
    { value: "이비인후과", label: "이비인후과" },
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

  // 시간 포맷팅 함수
  const formatTime = (timeString) => {
    if (!timeString) return "";

    const [hour, minute] = timeString.split(":");
    const h = parseInt(hour);
    const ampm = h < 12 ? "오전" : "오후";
    const displayHour = h % 12 || 12;

    return `${ampm} ${displayHour}:${minute}`;
  };

  // 상세 기록 뷰
  const RecordDetailView = () => {
    if (!selectedRecord) return null;

    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">진료 상세 기록</h2>
            <button
              onClick={() => setShowDetail(false)}
              className="modal-close-button"
            >
              <X size={20} />
            </button>
          </div>

          <div className="modal-body">
            <div>
              <h3 className="modal-hospital-name">
                {selectedRecord.hospitalName}
              </h3>
              <p className="modal-department">
                {selectedRecord.department} | {selectedRecord.doctorName} 의사
              </p>
            </div>

            <div className="modal-date-wrapper">
              <div className="modal-date-icon">
                <Calendar size={16} />
              </div>
              <div className="modal-date-content">
                <p className="modal-date-label">진료 일시</p>
                <p className="modal-date-value">
                  {formatDate(selectedRecord.date)}{" "}
                  {formatTime(selectedRecord.time)}
                </p>
              </div>
            </div>

            <div className="modal-section">
              <h4 className="modal-section-title">주호소</h4>
              <p className="modal-section-content">
                {selectedRecord.chiefComplaint}
              </p>

              <h4 className="modal-section-title">진단명</h4>
              <p className="modal-section-content">
                {selectedRecord.diagnosis}
              </p>

              <h4 className="modal-section-title">치료 내용</h4>
              <p className="modal-section-content">
                {selectedRecord.treatment}
              </p>

              <h4 className="modal-section-title">처방 약물</h4>
              <pre className="modal-pre">{selectedRecord.prescription}</pre>

              <h4 className="modal-section-title">추후 계획</h4>
              <p className="modal-section-content">{selectedRecord.followUp}</p>

              {selectedRecord.labResults.length > 0 && (
                <>
                  <h4 className="modal-section-title">검사 결과</h4>
                  <div className="modal-lab-results">
                    {selectedRecord.labResults.map((lab, index) => (
                      <div key={index} className="modal-lab-item">
                        <span className="modal-lab-name">{lab.name}:</span>
                        <span className="modal-lab-result">{lab.result}</span>
                        <span className="modal-lab-date">({lab.date})</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {selectedRecord.medicalImages.length > 0 && (
                <>
                  <h4 className="modal-section-title">의료 영상</h4>
                  <div className="modal-images">
                    {selectedRecord.medicalImages.map((img, index) => (
                      <div key={index} className="modal-image">
                        <img src="/images/ultrasound.jpg" alt="의료 영상" />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* <div className="modal-actions">
              <button className="modal-action-button">
                <Download size={16} />
                <span>다운로드</span>
              </button>
              <button className="modal-action-button">
                <Share2 size={16} />
                <span>공유</span>
              </button>
              <button className="modal-action-button">
                <Printer size={16} />
                <span>인쇄</span>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    );
  };

  const filteredRecords = filterRecords();

  return (
    <div className="medical-record-container">
      {/* 특정 진료 기록만 볼 때는 검색/필터 영역 숨김 */}
      {!appointmentId && (
        <div className="search-filter-area">
          <div className="search-input-container">
            <div className="search-icon">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="병원명, 의사, 진단명 검색..."
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
      )}

      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>진료 기록을 불러오는 중...</p>
        </div>
      ) : filteredRecords.length === 0 ? (
        <div className="empty-container">
          <FileText size={40} className="empty-icon" />
          <p className="empty-text">진료 기록이 없거나 검색 결과가 없습니다.</p>
        </div>
      ) : (
        <div className="record-list">
          {filteredRecords.map((record) => (
            <div key={record.id} className="record-card">
              <div
                className="record-header"
                onClick={() => toggleRecord(record.id)}
              >
                <div>
                  <h3 className="record-title">{record.hospitalName}</h3>
                  <p className="record-subtitle">
                    {record.department} | {formatDate(record.date)}
                  </p>
                </div>
                <div>
                  {expandedRecords[record.id] ? (
                    <ChevronDown size={20} className="record-arrow expanded" />
                  ) : (
                    <ChevronRight size={20} className="record-arrow" />
                  )}
                </div>
              </div>

              {expandedRecords[record.id] && (
                <div className="record-content">
                  <div className="record-grid">
                    <div className="record-info-item">
                      <Calendar size={16} className="record-info-icon" />
                      <div className="record-info-content">
                        <p className="record-info-label">진료일</p>
                        <p className="record-info-value">
                          {formatDate(record.date)}
                        </p>
                      </div>
                    </div>
                    <div className="record-info-item">
                      <Clock size={16} className="record-info-icon" />
                      <div className="record-info-content">
                        <p className="record-info-label">진료시간</p>
                        <p className="record-info-value">
                          {formatTime(record.time)}
                        </p>
                      </div>
                    </div>
                    <div className="record-info-item">
                      <User size={16} className="record-info-icon" />
                      <div className="record-info-content">
                        <p className="record-info-label">담당의사</p>
                        <p className="record-info-value">
                          {record.doctorName} 의사
                        </p>
                      </div>
                    </div>
                    <div className="record-info-item">
                      <FileText size={16} className="record-info-icon" />
                      <div className="record-info-content">
                        <p className="record-info-label">진단명</p>
                        <p className="record-info-value">{record.diagnosis}</p>
                      </div>
                    </div>
                  </div>

                  <div className="record-prescription">
                    <Activity size={16} className="record-info-icon" />
                    <div className="record-info-content">
                      <p className="record-info-label">처방 약물</p>
                      <p className="record-info-value">
                        {record.prescription.split("\n")[0]}
                        {record.prescription.split("\n").length > 1 && "..."}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => viewDetail(record)}
                    className="record-detail-button"
                  >
                    <Clipboard size={16} />
                    <span>상세 기록 보기</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showDetail && <RecordDetailView />}
    </div>
  );
};

export default MedicalRecord;
