import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { DataProvider, useData } from "./DataContext";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
  Navigate,
  Link,
} from "react-router-dom";
import { Home, Heart, Search, MessageCircle, User } from "lucide-react";
import {
  TrendingUp,
  Star,
  MapPin,
  Clock,
  ArrowLeft,
  Camera,
  Share2,
  Siren,
  Edit,
  Trash2,
  X,
  CheckCircle,
  Copy,
  Facebook,
  Instagram,
  Twitter,
  Link as LinkIcon,
} from "lucide-react";

import "./App.css";
import NotificationPage from "./NotificationPage";
import NotificationIcon from "./NotificationIcon";

const getSuperhumanIcon = () => {
  return `/images/${"super_human_icon.png"}`;
};

const getProfileImage = () => {
  return `/images/${"profile.png"}`;
};

const getMapImage = () => {
  return `/images/${"map.png"}`;
};

const PageHeader = ({
  title,
  onBack,
  backButtonVisible = false,
  rightComponent,
  showLocationButton,
  notificationCount = 0,
  currentLocation,
}) => {
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    navigate("/notifications");
  };

  const handleLocationSelect = () => {
    navigate("/location");
  };

  return (
    <div
      style={{
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: "100",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {backButtonVisible && (
          <button
            onClick={onBack}
            className="back-button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              border: "none",
              borderRadius: "0.5rem",
              backgroundColor: "#f3f4f6",
              color: "#4b5563",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#e5e7eb")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#f3f4f6")
            }
          >
            <img
              src={getSuperhumanIcon()}
              alt={name}
              style={{
                width: "2.5rem",
                height: "2.5rem",
                objectFit: "cover",
                borderRadius: "0.5rem",
              }}
            />
          </button>
        )}
        <h1
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
          }}
        >
          {title}
        </h1>
      </div>

      {notificationCount !== undefined ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <NotificationIcon
            count={notificationCount}
            onClick={handleNotificationClick}
          />
          {/* <LanguageSwitcher /> */}
        </div>
      ) : rightComponent ? (
        rightComponent
      ) : (
        ""
      )}
    </div>
  );
};

const LocationButton = ({ currentLocation }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/location")}
      style={{
        backgroundColor: "#dbeafe",
        padding: "1.2rem 1rem",
        borderRadius: "9999px",
        border: "none",
        cursor: "pointer",
        color: "black",
        fontSize: "0.875rem",
        whiteSpace: "nowrap",
        display: "flex",
        alignItems: "center",
        gap: "0.25rem",
        height: "28px",
      }}
    >
      <MapPin size={20} color="black" strokeWidth={1.5} />{" "}
      {currentLocation || t("common.location")}
    </button>
  );
};

const BottomNavigation = ({ currentPage }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="bottom-navigation">
      <div className="bottom-navigation-inner">
        <Link
          to="/"
          className={`nav-button ${
            currentPage === "main" ? "nav-button-active" : "nav-button-inactive"
          }`}
        >
          <Home size={20} />
          <span>홈</span>
        </Link>
        <Link
          to="/favorites"
          className={`nav-button ${
            currentPage === "gyms" ? "nav-button-active" : "nav-button-inactive"
          }`}
        >
          <Heart size={20} />
          <span>찜 목록</span>
        </Link>
        <Link
          to="/search"
          className={`nav-button ${
            currentPage === "trainers"
              ? "nav-button-active"
              : "nav-button-inactive"
          }`}
        >
          <Search size={20} />
          <span>검색</span>
        </Link>
        <Link
          to="/community"
          className={`nav-button ${
            currentPage === "community"
              ? "nav-button-active"
              : "nav-button-inactive"
          }`}
        >
          <MessageCircle size={20} />
          <span>커뮤니티</span>
        </Link>
        <Link
          to="/mypage"
          className={`nav-button ${
            currentPage === "mypage"
              ? "nav-button-active"
              : "nav-button-inactive"
          }`}
        >
          <User size={20} />
          <span>마이페이지</span>
        </Link>
      </div>
    </div>
  );
};

// 2. Main Pages
const MainPage = ({ currentLocation, notificationCount }) => {
  const { t } = useTranslation();
  const { communityData } = useData();
  const navigate = useNavigate();

  const handleExternalBack = () => {
    window.location.href = "https://mz-healthcare.vercel.app/";
  };

  return (
    <div className="container">
      <PageHeader
        title="몬짐 케어 (진료/시술)"
        showLocationButton={true}
        currentLocation={currentLocation}
        backButtonVisible={true}
        notificationCount={notificationCount}
        onBack={handleExternalBack}
      />
      <div
        style={{
          position: "relative",
          flex: 1,
          overflowY: "hidden",
          marginTop: "-3rem",
        }}
      ></div>
    </div>
  );
};

const App = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [notificationCount, setNotificationCount] = useState(2);

  return (
    <DataProvider>
      <BrowserRouter>
        <AppContent
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          notificationCount={notificationCount}
          setNotificationCount={setNotificationCount}
        />
      </BrowserRouter>
    </DataProvider>
  );
};

const AppContent = ({
  selectedLocation,
  setSelectedLocation,
  notificationCount,
  setNotificationCount,
}) => {
  const location = useLocation();
  const currentPage = getPageFromPath(location.pathname);

  // 현재 경로에서 페이지 이름을 추출하는 함수
  function getPageFromPath(pathname) {
    const path = pathname.split("/")[1];
    if (!path) return "main";
    return path;
  }

  const showBottomNav = [
    "main",
    "gyms",
    "trainers",
    "community",
    "mypage",
  ].includes(currentPage);

  return (
    <div className="app-wrapper">
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              currentLocation={selectedLocation}
              notificationCount={notificationCount}
            />
          }
        />
        <Route path="/main" element={<Navigate to="/" replace />} />
        {/* <Route
          path="/location"
          element={
            <LocationPage
              currentLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          }
        />
        <Route
          path="/gyms"
          element={
            <GymListPage
              currentLocation={selectedLocation}
              notificationCount={notificationCount}
            />
          }
        />
        <Route path="/gymDetail/:id" element={<GymDetailPage />} />
        <Route
          path="/trainers"
          element={
            <TrainerListPage
              currentLocation={selectedLocation}
              notificationCount={notificationCount}
            />
          }
        />
        <Route path="/trainerDetail/:id" element={<TrainerDetailPage />} />
        <Route
          path="/community"
          element={
            <CommunityPage
              currentLocation={selectedLocation}
              notificationCount={notificationCount}
            />
          }
        />
        <Route path="/communityDetail/:id" element={<CommunityDetailPage />} />
        <Route path="/communityCreate" element={<CommunityCreatePage />} />
        <Route
          path="/mypage"
          element={<MyPage notificationCount={notificationCount} />}
        />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/consultation" element={<ConsultationPage />} />
        <Route path="/reviewDetail/:reviewId" element={<ReviewDetailPage />} />
        <Route path="/reviewWrite" element={<ReviewWritePage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/visitBooking" element={<VisitBookingPage />} />
        <Route path="/notifications" element={<NotificationPage />} /> */}
        <Route path="/notifications" element={<NotificationPage />} />
      </Routes>

      {showBottomNav && <BottomNavigation currentPage={currentPage} />}
    </div>
  );
};

export default App;
