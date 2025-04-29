import React, { useState, useEffect } from "react";
import {
  X,
  Package,
  DollarSign,
  Percent,
  Clock,
  Scissors,
  Check,
  Plus,
  Trash2,
  Calendar,
  Star,
  ShoppingBag,
} from "lucide-react";
import "./PackageModal.css";

const PackageModal = ({
  package: packageData,
  onClose,
  onSave,
  categories,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    includedProcedures: [],
    includedServices: [],
    individualPrice: "",
    packagePrice: "",
    discountRate: "",
    description: "",
    validityPeriod: 90,
    status: "active",
    isFeatured: false,
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [newProcedure, setNewProcedure] = useState("");
  const [newService, setNewService] = useState("");
  const [procedureOptions, setProcedureOptions] = useState([]);

  const commonServices = [
    "상담",
    "사후관리",
    "마취",
    "입원",
    "영양제",
    "전담 간호사",
    "전담 의료진",
    "VIP 서비스",
  ];

  // 시술 옵션 생성 (실제로는 DB에서 가져와야 함)
  const generateProcedureOptions = (category) => {
    const procedures = {
      "안면 패키지": [
        "안면거상술",
        "이마거상술",
        "광대축소술",
        "사각턱 축소술",
      ],
      "코 성형 패키지": ["코 필러", "콧대높임", "코 재수술", "비중격 교정"],
      "눈 성형 패키지": [
        "쌍꺼풀 수술",
        "눈매교정",
        "안검하수 교정",
        "눈밑지방 재배치",
      ],
      "지방 패키지": [
        "얼굴 지방이식",
        "가슴 지방이식",
        "복부 지방흡입",
        "허벅지 지방흡입",
      ],
      "가슴 성형 패키지": ["가슴 확대", "가슴 축소", "가슴 리프팅"],
      "안티에이징 패키지": [
        "프락셀 레이저",
        "울쎄라",
        "써마지",
        "안티에이징 관리",
      ],
      "보톡스/필러 패키지": [
        "이마 보톡스",
        "팔자 필러",
        "입술 필러",
        "턱 보톡스",
      ],
      "레이저 패키지": [
        "레이저 토닝",
        "CO2 레이저",
        "색소 레이저",
        "여드름 레이저",
      ],
      "윤곽 패키지": [
        "V라인 성형",
        "안면윤곽 3종",
        "양악수술",
        "사각턱 보톡스",
      ],
      "신혼 패키지": ["쁘띠 성형", "피부 관리", "보톡스", "필러"],
      "VIP 패키지": ["맞춤형 성형", "프리미엄 관리"],
    };

    return procedures[category] || [];
  };

  useEffect(() => {
    if (packageData) {
      setFormData({
        name: packageData.name || "",
        category: packageData.category || "",
        includedProcedures: packageData.includedProcedures || [],
        includedServices: packageData.includedServices || [],
        individualPrice: packageData.individualPrice || "",
        packagePrice: packageData.packagePrice || "",
        discountRate: packageData.discountRate || "",
        description: packageData.description || "",
        validityPeriod: packageData.validityPeriod || 90,
        status: packageData.status || "active",
        isFeatured: packageData.isFeatured || false,
      });

      if (packageData.category) {
        setProcedureOptions(generateProcedureOptions(packageData.category));
      }

      setIsEditing(true);
    }
  }, [packageData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // 가격 변경 처리
    if (name === "individualPrice" || name === "discountRate") {
      updatePackagePrice(
        name === "individualPrice" ? value : formData.individualPrice,
        name === "discountRate" ? value : formData.discountRate
      );
    }

    // 카테고리 변경 시 시술 옵션 업데이트
    if (name === "category") {
      setProcedureOptions(generateProcedureOptions(value));
    }

    // 에러 메시지 초기화
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const updatePackagePrice = (individualPrice, discountRate) => {
    if (individualPrice && discountRate) {
      const price = Number(individualPrice);
      const discount = Number(discountRate);

      if (
        !isNaN(price) &&
        !isNaN(discount) &&
        price > 0 &&
        discount >= 0 &&
        discount <= 100
      ) {
        const discountedPrice =
          Math.round((price * (1 - discount / 100)) / 10000) * 10000;
        setFormData((prev) => ({
          ...prev,
          packagePrice: discountedPrice,
        }));
      }
    }
  };

  const handleProcedureChange = (e) => {
    setNewProcedure(e.target.value);
  };

  const handleAddProcedure = () => {
    if (newProcedure && !formData.includedProcedures.includes(newProcedure)) {
      setFormData({
        ...formData,
        includedProcedures: [...formData.includedProcedures, newProcedure],
      });
      setNewProcedure("");
    }
  };

  const handleRemoveProcedure = (procedure) => {
    setFormData({
      ...formData,
      includedProcedures: formData.includedProcedures.filter(
        (p) => p !== procedure
      ),
    });
  };

  const handleServiceChange = (e) => {
    setNewService(e.target.value);
  };

  const handleAddService = () => {
    if (newService && !formData.includedServices.includes(newService)) {
      setFormData({
        ...formData,
        includedServices: [...formData.includedServices, newService],
      });
      setNewService("");
    }
  };

  const handleRemoveService = (service) => {
    setFormData({
      ...formData,
      includedServices: formData.includedServices.filter((s) => s !== service),
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "패키지명을 입력해주세요";
    }

    if (!formData.category) {
      newErrors.category = "카테고리를 선택해주세요";
    }

    if (formData.includedProcedures.length === 0) {
      newErrors.includedProcedures = "최소 1개 이상의 시술을 추가해주세요";
    }

    if (!formData.individualPrice) {
      newErrors.individualPrice = "개별 가격을 입력해주세요";
    } else if (
      isNaN(formData.individualPrice) ||
      Number(formData.individualPrice) <= 0
    ) {
      newErrors.individualPrice = "유효한 가격을 입력해주세요";
    }

    if (!formData.discountRate) {
      newErrors.discountRate = "할인율을 입력해주세요";
    } else if (
      isNaN(formData.discountRate) ||
      Number(formData.discountRate) < 0 ||
      Number(formData.discountRate) > 90
    ) {
      newErrors.discountRate = "0%에서 90% 사이의 할인율을 입력해주세요";
    }

    if (!formData.description.trim()) {
      newErrors.description = "패키지 설명을 입력해주세요";
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
        individualPrice: Number(formData.individualPrice),
        packagePrice: Number(formData.packagePrice),
        discountRate: Number(formData.discountRate),
        validityPeriod: Number(formData.validityPeriod),
      };

      onSave(processedData);
    }
  };

  // 가격 포맷 함수
  const formatPrice = (price) => {
    if (!price) return "";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
  };

  return (
    <div className="package-modal-overlay">
      <div className="package-modal">
        <div className="package-modal-header">
          <h2 className="package-modal-title">
            {isEditing ? "패키지 정보 수정" : "새 패키지 생성"}
          </h2>
          <button className="package-modal-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="package-modal-form">
          <div className="package-modal-content">
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  패키지명 <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? "error" : ""}`}
                  placeholder="예: VIP 안면 패키지 프리미엄"
                />
                {errors.name && (
                  <div className="error-message">{errors.name}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="category" className="form-label">
                  카테고리 <span className="required">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`form-select ${errors.category ? "error" : ""}`}
                >
                  <option value="">카테고리 선택</option>
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

              <div className="form-divider"></div>

              <div className="form-group">
                <label htmlFor="includedProcedures" className="form-label">
                  포함 시술 <span className="required">*</span>
                </label>
                <div className="input-with-button">
                  <select
                    id="newProcedure"
                    value={newProcedure}
                    onChange={handleProcedureChange}
                    className="form-select"
                  >
                    <option value="">시술 선택</option>
                    {procedureOptions.map((procedure, index) => (
                      <option key={index} value={procedure}>
                        {procedure}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="add-button"
                    onClick={handleAddProcedure}
                    disabled={!newProcedure}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {errors.includedProcedures && (
                  <div className="error-message">
                    {errors.includedProcedures}
                  </div>
                )}

                {formData.includedProcedures.length > 0 && (
                  <div className="items-list">
                    {formData.includedProcedures.map((procedure, index) => (
                      <div key={index} className="list-item">
                        <div className="item-content">
                          <Scissors size={14} />
                          <span>{procedure}</span>
                        </div>
                        <button
                          type="button"
                          className="remove-button"
                          onClick={() => handleRemoveProcedure(procedure)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="includedServices" className="form-label">
                  포함 서비스
                </label>
                <div className="input-with-button">
                  <select
                    id="newService"
                    value={newService}
                    onChange={handleServiceChange}
                    className="form-select"
                  >
                    <option value="">서비스 선택</option>
                    {commonServices.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="add-button"
                    onClick={handleAddService}
                    disabled={!newService}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {formData.includedServices.length > 0 && (
                  <div className="items-list">
                    {formData.includedServices.map((service, index) => (
                      <div key={index} className="list-item">
                        <div className="item-content">
                          <Check size={14} />
                          <span>{service}</span>
                        </div>
                        <button
                          type="button"
                          className="remove-button"
                          onClick={() => handleRemoveService(service)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="form-column">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="individualPrice" className="form-label">
                    개별 가격 (원) <span className="required">*</span>
                  </label>
                  <div className="input-with-icon">
                    <DollarSign size={16} className="input-icon" />
                    <input
                      type="number"
                      id="individualPrice"
                      name="individualPrice"
                      value={formData.individualPrice}
                      onChange={handleChange}
                      min="0"
                      className={`form-input ${
                        errors.individualPrice ? "error" : ""
                      }`}
                      placeholder="예: 5000000"
                    />
                  </div>
                  {errors.individualPrice && (
                    <div className="error-message">
                      {errors.individualPrice}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="discountRate" className="form-label">
                    할인율 (%) <span className="required">*</span>
                  </label>
                  <div className="input-with-icon">
                    <Percent size={16} className="input-icon" />
                    <input
                      type="number"
                      id="discountRate"
                      name="discountRate"
                      value={formData.discountRate}
                      onChange={handleChange}
                      min="0"
                      max="90"
                      className={`form-input ${
                        errors.discountRate ? "error" : ""
                      }`}
                      placeholder="예: 20"
                    />
                  </div>
                  {errors.discountRate && (
                    <div className="error-message">{errors.discountRate}</div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="packagePrice" className="form-label">
                  패키지 가격 (원)
                </label>
                <div className="package-price-display">
                  {formData.packagePrice
                    ? formatPrice(formData.packagePrice)
                    : "할인 가격이 여기에 표시됩니다"}
                </div>
                <div className="form-help">
                  할인 가격은 자동으로 계산됩니다. 개별 가격과 할인율을 입력하면
                  패키지 가격이 계산됩니다.
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="validityPeriod" className="form-label">
                  유효기간 (일)
                </label>
                <div className="input-with-icon">
                  <Clock size={16} className="input-icon" />
                  <select
                    id="validityPeriod"
                    name="validityPeriod"
                    value={formData.validityPeriod}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="30">30일</option>
                    <option value="60">60일</option>
                    <option value="90">90일</option>
                    <option value="180">180일</option>
                    <option value="365">1년 (365일)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="status" className="form-label">
                  판매 상태
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="active">판매중</option>
                  <option value="inactive">판매중지</option>
                  <option value="comingSoon">출시예정</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  패키지 설명 <span className="required">*</span>
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
                  placeholder="패키지에 대한 설명을 입력하세요"
                ></textarea>
                {errors.description && (
                  <div className="error-message">{errors.description}</div>
                )}
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="checkbox-input"
                  />
                  <Star
                    size={16}
                    className={formData.isFeatured ? "text-featured" : ""}
                  />
                  <span>추천 패키지로 표시</span>
                </label>
              </div>
            </div>
          </div>

          <div className="package-modal-preview">
            <h3>패키지 정보 미리보기</h3>
            <div className="preview-content">
              <div className="preview-item">
                <span className="preview-label">패키지명:</span>
                <span className="preview-value">
                  {formData.name || "미입력"}
                </span>
              </div>
              <div className="preview-item">
                <span className="preview-label">카테고리:</span>
                <span className="preview-value">
                  {formData.category || "미선택"}
                </span>
              </div>
              <div className="preview-item">
                <span className="preview-label">가격:</span>
                <span className="preview-value">
                  {formData.packagePrice
                    ? formatPrice(formData.packagePrice)
                    : "미입력"}
                  {formData.discountRate && formData.individualPrice && (
                    <span className="discount-badge">
                      {formData.discountRate}% 할인
                    </span>
                  )}
                </span>
              </div>
              <div className="preview-item">
                <span className="preview-label">포함 시술:</span>
                <span className="preview-value">
                  {formData.includedProcedures.length > 0
                    ? formData.includedProcedures.join(", ")
                    : "미입력"}
                </span>
              </div>
              <div className="preview-item">
                <span className="preview-label">상태:</span>
                <span className="preview-value status-badge">
                  {formData.status === "active"
                    ? "판매중"
                    : formData.status === "inactive"
                    ? "판매중지"
                    : "출시예정"}
                </span>
              </div>
            </div>
          </div>

          <div className="package-modal-footer">
            <button
              type="button"
              className="package-modal-button secondary"
              onClick={onClose}
            >
              취소
            </button>
            <button type="submit" className="package-modal-button primary">
              {isEditing ? "수정 완료" : "등록 완료"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PackageModal;
