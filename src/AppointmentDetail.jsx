import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "./App";
import ConfirmationPopup from "./ConfirmationPopup";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  ClipboardList,
  Edit2,
  ArrowRight,
  ChevronRight,
  CreditCard,
  FileText,
  Bookmark,
  Share2,
  Info,
  Bell,
} from "lucide-react";
import "./AppointmentDetail.css";

const AppointmentDetail = ({ currentLocation }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [appointment, setAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  // 알림 설정 토글 함수
  const toggleNotification = () => {
    setNotificationEnabled(!notificationEnabled);
    // 여기에 알림 설정 저장 로직 추가 가능
  };

  useEffect(() => {
    // 페이지 로드 시 스크롤을 상단으로 이동
    window.scrollTo(0, 0);

    // 라우터 state에서 예약 상세 정보 가져오기
    if (location.state?.appointmentDetails) {
      setAppointment(location.state.appointmentDetails);
      setIsLoading(false);
    } else {
      // 직접 URL로 접근한 경우 처리
      // 실제 구현 시에는 예약 ID로 API 호출하여 데이터 로드
      setIsLoading(false);
      navigate("/appointments"); // 데이터가 없으면 예약 목록으로 리다이렉트
    }
  }, [location.state, navigate]);

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleRescheduleClick = () => {
    if (appointment) {
      navigate("/booking", {
        state: {
          item: appointment.doctor,
          selectedDoctor: appointment.doctor,
          fromReschedule: true,
          originalAppointment: appointment,
        },
      });
    }
  };

  const handleCancelClick = () => {
    setShowCancelPopup(true);
  };

  const confirmCancelAppointment = () => {
    // 실제 구현 시 API 호출하여 예약 취소
    console.log("예약 취소 확인:", appointment?.id);
    setShowCancelPopup(false);

    // 취소 후 예약 목록 페이지로 이동
    navigate("/appointments", {
      state: {
        cancelSuccess: true,
        cancelledAppointmentId: appointment?.id,
      },
    });
  };

  const closeCancelPopup = () => {
    setShowCancelPopup(false);
  };

  const handleShareClick = () => {
    // Web Share API를 사용하여 공유 기능 구현
    if (navigator.share) {
      navigator
        .share({
          title: "예약정보",
          text: "",
          url: window.location.href,
        })
        .catch((error) => console.log("공유 실패:", error));
    } else {
      // 공유 API가 지원되지 않는 경우 URL 복사
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert("URL이 클립보드에 복사되었습니다."))
        .catch((err) => console.error("URL 복사 실패:", err));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // 요일 구하기
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    const dayName = dayNames[date.getDay()];

    return `${year}년 ${month}월 ${day}일 (${dayName})`;
  };

  const formatTimeWithAmPm = (timeStr) => {
    if (!timeStr) return "";

    const [hourStr, minuteStr] = timeStr.split(":");
    const hour = parseInt(hourStr);

    const ampm = hour < 12 ? "오전" : "오후";
    const displayHour = hour % 12 || 12;

    return `${ampm} ${displayHour}:${minuteStr}`;
  };

  // 전문분야 영어명을 한글로 변환하는 함수
  const translateSpecialty = (specialty) => {
    const specialtyMap = {
      neurology: "신경과",
      gastroenterology: "소화기내과",
      cardiology: "심장내과",
      dermatology: "피부과",
      orthopedics: "정형외과",
      ophthalmology: "안과",
      ent: "이비인후과",
      psychiatry: "정신건강의학과",
      pulmonology: "호흡기내과",
      allergy: "알레르기내과",
      urology: "비뇨의학과",
      dentistry: "치과",
      oriental: "한의원",
      family: "가정의학과",
      pain: "통증의학과",
      endocrinology: "내분비내과",
      obgyn: "산부인과",
      surgery: "외과",
      rehabilitation: "재활의학과",
      plastic: "성형외과",
      pediatrics: "소아과",
      internal: "내과",
    };

    return specialtyMap[specialty] || specialty;
  };

  // 예약 상태에 따른 배지 컴포넌트
  const StatusBadge = ({ status }) => {
    switch (status) {
      case "confirmed":
        return (
          <div className="appointment-detail-status-badge confirmed">
            <CheckCircle size={16} /> 예약 확정
          </div>
        );
      case "cancelled":
        return (
          <div className="appointment-detail-status-badge cancelled">
            <XCircle size={16} /> 취소됨
          </div>
        );
      case "completed":
        return (
          <div className="appointment-detail-status-badge completed">
            <CheckCircle size={16} /> 진료 완료
          </div>
        );
      default:
        return (
          <div className="appointment-detail-status-badge pending">
            <AlertCircle size={16} /> 대기중
          </div>
        );
    }
  };

  // 로딩 중이거나 데이터가 없는 경우 처리
  if (isLoading) {
    return (
      <div className="container">
        <div className="fixed-header">
          <PageHeader
            title="예약 상세"
            backButtonVisible={true}
            onBack={handleBackClick}
          />
        </div>
        <div className="detail-content">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>예약 정보를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="container">
        <div className="fixed-header">
          <PageHeader
            title="예약 상세"
            backButtonVisible={true}
            onBack={handleBackClick}
          />
        </div>
        <div className="detail-content">
          <div className="no-data-message">
            <AlertCircle size={48} />
            <p>예약 정보를 찾을 수 없습니다.</p>
            <button
              className="go-back-button"
              onClick={() => navigate("/appointments")}
            >
              예약 목록으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="fixed-header">
        <PageHeader
          title="예약 상세"
          backButtonVisible={true}
          onBack={handleBackClick}
        />
      </div>

      <div className="detail-content">
        <div className="detail-header-card">
          <div className="detail-status-section">
            <StatusBadge status={appointment.status} />
            <div className="appointment-id">예약번호: {appointment.id}</div>
          </div>

          <div className="detail-hospital-section">
            <h2 className="hospital-name">{appointment.hospitalName}</h2>
            <p className="department-name">
              {translateSpecialty(appointment.department)} |{" "}
              {appointment.doctorName} 의사
            </p>
          </div>

          {/* 빠른 액션 버튼 추가 */}
          <div className="quick-actions">
            <button className="quick-action-button" onClick={handleShareClick}>
              <Share2 size={16} />
              <span>공유하기</span>
            </button>
            <button
              className="quick-action-button"
              onClick={toggleNotification}
            >
              <Bell
                size={16}
                color={notificationEnabled ? "#3b82f6" : "#6b7280"}
              />
              <span>{notificationEnabled ? "알림 켜짐" : "알림 꺼짐"}</span>
            </button>
          </div>
        </div>

        <div className="detail-card">
          <h3 className="detail-section-title">예약 정보</h3>

          <div className="detail-info-row">
            <div className="detail-info-icon">
              <Calendar />
            </div>
            <div className="detail-info-content">
              <div className="detail-info-label">예약 일자</div>
              <div className="detail-info-value">
                {formatDate(appointment.date)}
              </div>
            </div>
          </div>

          <div className="detail-info-row">
            <div className="detail-info-icon">
              <Clock />
            </div>
            <div className="detail-info-content">
              <div className="detail-info-label">예약 시간</div>
              <div className="detail-info-value">
                {formatTimeWithAmPm(appointment.time)}
              </div>
            </div>
          </div>

          <div className="detail-info-row">
            <div className="detail-info-icon">
              <MapPin />
            </div>
            <div className="detail-info-content">
              <div className="detail-info-label">위치</div>
              <div className="detail-info-value">{appointment.location}</div>
            </div>
          </div>

          <div className="detail-info-row">
            <div className="detail-info-icon">
              <MessageSquare />
            </div>
            <div className="detail-info-content">
              <div className="detail-info-label">진료 목적</div>
              <div className="detail-info-value">{appointment.reason}</div>
            </div>
          </div>
        </div>

        {/* 결제 정보 섹션 추가 */}
        <div className="detail-card payment-card">
          <h3 className="detail-section-title">결제 정보</h3>

          <div className="detail-info-row">
            <div className="detail-info-icon">
              <CreditCard />
            </div>
            <div className="detail-info-content">
              <div className="detail-info-label">결제 금액</div>
              <div className="detail-info-value price-value">
                {appointment.paymentAmount
                  ? appointment.paymentAmount.toLocaleString() + "원"
                  : "50,000원"}
              </div>
            </div>
          </div>

          <div className="detail-info-row">
            <div className="detail-info-icon">
              <FileText />
            </div>
            <div className="detail-info-content">
              <div className="detail-info-label">결제 방법</div>
              <div className="detail-info-value">
                {appointment.paymentMethod || "신용카드"}
                {appointment.cardInfo && (
                  <span className="payment-method-detail">
                    {" "}
                    | {appointment.cardInfo}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="detail-info-row">
            <div className="detail-info-icon">
              <Clock />
            </div>
            <div className="detail-info-content">
              <div className="detail-info-label">결제 일시</div>
              <div className="detail-info-value">
                {appointment.paymentDate
                  ? formatDate(appointment.paymentDate) +
                    " " +
                    formatTimeWithAmPm(appointment.paymentTime)
                  : formatDate(appointment.date) +
                    " " +
                    formatTimeWithAmPm("09:30")}
              </div>
            </div>
          </div>

          <p className="payment-note">
            <Info size={14} />
            <span>진료 후 추가 비용이 발생할 수 있습니다.</span>
          </p>
        </div>

        {/* 예약자 정보 섹션 추가 */}
        <div className="detail-card">
          <h3 className="detail-section-title">예약자 정보</h3>

          <div className="detail-info-row">
            <div className="detail-info-icon">
              <User />
            </div>
            <div className="detail-info-content">
              <div className="detail-info-label">이름</div>
              <div className="detail-info-value">
                {appointment.patientName || "홍길동"}
              </div>
            </div>
          </div>

          <div className="detail-info-row">
            <div className="detail-info-icon">
              <Phone />
            </div>
            <div className="detail-info-content">
              <div className="detail-info-label">연락처</div>
              <div className="detail-info-value">
                {appointment.patientPhone || "010-1234-5678"}
              </div>
            </div>
          </div>
        </div>

        {/* 진료 결과 섹션 (완료된 경우만 표시) */}
        {appointment.status === "completed" && appointment.diagnosis && (
          <div className="detail-card result-card">
            <h3 className="detail-section-title">진료 결과</h3>

            <div className="result-item">
              <div className="result-label">진단명</div>
              <div className="result-value">{appointment.diagnosis}</div>
            </div>

            {appointment.prescription && (
              <div className="result-item">
                <div className="result-label">처방</div>
                <div className="result-value">{appointment.prescription}</div>
              </div>
            )}

            <div className="result-action">
              <button
                className="result-button"
                onClick={() => navigate(`/medical-records/${appointment.id}`)}
              >
                <FileText size={18} />
                진료/시술 기록 확인하기
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* 취소 사유 섹션 (취소된 경우만 표시) */}
        {appointment.status === "cancelled" &&
          appointment.cancellationReason && (
            <div className="detail-card cancellation-card">
              <h3 className="detail-section-title">취소 정보</h3>

              <div className="cancellation-info">
                <div className="cancellation-label">취소 사유</div>
                <div className="cancellation-value">
                  {appointment.cancellationReason}
                </div>
              </div>

              {appointment.cancellationDate && (
                <div className="cancellation-info">
                  <div className="cancellation-label">취소 일시</div>
                  <div className="cancellation-value">
                    {formatDate(appointment.cancellationDate)}{" "}
                    {formatTimeWithAmPm(
                      appointment.cancellationTime || "10:30"
                    )}
                  </div>
                </div>
              )}

              {appointment.refundAmount && (
                <div className="cancellation-info">
                  <div className="cancellation-label">환불 금액</div>
                  <div className="cancellation-value">
                    {appointment.refundAmount.toLocaleString()}원
                  </div>
                </div>
              )}
            </div>
          )}

        {/* 주의사항 섹션 */}
        <div className="detail-card notice-card">
          <h3 className="detail-section-title">예약 안내</h3>

          <ul className="notice-list">
            <li>예약 시간 10분 전에 도착해주세요.</li>
            <li>초진인 경우 건강보험증을 지참해주세요.</li>
            <li>
              부득이하게 예약을 취소해야 할 경우, 최소 2시간 전에 연락
              부탁드립니다.
            </li>
            <li>주차는 병원 주차장을 이용하실 수 있습니다.</li>
            <li>진료 후 처방전은 병원 앱에서도 확인 가능합니다.</li>
            <li>문의사항은 병원 대표번호로 연락해 주세요.</li>
          </ul>
        </div>

        {/* 병원 정보 섹션 추가 */}
        <div className="detail-card hospital-info-card">
          <h3 className="detail-section-title">병원 정보</h3>

          <div className="hospital-contact-info">
            <div className="hospital-contact-item">
              <div className="hospital-contact-label">대표번호</div>
              <div className="hospital-contact-value">
                {appointment.hospitalPhone || "02-123-4567"}
              </div>
            </div>

            <div className="hospital-contact-item">
              <div className="hospital-contact-label">운영시간</div>
              <div className="hospital-contact-value">
                {appointment.hospitalHours ||
                  "평일 09:00 - 18:00, 토요일 09:00 - 13:00, 일요일 휴진"}
              </div>
            </div>

            <div className="hospital-contact-item">
              <div className="hospital-contact-label">웹사이트</div>
              <div className="hospital-contact-value">
                {appointment.hospitalWebsite || "www.hospital.com"}
              </div>
            </div>
          </div>

          <button className="hospital-detail-button">
            병원 상세정보 보기
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* 예약 확정 상태일 때만 버튼 표시 */}
      {appointment.status === "confirmed" && (
        // <div className="detail-actions">
        //   <button
        //     className="action-button reschedule"
        //     onClick={handleRescheduleClick}
        //   >
        //     일정 변경
        //   </button>
        //   <button
        //     className="action-button cancel"
        //     onClick={handleCancelClick}
        //   >
        //     예약 취소
        //   </button>
        // </div>

        <div className="detail-page-footer">
          <div className="detail-actions">
            <button
              className="action-button reschedule"
              onClick={handleRescheduleClick}
            >
              일정 변경
            </button>
            <button
              className="action-button cancel"
              onClick={handleCancelClick}
            >
              예약 취소
            </button>
          </div>
        </div>
      )}

      {/* 취소 확인 팝업 */}
      <ConfirmationPopup
        isOpen={showCancelPopup}
        title="예약 취소"
        message={`${appointment?.hospitalName} ${formatDate(
          appointment?.date
        )} ${formatTimeWithAmPm(appointment?.time)} 예약을 취소하시겠습니까?`}
        confirmText="예약 취소"
        cancelText="돌아가기"
        onConfirm={confirmCancelAppointment}
        onCancel={closeCancelPopup}
        confirmButtonColor="#e11d48"
      />
    </div>
  );
};

export default AppointmentDetail;
