import React from "react";
import { PageHeader } from "./App";
import { useNavigate, useParams } from "react-router-dom";
import MedicalRecord from "./MedicalRecord";

const MedicalRecordsPage = () => {
  const navigate = useNavigate();
  const { appointmentId } = useParams();

  // 페이지 제목 설정 - 특정 진료 기록을 보는 경우 제목 변경
  const pageTitle = appointmentId ? "진료 상세 기록" : "진료 기록";

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className="container">
      <div className="fixed-header">
        <PageHeader
          title="진료 기록"
          backButtonVisible={true}
          onBack={handleBackClick}
        />
      </div>
      <MedicalRecord appointmentId={appointmentId} />
    </div>
  );
};

export default MedicalRecordsPage;
