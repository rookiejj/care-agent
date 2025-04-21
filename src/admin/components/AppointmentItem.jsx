import React from "react";
import { Clock, User, CheckCircle, AlertCircle } from "lucide-react";
import "./AppointmentItem.css";

const AppointmentItem = ({ appointment }) => {
  const { patientName, time, department, doctorName, status } = appointment;

  const getStatusBadge = () => {
    switch (status) {
      case "confirmed":
        return (
          <span className="appointment-badge confirmed">
            <CheckCircle size={14} />
            <span>확정</span>
          </span>
        );
      case "waiting":
        return (
          <span className="appointment-badge waiting">
            <AlertCircle size={14} />
            <span>대기중</span>
          </span>
        );
      case "cancelled":
        return (
          <span className="appointment-badge cancelled">
            <AlertCircle size={14} />
            <span>취소됨</span>
          </span>
        );
      case "completed":
        return (
          <span className="appointment-badge completed">
            <CheckCircle size={14} />
            <span>완료</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="appointment-item">
      <div className="appointment-time">
        <Clock size={16} />
        <span>{time}</span>
      </div>
      <div className="appointment-info">
        <div className="appointment-patient">
          <User size={16} />
          <span className="patient-name">{patientName}</span>
        </div>
        <div className="appointment-details">
          <span className="appointment-department">{department}</span>
          <span className="appointment-separator">•</span>
          <span className="appointment-doctor">{doctorName} 의사</span>
        </div>
      </div>
      <div className="appointment-status">{getStatusBadge()}</div>
    </div>
  );
};

export default AppointmentItem;
