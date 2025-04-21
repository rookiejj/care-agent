import React, { useState, useEffect } from "react";
import { X, Save, Trash2, CheckCircle, AlertCircle, Clock } from "lucide-react";
import "./AppointmentModal.css";

const AppointmentModal = ({ appointment, onClose, onSave, doctors = [] }) => {
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    phoneNumber: "",
    date: "",
    time: "",
    department: "내과",
    doctor: "",
    reason: "",
    note: "",
    status: "confirmed",
  });

  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("appointment");

  // 진료과 목록
  const departments = [
    "내과",
    "정형외과",
    "피부과",
    "소아과",
    "이비인후과",
    "치과",
    "신경과",
    "산부인과",
  ];

  useEffect(() => {
    if (appointment) {
      // 기존 예약 데이터로 폼 초기화
      const appointmentDate = new Date(appointment.date);
      const date = formatDateForInput(appointmentDate);
      const time = formatTimeForInput(appointmentDate);

      setFormData({
        patientName: appointment.patientName || "",
        patientId: appointment.patientId || "",
        phoneNumber: appointment.phoneNumber || "",
        date,
        time,
        department: appointment.department || "내과",
        doctor: appointment.doctor || "",
        reason: appointment.reason || "",
        note: appointment.note || "",
        status: appointment.status || "confirmed",
      });
    } else if (doctors.length > 0) {
      // 새 예약 시 첫 번째 의사를 기본값으로 설정
      setFormData((prev) => ({
        ...prev,
        doctor: doctors[0],
      }));
    }
  }, [appointment, doctors]);

  const formatDateForInput = (date) => {
    if (!date || !(date instanceof Date)) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatTimeForInput = (date) => {
    if (!date || !(date instanceof Date)) return "";
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // 입력 값이 변경되면 해당 필드의 오류 메시지 제거
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // 필수 입력 필드 검증
    if (!formData.patientName.trim()) {
      newErrors.patientName = "환자 이름을 입력해주세요";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "전화번호를 입력해주세요";
    } else if (!/^\d{3}-\d{3,4}-\d{4}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)";
    }

    if (!formData.date) {
      newErrors.date = "날짜를 선택해주세요";
    }

    if (!formData.time) {
      newErrors.time = "시간을 선택해주세요";
    }

    if (!formData.department) {
      newErrors.department = "진료과를 선택해주세요";
    }

    if (!formData.doctor) {
      newErrors.doctor = "담당 의사를 선택해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // 날짜와 시간을 Date 객체로 변환
      const [year, month, day] = formData.date.split("-").map(Number);
      const [hours, minutes] = formData.time.split(":").map(Number);
      const date = new Date(year, month - 1, day, hours, minutes);

      // 예약 데이터 준비
      const appointmentData = {
        ...formData,
        date,
      };

      onSave(appointmentData);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="status-indicator confirmed">
            <CheckCircle size={14} /> 확정
          </span>
        );
      case "completed":
        return (
          <span className="status-indicator completed">
            <CheckCircle size={14} /> 완료
          </span>
        );
      case "cancelled":
        return (
          <span className="status-indicator cancelled">
            <AlertCircle size={14} /> 취소
          </span>
        );
      case "rescheduled":
        return (
          <span className="status-indicator rescheduled">
            <Clock size={14} /> 일정변경
          </span>
        );
      case "noshow":
        return (
          <span className="status-indicator noshow">
            <AlertCircle size={14} /> 노쇼
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="appointment-modal" onClick={(e) => e.stopPropagation()}>
        <div className="appointment-modal-header">
          <h2>{appointment ? "예약 정보 수정" : "새 예약 등록"}</h2>
          <button className="modal-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="appointment-modal-tabs">
          <button
            className={`appointment-modal-tab ${
              activeTab === "appointment" ? "active" : ""
            }`}
            onClick={() => setActiveTab("appointment")}
          >
            예약 정보
          </button>
          <button
            className={`appointment-modal-tab ${
              activeTab === "patient" ? "active" : ""
            }`}
            onClick={() => setActiveTab("patient")}
          >
            환자 정보
          </button>
        </div>

        <form onSubmit={handleSubmit} className="appointment-modal-form">
          {activeTab === "appointment" && (
            <div className="appointment-modal-appointment-info">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">
                    날짜 <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={errors.date ? "form-input error" : "form-input"}
                  />
                  {errors.date && (
                    <div className="error-message">{errors.date}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="time">
                    시간 <span className="required">*</span>
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={errors.time ? "form-input error" : "form-input"}
                  />
                  {errors.time && (
                    <div className="error-message">{errors.time}</div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="department">
                    진료과 <span className="required">*</span>
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className={
                      errors.department ? "form-input error" : "form-input"
                    }
                  >
                    <option value="">선택</option>
                    {departments.map((department, index) => (
                      <option key={index} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <div className="error-message">{errors.department}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="doctor">
                    담당 의사 <span className="required">*</span>
                  </label>
                  <select
                    id="doctor"
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                    className={
                      errors.doctor ? "form-input error" : "form-input"
                    }
                  >
                    <option value="">선택</option>
                    {doctors.map((doctor, index) => (
                      <option key={index} value={doctor}>
                        {doctor}
                      </option>
                    ))}
                  </select>
                  {errors.doctor && (
                    <div className="error-message">{errors.doctor}</div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reason">방문 이유</label>
                <input
                  type="text"
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="예: 정기 검진, 감기 증상, 두통 등"
                />
              </div>

              <div className="form-group">
                <label htmlFor="note">메모</label>
                <textarea
                  id="note"
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  rows={3}
                  className="form-input"
                  placeholder="특이사항이나 주의사항을 기록하세요"
                ></textarea>
              </div>

              {appointment && (
                <div className="form-group">
                  <label htmlFor="status">예약 상태</label>
                  <div className="status-selector">
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="confirmed">확정</option>
                      <option value="completed">완료</option>
                      <option value="cancelled">취소</option>
                      <option value="rescheduled">일정변경</option>
                      <option value="noshow">노쇼</option>
                    </select>
                    <div className="status-badge-container">
                      {getStatusBadge(formData.status)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "patient" && (
            <div className="appointment-modal-patient-info">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="patientName">
                    환자 이름 <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    className={
                      errors.patientName ? "form-input error" : "form-input"
                    }
                  />
                  {errors.patientName && (
                    <div className="error-message">{errors.patientName}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="patientId">환자 ID</label>
                  <input
                    type="text"
                    id="patientId"
                    name="patientId"
                    value={formData.patientId}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="환자 ID가 있는 경우 입력"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">
                  전화번호 <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={
                    errors.phoneNumber ? "form-input error" : "form-input"
                  }
                  placeholder="010-1234-5678"
                />
                {errors.phoneNumber && (
                  <div className="error-message">{errors.phoneNumber}</div>
                )}
              </div>

              {/* 환자 정보 조회 버튼 */}
              <div className="patient-search-button-container">
                <button type="button" className="patient-search-button">
                  환자 정보 조회
                </button>
              </div>
            </div>
          )}

          <div className="appointment-modal-footer">
            {appointment && (
              <button type="button" className="delete-button">
                <Trash2 size={16} />
                삭제
              </button>
            )}
            <div className="action-buttons">
              <button type="button" className="cancel-button" onClick={onClose}>
                취소
              </button>
              <button type="submit" className="save-button">
                <Save size={16} />
                저장
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
