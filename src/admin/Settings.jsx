import React, { useState, useEffect } from "react";
import {
  Save,
  Bell,
  Shield,
  UserCog,
  Clock,
  Mail,
  Globe,
  Smartphone,
  AlertCircle,
  CheckCircle,
  Lock,
  ToggleLeft,
  ToggleRight,
  Plus,
} from "lucide-react";
import "./Settings.css";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState({
    general: {
      hospitalName: "",
      email: "",
      phone: "",
      address: "",
      website: "",
      logo: null,
      language: "ko",
      timeZone: "Asia/Seoul",
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      pushNotifications: true,
      appointmentReminders: true,
      appointmentConfirmations: true,
      marketingMessages: false,
      reminderTime: "1day",
    },
    security: {
      twoFactorAuth: false,
      passwordExpiry: "90days",
      sessionTimeout: "30min",
      autoLogout: true,
      ipRestriction: false,
      allowedIPs: "",
    },
    permissions: {
      adminRoles: [
        { id: 1, name: "시스템 관리자", level: "full" },
        { id: 2, name: "병원 관리자", level: "hospital" },
        { id: 3, name: "의사", level: "doctor" },
        { id: 4, name: "접수 담당자", level: "receptionist" },
      ],
      modules: {
        patientManagement: {
          view: ["full", "hospital", "doctor", "receptionist"],
          edit: ["full", "hospital", "doctor", "receptionist"],
        },
        appointments: {
          view: ["full", "hospital", "doctor", "receptionist"],
          edit: ["full", "hospital", "doctor", "receptionist"],
        },
        doctorManagement: {
          view: ["full", "hospital"],
          edit: ["full", "hospital"],
        },
        billing: {
          view: ["full", "hospital", "receptionist"],
          edit: ["full", "hospital"],
        },
        reports: {
          view: ["full", "hospital", "doctor"],
          edit: ["full", "hospital"],
        },
        settings: { view: ["full", "hospital"], edit: ["full"] },
      },
    },
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    // 실제 앱에서는 API 호출을 통해 설정 데이터를 가져옴
    // 여기서는 목업 데이터를 로딩하는 척함
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleChange = (section, field, value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [section]: {
        ...prevSettings[section],
        [field]: value,
      },
    }));
  };

  const handleToggleChange = (section, field) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [section]: {
        ...prevSettings[section],
        [field]: !prevSettings[section][field],
      },
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        general: {
          ...prevSettings.general,
          logo: file,
        },
      }));
    }
  };

  const handleSaveSettings = () => {
    // 실제 앱에서는 API 호출을 통해 설정을 저장함
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError(false);

    // 저장 성공 시뮬레이션
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);

      // 성공 메시지 3초 후 사라짐
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1500);
  };

  const renderGeneralSettings = () => (
    <div className="admin-settings-section">
      <h3 className="admin-settings-section-title">기본 정보</h3>
      <div className="settings-form">
        <div className="form-group">
          <label htmlFor="hospitalName">병원 이름</label>
          <input
            type="text"
            id="hospitalName"
            className="form-input"
            value={settings.general.hospitalName}
            onChange={(e) =>
              handleChange("general", "hospitalName", e.target.value)
            }
            placeholder="병원 이름 입력"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={settings.general.email}
              onChange={(e) => handleChange("general", "email", e.target.value)}
              placeholder="contact@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">전화번호</label>
            <input
              type="tel"
              id="phone"
              className="form-input"
              value={settings.general.phone}
              onChange={(e) => handleChange("general", "phone", e.target.value)}
              placeholder="02-123-4567"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">주소</label>
          <input
            type="text"
            id="address"
            className="form-input"
            value={settings.general.address}
            onChange={(e) => handleChange("general", "address", e.target.value)}
            placeholder="주소 입력"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="website">웹사이트</label>
            <input
              type="url"
              id="website"
              className="form-input"
              value={settings.general.website}
              onChange={(e) =>
                handleChange("general", "website", e.target.value)
              }
              placeholder="https://example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="logo">로고</label>
            <div className="file-input-container">
              <button
                type="button"
                className="file-input-button"
                onClick={() => document.getElementById("logo").click()}
              >
                로고 파일 선택
              </button>
              <span className="file-name">
                {settings.general.logo
                  ? settings.general.logo.name
                  : "선택된 파일 없음"}
              </span>
              <input
                type="file"
                id="logo"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="language">언어</label>
            <select
              id="language"
              className="form-input"
              value={settings.general.language}
              onChange={(e) =>
                handleChange("general", "language", e.target.value)
              }
            >
              <option value="ko">한국어</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
              <option value="zh">中文</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="timeZone">시간대</label>
            <select
              id="timeZone"
              className="form-input"
              value={settings.general.timeZone}
              onChange={(e) =>
                handleChange("general", "timeZone", e.target.value)
              }
            >
              <option value="Asia/Seoul">한국 표준시 (GMT+9)</option>
              <option value="Asia/Tokyo">일본 표준시 (GMT+9)</option>
              <option value="America/Los_Angeles">
                미국 태평양 시간 (GMT-8)
              </option>
              <option value="Europe/London">영국 표준시 (GMT+0)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="admin-settings-section">
      <h3 className="admin-settings-section-title">알림 설정</h3>
      <div className="settings-form">
        <div className="toggle-group">
          <div className="toggle-item">
            <div className="toggle-label">
              <Mail size={18} />
              <span>이메일 알림</span>
            </div>
            <button
              type="button"
              className={`toggle-button ${
                settings.notifications.emailNotifications ? "active" : ""
              }`}
              onClick={() =>
                handleToggleChange("notifications", "emailNotifications")
              }
            >
              {settings.notifications.emailNotifications ? (
                <ToggleRight size={22} />
              ) : (
                <ToggleLeft size={22} />
              )}
            </button>
          </div>

          <div className="toggle-item">
            <div className="toggle-label">
              <Smartphone size={18} />
              <span>SMS 알림</span>
            </div>
            <button
              type="button"
              className={`toggle-button ${
                settings.notifications.smsNotifications ? "active" : ""
              }`}
              onClick={() =>
                handleToggleChange("notifications", "smsNotifications")
              }
            >
              {settings.notifications.smsNotifications ? (
                <ToggleRight size={22} />
              ) : (
                <ToggleLeft size={22} />
              )}
            </button>
          </div>

          <div className="toggle-item">
            <div className="toggle-label">
              <Bell size={18} />
              <span>앱 푸시 알림</span>
            </div>
            <button
              type="button"
              className={`toggle-button ${
                settings.notifications.pushNotifications ? "active" : ""
              }`}
              onClick={() =>
                handleToggleChange("notifications", "pushNotifications")
              }
            >
              {settings.notifications.pushNotifications ? (
                <ToggleRight size={22} />
              ) : (
                <ToggleLeft size={22} />
              )}
            </button>
          </div>
        </div>

        <div className="divider"></div>

        <h4 className="settings-subsection-title">알림 유형</h4>
        <div className="toggle-group">
          <div className="toggle-item">
            <div className="toggle-label">
              <span>예약 알림</span>
              <span className="toggle-description">
                환자에게 예약 알림 발송
              </span>
            </div>
            <button
              type="button"
              className={`toggle-button ${
                settings.notifications.appointmentReminders ? "active" : ""
              }`}
              onClick={() =>
                handleToggleChange("notifications", "appointmentReminders")
              }
            >
              {settings.notifications.appointmentReminders ? (
                <ToggleRight size={22} />
              ) : (
                <ToggleLeft size={22} />
              )}
            </button>
          </div>

          <div className="toggle-item">
            <div className="toggle-label">
              <span>예약 확인</span>
              <span className="toggle-description">
                예약 확정/변경 시 알림 발송
              </span>
            </div>
            <button
              type="button"
              className={`toggle-button ${
                settings.notifications.appointmentConfirmations ? "active" : ""
              }`}
              onClick={() =>
                handleToggleChange("notifications", "appointmentConfirmations")
              }
            >
              {settings.notifications.appointmentConfirmations ? (
                <ToggleRight size={22} />
              ) : (
                <ToggleLeft size={22} />
              )}
            </button>
          </div>

          <div className="toggle-item">
            <div className="toggle-label">
              <span>마케팅 메시지</span>
              <span className="toggle-description">
                프로모션 및 마케팅 메시지 발송
              </span>
            </div>
            <button
              type="button"
              className={`toggle-button ${
                settings.notifications.marketingMessages ? "active" : ""
              }`}
              onClick={() =>
                handleToggleChange("notifications", "marketingMessages")
              }
            >
              {settings.notifications.marketingMessages ? (
                <ToggleRight size={22} />
              ) : (
                <ToggleLeft size={22} />
              )}
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="reminderTime">알림 발송 시간</label>
          <select
            id="reminderTime"
            className="form-input"
            value={settings.notifications.reminderTime}
            onChange={(e) =>
              handleChange("notifications", "reminderTime", e.target.value)
            }
          >
            <option value="30min">30분 전</option>
            <option value="1hour">1시간 전</option>
            <option value="3hours">3시간 전</option>
            <option value="1day">1일 전</option>
            <option value="2days">2일 전</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="admin-settings-section">
      <h3 className="admin-settings-section-title">보안 설정</h3>
      <div className="settings-form">
        <div className="toggle-group">
          <div className="toggle-item">
            <div className="toggle-label">
              <Lock size={18} />
              <span>2단계 인증</span>
              <span className="toggle-description">
                로그인 시 2단계 인증 필요
              </span>
            </div>
            <button
              type="button"
              className={`toggle-button ${
                settings.security.twoFactorAuth ? "active" : ""
              }`}
              onClick={() => handleToggleChange("security", "twoFactorAuth")}
            >
              {settings.security.twoFactorAuth ? (
                <ToggleRight size={22} />
              ) : (
                <ToggleLeft size={22} />
              )}
            </button>
          </div>

          <div className="toggle-item">
            <div className="toggle-label">
              <Clock size={18} />
              <span>자동 로그아웃</span>
              <span className="toggle-description">
                일정 시간 후 자동 로그아웃
              </span>
            </div>
            <button
              type="button"
              className={`toggle-button ${
                settings.security.autoLogout ? "active" : ""
              }`}
              onClick={() => handleToggleChange("security", "autoLogout")}
            >
              {settings.security.autoLogout ? (
                <ToggleRight size={22} />
              ) : (
                <ToggleLeft size={22} />
              )}
            </button>
          </div>

          <div className="toggle-item">
            <div className="toggle-label">
              <Globe size={18} />
              <span>IP 제한</span>
              <span className="toggle-description">
                특정 IP에서만 접속 가능
              </span>
            </div>
            <button
              type="button"
              className={`toggle-button ${
                settings.security.ipRestriction ? "active" : ""
              }`}
              onClick={() => handleToggleChange("security", "ipRestriction")}
            >
              {settings.security.ipRestriction ? (
                <ToggleRight size={22} />
              ) : (
                <ToggleLeft size={22} />
              )}
            </button>
          </div>
        </div>

        {settings.security.ipRestriction && (
          <div className="form-group">
            <label htmlFor="allowedIPs">허용 IP 주소</label>
            <textarea
              id="allowedIPs"
              className="form-input"
              value={settings.security.allowedIPs}
              onChange={(e) =>
                handleChange("security", "allowedIPs", e.target.value)
              }
              placeholder="IP 주소를 한 줄에 하나씩 입력하세요"
              rows={3}
            />
            <div className="input-help">
              쉼표 또는 줄바꿈으로 구분합니다. (예: 192.168.1.1, 10.0.0.1)
            </div>
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="passwordExpiry">비밀번호 만료</label>
            <select
              id="passwordExpiry"
              className="form-input"
              value={settings.security.passwordExpiry}
              onChange={(e) =>
                handleChange("security", "passwordExpiry", e.target.value)
              }
            >
              <option value="30days">30일</option>
              <option value="60days">60일</option>
              <option value="90days">90일</option>
              <option value="180days">180일</option>
              <option value="never">만료 없음</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="sessionTimeout">세션 타임아웃</label>
            <select
              id="sessionTimeout"
              className="form-input"
              value={settings.security.sessionTimeout}
              onChange={(e) =>
                handleChange("security", "sessionTimeout", e.target.value)
              }
            >
              <option value="15min">15분</option>
              <option value="30min">30분</option>
              <option value="1hour">1시간</option>
              <option value="3hours">3시간</option>
              <option value="8hours">8시간</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPermissionSettings = () => (
    <div className="admin-settings-section">
      <h3 className="admin-settings-section-title">권한 설정</h3>
      <div className="settings-form">
        <h4 className="settings-subsection-title">사용자 역할</h4>
        <div className="roles-table-container">
          <table className="roles-table">
            <thead>
              <tr>
                <th>역할</th>
                <th>권한 수준</th>
                <th>사용자 수</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              {settings.permissions.adminRoles.map((role) => (
                <tr key={role.id}>
                  <td>{role.name}</td>
                  <td>
                    <span className={`role-level ${role.level}`}>
                      {role.level === "full" && "전체 관리자"}
                      {role.level === "hospital" && "병원 관리자"}
                      {role.level === "doctor" && "의사"}
                      {role.level === "receptionist" && "접수 담당자"}
                    </span>
                  </td>
                  <td>{Math.floor(Math.random() * 10) + 1}명</td>
                  <td>
                    <div className="role-actions">
                      <button className="role-action-button">편집</button>
                      {role.level !== "full" && (
                        <button className="role-action-button delete">
                          삭제
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button type="button" className="add-role-button">
          <Plus size={16} />
          역할 추가
        </button>

        <h4 className="settings-subsection-title">모듈별 권한</h4>
        <div className="modules-table-container">
          <table className="modules-table">
            <thead>
              <tr>
                <th>모듈</th>
                <th>조회 권한</th>
                <th>편집 권한</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>환자 관리</td>
                <td>
                  <div className="permission-chips">
                    {settings.permissions.modules.patientManagement.view.map(
                      (level, index) => (
                        <span
                          key={index}
                          className={`permission-chip ${level}`}
                        >
                          {level === "full" && "전체 관리자"}
                          {level === "hospital" && "병원 관리자"}
                          {level === "doctor" && "의사"}
                          {level === "receptionist" && "접수 담당자"}
                        </span>
                      )
                    )}
                  </div>
                </td>
                <td>
                  <div className="permission-chips">
                    {settings.permissions.modules.patientManagement.edit.map(
                      (level, index) => (
                        <span
                          key={index}
                          className={`permission-chip ${level}`}
                        >
                          {level === "full" && "전체 관리자"}
                          {level === "hospital" && "병원 관리자"}
                          {level === "doctor" && "의사"}
                          {level === "receptionist" && "접수 담당자"}
                        </span>
                      )
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td>예약 관리</td>
                <td>
                  <div className="permission-chips">
                    {settings.permissions.modules.appointments.view.map(
                      (level, index) => (
                        <span
                          key={index}
                          className={`permission-chip ${level}`}
                        >
                          {level === "full" && "전체 관리자"}
                          {level === "hospital" && "병원 관리자"}
                          {level === "doctor" && "의사"}
                          {level === "receptionist" && "접수 담당자"}
                        </span>
                      )
                    )}
                  </div>
                </td>
                <td>
                  <div className="permission-chips">
                    {settings.permissions.modules.appointments.edit.map(
                      (level, index) => (
                        <span
                          key={index}
                          className={`permission-chip ${level}`}
                        >
                          {level === "full" && "전체 관리자"}
                          {level === "hospital" && "병원 관리자"}
                          {level === "doctor" && "의사"}
                          {level === "receptionist" && "접수 담당자"}
                        </span>
                      )
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td>의사 관리</td>
                <td>
                  <div className="permission-chips">
                    {settings.permissions.modules.doctorManagement.view.map(
                      (level, index) => (
                        <span
                          key={index}
                          className={`permission-chip ${level}`}
                        >
                          {level === "full" && "전체 관리자"}
                          {level === "hospital" && "병원 관리자"}
                          {level === "doctor" && "의사"}
                          {level === "receptionist" && "접수 담당자"}
                        </span>
                      )
                    )}
                  </div>
                </td>
                <td>
                  <div className="permission-chips">
                    {settings.permissions.modules.doctorManagement.edit.map(
                      (level, index) => (
                        <span
                          key={index}
                          className={`permission-chip ${level}`}
                        >
                          {level === "full" && "전체 관리자"}
                          {level === "hospital" && "병원 관리자"}
                          {level === "doctor" && "의사"}
                          {level === "receptionist" && "접수 담당자"}
                        </span>
                      )
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td>보고서</td>
                <td>
                  <div className="permission-chips">
                    {settings.permissions.modules.reports.view.map(
                      (level, index) => (
                        <span
                          key={index}
                          className={`permission-chip ${level}`}
                        >
                          {level === "full" && "전체 관리자"}
                          {level === "hospital" && "병원 관리자"}
                          {level === "doctor" && "의사"}
                          {level === "receptionist" && "접수 담당자"}
                        </span>
                      )
                    )}
                  </div>
                </td>
                <td>
                  <div className="permission-chips">
                    {settings.permissions.modules.reports.edit.map(
                      (level, index) => (
                        <span
                          key={index}
                          className={`permission-chip ${level}`}
                        >
                          {level === "full" && "전체 관리자"}
                          {level === "hospital" && "병원 관리자"}
                          {level === "doctor" && "의사"}
                          {level === "receptionist" && "접수 담당자"}
                        </span>
                      )
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td>설정</td>
                <td>
                  <div className="permission-chips">
                    {settings.permissions.modules.settings.view.map(
                      (level, index) => (
                        <span
                          key={index}
                          className={`permission-chip ${level}`}
                        >
                          {level === "full" && "전체 관리자"}
                          {level === "hospital" && "병원 관리자"}
                          {level === "doctor" && "의사"}
                          {level === "receptionist" && "접수 담당자"}
                        </span>
                      )
                    )}
                  </div>
                </td>
                <td>
                  <div className="permission-chips">
                    {settings.permissions.modules.settings.edit.map(
                      (level, index) => (
                        <span
                          key={index}
                          className={`permission-chip ${level}`}
                        >
                          {level === "full" && "전체 관리자"}
                          {level === "hospital" && "병원 관리자"}
                          {level === "doctor" && "의사"}
                          {level === "receptionist" && "접수 담당자"}
                        </span>
                      )
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-spinner"></div>
        <p>설정 데이터 로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="settings-container">
      <div className="admin-section-header">
        <h2 className="admin-section-title">설정</h2>
        <p className="admin-section-description">
          시스템 및 병원 관련 설정을 관리합니다.
        </p>
      </div>

      <div className="admin-settings-content">
        <div className="settings-tabs">
          <button
            className={`settings-tab ${
              activeTab === "general" ? "active" : ""
            }`}
            onClick={() => setActiveTab("general")}
          >
            <Globe size={18} />
            <span>일반</span>
          </button>
          <button
            className={`settings-tab ${
              activeTab === "notifications" ? "active" : ""
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            <Bell size={18} />
            <span>알림</span>
          </button>
          <button
            className={`settings-tab ${
              activeTab === "security" ? "active" : ""
            }`}
            onClick={() => setActiveTab("security")}
          >
            <Shield size={18} />
            <span>보안</span>
          </button>
          <button
            className={`settings-tab ${
              activeTab === "permissions" ? "active" : ""
            }`}
            onClick={() => setActiveTab("permissions")}
          >
            <UserCog size={18} />
            <span>권한</span>
          </button>
        </div>

        <div className="settings-panel">
          {activeTab === "general" && renderGeneralSettings()}
          {activeTab === "notifications" && renderNotificationSettings()}
          {activeTab === "security" && renderSecuritySettings()}
          {activeTab === "permissions" && renderPermissionSettings()}

          <div className="settings-actions">
            {(saveSuccess || saveError) && (
              <div
                className={`settings-alert ${
                  saveSuccess ? "success" : "error"
                }`}
              >
                {saveSuccess ? (
                  <>
                    <CheckCircle size={18} />
                    <span>설정이 성공적으로 저장되었습니다.</span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={18} />
                    <span>설정 저장 중 오류가 발생했습니다.</span>
                  </>
                )}
              </div>
            )}
            <button
              type="button"
              className={`settings-save-button ${isSaving ? "saving" : ""}`}
              onClick={handleSaveSettings}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <div className="spinner"></div>
                  <span>저장 중...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>설정 저장</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
