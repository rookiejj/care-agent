import React from "react";
import {
  Stethoscope,
  ArrowRight,
  MessageCircle,
  Search,
  HelpCircle,
} from "lucide-react";
import "./SymptomCheckerEntry.css";

const SymptomCheckerEntry = () => {
  return (
    <div className="section-container symptom-checker-container">
      <div className="symptom-checker-content">
        <div className="symptom-checker-header">
          <div className="symptom-checker-icon-container">
            <Stethoscope className="symptom-checker-icon" />
          </div>

          <div>
            <h3 className="symptom-checker-title" style={{ margin: "0" }}>
              증상 체커
            </h3>
            <p className="symptom-checker-subtitle" style={{ margin: "0" }}>
              증상을 입력하고 간단한 건강 평가를 받아보세요
            </p>
          </div>
        </div>

        <div className="symptom-checker-buttons">
          <button className="symptom-checker-button">
            <div className="symptom-checker-button-text">
              <Search className="symptom-checker-button-icon" />
              <span className="symptom-checker-button-label">
                증상으로 검색하기
              </span>
            </div>
            <ArrowRight className="symptom-checker-button-arrow" />
          </button>

          <button className="symptom-checker-button">
            <div className="symptom-checker-button-text">
              <MessageCircle className="symptom-checker-button-icon" />
              <span className="symptom-checker-button-label">
                AI 증상 평가 받기
              </span>
            </div>
            <ArrowRight className="symptom-checker-button-arrow" />
          </button>
        </div>

        <div className="symptom-checker-notice">
          <span className="symptom-checker-emergency">
            <HelpCircle className="symptom-checker-emergency-icon" />
            의료 긴급상황 시 119에 연락하세요
          </span>
          <button className="symptom-checker-learn-more">
            자세히 알아보기
          </button>
        </div>
      </div>

      <div className="symptom-checker-footer">
        <div className="symptom-checker-footer-content">
          <div className="symptom-checker-stats">
            <div className="symptom-checker-stats-row">
              <span className="symptom-checker-stats-label">지금까지</span>
              <span className="symptom-checker-stats-value">23,456명</span>
              <span className="symptom-checker-stats-label">
                &nbsp;이 증상 체커를 이용했습니다
              </span>
            </div>
            {/* <div className="symptom-checker-stats-description">
              이 증상 체커를 이용했습니다
            </div> */}
          </div>

          <button className="symptom-checker-start-button">시작하기</button>
        </div>
      </div>
    </div>
  );
};

export default SymptomCheckerEntry;
