import React, { useState } from "react";
import {
  X,
  Save,
  Calendar,
  Clock,
  Plus,
  Trash2,
  Edit,
  FileDown,
  Bell,
  AlertTriangle,
  Settings,
  Server,
  Download,
  Filter,
  CheckCircle,
  XCircle,
  Info,
  Bug,
  User,
  Database,
  Code,
  FileText,
  Activity,
  Shield,
  TrendingUp,
  BarChart3,
  PieChart,
  RefreshCw,
  Cpu,
  HardDrive,
  Wifi,
  Globe,
} from "lucide-react";

// 보고서 생성 모달
export const ReportGenerationModal = ({ reportType, onClose, onGenerate }) => {
  const [config, setConfig] = useState({
    reportType: reportType,
    dateRange: "30days",
    startDate: "",
    endDate: "",
    format: "json",
    includeCharts: true,
    includeSummary: true,
    detailLevel: "standard",
  });

  const reportTypeLabels = {
    daily: "일간 활동 보고서",
    weekly: "주간 매출 보고서",
    monthly: "월간 성장 분석",
    security: "보안 감사 보고서",
    performance: "시스템 성능 보고서",
    analytics: "사용자 행동 분석",
  };

  const handleGenerate = () => {
    if (
      config.dateRange === "custom" &&
      (!config.startDate || !config.endDate)
    ) {
      alert(
        "사용자 지정 기간을 선택한 경우 시작일과 종료일을 모두 입력해주세요."
      );
      return;
    }

    onGenerate(config);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="hospital-modal" onClick={(e) => e.stopPropagation()}>
        <div className="hospital-modal-header">
          <h2>{reportTypeLabels[reportType] || "보고서"} 생성</h2>
          <button className="modal-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="hospital-modal-form">
          <div className="form-group">
            <label>기간 설정</label>
            <select
              value={config.dateRange}
              onChange={(e) =>
                setConfig({ ...config, dateRange: e.target.value })
              }
              className="form-input"
            >
              <option value="7days">최근 7일</option>
              <option value="30days">최근 30일</option>
              <option value="90days">최근 90일</option>
              <option value="1year">최근 1년</option>
              <option value="custom">사용자 지정</option>
            </select>
          </div>

          {config.dateRange === "custom" && (
            <div className="form-row">
              <div className="form-group">
                <label>시작일</label>
                <input
                  type="date"
                  value={config.startDate}
                  onChange={(e) =>
                    setConfig({ ...config, startDate: e.target.value })
                  }
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>종료일</label>
                <input
                  type="date"
                  value={config.endDate}
                  onChange={(e) =>
                    setConfig({ ...config, endDate: e.target.value })
                  }
                  className="form-input"
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>출력 형식</label>
            <select
              value={config.format}
              onChange={(e) => setConfig({ ...config, format: e.target.value })}
              className="form-input"
            >
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
              <option value="excel">Excel</option>
              <option value="pdf">PDF</option>
            </select>
          </div>

          <div className="form-group">
            <label>상세 수준</label>
            <select
              value={config.detailLevel}
              onChange={(e) =>
                setConfig({ ...config, detailLevel: e.target.value })
              }
              className="form-input"
            >
              <option value="summary">요약</option>
              <option value="standard">표준</option>
              <option value="detailed">상세</option>
            </select>
          </div>

          <div className="form-group">
            <label>포함 옵션</label>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.875rem",
                }}
              >
                <input
                  type="checkbox"
                  checked={config.includeCharts}
                  onChange={(e) =>
                    setConfig({ ...config, includeCharts: e.target.checked })
                  }
                />
                차트 및 그래프 포함
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.875rem",
                }}
              >
                <input
                  type="checkbox"
                  checked={config.includeSummary}
                  onChange={(e) =>
                    setConfig({ ...config, includeSummary: e.target.checked })
                  }
                />
                요약 정보 포함
              </label>
            </div>
          </div>
        </div>
        <div className="hospital-management-modal-footer">
          <div className="action-buttons">
            <button className="hospital-modal-cancel-button" onClick={onClose}>
              취소
            </button>
            <button className="save-button" onClick={handleGenerate}>
              <FileDown size={16} />
              보고서 생성
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 알림 규칙 설정 모달
export const AlertRuleModal = ({ onClose, onSave }) => {
  const [rules, setRules] = useState([
    {
      id: 1,
      name: "오류 로그 알림",
      condition: "level = error",
      threshold: 5,
      timeWindow: 300,
      isActive: true,
      recipients: ["admin@example.com"],
    },
    {
      id: 2,
      name: "보안 위협 감지",
      condition: "category = security AND level = warning",
      threshold: 1,
      timeWindow: 60,
      isActive: true,
      recipients: ["security@example.com"],
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newRule, setNewRule] = useState({
    name: "",
    condition: "",
    threshold: 1,
    timeWindow: 300,
    isActive: true,
    recipients: [],
    recipientInput: "",
  });

  const handleAddRule = () => {
    if (!newRule.name.trim() || !newRule.condition.trim()) {
      alert("규칙 이름과 조건을 입력해주세요.");
      return;
    }

    const recipients = newRule.recipientInput
      .split(",")
      .map((r) => r.trim())
      .filter((r) => r);

    const rule = {
      ...newRule,
      id: rules.length + 1,
      recipients: recipients,
    };

    setRules([...rules, rule]);
    setNewRule({
      name: "",
      condition: "",
      threshold: 1,
      timeWindow: 300,
      isActive: true,
      recipients: [],
      recipientInput: "",
    });
    setShowAddForm(false);
  };

  const handleDeleteRule = (id) => {
    if (window.confirm("정말로 이 알림 규칙을 삭제하시겠습니까?")) {
      setRules(rules.filter((r) => r.id !== id));
    }
  };

  const handleToggleActive = (id) => {
    setRules(
      rules.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r))
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="hospital-modal" onClick={(e) => e.stopPropagation()}>
        <div className="hospital-modal-header">
          <h2>알림 규칙 설정</h2>
          <button className="modal-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="hospital-modal-form">
          <div className="form-group">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h3>알림 규칙</h3>
              <button
                className="super-admin-button super-admin-button-primary"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                <Plus size={16} />
                규칙 추가
              </button>
            </div>

            {showAddForm && (
              <div
                style={{
                  padding: "1rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  marginBottom: "1rem",
                  backgroundColor: "#f9fafb",
                }}
              >
                <h4>새 알림 규칙 추가</h4>
                <div className="form-group">
                  <label>규칙 이름</label>
                  <input
                    type="text"
                    value={newRule.name}
                    onChange={(e) =>
                      setNewRule({ ...newRule, name: e.target.value })
                    }
                    className="form-input"
                    placeholder="알림 규칙 이름을 입력하세요"
                  />
                </div>
                <div className="form-group">
                  <label>조건</label>
                  <input
                    type="text"
                    value={newRule.condition}
                    onChange={(e) =>
                      setNewRule({ ...newRule, condition: e.target.value })
                    }
                    className="form-input"
                    placeholder="예: level = error OR category = security"
                  />
                  <div className="form-help">
                    사용 가능한 필드: level, category, user, ip, message
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>임계값</label>
                    <input
                      type="number"
                      value={newRule.threshold}
                      onChange={(e) =>
                        setNewRule({
                          ...newRule,
                          threshold: parseInt(e.target.value) || 1,
                        })
                      }
                      className="form-input"
                      min="1"
                    />
                    <div className="form-help">발생 횟수 임계값</div>
                  </div>
                  <div className="form-group">
                    <label>시간 윈도우 (초)</label>
                    <input
                      type="number"
                      value={newRule.timeWindow}
                      onChange={(e) =>
                        setNewRule({
                          ...newRule,
                          timeWindow: parseInt(e.target.value) || 300,
                        })
                      }
                      className="form-input"
                      min="60"
                    />
                    <div className="form-help">체크 간격</div>
                  </div>
                </div>
                <div className="form-group">
                  <label>알림 받을 이메일</label>
                  <input
                    type="text"
                    value={newRule.recipientInput}
                    onChange={(e) =>
                      setNewRule({ ...newRule, recipientInput: e.target.value })
                    }
                    className="form-input"
                    placeholder="email@example.com, email2@example.com"
                  />
                  <div className="form-help">
                    쉼표로 구분하여 여러 이메일 입력
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    className="hospital-modal-cancel-button"
                    onClick={() => setShowAddForm(false)}
                  >
                    취소
                  </button>
                  <button className="save-button" onClick={handleAddRule}>
                    추가
                  </button>
                </div>
              </div>
            )}

            <div className="settlement-schedule-list">
              {rules.map((rule) => (
                <div key={rule.id} className="settlement-schedule-item">
                  <div>
                    <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>
                      {rule.name}
                    </div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        color: "#6b7280",
                        marginBottom: "0.5rem",
                      }}
                    >
                      조건: {rule.condition}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                      임계값: {rule.threshold}회 / {rule.timeWindow}초
                      {rule.recipients.length > 0 && (
                        <> • 수신자: {rule.recipients.join(", ")}</>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      alignItems: "center",
                    }}
                  >
                    <span
                      className={`settlement-schedule-badge ${
                        rule.isActive ? "active" : "inactive"
                      }`}
                    >
                      {rule.isActive ? "활성" : "비활성"}
                    </span>
                    <button
                      className="action-button edit"
                      onClick={() => handleToggleActive(rule.id)}
                      title={rule.isActive ? "비활성화" : "활성화"}
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      className="action-button delete"
                      onClick={() => handleDeleteRule(rule.id)}
                      title="삭제"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hospital-management-modal-footer">
          <div className="action-buttons">
            <button className="hospital-modal-cancel-button" onClick={onClose}>
              닫기
            </button>
            <button
              className="save-button"
              onClick={() => {
                onSave(rules);
                onClose();
              }}
            >
              <Save size={16} />
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 커스텀 보고서 생성 모달
export const CustomReportModal = ({ onClose, onSave }) => {
  const [reportConfig, setReportConfig] = useState({
    name: "",
    description: "",
    category: "system",
    fields: ["timestamp", "level", "message"],
    conditions: [],
    schedule: "manual",
    format: "json",
    recipients: [],
  });

  const [newCondition, setNewCondition] = useState({
    field: "level",
    operator: "equals",
    value: "",
  });

  const availableFields = [
    { value: "timestamp", label: "타임스탬프" },
    { value: "level", label: "로그 레벨" },
    { value: "category", label: "카테고리" },
    { value: "message", label: "메시지" },
    { value: "user", label: "사용자" },
    { value: "ip", label: "IP 주소" },
    { value: "endpoint", label: "엔드포인트" },
    { value: "statusCode", label: "상태 코드" },
    { value: "duration", label: "응답 시간" },
  ];

  const operators = [
    { value: "equals", label: "같음" },
    { value: "not_equals", label: "같지 않음" },
    { value: "contains", label: "포함" },
    { value: "not_contains", label: "포함하지 않음" },
    { value: "greater_than", label: "보다 큼" },
    { value: "less_than", label: "보다 작음" },
  ];

  const handleFieldToggle = (field) => {
    const isSelected = reportConfig.fields.includes(field);
    if (isSelected) {
      setReportConfig({
        ...reportConfig,
        fields: reportConfig.fields.filter((f) => f !== field),
      });
    } else {
      setReportConfig({
        ...reportConfig,
        fields: [...reportConfig.fields, field],
      });
    }
  };

  const handleAddCondition = () => {
    if (!newCondition.value.trim()) {
      alert("조건 값을 입력해주세요.");
      return;
    }

    setReportConfig({
      ...reportConfig,
      conditions: [
        ...reportConfig.conditions,
        { ...newCondition, id: Date.now() },
      ],
    });

    setNewCondition({
      field: "level",
      operator: "equals",
      value: "",
    });
  };

  const handleRemoveCondition = (id) => {
    setReportConfig({
      ...reportConfig,
      conditions: reportConfig.conditions.filter((c) => c.id !== id),
    });
  };

  const handleSave = () => {
    if (!reportConfig.name.trim()) {
      alert("보고서 이름을 입력해주세요.");
      return;
    }

    if (reportConfig.fields.length === 0) {
      alert("최소 하나의 필드를 선택해주세요.");
      return;
    }

    onSave(reportConfig);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="hospital-modal" onClick={(e) => e.stopPropagation()}>
        <div className="hospital-modal-header">
          <h2>커스텀 보고서 생성</h2>
          <button className="modal-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="hospital-modal-form">
          <div className="form-group">
            <label>보고서 이름 *</label>
            <input
              type="text"
              value={reportConfig.name}
              onChange={(e) =>
                setReportConfig({ ...reportConfig, name: e.target.value })
              }
              className="form-input"
              placeholder="커스텀 보고서 이름을 입력하세요"
            />
          </div>

          <div className="form-group">
            <label>설명</label>
            <textarea
              value={reportConfig.description}
              onChange={(e) =>
                setReportConfig({
                  ...reportConfig,
                  description: e.target.value,
                })
              }
              className="form-input"
              rows={3}
              placeholder="보고서에 대한 설명을 입력하세요"
            />
          </div>

          <div className="form-group">
            <label>카테고리</label>
            <select
              value={reportConfig.category}
              onChange={(e) =>
                setReportConfig({ ...reportConfig, category: e.target.value })
              }
              className="form-input"
            >
              <option value="system">시스템</option>
              <option value="user">사용자</option>
              <option value="payment">결제</option>
              <option value="security">보안</option>
              <option value="api">API</option>
              <option value="custom">기타</option>
            </select>
          </div>

          <div className="form-group">
            <label>포함할 필드 *</label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              {availableFields.map((field) => (
                <label
                  key={field.value}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={reportConfig.fields.includes(field.value)}
                    onChange={() => handleFieldToggle(field.value)}
                  />
                  {field.label}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>필터 조건</label>
            <div
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                padding: "1rem",
                backgroundColor: "#f9fafb",
              }}
            >
              <div className="form-row">
                <div className="form-group">
                  <select
                    value={newCondition.field}
                    onChange={(e) =>
                      setNewCondition({
                        ...newCondition,
                        field: e.target.value,
                      })
                    }
                    className="form-input"
                  >
                    {availableFields.map((field) => (
                      <option key={field.value} value={field.value}>
                        {field.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <select
                    value={newCondition.operator}
                    onChange={(e) =>
                      setNewCondition({
                        ...newCondition,
                        operator: e.target.value,
                      })
                    }
                    className="form-input"
                  >
                    {operators.map((op) => (
                      <option key={op.value} value={op.value}>
                        {op.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    value={newCondition.value}
                    onChange={(e) =>
                      setNewCondition({
                        ...newCondition,
                        value: e.target.value,
                      })
                    }
                    className="form-input"
                    placeholder="값 입력"
                  />
                </div>
                <button
                  className="super-admin-button super-admin-button-primary"
                  onClick={handleAddCondition}
                >
                  <Plus size={16} />
                </button>
              </div>

              {reportConfig.conditions.length > 0 && (
                <div style={{ marginTop: "1rem" }}>
                  <h4 style={{ marginBottom: "0.5rem" }}>적용된 조건:</h4>
                  {reportConfig.conditions.map((condition) => (
                    <div
                      key={condition.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                        padding: "0.5rem",
                        backgroundColor: "white",
                        borderRadius: "0.25rem",
                      }}
                    >
                      <span style={{ fontSize: "0.875rem" }}>
                        {
                          availableFields.find(
                            (f) => f.value === condition.field
                          )?.label
                        }{" "}
                        {
                          operators.find((o) => o.value === condition.operator)
                            ?.label
                        }{" "}
                        "{condition.value}"
                      </span>
                      <button
                        className="action-button delete"
                        onClick={() => handleRemoveCondition(condition.id)}
                        title="조건 삭제"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>실행 스케줄</label>
              <select
                value={reportConfig.schedule}
                onChange={(e) =>
                  setReportConfig({ ...reportConfig, schedule: e.target.value })
                }
                className="form-input"
              >
                <option value="manual">수동 실행</option>
                <option value="daily">매일</option>
                <option value="weekly">매주</option>
                <option value="monthly">매월</option>
              </select>
            </div>
            <div className="form-group">
              <label>출력 형식</label>
              <select
                value={reportConfig.format}
                onChange={(e) =>
                  setReportConfig({ ...reportConfig, format: e.target.value })
                }
                className="form-input"
              >
                <option value="json">JSON</option>
                <option value="csv">CSV</option>
                <option value="excel">Excel</option>
              </select>
            </div>
          </div>
        </div>
        <div className="hospital-management-modal-footer">
          <div className="action-buttons">
            <button className="hospital-modal-cancel-button" onClick={onClose}>
              취소
            </button>
            <button className="save-button" onClick={handleSave}>
              <Save size={16} />
              생성
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 보고서 스케줄 관리 모달
export const ReportScheduleModal = ({ onClose, onSave }) => {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      reportName: "일간 활동 보고서",
      reportType: "daily",
      schedule: { type: "daily", time: "09:00" },
      isActive: true,
      lastRun: new Date().toISOString(),
      nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 2,
      reportName: "주간 매출 보고서",
      reportType: "weekly",
      schedule: { type: "weekly", dayOfWeek: 1, time: "10:00" },
      isActive: true,
      lastRun: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    reportName: "",
    reportType: "custom",
    schedule: { type: "daily", time: "09:00", dayOfWeek: 1 },
    isActive: true,
  });

  const handleAddSchedule = () => {
    if (!newSchedule.reportName.trim()) {
      alert("보고서 이름을 입력해주세요.");
      return;
    }

    const schedule = {
      ...newSchedule,
      id: schedules.length + 1,
      lastRun: null,
      nextRun: calculateNextRun(newSchedule.schedule),
    };

    setSchedules([...schedules, schedule]);
    setNewSchedule({
      reportName: "",
      reportType: "custom",
      schedule: { type: "daily", time: "09:00", dayOfWeek: 1 },
      isActive: true,
    });
    setShowAddForm(false);
  };

  const calculateNextRun = (schedule) => {
    const now = new Date();
    let next = new Date();

    if (schedule.type === "daily") {
      const [hour, minute] = schedule.time.split(":");
      next.setHours(parseInt(hour), parseInt(minute), 0, 0);
      if (next <= now) {
        next.setDate(next.getDate() + 1);
      }
    } else if (schedule.type === "weekly") {
      const [hour, minute] = schedule.time.split(":");
      next.setHours(parseInt(hour), parseInt(minute), 0, 0);

      const daysUntilTarget = (schedule.dayOfWeek - next.getDay() + 7) % 7;
      next.setDate(next.getDate() + daysUntilTarget);

      if (next <= now) {
        next.setDate(next.getDate() + 7);
      }
    }

    return next.toISOString();
  };

  const handleDeleteSchedule = (id) => {
    if (window.confirm("정말로 이 스케줄을 삭제하시겠습니까?")) {
      setSchedules(schedules.filter((s) => s.id !== id));
    }
  };

  const handleToggleActive = (id) => {
    setSchedules(
      schedules.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const getDayName = (dayNum) => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return days[dayNum];
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("ko-KR");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="hospital-modal" onClick={(e) => e.stopPropagation()}>
        <div className="hospital-modal-header">
          <h2>보고서 스케줄 관리</h2>
          <button className="modal-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="hospital-modal-form">
          <div className="form-group">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h3>예약된 보고서</h3>
              <button
                className="super-admin-button super-admin-button-primary"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                <Plus size={16} />
                스케줄 추가
              </button>
            </div>

            {showAddForm && (
              <div
                style={{
                  padding: "1rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  marginBottom: "1rem",
                  backgroundColor: "#f9fafb",
                }}
              >
                <h4>새 스케줄 추가</h4>
                <div className="form-group">
                  <label>보고서 이름</label>
                  <input
                    type="text"
                    value={newSchedule.reportName}
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        reportName: e.target.value,
                      })
                    }
                    className="form-input"
                    placeholder="보고서 이름을 입력하세요"
                  />
                </div>
                <div className="form-group">
                  <label>보고서 유형</label>
                  <select
                    value={newSchedule.reportType}
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        reportType: e.target.value,
                      })
                    }
                    className="form-input"
                  >
                    <option value="daily">일간 보고서</option>
                    <option value="weekly">주간 보고서</option>
                    <option value="monthly">월간 보고서</option>
                    <option value="custom">커스텀 보고서</option>
                  </select>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>실행 주기</label>
                    <select
                      value={newSchedule.schedule.type}
                      onChange={(e) =>
                        setNewSchedule({
                          ...newSchedule,
                          schedule: {
                            ...newSchedule.schedule,
                            type: e.target.value,
                          },
                        })
                      }
                      className="form-input"
                    >
                      <option value="daily">매일</option>
                      <option value="weekly">매주</option>
                      <option value="monthly">매월</option>
                    </select>
                  </div>
                  {newSchedule.schedule.type === "weekly" && (
                    <div className="form-group">
                      <label>요일</label>
                      <select
                        value={newSchedule.schedule.dayOfWeek}
                        onChange={(e) =>
                          setNewSchedule({
                            ...newSchedule,
                            schedule: {
                              ...newSchedule.schedule,
                              dayOfWeek: parseInt(e.target.value),
                            },
                          })
                        }
                        className="form-input"
                      >
                        {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                          <option key={day} value={day}>
                            {getDayName(day)}요일
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="form-group">
                    <label>실행 시간</label>
                    <input
                      type="time"
                      value={newSchedule.schedule.time}
                      onChange={(e) =>
                        setNewSchedule({
                          ...newSchedule,
                          schedule: {
                            ...newSchedule.schedule,
                            time: e.target.value,
                          },
                        })
                      }
                      className="form-input"
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    className="hospital-modal-cancel-button"
                    onClick={() => setShowAddForm(false)}
                  >
                    취소
                  </button>
                  <button className="save-button" onClick={handleAddSchedule}>
                    추가
                  </button>
                </div>
              </div>
            )}

            <div className="settlement-schedule-list">
              {schedules.map((schedule) => (
                <div key={schedule.id} className="settlement-schedule-item">
                  <div>
                    <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>
                      {schedule.reportName}
                    </div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        color: "#6b7280",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {schedule.schedule.type === "daily"
                        ? "매일"
                        : schedule.schedule.type === "weekly"
                        ? `매주 ${getDayName(schedule.schedule.dayOfWeek)}요일`
                        : "매월"}{" "}
                      {schedule.schedule.time}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                      마지막 실행: {formatDateTime(schedule.lastRun)}
                      <br />
                      다음 실행: {formatDateTime(schedule.nextRun)}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      alignItems: "center",
                    }}
                  >
                    <span
                      className={`settlement-schedule-badge ${
                        schedule.isActive ? "active" : "inactive"
                      }`}
                    >
                      {schedule.isActive ? "활성" : "비활성"}
                    </span>
                    <button
                      className="action-button edit"
                      onClick={() => handleToggleActive(schedule.id)}
                      title={schedule.isActive ? "비활성화" : "활성화"}
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      className="action-button delete"
                      onClick={() => handleDeleteSchedule(schedule.id)}
                      title="삭제"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hospital-management-modal-footer">
          <div className="action-buttons">
            <button className="hospital-modal-cancel-button" onClick={onClose}>
              닫기
            </button>
            <button
              className="save-button"
              onClick={() => {
                onSave(schedules);
                onClose();
              }}
            >
              <Save size={16} />
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 로그 내보내기 모달
export const LogExportModal = ({ onClose, onExport }) => {
  const [exportConfig, setExportConfig] = useState({
    dateRange: "7days",
    startDate: "",
    endDate: "",
    levels: [],
    categories: [],
    fields: ["timestamp", "level", "category", "message", "user", "ip"],
    format: "json",
    maxRecords: 10000,
  });

  const availableFields = [
    { value: "timestamp", label: "타임스탬프" },
    { value: "level", label: "로그 레벨" },
    { value: "category", label: "카테고리" },
    { value: "message", label: "메시지" },
    { value: "user", label: "사용자" },
    { value: "ip", label: "IP 주소" },
    { value: "userAgent", label: "User Agent" },
    { value: "endpoint", label: "엔드포인트" },
    { value: "statusCode", label: "상태 코드" },
    { value: "duration", label: "응답 시간" },
  ];

  const logLevels = [
    { value: "info", label: "정보" },
    { value: "warning", label: "경고" },
    { value: "error", label: "오류" },
    { value: "success", label: "성공" },
    { value: "debug", label: "디버그" },
  ];

  const logCategories = [
    { value: "system", label: "시스템" },
    { value: "user", label: "사용자" },
    { value: "payment", label: "결제" },
    { value: "security", label: "보안" },
    { value: "api", label: "API" },
  ];

  const handleFieldToggle = (field) => {
    const isSelected = exportConfig.fields.includes(field);
    if (isSelected) {
      setExportConfig({
        ...exportConfig,
        fields: exportConfig.fields.filter((f) => f !== field),
      });
    } else {
      setExportConfig({
        ...exportConfig,
        fields: [...exportConfig.fields, field],
      });
    }
  };

  const handleLevelToggle = (level) => {
    const isSelected = exportConfig.levels.includes(level);
    if (isSelected) {
      setExportConfig({
        ...exportConfig,
        levels: exportConfig.levels.filter((l) => l !== level),
      });
    } else {
      setExportConfig({
        ...exportConfig,
        levels: [...exportConfig.levels, level],
      });
    }
  };

  const handleCategoryToggle = (category) => {
    const isSelected = exportConfig.categories.includes(category);
    if (isSelected) {
      setExportConfig({
        ...exportConfig,
        categories: exportConfig.categories.filter((c) => c !== category),
      });
    } else {
      setExportConfig({
        ...exportConfig,
        categories: [...exportConfig.categories, category],
      });
    }
  };

  const handleExport = () => {
    if (
      exportConfig.dateRange === "custom" &&
      (!exportConfig.startDate || !exportConfig.endDate)
    ) {
      alert(
        "사용자 지정 기간을 선택한 경우 시작일과 종료일을 모두 입력해주세요."
      );
      return;
    }

    if (exportConfig.fields.length === 0) {
      alert("최소 하나의 필드를 선택해주세요.");
      return;
    }

    onExport(exportConfig);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="hospital-modal" onClick={(e) => e.stopPropagation()}>
        <div className="hospital-modal-header">
          <h2>로그 내보내기</h2>
          <button className="modal-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="hospital-modal-form">
          <div className="form-group">
            <label>기간 설정</label>
            <select
              value={exportConfig.dateRange}
              onChange={(e) =>
                setExportConfig({ ...exportConfig, dateRange: e.target.value })
              }
              className="form-input"
            >
              <option value="1day">최근 1일</option>
              <option value="7days">최근 7일</option>
              <option value="30days">최근 30일</option>
              <option value="90days">최근 90일</option>
              <option value="custom">사용자 지정</option>
            </select>
          </div>

          {exportConfig.dateRange === "custom" && (
            <div className="form-row">
              <div className="form-group">
                <label>시작일</label>
                <input
                  type="date"
                  value={exportConfig.startDate}
                  onChange={(e) =>
                    setExportConfig({
                      ...exportConfig,
                      startDate: e.target.value,
                    })
                  }
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>종료일</label>
                <input
                  type="date"
                  value={exportConfig.endDate}
                  onChange={(e) =>
                    setExportConfig({
                      ...exportConfig,
                      endDate: e.target.value,
                    })
                  }
                  className="form-input"
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>로그 레벨 (선택사항)</label>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              {logLevels.map((level) => (
                <label
                  key={level.value}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    fontSize: "0.875rem",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={exportConfig.levels.includes(level.value)}
                    onChange={() => handleLevelToggle(level.value)}
                  />
                  {level.label}
                </label>
              ))}
            </div>
            <div className="form-help">
              선택하지 않으면 모든 레벨이 포함됩니다
            </div>
          </div>

          <div className="form-group">
            <label>카테고리 (선택사항)</label>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              {logCategories.map((category) => (
                <label
                  key={category.value}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    fontSize: "0.875rem",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={exportConfig.categories.includes(category.value)}
                    onChange={() => handleCategoryToggle(category.value)}
                  />
                  {category.label}
                </label>
              ))}
            </div>
            <div className="form-help">
              선택하지 않으면 모든 카테고리가 포함됩니다
            </div>
          </div>

          <div className="form-group">
            <label>포함할 필드 *</label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              {availableFields.map((field) => (
                <label
                  key={field.value}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    fontSize: "0.875rem",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={exportConfig.fields.includes(field.value)}
                    onChange={() => handleFieldToggle(field.value)}
                  />
                  {field.label}
                </label>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>출력 형식</label>
              <select
                value={exportConfig.format}
                onChange={(e) =>
                  setExportConfig({ ...exportConfig, format: e.target.value })
                }
                className="form-input"
              >
                <option value="json">JSON</option>
                <option value="csv">CSV</option>
              </select>
            </div>
            <div className="form-group">
              <label>최대 레코드 수</label>
              <input
                type="number"
                value={exportConfig.maxRecords}
                onChange={(e) =>
                  setExportConfig({
                    ...exportConfig,
                    maxRecords: parseInt(e.target.value) || 10000,
                  })
                }
                className="form-input"
                min="100"
                max="100000"
              />
              <div className="form-help">100 ~ 100,000</div>
            </div>
          </div>

          <div
            style={{
              padding: "1rem",
              backgroundColor: "#f0f9ff",
              borderRadius: "0.5rem",
              border: "1px solid #bfdbfe",
            }}
          >
            <div
              style={{
                color: "#1e40af",
                fontWeight: "500",
                marginBottom: "0.5rem",
              }}
            >
              📁 내보내기 정보
            </div>
            <ul
              style={{
                margin: 0,
                paddingLeft: "1.5rem",
                color: "#1e3a8a",
                fontSize: "0.875rem",
              }}
            >
              <li>선택된 필드: {exportConfig.fields.length}개</li>
              <li>
                로그 레벨:{" "}
                {exportConfig.levels.length > 0
                  ? exportConfig.levels.join(", ")
                  : "전체"}
              </li>
              <li>
                카테고리:{" "}
                {exportConfig.categories.length > 0
                  ? exportConfig.categories.join(", ")
                  : "전체"}
              </li>
              <li>최대 {exportConfig.maxRecords.toLocaleString()}개 레코드</li>
            </ul>
          </div>
        </div>
        <div className="hospital-management-modal-footer">
          <div className="action-buttons">
            <button className="hospital-modal-cancel-button" onClick={onClose}>
              취소
            </button>
            <button className="save-button" onClick={handleExport}>
              <Download size={16} />
              내보내기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 시스템 유지보수 모달
export const SystemMaintenanceModal = ({ onClose, onExecute }) => {
  const [maintenanceConfig, setMaintenanceConfig] = useState({
    type: "routine",
    scheduledTime: "",
    duration: 30,
    description: "",
    affectedServices: [],
    notifyUsers: true,
    backupData: true,
  });

  const maintenanceTypes = [
    {
      value: "routine",
      label: "정기 유지보수",
      description: "일반적인 시스템 점검 및 최적화",
    },
    {
      value: "security",
      label: "보안 업데이트",
      description: "보안 패치 적용 및 취약점 수정",
    },
    {
      value: "performance",
      label: "성능 최적화",
      description: "시스템 성능 개선 작업",
    },
    {
      value: "database",
      label: "데이터베이스 정비",
      description: "DB 최적화 및 백업 작업",
    },
    { value: "emergency", label: "긴급 수리", description: "긴급한 문제 해결" },
  ];

  const availableServices = [
    { value: "api", label: "API 서비스" },
    { value: "database", label: "데이터베이스" },
    { value: "web", label: "웹 서비스" },
    { value: "payment", label: "결제 시스템" },
    { value: "notification", label: "알림 서비스" },
    { value: "backup", label: "백업 시스템" },
  ];

  const handleServiceToggle = (service) => {
    const isSelected = maintenanceConfig.affectedServices.includes(service);
    if (isSelected) {
      setMaintenanceConfig({
        ...maintenanceConfig,
        affectedServices: maintenanceConfig.affectedServices.filter(
          (s) => s !== service
        ),
      });
    } else {
      setMaintenanceConfig({
        ...maintenanceConfig,
        affectedServices: [...maintenanceConfig.affectedServices, service],
      });
    }
  };

  const handleExecute = () => {
    if (!maintenanceConfig.scheduledTime) {
      alert("유지보수 예정 시간을 선택해주세요.");
      return;
    }

    if (!maintenanceConfig.description.trim()) {
      alert("유지보수 내용을 입력해주세요.");
      return;
    }

    onExecute(maintenanceConfig);
    onClose();
  };

  const selectedType = maintenanceTypes.find(
    (t) => t.value === maintenanceConfig.type
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="hospital-modal" onClick={(e) => e.stopPropagation()}>
        <div className="hospital-modal-header">
          <h2>시스템 유지보수 예약</h2>
          <button className="modal-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="hospital-modal-form">
          <div className="form-group">
            <label>유지보수 유형</label>
            <select
              value={maintenanceConfig.type}
              onChange={(e) =>
                setMaintenanceConfig({
                  ...maintenanceConfig,
                  type: e.target.value,
                })
              }
              className="form-input"
            >
              {maintenanceTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {selectedType && (
              <div className="form-help">{selectedType.description}</div>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>예정 시간</label>
              <input
                type="datetime-local"
                value={maintenanceConfig.scheduledTime}
                onChange={(e) =>
                  setMaintenanceConfig({
                    ...maintenanceConfig,
                    scheduledTime: e.target.value,
                  })
                }
                className="form-input"
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>
            <div className="form-group">
              <label>예상 소요 시간 (분)</label>
              <input
                type="number"
                value={maintenanceConfig.duration}
                onChange={(e) =>
                  setMaintenanceConfig({
                    ...maintenanceConfig,
                    duration: parseInt(e.target.value) || 30,
                  })
                }
                className="form-input"
                min="15"
                max="480"
              />
            </div>
          </div>

          <div className="form-group">
            <label>유지보수 내용</label>
            <textarea
              value={maintenanceConfig.description}
              onChange={(e) =>
                setMaintenanceConfig({
                  ...maintenanceConfig,
                  description: e.target.value,
                })
              }
              className="form-input"
              rows={4}
              placeholder="수행할 유지보수 작업에 대해 상세히 설명해주세요"
            />
          </div>

          <div className="form-group">
            <label>영향받는 서비스</label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              {availableServices.map((service) => (
                <label
                  key={service.value}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    fontSize: "0.875rem",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={maintenanceConfig.affectedServices.includes(
                      service.value
                    )}
                    onChange={() => handleServiceToggle(service.value)}
                  />
                  {service.label}
                </label>
              ))}
            </div>
            <div className="form-help">
              유지보수 중 서비스가 중단될 수 있는 항목을 선택하세요
            </div>
          </div>

          <div className="form-group">
            <label>추가 옵션</label>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.875rem",
                }}
              >
                <input
                  type="checkbox"
                  checked={maintenanceConfig.notifyUsers}
                  onChange={(e) =>
                    setMaintenanceConfig({
                      ...maintenanceConfig,
                      notifyUsers: e.target.checked,
                    })
                  }
                />
                사용자에게 사전 알림 발송
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.875rem",
                }}
              >
                <input
                  type="checkbox"
                  checked={maintenanceConfig.backupData}
                  onChange={(e) =>
                    setMaintenanceConfig({
                      ...maintenanceConfig,
                      backupData: e.target.checked,
                    })
                  }
                />
                유지보수 전 데이터 백업 수행
              </label>
            </div>
          </div>

          <div
            style={{
              padding: "1rem",
              backgroundColor: "#fef3c7",
              borderRadius: "0.5rem",
              border: "1px solid #fbbf24",
            }}
          >
            <div
              style={{
                color: "#92400e",
                fontWeight: "500",
                marginBottom: "0.5rem",
              }}
            >
              ⚠️ 유지보수 안내
            </div>
            <ul
              style={{
                margin: 0,
                paddingLeft: "1.5rem",
                color: "#92400e",
                fontSize: "0.875rem",
              }}
            >
              <li>
                유지보수 중에는 선택한 서비스가 일시적으로 중단될 수 있습니다
              </li>
              <li>긴급 상황이 아닌 경우 사용량이 적은 시간대를 선택해주세요</li>
              <li>
                백업 옵션을 활성화하면 유지보수 시작 전 자동 백업이 수행됩니다
              </li>
              <li>
                사용자 알림을 활성화하면 24시간 전과 1시간 전에 알림이
                발송됩니다
              </li>
            </ul>
          </div>
        </div>
        <div className="hospital-management-modal-footer">
          <div className="action-buttons">
            <button className="hospital-modal-cancel-button" onClick={onClose}>
              취소
            </button>
            <button className="save-button" onClick={handleExecute}>
              <Settings size={16} />
              유지보수 예약
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
