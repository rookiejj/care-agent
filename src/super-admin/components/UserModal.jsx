import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  Trash2,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  AlertTriangle,
} from "lucide-react";
import "./UserModal.css";

const UserModal = ({ user, onClose, onSave, regions = [] }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    userType: "patient",
    gender: "male",
    birthDate: "",
    region: "",
    address: "",
    status: "active",
    marketingConsent: false,
  });

  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("basic");

  useEffect(() => {
    if (user) {
      // 기존 사용자 데이터로 폼 초기화
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        userType: user.userType || "patient",
        gender: user.gender || "male",
        birthDate: user.birthDate ? user.birthDate.split("T")[0] : "",
        region: user.region || "",
        address: user.address || "",
        status: user.status || "active",
        marketingConsent: user.marketingConsent || false,
      });
    } else if (regions.length > 0) {
      // 새 사용자 등록 시 첫 번째 지역을 기본값으로 설정
      setFormData((prev) => ({
        ...prev,
        region: regions[0],
      }));
    }
  }, [user, regions]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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

    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "전화번호를 입력해주세요";
    } else if (!/^\d{3}-\d{3,4}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = "올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)";
    }

    if (!formData.userType) {
      newErrors.userType = "사용자 유형을 선택해주세요";
    }

    if (!formData.gender) {
      newErrors.gender = "성별을 선택해주세요";
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "생년월일을 입력해주세요";
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 0 || age > 120) {
        newErrors.birthDate = "올바른 생년월일을 입력해주세요";
      }
    }

    if (!formData.region) {
      newErrors.region = "지역을 선택해주세요";
    }

    if (!formData.address.trim()) {
      newErrors.address = "주소를 입력해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // 사용자 데이터 준비
      const userData = {
        ...formData,
        birthDate: new Date(formData.birthDate).toISOString(),
      };

      onSave(userData);
    }
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return "";
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="super-admin-user-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="super-admin-user-modal-header">
          <h2>{user ? "사용자 정보 수정" : "새 사용자 등록"}</h2>
          <button className="modal-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="super-admin-user-modal-tabs">
          <button
            className={`super-admin-user-modal-tab ${
              activeTab === "basic" ? "active" : ""
            }`}
            onClick={() => setActiveTab("basic")}
          >
            기본 정보
          </button>
          <button
            className={`super-admin-user-modal-tab ${
              activeTab === "contact" ? "active" : ""
            }`}
            onClick={() => setActiveTab("contact")}
          >
            연락처 및 주소
          </button>
          <button
            className={`super-admin-user-modal-tab ${
              activeTab === "settings" ? "active" : ""
            }`}
            onClick={() => setActiveTab("settings")}
          >
            계정 설정
          </button>
        </div>

        <form onSubmit={handleSubmit} className="super-admin-user-modal-form">
          {activeTab === "basic" && (
            <div className="super-admin-user-modal-basic-info">
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
                    placeholder="홍길동"
                  />
                  {errors.name && (
                    <div className="error-message">{errors.name}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="userType">
                    사용자 유형 <span className="required">*</span>
                  </label>
                  <select
                    id="userType"
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    className={
                      errors.userType ? "form-input error" : "form-input"
                    }
                  >
                    <option value="patient">환자</option>
                    <option value="admin">관리자</option>
                    <option value="doctor">의료진</option>
                  </select>
                  {errors.userType && (
                    <div className="error-message">{errors.userType}</div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="gender">
                    성별 <span className="required">*</span>
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={
                      errors.gender ? "form-input error" : "form-input"
                    }
                  >
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                  </select>
                  {errors.gender && (
                    <div className="error-message">{errors.gender}</div>
                  )}
                </div>

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
                  {formData.birthDate && (
                    <div className="age-display">
                      나이: {calculateAge(formData.birthDate)}세
                    </div>
                  )}
                  {errors.birthDate && (
                    <div className="error-message">{errors.birthDate}</div>
                  )}
                </div>
              </div>

              {user && (
                <div className="form-group">
                  <label htmlFor="status">계정 상태</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="active">활성</option>
                    <option value="inactive">비활성</option>
                    <option value="suspended">정지</option>
                    <option value="blocked">차단</option>
                  </select>
                  <div className="form-help">
                    {formData.status === "active" &&
                      "사용자가 모든 기능을 사용할 수 있습니다."}
                    {formData.status === "inactive" &&
                      "사용자가 로그인하지 않은 상태입니다."}
                    {formData.status === "suspended" &&
                      "사용자 계정이 일시적으로 정지되었습니다."}
                    {formData.status === "blocked" &&
                      "사용자 계정이 영구적으로 차단되었습니다."}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "contact" && (
            <div className="super-admin-user-modal-contact-info">
              <div className="form-group">
                <label htmlFor="email">
                  이메일 <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "form-input error" : "form-input"}
                  placeholder="example@email.com"
                />
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  전화번호 <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? "form-input error" : "form-input"}
                  placeholder="010-1234-5678"
                />
                {errors.phone && (
                  <div className="error-message">{errors.phone}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="region">
                  지역 <span className="required">*</span>
                </label>
                <select
                  id="region"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className={errors.region ? "form-input error" : "form-input"}
                >
                  <option value="">선택</option>
                  {regions.map((region, index) => (
                    <option key={index} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                {errors.region && (
                  <div className="error-message">{errors.region}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="address">
                  상세 주소 <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={errors.address ? "form-input error" : "form-input"}
                  placeholder="예: 중구 명동길 123번지 456호"
                />
                {errors.address && (
                  <div className="error-message">{errors.address}</div>
                )}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="super-admin-user-modal-settings-info">
              <div className="form-group">
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="marketingConsent"
                    name="marketingConsent"
                    checked={formData.marketingConsent}
                    onChange={handleChange}
                    className="form-checkbox"
                  />
                  <label htmlFor="marketingConsent" className="checkbox-label">
                    마케팅 정보 수신 동의
                  </label>
                </div>
                <div className="form-help">
                  이벤트, 프로모션, 신규 서비스 등의 마케팅 정보를 이메일 및
                  SMS로 받을 수 있습니다.
                </div>
              </div>

              {user && (
                <>
                  <div className="settings-info-section">
                    <h4 className="settings-section-title">
                      <Shield size={16} />
                      보안 정보
                    </h4>
                    <div className="settings-info-grid">
                      <div className="settings-info-item">
                        <div className="settings-info-label">사용자 ID</div>
                        <div className="settings-info-value">{user.userId}</div>
                      </div>
                      <div className="settings-info-item">
                        <div className="settings-info-label">가입일</div>
                        <div className="settings-info-value">
                          {new Date(user.registrationDate).toLocaleDateString(
                            "ko-KR"
                          )}
                        </div>
                      </div>
                      <div className="settings-info-item">
                        <div className="settings-info-label">마지막 로그인</div>
                        <div className="settings-info-value">
                          {user.lastLoginDate
                            ? new Date(user.lastLoginDate).toLocaleString(
                                "ko-KR"
                              )
                            : "로그인 이력 없음"}
                        </div>
                      </div>
                      <div className="settings-info-item">
                        <div className="settings-info-label">활동 수준</div>
                        <div className="settings-info-value">
                          <span
                            className={`activity-level-badge ${user.activityLevel}`}
                          >
                            {user.activityLevel === "high"
                              ? "높음"
                              : user.activityLevel === "medium"
                              ? "보통"
                              : user.activityLevel === "low"
                              ? "낮음"
                              : "신규"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="settings-info-section">
                    <h4 className="settings-section-title">
                      <AlertTriangle size={16} />
                      위험 작업
                    </h4>
                    <div className="danger-actions">
                      <button
                        type="button"
                        className="danger-action-button"
                        onClick={() => {
                          if (
                            window.confirm(
                              "정말로 이 사용자의 모든 데이터를 초기화하시겠습니까?"
                            )
                          ) {
                            // 데이터 초기화 로직
                            alert("사용자 데이터가 초기화되었습니다.");
                          }
                        }}
                      >
                        <Trash2 size={16} />
                        사용자 데이터 초기화
                      </button>
                      <div className="danger-action-description">
                        사용자의 예약 기록, 리뷰, 결제 내역 등 모든 활동
                        데이터를 삭제합니다. 이 작업은 되돌릴 수 없습니다.
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          <div className="super-admin-user-modal-footer">
            <div className="action-buttons">
              <button
                type="button"
                className="super-admin-user-modal-cancel-button"
                onClick={onClose}
              >
                취소
              </button>
              <button type="submit" className="save-button">
                <Save size={16} />
                <span>{user ? "저장" : "등록"}</span>{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
