import React, { useState } from "react";
import {
  X,
  CheckCircle,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Receipt,
  CreditCard,
  Building,
  DollarSign,
  Calendar,
  FileDown,
  ArrowUpRight,
  ArrowDownLeft,
  Banknote,
  Info,
} from "lucide-react";
import "./PaymentModal.css";

const PaymentModal = ({
  payment,
  onClose,
  onRefund,
  onApprove,
  onCancel,
  onDownloadReceipt,
}) => {
  const [activeTab, setActiveTab] = useState("details");
  const [showRefundForm, setShowRefundForm] = useState(false);
  const [refundData, setRefundData] = useState({
    amount: payment?.amount || 0,
    reason: "",
    note: "",
  });

  if (!payment) return null;

  // 날짜 포맷 함수
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

  // 결제 승인 처리
  const handleApprove = () => {
    if (onApprove) {
      onApprove(payment.id);
    }
    onClose();
  };

  // 환불 폼 표시 및 스크롤
  const handleShowRefundForm = () => {
    setShowRefundForm(true);
    // 환불 폼이 렌더링된 후 스크롤
    setTimeout(() => {
      const refundForm = document.querySelector(".refund-form");
      if (refundForm) {
        refundForm.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    }, 100);
  };

  // 거래 취소 처리
  const handleCancel = () => {
    if (window.confirm("정말로 이 거래를 취소하시겠습니까?")) {
      if (onCancel) {
        onCancel(payment.id);
      }
      onClose();
    }
  };

  // 영수증 다운로드 처리
  const handleDownloadReceipt = () => {
    if (onDownloadReceipt) {
      onDownloadReceipt(payment.id);
    } else {
      // 기본 다운로드 로직
      const receiptData = {
        transactionId: payment.transactionId,
        hospitalName: payment.hospitalName,
        amount: payment.amount,
        date: payment.date,
        method: payment.method,
        status: payment.status,
        type: payment.type,
      };

      try {
        const dataStr = JSON.stringify(receiptData, null, 2);
        const dataUri =
          "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
        const exportFileDefaultName = `receipt_${payment.transactionId}.json`;
        const linkElement = document.createElement("a");
        linkElement.setAttribute("href", dataUri);
        linkElement.setAttribute("download", exportFileDefaultName);
        linkElement.click();

        // 다운로드 성공 시에만 알림 표시 (파일 저장 대화상자와 별개)
        // 사용자가 실제로 저장했는지 확인하기 어려우므로 알림 제거
      } catch (error) {
        alert("영수증 다운로드 중 오류가 발생했습니다.");
      }
    }
  };

  // 환불 처리
  const handleRefund = () => {
    if (!refundData.reason) {
      alert("환불 사유를 선택해주세요.");
      return;
    }
    if (refundData.amount <= 0 || refundData.amount > payment.amount) {
      alert("올바른 환불 금액을 입력해주세요.");
      return;
    }

    if (
      window.confirm(`${formatAmount(refundData.amount)}원을 환불하시겠습니까?`)
    ) {
      if (onRefund) {
        onRefund(
          payment.id,
          refundData.amount,
          refundData.reason,
          refundData.note
        );
      }
      setShowRefundForm(false);
      onClose();
    }
  };

  // 환불 폼 데이터 변경
  const handleRefundChange = (field, value) => {
    setRefundData({
      ...refundData,
      [field]: value,
    });
  };

  // 상태 아이콘 렌더링
  const renderStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={24} />;
      case "pending":
        return <AlertTriangle size={24} />;
      case "failed":
        return <XCircle size={24} />;
      case "refunded":
        return <RefreshCw size={24} />;
      default:
        return <Info size={24} />;
    }
  };

  // 상태 설명 가져오기
  const getStatusDescription = (status) => {
    switch (status) {
      case "completed":
        return "결제가 성공적으로 완료되었습니다.";
      case "pending":
        return "결제 승인을 대기 중입니다.";
      case "failed":
        return "결제 처리에 실패했습니다.";
      case "refunded":
        return "결제가 환불 처리되었습니다.";
      case "cancelled":
        return "결제가 취소되었습니다.";
      default:
        return "결제 상태를 확인할 수 없습니다.";
    }
  };

  // 거래 내역 생성 (mock data)
  const transactionHistory = [
    {
      id: 1,
      type: "payment",
      action: "결제 승인",
      amount: payment.amount,
      time: payment.date,
    },
    payment.status === "refunded" && {
      id: 2,
      type: "refund",
      action: "환불 처리",
      amount: -payment.refundAmount || -payment.amount,
      time: payment.refundDate || new Date().toISOString(),
    },
  ].filter(Boolean);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        <div className="payment-modal-header">
          <h2>결제 상세 정보</h2>
          <button className="modal-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="payment-modal-tabs">
          <button
            className={`payment-modal-tab ${
              activeTab === "details" ? "active" : ""
            }`}
            onClick={() => setActiveTab("details")}
          >
            <Receipt size={16} />
            결제 정보
          </button>
          <button
            className={`payment-modal-tab ${
              activeTab === "breakdown" ? "active" : ""
            }`}
            onClick={() => setActiveTab("breakdown")}
          >
            <DollarSign size={16} />
            금액 상세
          </button>
          <button
            className={`payment-modal-tab ${
              activeTab === "settlement" ? "active" : ""
            }`}
            onClick={() => setActiveTab("settlement")}
          >
            <Banknote size={16} />
            정산 정보
          </button>
          <button
            className={`payment-modal-tab ${
              activeTab === "history" ? "active" : ""
            }`}
            onClick={() => setActiveTab("history")}
          >
            <Calendar size={16} />
            거래 내역
          </button>
        </div>

        <div className="payment-modal-content">
          {activeTab === "details" && (
            <div className="payment-modal-details-content">
              <div className="payment-modal-section">
                <h3 className="payment-section-title">
                  <Receipt size={20} />
                  기본 정보
                </h3>
                <div className="payment-info-grid">
                  <div className="payment-info-item">
                    <div className="payment-info-label">거래 ID</div>
                    <div className="payment-info-value">
                      {payment.transactionId}
                    </div>
                  </div>
                  <div className="payment-info-item">
                    <div className="payment-info-label">병원명</div>
                    <div className="payment-info-value">
                      {payment.hospitalName}
                    </div>
                  </div>
                  <div className="payment-info-item">
                    <div className="payment-info-label">병원 유형</div>
                    <div className="payment-info-value">
                      {payment.hospitalType}
                    </div>
                  </div>
                  <div className="payment-info-item">
                    <div className="payment-info-label">결제 금액</div>
                    <div className="payment-info-value">
                      {formatAmount(payment.amount)}원
                    </div>
                  </div>
                  <div className="payment-info-item">
                    <div className="payment-info-label">결제 유형</div>
                    <div className="payment-info-value">
                      {payment.type === "subscription"
                        ? "구독료"
                        : payment.type === "commission"
                        ? "수수료"
                        : payment.type === "fee"
                        ? "이용료"
                        : payment.type === "penalty"
                        ? "위약금"
                        : "보너스"}
                    </div>
                  </div>
                  <div className="payment-info-item">
                    <div className="payment-info-label">결제 일시</div>
                    <div className="payment-info-value">
                      {formatDateTime(payment.date)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="payment-modal-section">
                <h3 className="payment-section-title">
                  <Info size={20} />
                  결제 상태
                </h3>
                <div className="payment-status-info">
                  <div className={`payment-status-icon ${payment.status}`}>
                    {renderStatusIcon(payment.status)}
                  </div>
                  <div className="payment-status-details">
                    <h4 className="payment-status-title">
                      {payment.status === "completed"
                        ? "결제 완료"
                        : payment.status === "pending"
                        ? "결제 대기"
                        : payment.status === "failed"
                        ? "결제 실패"
                        : payment.status === "refunded"
                        ? "환불 완료"
                        : "결제 취소"}
                    </h4>
                    <p className="payment-status-description">
                      {getStatusDescription(payment.status)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="payment-modal-section">
                <h3 className="payment-section-title">
                  <CreditCard size={20} />
                  결제 방법
                </h3>
                <div className="payment-method-details">
                  <div className="payment-method-item">
                    <div className="payment-method-label">결제 수단</div>
                    <div className="payment-method-value">
                      {payment.method === "card"
                        ? "신용카드"
                        : payment.method === "bank"
                        ? "계좌이체"
                        : payment.method === "manual"
                        ? "수동정산"
                        : "가상계좌"}
                    </div>
                  </div>
                  {payment.method === "card" && (
                    <div className="payment-method-item">
                      <div className="payment-method-label">카드 정보</div>
                      <div className="payment-method-value">
                        **** **** **** 1234
                      </div>
                    </div>
                  )}
                  {payment.method === "bank" && (
                    <>
                      <div className="payment-method-item">
                        <div className="payment-method-label">은행명</div>
                        <div className="payment-method-value">국민은행</div>
                      </div>
                      <div className="payment-method-item">
                        <div className="payment-method-label">계좌번호</div>
                        <div className="payment-method-value">
                          123-456-789012
                        </div>
                      </div>
                    </>
                  )}
                  {payment.method === "virtual" && (
                    <div className="payment-method-item">
                      <div className="payment-method-label">가상계좌</div>
                      <div className="payment-method-value">
                        1234-56-7890123
                      </div>
                    </div>
                  )}
                  {payment.method === "manual" && (
                    <div className="payment-method-item">
                      <div className="payment-method-label">처리 방식</div>
                      <div className="payment-method-value">
                        관리자 수동 정산
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="payment-modal-section">
                <h3 className="payment-section-title">관리 작업</h3>
                <div className="payment-actions-grid">
                  <button
                    className="payment-action-button primary"
                    disabled={payment.status !== "pending"}
                    onClick={handleApprove}
                  >
                    <CheckCircle size={16} />
                    결제 승인
                  </button>
                  <button
                    className="payment-action-button danger"
                    disabled={payment.status !== "completed"}
                    onClick={handleShowRefundForm}
                  >
                    <RefreshCw size={16} />
                    환불 처리
                  </button>
                  <button
                    className="payment-action-button"
                    onClick={handleDownloadReceipt}
                  >
                    <FileDown size={16} />
                    영수증 다운로드
                  </button>
                  <button
                    className="payment-action-button"
                    disabled={
                      payment.status === "cancelled" ||
                      payment.status === "refunded"
                    }
                    onClick={handleCancel}
                  >
                    <XCircle size={16} />
                    거래 취소
                  </button>
                </div>
              </div>

              {showRefundForm && (
                <div className="payment-modal-section">
                  <div className="refund-form">
                    <h4 className="refund-form-title">
                      <RefreshCw size={20} />
                      환불 처리
                    </h4>
                    <div className="refund-form-group">
                      <label className="refund-form-label">환불 금액</label>
                      <input
                        type="number"
                        className="refund-form-input"
                        value={refundData.amount}
                        onChange={(e) =>
                          handleRefundChange(
                            "amount",
                            parseInt(e.target.value) || 0
                          )
                        }
                        max={payment.amount}
                        min={0}
                      />
                      <div className="refund-form-help">
                        최대 환불 가능 금액: {formatAmount(payment.amount)}원
                      </div>
                    </div>
                    <div className="refund-form-group">
                      <label className="refund-form-label">환불 사유</label>
                      <select
                        className="refund-form-input"
                        value={refundData.reason}
                        onChange={(e) =>
                          handleRefundChange("reason", e.target.value)
                        }
                      >
                        <option value="">선택해주세요</option>
                        <option value="customer_request">고객 요청</option>
                        <option value="system_error">시스템 오류</option>
                        <option value="duplicate_payment">중복 결제</option>
                        <option value="service_cancel">서비스 취소</option>
                        <option value="other">기타</option>
                      </select>
                    </div>
                    <div className="refund-form-group">
                      <label className="refund-form-label">환불 메모</label>
                      <textarea
                        className="refund-form-input refund-form-textarea"
                        value={refundData.note}
                        onChange={(e) =>
                          handleRefundChange("note", e.target.value)
                        }
                        placeholder="환불 처리에 대한 추가 설명을 입력하세요"
                      />
                    </div>
                    <div className="refund-buttons">
                      <button
                        className="refund-cancel-button"
                        onClick={() => setShowRefundForm(false)}
                      >
                        취소
                      </button>
                      <button
                        className="refund-confirm-button"
                        onClick={handleRefund}
                        disabled={!refundData.reason || refundData.amount <= 0}
                      >
                        환불 처리
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "breakdown" && (
            <div className="payment-modal-section">
              <h3 className="payment-section-title">
                <DollarSign size={20} />
                금액 상세 내역
              </h3>
              <div className="payment-amount-breakdown">
                <div className="payment-breakdown-item">
                  <div className="payment-breakdown-label">결제 금액</div>
                  <div className="payment-breakdown-value">
                    {formatAmount(payment.amount)}원
                  </div>
                </div>
                <div className="payment-breakdown-item">
                  <div className="payment-breakdown-label">처리 수수료</div>
                  <div className="payment-breakdown-value">
                    -{formatAmount(payment.processingFee || 0)}원
                  </div>
                </div>
                <div className="payment-breakdown-item">
                  <div className="payment-breakdown-label">플랫폼 수수료</div>
                  <div className="payment-breakdown-value">
                    -{formatAmount(Math.floor(payment.amount * 0.02))}원
                  </div>
                </div>
                <div className="payment-breakdown-item">
                  <div className="payment-breakdown-label">부가세 (10%)</div>
                  <div className="payment-breakdown-value">
                    -{formatAmount(Math.floor(payment.amount * 0.1))}원
                  </div>
                </div>
                <div className="payment-breakdown-item">
                  <div className="payment-breakdown-label">실 정산 금액</div>
                  <div className="payment-breakdown-value">
                    {formatAmount(
                      payment.netAmount || Math.floor(payment.amount * 0.85)
                    )}
                    원
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settlement" && (
            <div className="payment-modal-section">
              <h3 className="payment-section-title">
                <Banknote size={20} />
                정산 정보
              </h3>
              <div className="settlement-details">
                <div className="settlement-item">
                  <div className="settlement-label">정산 상태</div>
                  <div className="settlement-value">
                    {payment.status === "completed" ? "정산 예정" : "정산 대기"}
                  </div>
                </div>
                <div className="settlement-item">
                  <div className="settlement-label">정산 예정일</div>
                  <div className="settlement-value">
                    {payment.status === "completed"
                      ? new Date(
                          new Date(payment.date).getTime() +
                            7 * 24 * 60 * 60 * 1000
                        ).toLocaleDateString("ko-KR")
                      : "-"}
                  </div>
                </div>
                <div className="settlement-item">
                  <div className="settlement-label">정산 금액</div>
                  <div className="settlement-value">
                    {formatAmount(
                      payment.netAmount || Math.floor(payment.amount * 0.85)
                    )}
                    원
                  </div>
                </div>
                <div className="settlement-item">
                  <div className="settlement-label">정산 계좌</div>
                  <div className="settlement-value">
                    123-456-789012 (국민은행)
                  </div>
                </div>
                <div className="settlement-item">
                  <div className="settlement-label">수수료율</div>
                  <div className="settlement-value">15%</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="payment-modal-section">
              <h3 className="payment-section-title">
                <Calendar size={20} />
                거래 내역
              </h3>
              <div className="transaction-history">
                <div className="transaction-history-header">
                  <h4 className="transaction-history-title">처리 기록</h4>
                </div>
                <div className="transaction-history-list">
                  {transactionHistory.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="transaction-history-item"
                    >
                      <div
                        className={`transaction-history-icon ${transaction.type}`}
                      >
                        {transaction.type === "payment" ? (
                          <ArrowDownLeft size={16} />
                        ) : (
                          <ArrowUpRight size={16} />
                        )}
                      </div>
                      <div className="transaction-history-info">
                        <h5 className="transaction-history-action">
                          {transaction.action}
                        </h5>
                        <p className="transaction-history-time">
                          {formatDateTime(transaction.time)}
                        </p>
                      </div>
                      <div
                        className={`transaction-history-amount ${
                          transaction.amount > 0 ? "positive" : "negative"
                        }`}
                      >
                        {transaction.amount > 0 ? "+" : ""}
                        {formatAmount(Math.abs(transaction.amount))}원
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
