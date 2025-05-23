import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  Trash2,
  Plus,
  Minus,
  Building,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Tag,
  AlertTriangle,
} from "lucide-react";
import "./HospitalModal.css";

const HospitalModal = ({
  hospital,
  onClose,
  onSave,
  hospitalTypes = [],
  regions = [],
}) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    region: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    categories: [],
    description: "",
    operatingHours: {
      monday: "09:00 - 18:00",
      tuesday: "09:00 - 18:00",
      wednesday: "09:00 - 18:00",
      thursday: "09:00 - 18:00",
      friday: "09:00 - 18:00",
      saturday: "09:00 - 13:00",
      sunday: "휴진",
    },
    status: "pending",
  });

  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("basic");
  const [newCategory, setNewCategory] = useState("");

  // 카테고리 목록
  const categoriesList = [
    "내과",
    "외과",
    "정형외과",
    "신경외과",
    "소아과",
    "산부인과",
    "안과",
    "이비인후과",
    "피부과",
    "비뇨기과",
    "재활의학과",
    "성형외과",
    "미용성형",
    "치과",
    "통증의학과",
    "한의원",
  ];

  useEffect(() => {
    if (hospital) {
      // 기존 병원 데이터로 폼 초기화
      setFormData({
        name: hospital.name || "",
        type: hospital.type || "",
        region: hospital.region || "",
        address: hospital.address || "",
        phone: hospital.phone || "",
        email: hospital.email || "",
        website: hospital.website || "",
        categories: hospital.categories || [],
        description: hospital.description || "",
        operatingHours: hospital.operatingHours || {
          monday: "09:00 - 18:00",
          tuesday: "09:00 - 18:00",
          wednesday: "09:00 - 18:00",
          thursday: "09:00 - 18:00",
          friday: "09:00 - 18:00",
          saturday: "09:00 - 13:00",
          sunday: "휴진",
        },
        status: hospital.status || "pending",
      });
    } else if (hospitalTypes.length > 0 && regions.length > 0) {
      // 새 병원 등록 시 첫 번째 유형과 지역을 기본값으로 설정
      setFormData((prev) => ({
        ...prev,
        type: hospitalTypes[0],
        region: regions[0],
      }));
    }
  }, [hospital, hospitalTypes, regions]);

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

  const handleOperatingHoursChange = (day, value) => {
    setFormData({
      ...formData,
      operatingHours: {
        ...formData.operatingHours,
        [day]: value,
      },
    });
  };

  const handleAddCategory = () => {
    if (newCategory && !formData.categories.includes(newCategory)) {
      setFormData({
        ...formData,
        categories: [...formData.categories, newCategory],
      });
      setNewCategory("");
    }
  };

  const handleRemoveCategory = (category) => {
    setFormData({
      ...formData,
      categories: formData.categories.filter((item) => item !== category),
    });
  };

  const handleCategorySelect = (category) => {
    if (!formData.categories.includes(category)) {
      setFormData({
        ...formData,
        categories: [...formData.categories, category],
      });
    } else {
      handleRemoveCategory(category);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // 필수 입력 필드 검증
    if (!formData.name.trim()) {
      newErrors.name = "병원명을 입력해주세요";
    }

    if (!formData.type) {
      newErrors.type = "병원 유형을 선택해주세요";
    }

    if (!formData.region) {
      newErrors.region = "지역을 선택해주세요";
    }

    if (!formData.address.trim()) {
      newErrors.address = "주소를 입력해주세요";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "전화번호를 입력해주세요";
    } else if (!/^\d{2,3}-\d{3,4}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = "올바른 전화번호 형식이 아닙니다 (예: 02-1234-5678)";
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다";
    }

    if (formData.website && !/^https?:\/\/\S+\.\S+/.test(formData.website)) {
      newErrors.website = "올바른 웹사이트 URL 형식이 아닙니다";
    }

    if (formData.categories.length === 0) {
      newErrors.categories = "최소 하나의 카테고리를 선택해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSave(formData);
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
      <div className="hospital-modal" onClick={(e) => e.stopPropagation()}>
        <div className="hospital-modal-header">
          <h2>{hospital ? "병원 정보 수정" : "새 병원 등록"}</h2>
          <button className="modal-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="hospital-modal-tabs">
          <button
            className={`hospital-modal-tab ${
              activeTab === "basic" ? "active" : ""
            }`}
            onClick={() => setActiveTab("basic")}
          >
            기본 정보
          </button>
          <button
            className={`hospital-modal-tab ${
              activeTab === "categories" ? "active" : ""
            }`}
            onClick={() => setActiveTab("categories")}
          >
            진료 카테고리
          </button>
          <button
            className={`hospital-modal-tab ${
              activeTab === "hours" ? "active" : ""
            }`}
            onClick={() => setActiveTab("hours")}
          >
            운영 시간
          </button>
          <button
            className={`hospital-modal-tab ${
              activeTab === "description" ? "active" : ""
            }`}
            onClick={() => setActiveTab("description")}
          >
            상세 설명
          </button>
        </div>

        <form onSubmit={handleSubmit} className="hospital-modal-form">
          {activeTab === "basic" && (
            <div className="hospital-modal-basic-info">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    병원명 <span className="required">*</span>
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
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="type">
                    병원 유형 <span className="required">*</span>
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={errors.type ? "form-input error" : "form-input"}
                  >
                    <option value="">선택</option>
                    {hospitalTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.type && (
                    <div className="error-message">{errors.type}</div>
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
                    className={
                      errors.region ? "form-input error" : "form-input"
                    }
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
              </div>

              <div className="form-group">
                <label htmlFor="address">
                  주소 <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={errors.address ? "form-input error" : "form-input"}
                  placeholder="예: 서울시 강남구 테헤란로 123"
                />
                {errors.address && (
                  <div className="error-message">{errors.address}</div>
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
                  placeholder="예: 02-1234-5678"
                />
                {errors.phone && (
                  <div className="error-message">{errors.phone}</div>
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
                  className={errors.email ? "form-input error" : "form-input"}
                  placeholder="예: hospital@example.com"
                />
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="website">웹사이트</label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className={errors.website ? "form-input error" : "form-input"}
                  placeholder="예: https://example.com"
                />
                {errors.website && (
                  <div className="error-message">{errors.website}</div>
                )}
              </div>

              {hospital && (
                <div className="form-group">
                  <label htmlFor="status">상태</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="active">활성</option>
                    <option value="pending">승인 대기</option>
                    <option value="suspended">일시 중지</option>
                    <option value="inactive">비활성</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {activeTab === "categories" && (
            <div className="hospital-modal-category-info">
              <div className="form-group">
                <label>
                  진료 카테고리 <span className="required">*</span>
                </label>
                {errors.categories && (
                  <div className="error-message">{errors.categories}</div>
                )}
                <div className="selected-categories">
                  {formData.categories.length > 0 ? (
                    formData.categories.map((category, index) => (
                      <div key={index} className="category-chip">
                        {category}
                        <button
                          type="button"
                          className="remove-category"
                          onClick={() => handleRemoveCategory(category)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="no-categories">
                      선택된 카테고리가 없습니다
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>카테고리 추가</label>
                <div className="add-category-container">
                  <input
                    type="text"
                    className="form-input"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="직접 입력"
                  />
                  <button
                    type="button"
                    className="add-category-button"
                    onClick={handleAddCategory}
                    disabled={!newCategory.trim()}
                  >
                    <Plus size={16} />
                    추가
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>일반 카테고리</label>
                <div className="category-options">
                  {categoriesList.map((category, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`category-option ${
                        formData.categories.includes(category) ? "selected" : ""
                      }`}
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "hours" && (
            <div className="hospital-modal-hours-info">
              <div className="operating-hours-title">운영 시간</div>
              <p className="operating-hours-description">
                병원 운영 시간을 설정합니다. 휴진일의 경우 '휴진'으로
                입력하세요.
              </p>

              <div className="operating-hours-container">
                {Object.keys(formData.operatingHours).map((day) => (
                  <div key={day} className="operating-hour-item">
                    <div className="day-label">{getDayLabel(day)}</div>
                    <input
                      type="text"
                      className="form-input hours-input"
                      value={formData.operatingHours[day]}
                      onChange={(e) =>
                        handleOperatingHoursChange(day, e.target.value)
                      }
                      placeholder="09:00 - 18:00"
                    />
                  </div>
                ))}
              </div>

              <div className="hours-presets">
                <div className="hours-presets-title">빠른 설정</div>
                <div className="hours-preset-buttons">
                  <button
                    type="button"
                    className="hours-preset-button"
                    onClick={() => {
                      const weekdaySchedule = "09:00 - 18:00";
                      const saturdaySchedule = "09:00 - 13:00";
                      setFormData({
                        ...formData,
                        operatingHours: {
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
                    className="hours-preset-button"
                    onClick={() => {
                      const weekdaySchedule = "09:00 - 18:00";
                      setFormData({
                        ...formData,
                        operatingHours: {
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
                    className="hours-preset-button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        operatingHours: {
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

          {activeTab === "description" && (
            <div className="hospital-modal-description-info">
              <div className="form-group">
                <label htmlFor="description">병원 상세 설명</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-input description-textarea"
                  placeholder="병원 소개, 특화 서비스, 진료 안내 등 상세 정보를 입력하세요."
                  rows={10}
                />
              </div>
            </div>
          )}

          <div className="hospital-modal-footer">
            <div className="footer-actions">
              <button type="button" className="cancel-button" onClick={onClose}>
                취소
              </button>
              <button type="submit" className="save-button">
                <Save size={16} />
                <span>{hospital ? "저장" : "등록"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HospitalModal;
