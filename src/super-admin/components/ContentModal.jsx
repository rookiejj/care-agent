import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  Plus,
  Minus,
  Upload,
  Eye,
  Calendar,
  Tag,
  Globe,
  Star,
  Settings,
  FileText,
  Image,
} from "lucide-react";
import "./ContentModal.css";

const ContentModal = ({
  content,
  onClose,
  onSave,
  contentTypes = [],
  categories = [],
  platforms = [],
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    contentType: "notice",
    category: "",
    status: "draft",
    priority: "medium",
    platform: "all",
    tags: [],
    content: "",
    imageUrl: "",
    url: "",
    publishDate: "",
    expiryDate: "",
    isActive: true,
    isFeatured: false,
    allowComments: true,
    enableAnalytics: true,
    showAuthor: true,
    enableSharing: true,
    requireLogin: false,
    metaTitle: "",
    metaDescription: "",
    keywords: "",
  });

  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("basic");
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (content) {
      // 기존 컨텐츠 데이터로 폼 초기화
      setFormData({
        title: content.title || "",
        description: content.description || "",
        contentType: content.contentType || "notice",
        category: content.category || "",
        status: content.status || "draft",
        priority: content.priority || "medium",
        platform: content.platform || "all",
        tags: content.tags || [],
        content: content.content || "",
        imageUrl: content.imageUrl || "",
        url: content.url || "",
        publishDate: content.publishDate
          ? content.publishDate.split("T")[0]
          : "",
        expiryDate: content.expiryDate ? content.expiryDate.split("T")[0] : "",
        isActive: content.isActive !== undefined ? content.isActive : true,
        isFeatured: content.isFeatured || false,
        allowComments:
          content.settings?.allowComments !== undefined
            ? content.settings.allowComments
            : true,
        enableAnalytics:
          content.settings?.enableAnalytics !== undefined
            ? content.settings.enableAnalytics
            : true,
        showAuthor:
          content.settings?.showAuthor !== undefined
            ? content.settings.showAuthor
            : true,
        enableSharing:
          content.settings?.enableSharing !== undefined
            ? content.settings.enableSharing
            : true,
        requireLogin: content.settings?.requireLogin || false,
        metaTitle: content.seo?.metaTitle || "",
        metaDescription: content.seo?.metaDescription || "",
        keywords: content.seo?.keywords || "",
      });
    } else if (categories.length > 0) {
      // 새 컨텐츠 생성 시 첫 번째 카테고리를 기본값으로 설정
      setFormData((prev) => ({
        ...prev,
        category: categories[0],
      }));
    }
  }, [content, categories]);

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

  const handleAddTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag],
      });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((item) => item !== tag),
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // 필수 입력 필드 검증
    if (!formData.title.trim()) {
      newErrors.title = "제목을 입력해주세요";
    }

    if (!formData.description.trim()) {
      newErrors.description = "설명을 입력해주세요";
    }

    if (!formData.contentType) {
      newErrors.contentType = "컨텐츠 유형을 선택해주세요";
    }

    if (!formData.category) {
      newErrors.category = "카테고리를 선택해주세요";
    }

    if (!formData.content.trim()) {
      newErrors.content = "컨텐츠 내용을 입력해주세요";
    }

    if (formData.url && !/^(https?:\/\/|\/)/i.test(formData.url)) {
      newErrors.url =
        "올바른 URL 형식이 아닙니다 (예: https://example.com 또는 /path)";
    }

    if (formData.imageUrl && !/^(https?:\/\/|\/)/i.test(formData.imageUrl)) {
      newErrors.imageUrl = "올바른 이미지 URL 형식이 아닙니다";
    }

    if (
      formData.publishDate &&
      new Date(formData.publishDate) < new Date().setHours(0, 0, 0, 0)
    ) {
      newErrors.publishDate = "게시일은 오늘 이후로 설정해주세요";
    }

    if (
      formData.expiryDate &&
      formData.publishDate &&
      new Date(formData.expiryDate) <= new Date(formData.publishDate)
    ) {
      newErrors.expiryDate = "만료일은 게시일 이후로 설정해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // 컨텐츠 데이터 준비
      const contentData = {
        ...formData,
        publishDate: formData.publishDate
          ? new Date(formData.publishDate).toISOString()
          : new Date().toISOString(),
        expiryDate: formData.expiryDate
          ? new Date(formData.expiryDate).toISOString()
          : null,
        settings: {
          allowComments: formData.allowComments,
          enableAnalytics: formData.enableAnalytics,
          showAuthor: formData.showAuthor,
          enableSharing: formData.enableSharing,
          requireLogin: formData.requireLogin,
        },
        seo: {
          metaTitle: formData.metaTitle || formData.title,
          metaDescription: formData.metaDescription || formData.description,
          keywords: formData.keywords,
        },
      };

      onSave(contentData);
    }
  };

  const getContentTypeLabel = (type) => {
    const typeMap = {
      banner: "배너",
      notice: "공지사항",
      faq: "FAQ",
      terms: "이용약관",
      privacy: "개인정보처리방침",
      news: "뉴스",
      event: "이벤트",
      tutorial: "튜토리얼",
      template: "템플릿",
      category: "카테고리",
    };
    return typeMap[type] || type;
  };

  const getPlatformLabel = (platform) => {
    const platformMap = {
      web: "웹",
      mobile: "모바일",
      tablet: "태블릿",
      all: "전체 플랫폼",
    };
    return platformMap[platform] || platform;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="super-admin-content-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="super-admin-content-modal-header">
          <h2>{content ? "컨텐츠 수정" : "새 컨텐츠 생성"}</h2>
          <button className="modal-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="super-admin-content-modal-tabs">
          <button
            className={`super-admin-content-modal-tab ${
              activeTab === "basic" ? "active" : ""
            }`}
            onClick={() => setActiveTab("basic")}
          >
            <FileText size={16} />
            기본 정보
          </button>
          <button
            className={`super-admin-content-modal-tab ${
              activeTab === "content" ? "active" : ""
            }`}
            onClick={() => setActiveTab("content")}
          >
            <FileText size={16} />
            컨텐츠
          </button>
          <button
            className={`super-admin-content-modal-tab ${
              activeTab === "media" ? "active" : ""
            }`}
            onClick={() => setActiveTab("media")}
          >
            <Image size={16} />
            미디어
          </button>
          <button
            className={`super-admin-content-modal-tab ${
              activeTab === "schedule" ? "active" : ""
            }`}
            onClick={() => setActiveTab("schedule")}
          >
            <Calendar size={16} />
            일정 & 상태
          </button>
          <button
            className={`super-admin-content-modal-tab ${
              activeTab === "seo" ? "active" : ""
            }`}
            onClick={() => setActiveTab("seo")}
          >
            <Globe size={16} />
            SEO & 설정
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="super-admin-content-modal-form"
        >
          {activeTab === "basic" && (
            <div className="super-admin-content-modal-basic-info">
              <div className="form-group">
                <label htmlFor="title">
                  제목 <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={errors.title ? "form-input error" : "form-input"}
                  placeholder="컨텐츠 제목을 입력하세요"
                />
                {errors.title && (
                  <div className="error-message">{errors.title}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="description">
                  설명 <span className="required">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={
                    errors.description ? "form-input error" : "form-input"
                  }
                  placeholder="컨텐츠에 대한 간단한 설명을 입력하세요"
                  rows={3}
                />
                {errors.description && (
                  <div className="error-message">{errors.description}</div>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contentType">
                    컨텐츠 유형 <span className="required">*</span>
                  </label>
                  <select
                    id="contentType"
                    name="contentType"
                    value={formData.contentType}
                    onChange={handleChange}
                    className={
                      errors.contentType ? "form-input error" : "form-input"
                    }
                  >
                    {contentTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {getContentTypeLabel(type)}
                      </option>
                    ))}
                  </select>
                  {errors.contentType && (
                    <div className="error-message">{errors.contentType}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="category">
                    카테고리 <span className="required">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={
                      errors.category ? "form-input error" : "form-input"
                    }
                  >
                    <option value="">선택</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <div className="error-message">{errors.category}</div>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="priority">우선순위</label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="high">높음</option>
                    <option value="medium">보통</option>
                    <option value="low">낮음</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="platform">대상 플랫폼</label>
                  <select
                    id="platform"
                    name="platform"
                    value={formData.platform}
                    onChange={handleChange}
                    className="form-input"
                  >
                    {platforms.map((platform, index) => (
                      <option key={index} value={platform}>
                        {getPlatformLabel(platform)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>태그</label>
                <div className="selected-tags">
                  {formData.tags.length > 0 ? (
                    formData.tags.map((tag, index) => (
                      <div key={index} className="tag-chip">
                        {tag}
                        <button
                          type="button"
                          className="remove-tag"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="no-tags">추가된 태그가 없습니다</div>
                  )}
                </div>
                <div className="add-tag-container">
                  <input
                    type="text"
                    className="form-input"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="태그 입력"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="add-tag-button"
                    onClick={handleAddTag}
                    disabled={!newTag.trim()}
                  >
                    <Plus size={16} />
                    추가
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "content" && (
            <div className="super-admin-content-modal-content-info">
              <div className="form-group">
                <label htmlFor="content">
                  컨텐츠 내용 <span className="required">*</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className={
                    errors.content
                      ? "form-input error content-textarea"
                      : "form-input content-textarea"
                  }
                  placeholder="컨텐츠의 실제 내용을 입력하세요. 마크다운 형식을 지원합니다."
                  rows={15}
                />
                {errors.content && (
                  <div className="error-message">{errors.content}</div>
                )}
                <div className="form-help">
                  마크다운 문법을 사용할 수 있습니다. (예: # 제목, **굵게**,
                  *기울임*, [링크](URL))
                </div>
              </div>

              <div className="content-preview-section">
                <h4 className="preview-title">
                  <Eye size={16} />
                  미리보기
                </h4>
                <div className="content-preview">
                  <pre className="preview-text">
                    {formData.content ||
                      "내용을 입력하면 여기에 미리보기가 표시됩니다."}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === "media" && (
            <div className="super-admin-content-modal-media-info">
              <div className="form-group">
                <label htmlFor="imageUrl">이미지 URL</label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className={
                    errors.imageUrl ? "form-input error" : "form-input"
                  }
                  placeholder="https://example.com/image.jpg 또는 /images/banner.jpg"
                />
                {errors.imageUrl && (
                  <div className="error-message">{errors.imageUrl}</div>
                )}
                <div className="form-help">
                  배너나 썸네일로 사용할 이미지의 URL을 입력하세요.
                </div>
              </div>

              {formData.imageUrl && (
                <div className="image-preview">
                  <label>이미지 미리보기</label>
                  <div className="image-preview-container">
                    <img
                      src={formData.imageUrl}
                      alt="미리보기"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div className="image-error" style={{ display: "none" }}>
                      이미지를 불러올 수 없습니다
                    </div>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="url">연결 URL</label>
                <input
                  type="text"
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  className={errors.url ? "form-input error" : "form-input"}
                  placeholder="https://example.com 또는 /page/detail"
                />
                {errors.url && (
                  <div className="error-message">{errors.url}</div>
                )}
                <div className="form-help">
                  클릭 시 이동할 URL을 입력하세요. (배너나 링크가 있는 컨텐츠의
                  경우)
                </div>
              </div>

              <div className="upload-section">
                <label>파일 업로드</label>
                <div className="upload-area">
                  <Upload size={24} />
                  <p>파일을 드래그하거나 클릭하여 업로드</p>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      // 파일 업로드 로직
                      console.log("파일 업로드:", e.target.files[0]);
                    }}
                  />
                  <button
                    type="button"
                    className="upload-button"
                    onClick={() => {
                      const fileInput =
                        document.querySelector('input[type="file"]');
                      fileInput.click();
                    }}
                  >
                    파일 선택
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "schedule" && (
            <div className="super-admin-content-modal-schedule-info">
              <div className="form-group">
                <label htmlFor="status">상태</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="draft">초안</option>
                  <option value="published">게시됨</option>
                  <option value="scheduled">예약 게시</option>
                  <option value="archived">보관됨</option>
                </select>
                <div className="form-help">
                  {formData.status === "draft" && "작성 중인 초안 상태입니다."}
                  {formData.status === "published" && "즉시 게시됩니다."}
                  {formData.status === "scheduled" &&
                    "지정한 날짜에 자동으로 게시됩니다."}
                  {formData.status === "archived" &&
                    "더 이상 표시되지 않습니다."}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="publishDate">게시일</label>
                  <input
                    type="date"
                    id="publishDate"
                    name="publishDate"
                    value={formData.publishDate}
                    onChange={handleChange}
                    className={
                      errors.publishDate ? "form-input error" : "form-input"
                    }
                  />
                  {errors.publishDate && (
                    <div className="error-message">{errors.publishDate}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="expiryDate">만료일 (선택사항)</label>
                  <input
                    type="date"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className={
                      errors.expiryDate ? "form-input error" : "form-input"
                    }
                  />
                  {errors.expiryDate && (
                    <div className="error-message">{errors.expiryDate}</div>
                  )}
                </div>
              </div>

              <div className="checkbox-group-container">
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="form-checkbox"
                  />
                  <label htmlFor="isActive" className="checkbox-label">
                    활성 상태
                  </label>
                </div>
                <div className="form-help">
                  비활성화하면 게시 상태여도 사용자에게 표시되지 않습니다.
                </div>
              </div>

              <div className="checkbox-group-container">
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="form-checkbox"
                  />
                  <label htmlFor="isFeatured" className="checkbox-label">
                    <Star size={16} />
                    추천 컨텐츠
                  </label>
                </div>
                <div className="form-help">
                  추천 컨텐츠로 설정하면 우선적으로 노출됩니다.
                </div>
              </div>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="super-admin-content-modal-seo-info">
              <div className="seo-section">
                <h4 className="seo-section-title">
                  <Globe size={16} />
                  SEO 설정
                </h4>

                <div className="form-group">
                  <label htmlFor="metaTitle">메타 제목</label>
                  <input
                    type="text"
                    id="metaTitle"
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="검색 엔진에 표시될 제목 (비워두면 컨텐츠 제목 사용)"
                  />
                  <div className="form-help">
                    60자 이내로 작성하는 것이 좋습니다. (
                    {formData.metaTitle.length}/60)
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="metaDescription">메타 설명</label>
                  <textarea
                    id="metaDescription"
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="검색 결과에 표시될 설명 (비워두면 컨텐츠 설명 사용)"
                    rows={3}
                  />
                  <div className="form-help">
                    160자 이내로 작성하는 것이 좋습니다. (
                    {formData.metaDescription.length}/160)
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="keywords">키워드</label>
                  <input
                    type="text"
                    id="keywords"
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="키워드1, 키워드2, 키워드3"
                  />
                  <div className="form-help">쉼표로 구분하여 입력하세요.</div>
                </div>
              </div>

              <div className="settings-section">
                <h4 className="settings-section-title">
                  <Settings size={16} />
                  컨텐츠 설정
                </h4>

                <div className="settings-grid">
                  <div className="checkbox-group-container">
                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        id="enableAnalytics"
                        name="enableAnalytics"
                        checked={formData.enableAnalytics}
                        onChange={handleChange}
                        className="form-checkbox"
                      />
                      <label
                        htmlFor="enableAnalytics"
                        className="checkbox-label"
                      >
                        분석 활성화
                      </label>
                    </div>
                  </div>

                  <div className="checkbox-group-container">
                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        id="showAuthor"
                        name="showAuthor"
                        checked={formData.showAuthor}
                        onChange={handleChange}
                        className="form-checkbox"
                      />
                      <label htmlFor="showAuthor" className="checkbox-label">
                        작성자 표시
                      </label>
                    </div>
                  </div>

                  <div className="checkbox-group-container">
                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        id="enableSharing"
                        name="enableSharing"
                        checked={formData.enableSharing}
                        onChange={handleChange}
                        className="form-checkbox"
                      />
                      <label htmlFor="enableSharing" className="checkbox-label">
                        공유 기능
                      </label>
                    </div>
                  </div>

                  <div className="checkbox-group-container">
                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        id="requireLogin"
                        name="requireLogin"
                        checked={formData.requireLogin}
                        onChange={handleChange}
                        className="form-checkbox"
                      />
                      <label htmlFor="requireLogin" className="checkbox-label">
                        로그인 필요
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="super-admin-content-modal-footer">
            <div className="action-buttons">
              <button
                type="button"
                className="super-admin-content-modal-cancel-button"
                onClick={onClose}
              >
                취소
              </button>
              <button type="submit" className="save-button">
                <Save size={16} />
                <span>{content ? "저장" : "생성"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContentModal;
