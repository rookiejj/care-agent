import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Info,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import "./AppointmentStatusCard.css";

const AppointmentStatusCard = () => {
  // 가상의 예약 데이터
  const appointments = [
    {
      id: 1,
      hospitalName: "서울 연세 내과",
      doctorName: "박준호",
      specialty: "심장내과",
      date: "2025년 4월 25일",
      time: "오후 2:30",
      address: "서울시 강남구 테헤란로 123",
      status: "upcoming", // upcoming, confirmed, completed, canceled
      reason: "정기 검진",
    },
  ];

  // 예약이 없는 경우를 위한 디스플레이
  const noAppointments = !appointments || appointments.length === 0;

  // 상태에 따른 스타일 및 텍스트
  const getStatusInfo = (status) => {
    switch (status) {
      case "upcoming":
        return {
          text: "예약 대기중",
          statusClass: "status-upcoming",
          icon: <Clock className="status-badge-icon" />,
        };
      case "confirmed":
        return {
          text: "예약 확정",
          statusClass: "status-confirmed",
          icon: <CheckCircle className="status-badge-icon" />,
        };
      case "completed":
        return {
          text: "진료 완료",
          statusClass: "status-completed",
          icon: <CheckCircle className="status-badge-icon" />,
        };
      case "canceled":
        return {
          text: "예약 취소됨",
          statusClass: "status-canceled",
          icon: <AlertCircle className="status-badge-icon" />,
        };
      default:
        return {
          text: "상태 확인 필요",
          statusClass: "status-unknown",
          icon: <Info className="status-badge-icon" />,
        };
    }
  };

  // 다음 예약 정보 (있는 경우)
  const nextAppointment =
    appointments && appointments.length > 0 ? appointments[0] : null;
  const statusInfo = nextAppointment
    ? getStatusInfo(nextAppointment.status)
    : null;

  return (
    <div className="section-container appointment-container">
      <div className="appointment-header">
        <h3 className="section-title appointment-title">내 예약</h3>
        <span className="appointment-view-all">
          모든 예약 보기
          <ChevronRight className="appointment-view-all-icon" />
        </span>
      </div>

      {noAppointments ? (
        <div className="no-appointment">
          <div className="no-appointment-icon-container">
            <Calendar className="no-appointment-icon" />
          </div>
          <h4 className="no-appointment-title">예약된 진료가 없습니다</h4>
          <p className="no-appointment-text">지금 바로 진료를 예약해 보세요.</p>
          <button className="book-appointment-button">진료 예약하기</button>
        </div>
      ) : (
        <div className="appointment-card">
          <div className="appointment-card-content">
            <div className="appointment-card-header">
              <div className="hospital-info">
                <h4 className="hospital-name">
                  {nextAppointment.hospitalName}
                </h4>
                <p className="doctor-info">
                  {nextAppointment.doctorName} 의사 ·{" "}
                  {nextAppointment.specialty}
                </p>
              </div>
              <div className={`status-badge ${statusInfo.statusClass}`}>
                {statusInfo.icon}
                <span>{statusInfo.text}</span>
              </div>
            </div>

            <div className="appointment-details">
              <div className="appointment-detail-item">
                <Calendar className="appointment-detail-icon" />
                <span>{nextAppointment.date}</span>
                <span className="mx-1">·</span>
                <span>{nextAppointment.time}</span>
              </div>

              <div className="appointment-detail-item">
                <MapPin className="appointment-detail-icon" />
                <span>{nextAppointment.address}</span>
              </div>

              <div className="appointment-detail-item">
                <Info className="appointment-detail-icon" />
                <span>진료 사유: {nextAppointment.reason}</span>
              </div>
            </div>
          </div>

          <div className="appointment-actions">
            <button className="modify-button">예약 변경</button>
            <div className="divider"></div>
            <button className="cancel-button">예약 취소</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentStatusCard;
