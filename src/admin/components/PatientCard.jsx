import React from "react";
import {
  User,
  Phone,
  Calendar,
  Clock,
  Activity,
  Info,
  ChevronRight,
  Scissors,
  Heart,
  Camera,
} from "lucide-react";
import "./PatientCard.css";

const PatientCard = ({ patient, onClick }) => {
  const {
    name,
    gender,
    age,
    phoneNumber,
    lastVisit,
    visitCount,
    status,
    upcomingAppointment,
    patientType,
    cosmeticInterests,
    hasBeforeAfterPhotos,
    previousProcedures,
  } = patient;

  // 상태에 따른 배지 스타일 및 텍스트 설정
  const getStatusBadgeClass = () => {
    switch (status) {
      case "정기 방문":
        return "patient-badge-regular";
      case "신규 환자":
        return "patient-badge-new";
      case "장기 미방문":
        return "patient-badge-inactive";
      default:
        return "patient-badge-regular";
    }
  };

  // 환자 유형에 따른 배지 스타일 설정
  const getTypeBadgeClass = () => {
    switch (patientType) {
      case "일반 환자":
        return "patient-type-general";
      case "성형 고객":
        return "patient-type-cosmetic";
      case "복합 서비스":
        return "patient-type-complex";
      default:
        return "patient-type-general";
    }
  };

  // 날짜 포맷 함수
  const formatDate = (date) => {
    if (!date || !(date instanceof Date)) return "-";

    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "오늘";
    } else if (diffDays === 1) {
      return "어제";
    } else if (diffDays < 7) {
      return `${diffDays}일 전`;
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)}주 전`;
    } else {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  };

  const formatUpcomingDate = (date) => {
    if (!date || !(date instanceof Date)) return null;

    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "오늘";
    } else if (diffDays === 1) {
      return "내일";
    } else if (diffDays < 7) {
      return `${diffDays}일 후`;
    } else {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  };

  return (
    <div className="patient-card" onClick={onClick}>
      <div className="patient-card-header">
        <div className="patient-basic-info">
          <div className="patient-avatar">
            <User size={20} />
          </div>
          <div className="patient-name-info">
            <h3 className="patient-name">{name}</h3>
            <div className="patient-attributes">
              <span className="patient-attribute">{gender}</span>
              <span className="patient-attribute">{age}세</span>
            </div>
          </div>
        </div>
        <div className="patient-badges">
          <div className={`patient-badge ${getStatusBadgeClass()}`}>
            {status}
          </div>
          <div className={`patient-badge ${getTypeBadgeClass()}`}>
            {patientType}
          </div>
        </div>
      </div>

      <div className="patient-card-content">
        <div className="patient-info-item">
          <Phone size={14} />
          <span>{phoneNumber}</span>
        </div>

        <div className="patient-info-item">
          <Calendar size={14} />
          <span>최근 방문: {formatDate(lastVisit)}</span>
        </div>

        <div className="patient-info-item">
          <Activity size={14} />
          <span>총 방문: {visitCount}회</span>
        </div>

        {upcomingAppointment && (
          <div className="patient-info-item upcoming">
            <Clock size={14} />
            <span>예정된 예약: {formatUpcomingDate(upcomingAppointment)}</span>
          </div>
        )}

        {/* 성형 관련 정보 추가 */}
        {patientType !== "일반 환자" &&
          cosmeticInterests &&
          cosmeticInterests.length > 0 && (
            <div className="patient-info-item cosmetic">
              <Heart size={14} />
              <span>
                관심 시술: {cosmeticInterests.slice(0, 2).join(", ")}
                {cosmeticInterests.length > 2
                  ? ` 외 ${cosmeticInterests.length - 2}개`
                  : ""}
              </span>
            </div>
          )}

        {/* 이전 시술 정보 추가 */}
        {previousProcedures && previousProcedures.length > 0 && (
          <div className="patient-info-item procedures">
            <Scissors size={14} />
            <span>이전 시술: {previousProcedures.join(", ")}</span>
          </div>
        )}

        {/* 전후 사진 여부 표시 */}
        {hasBeforeAfterPhotos && (
          <div className="patient-info-item photos">
            <Camera size={14} />
            <span>전후 사진 있음</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientCard;
