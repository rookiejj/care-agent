import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader, getProfileImage } from "./App";
import {
  User,
  Camera,
  Image,
  X,
  Check,
  Upload,
  Instagram,
  Facebook,
  Twitter,
  Globe,
  Plus,
  Edit2,
  ChevronRight,
  Loader,
} from "lucide-react";
import "./ProfileEdit.css";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // 프로필 상태
  const [profileData, setProfileData] = useState({
    name: "Doctor King",
    nickname: "dr_king",
    bio: "안녕하세요! 건강한 라이프스타일을 추구하는 의사입니다. 운동과 명상을 좋아하며 다양한 의학 정보를 공유합니다.",
    email: "user@example.com",
    phone: "010-1234-5678",
    interests: ["건강", "운동", "명상", "영양"],
    social: {
      instagram: "dr_king_health",
      facebook: "",
      twitter: "dr_king_med",
      blog: "https://healthblog.com/dr-king",
    },
  });

  // 프로필 이미지 관련 상태
  const [profileImage, setProfileImage] = useState(getProfileImage());
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [uploading, setUploading] = useState(false);

  // 새 관심사 입력 상태
  const [newInterest, setNewInterest] = useState("");

  // 아바타 옵션
  const avatarOptions = [
    "/images/avatars/avatar1.png",
    "/images/avatars/avatar2.png",
    "/images/avatars/avatar3.png",
    "/images/avatars/avatar4.png",
    "/images/avatars/avatar5.png",
    "/images/avatars/avatar6.png",
  ];

  // 실제 구현에서는 여기서 사용자 프로필 데이터를 가져옵니다
  useEffect(() => {
    // API에서 프로필 데이터 가져오기
    // 현재는 목업 데이터 사용
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  // 입력 필드 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // 최대 글자수 체크
    if (name === "bio" && value.length > 150) {
      return;
    }

    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  // 소셜 미디어 입력 변경 핸들러
  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      social: {
        ...profileData.social,
        [name]: value,
      },
    });
  };

  // 프로필 이미지 변경을 위한 파일 업로드 핸들러
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 실제 구현에서는 API를 통해 이미지 업로드
      setUploading(true);

      // 임시 업로드 시뮬레이션
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfileImage(e.target.result);
          setUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  // 아바타 모달 열기
  const openAvatarModal = () => {
    setShowAvatarModal(true);
  };

  // 아바타 선택 핸들러
  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
  };

  // 선택한 아바타 적용
  const applySelectedAvatar = () => {
    if (selectedAvatar) {
      setProfileImage(selectedAvatar);
      setShowAvatarModal(false);
    }
  };

  // 관심사 추가 핸들러
  const addInterest = () => {
    if (
      newInterest.trim() &&
      !profileData.interests.includes(newInterest.trim())
    ) {
      setProfileData({
        ...profileData,
        interests: [...profileData.interests, newInterest.trim()],
      });
      setNewInterest("");
    }
  };

  // 관심사 제거 핸들러
  const removeInterest = (interest) => {
    setProfileData({
      ...profileData,
      interests: profileData.interests.filter((item) => item !== interest),
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = () => {
    // 실제 구현에서는 API를 통해 프로필 정보 업데이트
    console.log("프로필 업데이트:", { ...profileData, profileImage });

    // 성공적으로 업데이트 후 마이페이지로 이동
    alert("프로필이 성공적으로 업데이트 되었습니다.");
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="fixed-header">
        <PageHeader
          title="프로필 편집"
          backButtonVisible={true}
          onBack={handleBackClick}
        />
      </div>

      <div className="profile-edit-content">
        {/* 프로필 이미지 섹션 */}
        <div className="profile-edit-card">
          <div className="profile-image-container">
            <div className="profile-image-wrapper">
              <img src={profileImage} alt="프로필" className="profile-image" />
              {/* <button
                className="profile-image-edit-button"
                onClick={openAvatarModal}
                disabled={uploading}
              >
                {uploading ? <Loader size={16} /> : <Camera size={16} />}
              </button> */}
            </div>
            <div className="profile-image-options">
              <button
                className="image-option-button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                <Upload size={16} />
                사진 업로드
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileUpload}
              />
              {/* <button
                className="image-option-button"
                onClick={openAvatarModal}
                disabled={uploading}
              >
                <Image size={16} />
                아바타 선택
              </button> */}
            </div>
          </div>
        </div>

        {/* 기본 정보 섹션 */}
        <div className="profile-edit-card">
          <h3 className="profile-edit-section-title">
            <User size={18} />
            기본 정보
          </h3>
          <div className="profile-edit-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                이름
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                value={profileData.name}
                onChange={handleInputChange}
                placeholder="이름을 입력하세요"
              />
            </div>

            <div className="form-group">
              <label htmlFor="nickname" className="form-label">
                닉네임
              </label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                className="form-input"
                value={profileData.nickname}
                onChange={handleInputChange}
                placeholder="닉네임을 입력하세요"
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio" className="form-label">
                소개
              </label>
              <textarea
                id="bio"
                name="bio"
                className="form-input form-textarea"
                value={profileData.bio}
                onChange={handleInputChange}
                placeholder="자기소개를 입력하세요"
                maxLength={150}
              ></textarea>
              <div className="character-count">
                {profileData.bio.length}/150
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={profileData.email}
                onChange={handleInputChange}
                placeholder="이메일을 입력하세요"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                전화번호
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-input"
                value={profileData.phone}
                onChange={handleInputChange}
                placeholder="전화번호를 입력하세요"
              />
            </div>
          </div>
        </div>

        {/* 관심사 섹션 */}
        <div className="profile-edit-card">
          <h3 className="profile-edit-section-title">
            <ChevronRight size={18} />
            관심사
          </h3>
          <div className="interest-section">
            <div className="interest-tags">
              {profileData.interests.map((interest, index) => (
                <div key={index} className="interest-tag">
                  {interest}
                  <button
                    className="remove-button"
                    onClick={() => removeInterest(interest)}
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}
            </div>

            <div className="add-interest-input">
              <input
                type="text"
                className="form-input"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="관심사 추가"
                onKeyPress={(e) => e.key === "Enter" && addInterest()}
              />
              <button
                className="add-button"
                onClick={addInterest}
                disabled={!newInterest.trim()}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* 소셜 미디어 섹션 */}
        <div className="profile-edit-card">
          <h3 className="profile-edit-section-title">
            <Globe size={18} />
            소셜 미디어
          </h3>
          <div className="social-media-section">
            <div className="social-media-item">
              <div className="social-icon instagram-icon">
                <Instagram size={20} />
              </div>
              <input
                type="text"
                name="instagram"
                className="form-input"
                value={profileData.social.instagram}
                onChange={handleSocialChange}
                placeholder="인스타그램 아이디"
              />
            </div>

            <div className="social-media-item">
              <div className="social-icon facebook-icon">
                <Facebook size={20} />
              </div>
              <input
                type="text"
                name="facebook"
                className="form-input"
                value={profileData.social.facebook}
                onChange={handleSocialChange}
                placeholder="페이스북 아이디"
              />
            </div>

            <div className="social-media-item">
              <div className="social-icon twitter-icon">
                <Twitter size={20} />
              </div>
              <input
                type="text"
                name="twitter"
                className="form-input"
                value={profileData.social.twitter}
                onChange={handleSocialChange}
                placeholder="트위터 아이디"
              />
            </div>

            <div className="social-media-item">
              <div className="social-icon blog-icon">
                <Globe size={20} />
              </div>
              <input
                type="text"
                name="blog"
                className="form-input"
                value={profileData.social.blog}
                onChange={handleSocialChange}
                placeholder="블로그 URL"
              />
            </div>
          </div>
        </div>

        {/* 버튼 액션 */}
        <div className="form-actions">
          <button className="cancel-button" onClick={handleBackClick}>
            취소
          </button>
          <button className="save-button" onClick={handleSubmit}>
            저장하기
          </button>
        </div>
      </div>

      {/* 아바타 선택 모달 */}
      {showAvatarModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowAvatarModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">아바타 선택</h3>
              <button
                className="modal-close-button"
                onClick={() => setShowAvatarModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="avatar-grid">
              {avatarOptions.map((avatar, index) => (
                <div
                  key={index}
                  className={`avatar-option ${
                    selectedAvatar === avatar ? "selected" : ""
                  }`}
                  onClick={() => handleAvatarSelect(avatar)}
                >
                  <img src={avatar} alt={`아바타 ${index + 1}`} />
                </div>
              ))}
            </div>

            <div className="modal-actions">
              <button
                className="modal-button secondary"
                onClick={() => setShowAvatarModal(false)}
              >
                취소
              </button>
              <button
                className="modal-button primary"
                onClick={applySelectedAvatar}
                disabled={!selectedAvatar}
              >
                적용
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileEdit;
