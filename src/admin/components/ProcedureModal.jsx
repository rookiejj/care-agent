import React, { useState, useEffect } from "react";
import {
  X,
  Clock,
  DollarSign,
  Camera,
  Clipboard,
  Star,
  Tag,
  Activity,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";
import "./ProcedureModal.css";

const ProcedureModal = ({ procedure, onClose, onSave, categories }) => {
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    duration: "",
    description: "",
    painLevel: 1,
    recoveryTime: "1-2일",
    isPromoted: false,
    discountRate: 0,
    hasBeforeAfterImages: false,
    imagesCount: 0,
    isActive: true,
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (procedure) {
      setFormData({
        name: procedure.name || "",
        categoryId: procedure.categoryId || "",
        price: procedure.price || "",
        duration: procedure.duration || "",
        description: procedure.description || "",
        painLevel: procedure.painLevel || 1,
        recoveryTime: procedure.recoveryTime || "1-2일",
        isPromoted: procedure.isPromoted || false,
        discountRate: procedure.discountRate || 0,
        hasBeforeAfterImages: procedure.hasBeforeAfterImages || false,
        imagesCount: procedure.imagesCount || 0,
        isActive: procedure.isActive !== undefined ? procedure.isActive : true,
      });
      setIsEditing(true);
    }
  }, [procedure]);

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

  const handlePromotionChange = (e) => {
    const isPromoted = e.target.checked;
    setFormData({
      ...formData,
      isPromoted,
      discountRate: isPromoted ? formData.discountRate || 10 : 0,
    });
  };

  const handleBeforeAfterChange = (e) => {
    const hasImages = e.target.checked;
    setFormData({
      ...formData,
      hasBeforeAfterImages: hasImages,
      imagesCount: hasImages ? formData.imagesCount || 1 : 0,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "시술명을 입력해주세요";
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "카테고리를 선택해주세요";
    }

    if (!formData.price) {
      newErrors.price = "가격을 입력해주세요";
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = "유효한 가격을 입력해주세요";
    }

    if (!formData.duration) {
      newErrors.duration = "소요시간을 입력해주세요";
    } else if (isNaN(formData.duration) || Number(formData.duration) <= 0) {
      newErrors.duration = "유효한 시간을 입력해주세요";
    }

    if (!formData.description.trim()) {
      newErrors.description = "설명을 입력해주세요";
    }

    if (
      formData.isPromoted &&
      (!formData.discountRate ||
        Number(formData.discountRate) <= 0 ||
        Number(formData.discountRate) >= 100)
    ) {
      newErrors.discountRate = "유효한 할인율(1~99%)을 입력해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // 숫자 필드 변환
      const processedData = {
        ...formData,
        price: Number(formData.price),
        duration: Number(formData.duration),
        discountRate: Number(formData.discountRate),
        painLevel: Number(formData.painLevel),
        imagesCount: Number(formData.imagesCount),
      };

      // discountedPrice 계산
      if (processedData.isPromoted) {
        processedData.discountedPrice =
          Math.round(
            (processedData.price * (1 - processedData.discountRate / 100)) /
              1000
          ) * 1000;
      } else {
        processedData.discountedPrice = processedData.price;
      }

      onSave(processedData);
    }
  };

  const findCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "카테고리 없음";
  };

  // 소요시간 형식 변환 (분 -> 시간:분)
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}시간 ${mins > 0 ? `${mins}분` : ""}`;
    }
    return `${mins}분`;
  };

  return (
    <div className="procedure-modal-overlay">
      <div className="procedure-modal">
        <div className="procedure-modal-header">
          <h2 className="procedure-modal-title">
            {isEditing ? "시술 정보 수정" : "새 시술 등록"}
          </h2>
          <button className="procedure-modal-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="procedure-modal-form">
          <div className="procedure-modal-content">
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  시술명 <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? "error" : ""}`}
                />
                {errors.name && (
                  <div className="error-message">{errors.name}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="categoryId" className="form-label">
                  카테고리 <span className="required">*</span>
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className={`form-select ${errors.categoryId ? "error" : ""}`}
                >
                  <option value="">카테고리 선택</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <div className="error-message">{errors.categoryId}</div>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price" className="form-label">
                    가격 (원) <span className="required">*</span>
                  </label>
                  <div className="input-with-icon">
                    <DollarSign size={16} className="input-icon" />
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      className={`form-input ${errors.price ? "error" : ""}`}
                    />
                  </div>
                  {errors.price && (
                    <div className="error-message">{errors.price}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="duration" className="form-label">
                    소요시간 (분) <span className="required">*</span>
                  </label>
                  <div className="input-with-icon">
                    <Clock size={16} className="input-icon" />
                    <input
                      type="number"
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      min="1"
                      className={`form-input ${errors.duration ? "error" : ""}`}
                    />
                  </div>
                  {errors.duration && (
                    <div className="error-message">{errors.duration}</div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  시술 설명 <span className="required">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className={`form-textarea ${
                    errors.description ? "error" : ""
                  }`}
                ></textarea>
                {errors.description && (
                  <div className="error-message">{errors.description}</div>
                )}
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label className="form-label">통증 정도</label>
                <div className="pain-level-selector">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <label
                      key={level}
                      className={`pain-level-option ${
                        Number(formData.painLevel) >= level ? "active" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="painLevel"
                        value={level}
                        checked={Number(formData.painLevel) === level}
                        onChange={handleChange}
                        className="visually-hidden"
                      />
                      <Activity size={16} />
                    </label>
                  ))}
                </div>
                <div className="pain-level-labels">
                  <span>매우 낮음</span>
                  <span>매우 높음</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="recoveryTime" className="form-label">
                  회복 기간
                </label>
                <select
                  id="recoveryTime"
                  name="recoveryTime"
                  value={formData.recoveryTime}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="1-2일">1-2일</option>
                  <option value="3-5일">3-5일</option>
                  <option value="1주">1주</option>
                  <option value="2주">2주</option>
                  <option value="1개월">1개월</option>
                  <option value="2개월 이상">2개월 이상</option>
                </select>
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isPromoted"
                    checked={formData.isPromoted}
                    onChange={handlePromotionChange}
                    className="checkbox-input"
                  />
                  <Tag size={16} />
                  <span>프로모션 적용</span>
                </label>

                {formData.isPromoted && (
                  <div className="form-group nested-group">
                    <label htmlFor="discountRate" className="form-label">
                      할인율 (%)
                    </label>
                    <input
                      type="number"
                      id="discountRate"
                      name="discountRate"
                      value={formData.discountRate}
                      onChange={handleChange}
                      min="1"
                      max="99"
                      className={`form-input ${
                        errors.discountRate ? "error" : ""
                      }`}
                    />
                    {errors.discountRate && (
                      <div className="error-message">{errors.discountRate}</div>
                    )}
                  </div>
                )}
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="hasBeforeAfterImages"
                    checked={formData.hasBeforeAfterImages}
                    onChange={handleBeforeAfterChange}
                    className="checkbox-input"
                  />
                  <Camera size={16} />
                  <span>전후사진 있음</span>
                </label>

                {formData.hasBeforeAfterImages && (
                  <div className="form-group nested-group">
                    <label htmlFor="imagesCount" className="form-label">
                      이미지 개수
                    </label>
                    <input
                      type="number"
                      id="imagesCount"
                      name="imagesCount"
                      value={formData.imagesCount}
                      onChange={handleChange}
                      min="1"
                      className="form-input"
                    />
                  </div>
                )}
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="checkbox-input"
                  />
                  {formData.isActive ? (
                    <>
                      <CheckCircle size={16} className="text-success" />
                      <span>활성화됨</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={16} className="text-danger" />
                      <span>비활성화됨</span>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>

          <div className="procedure-modal-preview">
            <h3>시술 정보 미리보기</h3>
            <div className="preview-content">
              <div className="preview-item">
                <span className="preview-label">시술명:</span>
                <span className="preview-value">
                  {formData.name || "미입력"}
                </span>
              </div>
              <div className="preview-item">
                <span className="preview-label">카테고리:</span>
                <span className="preview-value">
                  {formData.categoryId
                    ? findCategoryName(formData.categoryId)
                    : "미선택"}
                </span>
              </div>
              <div className="preview-item">
                <span className="preview-label">가격:</span>
                <span className="preview-value">
                  {formData.price
                    ? new Intl.NumberFormat("ko-KR").format(formData.price) +
                      "원"
                    : "미입력"}
                  {formData.isPromoted && formData.discountRate > 0 && (
                    <span className="discount-badge">
                      {formData.discountRate}% 할인
                    </span>
                  )}
                </span>
              </div>
              <div className="preview-item">
                <span className="preview-label">소요시간:</span>
                <span className="preview-value">
                  {formData.duration
                    ? formatDuration(formData.duration)
                    : "미입력"}
                </span>
              </div>
              <div className="preview-item">
                <span className="preview-label">상태:</span>
                <span
                  className={`status-badge ${
                    formData.isActive ? "active" : "inactive"
                  }`}
                >
                  {formData.isActive ? "활성" : "비활성"}
                </span>
              </div>
            </div>
          </div>

          <div className="procedure-modal-footer">
            <button
              type="button"
              className="procedure-modal-button secondary"
              onClick={onClose}
            >
              취소
            </button>
            <button type="submit" className="procedure-modal-button primary">
              {isEditing ? "수정 완료" : "등록 완료"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProcedureModal;
