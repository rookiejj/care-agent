// StatusWidget.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

import "./StatusWidget.css";

// 진행 바 컴포넌트 - 진료/시술에 따라 다른 색상 사용
const ProgressBar = ({ progress, type }) => {
  const gradientClass =
    type === "medical" ? "medical-gradient" : "cosmetic-gradient";

  return (
    <div className="progress-bar">
      <div
        className={`progress-fill ${gradientClass}`}
        style={{ width: `${progress}%` }}
      >
        &nbsp;
      </div>
    </div>
  );
};

// 예약 항목 컴포넌트
const AppointmentItem = ({ title, date, progress, type }) => {
  return (
    <div className="appointment-item">
      <div className="appointment-header">
        <p>
          <span className={`tag-${type}`}>
            {type === "medical" ? "진료" : "시술"}
          </span>{" "}
          {title}
        </p>
        <p className="text-sm">{date}</p>
      </div>
      <ProgressBar progress={progress} type={type} />
    </div>
  );
};

// 상태 위젯 컴포넌트
const StatusWidget = () => {
  const navigate = useNavigate();

  // 예시 데이터 - 실제 구현시 props나 context로 받아오면 됩니다
  const appointments = [
    {
      id: 1,
      title: "피부 관리 프로그램",
      date: "내일 오후 2시 피부과",
      progress: 65,
      type: "cosmetic",
    },
    {
      id: 2,
      title: "건강검진 예약",
      date: "4월 3일 오전 10시 내과",
      progress: 30,
      type: "medical",
    },
  ];

  return (
    <div
      className="card"
      style={{ cursor: "pointer" }}
      onClick={() => navigate("/appointments")}
    >
      <div className="status-widget">
        <h3 className="widget-title">진행 중인 예약</h3>

        {appointments.map((appointment) => (
          <AppointmentItem
            key={appointment.id}
            title={appointment.title}
            date={appointment.date}
            progress={appointment.progress}
            type={appointment.type}
          />
        ))}
      </div>
    </div>
  );
};

export default StatusWidget;
