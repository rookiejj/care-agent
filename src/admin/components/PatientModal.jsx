import React, { useState, useEffect } from "react";
import { X, Save, Trash2 } from "lucide-react";
import "./PatientModal.css";

const PatientModal = ({ patient, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "남성",
    birthDate: "",
    phoneNumber: "",
    email: "",
    address: "",
    bloodType: "",
    insuranceType: "국민건강보험",
    medicalHistory: "",
  });

  const [activeTab, setActiveTab] = useState("basic");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (patient) {
      // 기존 환자 데이터로 폼 초기화
      const birthDateFormatted =
        patient.birthDate instanceof Date
          ? formatDateForInput(patient.birthDate)
          : "";

      setFormData({
        name: patient.name || "",
        gender: patient.gender || "남성",
        birthDate: birthDateFormatted,
        phoneNumber: patient.phoneNumber || "",
        email: patient.email || "",
        address: patient.address || "",
        bloodType: patient.bloodType || "",
        insuranceType: patient.insuranceType || "국민건강보험",
        medicalHistory: patient.medicalHistory || "",
      });
    }
  }, [patient]);

  const formatDateForInput = (date) => {
    if (!date || !(date instanceof Date)) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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
    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요";
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "생년월일을 입력해주세요";
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // 생년월일을 Date 객체로 변환
      const birthDate = formData.birthDate
        ? new Date(formData.birthDate)
        : null;

      // 환자 데이터 준비
      const patientData = {
        ...formData,
        birthDate,
        age: birthDate ? new Date().getFullYear() - birthDate.getFullYear() : 0,
      };

      onSave(patientData);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="patient-modal" onClick={(e) => e.stopPropagation()}>
        <div className="patient-modal-header">
          <h2>{patient ? "환자 정보 수정" : "새 환자 등록"}</h2>
          <button className="modal-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="patient-modal-tabs">
          <button
            className={`patient-modal-tab ${
              activeTab === "basic" ? "active" : ""
            }`}
            onClick={() => setActiveTab("basic")}
          >
            기본 정보
          </button>
          <button
            className={`patient-modal-tab ${
              activeTab === "medical" ? "active" : ""
            }`}
            onClick={() => setActiveTab("medical")}
          >
            의료 정보
          </button>
        </div>

        <form onSubmit={handleSubmit} className="patient-modal-form">
          {activeTab === "basic" && (
            <div className="patient-modal-basic-info">
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
                  <label htmlFor="birthDate">
                    생년월일 <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className={
                      errors.birthDate ? "form-input error" : "form-input"
                    }
                  />
                  {errors.birthDate && (
                    <div className="error-message">{errors.birthDate}</div>
                  )}
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
                    placeholder="010-1234-5678"
                    className={
                      errors.phoneNumber ? "form-input error" : "form-input"
                    }
                  />
                  {errors.phoneNumber && (
                    <div className="error-message">{errors.phoneNumber}</div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className={errors.email ? "form-input error" : "form-input"}
                />
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="address">주소</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>
          )}

          {activeTab === "medical" && (
            <div className="patient-modal-medical-info">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bloodType">혈액형</label>
                  <select
                    id="bloodType"
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">선택</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="insuranceType">보험 유형</label>
                  <select
                    id="insuranceType"
                    name="insuranceType"
                    value={formData.insuranceType}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="국민건강보험">국민건강보험</option>
                    <option value="의료급여">의료급여</option>
                    <option value="자동차보험">자동차보험</option>
                    <option value="산재보험">산재보험</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="medicalHistory">특이사항/과거 병력</label>
                <textarea
                  id="medicalHistory"
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  rows={5}
                  className="form-input"
                  placeholder="알레르기, 현재 복용 중인 약물, 만성 질환 등"
                ></textarea>
              </div>
            </div>
          )}

          <div className="patient-modal-footer">
            {patient && (
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

export default PatientModal;
