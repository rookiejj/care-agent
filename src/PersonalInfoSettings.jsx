import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "./App";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Edit2,
  CheckCircle,
} from "lucide-react";
import "./SettingsPages.css";

const PersonalInfoSettings = () => {
  const navigate = useNavigate();

  // 개인정보 상태
  const [name, setName] = useState("Doctor King");
  const [email, setEmail] = useState("user@example.com");
  const [phone, setPhone] = useState("010-1234-5678");
  const [birthdate, setBirthdate] = useState("1990-01-01");
  const [address, setAddress] = useState("서울시 강남구 테헤란로 123");

  // 수정 모드 상태
  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    phone: false,
    birthdate: false,
    address: false,
  });

  // 비밀번호 관련 상태
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  // 수정 모드 토글 함수
  const toggleEditMode = (field) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
  };

  // 비밀번호 변경 함수
  const handlePasswordChange = (e) => {
    e.preventDefault();

    // 비밀번호 검증
    if (!currentPassword) {
      setPasswordError("현재 비밀번호를 입력해주세요.");
      return;
    }

    if (!newPassword) {
      setPasswordError("새 비밀번호를 입력해주세요.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    // 비밀번호 변경 성공 처리
    setPasswordError("");
    setPasswordSuccess(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    // 3초 후 성공 메시지 숨기기
    setTimeout(() => {
      setPasswordSuccess(false);
    }, 3000);
  };

  return (
    <div className="container">
      <div className="fixed-header">
        <PageHeader
          title="개인정보 설정"
          backButtonVisible={true}
          onBack={handleBackClick}
        />
      </div>

      <div className="settings-content">
        <div className="settings-card">
          <h3 className="settings-section-title">
            <User size={18} />
            기본 정보
          </h3>
          <div className="profile-info-form">
            <div className="form-item">
              <label className="form-label">이름</label>
              <div className="form-input-row">
                {editMode.name ? (
                  <input
                    type="text"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <input
                    type="text"
                    className="form-input"
                    value={name}
                    readOnly
                  />
                )}
                <button
                  className="edit-button"
                  onClick={() => toggleEditMode("name")}
                >
                  {editMode.name ? "저장" : <Edit2 size={16} />}
                </button>
              </div>
            </div>

            <div className="form-item">
              <label className="form-label">이메일</label>
              <div className="form-input-row">
                {editMode.email ? (
                  <input
                    type="email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <input
                    type="email"
                    className="form-input"
                    value={email}
                    readOnly
                  />
                )}
                <button
                  className="edit-button"
                  onClick={() => toggleEditMode("email")}
                >
                  {editMode.email ? "저장" : <Edit2 size={16} />}
                </button>
              </div>
            </div>

            <div className="form-item">
              <label className="form-label">전화번호</label>
              <div className="form-input-row">
                {editMode.phone ? (
                  <input
                    type="tel"
                    className="form-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                ) : (
                  <input
                    type="tel"
                    className="form-input"
                    value={phone}
                    readOnly
                  />
                )}
                <button
                  className="edit-button"
                  onClick={() => toggleEditMode("phone")}
                >
                  {editMode.phone ? "저장" : <Edit2 size={16} />}
                </button>
              </div>
            </div>

            <div className="form-item">
              <label className="form-label">생년월일</label>
              <div className="form-input-row">
                {editMode.birthdate ? (
                  <input
                    type="date"
                    className="form-input"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                  />
                ) : (
                  <input
                    type="text"
                    className="form-input"
                    value={birthdate}
                    readOnly
                  />
                )}
                <button
                  className="edit-button"
                  onClick={() => toggleEditMode("birthdate")}
                >
                  {editMode.birthdate ? "저장" : <Edit2 size={16} />}
                </button>
              </div>
            </div>

            <div className="form-item">
              <label className="form-label">주소</label>
              <div className="form-input-row">
                {editMode.address ? (
                  <input
                    type="text"
                    className="form-input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                ) : (
                  <input
                    type="text"
                    className="form-input"
                    value={address}
                    readOnly
                  />
                )}
                <button
                  className="edit-button"
                  onClick={() => toggleEditMode("address")}
                >
                  {editMode.address ? "저장" : <Edit2 size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-card">
          <h3 className="settings-section-title">
            <Lock size={18} />
            비밀번호 변경
          </h3>
          <form className="profile-info-form" onSubmit={handlePasswordChange}>
            <div className="form-item">
              <label className="form-label">현재 비밀번호</label>
              <div className="form-input-row">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  className="form-input"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="현재 비밀번호를 입력하세요"
                />
                <button
                  className="edit-button"
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            <div className="form-item">
              <label className="form-label">새 비밀번호</label>
              <div className="form-input-row">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="form-input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="새 비밀번호를 입력하세요"
                />
                <button
                  className="edit-button"
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="form-item">
              <label className="form-label">새 비밀번호 확인</label>
              <div className="form-input-row">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="새 비밀번호를 다시 입력하세요"
                />
                <button
                  className="edit-button"
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            {passwordError && (
              <p
                style={{
                  color: "#ef4444",
                  fontSize: "0.875rem",
                  margin: "0.5rem 0",
                }}
              >
                {passwordError}
              </p>
            )}

            {passwordSuccess && (
              <p
                style={{
                  color: "#10b981",
                  fontSize: "0.875rem",
                  margin: "0.5rem 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                <CheckCircle size={16} /> 비밀번호가 성공적으로 변경되었습니다.
              </p>
            )}

            <button
              type="submit"
              className="submit-button"
              style={{ marginTop: "1rem" }}
            >
              비밀번호 변경하기
            </button>
          </form>
        </div>

        <div className="settings-card">
          <h3 className="settings-section-title">
            <Lock size={18} />
            계정 관리
          </h3>
          <div className="profile-info-form">
            <button
              className="submit-button"
              style={{ backgroundColor: "#fee2e2", color: "#ef4444" }}
              onClick={() => {
                if (
                  window.confirm(
                    "정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
                  )
                ) {
                  alert("계정 삭제가 요청되었습니다.");
                }
              }}
            >
              계정 삭제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSettings;
