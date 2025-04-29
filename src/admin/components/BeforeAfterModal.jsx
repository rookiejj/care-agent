import React, { useState, useEffect } from "react";
import {
  X,
  Camera,
  Upload,
  Eye,
  EyeOff,
  User,
  FileImage,
  Calendar,
  Info,
  Tag,
  Scissors,
  ArrowLeft,
  ArrowRight,
  Star,
} from "lucide-react";
import "./BeforeAfterModal.css";

const BeforeAfterModal = ({ gallery, onClose, onSave, categories }) => {
  const [formData, setFormData] = useState({
    title: "",
    procedureCategory: "",
    procedure: "",
    patientName: "",
    patientAge: "",
    patientGender: "여성",
    description: "",
    imageCount: 2,
    images: [],
    isPublic: true,
    tags: [],
    doctor: "",
    featuredOrder: null,
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (gallery) {
      setFormData({
        title: gallery.title || "",
        procedureCategory: gallery.procedureCategory || "",
        procedure: gallery.procedure || "",
        patientName: gallery.patientName || "",
        patientAge: gallery.patientAge || "",
        patientGender: gallery.patientGender || "여성",
        description: gallery.description || "",
        imageCount: gallery.imageCount || 2,
        images: gallery.images || [],
        isPublic: gallery.isPublic !== undefined ? gallery.isPublic : true,
        tags: gallery.tags || [],
        doctor: gallery.doctor || "",
        featuredOrder: gallery.featuredOrder,
      });
      setIsEditing(true);
    }
  }, [gallery]);

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

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();

      // 이미 존재하는 태그인지 확인
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({
          ...formData,
          tags: [...formData.tags, tagInput.trim()],
        });
      }

      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleImageUpload = (e) => {
    // 실제 애플리케이션에서는 이미지 업로드 로직이 들어가야 함
    // 여기서는 모킹만 함
    const files = e.target.files;
    if (files.length > 0) {
      const newImages = Array.from(files).map((file, index) => ({
        id: formData.images.length + index + 1,
        type:
          formData.images.length === 0
            ? "before"
            : formData.images.length === 1
            ? "after"
            : "detail",
        url: URL.createObjectURL(file),
        file: file,
      }));

      setFormData({
        ...formData,
        images: [...formData.images, ...newImages],
        imageCount: formData.images.length + newImages.length,
      });
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);

    // URL.revokeObjectURL(formData.images[index].url);

    setFormData({
      ...formData,
      images: newImages,
      imageCount: newImages.length,
    });

    if (activeImageIndex >= newImages.length) {
      setActiveImageIndex(Math.max(newImages.length - 1, 0));
    }
  };

  const handlePreviousImage = () => {
    setActiveImageIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) =>
      Math.min(prev + 1, formData.images.length - 1)
    );
  };

  const toggleFeatured = () => {
    setFormData({
      ...formData,
      featuredOrder: formData.featuredOrder === null ? 1 : null,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "제목을 입력해주세요";
    }

    if (!formData.procedureCategory) {
      newErrors.procedureCategory = "시술 카테고리를 선택해주세요";
    }

    if (!formData.procedure.trim()) {
      newErrors.procedure = "시술명을 입력해주세요";
    }

    if (formData.isPublic && !formData.patientName.trim()) {
      newErrors.patientName = "환자명을 입력해주세요";
    }

    if (formData.images.length < 2) {
      newErrors.images = "전/후 사진을 모두 업로드해주세요";
    }

    if (!formData.doctor.trim()) {
      newErrors.doctor = "담당 의사를 입력해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // 이미지 파일을 제외한 데이터만 전송 (실제 구현에서는 이미지도 서버에 업로드하는 로직 필요)
      const processedData = {
        ...formData,
        patientAge: formData.patientAge ? Number(formData.patientAge) : null,
      };

      onSave(processedData);
    }
  };

  return (
    <div className="before-after-modal-overlay">
      <div className="before-after-modal">
        <div className="before-after-modal-header">
          <h2 className="before-after-modal-title">
            {isEditing ? "전후사진 수정" : "새 전후사진 등록"}
          </h2>
          <button className="before-after-modal-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="before-after-modal-content">
          <div className="before-after-modal-image-panel">
            <div className="image-preview-container">
              {formData.images.length > 0 ? (
                <>
                  <div className="image-preview">
                    <img
                      src={formData.images[activeImageIndex]?.url}
                      alt={`Image ${activeImageIndex + 1}`}
                    />
                    <div className="image-type-badge">
                      {formData.images[activeImageIndex]?.type === "before"
                        ? "시술 전"
                        : formData.images[activeImageIndex]?.type === "after"
                        ? "시술 후"
                        : "세부 사진"}
                    </div>
                  </div>

                  <div className="image-navigation">
                    <button
                      className="nav-button"
                      onClick={handlePreviousImage}
                      disabled={activeImageIndex === 0}
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <div className="image-indicator">
                      {activeImageIndex + 1} / {formData.images.length}
                    </div>
                    <button
                      className="nav-button"
                      onClick={handleNextImage}
                      disabled={activeImageIndex === formData.images.length - 1}
                    >
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="no-images">
                  <FileImage size={64} />
                  <p>업로드된 이미지가 없습니다</p>
                </div>
              )}
            </div>

            <div className="image-thumbnails">
              {formData.images.map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail-container ${
                    activeImageIndex === index ? "active" : ""
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <div className="thumbnail">
                    <img src={image.url} alt={`Thumbnail ${index + 1}`} />
                  </div>
                  <button
                    className="thumbnail-remove-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(index);
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}

              <label className="upload-thumbnail">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="visually-hidden"
                />
                <Upload size={24} />
                <span>추가</span>
              </label>
            </div>

            {errors.images && (
              <div className="error-message">{errors.images}</div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="before-after-modal-form">
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                제목 <span className="required">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`form-input ${errors.title ? "error" : ""}`}
                placeholder="예: 눈매교정 비포&애프터"
              />
              {errors.title && (
                <div className="error-message">{errors.title}</div>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="procedureCategory" className="form-label">
                  시술 카테고리 <span className="required">*</span>
                </label>
                <select
                  id="procedureCategory"
                  name="procedureCategory"
                  value={formData.procedureCategory}
                  onChange={handleChange}
                  className={`form-select ${
                    errors.procedureCategory ? "error" : ""
                  }`}
                >
                  <option value="">카테고리 선택</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.procedureCategory && (
                  <div className="error-message">
                    {errors.procedureCategory}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="procedure" className="form-label">
                  시술명 <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="procedure"
                  name="procedure"
                  value={formData.procedure}
                  onChange={handleChange}
                  className={`form-input ${errors.procedure ? "error" : ""}`}
                  placeholder="예: 쌍꺼풀 수술"
                />
                {errors.procedure && (
                  <div className="error-message">{errors.procedure}</div>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="doctor" className="form-label">
                  담당 의사 <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="doctor"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleChange}
                  className={`form-input ${errors.doctor ? "error" : ""}`}
                  placeholder="예: 김의사"
                />
                {errors.doctor && (
                  <div className="error-message">{errors.doctor}</div>
                )}
              </div>
            </div>

            <div className="form-divider"></div>

            <div className="form-row patient-info-section">
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleChange}
                    className="checkbox-input"
                  />
                  {formData.isPublic ? (
                    <>
                      <Eye size={16} />
                      <span>환자 정보 공개</span>
                    </>
                  ) : (
                    <>
                      <EyeOff size={16} />
                      <span>환자 정보 비공개</span>
                    </>
                  )}
                </label>
              </div>
            </div>

            {formData.isPublic && (
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="patientName" className="form-label">
                    환자명 <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    className={`form-input ${
                      errors.patientName ? "error" : ""
                    }`}
                    placeholder="예: 김환자"
                  />
                  {errors.patientName && (
                    <div className="error-message">{errors.patientName}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="patientAge" className="form-label">
                    환자 나이
                  </label>
                  <input
                    type="number"
                    id="patientAge"
                    name="patientAge"
                    value={formData.patientAge}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="예: 28"
                    min="1"
                    max="100"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="patientGender" className="form-label">
                    환자 성별
                  </label>
                  <select
                    id="patientGender"
                    name="patientGender"
                    value={formData.patientGender}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="여성">여성</option>
                    <option value="남성">남성</option>
                  </select>
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="description" className="form-label">
                설명
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-textarea"
                rows="3"
                placeholder="시술에 대한 설명을 입력하세요"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="tags" className="form-label">
                태그
              </label>
              <div className="tags-input-container">
                <div className="tags-list">
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="tag-item">
                      <span className="tag-text">{tag}</span>
                      <button
                        type="button"
                        className="tag-remove"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  id="tagInput"
                  value={tagInput}
                  onChange={handleTagInputChange}
                  onKeyDown={handleTagInputKeyDown}
                  className="tags-input"
                  placeholder="태그 입력 후 Enter (예: 인기, 시술추천)"
                />
              </div>
            </div>

            <div className="form-group checkbox-group featured-checkbox">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.featuredOrder !== null}
                  onChange={toggleFeatured}
                  className="checkbox-input"
                />
                <Star
                  size={16}
                  className={
                    formData.featuredOrder !== null ? "text-featured" : ""
                  }
                />
                <span>추천 전후사진으로 표시</span>
              </label>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="form-button secondary"
                onClick={onClose}
              >
                취소
              </button>
              <button type="submit" className="form-button primary">
                {isEditing ? "수정 완료" : "등록 완료"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterModal;
