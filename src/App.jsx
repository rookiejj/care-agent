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
import { Home, Heart, Search, MessageCircle, User, Tags } from "lucide-react";
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
import MainPage from "./MainPage";
import FavoritesPage from "./FavoritesPage";
import SearchPage from "./SearchPage";
import CommunityPage from "./CommunityPage";
import MyPage from "./MyPage";
import CategoriesPage from "./CategoriesPage";
import RegionSelectPage from "./RegionSelectPage";
import LocationHeader from "./LocationHeader";

const getSuperhumanIcon = () => {
  return `/images/${"super_human_icon.png"}`;
};

export const getProfileImage = () => {
  return `/images/${"profile.png"}`;
};

const getMapImage = () => {
  return `/images/${"map.png"}`;
};

export const getHospitalImage = (type, id = 1) => {
  // 타입과 ID에 따라 적절한 이미지 경로를 반환합니다
  const imageMap = {
    all: ["hospital1.jpg", "hospital2.jpg", "hospital3.jpg"],
  };

  // 배열 범위를 벗어나지 않도록 인덱스 계산
  const index = (id - 1) % (imageMap[type]?.length || 1);
  const imageName = imageMap[type]?.[index] || "hospital1.jpg";

  return `/images/hospitals/${imageName}`;
};

export const getCosmeticAdImage = (type, id = 1) => {
  // 타입과 ID에 따라 적절한 이미지 경로를 반환합니다
  const imageMap = {
    all: ["advertise1.jpg"],
  };

  // 배열 범위를 벗어나지 않도록 인덱스 계산
  const index = (id - 1) % (imageMap[type]?.length || 1);
  const imageName = imageMap[type]?.[index] || "advertise1.jpg";

  return `/images/cosmetic_ads/${imageName}`;
};

export const getMedicalAdImage = (type, id = 1) => {
  // 타입과 ID에 따라 적절한 이미지 경로를 반환합니다
  const imageMap = {
    all: ["advertise1.jpg"],
  };

  // 배열 범위를 벗어나지 않도록 인덱스 계산
  const index = (id - 1) % (imageMap[type]?.length || 1);
  const imageName = imageMap[type]?.[index] || "advertise1.jpg";

  return `/images/medical_ads/${imageName}`;
};

export const PageHeader = ({
  showMainIcon = false,
  title,
  onBack,
  backButtonVisible = false,
  rightComponent,
  showLocationButton = false,
  notificationCount = 0,
  showNotification = false,
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
        height: "1.5rem",
        marginTop: "0.5rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {backButtonVisible && (
          <button
            onClick={onBack}
            className="back-button"
            // onMouseOver={(e) =>
            //   (e.currentTarget.style.backgroundColor = "#e5e7eb")
            // }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            {showMainIcon ? (
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
            ) : (
              <ArrowLeft size={20} />
            )}
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

      <div style={{ display: "flex", alignItems: "center" }}>
        {showLocationButton && (
          <LocationHeader currentLocation={currentLocation} />
        )}

        {showNotification && notificationCount !== undefined ? (
          <NotificationIcon
            count={notificationCount}
            onClick={handleNotificationClick}
          />
        ) : null}

        {rightComponent ? rightComponent : null}
      </div>
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

  // New handler for search navigation
  const handleSearchClick = (e) => {
    e.preventDefault();
    navigate("/search");

    // Add a small delay before trying to focus the search input
    setTimeout(() => {
      const searchInput = document.querySelector('input[type="text"]');
      if (searchInput) {
        searchInput.focus();

        // Create a touch event for iOS
        try {
          const touchEvent = new TouchEvent("touchstart", {
            bubbles: true,
            cancelable: true,
            view: window,
          });
          searchInput.dispatchEvent(touchEvent);
          searchInput.click();
        } catch (e) {
          // Fallback
          searchInput.click();
        }
      }
    }, 100);
  };

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
            currentPage === "favorites"
              ? "nav-button-active"
              : "nav-button-inactive"
          }`}
        >
          <Heart size={20} />
          <span>찜 목록</span>
        </Link>
        <Link
          to="/search"
          className={`nav-button ${
            currentPage === "search"
              ? "nav-button-active"
              : "nav-button-inactive"
          }`}
        >
          <Search size={20} />
          <span>검색</span>
        </Link>
        {/* <Link
          to="/category"
          className={`nav-button ${
            currentPage === "category"
              ? "nav-button-active"
              : "nav-button-inactive"
          }`}
        >
          <Tags size={20} />
          <span>카테고리</span>
        </Link> */}
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
  const { t, i18n } = useTranslation();
  const currentPage = getPageFromPath(location.pathname);

  // 현재 경로에서 페이지 이름을 추출하는 함수
  function getPageFromPath(pathname) {
    const path = pathname.split("/")[1];
    if (!path) return "main";
    return path;
  }

  const showBottomNav = [
    "main",
    "favorites",
    "search",
    "community",
    "mypage",
  ].includes(currentPage);

  // Handle iOS swipe prevention
  useEffect(() => {
    // Detect if device is iOS
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (isIOS && showBottomNav) {
      document.body.classList.add("bottom-navigation-active");
      document.querySelector(".app-wrapper").classList.add("has-bottom-nav");

      // Handle orientation changes
      const handleOrientationChange = () => {
        // Force layout recalculation
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 50);
      };

      window.addEventListener("orientationchange", handleOrientationChange);

      return () => {
        document.body.classList.remove("bottom-navigation-active");
        document
          .querySelector(".app-wrapper")
          .classList.remove("has-bottom-nav");
        window.removeEventListener(
          "orientationchange",
          handleOrientationChange
        );
      };
    }

    return () => {
      document.body.classList.remove("bottom-navigation-active");
      document.querySelector(".app-wrapper").classList.remove("has-bottom-nav");
    };
  }, [showBottomNav]);

  // Set correct text direction based on language
  useEffect(() => {
    document.documentElement.setAttribute(
      "dir",
      ["ar", "he", "fa", "ur"].includes(i18n.language) ? "rtl" : "ltr"
    );
  }, [i18n.language]);

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
        <Route path="/region-select" element={<RegionSelectPage />} />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              currentLocation={selectedLocation}
              notificationCount={notificationCount}
            />
          }
        />
        <Route
          path="/search"
          element={
            <SearchPage
              currentLocation={selectedLocation}
              notificationCount={notificationCount}
            />
          }
        />
        <Route
          path="/categories"
          element={<CategoriesPage currentLocation={selectedLocation} />}
        />
        <Route
          path="/community"
          element={
            <CommunityPage
              currentLocation={selectedLocation}
              notificationCount={notificationCount}
            />
          }
        />
        <Route
          path="/mypage"
          element={
            <MyPage
              currentLocation={selectedLocation}
              notificationCount={notificationCount}
            />
          }
        />
        {/* <Route
          path="/location"
          element={
            <LocationPage
              currentLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
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
