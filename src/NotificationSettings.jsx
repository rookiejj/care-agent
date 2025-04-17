import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "./App";
import {
  Bell,
  MessageCircle,
  Calendar,
  Shield,
  Megaphone,
  Info,
} from "lucide-react";
import "./SettingsPages.css";

const NotificationSettings = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "예약 알림",
      description: "예약 확정, 변경, 취소 등 예약 관련 알림을 받습니다.",
      enabled: true,
      icon: <Calendar size={16} />,
    },
    {
      id: 2,
      title: "진료 알림",
      description: "진료 결과, 처방전 발급 등 진료 관련 알림을 받습니다.",
      enabled: true,
      icon: <Shield size={16} />,
    },
    {
      id: 3,
      title: "커뮤니티 알림",
      description: "내 게시글에 대한 댓글 및 답변 알림을 받습니다.",
      enabled: false,
      icon: <MessageCircle size={16} />,
    },
    {
      id: 4,
      title: "마케팅 알림",
      description: "이벤트, 프로모션, 할인 등 마케팅 정보를 받습니다.",
      enabled: false,
      icon: <Megaphone size={16} />,
    },
    {
      id: 5,
      title: "서비스 업데이트",
      description: "서비스 변경사항, 공지사항 등 정보를 받습니다.",
      enabled: true,
      icon: <Info size={16} />,
    },
  ]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const toggleNotification = (id) => {
    setNotifications(
      notifications.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  return (
    <div className="container">
      <div className="fixed-header">
        <PageHeader
          title="알림 설정"
          backButtonVisible={true}
          onBack={handleBackClick}
        />
      </div>

      <div className="settings-content">
        <div className="settings-card">
          <h3 className="settings-section-title">
            <Bell size={18} />
            알림 설정
          </h3>
          <div className="notification-list">
            {notifications.map((notification) => (
              <div key={notification.id} className="notification-item">
                <div className="notification-item-content">
                  <div className="notification-title">
                    {notification.icon} {notification.title}
                  </div>
                  <div className="notification-description">
                    {notification.description}
                  </div>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={notification.enabled}
                    onChange={() => toggleNotification(notification.id)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="settings-card">
          <h3 className="settings-section-title">
            <Bell size={18} />
            알림 수신 방법
          </h3>
          <div className="notification-list">
            <div className="notification-item">
              <div className="notification-item-content">
                <div className="notification-title">앱 푸시 알림</div>
                <div className="notification-description">
                  모바일 앱을 통해 푸시 알림을 수신합니다.
                </div>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={true} onChange={() => {}} />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="notification-item">
              <div className="notification-item-content">
                <div className="notification-title">SMS 알림</div>
                <div className="notification-description">
                  휴대폰 번호로 SMS 알림을 수신합니다.
                </div>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={true} onChange={() => {}} />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="notification-item">
              <div className="notification-item-content">
                <div className="notification-title">이메일 알림</div>
                <div className="notification-description">
                  등록된 이메일로 알림을 수신합니다.
                </div>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={false} onChange={() => {}} />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="settings-card">
          <h3 className="settings-section-title">
            <Bell size={18} />
            알림 수신 시간 설정
          </h3>
          <div className="notification-list">
            <div className="notification-item">
              <div className="notification-item-content">
                <div className="notification-title">방해금지 시간 설정</div>
                <div className="notification-description">
                  설정한 시간 동안에는 알림을 받지 않습니다.
                </div>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={false} onChange={() => {}} />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div
              className="notification-item"
              style={{ opacity: 0.5, pointerEvents: "none" }}
            >
              <div className="notification-item-content">
                <div className="notification-title">방해금지 시간</div>
                <div className="notification-description">22:00 ~ 08:00</div>
              </div>
              <button className="edit-button" disabled={true}>
                설정
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
