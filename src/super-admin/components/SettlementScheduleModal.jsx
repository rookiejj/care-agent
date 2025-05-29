// SettlementScheduleModal.jsx - 정산 스케줄 관리 모달
import React, { useState } from "react";
import { X, Save, Calendar, Clock, Plus, Trash2, Edit } from "lucide-react";

export const SettlementScheduleModal = ({ onClose, onSave }) => {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      name: "일반 정산",
      description: "표준 정산 스케줄",
      cycle: "weekly",
      dayOfWeek: 1, // 월요일
      isActive: true,
      minAmount: 10000,
    },
    {
      id: 2,
      name: "긴급 정산",
      description: "긴급 요청 시 정산",
      cycle: "daily",
      dayOfWeek: null,
      isActive: true,
      minAmount: 50000,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    name: "",
    description: "",
    cycle: "weekly",
    dayOfWeek: 1,
    isActive: true,
    minAmount: 10000,
  });

  const handleAddSchedule = () => {
    if (!newSchedule.name.trim()) {
      alert("스케줄 이름을 입력해주세요.");
      return;
    }

    const schedule = {
      ...newSchedule,
      id: schedules.length + 1,
    };

    setSchedules([...schedules, schedule]);
    setNewSchedule({
      name: "",
      description: "",
      cycle: "weekly",
      dayOfWeek: 1,
      isActive: true,
      minAmount: 10000,
    });
    setShowAddForm(false);
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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="hospital-modal" onClick={(e) => e.stopPropagation()}>
        <div className="hospital-modal-header">
          <h2>정산 스케줄 관리</h2>
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
              <h3>현재 스케줄</h3>
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
                  <label>스케줄 이름</label>
                  <input
                    type="text"
                    value={newSchedule.name}
                    onChange={(e) =>
                      setNewSchedule({ ...newSchedule, name: e.target.value })
                    }
                    className="form-input"
                    placeholder="스케줄 이름을 입력하세요"
                  />
                </div>
                <div className="form-group">
                  <label>설명</label>
                  <input
                    type="text"
                    value={newSchedule.description}
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        description: e.target.value,
                      })
                    }
                    className="form-input"
                    placeholder="스케줄 설명을 입력하세요"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>정산 주기</label>
                    <select
                      value={newSchedule.cycle}
                      onChange={(e) =>
                        setNewSchedule({
                          ...newSchedule,
                          cycle: e.target.value,
                        })
                      }
                      className="form-input"
                    >
                      <option value="daily">매일</option>
                      <option value="weekly">매주</option>
                      <option value="monthly">매월</option>
                    </select>
                  </div>
                  {newSchedule.cycle === "weekly" && (
                    <div className="form-group">
                      <label>요일</label>
                      <select
                        value={newSchedule.dayOfWeek}
                        onChange={(e) =>
                          setNewSchedule({
                            ...newSchedule,
                            dayOfWeek: parseInt(e.target.value),
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
                </div>
                <div className="form-group">
                  <label>최소 정산 금액 (원)</label>
                  <input
                    type="number"
                    value={newSchedule.minAmount}
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        minAmount: parseInt(e.target.value) || 0,
                      })
                    }
                    className="form-input"
                    min="0"
                  />
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
                      {schedule.name}
                    </div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        color: "#6b7280",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {schedule.description}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                      {schedule.cycle === "daily"
                        ? "매일"
                        : schedule.cycle === "weekly"
                        ? `매주 ${getDayName(schedule.dayOfWeek)}요일`
                        : "매월"}{" "}
                      • 최소 {schedule.minAmount.toLocaleString()}원
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

// PaymentReportModal.jsx - 결제 리포트 생성 모달
export const PaymentReportModal = ({ onClose, onGenerate }) => {
  const [reportConfig, setReportConfig] = useState({
    reportType: "summary",
    dateRange: "month",
    startDate: "",
    endDate: "",
    includeRefunds: true,
    includePending: false,
    groupBy: "hospital",
    format: "excel",
  });

  const handleGenerate = () => {
    if (
      reportConfig.dateRange === "custom" &&
      (!reportConfig.startDate || !reportConfig.endDate)
    ) {
      alert(
        "사용자 지정 기간을 선택한 경우 시작일과 종료일을 모두 입력해주세요."
      );
      return;
    }

    onGenerate(reportConfig);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="hospital-modal" onClick={(e) => e.stopPropagation()}>
        <div className="hospital-modal-header">
          <h2>결제 리포트 생성</h2>
          <button className="modal-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="hospital-modal-form">
          <div className="form-group">
            <label>리포트 유형</label>
            <select
              value={reportConfig.reportType}
              onChange={(e) =>
                setReportConfig({ ...reportConfig, reportType: e.target.value })
              }
              className="form-input"
            >
              <option value="summary">요약 리포트</option>
              <option value="detailed">상세 리포트</option>
              <option value="settlement">정산 리포트</option>
              <option value="refund">환불 리포트</option>
            </select>
          </div>

          <div className="form-group">
            <label>기간 설정</label>
            <select
              value={reportConfig.dateRange}
              onChange={(e) =>
                setReportConfig({ ...reportConfig, dateRange: e.target.value })
              }
              className="form-input"
            >
              <option value="week">최근 1주일</option>
              <option value="month">최근 1개월</option>
              <option value="quarter">최근 3개월</option>
              <option value="year">최근 1년</option>
              <option value="custom">사용자 지정</option>
            </select>
          </div>

          {reportConfig.dateRange === "custom" && (
            <div className="form-row">
              <div className="form-group">
                <label>시작일</label>
                <input
                  type="date"
                  value={reportConfig.startDate}
                  onChange={(e) =>
                    setReportConfig({
                      ...reportConfig,
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
                  value={reportConfig.endDate}
                  onChange={(e) =>
                    setReportConfig({
                      ...reportConfig,
                      endDate: e.target.value,
                    })
                  }
                  className="form-input"
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>포함 항목</label>
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
                  checked={reportConfig.includeRefunds}
                  onChange={(e) =>
                    setReportConfig({
                      ...reportConfig,
                      includeRefunds: e.target.checked,
                    })
                  }
                />
                환불된 결제 포함
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
                  checked={reportConfig.includePending}
                  onChange={(e) =>
                    setReportConfig({
                      ...reportConfig,
                      includePending: e.target.checked,
                    })
                  }
                />
                대기 중인 결제 포함
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>그룹화 기준</label>
            <select
              value={reportConfig.groupBy}
              onChange={(e) =>
                setReportConfig({ ...reportConfig, groupBy: e.target.value })
              }
              className="form-input"
            >
              <option value="hospital">병원별</option>
              <option value="type">결제 유형별</option>
              <option value="method">결제 방법별</option>
              <option value="date">날짜별</option>
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
              <option value="excel">Excel (.xlsx)</option>
              <option value="csv">CSV (.csv)</option>
              <option value="pdf">PDF (.pdf)</option>
            </select>
          </div>
        </div>
        <div className="hospital-management-modal-footer">
          <div className="action-buttons">
            <button className="hospital-modal-cancel-button" onClick={onClose}>
              취소
            </button>
            <button className="save-button" onClick={handleGenerate}>
              <FileDown size={16} />
              리포트 생성
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// PaymentStatusBulkModal.jsx - 대량 상태 변경 모달
export const PaymentStatusBulkModal = ({
  selectedPayments,
  onClose,
  onUpdate,
}) => {
  const [bulkAction, setBulkAction] = useState("");
  const [reason, setReason] = useState("");

  const handleBulkUpdate = () => {
    if (!bulkAction) {
      alert("수행할 작업을 선택해주세요.");
      return;
    }

    if ((bulkAction === "approve" || bulkAction === "cancel") && !reason) {
      alert("작업 사유를 입력해주세요.");
      return;
    }

    const confirmMessage = `선택된 ${
      selectedPayments.length
    }건의 결제에 대해 "${
      bulkAction === "approve"
        ? "승인"
        : bulkAction === "cancel"
        ? "취소"
        : bulkAction === "export"
        ? "내보내기"
        : "알림 발송"
    }" 작업을 수행하시겠습니까?`;

    if (window.confirm(confirmMessage)) {
      onUpdate(selectedPayments, bulkAction, reason);
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="hospital-modal" onClick={(e) => e.stopPropagation()}>
        <div className="hospital-modal-header">
          <h2>대량 작업 수행</h2>
          <button className="modal-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="hospital-modal-form">
          <div
            style={{
              padding: "1rem",
              backgroundColor: "#f0f9ff",
              borderRadius: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                fontWeight: "600",
                color: "#0369a1",
                marginBottom: "0.5rem",
              }}
            >
              선택된 항목: {selectedPayments.length}건
            </div>
            <div style={{ fontSize: "0.875rem", color: "#0284c7" }}>
              {selectedPayments
                .slice(0, 3)
                .map((p) => p.transactionId)
                .join(", ")}
              {selectedPayments.length > 3 &&
                ` 외 ${selectedPayments.length - 3}건`}
            </div>
          </div>

          <div className="form-group">
            <label>수행할 작업</label>
            <select
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
              className="form-input"
            >
              <option value="">작업을 선택하세요</option>
              <option value="approve">결제 승인</option>
              <option value="cancel">결제 취소</option>
              <option value="export">데이터 내보내기</option>
              <option value="notify">알림 발송</option>
            </select>
          </div>

          {(bulkAction === "approve" || bulkAction === "cancel") && (
            <div className="form-group">
              <label>작업 사유</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="form-input"
                rows={3}
                placeholder="작업 수행 사유를 입력하세요"
              />
            </div>
          )}

          {bulkAction === "notify" && (
            <div className="form-group">
              <label>알림 유형</label>
              <select className="form-input">
                <option value="payment_reminder">결제 안내</option>
                <option value="settlement_notice">정산 안내</option>
                <option value="system_notice">시스템 공지</option>
              </select>
            </div>
          )}
        </div>
        <div className="hospital-management-modal-footer">
          <div className="action-buttons">
            <button className="hospital-modal-cancel-button" onClick={onClose}>
              취소
            </button>
            <button
              className={
                bulkAction === "cancel" ? "delete-button" : "save-button"
              }
              onClick={handleBulkUpdate}
            >
              <CheckCircle size={16} />
              작업 수행
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
