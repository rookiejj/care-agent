import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "./App";
import {
  Calendar,
  Clock,
  Search,
  FileText,
  ChevronRight,
  ChevronDown,
  Activity,
  AlertTriangle,
  CheckCircle,
  Heart,
  Droplets,
  Dumbbell,
  List,
  X,
  Download,
  Share2,
  BarChart2,
  AlignLeft,
  ExternalLink,
  Clipboard,
  ShieldCheck,
} from "lucide-react";
import "./HealthCheckupResults.css";

const HealthCheckupResults = () => {
  const navigate = useNavigate();
  const [checkups, setCheckups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCheckups, setExpandedCheckups] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("all");
  const [showDetail, setShowDetail] = useState(false);
  const [selectedCheckup, setSelectedCheckup] = useState(null);

  useEffect(() => {
    // 페이지 로드 시 스크롤을 상단으로 이동
    window.scrollTo(0, 0);

    // 더미 건강검진 데이터 생성
    const dummyCheckups = [
      {
        id: 1,
        type: "종합검진",
        institution: "서울대학교병원 건강검진센터",
        date: "2025-01-15",
        time: "09:00",
        result: "양호", // 양호, 주의, 이상
        summary: "전반적으로 건강상태 양호, 콜레스테롤 수치 약간 높음",
        followUp: "현재 상태 유지, 6개월 후 재검진 권장",
        report: {
          basicInfo: {
            height: 175,
            weight: 68,
            bmi: 22.2,
            bmiStatus: "정상",
            bloodPressure: "120/80",
            bloodPressureStatus: "정상",
          },
          bloodTest: {
            wbc: {
              value: 6.5,
              unit: "x10³/μL",
              status: "정상",
              range: "4.0-10.0",
            },
            rbc: {
              value: 4.8,
              unit: "x10⁶/μL",
              status: "정상",
              range: "4.2-5.4",
            },
            hgb: {
              value: 15.2,
              unit: "g/dL",
              status: "정상",
              range: "13.0-17.0",
            },
            hct: { value: 44.5, unit: "%", status: "정상", range: "40.0-50.0" },
            plt: {
              value: 250,
              unit: "x10³/μL",
              status: "정상",
              range: "150-400",
            },
          },
          bloodChemistry: {
            ast: { value: 25, unit: "U/L", status: "정상", range: "0-40" },
            alt: { value: 27, unit: "U/L", status: "정상", range: "0-40" },
            ggt: { value: 35, unit: "U/L", status: "정상", range: "0-60" },
            totalCholesterol: {
              value: 210,
              unit: "mg/dL",
              status: "주의",
              range: "0-200",
            },
            ldl: { value: 130, unit: "mg/dL", status: "주의", range: "0-130" },
            hdl: { value: 55, unit: "mg/dL", status: "정상", range: "40-60" },
            triglycerides: {
              value: 120,
              unit: "mg/dL",
              status: "정상",
              range: "0-150",
            },
            glucose: {
              value: 95,
              unit: "mg/dL",
              status: "정상",
              range: "70-100",
            },
          },
          urinalysis: {
            ph: { value: 6.0, unit: "", status: "정상", range: "5.0-8.0" },
            protein: { value: "음성", unit: "", status: "정상", range: "음성" },
            glucose: { value: "음성", unit: "", status: "정상", range: "음성" },
            ketone: { value: "음성", unit: "", status: "정상", range: "음성" },
            blood: { value: "음성", unit: "", status: "정상", range: "음성" },
          },
          imagery: [
            {
              type: "흉부X선",
              result: "이상 없음",
              details: "폐 및 심장 크기 정상, 특이소견 없음",
            },
            {
              type: "복부초음파",
              result: "이상 없음",
              details: "간, 담낭, 췌장, 신장에 특이소견 없음",
            },
          ],
        },
        abnormalItems: ["총콜레스테롤", "LDL콜레스테롤"],
        doctor: "김민재",
        doctorComment:
          "전반적인 건강 상태는 양호합니다. 다만 콜레스테롤 수치가 약간 높으니 식이조절과 규칙적인 운동을 권장합니다. 현재는 약물 치료가 필요한 수준은 아닙니다.",
        recommendations: [
          "저지방 식이요법",
          "주 3-4회 유산소 운동",
          "6개월 후 콜레스테롤 재검사",
        ],
      },
      {
        id: 2,
        type: "기본검진",
        institution: "강남세브란스병원 건강증진센터",
        date: "2024-07-20",
        time: "10:30",
        result: "주의", // 양호, 주의, 이상
        summary: "간 기능 수치 경미한 상승, 고혈압 전단계",
        followUp: "식습관 개선 및 운동 권장, 3개월 후 재검진",
        report: {
          basicInfo: {
            height: 175,
            weight: 70,
            bmi: 22.9,
            bmiStatus: "정상",
            bloodPressure: "135/85",
            bloodPressureStatus: "고혈압 전단계",
          },
          bloodTest: {
            wbc: {
              value: 7.2,
              unit: "x10³/μL",
              status: "정상",
              range: "4.0-10.0",
            },
            rbc: {
              value: 5.0,
              unit: "x10⁶/μL",
              status: "정상",
              range: "4.2-5.4",
            },
            hgb: {
              value: 15.5,
              unit: "g/dL",
              status: "정상",
              range: "13.0-17.0",
            },
            hct: { value: 45.0, unit: "%", status: "정상", range: "40.0-50.0" },
            plt: {
              value: 270,
              unit: "x10³/μL",
              status: "정상",
              range: "150-400",
            },
          },
          bloodChemistry: {
            ast: { value: 45, unit: "U/L", status: "주의", range: "0-40" },
            alt: { value: 55, unit: "U/L", status: "주의", range: "0-40" },
            ggt: { value: 70, unit: "U/L", status: "주의", range: "0-60" },
            totalCholesterol: {
              value: 190,
              unit: "mg/dL",
              status: "정상",
              range: "0-200",
            },
            ldl: { value: 120, unit: "mg/dL", status: "정상", range: "0-130" },
            hdl: { value: 50, unit: "mg/dL", status: "정상", range: "40-60" },
            triglycerides: {
              value: 140,
              unit: "mg/dL",
              status: "정상",
              range: "0-150",
            },
            glucose: {
              value: 100,
              unit: "mg/dL",
              status: "정상",
              range: "70-100",
            },
          },
          urinalysis: {
            ph: { value: 6.5, unit: "", status: "정상", range: "5.0-8.0" },
            protein: { value: "음성", unit: "", status: "정상", range: "음성" },
            glucose: { value: "음성", unit: "", status: "정상", range: "음성" },
            ketone: { value: "음성", unit: "", status: "정상", range: "음성" },
            blood: { value: "음성", unit: "", status: "정상", range: "음성" },
          },
          imagery: [
            {
              type: "흉부X선",
              result: "이상 없음",
              details: "폐 및 심장 크기 정상, 특이소견 없음",
            },
          ],
        },
        abnormalItems: ["AST", "ALT", "GGT", "혈압"],
        doctor: "박지훈",
        doctorComment:
          "간 기능 수치가 약간 상승해 있으며, 혈압이 고혈압 전단계에 해당합니다. 음주량을 줄이고 저염식이를 권장합니다. 규칙적인 운동과 함께 식습관 개선이 필요합니다.",
        recommendations: [
          "음주량 감소",
          "저염식이요법",
          "주 3회 이상 유산소 운동",
          "3개월 후 간 기능 및 혈압 재검사",
        ],
      },
      {
        id: 3,
        type: "종합검진",
        institution: "서울아산병원 건강검진센터",
        date: "2024-02-05",
        time: "08:30",
        result: "이상", // 양호, 주의, 이상
        summary: "갑상선 결절 발견, 추가 검사 필요",
        followUp: "내분비내과 전문의 상담 필요, 세침검사 권장",
        report: {
          basicInfo: {
            height: 175,
            weight: 67,
            bmi: 21.9,
            bmiStatus: "정상",
            bloodPressure: "118/75",
            bloodPressureStatus: "정상",
          },
          bloodTest: {
            wbc: {
              value: 6.0,
              unit: "x10³/μL",
              status: "정상",
              range: "4.0-10.0",
            },
            rbc: {
              value: 4.7,
              unit: "x10⁶/μL",
              status: "정상",
              range: "4.2-5.4",
            },
            hgb: {
              value: 15.0,
              unit: "g/dL",
              status: "정상",
              range: "13.0-17.0",
            },
            hct: { value: 44.0, unit: "%", status: "정상", range: "40.0-50.0" },
            plt: {
              value: 240,
              unit: "x10³/μL",
              status: "정상",
              range: "150-400",
            },
          },
          bloodChemistry: {
            ast: { value: 22, unit: "U/L", status: "정상", range: "0-40" },
            alt: { value: 25, unit: "U/L", status: "정상", range: "0-40" },
            ggt: { value: 30, unit: "U/L", status: "정상", range: "0-60" },
            totalCholesterol: {
              value: 185,
              unit: "mg/dL",
              status: "정상",
              range: "0-200",
            },
            ldl: { value: 115, unit: "mg/dL", status: "정상", range: "0-130" },
            hdl: { value: 52, unit: "mg/dL", status: "정상", range: "40-60" },
            triglycerides: {
              value: 105,
              unit: "mg/dL",
              status: "정상",
              range: "0-150",
            },
            glucose: {
              value: 90,
              unit: "mg/dL",
              status: "정상",
              range: "70-100",
            },
            tsh: {
              value: 3.8,
              unit: "μIU/mL",
              status: "정상",
              range: "0.4-4.0",
            },
            ft4: {
              value: 1.2,
              unit: "ng/dL",
              status: "정상",
              range: "0.8-1.8",
            },
          },
          urinalysis: {
            ph: { value: 6.2, unit: "", status: "정상", range: "5.0-8.0" },
            protein: { value: "음성", unit: "", status: "정상", range: "음성" },
            glucose: { value: "음성", unit: "", status: "정상", range: "음성" },
            ketone: { value: "음성", unit: "", status: "정상", range: "음성" },
            blood: { value: "음성", unit: "", status: "정상", range: "음성" },
          },
          imagery: [
            {
              type: "흉부X선",
              result: "이상 없음",
              details: "폐 및 심장 크기 정상, 특이소견 없음",
            },
            {
              type: "복부초음파",
              result: "이상 없음",
              details: "간, 담낭, 췌장, 신장에 특이소견 없음",
            },
            {
              type: "갑상선초음파",
              result: "이상 소견",
              details: "우측 갑상선에 1.2cm 크기의 결절 발견",
            },
          ],
        },
        abnormalItems: ["갑상선 결절"],
        doctor: "이수진",
        doctorComment:
          "혈액검사 결과는 정상 범위 내에 있으나, 갑상선 초음파에서 1.2cm 크기의 결절이 발견되었습니다. 악성 여부를 확인하기 위한 세침검사가 필요합니다. 내분비내과 전문의 상담을 받으시기 바랍니다.",
        recommendations: [
          "내분비내과 전문의 상담",
          "갑상선 세침검사",
          "갑상선 호르몬 추가 검사",
        ],
      },
      {
        id: 4,
        type: "기본검진",
        institution: "건국대학교병원 건강관리센터",
        date: "2023-08-10",
        time: "11:00",
        result: "양호", // 양호, 주의, 이상
        summary: "전반적으로 건강상태 양호",
        followUp: "현재 상태 유지, 1년 후 정기검진 권장",
        report: {
          basicInfo: {
            height: 175,
            weight: 69,
            bmi: 22.5,
            bmiStatus: "정상",
            bloodPressure: "122/78",
            bloodPressureStatus: "정상",
          },
          bloodTest: {
            wbc: {
              value: 6.2,
              unit: "x10³/μL",
              status: "정상",
              range: "4.0-10.0",
            },
            rbc: {
              value: 4.9,
              unit: "x10⁶/μL",
              status: "정상",
              range: "4.2-5.4",
            },
            hgb: {
              value: 15.3,
              unit: "g/dL",
              status: "정상",
              range: "13.0-17.0",
            },
            hct: { value: 45.2, unit: "%", status: "정상", range: "40.0-50.0" },
            plt: {
              value: 255,
              unit: "x10³/μL",
              status: "정상",
              range: "150-400",
            },
          },
          bloodChemistry: {
            ast: { value: 20, unit: "U/L", status: "정상", range: "0-40" },
            alt: { value: 22, unit: "U/L", status: "정상", range: "0-40" },
            ggt: { value: 25, unit: "U/L", status: "정상", range: "0-60" },
            totalCholesterol: {
              value: 180,
              unit: "mg/dL",
              status: "정상",
              range: "0-200",
            },
            ldl: { value: 110, unit: "mg/dL", status: "정상", range: "0-130" },
            hdl: { value: 58, unit: "mg/dL", status: "정상", range: "40-60" },
            triglycerides: {
              value: 95,
              unit: "mg/dL",
              status: "정상",
              range: "0-150",
            },
            glucose: {
              value: 88,
              unit: "mg/dL",
              status: "정상",
              range: "70-100",
            },
          },
          urinalysis: {
            ph: { value: 6.3, unit: "", status: "정상", range: "5.0-8.0" },
            protein: { value: "음성", unit: "", status: "정상", range: "음성" },
            glucose: { value: "음성", unit: "", status: "정상", range: "음성" },
            ketone: { value: "음성", unit: "", status: "정상", range: "음성" },
            blood: { value: "음성", unit: "", status: "정상", range: "음성" },
          },
          imagery: [
            {
              type: "흉부X선",
              result: "이상 없음",
              details: "폐 및 심장 크기 정상, 특이소견 없음",
            },
          ],
        },
        abnormalItems: [],
        doctor: "정현우",
        doctorComment:
          "모든 검사 결과가 정상 범위 내에 있습니다. 현재의 건강한 생활 습관을 유지하시기 바랍니다.",
        recommendations: [
          "정기적인 건강검진 지속",
          "균형 잡힌 식이 유지",
          "규칙적인 운동 유지",
        ],
      },
      {
        id: 5,
        type: "종합검진",
        institution: "삼성서울병원 건강검진센터",
        date: "2023-01-20",
        time: "09:30",
        result: "주의", // 양호, 주의, 이상
        summary: "경미한 지방간, 혈당 수치 경계",
        followUp: "생활습관 개선, 6개월 후 재검진 권장",
        report: {
          basicInfo: {
            height: 175,
            weight: 72,
            bmi: 23.5,
            bmiStatus: "정상",
            bloodPressure: "126/82",
            bloodPressureStatus: "정상",
          },
          bloodTest: {
            wbc: {
              value: 6.8,
              unit: "x10³/μL",
              status: "정상",
              range: "4.0-10.0",
            },
            rbc: {
              value: 5.1,
              unit: "x10⁶/μL",
              status: "정상",
              range: "4.2-5.4",
            },
            hgb: {
              value: 15.8,
              unit: "g/dL",
              status: "정상",
              range: "13.0-17.0",
            },
            hct: { value: 46.0, unit: "%", status: "정상", range: "40.0-50.0" },
            plt: {
              value: 260,
              unit: "x10³/μL",
              status: "정상",
              range: "150-400",
            },
          },
          bloodChemistry: {
            ast: { value: 38, unit: "U/L", status: "정상", range: "0-40" },
            alt: { value: 42, unit: "U/L", status: "주의", range: "0-40" },
            ggt: { value: 45, unit: "U/L", status: "정상", range: "0-60" },
            totalCholesterol: {
              value: 195,
              unit: "mg/dL",
              status: "정상",
              range: "0-200",
            },
            ldl: { value: 125, unit: "mg/dL", status: "정상", range: "0-130" },
            hdl: { value: 48, unit: "mg/dL", status: "정상", range: "40-60" },
            triglycerides: {
              value: 145,
              unit: "mg/dL",
              status: "정상",
              range: "0-150",
            },
            glucose: {
              value: 105,
              unit: "mg/dL",
              status: "주의",
              range: "70-100",
            },
            hba1c: { value: 5.8, unit: "%", status: "경계", range: "4.0-5.7" },
          },
          urinalysis: {
            ph: { value: 6.3, unit: "", status: "정상", range: "5.0-8.0" },
            protein: { value: "음성", unit: "", status: "정상", range: "음성" },
            glucose: { value: "음성", unit: "", status: "정상", range: "음성" },
            ketone: { value: "음성", unit: "", status: "정상", range: "음성" },
            blood: { value: "음성", unit: "", status: "정상", range: "음성" },
          },
          imagery: [
            {
              type: "흉부X선",
              result: "이상 없음",
              details: "폐 및 심장 크기 정상, 특이소견 없음",
            },
            {
              type: "복부초음파",
              result: "경증 이상",
              details: "경미한 지방간 소견",
            },
          ],
        },
        abnormalItems: ["ALT", "공복혈당", "당화혈색소", "지방간"],
        doctor: "김준형",
        doctorComment:
          "경미한 지방간 소견과 함께 혈당 수치가 경계 수준에 있습니다. 체중 관리와 함께 탄수화물 섭취를 줄이고 규칙적인 운동을 권장합니다.",
        recommendations: [
          "탄수화물 및 당분 섭취 감소",
          "주 3-4회 유산소 운동",
          "체중 관리",
          "6개월 후 혈당 및 간 수치 재검사",
        ],
      },
    ];

    setTimeout(() => {
      setCheckups(dummyCheckups);
      setIsLoading(false);
    }, 500); // 로딩 시뮬레이션
  }, []);

  // 검진 결과 확장/축소 토글 함수
  const toggleCheckup = (id) => {
    setExpandedCheckups((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 상세 보기 함수
  const viewDetail = (checkup) => {
    setSelectedCheckup(checkup);
    setShowDetail(true);
  };

  // 검진 결과 필터링 함수
  const filterCheckups = () => {
    return checkups.filter((checkup) => {
      // 검색어 필터링
      const matchesSearch =
        checkup.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
        checkup.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        checkup.summary.toLowerCase().includes(searchTerm.toLowerCase());

      // 연도 필터링
      const year = new Date(checkup.date).getFullYear().toString();
      const matchesYear = filterYear === "all" || year === filterYear;

      return matchesSearch && matchesYear;
    });
  };

  // 필터 옵션 생성
  const getYearOptions = () => {
    const years = new Set();
    checkups.forEach((checkup) => {
      const year = new Date(checkup.date).getFullYear();
      years.add(year.toString());
    });
    return Array.from(years).sort((a, b) => b - a); // 내림차순 정렬
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    const dayName = dayNames[date.getDay()];

    return `${year}년 ${month}월 ${day}일 (${dayName})`;
  };

  // 결과에 따른 배지 컴포넌트
  const ResultBadge = ({ result }) => {
    switch (result) {
      case "양호":
        return <span className="result-badge normal">양호</span>;
      case "주의":
        return <span className="result-badge caution">주의</span>;
      case "이상":
        return <span className="result-badge abnormal">이상</span>;
      default:
        return null;
    }
  };

  // 상태에 따른 아이콘과 색상 반환
  const getStatusStyle = (status) => {
    if (!status) return { icon: null, color: "#6b7280" };

    switch (status) {
      case "정상":
        return { icon: <CheckCircle size={14} />, color: "#10b981" };
      case "주의":
      case "경계":
        return { icon: <AlertTriangle size={14} />, color: "#f59e0b" };
      case "이상":
      case "비정상":
        return { icon: <AlertTriangle size={14} />, color: "#ef4444" };
      default:
        return { icon: null, color: "#6b7280" };
    }
  };

  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  // 검사 결과 상세 모달
  const CheckupDetailModal = () => {
    if (!selectedCheckup) return null;

    const [activeTab, setActiveTab] = useState("summary");

    return (
      <div className="modal-backdrop">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">건강검진 상세 결과</h2>
            <button
              onClick={() => setShowDetail(false)}
              className="modal-close-button"
            >
              <X size={20} />
            </button>
          </div>

          <div className="checkup-tabs">
            <button
              className={`checkup-tab ${
                activeTab === "summary" ? "active" : ""
              }`}
              onClick={() => setActiveTab("summary")}
            >
              <AlignLeft size={18} />
              <span>요약</span>
            </button>
            <button
              className={`checkup-tab ${
                activeTab === "details" ? "active" : ""
              }`}
              onClick={() => setActiveTab("details")}
            >
              <List size={18} />
              <span>상세 결과</span>
            </button>
            <button
              className={`checkup-tab ${
                activeTab === "charts" ? "active" : ""
              }`}
              onClick={() => setActiveTab("charts")}
            >
              <BarChart2 size={18} />
              <span>추이 분석</span>
            </button>
          </div>

          <div className="modal-body">
            <div className="modal-checkup-header">
              <div className="modal-header-left">
                <h3 className="modal-institution-name">
                  {selectedCheckup.institution}
                </h3>
                <p className="modal-checkup-type">
                  {selectedCheckup.type} | {formatDate(selectedCheckup.date)}
                </p>
              </div>
              <ResultBadge result={selectedCheckup.result} />
            </div>

            {activeTab === "summary" && (
              <div className="checkup-summary-tab">
                <div className="checkup-summary-section">
                  <h4 className="checkup-section-title">검진 요약</h4>
                  <p className="checkup-section-content">
                    {selectedCheckup.summary}
                  </p>

                  <h4 className="checkup-section-title">의사 소견</h4>
                  <div className="doctor-comment">
                    <p className="comment-text">
                      {selectedCheckup.doctorComment}
                    </p>
                    <p className="doctor-name">
                      - {selectedCheckup.doctor} 의사
                    </p>
                  </div>

                  {selectedCheckup.abnormalItems &&
                    selectedCheckup.abnormalItems.length > 0 && (
                      <>
                        <h4 className="checkup-section-title">
                          주의 필요 항목
                        </h4>
                        <div className="abnormal-items">
                          {selectedCheckup.abnormalItems.map((item, index) => (
                            <div key={index} className="abnormal-item">
                              <AlertTriangle size={16} />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                  <h4 className="checkup-section-title">권장 사항</h4>
                  <ul className="recommendations-list">
                    {selectedCheckup.recommendations.map((item, index) => (
                      <li key={index} className="recommendation-item">
                        <CheckCircle size={16} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="checkup-section-title">후속 조치</h4>
                  <p className="checkup-section-content">
                    {selectedCheckup.followUp}
                  </p>
                </div>

                <div className="basic-metrics">
                  <div className="basic-metric-item">
                    <div className="metric-icon">
                      <Activity size={20} />
                    </div>
                    <div className="metric-content">
                      <span className="metric-label">혈압</span>
                      <span className="metric-value">
                        {selectedCheckup.report.basicInfo.bloodPressure}
                        <span className="metric-unit">mmHg</span>
                      </span>
                      <span
                        className={`metric-status ${
                          selectedCheckup.report.basicInfo
                            .bloodPressureStatus === "정상"
                            ? "normal"
                            : "caution"
                        }`}
                      >
                        {selectedCheckup.report.basicInfo.bloodPressureStatus}
                      </span>
                    </div>
                  </div>

                  <div className="basic-metric-item">
                    <div className="metric-icon">
                      <Dumbbell size={20} />
                    </div>
                    <div className="metric-content">
                      <span className="metric-label">BMI</span>
                      <span className="metric-value">
                        {selectedCheckup.report.basicInfo.bmi}
                        <span className="metric-unit">kg/m²</span>
                      </span>
                      <span
                        className={`metric-status ${
                          selectedCheckup.report.basicInfo.bmiStatus === "정상"
                            ? "normal"
                            : "caution"
                        }`}
                      >
                        {selectedCheckup.report.basicInfo.bmiStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div className="checkup-details-tab">
                <div className="details-section">
                  <h4 className="details-section-title">기본 정보</h4>
                  <div className="details-grid">
                    <div className="details-item">
                      <span className="details-label">키</span>
                      <span className="details-value">
                        {selectedCheckup.report.basicInfo.height} cm
                      </span>
                    </div>
                    <div className="details-item">
                      <span className="details-label">체중</span>
                      <span className="details-value">
                        {selectedCheckup.report.basicInfo.weight} kg
                      </span>
                    </div>
                    <div className="details-item">
                      <span className="details-label">BMI</span>
                      <span className="details-value">
                        {selectedCheckup.report.basicInfo.bmi} kg/m²
                        <span
                          className={`details-status ${
                            selectedCheckup.report.basicInfo.bmiStatus ===
                            "정상"
                              ? "normal"
                              : "caution"
                          }`}
                        >
                          {selectedCheckup.report.basicInfo.bmiStatus}
                        </span>
                      </span>
                    </div>
                    <div className="details-item">
                      <span className="details-label">혈압</span>
                      <span className="details-value">
                        {selectedCheckup.report.basicInfo.bloodPressure} mmHg
                        <span
                          className={`details-status ${
                            selectedCheckup.report.basicInfo
                              .bloodPressureStatus === "정상"
                              ? "normal"
                              : "caution"
                          }`}
                        >
                          {selectedCheckup.report.basicInfo.bloodPressureStatus}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="details-section">
                  <h4 className="details-section-title">혈액 검사</h4>
                  <div className="details-table">
                    <div className="table-header">
                      <div className="header-cell">검사 항목</div>
                      <div className="header-cell">결과</div>
                      <div className="header-cell">참고치</div>
                      <div className="header-cell">상태</div>
                    </div>
                    {Object.entries(selectedCheckup.report.bloodTest).map(
                      ([key, item]) => (
                        <div key={key} className="table-row">
                          <div className="table-cell">{key.toUpperCase()}</div>
                          <div className="table-cell">
                            {item.value} {item.unit}
                          </div>
                          <div className="table-cell">{item.range}</div>
                          <div className="table-cell">
                            <span
                              className={`cell-status ${
                                item.status === "정상"
                                  ? "normal"
                                  : item.status === "주의" ||
                                    item.status === "경계"
                                  ? "caution"
                                  : "abnormal"
                              }`}
                            >
                              {getStatusStyle(item.status).icon}
                              {item.status}
                            </span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="details-section">
                  <h4 className="details-section-title">생화학 검사</h4>
                  <div className="details-table">
                    <div className="table-header">
                      <div className="header-cell">검사 항목</div>
                      <div className="header-cell">결과</div>
                      <div className="header-cell">참고치</div>
                      <div className="header-cell">상태</div>
                    </div>
                    {Object.entries(selectedCheckup.report.bloodChemistry).map(
                      ([key, item]) => {
                        // 항목 이름 변환
                        const itemNames = {
                          ast: "AST(간효소)",
                          alt: "ALT(간효소)",
                          ggt: "GGT(간효소)",
                          totalCholesterol: "총 콜레스테롤",
                          ldl: "LDL 콜레스테롤",
                          hdl: "HDL 콜레스테롤",
                          triglycerides: "중성지방",
                          glucose: "공복혈당",
                          hba1c: "당화혈색소",
                        };

                        return (
                          <div key={key} className="table-row">
                            <div className="table-cell">
                              {itemNames[key] || key}
                            </div>
                            <div className="table-cell">
                              {item.value} {item.unit}
                            </div>
                            <div className="table-cell">{item.range}</div>
                            <div className="table-cell">
                              <span
                                className={`cell-status ${
                                  item.status === "정상"
                                    ? "normal"
                                    : item.status === "주의" ||
                                      item.status === "경계"
                                    ? "caution"
                                    : "abnormal"
                                }`}
                              >
                                {getStatusStyle(item.status).icon}
                                {item.status}
                              </span>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>

                <div className="details-section">
                  <h4 className="details-section-title">소변 검사</h4>
                  <div className="details-table">
                    <div className="table-header">
                      <div className="header-cell">검사 항목</div>
                      <div className="header-cell">결과</div>
                      <div className="header-cell">참고치</div>
                      <div className="header-cell">상태</div>
                    </div>
                    {Object.entries(selectedCheckup.report.urinalysis).map(
                      ([key, item]) => (
                        <div key={key} className="table-row">
                          <div className="table-cell">{key}</div>
                          <div className="table-cell">{item.value}</div>
                          <div className="table-cell">{item.range}</div>
                          <div className="table-cell">
                            <span
                              className={`cell-status ${
                                item.status === "정상"
                                  ? "normal"
                                  : item.status === "주의" ||
                                    item.status === "경계"
                                  ? "caution"
                                  : "abnormal"
                              }`}
                            >
                              {getStatusStyle(item.status).icon}
                              {item.status}
                            </span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="details-section">
                  <h4 className="details-section-title">영상 검사</h4>
                  {selectedCheckup.report.imagery.map((item, index) => (
                    <div key={index} className="imagery-item">
                      <div className="imagery-header">
                        <h5 className="imagery-type">{item.type}</h5>
                        <span
                          className={`imagery-result ${
                            item.result === "이상 없음"
                              ? "normal"
                              : item.result === "경증 이상"
                              ? "caution"
                              : "abnormal"
                          }`}
                        >
                          {item.result}
                        </span>
                      </div>
                      <p className="imagery-details">{item.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "charts" && (
              <div className="checkup-charts-tab">
                <div className="chart-placeholder">
                  <BarChart2 size={48} />
                  <p>
                    건강 수치 추이 차트는 3회 이상의 검진 기록이 있을 때
                    제공됩니다.
                  </p>
                  <button className="chart-action-button">
                    <ShieldCheck size={16} />
                    <span>건강 위험도 분석 보기</span>
                  </button>
                </div>
              </div>
            )}

            {/* <div className="modal-actions">
              <button className="modal-action-button">
                <Download size={16} />
                <span>결과지 저장</span>
              </button>
              <button className="modal-action-button">
                <Share2 size={16} />
                <span>공유하기</span>
              </button>
              <button className="modal-action-button primary">
                <ExternalLink size={16} />
                <span>예약하기</span>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    );
  };

  const filteredCheckups = filterCheckups();
  const yearOptions = getYearOptions();

  return (
    <div className="container">
      <div className="fixed-header">
        <PageHeader
          title="건강검진 결과"
          backButtonVisible={true}
          onBack={handleBackClick}
        />
      </div>

      <div className="checkup-content">
        <div className="search-filter-area">
          <div className="search-input-container">
            <div className="search-icon">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="검진기관, 검진종류 검색..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="filter-select"
          >
            <option value="all">전체 연도</option>
            {yearOptions.map((year) => (
              <option key={year} value={year}>
                {year}년
              </option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>건강검진 결과를 불러오는 중...</p>
          </div>
        ) : filteredCheckups.length === 0 ? (
          <div className="empty-container">
            <Activity size={40} className="empty-icon" />
            <p className="empty-text">
              건강검진 결과가 없거나 검색 결과가 없습니다.
            </p>
          </div>
        ) : (
          <div className="checkup-list">
            {filteredCheckups.map((checkup) => (
              <div key={checkup.id} className="checkup-card">
                <div
                  className="checkup-header"
                  onClick={() => toggleCheckup(checkup.id)}
                >
                  <div className="checkup-title-area">
                    <h3 className="checkup-title">{checkup.institution}</h3>
                    <p className="checkup-subtitle">
                      {checkup.type} | {formatDate(checkup.date)}
                    </p>
                  </div>
                  <div className="checkup-result-arrow">
                    <ResultBadge result={checkup.result} />
                    {expandedCheckups[checkup.id] ? (
                      <ChevronDown
                        size={20}
                        className="checkup-arrow expanded"
                      />
                    ) : (
                      <ChevronRight size={20} className="checkup-arrow" />
                    )}
                  </div>
                </div>

                {expandedCheckups[checkup.id] && (
                  <div className="checkup-content-expanded">
                    <div className="checkup-summary">
                      <div className="summary-item">
                        <FileText size={16} className="summary-icon" />
                        <div className="summary-content">
                          <p className="summary-label">검진 요약</p>
                          <p className="summary-value">{checkup.summary}</p>
                        </div>
                      </div>

                      {checkup.abnormalItems &&
                        checkup.abnormalItems.length > 0 && (
                          <div className="summary-item">
                            <AlertTriangle
                              size={16}
                              className="summary-icon warning"
                            />
                            <div className="summary-content">
                              <p className="summary-label">주의 필요 항목</p>
                              <p className="summary-value">
                                {checkup.abnormalItems.join(", ")}
                              </p>
                            </div>
                          </div>
                        )}

                      <div className="summary-item">
                        <Clock size={16} className="summary-icon" />
                        <div className="summary-content">
                          <p className="summary-label">후속 조치</p>
                          <p className="summary-value">{checkup.followUp}</p>
                        </div>
                      </div>
                    </div>

                    <div className="checkup-metrics">
                      <div className="metric-item">
                        <div className="metric-header">
                          <Activity size={14} />
                          <span>혈압</span>
                        </div>
                        <div className="metric-value">
                          {checkup.report.basicInfo.bloodPressure}
                          <span
                            className={`metric-status ${
                              checkup.report.basicInfo.bloodPressureStatus ===
                              "정상"
                                ? "normal"
                                : "caution"
                            }`}
                          >
                            {checkup.report.basicInfo.bloodPressureStatus}
                          </span>
                        </div>
                      </div>

                      <div className="metric-item">
                        <div className="metric-header">
                          <Heart size={14} />
                          <span>콜레스테롤</span>
                        </div>
                        <div className="metric-value">
                          {checkup.report.bloodChemistry.totalCholesterol.value}
                          <span
                            className={`metric-status ${
                              checkup.report.bloodChemistry.totalCholesterol
                                .status === "정상"
                                ? "normal"
                                : "caution"
                            }`}
                          >
                            {
                              checkup.report.bloodChemistry.totalCholesterol
                                .status
                            }
                          </span>
                        </div>
                      </div>

                      <div className="metric-item">
                        <div className="metric-header">
                          <Droplets size={14} />
                          <span>혈당</span>
                        </div>
                        <div className="metric-value">
                          {checkup.report.bloodChemistry.glucose.value}
                          <span
                            className={`metric-status ${
                              checkup.report.bloodChemistry.glucose.status ===
                              "정상"
                                ? "normal"
                                : "caution"
                            }`}
                          >
                            {checkup.report.bloodChemistry.glucose.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        viewDetail(checkup);
                      }}
                      className="checkup-detail-button"
                    >
                      <Clipboard size={16} />
                      <span>검진 결과 상세 보기</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {showDetail && <CheckupDetailModal />}
    </div>
  );
};

export default HealthCheckupResults;
