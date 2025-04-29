import React, { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Scissors,
  MessageSquare,
  Tag,
  FileEdit,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Camera,
  Plus,
} from "lucide-react";
import "./ConsultationModal.css";

const ConsultationModal = ({ consultation, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    clientName: "",
    gender: "여성",
    age: "",
    phoneNumber: "",
    email: "",
    date: "",
    time: "10:00",
    duration: 30,
    type: "initial",
    status: "pending",
    interests: [],
    notes: "",
    consultant: "",
    beforeImages: false,
    previousConsultation: false,
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [newInterest, setNewInterest] = useState("");

  // 시간 옵션
  const timeOptions = [];
  for (let hour = 9; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      timeOptions.push(`${formattedHour}:${formattedMinute}`);
    }
  }

  // 공통 관심 시술 목록
  const commonInterests = [
    "안면 성형",
    "코 성형",
    "눈 성형",
    "지방 이식",
    "지방 흡입",
    "가슴 성형",
    "안티에이징",
    "보톡스",
    "필러",
    "레이저 시술",
    "피부 관리",
    "모발 이식",
    "윤곽 성형",
  ];

  useEffect(() => {
    if (consultation) {
      // 날짜와 시간 분리
      const consultationDate = new Date(consultation.date);

      // ISO 형식 날짜 문자열 생성 (YYYY-MM-DD)
      const dateString = consultationDate.toISOString().split("T")[0];

      // 시간 문자열 생성 (HH:MM)
      const hours = consultationDate.getHours().toString().padStart(2, "0");
      const minutes = consultationDate.getMinutes().toString().padStart(2, "0");
      const timeString = `${hours}:${minutes}`;

      setFormData({
        clientName: consultation.clientName || "",
        gender: consultation.gender || "여성",
        age: consultation.age || "",
        phoneNumber: consultation.phoneNumber || "",
        email: consultation.email || "",
        date: dateString,
        time: timeString,
        duration: consultation.duration || 30,
        type: consultation.type || "initial",
        status: consultation.status || "pending",
        interests: consultation.interests || [],
        notes: consultation.notes || "",
        consultant: consultation.consultant || "",
        beforeImages: consultation.beforeImages || false,
        previousConsultation: consultation.previousConsultation || false,
      });
      setIsEditing(true);
    } else {
      // 새로운 상담일 경우 기본값으로 오늘 날짜 설정
      const today = new Date().toISOString().split("T")[0];
      setFormData((prev) => ({
        ...prev,
        date: today,
      }));
    }
  }, [consultation]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // 에러 메시지 초기화
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleInterestChange = (e) => {
    setNewInterest(e.target.value);
  };

  const handleAddInterest = () => {
    if (newInterest && !formData.interests.includes(newInterest)) {
      setFormData({
        ...formData,
        interests: [...formData.interests, newInterest],
      });
      setNewInterest("");
    }
  };

  const handleRemoveInterest = (interest) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((i) => i !== interest),
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = "고객명을 입력해주세요";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "연락처를 입력해주세요";
    } else if (!/^[0-9-]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "유효한 연락처 형식이 아닙니다";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "유효한 이메일 형식이 아닙니다";
    }

    if (!formData.date) {
      newErrors.date = "상담 날짜를 선택해주세요";
    }

    if (!formData.time) {
      newErrors.time = "상담 시간을 선택해주세요";
    }

    if (!formData.consultant.trim()) {
      newErrors.consultant = "담당자를 입력해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // 날짜와 시간 결합하여 Date 객체 생성
      const [hours, minutes] = formData.time.split(":").map(Number);
      const consultationDate = new Date(formData.date);
      consultationDate.setHours(hours, minutes, 0, 0);

      // 저장할 데이터 준비
      const consultationData = {
        ...formData,
        date: consultationDate,
        age: formData.age ? Number(formData.age) : null,
        duration: Number(formData.duration),
      };

      // 개별 날짜/시간 필드는 제거 (통합된 date 필드 사용)
      delete consultationData.time;

      onSave(consultationData);
    }
  };

  // 상태에 따른 색상 및 아이콘 선택
  const getStatusInfo = (status) => {
    switch (status) {
      case "pending":
        return { color: "#f59e0b", icon: <Clock size={16} /> };
      case "scheduled":
        return { color: "#3b82f6", icon: <Calendar size={16} /> };
      case "completed":
        return { color: "#10b981", icon: <CheckCircle size={16} /> };
      case "canceled":
        return { color: "#ef4444", icon: <XCircle size={16} /> };
      default:
        return { color: "#6b7280", icon: <AlertTriangle size={16} /> };
    }
  };

  const statusInfo = getStatusInfo(formData.status);

  return (
    <div className="consultation-modal-overlay">
      <div className="consultation-modal">
        <div className="consultation-modal-header">
          <h2 className="consultation-modal-title">
            {isEditing ? "상담 정보 수정" : "새 상담 등록"}
          </h2>
          <button className="consultation-modal-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="consultation-modal-form">
          <div className="consultation-modal-content">
            <div className="form-column">
              <h3 className="form-section-title">고객 정보</h3>

              <div className="form-group">
                <label htmlFor="clientName" className="form-label">
                  고객명 <span className="required">*</span>
                </label>
                <div className="input-with-icon">
                  <User size={16} className="input-icon" />
                  <input
                    type="text"
                    id="clientName"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    className={`form-input ${errors.clientName ? "error" : ""}`}
                    placeholder="예: 김환자"
                  />
                </div>
                {errors.clientName && (
                  <div className="error-message">{errors.clientName}</div>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="gender" className="form-label">
                    성별
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="여성">여성</option>
                    <option value="남성">남성</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="age" className="form-label">
                    나이
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    min="1"
                    max="120"
                    className="form-input"
                    placeholder="예: 28"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber" className="form-label">
                  연락처 <span className="required">*</span>
                </label>
                <div className="input-with-icon">
                  <Phone size={16} className="input-icon" />
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`form-input ${
                      errors.phoneNumber ? "error" : ""
                    }`}
                    placeholder="예: 010-1234-5678"
                  />
                </div>
                {errors.phoneNumber && (
                  <div className="error-message">{errors.phoneNumber}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  이메일
                </label>
                <div className="input-with-icon">
                  <Mail size={16} className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? "error" : ""}`}
                    placeholder="예: example@email.com"
                  />
                </div>
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>

              <div className="form-divider"></div>

              <div className="form-group">
                <label htmlFor="interests" className="form-label">
                  관심 시술
                </label>
                <div className="input-with-button">
                  <select
                    id="newInterest"
                    value={newInterest}
                    onChange={handleInterestChange}
                    className="form-select"
                  >
                    <option value="">시술 선택</option>
                    {commonInterests.map((interest, index) => (
                      <option key={index} value={interest}>
                        {interest}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="add-button"
                    onClick={handleAddInterest}
                    disabled={!newInterest}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {formData.interests.length > 0 && (
                  <div className="items-list">
                    {formData.interests.map((interest, index) => (
                      <div key={index} className="list-item">
                        <div className="item-content">
                          <Scissors size={14} />
                          <span>{interest}</span>
                        </div>
                        <button
                          type="button"
                          className="remove-button"
                          onClick={() => handleRemoveInterest(interest)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-row checkbox-group">
                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="previousConsultation"
                      checked={formData.previousConsultation}
                      onChange={handleChange}
                      className="checkbox-input"
                    />
                    <MessageSquare size={16} />
                    <span>이전 상담 경험 있음</span>
                  </label>
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="beforeImages"
                      checked={formData.beforeImages}
                      onChange={handleChange}
                      className="checkbox-input"
                    />
                    <Camera size={16} />
                    <span>참고 사진 있음</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="form-column">
              <h3 className="form-section-title">상담 정보</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date" className="form-label">
                    상담 날짜 <span className="required">*</span>
                  </label>
                  <div className="input-with-icon">
                    <Calendar size={16} className="input-icon" />
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className={`form-input ${errors.date ? "error" : ""}`}
                    />
                  </div>
                  {errors.date && (
                    <div className="error-message">{errors.date}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="time" className="form-label">
                    상담 시간 <span className="required">*</span>
                  </label>
                  <div className="input-with-icon">
                    <Clock size={16} className="input-icon" />
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className={`form-select ${errors.time ? "error" : ""}`}
                    >
                      {timeOptions.map((time, index) => (
                        <option key={index} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.time && (
                    <div className="error-message">{errors.time}</div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="duration" className="form-label">
                    소요 시간 (분)
                  </label>
                  <select
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="30">30분</option>
                    <option value="45">45분</option>
                    <option value="60">60분</option>
                    <option value="90">90분</option>
                    <option value="120">120분</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="type" className="form-label">
                    상담 유형
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="initial">초기 상담</option>
                    <option value="followup">후속 상담</option>
                    <option value="online">온라인 상담</option>
                    <option value="procedure-specific">시술 상담</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="status" className="form-label">
                  상담 상태
                </label>
                <div className="status-select-container">
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-select"
                    style={{ borderColor: statusInfo.color }}
                  >
                    <option value="pending">대기중</option>
                    <option value="scheduled">예약됨</option>
                    <option value="completed">완료</option>
                    <option value="canceled">취소됨</option>
                  </select>
                  <div
                    className="status-icon"
                    style={{ color: statusInfo.color }}
                  >
                    {statusInfo.icon}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="consultant" className="form-label">
                  담당자 <span className="required">*</span>
                </label>
                <div className="input-with-icon">
                  <User size={16} className="input-icon" />
                  <input
                    type="text"
                    id="consultant"
                    name="consultant"
                    value={formData.consultant}
                    onChange={handleChange}
                    className={`form-input ${errors.consultant ? "error" : ""}`}
                    placeholder="예: 김상담"
                  />
                </div>
                {errors.consultant && (
                  <div className="error-message">{errors.consultant}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="notes" className="form-label">
                  메모
                </label>
                <div className="input-with-icon textarea-container">
                  <FileEdit size={16} className="textarea-icon" />
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="5"
                    className="form-textarea"
                    placeholder="상담 내용이나 특이사항을 입력하세요"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="consultation-modal-footer">
            <button
              type="button"
              className="consultation-modal-button secondary"
              onClick={onClose}
            >
              취소
            </button>
            <button type="submit" className="consultation-modal-button primary">
              {isEditing ? "수정 완료" : "등록 완료"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsultationModal;
