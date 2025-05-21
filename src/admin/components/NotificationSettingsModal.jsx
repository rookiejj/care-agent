import React, { useState } from "react";
import {
  X,
  Bell,
  Clock,
  Calendar,
  Mail,
  MessageSquare,
  FileText,
  Settings,
  User,
  Save,
  Moon,
  Smartphone,
  Trash2,
  AlertCircle,
} from "lucide-react";
import "./NotificationSettingsModal.css";

const NotificationSettingsModal = ({ onClose, onSave }) => {
  const [settings, setSettings] = useState({
    generalEnabled: true,
    appointmentReminders: true,
    consultationUpdates: true,
    paymentNotifications: true,
    systemAnnouncements: true,
    marketingMessages: false,
    quietHours: {
      enabled: false,
      startHour: "22:00",
      endHour: "08:00",
    },
    channels: {
      app: true,
      email: true,
      sms: false,
    },
    autoDelete: {
      enabled: true,
      days: 30,
    },
  });

  const handleToggleChange = (key) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: !prevSettings[key],
    }));
  };

  const handleNestedToggleChange = (parentKey, childKey) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [parentKey]: {
        ...prevSettings[parentKey],
        [childKey]: !prevSettings[parentKey][childKey],
      },
    }));
  };

  const handleNestedValueChange = (parentKey, childKey, value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [parentKey]: {
        ...prevSettings[parentKey],
        [childKey]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(settings);
  };

  // 시간 옵션 생성
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      const formattedHour = hour.toString().padStart(2, "0");
      options.push(`${formattedHour}:00`);
      options.push(`${formattedHour}:30`);
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target.className === "modal-overlay" && onClose()}
    >
      <div
        className="notification-settings-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="notification-settings-modal-header">
          <h2>알림 설정</h2>
          <button className="modal-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="notification-settings-modal-form"
        >
          <div className="notification-settings-section">
            <h3 className="notification-settings-section-title">
              일반 알림 설정
            </h3>
            <p className="notification-settings-description">
              알림을 받을 항목을 선택해주세요. 알림은 앱 내 알림, 이메일, SMS
              등으로 전송될 수 있습니다.
            </p>

            <div className="notification-settings-option">
              <div className="notification-option-label">
                <div className="notification-option-icon">
                  <Bell size={16} />
                </div>
                <div className="notification-option-info">
                  <span className="notification-option-name">전체 알림</span>
                  <span className="notification-option-description">
                    모든 알림을 활성화 또는 비활성화합니다
                  </span>
                </div>
              </div>
              <label className="notification-toggle">
                <input
                  type="checkbox"
                  checked={settings.generalEnabled}
                  onChange={() => handleToggleChange("generalEnabled")}
                />
                <span className="notification-slider"></span>
              </label>
            </div>

            <div className="notification-settings-option">
              <div className="notification-option-label">
                <div className="notification-option-icon">
                  <Calendar size={16} />
                </div>
                <div className="notification-option-info">
                  <span className="notification-option-name">예약 알림</span>
                  <span className="notification-option-description">
                    예약 확인, 변경, 취소 등에 대한 알림
                  </span>
                </div>
              </div>
              <label className="notification-toggle">
                <input
                  type="checkbox"
                  checked={settings.appointmentReminders}
                  onChange={() => handleToggleChange("appointmentReminders")}
                  disabled={!settings.generalEnabled}
                />
                <span className="notification-slider"></span>
              </label>
            </div>

            <div className="notification-settings-option">
              <div className="notification-option-label">
                <div className="notification-option-icon">
                  <MessageSquare size={16} />
                </div>
                <div className="notification-option-info">
                  <span className="notification-option-name">상담 알림</span>
                  <span className="notification-option-description">
                    상담 일정 및 결과에 대한 알림
                  </span>
                </div>
              </div>
              <label className="notification-toggle">
                <input
                  type="checkbox"
                  checked={settings.consultationUpdates}
                  onChange={() => handleToggleChange("consultationUpdates")}
                  disabled={!settings.generalEnabled}
                />
                <span className="notification-slider"></span>
              </label>
            </div>

            <div className="notification-settings-option">
              <div className="notification-option-label">
                <div className="notification-option-icon">
                  <FileText size={16} />
                </div>
                <div className="notification-option-info">
                  <span className="notification-option-name">결제 알림</span>
                  <span className="notification-option-description">
                    결제 완료, 환불, 영수증에 대한 알림
                  </span>
                </div>
              </div>
              <label className="notification-toggle">
                <input
                  type="checkbox"
                  checked={settings.paymentNotifications}
                  onChange={() => handleToggleChange("paymentNotifications")}
                  disabled={!settings.generalEnabled}
                />
                <span className="notification-slider"></span>
              </label>
            </div>

            <div className="notification-settings-option">
              <div className="notification-option-label">
                <div className="notification-option-icon">
                  <AlertCircle size={16} />
                </div>
                <div className="notification-option-info">
                  <span className="notification-option-name">시스템 공지</span>
                  <span className="notification-option-description">
                    시스템 업데이트, 점검, 필수 공지사항
                  </span>
                </div>
              </div>
              <label className="notification-toggle">
                <input
                  type="checkbox"
                  checked={settings.systemAnnouncements}
                  onChange={() => handleToggleChange("systemAnnouncements")}
                  disabled={!settings.generalEnabled}
                />
                <span className="notification-slider"></span>
              </label>
            </div>

            <div className="notification-settings-option">
              <div className="notification-option-label">
                <div className="notification-option-icon">
                  <Mail size={16} />
                </div>
                <div className="notification-option-info">
                  <span className="notification-option-name">
                    마케팅 메시지
                  </span>
                  <span className="notification-option-description">
                    프로모션, 이벤트, 새로운 서비스 알림
                  </span>
                </div>
              </div>
              <label className="notification-toggle">
                <input
                  type="checkbox"
                  checked={settings.marketingMessages}
                  onChange={() => handleToggleChange("marketingMessages")}
                  disabled={!settings.generalEnabled}
                />
                <span className="notification-slider"></span>
              </label>
            </div>

            <div className="notification-quiet-hours">
              <div className="quiet-hours-header">
                <div className="quiet-hours-title">
                  <Moon size={16} />
                  <span>방해 금지 시간</span>
                </div>
                <label className="notification-toggle">
                  <input
                    type="checkbox"
                    checked={settings.quietHours.enabled}
                    onChange={() =>
                      handleNestedToggleChange("quietHours", "enabled")
                    }
                    disabled={!settings.generalEnabled}
                  />
                  <span className="notification-slider"></span>
                </label>
              </div>
              {settings.quietHours.enabled && (
                <div className="quiet-hours-form">
                  <div className="quiet-hours-input-group">
                    <span className="quiet-hours-label">시작 시간:</span>
                    <select
                      className="quiet-hours-select"
                      value={settings.quietHours.startHour}
                      onChange={(e) =>
                        handleNestedValueChange(
                          "quietHours",
                          "startHour",
                          e.target.value
                        )
                      }
                      disabled={
                        !settings.generalEnabled || !settings.quietHours.enabled
                      }
                    >
                      {timeOptions.map((time) => (
                        <option key={`start-${time}`} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="quiet-hours-input-group">
                    <span className="quiet-hours-label">종료 시간:</span>
                    <select
                      className="quiet-hours-select"
                      value={settings.quietHours.endHour}
                      onChange={(e) =>
                        handleNestedValueChange(
                          "quietHours",
                          "endHour",
                          e.target.value
                        )
                      }
                      disabled={
                        !settings.generalEnabled || !settings.quietHours.enabled
                      }
                    >
                      {timeOptions.map((time) => (
                        <option key={`end-${time}`} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="notification-settings-section">
            <h3 className="notification-settings-section-title">알림 채널</h3>
            <p className="notification-settings-description">
              알림을 받을 채널을 선택하세요. 여러 채널을 동시에 선택할 수
              있습니다.
            </p>

            <div className="notification-channel-option">
              <label className="channel-option-label">
                <input
                  type="checkbox"
                  checked={settings.channels.app}
                  onChange={() => handleNestedToggleChange("channels", "app")}
                  disabled={!settings.generalEnabled}
                />
                <Bell size={16} />
                <span>앱 내 알림</span>
              </label>
            </div>

            <div className="notification-channel-option">
              <label className="channel-option-label">
                <input
                  type="checkbox"
                  checked={settings.channels.email}
                  onChange={() => handleNestedToggleChange("channels", "email")}
                  disabled={!settings.generalEnabled}
                />
                <Mail size={16} />
                <span>이메일</span>
              </label>
            </div>

            <div className="notification-channel-option">
              <label className="channel-option-label">
                <input
                  type="checkbox"
                  checked={settings.channels.sms}
                  onChange={() => handleNestedToggleChange("channels", "sms")}
                  disabled={!settings.generalEnabled}
                />
                <Smartphone size={16} />
                <span>SMS</span>
              </label>
            </div>
          </div>

          <div className="notification-settings-section">
            <h3 className="notification-settings-section-title">
              알림 자동 삭제
            </h3>
            <p className="notification-settings-description">
              특정 기간이 지난 알림을 자동으로 삭제하도록 설정할 수 있습니다.
            </p>

            <div className="auto-delete-settings">
              <div className="quiet-hours-header">
                <div className="quiet-hours-title">
                  <Trash2 size={16} />
                  <span>알림 자동 삭제</span>
                </div>
                <label className="notification-toggle">
                  <input
                    type="checkbox"
                    checked={settings.autoDelete.enabled}
                    onChange={() =>
                      handleNestedToggleChange("autoDelete", "enabled")
                    }
                    disabled={!settings.generalEnabled}
                  />
                  <span className="notification-slider"></span>
                </label>
              </div>
              {settings.autoDelete.enabled && (
                <div className="auto-delete-form">
                  <span className="quiet-hours-label">다음 기간 후 삭제:</span>
                  <select
                    className="auto-delete-select"
                    value={settings.autoDelete.days}
                    onChange={(e) =>
                      handleNestedValueChange(
                        "autoDelete",
                        "days",
                        parseInt(e.target.value)
                      )
                    }
                    disabled={
                      !settings.generalEnabled || !settings.autoDelete.enabled
                    }
                  >
                    <option value="7">7일</option>
                    <option value="14">14일</option>
                    <option value="30">30일</option>
                    <option value="60">60일</option>
                    <option value="90">90일</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="notification-settings-modal-footer">
            <button type="button" className="cancel-button" onClick={onClose}>
              취소
            </button>
            <button type="submit" className="save-button">
              <Save size={16} />
              설정 저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotificationSettingsModal;
