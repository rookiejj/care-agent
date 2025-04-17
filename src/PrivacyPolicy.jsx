import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "./App";
import { Lock, ChevronDown, ChevronUp } from "lucide-react";
import "./SettingsPages.css";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({
    collection: true, // 개인정보 수집 항목
    purpose: false, // 개인정보 이용 목적
    retention: false, // 개인정보 보유 기간
    sharing: false, // 개인정보 제3자 제공
    rights: false, // 정보주체의 권리
  });

  const handleBackClick = () => {
    navigate(-1);
  };

  // 섹션 확장/축소 토글 함수
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  return (
    <div className="container">
      <div className="fixed-header">
        <PageHeader
          title="개인정보처리방침"
          backButtonVisible={true}
          onBack={handleBackClick}
        />
      </div>

      <div className="settings-content">
        <div className="settings-card">
          <h3 className="settings-section-title">
            <Lock size={18} />
            개인정보처리방침
          </h3>

          <div className="terms-content">
            <p>
              회사는 이용자의 개인정보를 중요시하며, 「정보통신망 이용촉진 및
              정보보호 등에 관한 법률」, 「개인정보 보호법」 등 관련 법령을
              준수하기 위해 노력하고 있습니다. 회사는 개인정보처리방침을 통해
              회사가 이용자로부터 수집하는 개인정보의 항목, 수집 및 이용목적,
              보유 및 이용기간, 정보주체의 권리 등 개인정보와 관련된 사항을
              안내드립니다.
            </p>

            {/* 섹션 1: 개인정보 수집 항목 */}
            <div className="faq-item">
              <div
                className="faq-question"
                onClick={() => toggleSection("collection")}
              >
                <div className="faq-question-text">
                  1. 수집하는 개인정보 항목
                </div>
                {expandedSections.collection ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </div>
              <div
                className={`faq-answer ${
                  expandedSections.collection ? "" : "hidden"
                }`}
              >
                <p>
                  회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.
                </p>
                <h3>필수 수집 항목</h3>
                <ul>
                  <li>
                    <strong>회원 가입 정보</strong> - 이름, 이메일 주소, 휴대폰
                    번호, 비밀번호
                  </li>
                  <li>
                    <strong>진료 예약 정보</strong> - 생년월일, 성별, 예약 날짜
                    및 시간, 진료 과목, 증상 정보
                  </li>
                  <li>
                    <strong>결제 정보</strong> - 신용카드 정보, 결제 내역
                  </li>
                </ul>

                <h3>선택 수집 항목</h3>
                <ul>
                  <li>
                    <strong>추가 건강 정보</strong> - 기존 질환, 복용 중인 약물,
                    알레르기
                  </li>
                  <li>
                    <strong>위치 정보</strong> - GPS 기반 위치 정보 (위치기반
                    서비스 이용 시)
                  </li>
                  <li>
                    <strong>마케팅 활용 정보</strong> - 서비스 이용 기록, 접속
                    로그, 쿠키
                  </li>
                </ul>

                <h3>자동 수집 항목</h3>
                <ul>
                  <li>IP 주소, 쿠키, 방문 일시, 서비스 이용 기록, 기기 정보</li>
                </ul>
              </div>
            </div>

            {/* 섹션 2: 개인정보 이용 목적 */}
            <div className="faq-item">
              <div
                className="faq-question"
                onClick={() => toggleSection("purpose")}
              >
                <div className="faq-question-text">
                  2. 개인정보의 수집 및 이용 목적
                </div>
                {expandedSections.purpose ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </div>
              <div
                className={`faq-answer ${
                  expandedSections.purpose ? "" : "hidden"
                }`}
              >
                <p>회사는 수집한 개인정보를 다음과 같은 목적으로 이용합니다.</p>
                <ul>
                  <li>
                    <strong>서비스 제공 및 관리</strong>
                    <ul>
                      <li>의료기관 정보 제공 및 예약 서비스 이용</li>
                      <li>진료 예약 확인 및 알림 서비스</li>
                      <li>결제 서비스 제공 및 관리</li>
                      <li>서비스 이용 기록 관리</li>
                    </ul>
                  </li>
                  <li>
                    <strong>회원 관리</strong>
                    <ul>
                      <li>회원 가입 및 탈퇴 처리</li>
                      <li>회원 본인확인 및 개인식별</li>
                      <li>회원 정보 관리 및 서비스 부정이용 방지</li>
                      <li>각종 고지사항 전달</li>
                    </ul>
                  </li>
                  <li>
                    <strong>서비스 개선 및 마케팅</strong>
                    <ul>
                      <li>신규 서비스 개발 및 기존 서비스 개선</li>
                      <li>
                        이벤트 및 마케팅 정보 제공 (마케팅 정보 수신 동의 시)
                      </li>
                      <li>서비스 이용 통계 분석</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            {/* 섹션 3: 개인정보 보유 기간 */}
            <div className="faq-item">
              <div
                className="faq-question"
                onClick={() => toggleSection("retention")}
              >
                <div className="faq-question-text">
                  3. 개인정보의 보유 및 이용 기간
                </div>
                {expandedSections.retention ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </div>
              <div
                className={`faq-answer ${
                  expandedSections.retention ? "" : "hidden"
                }`}
              >
                <p>
                  회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는
                  해당 정보를 지체 없이 파기합니다. 다만, 관계법령에 따라
                  보존하여야 하는 경우에는 해당 기간 동안 보존합니다.
                </p>
                <h3>회원 정보</h3>
                <ul>
                  <li>
                    회원 탈퇴 시 즉시 파기 (단, 불량 회원의 재가입 방지를 위한
                    최소한의 정보는 6개월간 보관)
                  </li>
                </ul>

                <h3>관련 법령에 따른 보존 기간</h3>
                <ul>
                  <li>
                    <strong>전자상거래 등에서의 소비자 보호에 관한 법률</strong>
                    <ul>
                      <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                      <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
                      <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
                    </ul>
                  </li>
                  <li>
                    <strong>통신비밀보호법</strong>
                    <ul>
                      <li>로그인 기록: 3개월</li>
                    </ul>
                  </li>
                  <li>
                    <strong>의료법</strong>
                    <ul>
                      <li>진료기록부: 10년</li>
                      <li>처방전: 2년</li>
                      <li>진단서 등: 3년</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            {/* 섹션 4: 개인정보 제3자 제공 */}
            <div className="faq-item">
              <div
                className="faq-question"
                onClick={() => toggleSection("sharing")}
              >
                <div className="faq-question-text">
                  4. 개인정보의 제3자 제공
                </div>
                {expandedSections.sharing ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </div>
              <div
                className={`faq-answer ${
                  expandedSections.sharing ? "" : "hidden"
                }`}
              >
                <p>
                  회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지
                  않습니다. 다만, 아래의 경우에는 예외로 합니다.
                </p>
                <ol>
                  <li>이용자가 사전에 동의한 경우</li>
                  <li>
                    법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와
                    방법에 따라 수사기관의 요구가 있는 경우
                  </li>
                </ol>

                <h3>개인정보 제3자 제공 현황</h3>
                <ul>
                  <li>
                    <strong>제공받는 자</strong>: 예약한 의료기관
                    <br />
                    <strong>제공 목적</strong>: 진료 예약 서비스 제공
                    <br />
                    <strong>제공 항목</strong>: 이름, 생년월일, 성별, 연락처,
                    예약 정보, 증상 정보
                    <br />
                    <strong>보유 기간</strong>: 해당 의료기관의 개인정보
                    처리방침에 따름
                  </li>
                  <li>
                    <strong>제공받는 자</strong>: 결제대행사
                    <br />
                    <strong>제공 목적</strong>: 결제 서비스 제공
                    <br />
                    <strong>제공 항목</strong>: 이름, 연락처, 결제 정보
                    <br />
                    <strong>보유 기간</strong>: 전자상거래 등에서의 소비자
                    보호에 관한 법률에 따른 보존 기간
                  </li>
                </ul>
              </div>
            </div>

            {/* 섹션 5: 정보주체의 권리 */}
            <div className="faq-item">
              <div
                className="faq-question"
                onClick={() => toggleSection("rights")}
              >
                <div className="faq-question-text">
                  5. 정보주체의 권리와 행사 방법
                </div>
                {expandedSections.rights ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </div>
              <div
                className={`faq-answer ${
                  expandedSections.rights ? "" : "hidden"
                }`}
              >
                <p>
                  정보주체는 회사에 대해 언제든지 다음의 권리를 행사할 수
                  있습니다.
                </p>
                <ol>
                  <li>개인정보 열람 요구</li>
                  <li>오류 등이 있을 경우 정정 요구</li>
                  <li>삭제 요구</li>
                  <li>처리정지 요구</li>
                </ol>

                <p>
                  위 권리 행사는 회사에 대해 서면, 전화, 이메일, 팩스 등을
                  통하여 하실 수 있으며 회사는 이에 대해 지체 없이
                  조치하겠습니다.
                </p>

                <h3>권리 행사 방법</h3>
                <ul>
                  <li>회원 정보 수정 페이지에서 직접 수정</li>
                  <li>
                    고객센터 문의 (이메일: privacy@example.com, 전화:
                    02-123-4567)
                  </li>
                  <li>개인정보 관리책임자에게 서면 요청</li>
                </ul>

                <p>
                  정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한
                  경우에는 회사는 정정 또는 삭제를 완료할 때까지 당해 개인정보를
                  이용하거나 제공하지 않습니다.
                </p>
              </div>
            </div>

            <p className="terms-date">최종 개정일: 2025년 04월 01일</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
