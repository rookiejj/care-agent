import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { PageHeader } from "./App";
import {
  Calendar,
  Clock,
  User,
  Download,
  Share2,
  Printer,
  CheckCircle,
  X,
  ChevronDown,
  ChevronUp,
  Receipt,
  Hash,
  CreditCard as CardIcon,
} from "lucide-react";
import "./PaymentReceipt.css";

const PaymentReceipt = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { paymentId } = useParams();
  const [receipt, setReceipt] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 스크롤을 상단으로 이동
    window.scrollTo(0, 0);

    // 라우터 state에서 결제 정보 가져오기
    if (location.state?.paymentDetails) {
      setReceipt(location.state.paymentDetails);
      setIsLoading(false);
    } else {
      // 직접 URL로 접근한 경우 처리 (paymentId로 데이터 로드)
      // 실제 구현 시에는 API 호출하여 영수증 데이터 로드

      // 더미 데이터 생성 (URL 직접 접근 시뮬레이션)
      const dummyReceipt = {
        id: paymentId || "P2025041001",
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
        hospitalInfo: {
          name: "서울대학교병원",
          address: "서울시 종로구 대학로 101",
          tel: "02-2072-2114",
          businessId: "123-45-67890",
          doctor: "김민석",
          departmentName: "내과",
        },
        patientInfo: {
          name: "홍길동",
          birthDate: "1990-01-01",
          phoneNumber: "010-1234-5678",
          address: "서울시 강남구 테헤란로 123",
        },
      };

      setTimeout(() => {
        setReceipt(dummyReceipt);
        setIsLoading(false);
      }, 500); // 로딩 시뮬레이션
    }
  }, [location.state, paymentId]);

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
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

  // 영수증 공유 함수
  const handleShare = () => {
    setShowShare(!showShare);
  };

  // 영수증 다운로드 함수 (실제 구현 시 PDF 생성 및 다운로드 로직 추가)
  const handleDownload = () => {
    alert("영수증이 다운로드됩니다.");
  };

  // 영수증 인쇄 함수
  const handlePrint = () => {
    window.print();
  };

  // 로딩 중이거나 데이터가 없는 경우 처리
  if (isLoading) {
    return (
      <div className="container">
        <div className="fixed-header">
          <PageHeader
            title="진료비 영수증"
            backButtonVisible={true}
            onBack={handleBackClick}
          />
        </div>
        <div className="receipt-content">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>영수증 정보를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!receipt) {
    return (
      <div className="container">
        <div className="fixed-header">
          <PageHeader
            title="진료비 영수증"
            backButtonVisible={true}
            onBack={handleBackClick}
          />
        </div>
        <div className="receipt-content">
          <div className="no-data-message">
            <X size={48} />
            <p>영수증 정보를 찾을 수 없습니다.</p>
            <button
              className="go-back-button"
              onClick={() => navigate("/payments")}
            >
              결제 내역으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container receipt-container">
      <div className="fixed-header">
        <PageHeader
          title="진료비 영수증"
          backButtonVisible={true}
          onBack={handleBackClick}
        />
      </div>

      <div className="receipt-content">
        <div className="receipt-paper">
          <div className="receipt-header">
            <div className="receipt-title-area">
              <Receipt size={24} className="receipt-icon" />
              <h1 className="receipt-title">진료비 영수증</h1>
            </div>
            <div className="receipt-status">
              <CheckCircle size={16} />
              <span>결제완료</span>
            </div>
          </div>

          <div className="receipt-hospital-info">
            <h2 className="receipt-hospital-name">
              {receipt.hospitalInfo?.name || receipt.hospitalName}
            </h2>
            <p className="receipt-hospital-addr">
              {receipt.hospitalInfo?.address || "서울시 종로구 대학로 101"}
            </p>
            <p className="receipt-hospital-detail">
              {receipt.hospitalInfo?.businessId || "123-45-67890"} |
              {receipt.hospitalInfo?.tel || "02-2072-2114"}
            </p>
          </div>

          <div className="receipt-divider"></div>

          <div className="receipt-info-grid">
            <div className="receipt-info-item">
              <Calendar size={16} className="receipt-info-icon" />
              <div className="receipt-info-content">
                <p className="receipt-info-label">진료일자</p>
                <p className="receipt-info-value">{formatDate(receipt.date)}</p>
              </div>
            </div>

            <div className="receipt-info-item">
              <Clock size={16} className="receipt-info-icon" />
              <div className="receipt-info-content">
                <p className="receipt-info-label">진료시간</p>
                <p className="receipt-info-value">{formatTime(receipt.time)}</p>
              </div>
            </div>

            <div className="receipt-info-item">
              <User size={16} className="receipt-info-icon" />
              <div className="receipt-info-content">
                <p className="receipt-info-label">담당의사</p>
                <p className="receipt-info-value">
                  {receipt.doctorName} ({receipt.department})
                </p>
              </div>
            </div>

            <div className="receipt-info-item">
              <Hash size={16} className="receipt-info-icon" />
              <div className="receipt-info-content">
                <p className="receipt-info-label">결제번호</p>
                <p className="receipt-info-value">{receipt.id}</p>
              </div>
            </div>
          </div>

          <div className="receipt-divider"></div>

          <div className="receipt-patient-section">
            <h3 className="receipt-section-title">환자 정보</h3>
            <div className="receipt-info-container">
              <div className="receipt-info-row">
                <span className="receipt-row-label">이름</span>
                <span className="receipt-row-value">
                  {receipt.patientInfo?.name || "홍길동"}
                </span>
              </div>
              <div className="receipt-info-row">
                <span className="receipt-row-label">연락처</span>
                <span className="receipt-row-value">
                  {receipt.patientInfo?.phoneNumber || "010-1234-5678"}
                </span>
              </div>
            </div>
          </div>

          <div className="receipt-payment-section">
            <h3 className="receipt-section-title">결제 정보</h3>
            <div className="receipt-info-container">
              <div className="receipt-info-row">
                <span className="receipt-row-label">결제수단</span>
                <span className="receipt-row-value">
                  {receipt.paymentMethod}{" "}
                  {receipt.cardInfo ? `(${receipt.cardInfo})` : ""}
                </span>
              </div>
              <div className="receipt-info-row">
                <span className="receipt-row-label">결제일시</span>
                <span className="receipt-row-value">
                  {formatDate(receipt.date)} {formatTime(receipt.time)}
                </span>
              </div>
            </div>
          </div>

          <div className="receipt-details-section">
            <div
              className="receipt-details-header"
              onClick={() => setShowDetails(!showDetails)}
            >
              <h3 className="receipt-section-title">결제 상세</h3>
              {showDetails ? (
                <ChevronUp size={18} className="receipt-details-toggle" />
              ) : (
                <ChevronDown size={18} className="receipt-details-toggle" />
              )}
            </div>

            {showDetails && (
              <div className="receipt-details-content">
                <div className="receipt-detail-items">
                  {receipt.details.map((detail, index) => (
                    <div key={index} className="receipt-detail-item">
                      <span className="receipt-detail-name">{detail.item}</span>
                      <span className="receipt-detail-amount">
                        {formatAmount(detail.amount)}
                      </span>
                    </div>
                  ))}
                </div>

                {receipt.insurance?.applied && (
                  <div className="receipt-insurance-info">
                    <div className="receipt-insurance-row">
                      <span className="receipt-insurance-label">보험적용</span>
                      <span className="receipt-insurance-value">
                        {receipt.insurance.company}
                      </span>
                    </div>
                    <div className="receipt-insurance-row">
                      <span className="receipt-insurance-label">
                        보험부담금
                      </span>
                      <span className="receipt-insurance-value">
                        {formatAmount(receipt.insurance.insurancePaid)}
                      </span>
                    </div>
                    <div className="receipt-insurance-row">
                      <span className="receipt-insurance-label">
                        본인부담금
                      </span>
                      <span className="receipt-insurance-value">
                        {formatAmount(receipt.insurance.patientPaid)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="receipt-total-section">
            <div className="receipt-total-row">
              <span className="receipt-total-label">총 결제금액</span>
              <span className="receipt-total-amount">
                {formatAmount(receipt.amount)}
              </span>
            </div>
          </div>

          <div className="receipt-footer">
            <p className="receipt-footer-text">
              본 영수증은 전자 영수증으로 소득공제용으로 사용하실 수 있습니다.
            </p>
            <p className="receipt-footer-date">
              발행일시: {formatDate(receipt.date)} {formatTime(receipt.time)}
            </p>
          </div>
        </div>

        <div className="receipt-actions">
          <button className="receipt-action-button" onClick={handleShare}>
            <Share2 size={18} />
            <span>공유하기</span>
          </button>
          <button className="receipt-action-button" onClick={handleDownload}>
            <Download size={18} />
            <span>저장하기</span>
          </button>
          {/* <button className="receipt-action-button" onClick={handlePrint}>
            <Printer size={18} />
            <span>인쇄하기</span>
          </button> */}
        </div>

        {showShare && (
          <div className="share-options">
            <div className="share-option-title">공유 방법 선택</div>
            <div className="share-options-grid">
              <button className="share-option">
                <span className="share-icon kakao">K</span>
                <span className="share-label">카카오톡</span>
              </button>
              <button className="share-option">
                <span className="share-icon sms">S</span>
                <span className="share-label">문자</span>
              </button>
              <button className="share-option">
                <span className="share-icon email">@</span>
                <span className="share-label">이메일</span>
              </button>
              <button className="share-option">
                <span className="share-icon link">L</span>
                <span className="share-label">링크복사</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentReceipt;
