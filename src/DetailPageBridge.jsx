import React from "react";
import { useParams } from "react-router-dom";
import HospitalDetailPage from "./HospitalDetailPage";
import DoctorDetailPage from "./DoctorDetailPage";
import CommunityDetailPage from "./CommunityDetailPage";

const DetailPageBridge = () => {
  // URL 파라미터에서 type과 id 가져오기
  const { type, id } = useParams();

  // type에 따라 다른 컴포넌트 렌더링
  const renderDetailComponent = () => {
    switch (type) {
      case "medical":
        return <HospitalDetailPage id={id} />;
      case "cosmetic":
        return <HospitalDetailPage id={id} />;
      case "doctor":
        return <DoctorDetailPage id={id} />;
      case "community":
        return <CommunityDetailPage id={id} />;
      default:
        return <div>알 수 없는 병원 타입입니다.</div>;
    }
  };

  return (
    <div className="hospital-detail-container">
      <h1>병원 상세 정보</h1>
      {renderDetailComponent()}
    </div>
  );
};

export default DetailPageBridge;
