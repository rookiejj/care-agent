import "./MainPage.css";
import { PageHeader } from "./App";
import StatusWidget from "./StatusWidget";
import SearchBar from "./SearchBar";
import MedicalCategories from "./MedicalCategories";
import CosmeticCategories from "./CosmeticCategories";
import SpecialtyCategories from "./SpecialtyCategories";
import HealthCheckReminder from "./HealthCheckReminder";
import PopularHospitalsCarousel from "./PopularHospitalsCarousel";
import HealthTipsSection from "./HealthTipsSection";
import TopDoctorsProfiles from "./TopDoctorsProfiles";
import PromotionBanners from "./PromotionBanners";
import TrendingCommunityPosts from "./TrendingCommunityPosts";
import AppointmentStatusCard from "./AppointmentStatusCard";
import SeasonalHealthCampaign from "./SeasonalHealthCampaign";
import SymptomCheckerEntry from "./SymptomCheckerEntry";

const MainPage = ({ currentLocation, notificationCount }) => {
  const handleExternalBack = () => {
    window.location.href = "https://mz-healthcare.vercel.app/";
  };

  return (
    <div className="container">
      <PageHeader
        showMainIcon={true}
        title="슈퍼휴먼"
        showLocationButton={true}
        currentLocation={currentLocation}
        backButtonVisible={true}
        notificationCount={notificationCount}
        showNotification={true}
        onBack={handleExternalBack}
      />
      <div className="content">
        <StatusWidget />
        <SearchBar
          style={{ margin: "1rem 0 1rem" }}
          goSearch={true}
          shouldAutoFocus={false}
        />

        <div className="section-container">
          <div className="section-header">
            <h3 className="section-title">증상/부위</h3>
          </div>
          <MedicalCategories />
          <div style={{ padding: "0.5rem 0.5rem" }}>
            <div
              style={{
                width: "100%",
                borderBottom: "1px solid #eee",
              }}
            />
          </div>
          <CosmeticCategories />
        </div>

        <div className="section-container">
          <div className="section-header">
            <h3 className="section-title">진료과목</h3>
          </div>
          <SpecialtyCategories />
        </div>

        <div className="section-container" style={{ marginTop: "3rem" }}>
          {/* <div className="section-header">
            <h3 className="section-title">건강 체크 리마인더</h3>
          </div> */}
          <HealthCheckReminder />
        </div>

        {/* <div className="section-container" style={{ marginTop: "3rem" }}>
          <div className="section-header">
            <h3 className="section-title">진료과목</h3>
          </div>
          <PopularHospitalsCarousel />
        </div> */}

        <div className="section-container" style={{ marginTop: "0rem" }}>
          {/* <div className="section-header">
            <h3 className="section-title">진료과목</h3>
          </div> */}
          <HealthTipsSection />
        </div>

        {/* <div className="section-container" style={{ marginTop: "3rem" }}>
          <div className="section-header">
            <h3 className="section-title">진료과목</h3>
          </div>
          <TopDoctorsProfiles />
        </div> */}

        {/* <div className="section-container" style={{ marginTop: "3rem" }}>
          <div className="section-header">
            <h3 className="section-title">진료과목</h3>
          </div>
          <PromotionBanners />
        </div> */}

        {/* <div className="section-container" style={{ marginTop: "3rem" }}>
          <div className="section-header">
            <h3 className="section-title">진료과목</h3>
          </div>
          <TrendingCommunityPosts />
        </div> */}

        {/* <div className="section-container" style={{ marginTop: "3rem" }}>
          <div className="section-header">
            <h3 className="section-title">진료과목</h3>
          </div>
          <AppointmentStatusCard />
        </div> */}

        <div className="section-container" style={{ marginTop: "3rem" }}>
          {/* <div className="section-header">
            <h3 className="section-title">진료과목</h3>
          </div> */}
          <SeasonalHealthCampaign />
        </div>

        <div className="section-container" style={{ marginTop: "3rem" }}>
          <div className="section-header">
            <h3 className="section-title">증상 체커</h3>
          </div>
          <SymptomCheckerEntry />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
