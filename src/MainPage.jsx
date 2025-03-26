import "./MainPage.css";
import { PageHeader } from "./App";
import StatusWidget from "./StatusWidget";
import SearchBar from "./SearchBar";
import MedicalCategories from "./MedicalCategories";
import CosmeticCategories from "./CosmeticCategories";

const MainPage = ({ currentLocation, notificationCount }) => {
  const handleExternalBack = () => {
    window.location.href = "https://mz-healthcare.vercel.app/";
  };

  return (
    <div className="container">
      <PageHeader
        showMainIcon={true}
        title="몬짐 케어 (진료/시술)"
        showLocationButton={true}
        currentLocation={currentLocation}
        backButtonVisible={true}
        notificationCount={notificationCount}
        showNotification={true}
        onBack={handleExternalBack}
      />
      <div className="content">
        <StatusWidget />
        <SearchBar style={{ margin: "2rem 0 0.5rem" }} goSearch={true} />

        <div className="section-container">
          <div className="section-header">
            <h3 className="section-title">자주 찾는</h3>
          </div>
          <MedicalCategories />
          <div style={{ padding: "1.5rem 0.5rem" }}>
            <div
              style={{
                width: "100%",
                borderBottom: "1px solid #eee",
              }}
            />
          </div>
          <CosmeticCategories />
          <div style={{ height: "30rem" }}></div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
