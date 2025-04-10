import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "./App";
import { Camera, X } from "lucide-react";
import "./CommunityCreatePage.css";

// 커스텀 드롭다운 컴포넌트
const CustomDropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        <span>{selectedOption?.label || "선택하세요"}</span>
        <span className={`dropdown-icon ${isOpen ? "open" : ""}`}>▼</span>
      </div>
      <div className={`dropdown-options ${isOpen ? "open" : ""}`}>
        {options.map((option) => (
          <div
            key={option.value}
            className={`dropdown-option ${
              option.value === value ? "selected" : ""
            }`}
            onClick={() => {
              onChange(option.value);
              setIsOpen(false);
            }}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

const CommunityCreatePage = ({ currentLocation }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("general");
  const fileInputRef = useRef(null);

  const MAX_IMAGES = 5;
  const MAX_TITLE_LENGTH = 50;
  const MAX_CONTENT_LENGTH = 2000;

  const handleTitleChange = (e) => {
    if (e.target.value.length <= MAX_TITLE_LENGTH) {
      setTitle(e.target.value);
    }
  };

  const handleContentChange = (e) => {
    if (e.target.value.length <= MAX_CONTENT_LENGTH) {
      setContent(e.target.value);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    if (images.length + files.length > MAX_IMAGES) {
      alert(`이미지는 최대 ${MAX_IMAGES}개까지 업로드할 수 있습니다.`);
      return;
    }

    const newImages = files.map((file) => ({
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (id) => {
    setImages((prev) => {
      const filtered = prev.filter((image) => image.id !== id);

      // Revoke object URLs to prevent memory leaks
      const removedImage = prev.find((image) => image.id === id);
      if (removedImage) {
        URL.revokeObjectURL(removedImage.preview);
      }

      return filtered;
    });
  };

  // 카테고리 변경 핸들러 수정
  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleCancel = () => {
    // Clean up object URLs
    images.forEach((image) => URL.revokeObjectURL(image.preview));
    navigate(-1);
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    // 여기서 실제 데이터를 처리하고 서버에 전송하는 로직을 구현
    console.log("제출 데이터:", {
      title,
      content,
      category,
      images: images.map((img) => img.file),
    });

    // Form 제출 후 커뮤니티 페이지로 돌아가기
    navigate("/community");
  };

  const isSubmitDisabled = !title.trim() || !content.trim();

  const categoryOptions = [
    { value: "general", label: "일반 게시글" },
    { value: "question", label: "질문" },
    { value: "review", label: "후기" },
    { value: "information", label: "정보공유" },
  ];

  return (
    <div className="container">
      <div className="fixed-header">
        <PageHeader
          title={"글 작성하기"}
          currentLocation={currentLocation}
          backButtonVisible={true}
          onBack={handleCancel}
        />
      </div>

      <div className="community-create-container">
        <div className="community-create-form">
          <div className="form-group">
            <label className="form-label">카테고리</label>
            <CustomDropdown
              options={categoryOptions}
              value={category}
              onChange={handleCategoryChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">제목</label>
            <input
              type="text"
              className="title-input"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={handleTitleChange}
              maxLength={MAX_TITLE_LENGTH}
            />
            <div className="character-count">
              {title.length}/{MAX_TITLE_LENGTH}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">내용</label>
            <textarea
              className="content-textarea"
              placeholder="내용을 입력하세요"
              value={content}
              onChange={handleContentChange}
              maxLength={MAX_CONTENT_LENGTH}
            />
            <div className="character-count">
              {content.length}/{MAX_CONTENT_LENGTH}
            </div>
          </div>

          <div className="form-group">
            <div className="image-upload-label">
              <span>이미지 첨부 (최대 {MAX_IMAGES}장)</span>
            </div>

            <div className="image-preview-container">
              {images.map((image) => (
                <div key={image.id} className="image-preview">
                  <img src={image.preview} alt="미리보기" />
                  <button
                    className="image-remove-button"
                    onClick={() => handleRemoveImage(image.id)}
                    aria-label="이미지 삭제"
                  >
                    <X size={16} color="white" />
                  </button>
                </div>
              ))}

              {images.length < MAX_IMAGES && (
                <div className="upload-button">
                  <label className="upload-button-label" htmlFor="image-upload">
                    <Camera size={24} color="#6b7280" />
                    <span
                      style={{
                        fontSize: "0.75rem",
                        marginTop: "0.25rem",
                        color: "#6b7280",
                      }}
                    >
                      {images.length}/{MAX_IMAGES}
                    </span>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="upload-button-input"
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="community-create-footer">
        <button className="cancel-button" onClick={handleCancel}>
          취소
        </button>
        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
        >
          등록하기
        </button>
      </div>
    </div>
  );
};

export default CommunityCreatePage;
