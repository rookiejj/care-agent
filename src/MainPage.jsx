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
          style={{ margin: "1rem 0 0.5rem" }}
          goSearch={true}
          shouldAutoFocus={false}
        />

        <div className="section-container">
          <div className="section-header">
            <h3 className="section-title">증상/부위</h3>
          </div>
          <CosmeticCategories />
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
      </div>
    </div>
  );
};

export default MainPage;
