import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  Trash2,
  ShieldCheck,
  UserCog,
  Users,
  Calendar,
  Stethoscope,
  FileText,
  Settings as SettingsIcon,
  Plus,
  ChevronDown,
  Filter,
} from "lucide-react";
import "./RoleEditModal.css";

const RoleEditModal = ({ role, isNew, onClose, onSave, onDelete }) => {
  const initialPermissionsState = {
    patientManagement: { view: false, edit: false },
    appointments: { view: false, edit: false },
    doctorManagement: { view: false, edit: false },
    reports: { view: false, edit: false },
    settings: { view: false, edit: false },
  };

  // 기본 권한 레벨 옵션
  const predefinedLevels = [
    { value: "full", label: "전체 관리자" },
    { value: "hospital", label: "병원 관리자" },
    { value: "doctor", label: "의사" },
    { value: "receptionist", label: "접수 담당자" },
  ];

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    level: "receptionist",
    isCustomLevel: false,
    customLevel: "",
    permissions: { ...initialPermissionsState },
  });

  const [errors, setErrors] = useState({});
  const [originalLevel, setOriginalLevel] = useState("");
  const [showCustomLevelInput, setShowCustomLevelInput] = useState(false);

  useEffect(() => {
    if (role && !isNew) {
      // 커스텀 레벨인지 확인
      const isCustom = !predefinedLevels.some(
        (level) => level.value === role.level
      );

      // 기존 역할을 수정하는 경우 데이터 로드
      setFormData({
        id: role.id,
        name: role.name || "",
        description: role.description || "",
        level: isCustom ? "custom" : role.level,
        isCustomLevel: isCustom,
        customLevel: isCustom ? role.level : "",
        permissions: processRolePermissions(role.level),
      });
      setOriginalLevel(role.level);
      setShowCustomLevelInput(isCustom);
    }
  }, [role, isNew]);

  // 역할 레벨에 따른 권한 초기화
  const processRolePermissions = (level) => {
    const permissions = { ...initialPermissionsState };

    // 역할 레벨에 따라 권한 설정
    if (level === "full") {
      // 전체 관리자는 모든 권한 부여
      Object.keys(permissions).forEach((module) => {
        permissions[module].view = true;
        permissions[module].edit = true;
      });
    } else if (level === "hospital") {
      // 병원 관리자는 대부분 권한 부여, 설정 수정 제외
      Object.keys(permissions).forEach((module) => {
        permissions[module].view = true;
        permissions[module].edit = module !== "settings";
      });
    } else if (level === "doctor") {
      // 의사는 환자, 예약, 보고서에 관한 권한
      permissions.patientManagement.view = true;
      permissions.patientManagement.edit = true;
      permissions.appointments.view = true;
      permissions.appointments.edit = true;
      permissions.reports.view = true;
    } else if (level === "receptionist") {
      // 접수 담당자는 환자, 예약만 가능
      permissions.patientManagement.view = true;
      permissions.patientManagement.edit = true;
      permissions.appointments.view = true;
      permissions.appointments.edit = true;
    }
    // 커스텀 레벨의 경우 빈 권한으로 시작하고 사용자가 직접 설정

    return permissions;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "level") {
      // 권한 레벨 변경시 처리
      if (value === "custom") {
        // 커스텀 레벨 선택 시
        setShowCustomLevelInput(true);
        setFormData((prev) => ({
          ...prev,
          [name]: value,
          isCustomLevel: true,
          // 커스텀 레벨은 빈 권한으로 시작
          permissions: { ...initialPermissionsState },
        }));
      } else if (value === "full" && !isNew && originalLevel !== "full") {
        // 기존 역할을 전체 관리자로 변경하려는 경우
        if (
          window.confirm(
            "이 역할을 전체 관리자로 변경하시겠습니까? 이 작업은 무제한 접근 권한을 부여합니다."
          )
        ) {
          setShowCustomLevelInput(false);
          setFormData((prev) => ({
            ...prev,
            [name]: value,
            isCustomLevel: false,
            customLevel: "",
            permissions: processRolePermissions(value),
          }));
        }
      } else {
        // 다른 레벨 변경의 경우
        setShowCustomLevelInput(false);
        setFormData((prev) => ({
          ...prev,
          [name]: value,
          isCustomLevel: false,
          customLevel: "",
          permissions: processRolePermissions(value),
        }));
      }
    } else if (name === "customLevel") {
      // 커스텀 레벨 이름 변경
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      // 일반 필드 변경
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // 에러 메시지 초기화
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handlePermissionChange = (module, type) => {
    // 권한 레벨이 전체 관리자인 경우 권한 변경 금지
    if (formData.level === "full") {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [module]: {
          ...prev.permissions[module],
          [type]: !prev.permissions[module][type],
        },
      },
    }));

    // view 권한을 끄면 edit 권한도 자동으로 꺼짐
    if (type === "view" && formData.permissions[module].view) {
      setFormData((prev) => ({
        ...prev,
        permissions: {
          ...prev.permissions,
          [module]: {
            ...prev.permissions[module],
            edit: false,
          },
        },
      }));
    }

    // edit 권한을 켜면 view 권한도 자동으로 켜짐
    if (type === "edit" && !formData.permissions[module].edit) {
      setFormData((prev) => ({
        ...prev,
        permissions: {
          ...prev.permissions,
          [module]: {
            ...prev.permissions[module],
            view: true,
          },
        },
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "역할 이름을 입력해주세요";
    }

    if (formData.name.trim().length < 2) {
      newErrors.name = "역할 이름은 최소 2자 이상이어야 합니다";
    }

    if (formData.isCustomLevel && !formData.customLevel.trim()) {
      newErrors.customLevel = "권한 레벨 이름을 입력해주세요";
    }

    if (formData.isCustomLevel && formData.customLevel.trim().length < 2) {
      newErrors.customLevel = "권한 레벨 이름은 최소 2자 이상이어야 합니다";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // 최종 제출 데이터 생성
      const finalData = {
        ...formData,
        level: formData.isCustomLevel ? formData.customLevel : formData.level,
      };

      // 불필요한 속성 제거
      delete finalData.isCustomLevel;
      delete finalData.customLevel;

      onSave(finalData);
    }
  };

  const handleDelete = () => {
    if (
      window.confirm(
        "정말로 이 역할을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
      )
    ) {
      onDelete(formData.id);
    }
  };

  const getModuleIcon = (module) => {
    switch (module) {
      case "patientManagement":
        return <Users size={16} />;
      case "appointments":
        return <Calendar size={16} />;
      case "doctorManagement":
        return <Stethoscope size={16} />;
      case "reports":
        return <FileText size={16} />;
      case "settings":
        return <SettingsIcon size={16} />;
      default:
        return null;
    }
  };

  const getModuleName = (module) => {
    switch (module) {
      case "patientManagement":
        return "환자 관리";
      case "appointments":
        return "예약 관리";
      case "doctorManagement":
        return "의사 관리";
      case "reports":
        return "보고서";
      case "settings":
        return "설정";
      default:
        return module;
    }
  };

  // 현재 선택된 레벨에 따른 라벨 표시
  const getCurrentLevelLabel = () => {
    if (formData.isCustomLevel) {
      return "커스텀 권한 레벨";
    }

    const selectedLevel = predefinedLevels.find(
      (level) => level.value === formData.level
    );
    return selectedLevel ? selectedLevel.label : "접수 담당자";
  };

  return (
    <div
      className="role-modal-overlay"
      onClick={(e) => e.target.className === "role-modal-overlay" && onClose()}
    >
      <div className="role-modal" onClick={(e) => e.stopPropagation()}>
        <div className="role-modal-header">
          <h2>{isNew ? "새 역할 추가" : "역할 편집"}</h2>
          <button className="modal-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="role-modal-form">
          <div className="role-section">
            <h3 className="role-section-title">기본 정보</h3>

            <div className="role-form-group">
              <label htmlFor="name" className="role-form-label">
                역할 이름 <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="role-form-input"
                placeholder="예: 의사 보조, 수간호사, 행정 담당자"
                style={{ boxSizing: "border-box" }}
              />
              {errors.name && (
                <div className="error-message">{errors.name}</div>
              )}
            </div>

            <div className="role-form-group">
              <label htmlFor="description" className="role-form-label">
                설명
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="role-form-input"
                placeholder="역할에 대한 간단한 설명"
                style={{ boxSizing: "border-box" }}
              />
            </div>

            <div className="role-form-group">
              <label htmlFor="level" className="role-form-label">
                권한 레벨
              </label>
              <div className="level-selection">
                <select
                  id="level"
                  name="level"
                  value={formData.isCustomLevel ? "custom" : formData.level}
                  onChange={handleChange}
                  className="role-form-select"
                  disabled={!isNew && originalLevel === "full"}
                  style={{ boxSizing: "border-box" }}
                >
                  {predefinedLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                  <option value="custom">커스텀 권한 레벨 생성</option>
                </select>

                {showCustomLevelInput && (
                  <div className="custom-level-container">
                    <label htmlFor="customLevel" className="role-form-label">
                      커스텀 레벨 이름 <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="customLevel"
                      name="customLevel"
                      value={formData.customLevel}
                      onChange={handleChange}
                      className="role-form-input"
                      placeholder="예: 주니어 의사, 실습 간호사"
                      style={{ boxSizing: "border-box" }}
                    />
                    {errors.customLevel && (
                      <div className="error-message">{errors.customLevel}</div>
                    )}
                  </div>
                )}
              </div>
              <div className="role-form-help">
                권한 레벨에 따라 기본 권한이 설정됩니다. 아래에서 개별 권한을
                조정할 수 있습니다.
                {formData.isCustomLevel &&
                  " 커스텀 권한 레벨을 사용하면 모든 권한을 직접 설정할 수 있습니다."}
              </div>
            </div>
          </div>

          <div className="role-section">
            <h3 className="role-section-title">모듈별 권한</h3>

            <div className="permission-matrix">
              <div className="permission-matrix-header">
                <div className="permission-module-cell">모듈</div>
                <div className="permission-type-cell">조회</div>
                <div className="permission-type-cell">편집</div>
              </div>

              {Object.keys(formData.permissions).map((module) => (
                <div className="permission-matrix-row" key={module}>
                  <div className="permission-module-cell">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      {getModuleIcon(module)}
                      <span>{getModuleName(module)}</span>
                    </div>
                  </div>
                  <div className="permission-switch-cell">
                    <label className="permission-switch">
                      <input
                        type="checkbox"
                        checked={formData.permissions[module].view}
                        onChange={() => handlePermissionChange(module, "view")}
                        disabled={formData.level === "full"}
                        style={{ boxSizing: "border-box" }}
                      />
                      <span className="permission-slider"></span>
                    </label>
                  </div>
                  <div className="permission-switch-cell">
                    <label className="permission-switch">
                      <input
                        type="checkbox"
                        checked={formData.permissions[module].edit}
                        onChange={() => handlePermissionChange(module, "edit")}
                        disabled={
                          formData.level === "full" ||
                          !formData.permissions[module].view
                        }
                        style={{ boxSizing: "border-box" }}
                      />
                      <span className="permission-slider"></span>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="role-form-help" style={{ marginTop: "0.75rem" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <ShieldCheck size={16} color="#3b82f6" />
                <span>조회 권한이 없으면 편집 권한도 사용할 수 없습니다.</span>
              </div>
            </div>
          </div>

          <div className="role-modal-footer">
            {!isNew && formData.level !== "full" && (
              <button
                type="button"
                className="delete-button"
                onClick={handleDelete}
              >
                <Trash2 size={16} />
                역할 삭제
              </button>
            )}
            <button type="button" className="cancel-button" onClick={onClose}>
              취소
            </button>
            <button type="submit" className="save-button">
              <Save size={16} />
              {isNew ? "역할 추가" : "변경사항 저장"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleEditModal;
