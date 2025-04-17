import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "./App";
import {
  MessageCircle,
  Phone,
  Mail,
  HelpCircle,
  MessageSquare,
  Clock,
  AlertCircle,
  FileText,
  ChevronRight,
} from "lucide-react";
import "./SettingsPages.css";

const CustomerService = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    content: "",
    email: "",
    phone: "",
    attachFile: null,
  });
  const [activeTab, setActiveTab] = useState("contact"); // contact 또는 inquiry

  const handleBackClick = () => {
    navigate(-1);
  };

  // 입력 필드 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 파일 업로드 핸들러
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      attachFile: e.target.files[0],
    });
  };

  // 문의하기 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    // 실제 구현 시에는 API 호출하여 문의 접수
    alert("문의가 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.");
    // 폼 초기화
    setFormData({
      category: "",
      title: "",
      content: "",
      email: "",
      phone: "",
      attachFile: null,
    });
  };

  // 필수 입력 필드 검증
  const isFormValid = () => {
    return (
      formData.category && formData.title && formData.content && formData.email
    );
  };

  return (
    <div className="container">
      <div className="fixed-header">
        <PageHeader
          title="고객센터"
          backButtonVisible={true}
          onBack={handleBackClick}
        />
      </div>

      <div className="settings-content">
        {/* 탭 메뉴 */}
        <div className="appointment-tabs">
          <button
            className={`appointment-tab ${
              activeTab === "contact" ? "active" : ""
            }`}
            onClick={() => setActiveTab("contact")}
          >
            고객센터 안내
          </button>
          <button
            className={`appointment-tab ${
              activeTab === "inquiry" ? "active" : ""
            }`}
            onClick={() => setActiveTab("inquiry")}
          >
            1:1 문의하기
          </button>
        </div>

        {activeTab === "contact" && (
          <>
            {/* 자주 묻는 질문 바로가기 */}
            <div
              className="customer-service-option"
              onClick={() => navigate("/faq")}
            >
              <div className="customer-service-title">
                <HelpCircle size={20} color="#4f46e5" />
                자주 묻는 질문 (FAQ)
              </div>
              <div className="customer-service-description">
                자주 묻는 질문들을 모아놓았습니다. 궁금한 내용을 빠르게
                확인해보세요.
              </div>
            </div>

            {/* 1:1 문의하기 바로가기 */}
            <div
              className="customer-service-option"
              onClick={() => setActiveTab("inquiry")}
            >
              <div className="customer-service-title">
                <MessageSquare size={20} color="#4f46e5" />
                1:1 문의하기
              </div>
              <div className="customer-service-description">
                궁금한 내용이나 문제가 있으시면 1:1 문의를 통해 빠르게 답변
                받으세요.
              </div>
            </div>

            {/* 고객센터 연락처 정보 */}
            <div className="customer-service-contact">
              <h3 className="contact-title">고객센터 연락처</h3>

              <div className="contact-item">
                <div className="contact-icon">
                  <Phone size={20} />
                </div>
                <div className="contact-info">
                  <div className="contact-label">고객센터 전화</div>
                  <div className="contact-value">1588-1234</div>
                  <div className="contact-hours">
                    평일 09:00 - 18:00 (주말, 공휴일 휴무)
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Mail size={20} />
                </div>
                <div className="contact-info">
                  <div className="contact-label">이메일 문의</div>
                  <div className="contact-value">help@example.com</div>
                  <div className="contact-hours">
                    24시간 접수 가능 (답변은 영업일 기준)
                  </div>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <Clock size={20} />
                </div>
                <div className="contact-info">
                  <div className="contact-label">채팅 상담</div>
                  <div className="contact-value">앱 내 채팅 상담</div>
                  <div className="contact-hours">
                    평일 09:00 - 18:00 (주말, 공휴일 휴무)
                  </div>
                </div>
              </div>
            </div>

            {/* 공지사항 바로가기 */}
            <div
              className="customer-service-option"
              style={{ marginTop: "1rem" }}
              onClick={() => navigate("/terms")}
            >
              <div className="customer-service-title">
                <AlertCircle size={20} color="#4f46e5" />
                공지사항
                <ChevronRight size={18} style={{ marginLeft: "auto" }} />
              </div>
            </div>

            {/* 약관 및 정책 바로가기 */}
            <div
              className="customer-service-option"
              onClick={() => navigate("/terms")}
            >
              <div className="customer-service-title">
                <FileText size={20} color="#4f46e5" />
                이용약관
                <ChevronRight size={18} style={{ marginLeft: "auto" }} />
              </div>
            </div>

            <div
              className="customer-service-option"
              onClick={() => navigate("/privacy")}
            >
              <div className="customer-service-title">
                <FileText size={20} color="#4f46e5" />
                개인정보처리방침
                <ChevronRight size={18} style={{ marginLeft: "auto" }} />
              </div>
            </div>
          </>
        )}

        {activeTab === "inquiry" && (
          <div className="settings-card">
            <h3 className="settings-section-title">
              <MessageCircle size={18} />
              1:1 문의하기
            </h3>

            <form className="profile-info-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="category" className="form-label">
                  문의 유형 *
                </label>
                <select
                  id="category"
                  name="category"
                  className="form-input"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">선택해주세요</option>
                  <option value="account">계정 문의</option>
                  <option value="booking">예약 관련</option>
                  <option value="payment">결제 관련</option>
                  <option value="medical">진료 정보</option>
                  <option value="app">앱 이용 문의</option>
                  <option value="suggestion">서비스 제안</option>
                  <option value="other">기타</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  제목 *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-input"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="문의 제목을 입력해주세요"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="content" className="form-label">
                  내용 *
                </label>
                <textarea
                  id="content"
                  name="content"
                  className="form-input text-area"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="문의 내용을 자세히 입력해주세요"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  이메일 *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="답변 받으실 이메일을 입력해주세요"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  연락처
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-input"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="선택 입력"
                />
              </div>

              <div className="form-group">
                <label htmlFor="attachFile" className="form-label">
                  파일 첨부
                </label>
                <input
                  type="file"
                  id="attachFile"
                  name="attachFile"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() =>
                      document.getElementById("attachFile").click()
                    }
                    style={{ flex: "1" }}
                  >
                    파일 선택
                  </button>
                  <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                    {formData.attachFile
                      ? formData.attachFile.name
                      : "선택된 파일 없음"}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#6b7280",
                    marginTop: "0.25rem",
                  }}
                >
                  이미지, PDF 파일 등을 첨부할 수 있습니다. (최대 10MB)
                </p>
              </div>

              <button
                type="submit"
                className="submit-button"
                disabled={!isFormValid()}
                style={{ marginTop: "1.5rem" }}
              >
                문의하기
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerService;
