import React, { useState } from "react";
import { Heart, MessageCircle, Calendar, X } from "lucide-react";
import "./DoctorCard.css";

const DoctorCard = ({ item }) => {
  // 별점을 표현하는 함수
  const renderStars = (rating) => {
    // 소수점 반올림하여 별 표시
    const fullStars = Math.floor(rating);
    let stars = "";
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars += "★";
      } else {
        stars += "☆";
      }
    }
    return stars;
  };

  // 의사 전문 과목에 따른 태그 스타일 클래스 결정
  const getSpecialtyTagClass = (specialty) => {
    const specialtyClasses = {
      neurology: "neurology",
      cardiology: "cardiology",
      dermatology: "dermatology",
      orthopedics: "orthopedics",
      gastroenterology: "gastroenterology",
      ophthalmology: "ophthalmology",
      ent: "ent",
      psychiatry: "psychiatry",
      pulmonology: "pulmonology",
    };

    return specialtyClasses[specialty] || "default";
  };

  // 전문 과목 한글명 매핑
  const getSpecialtyKoreanName = (specialty) => {
    const specialtyNames = {
      neurology: "신경과",
      cardiology: "심장내과",
      dermatology: "피부과",
      orthopedics: "정형외과",
      gastroenterology: "소화기내과",
      ophthalmology: "안과",
      ent: "이비인후과",
      psychiatry: "정신건강의학과",
      pulmonology: "호흡기내과",
      internal: "내과",
      family: "가정의학과",
      pain: "통증의학과",
      allergy: "알레르기내과",
      surgery: "외과",
      pediatrics: "소아과",
      obgyn: "산부인과",
      urology: "비뇨기과",
      rehabilitation: "재활의학과",
      dentistry: "치과",
      oriental: "한의원",
      endocrinology: "내분비내과",
      plastic: "성형외과",
    };

    return specialtyNames[specialty] || specialty;
  };

  // 서브스페셜티 태그 한글화 함수
  // 서브스페셜티 태그 한글화 함수 - 간결한 전문 용어로 변경
  const getSubSpecialtyKoreanName = (tag) => {
    // 전체 태그 매핑 (medicalCategoryData.js의 subCategories에서 추출)
    const fullTagKoreanMap = {
      // 머리/두통 관련
      "head-pain": "두통",
      "head-dizziness": "어지럼증",
      "head-migraine": "편두통",
      "head-heaviness": "두부무거움",
      "head-pressure": "두부압박감",
      "head-numb": "두부저림",
      "head-memory": "기억력저하",

      // 감기/기침/목아픔 관련
      "cold-cough": "기침",
      "cold-sore-throat": "인후통",
      "cold-runny-nose": "콧물",
      "cold-stuffy-nose": "비강폐색",
      "cold-sneezing": "재채기",
      "cold-phlegm": "가래",
      "cold-hard-breath": "호흡곤란",
      "cold-voice": "음성변화",

      // 배/소화 문제 관련
      "stomach-pain": "복통",
      "stomach-nausea": "구역감",
      "stomach-diarrhea": "설사",
      "stomach-constipation": "변비",
      "stomach-indigestion": "소화불량",
      "stomach-heartburn": "속쓰림",
      "stomach-bloating": "복부팽만감",
      "stomach-gas": "가스과다",
      "stomach-vomiting": "구토",

      // 피부 문제 관련
      "skin-rash": "발진",
      "skin-itchy": "소양증",
      "skin-dry": "건조피부",
      "skin-acne": "여드름",
      "skin-hives": "두드러기",
      "skin-wound": "상처/염증",
      "skin-color": "색소침착",
      "skin-swollen": "피부부종",
      "skin-hairloss": "탈모",

      // 관절/근육 통증 관련
      "joint-back": "요통",
      "joint-knee": "슬관절통",
      "joint-shoulder": "견관절통",
      "joint-neck": "경부통",
      "joint-wrist": "완/족관절통",
      "joint-muscle": "근육통",
      "joint-swelling": "관절부종",
      "joint-stiffness": "관절강직",
      "joint-sprain": "염좌",

      // 가슴/심장 문제 관련
      "chest-pain": "흉통",
      "chest-palpitation": "심계항진",
      "chest-breath": "호흡곤란",
      "chest-pressure": "흉부압박감",
      "chest-cough": "기침성흉통",
      "chest-burn": "흉부작열감",

      // 수면/피로 관련
      "sleep-insomnia": "불면증",
      "sleep-too-much": "과다수면",
      "sleep-tired": "만성피로",
      "sleep-apnea": "수면무호흡",
      "sleep-snoring": "코골이",
      "sleep-nightmares": "악몽",
      "sleep-energy": "기력저하",

      // 눈 문제 관련
      "eye-pain": "안통",
      "eye-red": "충혈",
      "eye-dry": "건조안",
      "eye-itchy": "안구소양감",
      "eye-vision": "시력저하",
      "eye-blur": "시야흐림",
      "eye-double": "복시",
      "eye-stye": "맥립종",
      "eye-light": "광과민성",

      // 귀 문제 관련
      "ear-pain": "이통",
      "ear-ringing": "이명",
      "ear-hearing": "청력저하",
      "ear-discharge": "이루",
      "ear-itchy": "외이도소양감",
      "ear-fullness": "이충만감",
      "ear-dizziness": "어지럼증",

      // 마음 건강 관련
      "mental-anxiety": "불안증",
      "mental-depression": "우울증",
      "mental-stress": "스트레스",
      "mental-focus": "집중력저하",
      "mental-mood": "기분변화",
      "mental-panic": "공황발작",
      "mental-obsession": "강박증상",
      "mental-anger": "분노조절장애",

      // 알레르기 관련
      "allergy-skin": "피부알레르기",
      "allergy-food": "식품알레르기",
      "allergy-respiratory": "알레르기비염",
      "allergy-eyes": "알레르기결막염",
      "allergy-drug": "약물알레르기",
      "allergy-insect": "곤충알레르기",
      "allergy-unknown": "원인미상알레르기",

      // 열/감염 관련
      "fever-high": "고열",
      "fever-chills": "오한",
      "fever-sweat": "식은땀",
      "fever-body-ache": "근육통",
      "fever-swollen-gland": "림프선종대",
      "fever-unknown": "불명열",
      "fever-recurring": "재발열",
    };

    // 전체 태그 매핑에서 찾기
    if (fullTagKoreanMap[tag]) {
      return fullTagKoreanMap[tag];
    }

    // 태그에서 하이픈 뒤의 부분 추출 (예: "head-pain" -> "pain")
    const subTag = tag.includes("-") ? tag.split("-")[1] : tag;

    // 미리 정의된 부분 태그 매핑을 사용해 한글로 변환
    const subSpecialtyKoreanMap = {
      // 증상 관련
      pain: "통증",
      high: "고열",
      fever: "발열",
      ingestion: "소화불량",
      indigestion: "소화불량",
      cough: "기침",
      cold: "감기",
      headache: "두통",
      dizziness: "어지럼증",
      memory: "기억력저하",
      migraine: "편두통",
      heaviness: "무거움",
      pressure: "압박감",
      numb: "저림",
      allergy: "알레르기",
      itchy: "소양감",
      rash: "발진",
      swollen: "부종",
      nausea: "구역감",
      vomiting: "구토",
      diarrhea: "설사",
      constipation: "변비",
      stress: "스트레스",
      anxiety: "불안",
      depression: "우울",
      insomnia: "불면증",
      bloating: "복부팽만",
      heartburn: "속쓰림",
      gas: "가스",
      focus: "집중력저하",
      mood: "기분변화",
      panic: "공황",
      obsession: "강박",
      anger: "분노조절",
      palpitation: "심계항진",
      breath: "호흡곤란",
      apnea: "무호흡",
      snoring: "코골이",
      dry: "건조",
      vision: "시력저하",
      hearing: "청력저하",
      ringing: "이명",
      stiffness: "강직",
      swelling: "부종",
      respiratory: "호흡기질환",

      // 기타 태그
      specialist: "전문의",
      general: "일반의",
      emergency: "응급진료",
      chronic: "만성질환",
      acute: "급성질환",
    };

    // 부분 태그 매핑에서 찾기
    if (subSpecialtyKoreanMap[subTag]) {
      return subSpecialtyKoreanMap[subTag];
    }

    // 찾을 수 없으면 원본 그대로 반환
    return tag;
  };

  return (
    <div className="card" style={{ marginBottom: "1rem" }}>
      <div className="doctor-card-item-header">
        <div className="doctor-card-item-info">
          <h3 className="doctor-card-item-title">{item.name} 의사</h3>
          <p className="doctor-card-item-hospital">{item.hospitalName}</p>
          <div className="doctor-card-item-rating-container">
            <div className="doctor-card-item-rating-stars">
              {renderStars(item.rating)}
            </div>
            <span className="doctor-card-item-rating-value">{item.rating}</span>
            <span className="doctor-card-item-rating-count">
              ({item.reviewCount})
            </span>
          </div>
          <span className="doctor-card-item-description">
            {item.description}
          </span>
        </div>
        <img
          src={item.profileImage}
          alt={item.name}
          className="doctor-card-item-image"
        />
      </div>

      <div style={{ display: "flex", marginTop: "0.5rem" }}>
        <div className="doctor-card-item-tags-container">
          <span
            className={`doctor-tag doctor-tag-${getSpecialtyTagClass(
              item.specialty
            )}`}
          >
            {getSpecialtyKoreanName(item.specialty)}
          </span>
          {item.subSpecialty &&
            item.subSpecialty.map((tag, index) => (
              <span key={index} className="doctor-tag">
                {tag.includes("-") ? getSubSpecialtyKoreanName(tag) : tag}
              </span>
            ))}
        </div>
        <button className="doctor-card-action-button" aria-label="찜 하기">
          <Heart size={18} className="doctor-card-action-button" />
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
