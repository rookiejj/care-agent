import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell } from "lucide-react";
import {
  Clock,
  CheckCircle,
  CreditCard,
  MessageCircle,
  Gift,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const NotificationPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");

  // 알림 필터 옵션
  const filterOptions = [
    { id: "all", label: "전체" },
    { id: "system", label: "시스템" },
    { id: "booking", label: "예약" },
    { id: "payment", label: "결제" },
    { id: "community", label: "커뮤니티" },
  ];

  // 더미 알림 데이터 (일부 표시)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "system",
      icon: <Clock size={20} color="#3b82f6" />,
      iconBg: "#dbeafe",
      title: "진료 예약 만료 안내",
      content:
        "고객님의 정기 검진 예약이 3일 후 만료됩니다. 재예약을 원하시면 예약 페이지를 방문해주세요.",
      time: "방금 전",
      read: false,
    },
    {
      id: 2,
      type: "booking",
      icon: <CheckCircle size={20} color="#10b981" />,
      iconBg: "#dcfce7",
      title: "진료 예약 확정",
      content: "김의사 선생님과의 상담이 내일 오후 2시로 확정되었습니다.",
      time: "1시간 전",
      read: false,
    },
    {
      id: 3,
      type: "payment",
      icon: <CreditCard size={20} color="#eab308" />,
      iconBg: "#fef9c3",
      title: "결제 완료",
      content: "물리치료 10회 패키지 결제가 성공적으로 완료되었습니다.",
      time: "어제",
      read: true,
    },
    {
      id: 4,
      type: "community",
      icon: <MessageCircle size={20} color="#f97316" />,
      iconBg: "#ffedd5",
      title: "새 후기 알림",
      content:
        "고객님의 치료 후기에 새로운 댓글이 달렸습니다: '치료 경험 공유 감사합니다!'",
      time: "2일 전",
      read: true,
    },
    {
      id: 5,
      type: "system",
      icon: <Gift size={20} color="#3b82f6" />,
      iconBg: "#dbeafe",
      title: "이벤트 알림",
      content:
        "신규 고객 이벤트: 이번 달 첫 방문 고객 대상 건강 검진 20% 할인 이벤트를 진행합니다.",
      time: "3일 전",
      read: true,
    },
  ]);

  // 알림을 읽음 처리하는 함수
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // 모든 알림 읽음 처리
  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  // 현재 필터에 맞는 알림만 표시
  const filteredNotifications = notifications.filter(
    (notification) =>
      activeFilter === "all" || notification.type === activeFilter
  );

  // 읽지 않은 알림 수 계산
  const unreadCount = notifications.filter((notif) => !notif.read).length;

  // 탭 버튼 렌더링 함수
  const renderTabButton = (filter) => {
    const isActive = activeFilter === filter.id;

    return (
      <button
        key={filter.id}
        onClick={() => setActiveFilter(filter.id)}
        style={{
          flex: 1,
          padding: "0.75rem 0",
          fontSize: "0.875rem",
          fontWeight: isActive ? "500" : "normal",
          color: isActive ? "#3b82f6" : "#6b7280",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "center",
          position: "relative",
          transition: "color 0.2s ease",
        }}
      >
        {filter.label}
        {isActive && (
          <div
            style={{
              position: "absolute",
              bottom: -1,
              left: "30%",
              right: "30%",
              height: "2px",
              backgroundColor: "#3b82f6",
            }}
          />
        )}
      </button>
    );
  };

  return (
    <div className="container" style={{ backgroundColor: "white" }}>
      {/* 헤더 */}
      <div className="detail-page-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft size={20} />
        </button>
        <h1
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: "1.25rem",
            fontWeight: "bold",
            margin: 0,
            pointerEvents: "none", // 텍스트 클릭이 뒤의 버튼에 영향을 주지 않도록
          }}
        >
          알림
        </h1>
        {unreadCount > 0 && (
          <div style={{ marginLeft: "auto" }}>
            <button
              onClick={markAllAsRead}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "0.875rem",
                color: "#3b82f6",
                padding: "0.5rem",
              }}
            >
              모두 읽음
            </button>
          </div>
        )}
      </div>

      <div
        style={{
          position: "relative",
          flex: 1,
          overflowY: "hidden",
          // marginTop: "-3rem",
        }}
      >
        {/* 필터 탭 */}
        <div
          style={{
            position: "sticky",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "white",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* 탭 버튼 컨테이너 */}
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            {filterOptions.map(renderTabButton)}
          </div>
        </div>

        {/* 알림 목록 */}
        <div style={{ height: "calc(100% - 40px)", overflowY: "auto" }}>
          {filteredNotifications.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "3rem 1rem",
                color: "#6b7280",
              }}
            >
              <Bell
                size={40}
                strokeWidth={1.5}
                style={{ marginBottom: "1rem", opacity: 0.5 }}
              />
              <p style={{ margin: 0 }}>알림이 없습니다</p>
            </div>
          ) : (
            <div style={{ paddingBottom: "4rem" }}>
              {filteredNotifications.map((notification, index) => (
                <div
                  key={`${notification.id}-${index}`}
                  onClick={() => markAsRead(notification.id)}
                  style={{
                    padding: "1rem",
                    display: "flex",
                    alignItems: "flex-start",
                    borderBottom: "1px solid #e5e7eb",
                    backgroundColor: notification.read ? "white" : "#f9fafb",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      borderRadius: "50%",
                      backgroundColor: notification.iconBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "1rem",
                      flexShrink: 0,
                    }}
                  >
                    {notification.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "0.25rem",
                      }}
                    >
                      <span style={{ fontWeight: "500" }}>
                        {notification.title}
                      </span>
                      <span style={{ color: "#6b7280", fontSize: "0.75rem" }}>
                        {notification.time}
                      </span>
                    </div>
                    <p
                      style={{
                        color: "#4b5563",
                        fontSize: "0.875rem",
                        margin: 0,
                        lineHeight: "1.4",
                      }}
                    >
                      {notification.content}
                    </p>
                  </div>
                  {!notification.read && (
                    <div
                      style={{
                        width: "0.5rem",
                        height: "0.5rem",
                        borderRadius: "50%",
                        backgroundColor: "#3b82f6",
                        marginLeft: "0.5rem",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
