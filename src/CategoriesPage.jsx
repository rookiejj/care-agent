import { useNavigate, useLocation, Navigate } from "react-router-dom";

import "./CategoriesPage.css";
import { PageHeader } from "./App";
import MedicalCategories from "./MedicalCategories";
import CosmeticCategories from "./CosmeticCategories";

const CategoriesPage = ({ currentLocation }) => {
  const location = useLocation();
  const { state } = location;

  return (
    <div className="container">
      <PageHeader
        title="카테고리"
        showLocationButton={true}
        currentLocation={currentLocation}
        backButtonVisible={true}
      />
      <div className="content">
        <MedicalCategories />
        <div style={{ padding: "0 0.5rem" }}>
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
  );
};

export default CategoriesPage;
