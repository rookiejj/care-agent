import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  Plus,
  MessageSquare,
  Phone,
  Mail,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  User,
  Building2,
  Calendar,
  ArrowRight,
  HeadphonesIcon,
  FileText,
  Tag,
  MoreHorizontal,
  Reply,
  Archive,
  Star,
  Flag,
  Send,
  Paperclip,
  Image,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  MessageCircle,
  Zap,
  UserCheck,
  Stethoscope,
  Heart,
  AlertCircle,
  X,
  Save,
} from "lucide-react";
import "./CustomerSupport.css";
import SupportModal from "./components/SupportModal";

// 새 문의 추가 모달 컴포넌트
const AddInquiryModal = ({ onClose, onSave, assignees }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "보통",
    category: "일반문의",
    userType: "환자",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    hospitalName: "",
    assignedTo: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // 입력 값이 변경되면 해당 필드의 오류 메시지 제거
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "문의 제목을 입력해주세요";
    }

    if (!formData.description.trim()) {
      newErrors.description = "문의 내용을 입력해주세요";
    }

    if (!formData.customerName.trim()) {
      newErrors.customerName = "문의자명을 입력해주세요";
    }

    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = "이메일을 입력해주세요";
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = "올바른 이메일 형식이 아닙니다";
    }

    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = "전화번호를 입력해주세요";
    } else if (!/^\d{3}-\d{3,4}-\d{4}$/.test(formData.customerPhone)) {
      newErrors.customerPhone =
        "올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)";
    }

    if (formData.userType !== "환자" && !formData.hospitalName.trim()) {
      newErrors.hospitalName = "병원명을 입력해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="support-modal" onClick={(e) => e.stopPropagation()}>
        <div className="support-modal-header">
          <div className="support-modal-header-left">
            <div className="support-modal-title-section">
              <h2 className="support-modal-title">새 문의 등록</h2>
              <div className="support-modal-subtitle">
                고객 문의를 직접 등록합니다
              </div>
            </div>
          </div>
          <div className="support-modal-header-right">
            <button className="modal-close-button" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="support-modal-content">
          <div
            style={{
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div className="form-row" style={{ display: "flex", gap: "1rem" }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="title">
                  문의 제목 <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={errors.title ? "form-input error" : "form-input"}
                  placeholder="문의 제목을 입력하세요"
                  style={{
                    padding: "0.625rem 0.75rem",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    transition: "all 0.2s",
                    borderColor: errors.title ? "#ef4444" : "#e5e7eb",
                  }}
                />
                {errors.title && (
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#ef4444",
                      marginTop: "0.25rem",
                    }}
                  >
                    {errors.title}
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">
                문의 내용 <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={
                  errors.description ? "form-input error" : "form-input"
                }
                placeholder="문의 내용을 상세히 입력하세요"
                rows={4}
                style={{
                  width: "100%",
                  padding: "0.625rem 0.75rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  resize: "vertical",
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                  borderColor: errors.description ? "#ef4444" : "#e5e7eb",
                }}
              />
              {errors.description && (
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#ef4444",
                    marginTop: "0.25rem",
                  }}
                >
                  {errors.description}
                </div>
              )}
            </div>

            <div className="form-row" style={{ display: "flex", gap: "1rem" }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="priority">우선순위</label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="form-input"
                  style={{
                    padding: "0.625rem 0.75rem",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    backgroundColor: "white",
                  }}
                >
                  <option value="낮음">낮음</option>
                  <option value="보통">보통</option>
                  <option value="높음">높음</option>
                  <option value="긴급">긴급</option>
                </select>
              </div>

              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="category">카테고리</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-input"
                  style={{
                    padding: "0.625rem 0.75rem",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    backgroundColor: "white",
                  }}
                >
                  <option value="기술지원">기술지원</option>
                  <option value="결제/정산">결제/정산</option>
                  <option value="계정관리">계정관리</option>
                  <option value="버그신고">버그신고</option>
                  <option value="기능요청">기능요청</option>
                  <option value="일반문의">일반문의</option>
                </select>
              </div>

              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="userType">사용자 유형</label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className="form-input"
                  style={{
                    padding: "0.625rem 0.75rem",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    backgroundColor: "white",
                  }}
                >
                  <option value="환자">환자</option>
                  <option value="병원관리자">병원관리자</option>
                  <option value="의사">의사</option>
                </select>
              </div>
            </div>

            <div className="form-row" style={{ display: "flex", gap: "1rem" }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="customerName">
                  문의자명 <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  className={
                    errors.customerName ? "form-input error" : "form-input"
                  }
                  placeholder="문의자 이름"
                  style={{
                    padding: "0.625rem 0.75rem",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    transition: "all 0.2s",
                    borderColor: errors.customerName ? "#ef4444" : "#e5e7eb",
                  }}
                />
                {errors.customerName && (
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#ef4444",
                      marginTop: "0.25rem",
                    }}
                  >
                    {errors.customerName}
                  </div>
                )}
              </div>

              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="customerEmail">
                  이메일 <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="email"
                  id="customerEmail"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  className={
                    errors.customerEmail ? "form-input error" : "form-input"
                  }
                  placeholder="example@email.com"
                  style={{
                    padding: "0.625rem 0.75rem",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    transition: "all 0.2s",
                    borderColor: errors.customerEmail ? "#ef4444" : "#e5e7eb",
                  }}
                />
                {errors.customerEmail && (
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#ef4444",
                      marginTop: "0.25rem",
                    }}
                  >
                    {errors.customerEmail}
                  </div>
                )}
              </div>

              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="customerPhone">
                  전화번호 <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  id="customerPhone"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  className={
                    errors.customerPhone ? "form-input error" : "form-input"
                  }
                  placeholder="010-1234-5678"
                  style={{
                    padding: "0.625rem 0.75rem",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    transition: "all 0.2s",
                    borderColor: errors.customerPhone ? "#ef4444" : "#e5e7eb",
                  }}
                />
                {errors.customerPhone && (
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#ef4444",
                      marginTop: "0.25rem",
                    }}
                  >
                    {errors.customerPhone}
                  </div>
                )}
              </div>
            </div>

            {formData.userType !== "환자" && (
              <div className="form-group">
                <label htmlFor="hospitalName">
                  병원명 <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  id="hospitalName"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleChange}
                  className={
                    errors.hospitalName ? "form-input error" : "form-input"
                  }
                  placeholder="소속 병원명을 입력하세요"
                  style={{
                    padding: "0.625rem 0.75rem",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    transition: "all 0.2s",
                    borderColor: errors.hospitalName ? "#ef4444" : "#e5e7eb",
                  }}
                />
                {errors.hospitalName && (
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#ef4444",
                      marginTop: "0.25rem",
                    }}
                  >
                    {errors.hospitalName}
                  </div>
                )}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="assignedTo">담당자 배정</label>
              <select
                id="assignedTo"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                className="form-input"
                style={{
                  padding: "0.625rem 0.75rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  backgroundColor: "white",
                }}
              >
                <option value="">미배정</option>
                {assignees.map((assignee) => (
                  <option key={assignee} value={assignee}>
                    {assignee}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>

        <div className="support-modal-footer">
          <div className="support-modal-footer-actions">
            <button
              type="button"
              className="support-modal-footer-button secondary"
              onClick={onClose}
            >
              취소
            </button>
            <button
              type="submit"
              className="support-modal-footer-button primary"
              onClick={handleSubmit}
            >
              <Save size={16} />
              문의 등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 내보내기 모달 컴포넌트
const ExportModal = ({ onClose, onExport, inquiriesCount }) => {
  const [exportOptions, setExportOptions] = useState({
    format: "excel",
    dateRange: "all",
    status: "all",
    includeMessages: false,
    includeAttachments: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExportOptions({
      ...exportOptions,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleExport = () => {
    onExport(exportOptions);
  };

  const getFilteredCount = () => {
    // 실제로는 필터링된 개수를 계산해야 하지만, 여기서는 간단히 전체 개수 사용
    return inquiriesCount;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="support-modal"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "500px" }}
      >
        <div className="support-modal-header">
          <div className="support-modal-header-left">
            <div className="support-modal-title-section">
              <h2 className="support-modal-title">문의 데이터 내보내기</h2>
              <div className="support-modal-subtitle">
                고객 문의 데이터를 파일로 내보냅니다
              </div>
            </div>
          </div>
          <div className="support-modal-header-right">
            <button className="modal-close-button" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="support-modal-content">
          <div
            style={{
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <div className="form-group">
              <label htmlFor="format">파일 형식</label>
              <select
                id="format"
                name="format"
                value={exportOptions.format}
                onChange={handleChange}
                className="form-input"
                style={{
                  padding: "0.625rem 0.75rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  backgroundColor: "white",
                }}
              >
                <option value="excel">Excel (.xlsx)</option>
                <option value="csv">CSV (.csv)</option>
                <option value="pdf">PDF (.pdf)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="dateRange">기간</label>
              <select
                id="dateRange"
                name="dateRange"
                value={exportOptions.dateRange}
                onChange={handleChange}
                className="form-input"
                style={{
                  padding: "0.625rem 0.75rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  backgroundColor: "white",
                }}
              >
                <option value="all">전체 기간</option>
                <option value="today">오늘</option>
                <option value="week">최근 1주일</option>
                <option value="month">최근 1개월</option>
                <option value="quarter">최근 3개월</option>
                <option value="year">최근 1년</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">상태</label>
              <select
                id="status"
                name="status"
                value={exportOptions.status}
                onChange={handleChange}
                className="form-input"
                style={{
                  padding: "0.625rem 0.75rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  backgroundColor: "white",
                }}
              >
                <option value="all">모든 상태</option>
                <option value="접수">접수</option>
                <option value="처리중">처리중</option>
                <option value="해결">해결</option>
                <option value="종료">종료</option>
                <option value="에스컬레이션">에스컬레이션</option>
              </select>
            </div>

            <div className="form-group">
              <label>추가 옵션</label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  marginTop: "0.5rem",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    name="includeMessages"
                    checked={exportOptions.includeMessages}
                    onChange={handleChange}
                    style={{ width: "1rem", height: "1rem" }}
                  />
                  <span style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                    대화 내역 포함
                  </span>
                </label>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    name="includeAttachments"
                    checked={exportOptions.includeAttachments}
                    onChange={handleChange}
                    style={{ width: "1rem", height: "1rem" }}
                  />
                  <span style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                    첨부파일 정보 포함
                  </span>
                </label>
              </div>
            </div>

            <div
              style={{
                padding: "1rem",
                backgroundColor: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "0.375rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "#4b5563",
                  marginBottom: "0.5rem",
                }}
              >
                내보내기 요약
              </div>
              <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                • 형식: {exportOptions.format.toUpperCase()}
              </div>
              <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                • 예상 건수: {getFilteredCount()}건
              </div>
              <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                • 대화 내역: {exportOptions.includeMessages ? "포함" : "제외"}
              </div>
              <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                • 첨부파일: {exportOptions.includeAttachments ? "포함" : "제외"}
              </div>
            </div>
          </div>
        </div>

        <div className="support-modal-footer">
          <div className="support-modal-footer-actions">
            <button
              type="button"
              className="support-modal-footer-button secondary"
              onClick={onClose}
            >
              취소
            </button>
            <button
              type="button"
              className="support-modal-footer-button primary"
              onClick={handleExport}
            >
              <Download size={16} />
              내보내기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomerSupport = () => {
  const [inquiries, setInquiries] = useState([]);
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showAddInquiryModal, setShowAddInquiryModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    status: "all",
    priority: "all",
    category: "all",
    assignee: "all",
    userType: "all",
    dateRange: "all",
  });

  // 통계 데이터
  const [supportStats, setSupportStats] = useState({
    totalInquiries: 0,
    pendingInquiries: 0,
    avgResponseTime: 0,
    satisfactionScore: 0,
    todayResolved: 0,
  });

  // 페이지네이션 설정
  const inquiriesPerPage = 15;

  // 담당자 목록
  const assignees = ["김지원", "이상담", "박헬프", "최서포트"];

  useEffect(() => {
    const loadInquiries = () => {
      setIsLoading(true);
      setTimeout(() => {
        const mockInquiries = generateMockInquiries();
        setInquiries(mockInquiries);
        setFilteredInquiries(mockInquiries);

        // 통계 계산
        const stats = calculateStats(mockInquiries);
        setSupportStats(stats);

        setIsLoading(false);
      }, 800);
    };

    loadInquiries();
  }, []);

  useEffect(() => {
    // 검색어와 필터 적용
    let results = [...inquiries];

    // 검색어 필터링
    if (searchTerm) {
      results = results.filter(
        (inquiry) =>
          inquiry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          inquiry.customerName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          inquiry.inquiryId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.customerEmail
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (inquiry.hospitalName &&
            inquiry.hospitalName
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }

    // 상태 필터링
    if (filterOptions.status !== "all") {
      results = results.filter(
        (inquiry) => inquiry.status === filterOptions.status
      );
    }

    // 우선순위 필터링
    if (filterOptions.priority !== "all") {
      results = results.filter(
        (inquiry) => inquiry.priority === filterOptions.priority
      );
    }

    // 카테고리 필터링
    if (filterOptions.category !== "all") {
      results = results.filter(
        (inquiry) => inquiry.category === filterOptions.category
      );
    }

    // 담당자 필터링
    if (filterOptions.assignee !== "all") {
      results = results.filter(
        (inquiry) => inquiry.assignedTo === filterOptions.assignee
      );
    }

    // 사용자 유형 필터링
    if (filterOptions.userType !== "all") {
      results = results.filter(
        (inquiry) => inquiry.userType === filterOptions.userType
      );
    }

    // 날짜 범위 필터링
    if (filterOptions.dateRange !== "all") {
      const now = new Date();
      const dateRangeMap = {
        today: 1,
        week: 7,
        month: 30,
        quarter: 90,
      };
      const days = dateRangeMap[filterOptions.dateRange];
      if (days) {
        const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
        results = results.filter(
          (inquiry) => new Date(inquiry.createdAt) >= cutoffDate
        );
      }
    }

    // 결과 정렬 (기본: 생성일 최신순)
    results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredInquiries(results);
    setCurrentPage(1);
  }, [searchTerm, filterOptions, inquiries]);

  // 새 문의 추가 핸들러
  const handleAddInquiry = (formData) => {
    const newInquiry = {
      id: inquiries.length + 1,
      inquiryId: `INQ${String(inquiries.length + 1).padStart(6, "0")}`,
      title: formData.title,
      description: formData.description,
      status: "접수",
      priority: formData.priority,
      category: formData.category,
      userType: formData.userType,
      userRole:
        formData.userType === "환자"
          ? "환자"
          : formData.userType === "병원관리자"
          ? "병원 관리자"
          : "의사",
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      hospitalName: formData.userType === "환자" ? null : formData.hospitalName,
      assignedTo: formData.assignedTo || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      responseTime: null,
      satisfactionRating: null,
      messages: [
        {
          id: 1,
          sender: "customer",
          content: formData.description,
          timestamp: new Date().toISOString(),
          attachments: [],
          isInternal: false,
        },
      ],
      attachments: [],
      avatar: generateAvatar(formData.customerName),
    };

    setInquiries([newInquiry, ...inquiries]);

    // 통계 업데이트
    const updatedInquiries = [newInquiry, ...inquiries];
    const updatedStats = calculateStats(updatedInquiries);
    setSupportStats(updatedStats);

    setShowAddInquiryModal(false);

    // 성공 메시지 표시 (선택사항)
    alert("새 문의가 성공적으로 등록되었습니다.");
  };

  // 내보내기 핸들러
  const handleExport = async (exportOptions) => {
    try {
      let dataToExport = [...filteredInquiries];

      // 날짜 범위 필터링
      if (exportOptions.dateRange !== "all") {
        const now = new Date();
        const dateRangeMap = {
          today: 1,
          week: 7,
          month: 30,
          quarter: 90,
          year: 365,
        };
        const days = dateRangeMap[exportOptions.dateRange];
        if (days) {
          const cutoffDate = new Date(
            now.getTime() - days * 24 * 60 * 60 * 1000
          );
          dataToExport = dataToExport.filter(
            (inquiry) => new Date(inquiry.createdAt) >= cutoffDate
          );
        }
      }

      // 상태 필터링
      if (exportOptions.status !== "all") {
        dataToExport = dataToExport.filter(
          (inquiry) => inquiry.status === exportOptions.status
        );
      }

      // 내보낼 데이터 구성
      const exportData = dataToExport.map((inquiry) => {
        const baseData = {
          "문의 ID": inquiry.inquiryId,
          제목: inquiry.title,
          내용: inquiry.description,
          상태: inquiry.status,
          우선순위: inquiry.priority,
          카테고리: inquiry.category,
          "사용자 유형": inquiry.userType,
          문의자명: inquiry.customerName,
          이메일: inquiry.customerEmail,
          전화번호: inquiry.customerPhone,
          병원명: inquiry.hospitalName || "-",
          담당자: inquiry.assignedTo || "미배정",
          접수일: formatDate(inquiry.createdAt),
          "최근 업데이트": formatDate(inquiry.updatedAt),
          "응답 시간(시간)": inquiry.responseTime || "-",
          만족도: inquiry.satisfactionRating || "-",
          "첨부파일 수": inquiry.attachments.length,
        };

        // 대화 내역 포함 옵션
        if (exportOptions.includeMessages) {
          baseData["대화 수"] = inquiry.messages.length;
          baseData["최근 메시지"] =
            inquiry.messages[inquiry.messages.length - 1]?.content || "-";
        }

        // 첨부파일 정보 포함 옵션
        if (
          exportOptions.includeAttachments &&
          inquiry.attachments.length > 0
        ) {
          baseData["첨부파일 목록"] = inquiry.attachments
            .map((att) => att.name)
            .join(", ");
        }

        return baseData;
      });

      // 모달을 먼저 닫기
      setShowExportModal(false);

      // 짧은 지연 후 파일 다운로드 시작
      setTimeout(async () => {
        try {
          // 실제 파일 다운로드 처리 (Promise로 완료 대기)
          if (exportOptions.format === "csv") {
            await downloadCSV(exportData, "customer_inquiries");
          } else if (exportOptions.format === "excel") {
            await downloadExcel(exportData, "customer_inquiries");
          } else if (exportOptions.format === "pdf") {
            await downloadPDF(exportData, "customer_inquiries");
          }

          // 다운로드가 완전히 완료된 후 성공 메시지 표시
          alert(
            `${
              dataToExport.length
            }건의 문의 데이터가 ${exportOptions.format.toUpperCase()} 형식으로 내보내졌습니다.`
          );
        } catch (downloadError) {
          console.error("다운로드 중 오류 발생:", downloadError);
          // 취소된 경우가 아닌 실제 오류인 경우만 에러 메시지 표시
          if (!downloadError.message.includes("취소")) {
            alert("파일 다운로드 중 오류가 발생했습니다. 다시 시도해주세요.");
          }
          // 취소된 경우는 조용히 무시 (메시지 표시하지 않음)
        }
      }, 300);
    } catch (error) {
      console.error("내보내기 중 오류 발생:", error);
      setShowExportModal(false);
      alert("파일 내보내기 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // CSV 다운로드 함수
  const downloadCSV = (data, filename) => {
    return new Promise((resolve, reject) => {
      try {
        if (data.length === 0) {
          reject(new Error("내보낼 데이터가 없습니다."));
          return;
        }

        const headers = Object.keys(data[0]);
        const csvContent = [
          headers.join(","),
          ...data.map((row) =>
            headers
              .map((header) => {
                const value = row[header];
                // CSV에서 특수문자 처리
                if (
                  typeof value === "string" &&
                  (value.includes(",") ||
                    value.includes("\n") ||
                    value.includes('"'))
                ) {
                  return `"${value.replace(/"/g, '""')}"`;
                }
                return value;
              })
              .join(",")
          ),
        ].join("\n");

        // BOM 추가로 한글 인코딩 문제 해결
        const BOM = "\uFEFF";
        const blob = new Blob([BOM + csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const link = document.createElement("a");

        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute(
            "download",
            `${filename}_${new Date().toISOString().split("T")[0]}.csv`
          );
          link.style.visibility = "hidden";
          document.body.appendChild(link);

          let isDownloadStarted = false;
          let focusTimeout;

          const cleanup = (success = false) => {
            if (focusTimeout) {
              clearTimeout(focusTimeout);
            }
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            if (success) {
              resolve();
            } else {
              reject(new Error("다운로드가 취소되었습니다."));
            }
          };

          // 다운로드 시작을 감지하기 위한 이벤트들
          const handleDownloadStart = () => {
            isDownloadStarted = true;
          };

          // 포커스 이벤트로 다이얼로그 완료 감지
          const handleFocus = () => {
            window.removeEventListener("focus", handleFocus);

            // 다운로드가 시작되었다면 성공으로 간주
            if (isDownloadStarted) {
              focusTimeout = setTimeout(() => {
                cleanup(true);
              }, 1000);
            } else {
              // 다운로드가 시작되지 않았다면 취소로 간주
              cleanup(false);
            }
          };

          // beforeunload 이벤트로 다운로드 시작 감지
          const handleBeforeUnload = () => {
            isDownloadStarted = true;
            window.removeEventListener("beforeunload", handleBeforeUnload);
          };

          window.addEventListener("focus", handleFocus);
          window.addEventListener("beforeunload", handleBeforeUnload);

          // 백업으로 10초 후 자동 완료 (취소로 간주)
          setTimeout(() => {
            window.removeEventListener("focus", handleFocus);
            window.removeEventListener("beforeunload", handleBeforeUnload);
            if (document.body.contains(link)) {
              cleanup(false);
            }
          }, 10000);

          link.click();
        } else {
          reject(new Error("브라우저에서 파일 다운로드를 지원하지 않습니다."));
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  // Excel 다운로드 함수 (간단한 구현)
  const downloadExcel = (data, filename) => {
    return new Promise((resolve, reject) => {
      try {
        if (data.length === 0) {
          reject(new Error("내보낼 데이터가 없습니다."));
          return;
        }

        const headers = Object.keys(data[0]);
        const csvContent = [
          headers.join(","),
          ...data.map((row) =>
            headers
              .map((header) => {
                const value = row[header];
                if (
                  typeof value === "string" &&
                  (value.includes(",") ||
                    value.includes("\n") ||
                    value.includes('"'))
                ) {
                  return `"${value.replace(/"/g, '""')}"`;
                }
                return value;
              })
              .join(",")
          ),
        ].join("\n");

        const BOM = "\uFEFF";
        const blob = new Blob([BOM + csvContent], {
          type: "application/vnd.ms-excel;charset=utf-8;",
        });
        const link = document.createElement("a");

        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute(
            "download",
            `${filename}_${new Date().toISOString().split("T")[0]}.xlsx`
          );
          link.style.visibility = "hidden";
          document.body.appendChild(link);

          let isDownloadStarted = false;
          let focusTimeout;

          const cleanup = (success = false) => {
            if (focusTimeout) {
              clearTimeout(focusTimeout);
            }
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            if (success) {
              resolve();
            } else {
              reject(new Error("다운로드가 취소되었습니다."));
            }
          };

          const handleDownloadStart = () => {
            isDownloadStarted = true;
          };

          const handleFocus = () => {
            window.removeEventListener("focus", handleFocus);

            if (isDownloadStarted) {
              focusTimeout = setTimeout(() => {
                cleanup(true);
              }, 1000);
            } else {
              cleanup(false);
            }
          };

          const handleBeforeUnload = () => {
            isDownloadStarted = true;
            window.removeEventListener("beforeunload", handleBeforeUnload);
          };

          window.addEventListener("focus", handleFocus);
          window.addEventListener("beforeunload", handleBeforeUnload);

          setTimeout(() => {
            window.removeEventListener("focus", handleFocus);
            window.removeEventListener("beforeunload", handleBeforeUnload);
            if (document.body.contains(link)) {
              cleanup(false);
            }
          }, 10000);

          link.click();
        } else {
          reject(new Error("브라우저에서 파일 다운로드를 지원하지 않습니다."));
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  // PDF 다운로드 함수 (간단한 구현)
  const downloadPDF = (data, filename) => {
    return new Promise((resolve, reject) => {
      try {
        if (data.length === 0) {
          reject(new Error("내보낼 데이터가 없습니다."));
          return;
        }

        const content = [
          "고객 문의 데이터 내보내기",
          `생성일: ${new Date().toLocaleString("ko-KR")}`,
          `총 ${data.length}건의 문의`,
          "=" * 50,
          "",
          ...data.map((row, index) =>
            [
              `${index + 1}. ${row["제목"]}`,
              `   - 문의 ID: ${row["문의 ID"]}`,
              `   - 상태: ${row["상태"]}`,
              `   - 우선순위: ${row["우선순위"]}`,
              `   - 카테고리: ${row["카테고리"]}`,
              `   - 문의자: ${row["문의자명"]} (${row["사용자 유형"]})`,
              `   - 이메일: ${row["이메일"]}`,
              `   - 전화번호: ${row["전화번호"]}`,
              `   - 병원명: ${row["병원명"]}`,
              `   - 담당자: ${row["담당자"]}`,
              `   - 접수일: ${row["접수일"]}`,
              `   - 내용: ${row["내용"]}`,
              "",
            ].join("\n")
          ),
        ].join("\n");

        const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
        const link = document.createElement("a");

        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute(
            "download",
            `${filename}_${new Date().toISOString().split("T")[0]}.txt`
          );
          link.style.visibility = "hidden";
          document.body.appendChild(link);

          let isDownloadStarted = false;
          let focusTimeout;

          const cleanup = (success = false) => {
            if (focusTimeout) {
              clearTimeout(focusTimeout);
            }
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            if (success) {
              resolve();
            } else {
              reject(new Error("다운로드가 취소되었습니다."));
            }
          };

          const handleDownloadStart = () => {
            isDownloadStarted = true;
          };

          const handleFocus = () => {
            window.removeEventListener("focus", handleFocus);

            if (isDownloadStarted) {
              focusTimeout = setTimeout(() => {
                cleanup(true);
              }, 1000);
            } else {
              cleanup(false);
            }
          };

          const handleBeforeUnload = () => {
            isDownloadStarted = true;
            window.removeEventListener("beforeunload", handleBeforeUnload);
          };

          window.addEventListener("focus", handleFocus);
          window.addEventListener("beforeunload", handleBeforeUnload);

          setTimeout(() => {
            window.removeEventListener("focus", handleFocus);
            window.removeEventListener("beforeunload", handleBeforeUnload);
            if (document.body.contains(link)) {
              cleanup(false);
            }
          }, 10000);

          link.click();
        } else {
          reject(new Error("브라우저에서 파일 다운로드를 지원하지 않습니다."));
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  // 목업 문의 데이터 생성
  function generateMockInquiries() {
    const mockInquiries = [];
    const statuses = ["접수", "처리중", "해결", "종료", "에스컬레이션"];
    const priorities = ["낮음", "보통", "높음", "긴급"];
    const categories = [
      "기술지원",
      "결제/정산",
      "계정관리",
      "버그신고",
      "기능요청",
      "일반문의",
    ];
    const userTypes = ["환자", "병원관리자", "의사"];

    const inquiryTitles = [
      "예약 시스템에 로그인이 안됩니다",
      "결제가 정상적으로 처리되지 않아요",
      "병원 정보 수정이 필요합니다",
      "환자 리뷰 삭제 요청드립니다",
      "진료 예약 취소 방법을 알고 싶어요",
      "병원 계정 승인이 지연되고 있습니다",
      "의사 프로필 등록 문의",
      "예약 확인 알림이 오지 않아요",
      "병원 위치 정보가 잘못되어 있어요",
      "성형외과 카테고리 추가 요청",
      "진료비 정산 내역 확인 문의",
      "앱이 자꾸 강제 종료됩니다",
      "비밀번호 변경이 안되네요",
      "병원 검색 기능에 오류가 있어요",
      "의료진 인증 절차 문의",
      "환자 차트 백업 요청",
      "진료 일정 관리 개선 제안",
      "원격 진료 기능 추가 요청",
      "보험 연동 시스템 문의",
      "의료진 평점 시스템 개선 요청",
    ];

    const descriptions = [
      "병원 관리자 계정으로 로그인하려는데 인증 오류가 계속 발생합니다.",
      "환자가 진료비를 온라인으로 결제했는데 결제 완료 처리가 안되었습니다.",
      "저희 병원 주소와 진료과목 정보를 업데이트해주세요.",
      "부적절한 내용의 환자 리뷰가 등록되어 삭제 처리 부탁드립니다.",
      "환자가 예약을 취소하고 싶어하는데 취소 방법을 안내해주세요.",
      "병원 계정 승인 신청한 지 일주일이 지났는데 아직 처리가 안되었습니다.",
      "신규 의사 선생님 프로필을 등록하고 싶은데 절차를 알고 싶습니다.",
      "예약 확인 문자나 알림이 환자에게 발송되지 않고 있습니다.",
      "지도에 표시된 병원 위치가 실제와 다른 곳에 있어서 환자들이 혼란스러워합니다.",
      "성형외과 세부 카테고리를 더 추가할 수 있는지 문의드립니다.",
      "이번 달 진료비 정산 내역을 확인하고 싶은데 어디서 볼 수 있나요?",
      "모바일 앱을 사용하다가 자꾸 종료되는 현상이 발생합니다.",
      "비밀번호 변경 페이지에서 저장 버튼이 작동하지 않습니다.",
      "병원 검색을 하면 검색 결과가 제대로 나오지 않는 경우가 있습니다.",
      "의료진 면허 인증 절차와 필요한 서류에 대해 문의드립니다.",
      "환자 진료 기록을 백업하거나 내보내기 할 수 있는 기능이 있나요?",
      "진료 일정 관리를 더 효율적으로 할 수 있는 기능 개선을 제안합니다.",
      "코로나19 상황에서 원격 진료가 가능한 기능을 추가해주세요.",
      "국민건강보험 연동 시스템에 대한 기술적 문의가 있습니다.",
      "환자들이 의료진을 평가할 수 있는 시스템 개선을 요청합니다.",
    ];

    const hospitalNames = [
      "서울대학교병원",
      "연세세브란스병원",
      "삼성서울병원",
      "아산의료원",
      "서울성모병원",
      "강남세브란스병원",
      "한양대학교병원",
      "경희대학교병원",
      "이대목동병원",
      "고려대학교병원",
      "BK성형외과",
      "압구정 뷰티클리닉",
      "강남 미소치과",
      "서초 피부과",
      "홍대 이비인후과",
      "분당서울대병원",
      "일산백병원",
      "부천성모병원",
      "인하대병원",
      "가천대길병원",
    ];

    for (let i = 1; i <= 150; i++) {
      const titleIndex = Math.floor(Math.random() * inquiryTitles.length);
      const createdAt = new Date(
        new Date().getTime() -
          Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000
      ).toISOString();

      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const priority =
        priorities[Math.floor(Math.random() * priorities.length)];
      const category =
        categories[Math.floor(Math.random() * categories.length)];
      const userType = userTypes[Math.floor(Math.random() * userTypes.length)];
      const assignedTo =
        status === "접수"
          ? null
          : assignees[Math.floor(Math.random() * assignees.length)];

      // 사용자 유형에 따른 병원명 설정
      const hospitalName =
        userType === "환자"
          ? null
          : hospitalNames[Math.floor(Math.random() * hospitalNames.length)];

      // 사용자 유형에 따른 역할 설정
      let userRole = "";
      if (userType === "환자") {
        userRole = "환자";
      } else if (userType === "병원관리자") {
        userRole = "병원 관리자";
      } else {
        userRole = ["주치의", "전문의", "레지던트"][
          Math.floor(Math.random() * 3)
        ];
      }

      mockInquiries.push({
        id: i,
        inquiryId: `INQ${String(i).padStart(6, "0")}`,
        title: inquiryTitles[titleIndex],
        description: descriptions[titleIndex],
        status,
        priority,
        category,
        userType,
        userRole,
        customerName: `${
          userType === "환자"
            ? "환자"
            : userType === "병원관리자"
            ? "관리자"
            : "의사"
        }${i}`,
        customerEmail: `user${i}@${
          userType === "환자" ? "patient" : "hospital"
        }.com`,
        customerPhone: `010-${1000 + Math.floor(Math.random() * 9000)}-${
          1000 + Math.floor(Math.random() * 9000)
        }`,
        hospitalName,
        assignedTo,
        createdAt,
        updatedAt:
          status === "해결" || status === "종료"
            ? new Date(
                new Date(createdAt).getTime() +
                  Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000
              ).toISOString()
            : createdAt,
        responseTime:
          status === "접수" ? null : Math.floor(Math.random() * 24) + 1,
        satisfactionRating:
          status === "해결" || status === "종료"
            ? Math.floor(Math.random() * 3) + 3
            : null,
        messages: generateInquiryMessages(i, status),
        attachments: Math.random() > 0.7 ? generateAttachments() : [],
        avatar: generateAvatar(
          `${
            userType === "환자"
              ? "환자"
              : userType === "병원관리자"
              ? "관리자"
              : "의사"
          }${i}`
        ),
      });
    }

    return mockInquiries;
  }

  // 문의 메시지 생성
  function generateInquiryMessages(inquiryId, status) {
    const messages = [
      {
        id: 1,
        sender: "customer",
        content: "안녕하세요. 문의사항이 있어서 연락드립니다.",
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 3) * 24 * 60 * 60 * 1000
        ).toISOString(),
        attachments: [],
        isInternal: false,
      },
    ];

    if (status !== "접수") {
      messages.push({
        id: 2,
        sender: "agent",
        content:
          "안녕하세요. 문의해주신 내용을 확인하고 신속히 처리해드리겠습니다.",
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 2) * 24 * 60 * 60 * 1000
        ).toISOString(),
        attachments: [],
        isInternal: false,
      });
    }

    if (status === "해결" || status === "종료") {
      messages.push({
        id: 3,
        sender: "agent",
        content:
          "문제가 해결되었습니다. 추가 문의사항이 있으시면 언제든 연락주세요.",
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 1) * 24 * 60 * 60 * 1000
        ).toISOString(),
        attachments: [],
        isInternal: false,
      });
    }

    return messages;
  }

  // 첨부파일 생성
  function generateAttachments() {
    const fileTypes = ["image", "document"];
    const fileNames = [
      "screenshot.png",
      "error_log.txt",
      "prescription.pdf",
      "medical_record.pdf",
    ];
    return [
      {
        id: 1,
        name: fileNames[Math.floor(Math.random() * fileNames.length)],
        type: fileTypes[Math.floor(Math.random() * fileTypes.length)],
        size: Math.floor(Math.random() * 1000) + 100,
      },
    ];
  }

  // 아바타 생성
  function generateAvatar(name) {
    const colors = [
      "#3b82f6",
      "#10b981",
      "#f59e0b",
      "#ef4444",
      "#8b5cf6",
      "#06b6d4",
    ];
    return {
      initials: name.charAt(0),
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  }

  // 통계 계산
  function calculateStats(inquiries) {
    const totalInquiries = inquiries.length;
    const pendingInquiries = inquiries.filter(
      (i) => i.status === "접수" || i.status === "처리중"
    ).length;

    const responseTimes = inquiries
      .filter((i) => i.responseTime)
      .map((i) => i.responseTime);
    const avgResponseTime =
      responseTimes.length > 0
        ? Math.round(
            responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
          )
        : 0;

    const ratings = inquiries
      .filter((i) => i.satisfactionRating)
      .map((i) => i.satisfactionRating);
    const satisfactionScore =
      ratings.length > 0
        ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
        : 0;

    const today = new Date();
    const todayStart = new Date(today.setHours(0, 0, 0, 0));
    const todayResolved = inquiries.filter(
      (i) =>
        (i.status === "해결" || i.status === "종료") &&
        new Date(i.updatedAt) >= todayStart
    ).length;

    return {
      totalInquiries,
      pendingInquiries,
      avgResponseTime,
      satisfactionScore: parseFloat(satisfactionScore),
      todayResolved,
    };
  }

  // 이벤트 핸들러
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (filter, value) => {
    setFilterOptions({
      ...filterOptions,
      [filter]: value,
    });
  };

  const handleInquiryClick = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowSupportModal(true);
  };

  const handleCloseSupportModal = () => {
    setShowSupportModal(false);
    setSelectedInquiry(null);
  };

  const handleStatusChange = (inquiryId, newStatus) => {
    setInquiries(
      inquiries.map((inquiry) =>
        inquiry.id === inquiryId
          ? {
              ...inquiry,
              status: newStatus,
              updatedAt: new Date().toISOString(),
            }
          : inquiry
      )
    );

    if (selectedInquiry && selectedInquiry.id === inquiryId) {
      setSelectedInquiry({
        ...selectedInquiry,
        status: newStatus,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const handleAssignInquiry = (inquiryId, assignee) => {
    setInquiries(
      inquiries.map((inquiry) =>
        inquiry.id === inquiryId
          ? {
              ...inquiry,
              assignedTo: assignee,
              status: "처리중",
              updatedAt: new Date().toISOString(),
            }
          : inquiry
      )
    );

    if (selectedInquiry && selectedInquiry.id === inquiryId) {
      setSelectedInquiry({
        ...selectedInquiry,
        assignedTo: assignee,
        status: "처리중",
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const handleAddReply = (inquiryId, message, isInternal = false) => {
    const newMessage = {
      id: Date.now(),
      sender: "agent",
      content: message,
      timestamp: new Date().toISOString(),
      attachments: [],
      isInternal,
    };

    setInquiries(
      inquiries.map((inquiry) =>
        inquiry.id === inquiryId
          ? {
              ...inquiry,
              messages: [...inquiry.messages, newMessage],
              updatedAt: new Date().toISOString(),
              status: inquiry.status === "접수" ? "처리중" : inquiry.status,
            }
          : inquiry
      )
    );

    if (selectedInquiry && selectedInquiry.id === inquiryId) {
      setSelectedInquiry({
        ...selectedInquiry,
        messages: [...selectedInquiry.messages, newMessage],
        updatedAt: new Date().toISOString(),
        status:
          selectedInquiry.status === "접수" ? "처리중" : selectedInquiry.status,
      });
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 유틸리티 함수들
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateShort = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      month: "2-digit",
      day: "2-digit",
    });
  };

  const getTimeAgo = (dateString) => {
    if (!dateString) return "-";
    const now = new Date();
    const date = new Date(dateString);
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays}일 전`;
    } else if (diffInHours > 0) {
      return `${diffInHours}시간 전`;
    } else {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes}분 전`;
    }
  };

  // 상태 배지 렌더링
  const renderStatusBadge = (status) => {
    const statusConfig = {
      접수: { label: "접수", class: "open", icon: Clock },
      처리중: { label: "처리중", class: "in_progress", icon: Activity },
      해결: { label: "해결", class: "resolved", icon: CheckCircle },
      종료: { label: "종료", class: "closed", icon: XCircle },
      에스컬레이션: {
        label: "에스컬레이션",
        class: "escalation",
        icon: AlertTriangle,
      },
    };

    const config = statusConfig[status] || statusConfig.접수;
    const Icon = config.icon;

    return (
      <span className={`support-status-badge ${config.class}`}>
        <Icon size={12} />
        {config.label}
      </span>
    );
  };

  // 우선순위 배지 렌더링
  const renderPriorityBadge = (priority) => {
    const priorityConfig = {
      낮음: { label: "낮음", class: "낮음" },
      보통: { label: "보통", class: "보통" },
      높음: { label: "높음", class: "높음" },
      긴급: { label: "긴급", class: "긴급" },
    };

    const config = priorityConfig[priority] || priorityConfig.보통;

    return (
      <span className={`support-priority-badge ${config.class}`}>
        {config.label}
      </span>
    );
  };

  // 카테고리 배지 렌더링
  const renderCategoryBadge = (category) => {
    const categoryConfig = {
      기술지원: { label: "기술지원", class: "기술지원" },
      "결제/정산": { label: "결제/정산", class: "billing" },
      계정관리: { label: "계정관리", class: "계정관리" },
      기능요청: { label: "기능요청", class: "기능요청" },
      버그신고: { label: "버그신고", class: "버그신고" },
      일반문의: { label: "일반문의", class: "일반문의" },
    };

    const config = categoryConfig[category] || categoryConfig.일반문의;

    return (
      <span className={`support-category-badge ${config.class}`}>
        {config.label}
      </span>
    );
  };

  // 사용자 유형 아이콘 렌더링
  const renderUserTypeIcon = (userType) => {
    const userTypeConfig = {
      환자: { icon: User, class: "patient" },
      병원관리자: { icon: Building2, class: "hospital" },
      의사: { icon: Stethoscope, class: "doctor" },
    };

    const config = userTypeConfig[userType] || userTypeConfig.환자;
    const Icon = config.icon;

    return (
      <div
        className={`support-user-type-icon ${config.class}`}
        title={userType}
      >
        <Icon size={14} />
      </div>
    );
  };

  // 페이지네이션 계산
  const indexOfLastInquiry = currentPage * inquiriesPerPage;
  const indexOfFirstInquiry = indexOfLastInquiry - inquiriesPerPage;
  const currentInquiries = filteredInquiries.slice(
    indexOfFirstInquiry,
    indexOfLastInquiry
  );
  const totalPages = Math.ceil(filteredInquiries.length / inquiriesPerPage);

  if (isLoading) {
    return (
      <div className="super-admin-loading-container">
        <div className="super-admin-loading-spinner"></div>
        <p>고객지원 데이터 로딩 중...</p>
      </div>
    );
  }

  // 메인 목록 뷰 렌더링
  return (
    <div className="customer-support">
      <div className="super-admin-section-header">
        <h2 className="super-admin-section-title">고객 지원</h2>
        <p className="super-admin-section-description">
          병원, 의료진, 환자들의 문의사항을 통합 관리하고 신속하게 처리합니다.
        </p>
      </div>

      {/* 통계 카드 */}
      <div className="support-stats-cards">
        <div className="support-stat-card">
          <div className="support-stat-icon">
            <MessageSquare size={24} />
          </div>
          <div className="support-stat-info">
            <div className="support-stat-value">
              {supportStats.totalInquiries}
            </div>
            <div className="support-stat-label">전체 문의 수</div>
          </div>
        </div>
        <div className="support-stat-card">
          <div className="support-stat-icon pending">
            <Clock size={24} />
          </div>
          <div className="support-stat-info">
            <div className="support-stat-value">
              {supportStats.pendingInquiries}
            </div>
            <div className="support-stat-label">처리 대기 건수</div>
          </div>
        </div>
        <div className="support-stat-card">
          <div className="support-stat-icon">
            <Activity size={24} />
          </div>
          <div className="support-stat-info">
            <div className="support-stat-value">
              {supportStats.avgResponseTime}h
            </div>
            <div className="support-stat-label">평균 응답 시간</div>
          </div>
        </div>
        <div className="support-stat-card">
          <div className="support-stat-icon">
            <Star size={24} />
          </div>
          <div className="support-stat-info">
            <div className="support-stat-value">
              {supportStats.satisfactionScore}
            </div>
            <div className="support-stat-label">고객 만족도</div>
          </div>
        </div>
        <div className="support-stat-card">
          <div className="support-stat-icon resolved">
            <CheckCircle size={24} />
          </div>
          <div className="support-stat-info">
            <div className="support-stat-value">
              {supportStats.todayResolved}
            </div>
            <div className="support-stat-label">오늘 해결된 문의</div>
          </div>
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="support-management-actions">
        <div className="support-search-filter-container">
          <div className="support-admin-search-bar">
            <Search size={18} className="support-search-icon" />
            <input
              type="text"
              placeholder="문의 ID, 제목, 문의자명, 병원명, 내용 검색..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="support-admin-search-input"
            />
          </div>
          <button
            className="super-admin-button super-admin-button-secondary"
            onClick={toggleFilters}
          >
            <Filter size={16} />
            필터
          </button>
        </div>
        <div className="support-action-buttons">
          <button
            className="super-admin-button super-admin-button-secondary"
            onClick={() => setShowExportModal(true)}
          >
            <Download size={16} />
            내보내기
          </button>
          <button
            className="super-admin-button super-admin-button-primary"
            onClick={() => setShowAddInquiryModal(true)}
          >
            <Plus size={16} />새 문의
          </button>
        </div>
      </div>

      {/* 필터 섹션 */}
      {showFilters && (
        <div className="super-admin-filters">
          <div className="super-admin-filter-group">
            <label className="super-admin-filter-label">상태</label>
            <div className="super-admin-filter-options">
              {["all", "접수", "처리중", "해결", "종료", "에스컬레이션"].map(
                (status) => (
                  <button
                    key={status}
                    className={`super-admin-filter-option ${
                      filterOptions.status === status ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("status", status)}
                  >
                    {status === "all" ? "전체" : status}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="super-admin-filter-group">
            <label className="super-admin-filter-label">우선순위</label>
            <div className="super-admin-filter-options">
              {["all", "낮음", "보통", "높음", "긴급"].map((priority) => (
                <button
                  key={priority}
                  className={`super-admin-filter-option ${
                    filterOptions.priority === priority ? "active" : ""
                  }`}
                  onClick={() => handleFilterChange("priority", priority)}
                >
                  {priority === "all" ? "전체" : priority}
                </button>
              ))}
            </div>
          </div>

          <div className="super-admin-filter-group">
            <label className="super-admin-filter-label">카테고리</label>
            <div className="super-admin-filter-options">
              {[
                "all",
                "기술지원",
                "결제/정산",
                "계정관리",
                "버그신고",
                "기능요청",
                "일반문의",
              ].map((category) => (
                <button
                  key={category}
                  className={`super-admin-filter-option ${
                    filterOptions.category === category ? "active" : ""
                  }`}
                  onClick={() => handleFilterChange("category", category)}
                >
                  {category === "all" ? "전체" : category}
                </button>
              ))}
            </div>
          </div>

          <div className="super-admin-filter-group">
            <label className="super-admin-filter-label">담당자</label>
            <div className="super-admin-filter-options">
              <button
                className={`super-admin-filter-option ${
                  filterOptions.assignee === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("assignee", "all")}
              >
                전체
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.assignee === "unassigned" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("assignee", "unassigned")}
              >
                미배정
              </button>
              {assignees.map((assignee) => (
                <button
                  key={assignee}
                  className={`super-admin-filter-option ${
                    filterOptions.assignee === assignee ? "active" : ""
                  }`}
                  onClick={() => handleFilterChange("assignee", assignee)}
                >
                  {assignee}
                </button>
              ))}
            </div>
          </div>

          <div className="super-admin-filter-group">
            <label className="super-admin-filter-label">사용자 유형</label>
            <div className="super-admin-filter-options">
              {["all", "환자", "병원관리자", "의사"].map((userType) => (
                <button
                  key={userType}
                  className={`super-admin-filter-option ${
                    filterOptions.userType === userType ? "active" : ""
                  }`}
                  onClick={() => handleFilterChange("userType", userType)}
                >
                  {userType === "all" ? "전체" : userType}
                </button>
              ))}
            </div>
          </div>

          <div className="super-admin-filter-group">
            <label className="super-admin-filter-label">기간</label>
            <div className="super-admin-filter-options">
              {["all", "today", "week", "month", "quarter"].map((range) => (
                <button
                  key={range}
                  className={`super-admin-filter-option ${
                    filterOptions.dateRange === range ? "active" : ""
                  }`}
                  onClick={() => handleFilterChange("dateRange", range)}
                >
                  {range === "all"
                    ? "전체"
                    : range === "today"
                    ? "오늘"
                    : range === "week"
                    ? "1주일"
                    : range === "month"
                    ? "1개월"
                    : "3개월"}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 문의 목록 */}
      <div className="support-inquiry-list-header">
        <h3 className="support-inquiry-list-title">문의 목록</h3>
        <div className="support-inquiry-count">
          총 <span className="count-highlight">{filteredInquiries.length}</span>
          건
        </div>
      </div>

      {filteredInquiries.length === 0 ? (
        <div className="super-admin-empty-state">
          <div className="super-admin-empty-icon">
            <MessageSquare size={48} />
          </div>
          <h3 className="super-admin-empty-title">문의가 없습니다</h3>
          <p className="super-admin-empty-description">
            검색 조건에 맞는 문의가 없습니다. 다른 검색어나 필터를 사용해보세요.
          </p>
        </div>
      ) : (
        <>
          <div className="support-inquiry-table-container">
            <table className="super-admin-table">
              <thead>
                <tr>
                  <th>문의 정보</th>
                  <th>문의자</th>
                  <th>상태</th>
                  <th>우선순위</th>
                  <th>카테고리</th>
                  <th>담당자</th>
                  <th>접수일</th>
                  <th>최근 업데이트</th>
                  <th>작업</th>
                </tr>
              </thead>
              <tbody>
                {currentInquiries.map((inquiry) => (
                  <tr
                    key={inquiry.id}
                    onClick={() => handleInquiryClick(inquiry)}
                  >
                    <td>
                      <div className="support-inquiry-info">
                        <div className="support-inquiry-header">
                          <span className="support-inquiry-id">
                            {inquiry.inquiryId}
                          </span>
                          {renderUserTypeIcon(inquiry.userType)}
                        </div>
                        <div className="support-inquiry-title">
                          {inquiry.title}
                        </div>
                        <div className="support-inquiry-meta">
                          {inquiry.hospitalName && (
                            <span className="support-inquiry-hospital">
                              <Building2 size={10} />
                              {inquiry.hospitalName}
                            </span>
                          )}
                          {inquiry.attachments.length > 0 && (
                            <span className="support-inquiry-attachment">
                              <Paperclip size={10} />
                              첨부파일
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="support-customer-info">
                        <div className="support-customer-header">
                          <div
                            className="support-customer-avatar"
                            style={{ backgroundColor: inquiry.avatar.color }}
                          >
                            {inquiry.avatar.initials}
                          </div>
                          <div className="support-customer-details">
                            <div className="support-customer-name">
                              {inquiry.customerName}
                            </div>
                            <div className="support-customer-role">
                              {inquiry.userRole}
                            </div>
                          </div>
                        </div>
                        <div className="support-customer-contact">
                          <Mail size={12} />
                          {inquiry.customerEmail}
                        </div>
                        <div className="support-customer-contact">
                          <Phone size={12} />
                          {inquiry.customerPhone}
                        </div>
                      </div>
                    </td>
                    <td>{renderStatusBadge(inquiry.status)}</td>
                    <td>{renderPriorityBadge(inquiry.priority)}</td>
                    <td>{renderCategoryBadge(inquiry.category)}</td>
                    <td>
                      <div className="support-assignee">
                        {inquiry.assignedTo ? (
                          <div className="support-assigned">
                            <User size={14} />
                            {inquiry.assignedTo}
                          </div>
                        ) : (
                          <span className="support-unassigned">미배정</span>
                        )}
                      </div>
                    </td>
                    <td>{formatDateShort(inquiry.createdAt)}</td>
                    <td>
                      <div className="support-update-time">
                        <Clock size={12} />
                        {getTimeAgo(inquiry.updatedAt)}
                      </div>
                    </td>
                    <td>
                      <div
                        className="support-inquiry-actions"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="action-button view"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleInquiryClick(inquiry);
                          }}
                          title="상세 보기"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="action-button edit"
                          onClick={(e) => {
                            e.stopPropagation();
                            // 빠른 상태 변경
                            const nextStatus =
                              inquiry.status === "접수"
                                ? "처리중"
                                : inquiry.status === "처리중"
                                ? "해결"
                                : inquiry.status === "해결"
                                ? "종료"
                                : "접수";
                            handleStatusChange(inquiry.id, nextStatus);
                          }}
                          title="상태 변경"
                        >
                          <RefreshCw size={16} />
                        </button>
                        <button
                          className="action-button more"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleInquiryClick(inquiry);
                          }}
                          title="답변하기"
                        >
                          <Reply size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="super-admin-pagination">
              <button
                className={`super-admin-pagination-button ${
                  currentPage === 1 ? "disabled" : ""
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 2 &&
                    pageNumber <= currentPage + 2)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      className={`super-admin-pagination-button ${
                        pageNumber === currentPage ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (
                  (pageNumber === currentPage - 3 && currentPage > 4) ||
                  (pageNumber === currentPage + 3 &&
                    currentPage < totalPages - 3)
                ) {
                  return <span key={pageNumber}>...</span>;
                }
                return null;
              })}

              <button
                className={`super-admin-pagination-button ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}

      {/* 새 문의 추가 모달 */}
      {showAddInquiryModal && (
        <AddInquiryModal
          onClose={() => setShowAddInquiryModal(false)}
          onSave={handleAddInquiry}
          assignees={assignees}
        />
      )}

      {/* 내보내기 모달 */}
      {showExportModal && (
        <ExportModal
          onClose={() => setShowExportModal(false)}
          onExport={handleExport}
          inquiriesCount={filteredInquiries.length}
        />
      )}

      {/* 문의 상세 모달 */}
      {showSupportModal && selectedInquiry && (
        <SupportModal
          inquiry={selectedInquiry}
          onClose={handleCloseSupportModal}
          onStatusChange={handleStatusChange}
          onAssign={handleAssignInquiry}
          onAddReply={handleAddReply}
          assignees={assignees}
          formatDate={formatDate}
          getTimeAgo={getTimeAgo}
          renderStatusBadge={renderStatusBadge}
          renderPriorityBadge={renderPriorityBadge}
          renderCategoryBadge={renderCategoryBadge}
          renderUserTypeIcon={renderUserTypeIcon}
        />
      )}
    </div>
  );
};

export default CustomerSupport;
