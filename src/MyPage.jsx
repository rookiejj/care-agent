import React from "react";
import { PageHeader } from "./App";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Award,
  MapPin,
  Calendar,
  MessageCircle,
  Heart,
  Gift,
  Edit,
  Bell,
} from "lucide-react";
import "./MyPage.css";

const MenuItem = ({ icon, text, onClick, rightComponent }) => {
  return (
    <div className="menu-item" onClick={onClick}>
      <div className="menu-item-left">
        {icon}
        <span>{text}</span>
      </div>
      {rightComponent || <ChevronRight size={18} color="#9ca3af" />}
    </div>
  );
};

const MyPage = ({ currentLocation, notificationCount }) => {
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <div className="container">
      <PageHeader
        title="마이페이지"
        backButtonVisible={false}
        showNotification={true}
        notificationCount={notificationCount}
      />
      <div className="content mypage-content">
        {/* 사용자 프로필 섹션 */}
        <div className="profile-section">
          <div className="profile-card">
            <div className="profile-info">
              <div className="profile-avatar">
                <img
                  src="/images/profile.png"
                  alt="Profile"
                  className="avatar-image"
                />
              </div>
              <div className="profile-details">
                <div className="profile-name-container">
                  <h3 className="profile-name">초코로이</h3>
                  <ChevronRight size={18} color="#9ca3af" />
                </div>
                <div className="profile-level">Lv.1</div>
              </div>
            </div>
          </div>
        </div>

        {/* 포인트 정보 */}
        <div className="points-section">
          <MenuItem
            icon={<Award size={20} color="#6b7280" />}
            text="내 포인트"
            rightComponent={<span className="points-value">200 P</span>}
            // onClick={() => handleMenuClick("/points")}
          />
        </div>

        {/* 메뉴 그룹 1 */}
        <div className="menu-group">
          <MenuItem
            icon={<MapPin size={20} color="#6b7280" />}
            text="활동ㆍ지정내역"
            // onClick={() => handleMenuClick("/activities")}
          />
          <MenuItem
            icon={<Calendar size={20} color="#6b7280" />}
            text="내 예약ㆍ결제 내역"
            // onClick={() => handleMenuClick("/bookings")}
          />
        </div>

        {/* 메뉴 그룹 2 */}
        <div className="menu-group">
          <MenuItem
            icon={<Heart size={20} color="#6b7280" />}
            text="찜 목록"
            onClick={() => handleMenuClick("/favorites")}
          />
          <MenuItem
            icon={<Gift size={20} color="#6b7280" />}
            text="혜택"
            rightComponent={<div className="notification-dot"></div>}
            // onClick={() => handleMenuClick("/benefits")}
          />
        </div>

        {/* 메뉴 그룹 3 */}
        <div className="menu-group">
          <MenuItem
            icon={<Edit size={20} color="#6b7280" />}
            text="후기"
            // onClick={() => handleMenuClick("/reviews")}
          />
          <MenuItem
            icon={<Bell size={20} color="#6b7280" />}
            text="알림"
            onClick={() => handleMenuClick("/notifications")}
          />
        </div>

        {/* Footer */}
        <div className="footer-section">
          <h4 className="footer-title">활동</h4>
          <div className="footer-item">
            <span>시술 전후 사진</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
