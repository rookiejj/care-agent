import "./MyPage.css";
import { PageHeader } from "./App";
import MedicalCategories from "./MedicalCategories";
import CosmeticCategories from "./CosmeticCategories";

const MyPage = ({ currentLocation, notificationCount }) => {
  return (
    <div className="container">
      <PageHeader
        title="마이 페이지"
        showLocationButton={true}
        currentLocation={currentLocation}
        backButtonVisible={false}
        notificationCount={notificationCount}
        showNotification={true}
      />
      <div className="content"></div>
    </div>
  );
};

export default MyPage;
