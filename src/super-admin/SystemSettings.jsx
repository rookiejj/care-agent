import React, { useState, useEffect } from "react";
import {
  Settings,
  Shield,
  Database,
  Globe,
  Bell,
  CreditCard,
  Building2,
  Stethoscope,
  Activity,
  Save,
  RotateCcw,
  AlertTriangle,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Copy,
  RefreshCw,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Clock,
  Mail,
  Phone,
  MapPin,
  Key,
  Lock,
  CheckCircle,
  XCircle,
  Info,
  Calendar,
  Users,
  FileText,
  Zap,
  Star,
} from "lucide-react";
import "./SystemSettings.css";

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [settings, setSettings] = useState({
    // 1. 일반 설정
    general: {
      platformName: "메디컬 케어 플랫폼",
      version: "1.5.2",
      description: "종합 의료 서비스 플랫폼",
      supportEmail: "support@medicalcare.co.kr",
      supportPhone: "1588-1234",
      timezone: "Asia/Seoul",
      language: "ko",
      dateFormat: "YYYY-MM-DD",
      currency: "KRW",
      maintenanceMode: false,
      debugMode: false,
    },

    // 2. 보안 설정
    security: {
      passwordMinLength: 8,
      passwordRequireNumbers: true,
      passwordRequireSymbols: true,
      passwordRequireUppercase: true,
      passwordExpiryDays: 90,
      twoFactorRequired: false,
      sessionTimeoutMinutes: 30,
      maxLoginAttempts: 5,
      lockoutDurationMinutes: 15,
      ipWhitelist: ["192.168.1.0/24", "10.0.0.0/8"],
      sslEnabled: true,
      encryptionKey: "sk_live_xxxxxxxxxxxxxxxxxxxxxxxx",
      auditLogging: true,
    },

    // 3. 의료 설정
    medical: {
      requireLicenseVerification: true,
      hipaaCompliant: true,
      medicalRecordEncryption: true,
      telemedicineEnabled: true,
      emergencyNotifications: true,
      medicalImageStorage: true,
      appointmentSlotMinutes: 15,
      cancellationPolicyHours: 24,
      noShowTracking: true,
      specialties: [
        "내과",
        "외과",
        "소아과",
        "산부인과",
        "정형외과",
        "피부과",
        "성형외과",
        "안과",
        "이비인후과",
        "치과",
      ],
    },

    // 4. 병원 관리 설정
    hospital: {
      autoApproval: false,
      verificationRequired: true,
      requiredDocuments: ["사업자등록증", "의료기관개설허가증", "대표자신분증"],
      minRating: 3.0,
      reviewModeration: true,
      responseTimeRequirement: 24,
      commissionRate: 15,
      settlementCycle: "weekly",
      performanceMetrics: true,
    },

    // 5. 결제 설정
    payment: {
      enabledMethods: ["tosspay", "kakaopay", "payco", "card", "bank"],
      refundPeriodDays: 7,
      autoSettlement: true,
      fraudDetection: true,
      nationalInsurance: true,
      privateInsurance: false,
      corporateInsurance: true,
      taxRate: 10,
    },

    // 6. 알림 설정
    notification: {
      emailEnabled: true,
      smsEnabled: true,
      pushEnabled: true,
      inAppEnabled: true,
      appointmentConfirmation: true,
      appointmentReminder: true,
      emergencyAlerts: true,
      quietHoursStart: "22:00",
      quietHoursEnd: "08:00",
      reminderHours: [24, 2],
    },

    // 7. 데이터베이스 설정
    database: {
      type: "PostgreSQL",
      host: "localhost",
      port: 5432,
      database: "medical_platform",
      maxConnections: 100,
      backupSchedule: "daily",
      backupRetentionDays: 30,
      replicationEnabled: true,
      slowQueryThreshold: 1000,
      indexOptimization: true,
    },

    // 8. API 설정
    api: {
      version: "v1",
      rateLimit: 1000,
      authMethod: "JWT",
      googleCalendarEnabled: false,
      zoomEnabled: false,
      kakaoTalkEnabled: true,
      apiKeys: [
        {
          name: "Production",
          key: "pk_live_xxxxxxxxxxxxxxxxxxxxxxxx",
          created: "2024-01-15",
        },
        {
          name: "Development",
          key: "pk_test_xxxxxxxxxxxxxxxxxxxxxxxx",
          created: "2024-01-10",
        },
      ],
    },

    // 9. 모니터링 설정
    monitoring: {
      cpuThreshold: 80,
      memoryThreshold: 85,
      diskThreshold: 90,
      networkThreshold: 75,
      uptimeAlerts: true,
      errorRateThreshold: 5,
      responseTimeThreshold: 2000,
      alertEmail: "admin@medicalcare.co.kr",
      alertSlack: true,
    },
  });

  // 시스템 상태 모니터링 (실시간 데이터 시뮬레이션)
  const [systemStatus, setSystemStatus] = useState({
    cpu: 45,
    memory: 62,
    disk: 34,
    network: 28,
    uptime: "15일 8시간",
    errorRate: 0.2,
    responseTime: 180,
  });

  useEffect(() => {
    // 시스템 상태 업데이트 시뮬레이션
    const interval = setInterval(() => {
      setSystemStatus((prev) => ({
        ...prev,
        cpu: Math.max(20, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(
          30,
          Math.min(95, prev.memory + (Math.random() - 0.5) * 8)
        ),
        network: Math.max(
          10,
          Math.min(80, prev.network + (Math.random() - 0.5) * 15)
        ),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSettingChange = (category, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
    setHasUnsavedChanges(true);
  };

  const handleArrayAdd = (category, key, newItem) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: [...prev[category][key], newItem],
      },
    }));
    setHasUnsavedChanges(true);
  };

  const handleArrayRemove = (category, key, index) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: prev[category][key].filter((_, i) => i !== index),
      },
    }));
    setHasUnsavedChanges(true);
  };

  const handleArrayUpdate = (category, key, index, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: prev[category][key].map((item, i) =>
          i === index ? value : item
        ),
      },
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      // API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSaveStatus("success");
      setHasUnsavedChanges(false);
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleReset = () => {
    if (window.confirm("모든 설정을 기본값으로 초기화하시겠습니까?")) {
      // 기본값으로 리셋하는 로직
      setHasUnsavedChanges(false);
      setSaveStatus(null);
    }
  };

  const renderToggleSwitch = (category, key, label, description) => (
    <div className="settings-form-group">
      <label className="toggle-label">
        <div className="toggle-switch">
          <input
            type="checkbox"
            checked={settings[category][key]}
            onChange={(e) =>
              handleSettingChange(category, key, e.target.checked)
            }
          />
          <span className="toggle-slider"></span>
        </div>
        <div>
          <div>{label}</div>
          {description && (
            <div className="settings-form-help">{description}</div>
          )}
        </div>
      </label>
    </div>
  );

  const PasswordInput = ({ category, keyName, label, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="settings-form-group">
        <label className="settings-form-label">{label}</label>
        <div className="password-input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            className="settings-form-input"
            value={settings[category][keyName]}
            onChange={(e) =>
              handleSettingChange(category, keyName, e.target.value)
            }
            placeholder={placeholder}
          />
          <button
            type="button"
            className="password-toggle-button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>
    );
  };

  const ArrayManager = ({
    category,
    keyName,
    label,
    placeholder,
    addLabel,
  }) => {
    const [newItem, setNewItem] = useState("");

    return (
      <div className="settings-form-group">
        <label className="settings-form-label">{label}</label>
        <div className="array-manager">
          {settings[category][keyName].map((item, index) => (
            <div key={index} className="array-item">
              <input
                type="text"
                className="array-item-input"
                value={item}
                onChange={(e) =>
                  handleArrayUpdate(category, keyName, index, e.target.value)
                }
              />
              <div className="array-item-actions">
                <button
                  type="button"
                  className="array-item-button danger"
                  onClick={() => handleArrayRemove(category, keyName, index)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          <div className="array-item">
            <input
              type="text"
              className="array-item-input"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder={placeholder}
            />
            <div className="array-item-actions">
              <button
                type="button"
                className="array-item-button"
                onClick={() => {
                  if (newItem.trim()) {
                    handleArrayAdd(category, keyName, newItem.trim());
                    setNewItem("");
                  }
                }}
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ApiKeyManager = () => {
    const [showKeys, setShowKeys] = useState({});

    const toggleKeyVisibility = (index) => {
      setShowKeys((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text);
      // 복사 완료 알림
    };

    const regenerateKey = (index) => {
      if (
        window.confirm(
          "API 키를 재생성하시겠습니까? 기존 키는 사용할 수 없게 됩니다."
        )
      ) {
        const newKey = "pk_" + Math.random().toString(36).substr(2, 24);
        const updatedKeys = [...settings.api.apiKeys];
        updatedKeys[index] = {
          ...updatedKeys[index],
          key: newKey,
          created: new Date().toISOString().split("T")[0],
        };
        handleSettingChange("api", "apiKeys", updatedKeys);
      }
    };

    return (
      <div className="settings-form-group">
        <label className="settings-form-label">API 키 관리</label>
        <div className="array-manager">
          {settings.api.apiKeys.map((apiKey, index) => (
            <div key={index} className="array-item">
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    marginBottom: "0.5rem",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                  }}
                >
                  {apiKey.name}
                </div>
                <div className="api-key-display">
                  <div
                    className={`api-key-text ${
                      showKeys[index] ? "revealed" : ""
                    }`}
                  >
                    {showKeys[index] ? apiKey.key : "••••••••••••••••••••••••"}
                  </div>
                  <div className="api-key-actions">
                    <button
                      type="button"
                      className="api-key-button"
                      onClick={() => toggleKeyVisibility(index)}
                      title={showKeys[index] ? "숨기기" : "보기"}
                    >
                      {showKeys[index] ? (
                        <EyeOff size={14} />
                      ) : (
                        <Eye size={14} />
                      )}
                    </button>
                    <button
                      type="button"
                      className="api-key-button"
                      onClick={() => copyToClipboard(apiKey.key)}
                      title="복사"
                    >
                      <Copy size={14} />
                    </button>
                    <button
                      type="button"
                      className="api-key-button"
                      onClick={() => regenerateKey(index)}
                      title="재생성"
                    >
                      <RefreshCw size={14} />
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#6b7280",
                    marginTop: "0.25rem",
                  }}
                >
                  생성일: {apiKey.created}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderProgressBar = (label, value, threshold, unit = "%") => {
    const getBarColor = () => {
      if (value >= threshold) return "danger";
      if (value >= threshold * 0.8) return "warning";
      return "";
    };

    return (
      <div className="progress-bar-container">
        <div className="progress-bar-header">
          <span className="progress-bar-label">{label}</span>
          <span className="progress-bar-value">
            {value}
            {unit}
          </span>
        </div>
        <div className="progress-bar">
          <div
            className={`progress-bar-fill ${getBarColor()}`}
            style={{ width: `${Math.min(value, 100)}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: "general", label: "일반 설정", icon: Settings },
    { id: "security", label: "보안 설정", icon: Shield },
    { id: "medical", label: "의료 설정", icon: Stethoscope },
    { id: "hospital", label: "병원 관리", icon: Building2 },
    { id: "payment", label: "결제 설정", icon: CreditCard },
    { id: "notification", label: "알림 설정", icon: Bell },
    { id: "database", label: "데이터베이스", icon: Database },
    { id: "api", label: "API 설정", icon: Globe },
    { id: "monitoring", label: "모니터링", icon: Activity },
  ];

  return (
    <div className="system-settings">
      {/* 헤더 */}
      <div className="system-settings-header">
        <div className="system-settings-title-section">
          <h2>시스템 설정</h2>
          <p className="system-settings-subtitle">
            플랫폼의 전체 설정을 관리하고 시스템 상태를 모니터링합니다.
          </p>
        </div>
        <div className="system-settings-actions">
          {hasUnsavedChanges && (
            <div className="unsaved-changes-indicator">
              <div className="unsaved-indicator"></div>
              저장되지 않은 변경사항
            </div>
          )}
          {saveStatus && (
            <div className={`save-status ${saveStatus}`}>
              {saveStatus === "saving" && (
                <>
                  <RefreshCw size={16} className="loading-spinner" />
                  저장 중...
                </>
              )}
              {saveStatus === "success" && (
                <>
                  <CheckCircle size={16} />
                  저장 완료
                </>
              )}
              {saveStatus === "error" && (
                <>
                  <XCircle size={16} />
                  저장 실패
                </>
              )}
            </div>
          )}
          <button
            className="super-admin-button super-admin-button-secondary"
            onClick={handleReset}
          >
            <RotateCcw size={16} />
            초기화
          </button>
          <button
            className="super-admin-button super-admin-button-primary"
            onClick={handleSave}
            disabled={!hasUnsavedChanges}
          >
            <Save size={16} />
            저장
          </button>
        </div>
      </div>

      {/* 시스템 상태 알림 */}
      {systemStatus.cpu > settings.monitoring.cpuThreshold && (
        <div className="settings-notification warning">
          <div className="settings-notification-icon">
            <AlertTriangle size={20} />
          </div>
          <div className="settings-notification-content">
            <div className="settings-notification-title">CPU 사용량 경고</div>
            <div className="settings-notification-message">
              현재 CPU 사용량이 {systemStatus.cpu}%로 임계값(
              {settings.monitoring.cpuThreshold}%)을 초과했습니다.
            </div>
          </div>
        </div>
      )}

      {/* 탭 네비게이션 */}
      <div className="system-settings-tabs">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              className={`system-settings-tab ${
                activeTab === tab.id ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <IconComponent size={16} />
              {tab.label}
              {tab.id === "security" &&
                !settings.security.twoFactorRequired && (
                  <span className="system-settings-tab-badge">!</span>
                )}
            </button>
          );
        })}
      </div>

      {/* 설정 컨텐츠 */}
      <div className="system-settings-content">
        {/* 1. 일반 설정 */}
        {/* 1. 일반 설정 - 새로 추가된 부분 */}
        {activeTab === "general" && (
          <>
            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <Settings size={20} />
                    기본 정보
                  </h3>
                  <p className="settings-section-description">
                    플랫폼의 기본 정보를 설정합니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <div className="settings-grid">
                  <div className="settings-form-group">
                    <label className="settings-form-label">플랫폼명</label>
                    <input
                      type="text"
                      className="settings-form-input"
                      value={settings.general.platformName}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "platformName",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">버전</label>
                    <input
                      type="text"
                      className="settings-form-input"
                      value={settings.general.version}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "version",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">설명</label>
                    <input
                      type="text"
                      className="settings-form-input"
                      value={settings.general.description}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">지원 이메일</label>
                    <input
                      type="email"
                      className="settings-form-input"
                      value={settings.general.supportEmail}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "supportEmail",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">지원 전화번호</label>
                    <input
                      type="tel"
                      className="settings-form-input"
                      value={settings.general.supportPhone}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "supportPhone",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">타임존</label>
                    <select
                      className="settings-form-input"
                      value={settings.general.timezone}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "timezone",
                          e.target.value
                        )
                      }
                    >
                      <option value="Asia/Seoul">Asia/Seoul</option>
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">America/New_York</option>
                    </select>
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">언어</label>
                    <select
                      className="settings-form-input"
                      value={settings.general.language}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "language",
                          e.target.value
                        )
                      }
                    >
                      <option value="ko">한국어</option>
                      <option value="en">English</option>
                      <option value="ja">日本語</option>
                    </select>
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">날짜 형식</label>
                    <select
                      className="settings-form-input"
                      value={settings.general.dateFormat}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "dateFormat",
                          e.target.value
                        )
                      }
                    >
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    </select>
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">통화</label>
                    <select
                      className="settings-form-input"
                      value={settings.general.currency}
                      onChange={(e) =>
                        handleSettingChange(
                          "general",
                          "currency",
                          e.target.value
                        )
                      }
                    >
                      <option value="KRW">KRW (원)</option>
                      <option value="USD">USD (달러)</option>
                      <option value="EUR">EUR (유로)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <Activity size={20} />
                    시스템 모드
                  </h3>
                  <p className="settings-section-description">
                    시스템의 운영 모드를 설정합니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <div className="settings-grid">
                  {renderToggleSwitch(
                    "general",
                    "maintenanceMode",
                    "유지보수 모드",
                    "시스템을 유지보수 모드로 전환합니다."
                  )}
                  {renderToggleSwitch(
                    "general",
                    "debugMode",
                    "디버그 모드",
                    "개발자를 위한 디버그 정보를 표시합니다."
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* 2. 보안 설정 - 새로 추가된 부분 */}
        {activeTab === "security" && (
          <>
            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <Lock size={20} />
                    비밀번호 정책
                  </h3>
                  <p className="settings-section-description">
                    사용자 비밀번호 보안 정책을 설정합니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <div className="settings-grid">
                  <div className="settings-form-group">
                    <label className="settings-form-label">최소 길이</label>
                    <input
                      type="number"
                      className="settings-form-input"
                      value={settings.security.passwordMinLength}
                      onChange={(e) =>
                        handleSettingChange(
                          "security",
                          "passwordMinLength",
                          parseInt(e.target.value)
                        )
                      }
                      min="6"
                      max="20"
                    />
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">
                      비밀번호 만료 (일)
                    </label>
                    <input
                      type="number"
                      className="settings-form-input"
                      value={settings.security.passwordExpiryDays}
                      onChange={(e) =>
                        handleSettingChange(
                          "security",
                          "passwordExpiryDays",
                          parseInt(e.target.value)
                        )
                      }
                      min="30"
                      max="365"
                    />
                  </div>
                  {renderToggleSwitch(
                    "security",
                    "passwordRequireNumbers",
                    "숫자 필수",
                    "비밀번호에 숫자를 포함해야 합니다."
                  )}
                  {renderToggleSwitch(
                    "security",
                    "passwordRequireSymbols",
                    "특수문자 필수",
                    "비밀번호에 특수문자를 포함해야 합니다."
                  )}
                  {renderToggleSwitch(
                    "security",
                    "passwordRequireUppercase",
                    "대문자 필수",
                    "비밀번호에 대문자를 포함해야 합니다."
                  )}
                </div>
              </div>
            </div>

            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <Shield size={20} />
                    인증 보안
                  </h3>
                  <p className="settings-section-description">
                    로그인 및 인증 보안 설정입니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <div className="settings-grid">
                  <div className="settings-form-group">
                    <label className="settings-form-label">
                      세션 만료 시간 (분)
                    </label>
                    <input
                      type="number"
                      className="settings-form-input"
                      value={settings.security.sessionTimeoutMinutes}
                      onChange={(e) =>
                        handleSettingChange(
                          "security",
                          "sessionTimeoutMinutes",
                          parseInt(e.target.value)
                        )
                      }
                      min="15"
                      max="480"
                    />
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">
                      최대 로그인 시도 횟수
                    </label>
                    <input
                      type="number"
                      className="settings-form-input"
                      value={settings.security.maxLoginAttempts}
                      onChange={(e) =>
                        handleSettingChange(
                          "security",
                          "maxLoginAttempts",
                          parseInt(e.target.value)
                        )
                      }
                      min="3"
                      max="10"
                    />
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">
                      계정 잠금 시간 (분)
                    </label>
                    <input
                      type="number"
                      className="settings-form-input"
                      value={settings.security.lockoutDurationMinutes}
                      onChange={(e) =>
                        handleSettingChange(
                          "security",
                          "lockoutDurationMinutes",
                          parseInt(e.target.value)
                        )
                      }
                      min="5"
                      max="60"
                    />
                  </div>
                  {renderToggleSwitch(
                    "security",
                    "twoFactorRequired",
                    "2단계 인증 필수",
                    "모든 사용자에게 2단계 인증을 필수로 요구합니다."
                  )}
                </div>
              </div>
            </div>

            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <Wifi size={20} />
                    접근 제어
                  </h3>
                  <p className="settings-section-description">
                    IP 화이트리스트 및 접근 제어를 설정합니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <ArrayManager
                  category="security"
                  keyName="ipWhitelist"
                  label="IP 화이트리스트"
                  placeholder="IP 주소 또는 CIDR (예: 192.168.1.0/24)"
                  addLabel="IP 추가"
                />
              </div>
            </div>

            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <Key size={20} />
                    암호화 설정
                  </h3>
                  <p className="settings-section-description">
                    데이터 암호화 및 보안 키를 관리합니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <div className="settings-grid">
                  <PasswordInput
                    category="security"
                    keyName="encryptionKey"
                    label="암호화 키"
                    placeholder="암호화 키를 입력하세요"
                  />
                  {renderToggleSwitch(
                    "security",
                    "sslEnabled",
                    "SSL 활성화",
                    "HTTPS를 통한 보안 연결을 강제합니다."
                  )}
                  {renderToggleSwitch(
                    "security",
                    "auditLogging",
                    "감사 로그",
                    "모든 보안 관련 활동을 로그로 기록합니다."
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* 3. 의료 설정 - 새로 추가된 부분 */}
        {activeTab === "medical" && (
          <>
            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <Stethoscope size={20} />
                    의료 규정 준수
                  </h3>
                  <p className="settings-section-description">
                    의료법 및 개인정보보호 규정 준수 설정입니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <div className="settings-grid">
                  {renderToggleSwitch(
                    "medical",
                    "requireLicenseVerification",
                    "면허 인증 필수",
                    "의료진 등록 시 의료면허 인증을 필수로 요구합니다."
                  )}
                  {renderToggleSwitch(
                    "medical",
                    "hipaaCompliant",
                    "HIPAA 준수",
                    "HIPAA(Health Insurance Portability and Accountability Act) 규정을 준수합니다."
                  )}
                  {renderToggleSwitch(
                    "medical",
                    "medicalRecordEncryption",
                    "의료기록 암호화",
                    "모든 의료기록을 암호화하여 저장합니다."
                  )}
                </div>
              </div>
            </div>

            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <Activity size={20} />
                    진료 서비스
                  </h3>
                  <p className="settings-section-description">
                    진료 관련 서비스 기능을 설정합니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <div className="settings-grid">
                  {renderToggleSwitch(
                    "medical",
                    "telemedicineEnabled",
                    "원격 진료",
                    "화상 통화를 통한 원격 진료를 제공합니다."
                  )}
                  {renderToggleSwitch(
                    "medical",
                    "emergencyNotifications",
                    "응급 알림",
                    "응급상황 발생 시 즉시 알림 시스템을 활성화합니다."
                  )}
                  {renderToggleSwitch(
                    "medical",
                    "medicalImageStorage",
                    "의료영상 저장",
                    "X-ray, CT, MRI 등 의료영상을 저장하고 관리합니다."
                  )}
                </div>
              </div>
            </div>

            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <Calendar size={20} />
                    예약 관리
                  </h3>
                  <p className="settings-section-description">
                    진료 예약 시스템 설정을 관리합니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <div className="settings-grid">
                  <div className="settings-form-group">
                    <label className="settings-form-label">
                      예약 시간 단위 (분)
                    </label>
                    <select
                      className="settings-form-input"
                      value={settings.medical.appointmentSlotMinutes}
                      onChange={(e) =>
                        handleSettingChange(
                          "medical",
                          "appointmentSlotMinutes",
                          parseInt(e.target.value)
                        )
                      }
                    >
                      <option value="15">15분</option>
                      <option value="30">30분</option>
                      <option value="45">45분</option>
                      <option value="60">1시간</option>
                    </select>
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">
                      취소 정책 (시간 전)
                    </label>
                    <input
                      type="number"
                      className="settings-form-input"
                      value={settings.medical.cancellationPolicyHours}
                      onChange={(e) =>
                        handleSettingChange(
                          "medical",
                          "cancellationPolicyHours",
                          parseInt(e.target.value)
                        )
                      }
                      min="1"
                      max="72"
                    />
                    <div className="settings-form-help">
                      이 시간 이후 취소 시 수수료가 부과됩니다.
                    </div>
                  </div>
                  {renderToggleSwitch(
                    "medical",
                    "noShowTracking",
                    "노쇼 추적",
                    "예약 후 방문하지 않은 환자를 추적합니다."
                  )}
                </div>
              </div>
            </div>

            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <Users size={20} />
                    진료과 관리
                  </h3>
                  <p className="settings-section-description">
                    플랫폼에서 지원하는 진료과를 관리합니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <ArrayManager
                  category="medical"
                  keyName="specialties"
                  label="진료과 목록"
                  placeholder="새 진료과 입력"
                  addLabel="진료과 추가"
                />
              </div>
            </div>
          </>
        )}

        {/* 4. 병원 관리 설정 */}
        {activeTab === "hospital" && (
          <>
            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <Building2 size={20} />
                    병원 등록 정책
                  </h3>
                  <p className="settings-section-description">
                    새로운 병원의 등록 및 승인 정책을 설정합니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <div className="settings-grid">
                  {renderToggleSwitch(
                    "hospital",
                    "autoApproval",
                    "자동 승인",
                    "신규 병원을 자동으로 승인합니다."
                  )}
                  {renderToggleSwitch(
                    "hospital",
                    "verificationRequired",
                    "인증 필수",
                    "병원 등록 시 서류 인증을 필수로 요구합니다."
                  )}
                  <ArrayManager
                    category="hospital"
                    keyName="requiredDocuments"
                    label="필수 서류"
                    placeholder="새 서류명 입력"
                    addLabel="서류 추가"
                  />
                </div>
              </div>
            </div>

            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <Star size={20} />
                    품질 관리 기준
                  </h3>
                  <p className="settings-section-description">
                    병원 서비스 품질 관리 기준을 설정합니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <div className="settings-grid">
                  <div className="settings-form-group">
                    <label className="settings-form-label">
                      최소 평점 기준
                    </label>
                    <input
                      type="number"
                      className="settings-form-input"
                      value={settings.hospital.minRating}
                      onChange={(e) =>
                        handleSettingChange(
                          "hospital",
                          "minRating",
                          parseFloat(e.target.value)
                        )
                      }
                      min="1.0"
                      max="5.0"
                      step="0.1"
                    />
                    <div className="settings-form-help">
                      이 점수 미만의 병원은 경고를 받습니다.
                    </div>
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">
                      응답 시간 요구사항 (시간)
                    </label>
                    <input
                      type="number"
                      className="settings-form-input"
                      value={settings.hospital.responseTimeRequirement}
                      onChange={(e) =>
                        handleSettingChange(
                          "hospital",
                          "responseTimeRequirement",
                          parseInt(e.target.value)
                        )
                      }
                      min="1"
                      max="72"
                    />
                    <div className="settings-form-help">
                      병원의 문의 응답 시간 기준입니다.
                    </div>
                  </div>
                  {renderToggleSwitch(
                    "hospital",
                    "reviewModeration",
                    "리뷰 검열",
                    "부적절한 리뷰를 자동으로 필터링합니다."
                  )}
                </div>
              </div>
            </div>

            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <CreditCard size={20} />
                    수수료 및 정산
                  </h3>
                  <p className="settings-section-description">
                    병원과의 수수료 및 정산 정책을 설정합니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <div className="settings-grid">
                  <div className="settings-form-group">
                    <label className="settings-form-label">수수료율 (%)</label>
                    <input
                      type="number"
                      className="settings-form-input"
                      value={settings.hospital.commissionRate}
                      onChange={(e) =>
                        handleSettingChange(
                          "hospital",
                          "commissionRate",
                          parseFloat(e.target.value)
                        )
                      }
                      min="0"
                      max="30"
                      step="0.1"
                    />
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">정산 주기</label>
                    <select
                      className="settings-form-input"
                      value={settings.hospital.settlementCycle}
                      onChange={(e) =>
                        handleSettingChange(
                          "hospital",
                          "settlementCycle",
                          e.target.value
                        )
                      }
                    >
                      <option value="daily">매일</option>
                      <option value="weekly">매주</option>
                      <option value="monthly">매월</option>
                    </select>
                  </div>
                  {renderToggleSwitch(
                    "hospital",
                    "performanceMetrics",
                    "성과 지표 추적",
                    "병원별 성과 지표를 추적하고 분석합니다."
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* 5. 결제 설정 */}
        {activeTab === "payment" && (
          <>
            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <CreditCard size={20} />
                    결제 수단
                  </h3>
                  <p className="settings-section-description">
                    지원할 결제 수단을 선택합니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <div className="settings-grid">
                  {renderToggleSwitch(
                    "payment",
                    "enabledMethods",
                    "토스페이",
                    "토스페이 결제를 활성화합니다."
                  )}
                  {renderToggleSwitch(
                    "payment",
                    "enabledMethods",
                    "카카오페이",
                    "카카오페이 결제를 활성화합니다."
                  )}
                  {renderToggleSwitch(
                    "payment",
                    "enabledMethods",
                    "페이코",
                    "페이코 결제를 활성화합니다."
                  )}
                  {renderToggleSwitch(
                    "payment",
                    "enabledMethods",
                    "신용카드",
                    "신용카드 결제를 활성화합니다."
                  )}
                  {renderToggleSwitch(
                    "payment",
                    "enabledMethods",
                    "계좌이체",
                    "계좌이체 결제를 활성화합니다."
                  )}
                </div>
              </div>
            </div>

            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <RefreshCw size={20} />
                    결제 정책
                  </h3>
                  <p className="settings-section-description">
                    환불 및 정산 정책을 설정합니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <div className="settings-grid">
                  <div className="settings-form-group">
                    <label className="settings-form-label">
                      환불 가능 기간 (일)
                    </label>
                    <input
                      type="number"
                      className="settings-form-input"
                      value={settings.payment.refundPeriodDays}
                      onChange={(e) =>
                        handleSettingChange(
                          "payment",
                          "refundPeriodDays",
                          parseInt(e.target.value)
                        )
                      }
                      min="1"
                      max="30"
                    />
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">세율 (%)</label>
                    <input
                      type="number"
                      className="settings-form-input"
                      value={settings.payment.taxRate}
                      onChange={(e) =>
                        handleSettingChange(
                          "payment",
                          "taxRate",
                          parseFloat(e.target.value)
                        )
                      }
                      min="0"
                      max="20"
                      step="0.1"
                    />
                  </div>
                  {renderToggleSwitch(
                    "payment",
                    "autoSettlement",
                    "자동 정산",
                    "일정 주기마다 자동으로 정산을 처리합니다."
                  )}
                  {renderToggleSwitch(
                    "payment",
                    "fraudDetection",
                    "사기 탐지",
                    "AI를 이용한 결제 사기 탐지 시스템을 활성화합니다."
                  )}
                </div>
              </div>
            </div>

            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <Shield size={20} />
                    보험 연동
                  </h3>
                  <p className="settings-section-description">
                    다양한 보험과의 연동을 설정합니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <div className="settings-grid">
                  {renderToggleSwitch(
                    "payment",
                    "nationalInsurance",
                    "국민건강보험",
                    "국민건강보험 연동을 활성화합니다."
                  )}
                  {renderToggleSwitch(
                    "payment",
                    "privateInsurance",
                    "민간보험",
                    "민간보험사와의 직접 연동을 활성화합니다."
                  )}
                  {renderToggleSwitch(
                    "payment",
                    "corporateInsurance",
                    "단체보험",
                    "기업 단체보험 연동을 활성화합니다."
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* 6. 알림 설정 */}
        {activeTab === "notification" && (
          <>
            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <Bell size={20} />
                    알림 채널
                  </h3>
                  <p className="settings-section-description">
                    사용할 알림 채널을 선택합니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <div className="settings-grid">
                  {renderToggleSwitch(
                    "notification",
                    "emailEnabled",
                    "이메일 알림",
                    "이메일을 통한 알림을 활성화합니다."
                  )}
                  {renderToggleSwitch(
                    "notification",
                    "smsEnabled",
                    "SMS 알림",
                    "SMS를 통한 알림을 활성화합니다."
                  )}
                  {renderToggleSwitch(
                    "notification",
                    "pushEnabled",
                    "푸시 알림",
                    "모바일 푸시 알림을 활성화합니다."
                  )}
                  {renderToggleSwitch(
                    "notification",
                    "inAppEnabled",
                    "앱 내 알림",
                    "앱 내 알림을 활성화합니다."
                  )}
                </div>
              </div>
            </div>

            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <FileText size={20} />
                    알림 유형
                  </h3>
                  <p className="settings-section-description">
                    발송할 알림의 유형을 설정합니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <div className="settings-grid">
                  {renderToggleSwitch(
                    "notification",
                    "appointmentConfirmation",
                    "예약 확인",
                    "예약 접수 시 확인 알림을 발송합니다."
                  )}
                  {renderToggleSwitch(
                    "notification",
                    "appointmentReminder",
                    "예약 리마인더",
                    "예약 전 리마인더 알림을 발송합니다."
                  )}
                  {renderToggleSwitch(
                    "notification",
                    "emergencyAlerts",
                    "응급 알림",
                    "응급상황 발생 시 즉시 알림을 발송합니다."
                  )}
                  <div className="settings-form-group">
                    <label className="settings-form-label">
                      리마인더 발송 시간
                    </label>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={settings.notification.reminderHours.includes(
                          24
                        )}
                        onChange={(e) => {
                          const newHours = e.target.checked
                            ? [...settings.notification.reminderHours, 24]
                            : settings.notification.reminderHours.filter(
                                (h) => h !== 24
                              );
                          handleSettingChange(
                            "notification",
                            "reminderHours",
                            newHours
                          );
                        }}
                      />
                      <span>24시간 전</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={settings.notification.reminderHours.includes(
                          2
                        )}
                        onChange={(e) => {
                          const newHours = e.target.checked
                            ? [...settings.notification.reminderHours, 2]
                            : settings.notification.reminderHours.filter(
                                (h) => h !== 2
                              );
                          handleSettingChange(
                            "notification",
                            "reminderHours",
                            newHours
                          );
                        }}
                      />
                      <span>2시간 전</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <Clock size={20} />
                    무음 시간
                  </h3>
                  <p className="settings-section-description">
                    알림을 발송하지 않을 시간을 설정합니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <div className="settings-grid">
                  <div className="settings-form-group">
                    <label className="settings-form-label">
                      무음 시간 시작
                    </label>
                    <input
                      type="time"
                      className="settings-form-input"
                      value={settings.notification.quietHoursStart}
                      onChange={(e) =>
                        handleSettingChange(
                          "notification",
                          "quietHoursStart",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">
                      무음 시간 종료
                    </label>
                    <input
                      type="time"
                      className="settings-form-input"
                      value={settings.notification.quietHoursEnd}
                      onChange={(e) =>
                        handleSettingChange(
                          "notification",
                          "quietHoursEnd",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* 7. 데이터베이스 설정 */}
        {activeTab === "database" && (
          <>
            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <Database size={20} />
                    데이터베이스 연결
                  </h3>
                  <p className="settings-section-description">
                    데이터베이스 연결 정보를 설정합니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <div className="settings-grid">
                  <div className="settings-form-group">
                    <label className="settings-form-label">
                      데이터베이스 유형
                    </label>
                    <select
                      className="settings-form-input"
                      value={settings.database.type}
                      onChange={(e) =>
                        handleSettingChange("database", "type", e.target.value)
                      }
                    >
                      <option value="PostgreSQL">PostgreSQL</option>
                      <option value="MySQL">MySQL</option>
                      <option value="MongoDB">MongoDB</option>
                    </select>
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">호스트</label>
                    <input
                      type="text"
                      className="settings-form-input"
                      value={settings.database.host}
                      onChange={(e) =>
                        handleSettingChange("database", "host", e.target.value)
                      }
                    />
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">포트</label>
                    <input
                      type="number"
                      className="settings-form-input"
                      value={settings.database.port}
                      onChange={(e) =>
                        handleSettingChange(
                          "database",
                          "port",
                          parseInt(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">
                      데이터베이스명
                    </label>
                    <input
                      type="text"
                      className="settings-form-input"
                      value={settings.database.database}
                      onChange={(e) =>
                        handleSettingChange(
                          "database",
                          "database",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">최대 연결 수</label>
                    <input
                      type="number"
                      className="settings-form-input"
                      value={settings.database.maxConnections}
                      onChange={(e) =>
                        handleSettingChange(
                          "database",
                          "maxConnections",
                          parseInt(e.target.value)
                        )
                      }
                      min="10"
                      max="1000"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <HardDrive size={20} />
                    백업 설정
                  </h3>
                  <p className="settings-section-description">
                    데이터베이스 백업 정책을 설정합니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <div className="settings-grid">
                  <div className="settings-form-group">
                    <label className="settings-form-label">백업 주기</label>
                    <select
                      className="settings-form-input"
                      value={settings.database.backupSchedule}
                      onChange={(e) =>
                        handleSettingChange(
                          "database",
                          "backupSchedule",
                          e.target.value
                        )
                      }
                    >
                      <option value="hourly">매시간</option>
                      <option value="daily">매일</option>
                      <option value="weekly">매주</option>
                    </select>
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">
                      백업 보관 기간 (일)
                    </label>
                    <input
                      type="number"
                      className="settings-form-input"
                      value={settings.database.backupRetentionDays}
                      onChange={(e) =>
                        handleSettingChange(
                          "database",
                          "backupRetentionDays",
                          parseInt(e.target.value)
                        )
                      }
                      min="1"
                      max="365"
                    />
                  </div>
                  {renderToggleSwitch(
                    "database",
                    "replicationEnabled",
                    "복제 활성화",
                    "데이터베이스 복제를 통한 고가용성을 제공합니다."
                  )}
                </div>
              </div>
            </div>

            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <Zap size={20} />
                    성능 최적화
                  </h3>
                  <p className="settings-section-description">
                    데이터베이스 성능 최적화 설정입니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <div className="settings-grid">
                  <div className="settings-form-group">
                    <label className="settings-form-label">
                      느린 쿼리 임계값 (ms)
                    </label>
                    <input
                      type="number"
                      className="settings-form-input"
                      value={settings.database.slowQueryThreshold}
                      onChange={(e) =>
                        handleSettingChange(
                          "database",
                          "slowQueryThreshold",
                          parseInt(e.target.value)
                        )
                      }
                      min="100"
                      max="10000"
                    />
                  </div>
                  {renderToggleSwitch(
                    "database",
                    "indexOptimization",
                    "인덱스 최적화",
                    "자동 인덱스 최적화를 활성화합니다."
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* 8. API 설정 */}
        {activeTab === "api" && (
          <>
            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <Globe size={20} />
                    API 기본 설정
                  </h3>
                  <p className="settings-section-description">
                    API의 기본 설정을 관리합니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <div className="settings-grid">
                  <div className="settings-form-group">
                    <label className="settings-form-label">API 버전</label>
                    <select
                      className="settings-form-input"
                      value={settings.api.version}
                      onChange={(e) =>
                        handleSettingChange("api", "version", e.target.value)
                      }
                    >
                      <option value="v1">v1</option>
                      <option value="v2">v2</option>
                    </select>
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">
                      요청 제한 (시간당)
                    </label>
                    <input
                      type="number"
                      className="settings-form-input"
                      value={settings.api.rateLimit}
                      onChange={(e) =>
                        handleSettingChange(
                          "api",
                          "rateLimit",
                          parseInt(e.target.value)
                        )
                      }
                      min="100"
                      max="10000"
                    />
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">인증 방식</label>
                    <select
                      className="settings-form-input"
                      value={settings.api.authMethod}
                      onChange={(e) =>
                        handleSettingChange("api", "authMethod", e.target.value)
                      }
                    >
                      <option value="JWT">JWT</option>
                      <option value="OAuth2">OAuth2</option>
                      <option value="API Key">API Key</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <Wifi size={20} />
                    외부 서비스 연동
                  </h3>
                  <p className="settings-section-description">
                    외부 서비스와의 API 연동을 설정합니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <div className="settings-grid">
                  {renderToggleSwitch(
                    "api",
                    "googleCalendarEnabled",
                    "Google Calendar",
                    "Google Calendar API 연동을 활성화합니다."
                  )}
                  {renderToggleSwitch(
                    "api",
                    "zoomEnabled",
                    "Zoom",
                    "Zoom API 연동을 활성화합니다."
                  )}
                  {renderToggleSwitch(
                    "api",
                    "kakaoTalkEnabled",
                    "KakaoTalk",
                    "KakaoTalk API 연동을 활성화합니다."
                  )}
                </div>
              </div>
            </div>

            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <Key size={20} />
                    API 키 관리
                  </h3>
                  <p className="settings-section-description">
                    API 키를 생성하고 관리합니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <ApiKeyManager />
              </div>
            </div>
          </>
        )}

        {/* 9. 모니터링 설정 */}
        {activeTab === "monitoring" && (
          <>
            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <Activity size={20} />
                    시스템 상태
                  </h3>
                  <p className="settings-section-description">
                    현재 시스템의 실시간 상태를 확인합니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <div className="settings-grid">
                  <div className="settings-card">
                    <div className="settings-card-header">
                      <div className="settings-card-title">리소스 사용률</div>
                    </div>
                    <div className="settings-card-content">
                      {renderProgressBar(
                        "CPU 사용률",
                        systemStatus.cpu,
                        settings.monitoring.cpuThreshold
                      )}
                      {renderProgressBar(
                        "메모리 사용률",
                        systemStatus.memory,
                        settings.monitoring.memoryThreshold
                      )}
                      {renderProgressBar(
                        "디스크 사용률",
                        systemStatus.disk,
                        settings.monitoring.diskThreshold
                      )}
                      {renderProgressBar(
                        "네트워크 사용률",
                        systemStatus.network,
                        settings.monitoring.networkThreshold
                      )}
                    </div>
                  </div>
                  <div className="settings-card">
                    <div className="settings-card-header">
                      <div className="settings-card-title">성능 지표</div>
                    </div>
                    <div className="settings-card-content">
                      <div className="status-indicator">
                        <div className="status-dot online"></div>
                        <span>시스템 가동 시간: {systemStatus.uptime}</span>
                      </div>
                      <div className="status-indicator">
                        <div className="status-dot online"></div>
                        <span>오류율: {systemStatus.errorRate}%</span>
                      </div>
                      <div className="status-indicator">
                        <div className="status-dot online"></div>
                        <span>
                          평균 응답시간: {systemStatus.responseTime}ms
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <AlertTriangle size={20} />
                    알림 임계값
                  </h3>
                  <p className="settings-section-description">
                    시스템 리소스 알림 임계값을 설정합니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <div className="settings-grid">
                  <div className="settings-form-group">
                    <label className="settings-form-label">
                      CPU 임계값 (%)
                    </label>
                    <input
                      type="number"
                      className="settings-form-input"
                      value={settings.monitoring.cpuThreshold}
                      onChange={(e) =>
                        handleSettingChange(
                          "monitoring",
                          "cpuThreshold",
                          parseInt(e.target.value)
                        )
                      }
                      min="50"
                      max="95"
                    />
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">
                      메모리 임계값 (%)
                    </label>
                    <input
                      type="number"
                      className="settings-form-input"
                      value={settings.monitoring.memoryThreshold}
                      onChange={(e) =>
                        handleSettingChange(
                          "monitoring",
                          "memoryThreshold",
                          parseInt(e.target.value)
                        )
                      }
                      min="50"
                      max="95"
                    />
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">
                      디스크 임계값 (%)
                    </label>
                    <input
                      type="number"
                      className="settings-form-input"
                      value={settings.monitoring.diskThreshold}
                      onChange={(e) =>
                        handleSettingChange(
                          "monitoring",
                          "diskThreshold",
                          parseInt(e.target.value)
                        )
                      }
                      min="70"
                      max="95"
                    />
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">
                      네트워크 임계값 (%)
                    </label>
                    <input
                      type="number"
                      className="settings-form-input"
                      value={settings.monitoring.networkThreshold}
                      onChange={(e) =>
                        handleSettingChange(
                          "monitoring",
                          "networkThreshold",
                          parseInt(e.target.value)
                        )
                      }
                      min="50"
                      max="95"
                    />
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">
                      오류율 임계값 (%)
                    </label>
                    <input
                      type="number"
                      className="settings-form-input"
                      value={settings.monitoring.errorRateThreshold}
                      onChange={(e) =>
                        handleSettingChange(
                          "monitoring",
                          "errorRateThreshold",
                          parseFloat(e.target.value)
                        )
                      }
                      min="1"
                      max="10"
                      step="0.1"
                    />
                  </div>
                  <div className="settings-form-group">
                    <label className="settings-form-label">
                      응답시간 임계값 (ms)
                    </label>
                    <input
                      type="number"
                      className="settings-form-input"
                      value={settings.monitoring.responseTimeThreshold}
                      onChange={(e) =>
                        handleSettingChange(
                          "monitoring",
                          "responseTimeThreshold",
                          parseInt(e.target.value)
                        )
                      }
                      min="500"
                      max="5000"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <div className="settings-section-header">
                <div>
                  <h3 className="settings-section-title">
                    <Bell size={20} />
                    알림 설정
                  </h3>
                  <p className="settings-section-description">
                    모니터링 알림을 받을 방법을 설정합니다.
                  </p>
                </div>
              </div>
              <div className="settings-section-content">
                <div className="settings-grid">
                  <div className="settings-form-group">
                    <label className="settings-form-label">알림 이메일</label>
                    <input
                      type="email"
                      className="settings-form-input"
                      value={settings.monitoring.alertEmail}
                      onChange={(e) =>
                        handleSettingChange(
                          "monitoring",
                          "alertEmail",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  {renderToggleSwitch(
                    "monitoring",
                    "uptimeAlerts",
                    "가동 시간 알림",
                    "시스템 다운타임 발생 시 즉시 알림을 받습니다."
                  )}
                  {renderToggleSwitch(
                    "monitoring",
                    "alertSlack",
                    "Slack 알림",
                    "Slack 채널로 모니터링 알림을 받습니다."
                  )}
                </div>
              </div>
            </div>

            <div className="danger-zone">
              <div className="danger-zone-header">
                <h3 className="danger-zone-title">
                  <AlertTriangle size={20} />
                  위험 구역
                </h3>
              </div>
              <div className="danger-zone-content">
                <div className="danger-zone-description">
                  아래 작업들은 시스템에 영구적인 영향을 미칠 수 있습니다.
                  신중하게 진행하세요.
                </div>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <button
                    className="danger-button"
                    onClick={() => {
                      if (
                        window.confirm("정말로 모든 캐시를 삭제하시겠습니까?")
                      ) {
                        console.log("캐시 삭제 실행");
                      }
                    }}
                  >
                    <Trash2 size={16} />
                    캐시 삭제
                  </button>
                  <button
                    className="danger-button"
                    onClick={() => {
                      if (
                        window.confirm(
                          "시스템을 재시작하시겠습니까? 모든 사용자의 연결이 끊어집니다."
                        )
                      ) {
                        console.log("시스템 재시작 실행");
                      }
                    }}
                  >
                    <RefreshCw size={16} />
                    시스템 재시작
                  </button>
                  <button
                    className="danger-button"
                    onClick={() => {
                      if (
                        window.confirm(
                          "정말로 모든 설정을 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다."
                        )
                      ) {
                        handleReset();
                      }
                    }}
                  >
                    <RotateCcw size={16} />
                    설정 초기화
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SystemSettings;
