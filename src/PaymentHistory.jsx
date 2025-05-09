import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "./App";
import {
  Calendar,
  Search,
  Clock,
  CreditCard,
  ChevronRight,
  FileText,
  Receipt,
  Filter,
  Tag,
  CheckCircle,
} from "lucide-react";
import "./PaymentHistory.css";

const PaymentHistory = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 스크롤을 상단으로 이동
    window.scrollTo(0, 0);

    // 결제 내역 더미 데이터 생성
    const dummyPayments = [
      {
        id: "P2025041001",
        hospitalName: "서울대학교병원",
        department: "내과",
        doctorName: "김민석",
        date: "2025-04-10",
        time: "14:30",
        amount: 55000,
        paymentMethod: "신용카드",
        cardInfo: "국민카드 (1234)",
        status: "완료",
        type: "진료비",
        receiptAvailable: true,
        statementAvailable: true,
        details: [
          { item: "진찰료", amount: 15000 },
          { item: "처방약값", amount: 32000 },
          { item: "검사료", amount: 8000 },
        ],
        insurance: {
          applied: true,
          company: "국민건강보험",
          coverage: 40,
          patientPaid: 33000,
          insurancePaid: 22000,
        },
      },
      {
        id: "P2025033002",
        hospitalName: "강남세브란스병원",
        department: "피부과",
        doctorName: "이지원",
        date: "2025-03-30",
        time: "11:15",
        amount: 120000,
        paymentMethod: "계좌이체",
        accountInfo: "우리은행 (5678)",
        status: "완료",
        type: "검진비",
        receiptAvailable: true,
        statementAvailable: true,
        details: [
          { item: "건강검진 기본", amount: 80000 },
          { item: "추가 검사", amount: 40000 },
        ],
        insurance: {
          applied: false,
          company: null,
          coverage: 0,
          patientPaid: 120000,
          insurancePaid: 0,
        },
      },
      {
        id: "P2025031503",
        hospitalName: "서울아산병원",
        department: "정형외과",
        doctorName: "박준호",
        date: "2025-03-15",
        time: "09:45",
        amount: 35000,
        paymentMethod: "신용카드",
        cardInfo: "신한카드 (9012)",
        status: "완료",
        type: "진료비",
        receiptAvailable: true,
        statementAvailable: true,
        details: [
          { item: "진찰료", amount: 12000 },
          { item: "물리치료", amount: 15000 },
          { item: "처방약값", amount: 8000 },
        ],
        insurance: {
          applied: true,
          company: "국민건강보험",
          coverage: 30,
          patientPaid: 24500,
          insurancePaid: 10500,
        },
      },
      {
        id: "P2025022004",
        hospitalName: "카이스트 의원",
        department: "이비인후과",
        doctorName: "최수진",
        date: "2025-02-20",
        time: "16:00",
        amount: 25000,
        paymentMethod: "간편결제",
        cardInfo: "카카오페이",
        status: "완료",
        type: "진료비",
        receiptAvailable: true,
        statementAvailable: true,
        details: [
          { item: "진찰료", amount: 10000 },
          { item: "처방약값", amount: 15000 },
        ],
        insurance: {
          applied: true,
          company: "국민건강보험",
          coverage: 35,
          patientPaid: 16250,
          insurancePaid: 8750,
        },
      },
      {
        id: "P2025011005",
        hospitalName: "중앙대학교병원",
        department: "안과",
        doctorName: "정현우",
        date: "2025-01-10",
        time: "10:00",
        amount: 45000,
        paymentMethod: "신용카드",
        cardInfo: "현대카드 (3456)",
        status: "완료",
        type: "진료비",
        receiptAvailable: true,
        statementAvailable: true,
        details: [
          { item: "진찰료", amount: 15000 },
          { item: "검사료", amount: 20000 },
          { item: "처방약값", amount: 10000 },
        ],
        insurance: {
          applied: true,
          company: "국민건강보험",
          coverage: 45,
          patientPaid: 24750,
          insurancePaid: 20250,
        },
      },
      {
        id: "P2024120506",
        hospitalName: "연세사랑병원",
        department: "산부인과",
        doctorName: "김영희",
        date: "2024-12-05",
        time: "13:30",
        amount: 150000,
        paymentMethod: "신용카드",
        cardInfo: "삼성카드 (7890)",
        status: "완료",
        type: "시술비",
        receiptAvailable: true,
        statementAvailable: false,
        details: [
          { item: "초음파 검사", amount: 50000 },
          { item: "시술비", amount: 100000 },
        ],
        insurance: {
          applied: false,
          company: null,
          coverage: 0,
          patientPaid: 150000,
          insurancePaid: 0,
        },
      },
    ];

    setTimeout(() => {
      setPayments(dummyPayments);
      setIsLoading(false);
    }, 500); // 로딩 시뮬레이션
  }, []);

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  // 결제 내역 필터링 함수
  const filterPayments = () => {
    return payments.filter((payment) => {
      // 검색어 필터링
      const matchesSearch =
        payment.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.doctorName.toLowerCase().includes(searchTerm.toLowerCase());

      // 연도 필터링
      const year = new Date(payment.date).getFullYear().toString();
      const matchesYear = filterYear === "all" || year === filterYear;

      // 타입 필터링
      const matchesType = filterType === "all" || payment.type === filterType;

      return matchesSearch && matchesYear && matchesType;
    });
  };

  // 필터 옵션 생성
  const getYearOptions = () => {
    const years = new Set();
    payments.forEach((payment) => {
      const year = new Date(payment.date).getFullYear();
      years.add(year.toString());
    });
    return Array.from(years).sort((a, b) => b - a); // 내림차순 정렬
  };

  // 타입 옵션 생성
  const getTypeOptions = () => {
    const types = new Set();
    payments.forEach((payment) => {
      types.add(payment.type);
    });
    return Array.from(types);
  };

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

  // 금액 포맷팅 함수
  const formatAmount = (amount) => {
    return amount.toLocaleString() + "원";
  };

  // 영수증 페이지로 이동
  const handleReceiptClick = (payment) => {
    navigate(`/payment-receipt/${payment.id}`, {
      state: { paymentDetails: payment },
    });
  };

  // 정산서 페이지로 이동
  const handleStatementClick = (payment) => {
    navigate(`/payment-statement/${payment.id}`, {
      state: { paymentDetails: payment },
    });
  };

  const filteredPayments = filterPayments();
  const yearOptions = getYearOptions();
  const typeOptions = getTypeOptions();

  // 결제 내역 상태에 따른 뱃지 색상 반환
  const getStatusColor = (status) => {
    switch (status) {
      case "완료":
        return "complete";
      case "진행중":
        return "pending";
      case "취소":
        return "cancelled";
      default:
        return "default";
    }
  };

  return (
    <div className="container">
      <div className="fixed-header">
        <PageHeader
          title="결제 내역"
          backButtonVisible={true}
          onBack={handleBackClick}
        />
      </div>

      <div className="payment-content">
        <div className="search-filter-area">
          <div className="search-input-container">
            <div className="search-icon">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="병원명, 진료과, 의사명 검색..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-container">
            <div
              className="selected-filters"
              onClick={() => setShowFilterOptions(!showFilterOptions)}
            >
              <div className="filter-chip">
                <Calendar size={14} />
                <span>
                  {filterYear === "all" ? "전체 기간" : `${filterYear}년`}
                </span>
              </div>
              <div className="filter-chip">
                <Tag size={14} />
                <span>{filterType === "all" ? "전체 유형" : filterType}</span>
              </div>
              <button className="payment-history-filter-button">
                <Filter size={16} />
              </button>
            </div>

            {showFilterOptions && (
              <div className="payment-history-filter-options">
                <div className="filter-option-group">
                  <h4 className="filter-option-title">기간</h4>
                  <div className="filter-option-items">
                    <button
                      className={`filter-option-item ${
                        filterYear === "all" ? "active" : ""
                      }`}
                      onClick={() => setFilterYear("all")}
                    >
                      전체 기간
                      {filterYear === "all" && <CheckCircle size={14} />}
                    </button>
                    {yearOptions.map((year) => (
                      <button
                        key={year}
                        className={`filter-option-item ${
                          filterYear === year ? "active" : ""
                        }`}
                        onClick={() => setFilterYear(year)}
                      >
                        {year}년
                        {filterYear === year && <CheckCircle size={14} />}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="filter-option-group">
                  <h4 className="filter-option-title">결제 유형</h4>
                  <div className="filter-option-items">
                    <button
                      className={`filter-option-item ${
                        filterType === "all" ? "active" : ""
                      }`}
                      onClick={() => setFilterType("all")}
                    >
                      전체 유형
                      {filterType === "all" && <CheckCircle size={14} />}
                    </button>
                    {typeOptions.map((type) => (
                      <button
                        key={type}
                        className={`filter-option-item ${
                          filterType === type ? "active" : ""
                        }`}
                        onClick={() => setFilterType(type)}
                      >
                        {type}
                        {filterType === type && <CheckCircle size={14} />}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="filter-actions">
                  <button
                    className="filter-action-button"
                    onClick={() => {
                      setFilterYear("all");
                      setFilterType("all");
                    }}
                  >
                    필터 초기화
                  </button>
                  <button
                    className="filter-action-button primary"
                    onClick={() => setShowFilterOptions(false)}
                  >
                    적용하기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>결제 내역을 불러오는 중...</p>
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="empty-container">
            <Receipt size={40} className="empty-icon" />
            <p className="empty-text">
              결제 내역이 없거나 검색 결과가 없습니다.
            </p>
          </div>
        ) : (
          <div className="payment-list">
            {filteredPayments.map((payment) => (
              <div key={payment.id} className="payment-card">
                <div className="payment-card-header">
                  <div className="payment-header-left">
                    <span
                      className={`payment-status ${getStatusColor(
                        payment.status
                      )}`}
                    >
                      {payment.status}
                    </span>
                    <span className="payment-type">{payment.type}</span>
                  </div>
                  <span className="payment-date">
                    {formatDate(payment.date)}
                  </span>
                </div>

                <div className="payment-card-content">
                  <h3 className="payment-hospital">{payment.hospitalName}</h3>
                  <p className="payment-department">
                    {payment.department} | {payment.doctorName} 의사
                  </p>

                  <div className="payment-info-grid">
                    <div className="payment-info-item">
                      <Clock size={16} className="payment-info-icon" />
                      <div className="payment-info-content">
                        <p className="payment-info-label">진료시간</p>
                        <p className="payment-info-value">
                          {formatTime(payment.time)}
                        </p>
                      </div>
                    </div>

                    <div className="payment-info-item">
                      <CreditCard size={16} className="payment-info-icon" />
                      <div className="payment-info-content">
                        <p className="payment-info-label">결제수단</p>
                        <p className="payment-info-value">
                          {payment.paymentMethod}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="payment-amount">
                    <p className="payment-amount-label">결제금액</p>
                    <p className="payment-amount-value">
                      {formatAmount(payment.amount)}
                    </p>
                  </div>
                </div>

                <div className="payment-card-actions">
                  {payment.receiptAvailable && (
                    <button
                      className="payment-action-button"
                      onClick={() => handleReceiptClick(payment)}
                    >
                      <Receipt size={16} />
                      <span>영수증</span>
                      <ChevronRight size={14} />
                    </button>
                  )}

                  {payment.statementAvailable && (
                    <button
                      className="payment-action-button"
                      onClick={() => handleStatementClick(payment)}
                    >
                      <FileText size={16} />
                      <span>정산서</span>
                      <ChevronRight size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
