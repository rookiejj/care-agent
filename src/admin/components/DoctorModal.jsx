import React, { useState, useEffect } from "react";
import { X, Save, Trash2, Plus, Minus } from "lucide-react";
import "./DoctorModal.css";

const DoctorModal = ({ doctor, onClose, onSave, departments = [] }) => {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    gender: "남성",
    phoneNumber: "",
    email: "",
    experienceYears: "",
    specialties: [],
    schedule: {
      monday: "09:00 - 18:00",
      tuesday: "09:00 - 18:00",
      wednesday: "09:00 - 18:00",
      thursday: "09:00 - 18:00",
      friday: "09:00 - 18:00",
      saturday: "09:00 - 13:00",
      sunday: "휴진",
    },
    status: "active",
  });

  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("basic");
  const [newSpecialty, setNewSpecialty] = useState("");

  // 전문 분야 목록
  const specialtiesList = [
    "일반",
    "소화기",
    "순환기",
    "호흡기",
    "감염",
    "내분비",
    "류마티스",
    "신장",
    "혈액",
    "종양",
    "척추",
    "관절",
    "스포츠 의학",
    "재활",
    "통증 의학",
    "알레르기",
    "여드름",
    "아토피",
    "건선",
    "모발",
    "소아과학",
    "신생아",
    "발달",
    "청소년",
  ];

  useEffect(() => {
    if (doctor) {
      // 기존 의사 데이터로 폼 초기화
      setFormData({
        name: doctor.name || "",
        department: doctor.department || "",
        gender: doctor.gender || "남성",
        phoneNumber: doctor.phoneNumber || "",
        email: doctor.email || "",
        experienceYears: doctor.experienceYears || "",
        specialties: doctor.specialties || [],
        schedule: doctor.schedule || {
          monday: "09:00 - 18:00",
          tuesday: "09:00 - 18:00",
          wednesday: "09:00 - 18:00",
          thursday: "09:00 - 18:00",
          friday: "09:00 - 18:00",
          saturday: "09:00 - 13:00",
          sunday: "휴진",
        },
        status: doctor.status || "active",
      });
    } else if (departments.length > 0) {
      // 새 의사 등록 시 첫 번째 진료과를 기본값으로 설정
      setFormData((prev) => ({
        ...prev,
        department: departments[0],
      }));
    }
  }, [doctor, departments]);

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

  const handleScheduleChange = (day, value) => {
    setFormData({
      ...formData,
      schedule: {
        ...formData.schedule,
        [day]: value,
      },
    });
  };

  const handleAddSpecialty = () => {
    if (newSpecialty && !formData.specialties.includes(newSpecialty)) {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, newSpecialty],
      });
      setNewSpecialty("");
    }
  };

  const handleRemoveSpecialty = (specialty) => {
    setFormData({
      ...formData,
      specialties: formData.specialties.filter((item) => item !== specialty),
    });
  };

  const handleSpecialtySelect = (specialty) => {
    if (!formData.specialties.includes(specialty)) {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, specialty],
      });
    } else {
      handleRemoveSpecialty(specialty);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // 필수 입력 필드 검증
    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요";
    }

    if (!formData.department) {
      newErrors.department = "진료과를 선택해주세요";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "전화번호를 입력해주세요";
    } else if (!/^\d{3}-\d{3,4}-\d{4}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)";
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다";
    }

    if (formData.experienceYears && isNaN(formData.experienceYears)) {
      newErrors.experienceYears = "숫자만 입력해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // 의사 데이터 준비
      const doctorData = {
        ...formData,
        experienceYears: formData.experienceYears
          ? parseInt(formData.experienceYears)
          : 0,
      };

      onSave(doctorData);
    }
  };

  const getDayLabel = (day) => {
    const dayLabels = {
      monday: "월요일",
      tuesday: "화요일",
      wednesday: "수요일",
      thursday: "목요일",
      friday: "금요일",
      saturday: "토요일",
      sunday: "일요일",
    };
    return dayLabels[day] || day;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="doctor-modal" onClick={(e) => e.stopPropagation()}>
        <div className="doctor-modal-header">
          <h2>{doctor ? "의사 정보 수정" : "새 의사 등록"}</h2>
          <button className="modal-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="doctor-modal-tabs">
          <button
            className={`doctor-modal-tab ${
              activeTab === "basic" ? "active" : ""
            }`}
            onClick={() => setActiveTab("basic")}
          >
            기본 정보
          </button>
          <button
            className={`doctor-modal-tab ${
              activeTab === "specialty" ? "active" : ""
            }`}
            onClick={() => setActiveTab("specialty")}
          >
            전문 분야
          </button>
          <button
            className={`doctor-modal-tab ${
              activeTab === "schedule" ? "active" : ""
            }`}
            onClick={() => setActiveTab("schedule")}
          >
            진료 일정
          </button>
        </div>

        <form onSubmit={handleSubmit} className="doctor-modal-form">
          {activeTab === "basic" && (
            <div className="doctor-modal-basic-info">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    이름 <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "form-input error" : "form-input"}
                  />
                  {errors.name && (
                    <div className="error-message">{errors.name}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="gender">성별</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="남성">남성</option>
                    <option value="여성">여성</option>
                  </select>
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
                  <label htmlFor="experienceYears">경력 (년)</label>
                  <input
                    type="text"
                    id="experienceYears"
                    name="experienceYears"
                    value={formData.experienceYears}
                    onChange={handleChange}
                    className={
                      errors.experienceYears ? "form-input error" : "form-input"
                    }
                    placeholder="경력 연수를 입력하세요"
                  />
                  {errors.experienceYears && (
                    <div className="error-message">
                      {errors.experienceYears}
                    </div>
                  )}
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

              <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="doctor@example.com"
                  className={errors.email ? "form-input error" : "form-input"}
                />
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>

              {doctor && (
                <div className="form-group">
                  <label htmlFor="status">상태</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="active">근무중</option>
                    <option value="vacation">휴가</option>
                    <option value="leave">휴직</option>
                    <option value="inactive">비활성</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {activeTab === "specialty" && (
            <div className="doctor-modal-specialty-info">
              <div className="form-group">
                <label>현재 전문 분야</label>
                <div className="selected-specialties">
                  {formData.specialties.length > 0 ? (
                    formData.specialties.map((specialty, index) => (
                      <div key={index} className="specialty-chip">
                        {specialty}
                        <button
                          type="button"
                          className="remove-specialty"
                          onClick={() => handleRemoveSpecialty(specialty)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="no-specialties">
                      선택된 전문 분야가 없습니다
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>전문 분야 추가</label>
                <div className="add-specialty-container">
                  <input
                    type="text"
                    className="form-input"
                    value={newSpecialty}
                    onChange={(e) => setNewSpecialty(e.target.value)}
                    placeholder="직접 입력"
                  />
                  <button
                    type="button"
                    className="add-specialty-button"
                    onClick={handleAddSpecialty}
                    disabled={!newSpecialty.trim()}
                  >
                    <Plus size={16} />
                    추가
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>일반 전문 분야</label>
                <div className="specialty-options">
                  {specialtiesList.map((specialty, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`specialty-option ${
                        formData.specialties.includes(specialty)
                          ? "selected"
                          : ""
                      }`}
                      onClick={() => handleSpecialtySelect(specialty)}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "schedule" && (
            <div className="doctor-modal-schedule-info">
              <div className="schedule-title">진료 일정</div>
              <p className="schedule-description">
                의사별 진료 가능 시간을 설정합니다. 휴진일의 경우 '휴진'으로
                입력하세요.
              </p>

              <div className="schedule-days">
                {Object.keys(formData.schedule).map((day) => (
                  <div key={day} className="schedule-day">
                    <div className="day-label">{getDayLabel(day)}</div>
                    <input
                      type="text"
                      className="form-input schedule-input"
                      value={formData.schedule[day]}
                      onChange={(e) =>
                        handleScheduleChange(day, e.target.value)
                      }
                      placeholder="09:00 - 18:00"
                    />
                  </div>
                ))}
              </div>

              <div className="schedule-presets">
                <div className="schedule-presets-title">빠른 설정</div>
                <div className="schedule-preset-buttons">
                  <button
                    type="button"
                    className="schedule-preset-button"
                    onClick={() => {
                      const weekdaySchedule = "09:00 - 18:00";
                      const saturdaySchedule = "09:00 - 13:00";
                      setFormData({
                        ...formData,
                        schedule: {
                          monday: weekdaySchedule,
                          tuesday: weekdaySchedule,
                          wednesday: weekdaySchedule,
                          thursday: weekdaySchedule,
                          friday: weekdaySchedule,
                          saturday: saturdaySchedule,
                          sunday: "휴진",
                        },
                      });
                    }}
                  >
                    일반 진료 시간
                  </button>
                  <button
                    type="button"
                    className="schedule-preset-button"
                    onClick={() => {
                      const weekdaySchedule = "09:00 - 18:00";
                      setFormData({
                        ...formData,
                        schedule: {
                          monday: weekdaySchedule,
                          tuesday: weekdaySchedule,
                          wednesday: weekdaySchedule,
                          thursday: weekdaySchedule,
                          friday: weekdaySchedule,
                          saturday: "휴진",
                          sunday: "휴진",
                        },
                      });
                    }}
                  >
                    평일만
                  </button>
                  <button
                    type="button"
                    className="schedule-preset-button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        schedule: {
                          monday: "휴진",
                          tuesday: "휴진",
                          wednesday: "휴진",
                          thursday: "휴진",
                          friday: "휴진",
                          saturday: "휴진",
                          sunday: "휴진",
                        },
                      });
                    }}
                  >
                    모두 휴진
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="doctor-modal-footer">
            {doctor && (
              <button type="button" className="delete-button">
                <Trash2 size={16} />
                삭제
              </button>
            )}
            <div className="action-buttons">
              <button
                type="button"
                className="doctor-modal-cancel-button"
                onClick={onClose}
              >
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

export default DoctorModal;
