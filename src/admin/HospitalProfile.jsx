import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Edit,
  Camera,
  Save,
  X,
  Info,
  AlertCircle,
  CheckCircle,
  FileText,
  User,
  Clock,
} from "lucide-react";
import "./HospitalProfile.css";

const HospitalProfile = ({ hospitalData: initialHospitalData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("basic");
  const [hospitalData, setHospitalData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    address: "",
    detailAddress: "",
    zipCode: "",
    phone: "",
    fax: "",
    emergencyContact: "",
    email: "",
    website: "",
    description: "",
    establishedYear: "",
    licenseNumber: "",
    taxId: "",
    director: {
      name: "",
      qualification: "",
      specialization: "",
    },
    facilities: [],
    insuranceAccepted: [],
    certifications: [],
    workingHours: {
      monday: { open: "09:00", close: "18:00", closed: false },
      tuesday: { open: "09:00", close: "18:00", closed: false },
      wednesday: { open: "09:00", close: "18:00", closed: false },
      thursday: { open: "09:00", close: "18:00", closed: false },
      friday: { open: "09:00", close: "18:00", closed: false },
      saturday: { open: "09:00", close: "13:00", closed: false },
      sunday: { open: "09:00", close: "18:00", closed: true },
    },
    departments: [],
    services: [],
    staff: [],
    gallery: [],
    emergencyServices: false,
    parkingAvailable: false,
    wheelchairAccessible: true,
    languages: ["한국어", "영어"],
    paymentMethods: ["현금", "신용카드", "보험"],
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
      naverBlog: "",
    },
    notices: [],
    documents: [],
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "info",
      message: "프로필 정보가 마지막으로 업데이트된 시간: 2023-10-15 14:30",
    },
    {
      id: 2,
      type: "warning",
      message: "사업자등록번호 인증이 필요합니다.",
    },
  ]);

  useEffect(() => {
    // 데이터 로딩
    const fetchHospitalData = async () => {
      let data = initialHospitalData;

      // props에서 데이터를 받지 않았다면 목업 데이터 생성
      if (!data || Object.keys(data).length < 5) {
        data = {
          id: 1,
          name: "서울 메디컬 센터",
          type: "종합병원",
          address: "서울특별시 강남구 테헤란로 123",
          detailAddress: "메디컬 타워 5층",
          zipCode: "06123",
          phone: "02-1234-5678",
          fax: "02-1234-5679",
          emergencyContact: "02-1234-5680",
          email: "contact@seoulmedical.com",
          website: "www.seoulmedical.com",
          logo: "/images/super_human_icon.png",
          coverImage: "/images/hospitals/hospital1.jpg",
          description:
            "서울 메디컬 센터는 2005년에 설립된, 최첨단 의료 장비와 우수한 의료진을 갖춘 종합병원으로, 환자 중심의 의료 서비스를 제공합니다.",
          establishedYear: "2005",
          licenseNumber: "의료기관-제12345호",
          taxId: "123-45-67890",
          director: {
            name: "김민석",
            qualification: "의학박사, 서울대학교",
            specialization: "내과, 심장학",
          },
          facilities: [
            "MRI 장비",
            "CT 스캐너",
            "초음파 검사실",
            "X-ray 장비",
            "종합검진센터",
            "건강검진실",
            "수술실 4개",
            "입원실 120병상",
            "중환자실",
            "소아 전용 대기실",
          ],
          insuranceAccepted: [
            "국민건강보험",
            "메리츠화재",
            "삼성화재",
            "현대해상",
            "KB손해보험",
            "DB손해보험",
          ],
          certifications: [
            {
              name: "의료기관 인증",
              issuedBy: "보건복지부",
              year: "2021",
              expiry: "2026",
            },
            {
              name: "의료서비스 품질 우수기관",
              issuedBy: "한국의료서비스협회",
              year: "2022",
              expiry: "2024",
            },
          ],
          workingHours: {
            monday: { open: "09:00", close: "18:00", closed: false },
            tuesday: { open: "09:00", close: "18:00", closed: false },
            wednesday: { open: "09:00", close: "18:00", closed: false },
            thursday: { open: "09:00", close: "18:00", closed: false },
            friday: { open: "09:00", close: "18:00", closed: false },
            saturday: { open: "09:00", close: "13:00", closed: false },
            sunday: { open: "09:00", close: "18:00", closed: true },
          },
          departments: [
            {
              id: 1,
              name: "내과",
              description: "일반 내과 질환 진료 및 치료",
              doctorCount: 5,
            },
            {
              id: 2,
              name: "외과",
              description: "외과적 수술 및 처치",
              doctorCount: 4,
            },
            {
              id: 3,
              name: "소아과",
              description: "소아 및 청소년 질환 진료",
              doctorCount: 3,
            },
          ],
          services: [
            {
              id: 1,
              name: "종합 건강검진",
              price: "150,000원~",
              description: "기본적인 건강 상태를 확인하는 종합 검진 서비스",
              duration: "약 2시간",
              preparation: "검사 전 8시간 금식 필요",
            },
            {
              id: 2,
              name: "예방접종",
              price: "30,000원~",
              description: "다양한 질병 예방을 위한 예방접종 서비스",
              duration: "약 30분",
              preparation: "특별한 준비 필요 없음",
            },
          ],
          staff: [
            {
              id: 1,
              name: "김철수",
              position: "내과 의사",
              specialization: "심장내과",
              avatar: "/images/doctors/doctor.jpg",
              qualifications: ["의학박사", "내과 전문의"],
              experience: "15년",
            },
            {
              id: 2,
              name: "이영희",
              position: "소아과 의사",
              specialization: "소아알레르기",
              avatar: "/images/doctors/doctor.jpg",
              qualifications: ["의학박사", "소아과 전문의"],
              experience: "12년",
            },
          ],
          gallery: [
            {
              id: 1,
              url: "/images/hospitals/hospital1.jpg",
              caption: "병원 외관",
              type: "exterior",
            },
            {
              id: 2,
              url: "/images/hospitals/hospital2.jpg",
              caption: "로비",
              type: "interior",
            },
          ],
          emergencyServices: true,
          parkingAvailable: true,
          wheelchairAccessible: true,
          languages: ["한국어", "영어", "중국어"],
          paymentMethods: [
            "현금",
            "신용카드",
            "직불카드",
            "보험",
            "모바일결제",
          ],
          socialLinks: {
            facebook: "https://facebook.com/seoulmedical",
            twitter: "https://twitter.com/seoulmedical",
            instagram: "https://instagram.com/seoulmedical",
            youtube: "https://youtube.com/seoulmedical",
            naverBlog: "https://blog.naver.com/seoulmedical",
          },
          notices: [
            {
              id: 1,
              title: "코로나19 예방접종 안내",
              content:
                "코로나19 예방접종이 가능합니다. 예약을 통해 진행됩니다.",
              date: "2023-09-15",
              important: true,
            },
          ],
          documents: [
            {
              id: 1,
              name: "병원 안내 브로셔.pdf",
              type: "pdf",
              size: "2.4 MB",
              uploadDate: "2023-05-10",
            },
          ],
        };
      }

      // 필수 속성 확인 및 초기값 설정
      if (!data.socialLinks) {
        data.socialLinks = {
          facebook: "",
          twitter: "",
          instagram: "",
          youtube: "",
          naverBlog: "",
        };
      }

      // 모든 필수 속성들 확인
      const defaultData = formData;
      Object.keys(defaultData).forEach((key) => {
        if (data[key] === undefined) {
          data[key] = defaultData[key];
        }
      });

      setHospitalData(data);
      setFormData(data);
      setIsLoading(false);
    };

    fetchHospitalData();
  }, [initialHospitalData]);

  // 이벤트 핸들러들
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // 편집 취소 - 원래 데이터로 복원
      setFormData(hospitalData);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNestedInputChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
    });
  };

  const handleCheckboxChange = (name) => {
    setFormData({
      ...formData,
      [name]: !formData[name],
    });
  };

  const handleWorkingHoursChange = (day, field, value) => {
    setFormData({
      ...formData,
      workingHours: {
        ...formData.workingHours,
        [day]: {
          ...formData.workingHours[day],
          [field]: value,
        },
      },
    });
  };

  const handleClosedToggle = (day) => {
    setFormData({
      ...formData,
      workingHours: {
        ...formData.workingHours,
        [day]: {
          ...formData.workingHours[day],
          closed: !formData.workingHours[day].closed,
        },
      },
    });
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);

    // 실제 앱에서는 API 호출을 통해 데이터를 저장
    setTimeout(() => {
      setHospitalData(formData);
      setIsEditing(false);
      setIsSaving(false);
      setSaveSuccess(true);

      // 알림 추가
      const newNotification = {
        id: Date.now(),
        type: "success",
        message: "프로필 정보가 성공적으로 업데이트되었습니다.",
      };
      setNotifications([newNotification, ...notifications]);

      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1500);
  };

  // 파일 업로드 핸들러
  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          logo: event.target.result,
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCoverChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          coverImage: event.target.result,
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // 부서 및 서비스 관리
  const addDepartment = () => {
    const newDepartment = {
      id: Date.now(),
      name: "새 진료과",
      description: "진료과 설명",
      doctorCount: 0,
    };

    setFormData({
      ...formData,
      departments: [...formData.departments, newDepartment],
    });
  };

  const handleDepartmentChange = (id, field, value) => {
    setFormData({
      ...formData,
      departments: formData.departments.map((dept) =>
        dept.id === id ? { ...dept, [field]: value } : dept
      ),
    });
  };

  const removeDepartment = (id) => {
    setFormData({
      ...formData,
      departments: formData.departments.filter((dept) => dept.id !== id),
    });
  };

  const addService = () => {
    const newService = {
      id: Date.now(),
      name: "새 서비스",
      price: "가격 정보",
      description: "서비스 설명",
      duration: "서비스 시간",
      preparation: "준비 사항",
    };

    setFormData({
      ...formData,
      services: [...formData.services, newService],
    });
  };

  const handleServiceChange = (id, field, value) => {
    setFormData({
      ...formData,
      services: formData.services.map((service) =>
        service.id === id ? { ...service, [field]: value } : service
      ),
    });
  };

  const removeService = (id) => {
    setFormData({
      ...formData,
      services: formData.services.filter((service) => service.id !== id),
    });
  };

  // 직원 관리
  const addStaffMember = () => {
    const newStaff = {
      id: Date.now(),
      name: "새 직원",
      position: "직책",
      specialization: "",
      avatar: "/images/profile.png",
      qualifications: [],
      experience: "",
    };

    setFormData({
      ...formData,
      staff: [...formData.staff, newStaff],
    });
  };

  const handleStaffChange = (id, field, value) => {
    setFormData({
      ...formData,
      staff: formData.staff.map((staff) =>
        staff.id === id ? { ...staff, [field]: value } : staff
      ),
    });
  };

  const removeStaffMember = (id) => {
    setFormData({
      ...formData,
      staff: formData.staff.filter((staff) => staff.id !== id),
    });
  };

  // 갤러리 관리
  const addGalleryImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage = {
          id: Date.now(),
          url: event.target.result,
          caption: "이미지 설명",
          type: "기타",
        };

        setFormData({
          ...formData,
          gallery: [...formData.gallery, newImage],
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleGalleryChange = (id, field, value) => {
    setFormData({
      ...formData,
      gallery: formData.gallery.map((img) =>
        img.id === id ? { ...img, [field]: value } : img
      ),
    });
  };

  const removeGalleryImage = (id) => {
    setFormData({
      ...formData,
      gallery: formData.gallery.filter((img) => img.id !== id),
    });
  };

  // 시설 관리
  const addFacility = () => {
    const newFacility = prompt("시설 또는 장비 이름을 입력하세요");
    if (newFacility && newFacility.trim() !== "") {
      setFormData({
        ...formData,
        facilities: [...formData.facilities, newFacility.trim()],
      });
    }
  };

  const removeFacility = (index) => {
    setFormData({
      ...formData,
      facilities: formData.facilities.filter((_, i) => i !== index),
    });
  };

  // 소셜 링크 관리
  const getSocialLink = (platform) => {
    if (formData && formData.socialLinks && formData.socialLinks[platform]) {
      return formData.socialLinks[platform];
    }
    return "";
  };

  const handleSocialLinkChange = (platform, value) => {
    setFormData({
      ...formData,
      socialLinks: {
        ...formData.socialLinks,
        [platform]: value,
      },
    });
  };

  // 알림 관리
  const dismissNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  if (isLoading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-spinner"></div>
        <p>병원 프로필 데이터 로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="hospital-profile">
      <div className="admin-section-header">
        <h2 className="admin-section-title">병원 프로필</h2>
        <p className="admin-section-description">
          병원 정보를 관리하고 업데이트할 수 있습니다.
        </p>
      </div>

      {/* 알림 메시지 영역 */}
      {notifications.length > 0 && (
        <div className="profile-notifications">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification notification-${notification.type}`}
            >
              <div className="notification-icon">
                {notification.type === "info" && <Info size={18} />}
                {notification.type === "warning" && <AlertCircle size={18} />}
                {notification.type === "success" && <CheckCircle size={18} />}
              </div>
              <div className="notification-content">{notification.message}</div>
              <button
                className="notification-dismiss"
                onClick={() => dismissNotification(notification.id)}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="hospital-profile-header">
        <div className="profile-cover">
          <img
            src={formData.coverImage}
            alt="병원 커버 이미지"
            className="cover-image"
          />
          {isEditing && (
            <>
              <label htmlFor="cover-upload" className="change-cover-button">
                <Camera size={16} />
                <span>커버 이미지 변경</span>
              </label>
              <input
                type="file"
                id="cover-upload"
                accept="image/*"
                onChange={handleCoverChange}
                style={{ display: "none" }}
              />
            </>
          )}
        </div>

        <div className="profile-info">
          <div className="profile-logo">
            <img src={formData.logo} alt="병원 로고" className="logo-image" />
            {isEditing && (
              <>
                <label htmlFor="logo-upload" className="change-logo-button">
                  <Camera size={16} />
                </label>
                <input
                  type="file"
                  id="logo-upload"
                  accept="image/*"
                  onChange={handleLogoChange}
                  style={{ display: "none" }}
                />
              </>
            )}
          </div>

          <div className="profile-details">
            <h1 className="hospital-name">{formData.name}</h1>
            <div className="hospital-type">{formData.type}</div>
            <div className="hospital-contact">
              <div className="contact-item">
                <MapPin size={16} />
                <span>{formData.address}</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>{formData.phone}</span>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <span>{formData.email}</span>
              </div>
              {formData.website && (
                <div className="contact-item">
                  <Globe size={16} />
                  <span>{formData.website}</span>
                </div>
              )}
            </div>
          </div>

          <div className="profile-actions">
            <button
              className="profile-action-button"
              onClick={handleEditToggle}
            >
              {isEditing ? (
                <>
                  <X size={16} />
                  <span>취소</span>
                </>
              ) : (
                <>
                  <Edit size={16} />
                  <span>편집</span>
                </>
              )}
            </button>
            {isEditing && (
              <button
                className="profile-action-button primary"
                onClick={handleSaveProfile}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <div className="spinner"></div>
                    <span>저장 중...</span>
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span>저장</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 여기에 탭 메뉴와 내용 렌더링 코드 */}
      <div className="profile-tabs">
        <div
          className={`profile-tab ${activeTab === "basic" ? "active" : ""}`}
          onClick={() => handleTabChange("basic")}
        >
          기본 정보
        </div>
        <div
          className={`profile-tab ${
            activeTab === "departments" ? "active" : ""
          }`}
          onClick={() => handleTabChange("departments")}
        >
          진료과
        </div>
        <div
          className={`profile-tab ${activeTab === "services" ? "active" : ""}`}
          onClick={() => handleTabChange("services")}
        >
          서비스
        </div>
        <div
          className={`profile-tab ${activeTab === "staff" ? "active" : ""}`}
          onClick={() => handleTabChange("staff")}
        >
          의료진
        </div>
        <div
          className={`profile-tab ${activeTab === "gallery" ? "active" : ""}`}
          onClick={() => handleTabChange("gallery")}
        >
          갤러리
        </div>
      </div>

      {/* 기본 정보 탭 */}
      {activeTab === "basic" && (
        <div className="profile-section">
          <div className="profile-section-header">
            <h3 className="profile-section-title">기본 정보</h3>
            {saveSuccess && (
              <div className="save-success">
                <CheckCircle size={16} />
                <span>성공적으로 저장되었습니다</span>
              </div>
            )}
          </div>
          <div className="profile-section-content">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  병원명 <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  병원 유형 <span className="required">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                주소 <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">상세 주소</label>
                <input
                  type="text"
                  className="form-input"
                  name="detailAddress"
                  value={formData.detailAddress}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label className="form-label">우편번호</label>
                <input
                  type="text"
                  className="form-input"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  전화번호 <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  className="form-input"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">팩스번호</label>
                <input
                  type="tel"
                  className="form-input"
                  name="fax"
                  value={formData.fax}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">응급연락처</label>
                <input
                  type="tel"
                  className="form-input"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  이메일 <span className="required">*</span>
                </label>
                <input
                  type="email"
                  className="form-input"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">웹사이트</label>
              <input
                type="url"
                className="form-input"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <div className="form-group">
              <label className="form-label">병원 소개</label>
              <textarea
                className="form-input"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows="4"
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">설립년도</label>
                <input
                  type="text"
                  className="form-input"
                  name="establishedYear"
                  value={formData.establishedYear}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label className="form-label">의료기관 허가번호</label>
                <input
                  type="text"
                  className="form-input"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">사업자등록번호</label>
              <input
                type="text"
                className="form-input"
                name="taxId"
                value={formData.taxId}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            {/* 병원장 정보 섹션 */}
            <h4 className="form-section-title">병원장 정보</h4>
            <div className="form-group">
              <label className="form-label">이름</label>
              <input
                type="text"
                className="form-input"
                value={formData.director.name}
                onChange={(e) =>
                  handleNestedInputChange("director", "name", e.target.value)
                }
                disabled={!isEditing}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">자격/학력</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.director.qualification}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "director",
                      "qualification",
                      e.target.value
                    )
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label className="form-label">전문분야</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.director.specialization}
                  onChange={(e) =>
                    handleNestedInputChange(
                      "director",
                      "specialization",
                      e.target.value
                    )
                  }
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* 추가 옵션 섹션 */}
            <h4 className="form-section-title">추가 옵션</h4>
            <div className="options-group">
              <div className="option-item">
                <input
                  type="checkbox"
                  id="emergencyServices"
                  checked={formData.emergencyServices}
                  onChange={() => handleCheckboxChange("emergencyServices")}
                  disabled={!isEditing}
                />
                <label htmlFor="emergencyServices">응급 서비스 제공</label>
              </div>

              <div className="option-item">
                <input
                  type="checkbox"
                  id="parkingAvailable"
                  checked={formData.parkingAvailable}
                  onChange={() => handleCheckboxChange("parkingAvailable")}
                  disabled={!isEditing}
                />
                <label htmlFor="parkingAvailable">주차 시설 있음</label>
              </div>

              <div className="option-item">
                <input
                  type="checkbox"
                  id="wheelchairAccessible"
                  checked={formData.wheelchairAccessible}
                  onChange={() => handleCheckboxChange("wheelchairAccessible")}
                  disabled={!isEditing}
                />
                <label htmlFor="wheelchairAccessible">휠체어 접근 가능</label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 진료과 탭 */}
      {activeTab === "departments" && (
        <div className="profile-section">
          <div className="profile-section-header">
            <h3 className="profile-section-title">진료과 관리</h3>
            {isEditing && (
              <button className="profile-action-button" onClick={addDepartment}>
                <span>진료과 추가</span>
              </button>
            )}
          </div>
          <div className="profile-section-content">
            {formData.departments.length > 0 ? (
              <div className="departments-grid">
                {formData.departments.map((dept) => (
                  <div key={dept.id} className="department-card">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          className="form-input"
                          value={dept.name}
                          onChange={(e) =>
                            handleDepartmentChange(
                              dept.id,
                              "name",
                              e.target.value
                            )
                          }
                          placeholder="진료과 이름"
                          style={{ marginBottom: "0.5rem" }}
                        />
                        <textarea
                          className="form-input"
                          value={dept.description}
                          onChange={(e) =>
                            handleDepartmentChange(
                              dept.id,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="진료과 설명"
                          rows="3"
                          style={{ marginBottom: "0.5rem" }}
                        ></textarea>
                        <div className="form-row">
                          <input
                            type="number"
                            className="form-input"
                            value={dept.doctorCount}
                            onChange={(e) =>
                              handleDepartmentChange(
                                dept.id,
                                "doctorCount",
                                parseInt(e.target.value) || 0
                              )
                            }
                            placeholder="의사 수"
                            min="0"
                          />
                          <button
                            className="profile-action-button"
                            onClick={() => removeDepartment(dept.id)}
                            style={{ marginLeft: "0.5rem" }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <h4 className="department-name">{dept.name}</h4>
                        <p className="department-description">
                          {dept.description}
                        </p>
                        <div className="department-meta">
                          <div className="department-doctors">
                            <User size={14} />
                            <span>의사 {dept.doctorCount}명</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <Stethoscope size={24} />
                </div>
                <h4>진료과 정보가 없습니다</h4>
                <p>
                  병원의 진료과 정보를 추가하여 환자들에게 더 많은 정보를
                  제공하세요.
                </p>
                {isEditing && (
                  <button
                    className="profile-action-button"
                    onClick={addDepartment}
                  >
                    진료과 추가
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 서비스 탭 */}
      {activeTab === "services" && (
        <div className="profile-section">
          <div className="profile-section-header">
            <h3 className="profile-section-title">서비스 관리</h3>
            {isEditing && (
              <button className="profile-action-button" onClick={addService}>
                <span>서비스 추가</span>
              </button>
            )}
          </div>
          <div className="profile-section-content">
            {formData.services.length > 0 ? (
              <div className="service-grid">
                {formData.services.map((service) => (
                  <div key={service.id} className="service-card">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          className="form-input"
                          value={service.name}
                          onChange={(e) =>
                            handleServiceChange(
                              service.id,
                              "name",
                              e.target.value
                            )
                          }
                          placeholder="서비스 이름"
                          style={{ marginBottom: "0.5rem" }}
                        />
                        <input
                          type="text"
                          className="form-input"
                          value={service.price}
                          onChange={(e) =>
                            handleServiceChange(
                              service.id,
                              "price",
                              e.target.value
                            )
                          }
                          placeholder="가격 정보"
                          style={{ marginBottom: "0.5rem" }}
                        />
                        <textarea
                          className="form-input"
                          value={service.description}
                          onChange={(e) =>
                            handleServiceChange(
                              service.id,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="서비스 설명"
                          rows="3"
                          style={{ marginBottom: "0.5rem" }}
                        ></textarea>
                        <div className="form-row">
                          <input
                            type="text"
                            className="form-input"
                            value={service.duration}
                            onChange={(e) =>
                              handleServiceChange(
                                service.id,
                                "duration",
                                e.target.value
                              )
                            }
                            placeholder="서비스 시간"
                            style={{ marginBottom: "0.5rem" }}
                          />
                        </div>
                        <div className="form-row">
                          <input
                            type="text"
                            className="form-input"
                            value={service.preparation}
                            onChange={(e) =>
                              handleServiceChange(
                                service.id,
                                "preparation",
                                e.target.value
                              )
                            }
                            placeholder="준비 사항"
                          />
                          <button
                            className="profile-action-button"
                            onClick={() => removeService(service.id)}
                            style={{ marginLeft: "0.5rem" }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <h4 className="service-name">{service.name}</h4>
                        <div className="service-price">{service.price}</div>
                        <p className="service-description">
                          {service.description}
                        </p>
                        <div className="service-meta">
                          <div className="service-meta-item">
                            <Clock size={14} />
                            <span>{service.duration}</span>
                          </div>
                          <div className="service-meta-item">
                            <Info size={14} />
                            <span>{service.preparation}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <FileText size={24} />
                </div>
                <h4>서비스 정보가 없습니다</h4>
                <p>
                  병원에서 제공하는 서비스 정보를 추가하여 환자들에게 더 많은
                  정보를 제공하세요.
                </p>
                {isEditing && (
                  <button
                    className="profile-action-button"
                    onClick={addService}
                  >
                    서비스 추가
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "staff" && (
        <div className="profile-section">
          <div className="profile-section-header">
            <h3 className="profile-section-title">의료진 관리</h3>
            {isEditing && (
              <button
                className="profile-action-button"
                onClick={addStaffMember}
              >
                <span>의료진 추가</span>
              </button>
            )}
          </div>
          <div className="profile-section-content">
            {formData.staff.length > 0 ? (
              <div className="staff-grid">
                {formData.staff.map((staff) => (
                  <div key={staff.id} className="staff-card">
                    {isEditing ? (
                      <>
                        <div className="staff-header">
                          <img
                            src={staff.avatar}
                            alt={staff.name}
                            className="staff-avatar"
                          />
                          <div>
                            <input
                              type="text"
                              className="form-input"
                              value={staff.name}
                              onChange={(e) =>
                                handleStaffChange(
                                  staff.id,
                                  "name",
                                  e.target.value
                                )
                              }
                              placeholder="이름"
                              style={{ marginBottom: "0.5rem" }}
                            />
                            <input
                              type="text"
                              className="form-input"
                              value={staff.position}
                              onChange={(e) =>
                                handleStaffChange(
                                  staff.id,
                                  "position",
                                  e.target.value
                                )
                              }
                              placeholder="직책"
                            />
                          </div>
                        </div>
                        <input
                          type="text"
                          className="form-input"
                          value={staff.specialization}
                          onChange={(e) =>
                            handleStaffChange(
                              staff.id,
                              "specialization",
                              e.target.value
                            )
                          }
                          placeholder="전문 분야"
                          style={{ marginBottom: "0.5rem" }}
                        />
                        <input
                          type="text"
                          className="form-input"
                          value={staff.experience}
                          onChange={(e) =>
                            handleStaffChange(
                              staff.id,
                              "experience",
                              e.target.value
                            )
                          }
                          placeholder="경력"
                          style={{ marginBottom: "0.5rem" }}
                        />
                        <div className="form-row">
                          <input
                            type="text"
                            className="form-input"
                            value={staff.qualifications.join(", ")}
                            onChange={(e) =>
                              handleStaffChange(
                                staff.id,
                                "qualifications",
                                e.target.value.split(",").map((q) => q.trim())
                              )
                            }
                            placeholder="자격/학위 (쉼표로 구분)"
                          />
                          <button
                            className="profile-action-button"
                            onClick={() => removeStaffMember(staff.id)}
                            style={{ marginLeft: "0.5rem" }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="staff-header">
                          <img
                            src={staff.avatar}
                            alt={staff.name}
                            className="staff-avatar"
                          />
                          <div>
                            <h4 className="staff-name">{staff.name}</h4>
                            <p className="staff-position">{staff.position}</p>
                            <p className="staff-specialization">
                              {staff.specialization}
                            </p>
                          </div>
                        </div>
                        <div className="tag-container">
                          {staff.qualifications.map((qualification, index) => (
                            <span key={index} className="tag-item">
                              {qualification}
                            </span>
                          ))}
                        </div>
                        <div className="staff-meta">
                          <div className="staff-meta-item">
                            <span>경력: {staff.experience}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <User size={24} />
                </div>
                <h4>의료진 정보가 없습니다</h4>
                <p>
                  병원의 의료진 정보를 추가하여 환자들에게 더 많은 정보를
                  제공하세요.
                </p>
                {isEditing && (
                  <button
                    className="profile-action-button"
                    onClick={addStaffMember}
                  >
                    의료진 추가
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "gallery" && (
        <div className="profile-section">
          <div className="profile-section-header">
            <h3 className="profile-section-title">갤러리 관리</h3>
            {isEditing && (
              <>
                <label
                  htmlFor="gallery-upload"
                  className="profile-action-button"
                >
                  <span>이미지 추가</span>
                </label>
                <input
                  type="file"
                  id="gallery-upload"
                  accept="image/*"
                  onChange={addGalleryImage}
                  style={{ display: "none" }}
                />
              </>
            )}
          </div>
          <div className="profile-section-content">
            {formData.gallery.length > 0 ? (
              <div className="gallery-grid">
                {formData.gallery.map((image) => (
                  <div key={image.id} className="gallery-item">
                    <img
                      src={image.url}
                      alt={image.caption}
                      className="gallery-image"
                    />
                    {isEditing ? (
                      <div className="gallery-edit">
                        <input
                          type="text"
                          className="form-input"
                          value={image.caption}
                          onChange={(e) =>
                            handleGalleryChange(
                              image.id,
                              "caption",
                              e.target.value
                            )
                          }
                          placeholder="이미지 설명"
                          style={{ marginBottom: "0.5rem" }}
                        />
                        <div className="form-row">
                          <input
                            type="text"
                            className="form-input"
                            value={image.type}
                            onChange={(e) =>
                              handleGalleryChange(
                                image.id,
                                "type",
                                e.target.value
                              )
                            }
                            placeholder="이미지 유형"
                          />
                          <button
                            className="profile-action-button"
                            onClick={() => removeGalleryImage(image.id)}
                            style={{ marginLeft: "0.5rem" }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="gallery-caption">
                        <span>{image.caption}</span>
                        <small>{image.type}</small>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <Camera size={24} />
                </div>
                <h4>갤러리 이미지가 없습니다</h4>
                <p>
                  병원의 내/외부 이미지를 추가하여 환자들에게 더 많은 정보를
                  제공하세요.
                </p>
                {isEditing && (
                  <>
                    <label
                      htmlFor="gallery-upload-empty"
                      className="profile-action-button"
                    >
                      이미지 추가
                    </label>
                    <input
                      type="file"
                      id="gallery-upload-empty"
                      accept="image/*"
                      onChange={addGalleryImage}
                      style={{ display: "none" }}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HospitalProfile;
