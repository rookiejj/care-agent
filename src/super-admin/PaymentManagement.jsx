import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  DollarSign,
  CreditCard,
  Building,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Calendar,
  Receipt,
  Settings,
  FileDown,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import "./PaymentManagement.css";
import PaymentModal from "./components/PaymentModal";

const PaymentManagement = ({
  viewMode = "list",
  itemId,
  onBack,
  onViewDetail,
}) => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    status: "all",
    type: "all",
    method: "all",
    dateRange: "all",
  });

  // 상세 보기 모드에서 사용할 결제 정보
  const [paymentDetail, setPaymentDetail] = useState(null);

  // 통계 데이터
  const [paymentStats, setPaymentStats] = useState({
    totalRevenue: 0,
    monthlyRevenue: 0,
    pendingAmount: 0,
    refundedAmount: 0,
    totalTransactions: 0,
    monthlyTransactions: 0,
  });

  // 페이지네이션 설정
  const paymentsPerPage = 15;

  useEffect(() => {
    const loadPayments = () => {
      setIsLoading(true);

      // 상세 보기 모드인 경우 해당 결제 데이터만 로드
      if (viewMode === "detail" && itemId) {
        setTimeout(() => {
          const mockPayment = generateMockPaymentDetail(parseInt(itemId));
          setPaymentDetail(mockPayment);
          setIsLoading(false);
        }, 800);
        return;
      }

      // 목록 모드인 경우 전체 결제 목록 로드
      setTimeout(() => {
        const mockPayments = generateMockPayments();
        setPayments(mockPayments);
        setFilteredPayments(mockPayments);

        // 통계 계산
        const stats = calculatePaymentStats(mockPayments);
        setPaymentStats(stats);

        setIsLoading(false);
      }, 800);
    };

    loadPayments();
  }, [viewMode, itemId]);

  useEffect(() => {
    if (viewMode === "list") {
      // 검색어와 필터 적용
      let results = [...payments];

      // 검색어 필터링
      if (searchTerm) {
        results = results.filter(
          (payment) =>
            payment.transactionId
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            payment.hospitalName
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            payment.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            payment.method.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // 상태 필터링
      if (filterOptions.status !== "all") {
        results = results.filter(
          (payment) => payment.status === filterOptions.status
        );
      }

      // 유형 필터링
      if (filterOptions.type !== "all") {
        results = results.filter(
          (payment) => payment.type === filterOptions.type
        );
      }

      // 결제 방법 필터링
      if (filterOptions.method !== "all") {
        results = results.filter(
          (payment) => payment.method === filterOptions.method
        );
      }

      // 날짜 범위 필터링
      if (filterOptions.dateRange !== "all") {
        const now = new Date();
        const periodMap = {
          "1week": 7,
          "1month": 30,
          "3months": 90,
          "6months": 180,
          "1year": 365,
        };
        const days = periodMap[filterOptions.dateRange];
        if (days) {
          const cutoffDate = new Date(
            now.getTime() - days * 24 * 60 * 60 * 1000
          );
          results = results.filter(
            (payment) => new Date(payment.date) >= cutoffDate
          );
        }
      }

      // 결과 정렬 (기본: 날짜 최신순)
      results.sort((a, b) => new Date(b.date) - new Date(a.date));

      setFilteredPayments(results);
      setCurrentPage(1);
    }
  }, [searchTerm, filterOptions, payments, viewMode]);

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

  const handlePaymentClick = (payment) => {
    if (onViewDetail) {
      onViewDetail(payment.id);
    } else {
      setSelectedPayment(payment);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPayment(null);
  };

  const handleRefund = (paymentId, amount) => {
    setPayments(
      payments.map((payment) =>
        payment.id === paymentId
          ? {
              ...payment,
              status: "refunded",
              refundAmount: amount,
              refundDate: new Date().toISOString(),
            }
          : payment
      )
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGoBack = () => {
    if (onBack) {
      onBack();
    }
  };

  // 통계 계산 함수
  const calculatePaymentStats = (paymentList) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const totalRevenue = paymentList
      .filter((p) => p.status === "completed" && p.amount > 0)
      .reduce((sum, p) => sum + p.amount, 0);

    const monthlyRevenue = paymentList
      .filter((p) => {
        const paymentDate = new Date(p.date);
        return (
          p.status === "completed" &&
          p.amount > 0 &&
          paymentDate.getMonth() === currentMonth &&
          paymentDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, p) => sum + p.amount, 0);

    const pendingAmount = paymentList
      .filter((p) => p.status === "pending")
      .reduce((sum, p) => sum + p.amount, 0);

    const refundedAmount = paymentList
      .filter((p) => p.status === "refunded")
      .reduce((sum, p) => sum + (p.refundAmount || p.amount), 0);

    const totalTransactions = paymentList.length;

    const monthlyTransactions = paymentList.filter((p) => {
      const paymentDate = new Date(p.date);
      return (
        paymentDate.getMonth() === currentMonth &&
        paymentDate.getFullYear() === currentYear
      );
    }).length;

    return {
      totalRevenue,
      monthlyRevenue,
      pendingAmount,
      refundedAmount,
      totalTransactions,
      monthlyTransactions,
    };
  };

  // 페이지네이션 계산
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = filteredPayments.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );
  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

  // 날짜 포맷 함수
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // 날짜 및 시간 포맷 함수
  const formatDateTime = (dateString) => {
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

  // 금액 포맷 함수
  const formatAmount = (amount) => {
    return new Intl.NumberFormat("ko-KR").format(amount);
  };

  // 상태에 따른 배지 렌더링
  const renderStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <span className="payment-status-badge completed">
            <CheckCircle size={14} /> 완료
          </span>
        );
      case "pending":
        return (
          <span className="payment-status-badge pending">
            <AlertTriangle size={14} /> 대기
          </span>
        );
      case "failed":
        return (
          <span className="payment-status-badge failed">
            <XCircle size={14} /> 실패
          </span>
        );
      case "refunded":
        return (
          <span className="payment-status-badge refunded">
            <RefreshCw size={14} /> 환불
          </span>
        );
      case "cancelled":
        return (
          <span className="payment-status-badge cancelled">
            <XCircle size={14} /> 취소
          </span>
        );
      default:
        return null;
    }
  };

  // 결제 유형 배지 렌더링
  const renderTypeBadge = (type) => {
    switch (type) {
      case "subscription":
        return <span className="payment-type-badge subscription">구독료</span>;
      case "commission":
        return <span className="payment-type-badge commission">수수료</span>;
      case "fee":
        return <span className="payment-type-badge fee">이용료</span>;
      case "penalty":
        return <span className="payment-type-badge penalty">위약금</span>;
      case "bonus":
        return <span className="payment-type-badge bonus">보너스</span>;
      default:
        return null;
    }
  };

  // 결제 방법 아이콘 렌더링
  const renderPaymentMethodIcon = (method) => {
    switch (method) {
      case "card":
        return <CreditCard size={16} className="payment-method-icon" />;
      case "bank":
        return <Building size={16} className="payment-method-icon" />;
      case "virtual":
        return <Receipt size={16} className="payment-method-icon" />;
      default:
        return <DollarSign size={16} className="payment-method-icon" />;
    }
  };

  // 목업 결제 데이터 생성
  function generateMockPayments() {
    const mockPayments = [];
    const statuses = [
      "completed",
      "pending",
      "failed",
      "refunded",
      "cancelled",
    ];
    const types = ["subscription", "commission", "fee", "penalty", "bonus"];
    const methods = ["card", "bank", "virtual"];
    const hospitals = [
      { name: "서울대병원", type: "종합병원" },
      { name: "강남성형외과", type: "성형외과" },
      { name: "부산대학교병원", type: "대학병원" },
      { name: "삼성서울병원", type: "종합병원" },
      { name: "연세세브란스병원", type: "대학병원" },
      { name: "고려대학교병원", type: "대학병원" },
      { name: "아산의료원", type: "의료원" },
      { name: "서울아산병원", type: "종합병원" },
    ];

    for (let i = 1; i <= 100; i++) {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const type = types[Math.floor(Math.random() * types.length)];
      const method = methods[Math.floor(Math.random() * methods.length)];
      const hospital = hospitals[Math.floor(Math.random() * hospitals.length)];

      // 결제 금액 설정 (유형에 따라)
      let amount;
      switch (type) {
        case "subscription":
          amount = [100000, 200000, 300000, 500000][
            Math.floor(Math.random() * 4)
          ];
          break;
        case "commission":
          amount = Math.floor(Math.random() * 50000) + 10000;
          break;
        case "fee":
          amount = Math.floor(Math.random() * 20000) + 5000;
          break;
        case "penalty":
          amount = Math.floor(Math.random() * 100000) + 50000;
          break;
        case "bonus":
          amount = Math.floor(Math.random() * 30000) + 10000;
          break;
        default:
          amount = Math.floor(Math.random() * 100000) + 10000;
      }

      // 날짜 생성 (최근 1년 내)
      const date = new Date(
        new Date().getTime() -
          Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000
      ).toISOString();

      mockPayments.push({
        id: i,
        transactionId: `TXN${String(i).padStart(8, "0")}`,
        hospitalName: hospital.name,
        hospitalType: hospital.type,
        hospitalId: Math.floor(Math.random() * 50) + 1,
        amount: amount,
        status: status,
        type: type,
        method: method,
        date: date,
        description: getPaymentDescription(type, hospital.name),
        refundAmount: status === "refunded" ? amount : null,
        refundDate: status === "refunded" ? date : null,
        processingFee: Math.floor(amount * 0.03),
        netAmount: Math.floor(amount * 0.97),
      });
    }

    return mockPayments;
  }

  // 결제 설명 생성
  function getPaymentDescription(type, hospitalName) {
    switch (type) {
      case "subscription":
        return `${hospitalName} 월간 구독료`;
      case "commission":
        return `${hospitalName} 예약 수수료`;
      case "fee":
        return `${hospitalName} 서비스 이용료`;
      case "penalty":
        return `${hospitalName} 약정 위약금`;
      case "bonus":
        return `${hospitalName} 성과 보너스`;
      default:
        return `${hospitalName} 기타 결제`;
    }
  }

  // 결제 상세 정보 생성
  function generateMockPaymentDetail(id) {
    const payment =
      generateMockPayments().find((p) => p.id === id) ||
      generateMockPayments()[0];

    // 거래 내역 생성
    const transactions = [];
    const transactionCount = Math.floor(Math.random() * 5) + 3;
    for (let i = 1; i <= transactionCount; i++) {
      transactions.push({
        id: i,
        type: Math.random() > 0.5 ? "incoming" : "outgoing",
        title: [
          "예약 수수료 정산",
          "월간 구독료 결제",
          "서비스 이용료",
          "환불 처리",
          "보너스 지급",
          "위약금 부과",
        ][Math.floor(Math.random() * 6)],
        description: "자동 처리된 거래입니다.",
        amount: Math.floor(Math.random() * 100000) + 10000,
        date: new Date(
          new Date(payment.date).getTime() -
            Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
        ).toISOString(),
      });
    }

    return {
      ...payment,
      transactions: transactions.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      ),
      paymentMethod: {
        type: payment.method,
        cardNumber: payment.method === "card" ? "**** **** **** 1234" : null,
        bankName: payment.method === "bank" ? "국민은행" : null,
        accountNumber: payment.method === "bank" ? "123-456-789012" : null,
        virtualAccount: payment.method === "virtual" ? "1234-56-7890123" : null,
      },
      fees: {
        processingFee: payment.processingFee,
        platformFee: Math.floor(payment.amount * 0.02),
        vatAmount: Math.floor(payment.amount * 0.1),
      },
      settlement: {
        scheduledDate: new Date(
          new Date(payment.date).getTime() + 7 * 24 * 60 * 60 * 1000
        ).toISOString(),
        status: payment.status === "completed" ? "scheduled" : "pending",
        bankAccount: "123-456-789012 (국민은행)",
      },
    };
  }

  if (isLoading) {
    return (
      <div className="super-admin-loading-container">
        <div className="super-admin-loading-spinner"></div>
        <p>결제 및 정산 데이터 로딩 중...</p>
      </div>
    );
  }

  // 상세 보기 모드 렌더링
  if (viewMode === "detail" && paymentDetail) {
    return (
      <div className="payment-detail-page">
        <div className="payment-detail-header">
          <button className="back-button" onClick={handleGoBack}>
            <ArrowLeft size={20} />
          </button>
          <div className="payment-detail-title-section">
            <h2 className="payment-detail-title">
              결제 상세 정보 #{paymentDetail.transactionId}
            </h2>
            <div className="payment-detail-subtitle">
              {paymentDetail.hospitalName} •{" "}
              {formatDateTime(paymentDetail.date)}
            </div>
          </div>
          <div className="payment-detail-status">
            {renderStatusBadge(paymentDetail.status)}
            {renderTypeBadge(paymentDetail.type)}
          </div>
        </div>

        <div className="payment-detail-content">
          <div className="payment-detail-main">
            <div className="payment-detail-card">
              <div className="payment-detail-card-header">
                <h3>결제 정보</h3>
              </div>
              <div className="payment-detail-card-content">
                <div className="payment-detail-info-grid">
                  <div className="payment-detail-info-item">
                    <div className="payment-detail-info-label">
                      <Receipt size={16} />
                      <span>거래 ID</span>
                    </div>
                    <div className="payment-detail-info-value">
                      {paymentDetail.transactionId}
                    </div>
                  </div>
                  <div className="payment-detail-info-item">
                    <div className="payment-detail-info-label">
                      <Building size={16} />
                      <span>병원</span>
                    </div>
                    <div className="payment-detail-info-value">
                      {paymentDetail.hospitalName} ({paymentDetail.hospitalType}
                      )
                    </div>
                  </div>
                  <div className="payment-detail-info-item">
                    <div className="payment-detail-info-label">
                      <DollarSign size={16} />
                      <span>결제 금액</span>
                    </div>
                    <div className="payment-detail-info-value">
                      {formatAmount(paymentDetail.amount)}원
                    </div>
                  </div>
                  <div className="payment-detail-info-item">
                    <div className="payment-detail-info-label">
                      <Calendar size={16} />
                      <span>결제 일시</span>
                    </div>
                    <div className="payment-detail-info-value">
                      {formatDateTime(paymentDetail.date)}
                    </div>
                  </div>
                  <div className="payment-detail-info-item">
                    <div className="payment-detail-info-label">
                      <CreditCard size={16} />
                      <span>결제 방법</span>
                    </div>
                    <div className="payment-detail-info-value">
                      {paymentDetail.method === "card"
                        ? "신용카드"
                        : paymentDetail.method === "bank"
                        ? "계좌이체"
                        : "가상계좌"}
                    </div>
                  </div>
                  <div className="payment-detail-info-item">
                    <div className="payment-detail-info-label">
                      <FileDown size={16} />
                      <span>설명</span>
                    </div>
                    <div className="payment-detail-info-value">
                      {paymentDetail.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="payment-detail-card">
              <div className="payment-detail-card-header">
                <h3>수수료 및 정산</h3>
              </div>
              <div className="payment-detail-card-content">
                <div className="payment-detail-info-grid">
                  <div className="payment-detail-info-item">
                    <div className="payment-detail-info-label">
                      <span>결제 금액</span>
                    </div>
                    <div className="payment-detail-info-value">
                      {formatAmount(paymentDetail.amount)}원
                    </div>
                  </div>
                  <div className="payment-detail-info-item">
                    <div className="payment-detail-info-label">
                      <span>처리 수수료</span>
                    </div>
                    <div className="payment-detail-info-value">
                      -{formatAmount(paymentDetail.fees.processingFee)}원
                    </div>
                  </div>
                  <div className="payment-detail-info-item">
                    <div className="payment-detail-info-label">
                      <span>플랫폼 수수료</span>
                    </div>
                    <div className="payment-detail-info-value">
                      -{formatAmount(paymentDetail.fees.platformFee)}원
                    </div>
                  </div>
                  <div className="payment-detail-info-item">
                    <div className="payment-detail-info-label">
                      <span>부가세</span>
                    </div>
                    <div className="payment-detail-info-value">
                      -{formatAmount(paymentDetail.fees.vatAmount)}원
                    </div>
                  </div>
                  <div className="payment-detail-info-item">
                    <div className="payment-detail-info-label">
                      <span>정산 금액</span>
                    </div>
                    <div className="payment-detail-info-value">
                      <strong>
                        {formatAmount(
                          paymentDetail.amount -
                            paymentDetail.fees.processingFee -
                            paymentDetail.fees.platformFee -
                            paymentDetail.fees.vatAmount
                        )}
                        원
                      </strong>
                    </div>
                  </div>
                  <div className="payment-detail-info-item">
                    <div className="payment-detail-info-label">
                      <span>정산 예정일</span>
                    </div>
                    <div className="payment-detail-info-value">
                      {formatDate(paymentDetail.settlement.scheduledDate)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="payment-detail-card">
              <div className="payment-detail-card-header">
                <h3>거래 내역</h3>
              </div>
              <div className="payment-detail-card-content">
                <div className="transaction-list">
                  {paymentDetail.transactions.map((transaction) => (
                    <div key={transaction.id} className="transaction-item">
                      <div
                        className={`transaction-icon ${
                          transaction.type === "incoming"
                            ? "incoming"
                            : "outgoing"
                        }`}
                      >
                        {transaction.type === "incoming" ? (
                          <ArrowDownLeft size={20} />
                        ) : (
                          <ArrowUpRight size={20} />
                        )}
                      </div>
                      <div className="transaction-info">
                        <div className="transaction-title">
                          {transaction.title}
                        </div>
                        <div className="transaction-description">
                          {transaction.description}
                        </div>
                      </div>
                      <div>
                        <div
                          className={`transaction-amount ${
                            transaction.type === "incoming"
                              ? "positive"
                              : "negative"
                          }`}
                        >
                          {transaction.type === "incoming" ? "+" : "-"}
                          {formatAmount(transaction.amount)}원
                        </div>
                        <div className="transaction-date">
                          {formatDateTime(transaction.date)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="payment-detail-sidebar">
            <div className="payment-detail-card">
              <div className="payment-detail-card-header">
                <h3>결제 관리</h3>
              </div>
              <div className="payment-detail-card-content">
                <div className="settlement-management-buttons">
                  <button
                    className="settlement-action-button primary"
                    disabled={paymentDetail.status !== "pending"}
                  >
                    <CheckCircle size={16} />
                    <span>결제 승인</span>
                  </button>
                  <button
                    className="settlement-action-button"
                    disabled={paymentDetail.status !== "completed"}
                  >
                    <RefreshCw size={16} />
                    <span>환불 처리</span>
                  </button>
                  <button className="settlement-action-button">
                    <FileDown size={16} />
                    <span>영수증 다운로드</span>
                  </button>
                  <button className="settlement-action-button danger">
                    <XCircle size={16} />
                    <span>거래 취소</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="payment-detail-card">
              <div className="payment-detail-card-header">
                <h3>결제 방법 정보</h3>
              </div>
              <div className="payment-detail-card-content">
                <div className="payment-method-details">
                  <div className="payment-method-item">
                    <div className="payment-method-label">결제 수단</div>
                    <div className="payment-method-value">
                      {paymentDetail.method === "card"
                        ? "신용카드"
                        : paymentDetail.method === "bank"
                        ? "계좌이체"
                        : "가상계좌"}
                    </div>
                  </div>
                  {paymentDetail.paymentMethod.cardNumber && (
                    <div className="payment-method-item">
                      <div className="payment-method-label">카드 번호</div>
                      <div className="payment-method-value">
                        {paymentDetail.paymentMethod.cardNumber}
                      </div>
                    </div>
                  )}
                  {paymentDetail.paymentMethod.bankName && (
                    <div className="payment-method-item">
                      <div className="payment-method-label">은행</div>
                      <div className="payment-method-value">
                        {paymentDetail.paymentMethod.bankName}
                      </div>
                    </div>
                  )}
                  {paymentDetail.paymentMethod.accountNumber && (
                    <div className="payment-method-item">
                      <div className="payment-method-label">계좌 번호</div>
                      <div className="payment-method-value">
                        {paymentDetail.paymentMethod.accountNumber}
                      </div>
                    </div>
                  )}
                  {paymentDetail.paymentMethod.virtualAccount && (
                    <div className="payment-method-item">
                      <div className="payment-method-label">가상계좌</div>
                      <div className="payment-method-value">
                        {paymentDetail.paymentMethod.virtualAccount}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="payment-detail-card">
              <div className="payment-detail-card-header">
                <h3>정산 정보</h3>
              </div>
              <div className="payment-detail-card-content">
                <div className="settlement-schedule-list">
                  <div className="settlement-schedule-item">
                    <div className="settlement-schedule-label">정산 상태</div>
                    <div className="settlement-schedule-value">
                      <span
                        className={`settlement-schedule-badge ${
                          paymentDetail.settlement.status === "scheduled"
                            ? "active"
                            : "inactive"
                        }`}
                      >
                        {paymentDetail.settlement.status === "scheduled"
                          ? "예정"
                          : "대기"}
                      </span>
                    </div>
                  </div>
                  <div className="settlement-schedule-item">
                    <div className="settlement-schedule-label">정산 예정일</div>
                    <div className="settlement-schedule-value">
                      {formatDate(paymentDetail.settlement.scheduledDate)}
                    </div>
                  </div>
                  <div className="settlement-schedule-item">
                    <div className="settlement-schedule-label">정산 계좌</div>
                    <div className="settlement-schedule-value">
                      {paymentDetail.settlement.bankAccount}
                    </div>
                  </div>
                  <div className="settlement-schedule-item">
                    <div className="settlement-schedule-label">정산 금액</div>
                    <div className="settlement-schedule-value">
                      <strong>
                        {formatAmount(
                          paymentDetail.amount -
                            paymentDetail.fees.processingFee -
                            paymentDetail.fees.platformFee -
                            paymentDetail.fees.vatAmount
                        )}
                        원
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 목록 모드 렌더링
  return (
    <div className="payment-management">
      <div className="super-admin-section-header">
        <h2 className="super-admin-section-title">결제 및 정산 관리</h2>
        <p className="super-admin-section-description">
          플랫폼의 모든 결제 내역과 정산을 관리합니다.
        </p>
      </div>

      {/* 통계 카드 */}
      <div className="payment-stats-grid">
        <div className="payment-stat-card">
          <div className="payment-stat-icon blue">
            <DollarSign size={24} />
          </div>
          <div className="payment-stat-info">
            <p className="payment-stat-label">총 매출</p>
            <h3 className="payment-stat-value">
              {formatAmount(paymentStats.totalRevenue)}원
            </h3>
            <div className="payment-stat-trend up">
              <TrendingUp size={14} />
              <span>+12.5% 전월 대비</span>
            </div>
          </div>
        </div>
        <div className="payment-stat-card">
          <div className="payment-stat-icon green">
            <TrendingUp size={24} />
          </div>
          <div className="payment-stat-info">
            <p className="payment-stat-label">이번 달 매출</p>
            <h3 className="payment-stat-value">
              {formatAmount(paymentStats.monthlyRevenue)}원
            </h3>
            <div className="payment-stat-trend up">
              <TrendingUp size={14} />
              <span>+8.3% 전월 대비</span>
            </div>
          </div>
        </div>
        <div className="payment-stat-card">
          <div className="payment-stat-icon amber">
            <AlertTriangle size={24} />
          </div>
          <div className="payment-stat-info">
            <p className="payment-stat-label">대기 중 금액</p>
            <h3 className="payment-stat-value">
              {formatAmount(paymentStats.pendingAmount)}원
            </h3>
            <div className="payment-stat-trend down">
              <TrendingDown size={14} />
              <span>-2.1% 전월 대비</span>
            </div>
          </div>
        </div>
        <div className="payment-stat-card">
          <div className="payment-stat-icon red">
            <RefreshCw size={24} />
          </div>
          <div className="payment-stat-info">
            <p className="payment-stat-label">환불 금액</p>
            <h3 className="payment-stat-value">
              {formatAmount(paymentStats.refundedAmount)}원
            </h3>
            <div className="payment-stat-trend up">
              <TrendingUp size={14} />
              <span>+1.2% 전월 대비</span>
            </div>
          </div>
        </div>
      </div>

      <div className="payment-management-actions">
        <div className="payment-search-filter-container">
          <div className="payment-admin-search-bar">
            <Search size={18} className="payment-search-icon" />
            <input
              type="text"
              placeholder="거래 ID, 병원명, 결제 방법 검색..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="payment-admin-search-input"
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

        <div className="payment-action-buttons">
          <button className="super-admin-button super-admin-button-secondary">
            <Settings size={16} />
            수수료 설정
          </button>
          <button className="super-admin-button super-admin-button-secondary">
            <Download size={16} />
            내보내기
          </button>
          <button className="super-admin-button super-admin-button-primary">
            <Plus size={16} />
            수동 정산
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="super-admin-filters">
          <div className="super-admin-filter-group">
            <label className="super-admin-filter-label">결제 상태</label>
            <div className="super-admin-filter-options">
              <button
                className={`super-admin-filter-option ${
                  filterOptions.status === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "all")}
              >
                전체
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.status === "completed" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "completed")}
              >
                완료
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.status === "pending" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "pending")}
              >
                대기
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.status === "failed" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "failed")}
              >
                실패
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.status === "refunded" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "refunded")}
              >
                환불
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.status === "cancelled" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "cancelled")}
              >
                취소
              </button>
            </div>
          </div>

          <div className="super-admin-filter-group">
            <label className="super-admin-filter-label">결제 유형</label>
            <div className="super-admin-filter-options">
              <button
                className={`super-admin-filter-option ${
                  filterOptions.type === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("type", "all")}
              >
                전체
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.type === "subscription" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("type", "subscription")}
              >
                구독료
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.type === "commission" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("type", "commission")}
              >
                수수료
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.type === "fee" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("type", "fee")}
              >
                이용료
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.type === "penalty" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("type", "penalty")}
              >
                위약금
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.type === "bonus" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("type", "bonus")}
              >
                보너스
              </button>
            </div>
          </div>

          <div className="super-admin-filter-group">
            <label className="super-admin-filter-label">결제 방법</label>
            <div className="super-admin-filter-options">
              <button
                className={`super-admin-filter-option ${
                  filterOptions.method === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("method", "all")}
              >
                전체
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.method === "card" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("method", "card")}
              >
                신용카드
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.method === "bank" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("method", "bank")}
              >
                계좌이체
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.method === "virtual" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("method", "virtual")}
              >
                가상계좌
              </button>
            </div>
          </div>

          <div className="super-admin-filter-group">
            <label className="super-admin-filter-label">기간</label>
            <div className="super-admin-filter-options">
              <button
                className={`super-admin-filter-option ${
                  filterOptions.dateRange === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "all")}
              >
                전체
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.dateRange === "1week" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "1week")}
              >
                1주일
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.dateRange === "1month" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "1month")}
              >
                1개월
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.dateRange === "3months" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "3months")}
              >
                3개월
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.dateRange === "6months" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "6months")}
              >
                6개월
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.dateRange === "1year" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "1year")}
              >
                1년
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="payment-list-header">
        <h3 className="payment-list-title">결제 내역</h3>
        <div className="payment-count">
          총 <span className="count-highlight">{filteredPayments.length}</span>
          건
        </div>
      </div>

      {filteredPayments.length === 0 ? (
        <div className="super-admin-empty-state">
          <div className="super-admin-empty-icon">
            <DollarSign size={48} />
          </div>
          <h3 className="super-admin-empty-title">결제 내역이 없습니다</h3>
          <p className="super-admin-empty-description">
            검색 조건에 맞는 결제 내역이 없습니다. 다른 검색어나 필터를
            사용해보세요.
          </p>
        </div>
      ) : (
        <>
          <div className="super-admin-table-container">
            <table className="super-admin-table">
              <thead>
                <tr>
                  <th>거래 ID</th>
                  <th>병원</th>
                  <th>금액</th>
                  <th>유형</th>
                  <th>결제 방법</th>
                  <th>상태</th>
                  <th>날짜</th>
                  <th>작업</th>
                </tr>
              </thead>
              <tbody>
                {currentPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    onClick={() => handlePaymentClick(payment)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>
                      <strong>{payment.transactionId}</strong>
                    </td>
                    <td>
                      <div className="payment-hospital-info">
                        <div className="payment-hospital-name">
                          {payment.hospitalName}
                        </div>
                        <div className="payment-hospital-type">
                          {payment.hospitalType}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div
                        className={`payment-amount ${
                          payment.amount > 0 ? "positive" : "negative"
                        }`}
                      >
                        {formatAmount(payment.amount)}원
                      </div>
                    </td>
                    <td>{renderTypeBadge(payment.type)}</td>
                    <td>
                      <div className="payment-method-info">
                        {renderPaymentMethodIcon(payment.method)}
                        <span>
                          {payment.method === "card"
                            ? "신용카드"
                            : payment.method === "bank"
                            ? "계좌이체"
                            : "가상계좌"}
                        </span>
                      </div>
                    </td>
                    <td>{renderStatusBadge(payment.status)}</td>
                    <td>
                      <div className="payment-date">
                        {formatDateTime(payment.date)}
                      </div>
                    </td>
                    <td>
                      <div
                        className="payment-actions"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="action-button view"
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewDetail
                              ? onViewDetail(payment.id)
                              : handlePaymentClick(payment);
                          }}
                          title="상세 보기"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="action-button download"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log("영수증 다운로드:", payment.id);
                          }}
                          title="영수증 다운로드"
                        >
                          <FileDown size={16} />
                        </button>
                        {payment.status === "completed" && (
                          <button
                            className="action-button refund"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRefund(payment.id, payment.amount);
                            }}
                            title="환불 처리"
                          >
                            <RefreshCw size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
                  (pageNumber === currentPage - 3 && currentPage > 3) ||
                  (pageNumber === currentPage + 3 &&
                    currentPage < totalPages - 2)
                ) {
                  return (
                    <span key={pageNumber} className="pagination-ellipsis">
                      ...
                    </span>
                  );
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

      {showModal && (
        <PaymentModal
          payment={selectedPayment}
          onClose={handleCloseModal}
          onRefund={handleRefund}
        />
      )}
    </div>
  );
};

export default PaymentManagement;
