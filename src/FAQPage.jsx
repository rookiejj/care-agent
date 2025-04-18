import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "./App";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  CreditCard,
  Shield,
  Calendar,
  Smartphone,
  User,
} from "lucide-react";
import "./SettingsPages.css";

const FAQPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedQuestions, setExpandedQuestions] = useState({});

  // FAQ 카테고리 정의
  const categories = [
    { id: "all", name: "전체" },
    { id: "account", name: "계정", icon: <User size={16} /> },
    { id: "booking", name: "예약", icon: <Calendar size={16} /> },
    { id: "payment", name: "결제", icon: <CreditCard size={16} /> },
    { id: "medical", name: "진료", icon: <Shield size={16} /> },
    { id: "app", name: "앱 이용", icon: <Smartphone size={16} /> },
  ];

  // FAQ 데이터
  const faqData = [
    {
      id: 1,
      category: "account",
      question: "회원가입은 어떻게 하나요?",
      answer:
        "앱 첫 화면에서 '회원가입' 버튼을 클릭하여 진행할 수 있습니다. 이메일 주소, 휴대폰 번호 인증, 기본 정보 입력 후 약관 동의를 거쳐 가입이 완료됩니다.",
    },
    {
      id: 2,
      category: "account",
      question: "비밀번호를 잊어버렸어요.",
      answer:
        "로그인 화면에서 '비밀번호 찾기' 버튼을 클릭하여 가입 시 등록한 이메일 주소나 휴대폰 번호로 인증 후 새 비밀번호를 설정할 수 있습니다.",
    },
    {
      id: 3,
      category: "account",
      question: "회원 탈퇴는 어떻게 하나요?",
      answer:
        "마이페이지 > 설정 > 개인정보 설정에서 하단의 '계정 삭제하기' 버튼을 통해 탈퇴할 수 있습니다. 탈퇴 시 모든 개인정보는 즉시 삭제되며, 진행 중인 예약이 있다면 먼저 취소해야 합니다.",
    },
    {
      id: 4,
      category: "booking",
      question: "예약은 어떻게 하나요?",
      answer:
        "홈 화면에서 원하는 의료기관이나 의사를 검색하여 상세페이지로 이동한 후, '예약하기' 버튼을 클릭하면 날짜와 시간을 선택하여 예약할 수 있습니다. 예약 정보와 증상을 입력한 후 결제를 완료하면 예약이 확정됩니다.",
    },
    {
      id: 5,
      category: "booking",
      question: "예약을 변경하거나 취소하고 싶어요.",
      answer:
        "마이페이지 > 진료 예약 내역에서 해당 예약을 선택한 후, '일정 변경' 또는 '예약 취소' 버튼을 통해 변경 및 취소가 가능합니다. 단, 의료기관마다 취소 정책이 다를 수 있으니 사전에 확인해주세요.",
    },
    {
      id: 6,
      category: "booking",
      question: "예약 확인은 어디서 할 수 있나요?",
      answer:
        "마이페이지 > 진료 예약 내역에서 확인할 수 있으며, 예약 확정 시 문자와 앱 알림을 통해서도 안내됩니다.",
    },
    {
      id: 7,
      category: "payment",
      question: "결제 방법은 어떤 것이 있나요?",
      answer:
        "신용/체크카드, 실시간 계좌이체, 가상계좌, 휴대폰 결제 등 다양한 결제 수단을 지원합니다. 예약 시 결제 단계에서 원하는 방법을 선택할 수 있습니다.",
    },
    {
      id: 8,
      category: "payment",
      question: "예약 취소 시 환불은 어떻게 되나요?",
      answer:
        "의료기관별 환불 정책에 따라 다르며, 일반적으로 진료 24시간 전 취소 시 100% 환불, 당일 취소 시 일부 취소 수수료가 발생할 수 있습니다. 환불은 결제수단에 따라 3-7일 내에 처리됩니다.",
    },
    {
      id: 9,
      category: "payment",
      question: "결제 내역은 어디서 확인할 수 있나요?",
      answer:
        "마이페이지 > 결제 내역에서 확인할 수 있습니다. 날짜별, 의료기관별로 결제 내역을 조회할 수 있으며, 영수증 발급도 가능합니다.",
    },
    {
      id: 10,
      category: "medical",
      question: "진료시술 기록은 어디서 확인할 수 있나요?",
      answer:
        "마이페이지 > 진료/시술 기록에서 확인할 수 있습니다. 진료 날짜, 의료기관, 진료과목, 진단 내용, 처방 정보 등을 확인하실 수 있습니다.",
    },
    {
      id: 11,
      category: "medical",
      question: "처방전은 어떻게 받을 수 있나요?",
      answer:
        "진료 후 마이페이지 > 처방전 관리에서 전자처방전을 확인할 수 있습니다. 필요한 경우 처방전을 다운로드하거나 약국에 직접 전송할 수 있는 기능을 제공합니다.",
    },
    {
      id: 12,
      category: "app",
      question: "알림이 오지 않아요.",
      answer:
        "기기의 '설정 > 알림'에서 앱 알림이 활성화되어 있는지 확인해주세요. 앱 내에서도 '마이페이지 > 설정 > 알림 설정'에서 원하는 알림 유형을 설정할 수 있습니다.",
    },
    {
      id: 13,
      category: "app",
      question: "앱이 자꾸 종료돼요.",
      answer:
        "앱을 최신 버전으로 업데이트하거나, 기기를 재부팅해보세요. 문제가 지속되면 앱을 삭제 후 재설치하거나, '마이페이지 > 설정 > 고객센터'를 통해 문의해주세요.",
    },
    {
      id: 14,
      category: "app",
      question: "위치 서비스를 허용했는데도 내 위치가 제대로 표시되지 않아요.",
      answer:
        "기기의 '설정 > 개인정보 보호 > 위치 서비스'에서 정확한 위치 접근 권한이 허용되어 있는지 확인해주세요. GPS 신호가 약한 실내에서는 위치 정확도가 떨어질 수 있습니다.",
    },
    {
      id: 15,
      category: "app",
      question: "다른 기기에서도 로그인할 수 있나요?",
      answer:
        "네, 동일한 계정으로 여러 기기에서 로그인할 수 있습니다. 단, 보안을 위해 새로운 기기에서 로그인 시 추가 인증과정이 필요할 수 있습니다.",
    },
  ];

  const handleBackClick = () => {
    navigate(-1);
  };

  // 카테고리 변경 핸들러
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    // 카테고리 변경 시 확장된 질문 초기화
    setExpandedQuestions({});
  };

  // 질문 토글 핸들러
  const toggleQuestion = (questionId) => {
    setExpandedQuestions({
      ...expandedQuestions,
      [questionId]: !expandedQuestions[questionId],
    });
  };

  // 현재 카테고리에 맞는 FAQ 필터링
  const filteredFAQs =
    activeCategory === "all"
      ? faqData
      : faqData.filter((faq) => faq.category === activeCategory);

  return (
    <div className="container">
      <div className="fixed-header">
        <PageHeader
          title="자주 묻는 질문"
          backButtonVisible={true}
          onBack={handleBackClick}
        />
      </div>

      <div className="settings-content">
        {/* 카테고리 필터 */}
        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-button ${
                activeCategory === category.id ? "active" : ""
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.icon && (
                <span style={{ marginRight: "4px" }}>{category.icon}</span>
              )}
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQ 목록 */}
        <div className="settings-card">
          <h3 className="settings-section-title">
            <HelpCircle size={18} />
            자주 묻는 질문
          </h3>

          <div className="faq-list">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq) => (
                <div key={faq.id} className="faq-item">
                  <div
                    className="faq-question"
                    onClick={() => toggleQuestion(faq.id)}
                  >
                    <div className="faq-question-text">{faq.question}</div>
                    {expandedQuestions[faq.id] ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </div>
                  <div
                    className={`faq-answer ${
                      expandedQuestions[faq.id] ? "" : "hidden"
                    }`}
                  >
                    {faq.answer}
                  </div>
                </div>
              ))
            ) : (
              <p
                style={{
                  textAlign: "center",
                  color: "#6b7280",
                  padding: "2rem 0",
                }}
              >
                해당 카테고리에 등록된 FAQ가 없습니다.
              </p>
            )}
          </div>
        </div>

        {/* 추가 도움말 */}
        <div className="settings-card">
          <h3 className="settings-section-title">
            <HelpCircle size={18} />더 궁금한 점이 있으신가요?
          </h3>
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <p style={{ marginBottom: "1rem", color: "#4b5563" }}>
              원하는 답변을 찾지 못하셨다면 고객센터로 문의해주세요.
            </p>
            <button
              className="submit-button"
              onClick={() => navigate("/service")}
              style={{ maxWidth: "200px", margin: "0 auto" }}
            >
              고객센터 문의하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
