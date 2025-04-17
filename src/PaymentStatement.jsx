import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { PageHeader } from "./App";
import {
  Calendar,
  Clock,
  Building,
  User,
  FileText,
  Download,
  Share2,
  Printer,
  X,
  CreditCard,
  Check,
  ChevronDown,
  ChevronUp,
  Receipt,
  Hash,
  DollarSign,
  Shield,
  CreditCard as CardIcon,
  AlertCircle,
  Info,
} from "lucide-react";
import "./PaymentStatement.css";

const PaymentStatement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { paymentId } = useParams();
  const [statement, setStatement] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 스크롤을 상단으로 이동
    window.scrollTo(0, 0);

    // 라우터 state에서 결제 정보 가져오기
    if (location.state?.paymentDetails) {
      setStatement(location.state.paymentDetails);
      setIsLoading(false);
    } else {
      // 직접 URL로 접근한 경우 처리 (paymentId로 데이터 로드)
      // 실제 구현 시에는 API 호출하여 정산서 데이터 로드

      // 더미 데이터 생성 (URL 직접 접근 시뮬레이션)
      const dummyStatement = {
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
          policyNumber: "12345678",
          coverageDetails: [
            {
              item: "진찰료",
              total: 15000,
              coverage: 50,
              insurancePaid: 7500,
              patientPaid: 7500,
            },
            {
              item: "처방약값",
              total: 32000,
              coverage: 30,
              insurancePaid: 9600,
              patientPaid: 22400,
            },
            {
              item: "검사료",
              total: 8000,
              coverage: 50,
              insurancePaid: 4000,
              patientPaid: 4000,
            },
          ],
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
          insuranceId: "12345678",
        },
        statementInfo: {
          statementNumber: "STMT-2025-04100001",
          issueDate: "2025-04-10",
          treatmentPeriod: "2025-04-10 ~ 2025-04-10",
          paymentDate: "2025-04-10",
        },
      };

      setTimeout(() => {
        setStatement(dummyStatement);
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

  // 정산서 공유 함수
  const handleShare = () => {
    setShowShare(!showShare);
  };

  // 정산서 다운로드 함수 (실제 구현 시 PDF 생성 및 다운로드 로직 추가)
  const handleDownload = () => {
    alert("정산서가 다운로드됩니다.");
  };

  // 정산서 인쇄 함수
  const handlePrint = () => {
    window.print();
  };

  // 보험 적용률 계산 함수
  const calculateCoverageRate = (total, insurancePaid) => {
    if (total === 0) return 0;
    return Math.round((insurancePaid / total) * 100);
  };

  // 로딩 중이거나 데이터가 없는 경우 처리
  if (isLoading) {
    return (
      <div className="container">
        <div className="fixed-header">
          <PageHeader
            title="진료비 정산서"
            backButtonVisible={true}
            onBack={handleBackClick}
          />
        </div>
        <div className="statement-content">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>정산서 정보를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!statement) {
    return (
      <div className="container">
        <div className="fixed-header">
          <PageHeader
            title="진료비 정산서"
            backButtonVisible={true}
            onBack={handleBackClick}
          />
        </div>
        <div className="statement-content">
          <div className="no-data-message">
            <X size={48} />
            <p>정산서 정보를 찾을 수 없습니다.</p>
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
    <div className="container statement-container">
      <div className="fixed-header">
        <PageHeader
          title="진료비 정산서"
          backButtonVisible={true}
          onBack={handleBackClick}
        />
      </div>

      <div className="statement-content">
        <div className="statement-paper">
          <div className="statement-header">
            <div className="statement-title-area">
              <FileText size={24} className="statement-icon" />
              <h1 className="statement-title">진료비 정산서</h1>
            </div>
            <div className="statement-number">
              <span className="statement-number-label">정산서 번호</span>
              <span className="statement-number-value">
                {statement.statementInfo?.statementNumber ||
                  "STMT-2025-04100001"}
              </span>
            </div>
          </div>

          <div className="statement-notice">
            <Info size={16} />
            <p>
              본 정산서는 건강보험 지급내역 및 본인부담금 내역을 포함합니다.
            </p>
          </div>

          <div className="statement-hospital-info">
            <h2 className="statement-hospital-name">
              {statement.hospitalInfo?.name || statement.hospitalName}
            </h2>
            <p className="statement-hospital-addr">
              {statement.hospitalInfo?.address || "서울시 종로구 대학로 101"}
            </p>
            <p className="statement-hospital-detail">
              {statement.hospitalInfo?.businessId || "123-45-67890"} |
              {statement.hospitalInfo?.tel || "02-2072-2114"}
            </p>
          </div>

          <div className="statement-divider"></div>

          <div className="statement-info-section">
            <div className="statement-info-row">
              <span className="statement-info-label">환자명</span>
              <span className="statement-info-value">
                {statement.patientInfo?.name || "홍길동"}
              </span>
            </div>
            <div className="statement-info-row">
              <span className="statement-info-label">진료일시</span>
              <span className="statement-info-value">
                {formatDate(statement.date)} {formatTime(statement.time)}
              </span>
            </div>
            <div className="statement-info-row">
              <span className="statement-info-label">진료과</span>
              <span className="statement-info-value">
                {statement.department} ({statement.doctorName} 의사)
              </span>
            </div>
            <div className="statement-info-row">
              <span className="statement-info-label">보험정보</span>
              <span className="statement-info-value">
                {statement.insurance?.company || "국민건강보험"}{" "}
                {statement.insurance?.policyNumber || "12345678"}
              </span>
            </div>
          </div>

          <div className="statement-divider"></div>

          <div className="statement-summary-section">
            <h3 className="statement-section-title">진료비 요약</h3>

            <div className="statement-summary-cards">
              <div className="statement-summary-card">
                <span className="summary-card-label">총 진료비</span>
                <span className="summary-card-value">
                  {formatAmount(statement.amount)}
                </span>
              </div>

              <div className="statement-summary-card">
                <span className="summary-card-label">보험 적용</span>
                <span className="summary-card-value coverage">
                  {statement.insurance?.coverage || 40}%
                </span>
              </div>

              <div className="statement-summary-card">
                <span className="summary-card-label">보험 지급액</span>
                <span className="summary-card-value insurance">
                  {formatAmount(statement.insurance?.insurancePaid || 0)}
                </span>
              </div>

              <div className="statement-summary-card">
                <span className="summary-card-label">본인 부담금</span>
                <span className="summary-card-value patient">
                  {formatAmount(
                    statement.insurance?.patientPaid || statement.amount
                  )}
                </span>
              </div>
            </div>
          </div>

          <div
            className="statement-details-header"
            onClick={() => setShowDetails(!showDetails)}
          >
            <h3 className="statement-section-title">정산 상세내역</h3>
            {showDetails ? (
              <ChevronUp size={18} className="statement-details-toggle" />
            ) : (
              <ChevronDown size={18} className="statement-details-toggle" />
            )}
          </div>

          {showDetails && (
            <div className="statement-details-content">
              <div className="statement-details-table">
                <div className="statement-table-header">
                  <div className="statement-header-cell item-name">항목</div>
                  <div className="statement-header-cell">금액</div>
                  <div className="statement-header-cell">보험적용</div>
                  <div className="statement-header-cell">보험사부담</div>
                  <div className="statement-header-cell">본인부담</div>
                </div>

                {statement.insurance?.coverageDetails
                  ? statement.insurance.coverageDetails.map((detail, index) => (
                      <div key={index} className="statement-table-row">
                        <div className="statement-cell item-name">
                          {detail.item}
                        </div>
                        <div className="statement-cell">
                          {formatAmount(detail.total)}
                        </div>
                        <div className="statement-cell">{detail.coverage}%</div>
                        <div className="statement-cell">
                          {formatAmount(detail.insurancePaid)}
                        </div>
                        <div className="statement-cell">
                          {formatAmount(detail.patientPaid)}
                        </div>
                      </div>
                    ))
                  : statement.details.map((detail, index) => {
                      // 보험 적용이 없는 경우 대략적인 계산
                      const coverageRate = statement.insurance?.coverage || 0;
                      const insurancePaid = Math.round(
                        detail.amount * (coverageRate / 100)
                      );
                      const patientPaid = detail.amount - insurancePaid;

                      return (
                        <div key={index} className="statement-table-row">
                          <div className="statement-cell item-name">
                            {detail.item}
                          </div>
                          <div className="statement-cell">
                            {formatAmount(detail.amount)}
                          </div>
                          <div className="statement-cell">{coverageRate}%</div>
                          <div className="statement-cell">
                            {formatAmount(insurancePaid)}
                          </div>
                          <div className="statement-cell">
                            {formatAmount(patientPaid)}
                          </div>
                        </div>
                      );
                    })}

                <div className="statement-table-footer">
                  <div className="statement-footer-cell item-name">합계</div>
                  <div className="statement-footer-cell">
                    {formatAmount(statement.amount)}
                  </div>
                  <div className="statement-footer-cell">-</div>
                  <div className="statement-footer-cell">
                    {formatAmount(statement.insurance?.insurancePaid || 0)}
                  </div>
                  <div className="statement-footer-cell">
                    {formatAmount(
                      statement.insurance?.patientPaid || statement.amount
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="statement-payment-info">
            <h3 className="statement-section-title">결제 정보</h3>

            <div className="statement-payment-details">
              <div className="statement-payment-row">
                <span className="statement-payment-label">결제 방법</span>
                <span className="statement-payment-value">
                  {statement.paymentMethod} {statement.cardInfo || ""}
                </span>
              </div>
              <div className="statement-payment-row">
                <span className="statement-payment-label">결제 금액</span>
                <span className="statement-payment-value">
                  {formatAmount(
                    statement.insurance?.patientPaid || statement.amount
                  )}
                </span>
              </div>
              <div className="statement-payment-row">
                <span className="statement-payment-label">결제 일시</span>
                <span className="statement-payment-value">
                  {formatDate(statement.date)} {formatTime(statement.time)}
                </span>
              </div>
              <div className="statement-payment-row">
                <span className="statement-payment-label">결제 상태</span>
                <span className="statement-payment-status">
                  <Check size={14} />
                  결제 완료
                </span>
              </div>
            </div>
          </div>

          <div className="statement-footer">
            <p className="statement-footer-text">
              본 정산서는 의료비 공제 신청 시 증빙자료로 사용하실 수 있습니다.
            </p>
            <p className="statement-footer-date">
              발행일:{" "}
              {formatDate(statement.statementInfo?.issueDate || statement.date)}
            </p>
          </div>
        </div>

        <div className="statement-actions">
          <button className="statement-action-button" onClick={handleShare}>
            <Share2 size={18} />
            <span>공유하기</span>
          </button>
          <button className="statement-action-button" onClick={handleDownload}>
            <Download size={18} />
            <span>저장하기</span>
          </button>
          {/* <button className="statement-action-button" onClick={handlePrint}>
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

export default PaymentStatement;
