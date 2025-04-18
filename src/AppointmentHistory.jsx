import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "./App";
import { useData } from "./DataContext";
import {
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  User,
  BadgeCheck,
  AlertCircle,
  CheckCircle,
  XCircle,
  ClipboardList,
} from "lucide-react";
import "./AppointmentHistory.css";
import ConfirmationPopup from "./ConfirmationPopup";

const AppointmentHistory = ({ currentLocation }) => {
  const navigate = useNavigate();
  const { doctorsData } = useData();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);

  useEffect(() => {
    // doctorsData를 활용하여 더미 예약 데이터 생성
    const generateAppointments = () => {
      // 최근 날짜와 미래 날짜를 생성하는 함수
      const generateRandomDate = (future = false) => {
        const now = new Date();
        let date;
        if (future) {
          // 현재로부터 1~30일 후의 날짜 생성
          date = new Date(
            now.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000
          );
        } else {
          // 현재로부터 1~90일 전의 날짜 생성
          date = new Date(
            now.getTime() - Math.random() * 90 * 24 * 60 * 60 * 1000
          );
        }
        return date.toISOString().split("T")[0];
      };

      // 시간 생성 함수
      const generateRandomTime = () => {
        const hours = 9 + Math.floor(Math.random() * 9); // 9시~17시
        const minutes = Math.random() > 0.5 ? "00" : "30"; // 정각 또는 30분
        return `${hours.toString().padStart(2, "0")}:${minutes}`;
      };

      // 진료 이유를 과별로 생성하는 함수
      const generateReason = (specialty) => {
        const reasons = {
          neurology: ["두통", "어지럼증", "기억력 저하"],
          gastroenterology: ["소화불량", "복통", "속쓰림"],
          cardiology: ["가슴 통증", "두근거림", "호흡곤란"],
          dermatology: ["피부발진", "가려움증", "여드름"],
          orthopedics: ["무릎 통증", "허리 통증", "어깨 결림"],
          ophthalmology: ["시력저하", "안구건조증", "충혈"],
          ent: ["비염", "목 통증", "귀 이명"],
          psychiatry: ["불면증", "우울감", "불안"],
          pulmonology: ["기침", "가래", "숨참"],
          allergy: ["알레르기성 비염", "두드러기", "천식"],
          dentistry: ["치아 통증", "정기 검진", "스케일링"],
          oriental: ["체질 개선", "면역력 강화", "피로 개선"],
          family: ["건강검진", "만성질환 관리", "예방접종"],
          pain: ["만성 통증", "두통", "관절통"],
          endocrinology: ["당뇨 관리", "갑상선 기능 검사", "호르몬 검사"],
          obgyn: ["정기 검진", "산전 진료", "여성 질환"],
          urology: ["전립선 검사", "요로 감염", "배뇨장애"],
          surgery: ["상담", "수술 후 관리", "검진"],
          rehabilitation: ["재활 치료", "물리치료", "운동 요법"],
          plastic: ["상담", "시술 후 관리", "검진"],
        };

        const defaultReasons = ["정기 검진", "상담", "검사"];
        const specialtyReasons = reasons[specialty] || defaultReasons;
        return specialtyReasons[
          Math.floor(Math.random() * specialtyReasons.length)
        ];
      };

      // 진단명과 처방 생성 함수
      const generateDiagnosis = (specialty, reason) => {
        const diagnoses = {
          두통: ["긴장성 두통", "편두통", "군발성 두통"],
          어지럼증: ["메니에르병", "양성돌발성체위현훈", "전정신경염"],
          소화불량: ["위염", "위식도역류질환", "기능성 소화불량"],
          복통: ["과민성대장증후군", "위염", "장염"],
          "가슴 통증": ["협심증", "소화성 궤양", "늑간신경통"],
          피부발진: ["접촉성 피부염", "아토피 피부염", "두드러기"],
          "무릎 통증": ["퇴행성 관절염", "반월상 연골 손상", "인대 염좌"],
          기침: ["감기", "급성 기관지염", "알레르기성 비염"],
          "알레르기성 비염": ["계절성 알레르기 비염", "통년성 알레르기 비염"],
        };

        // 기본 진단명
        const defaultDiagnoses = ["경증 증상", "정상 범위", "일시적 불편감"];
        const reasonDiagnoses = diagnoses[reason] || defaultDiagnoses;
        return reasonDiagnoses[
          Math.floor(Math.random() * reasonDiagnoses.length)
        ];
      };

      const generatePrescription = (diagnosis) => {
        const prescriptions = {
          "긴장성 두통": [
            "진통제, 근육이완제",
            "아세트아미노펜 500mg, 근이완제",
          ],
          편두통: ["수마트립탄 50mg, 진통제", "트립탄 계열 약물, 진통제"],
          위염: ["제산제, 프로톤펌프억제제", "판토프라졸 40mg, 제산제"],
          위식도역류질환: [
            "프로톤펌프억제제, 제산제",
            "에소메프라졸 20mg, 제산제",
          ],
          협심증: ["니트로글리세린, 항혈소판제", "아스피린 100mg, 베타차단제"],
          "접촉성 피부염": [
            "스테로이드 연고, 항히스타민제",
            "로라타딘 10mg, 항히스타민 연고",
          ],
          "퇴행성 관절염": [
            "진통제, 관절 보호제",
            "아세트아미노펜 650mg, 글루코사민",
          ],
          감기: ["해열진통제, 항히스타민제", "타이레놀 500mg, 항히스타민제"],
          "알레르기성 비염": [
            "항히스타민제, 비강 스테로이드",
            "세티리진 10mg, 비강 스프레이",
          ],
        };

        // 기본 처방
        const defaultPrescriptions = ["대증 치료제", "증상 완화제", "영양제"];
        const diagnosisPrescriptions =
          prescriptions[diagnosis] || defaultPrescriptions;
        return diagnosisPrescriptions[
          Math.floor(Math.random() * diagnosisPrescriptions.length)
        ];
      };

      // 의사 데이터에서 실제 의사 5~10명 랜덤 선택
      const randomDoctors = [...doctorsData]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5 + Math.floor(Math.random() * 5));

      // 예정된 예약 (2-4개)
      const upcomingAppointments = randomDoctors
        .slice(0, 2 + Math.floor(Math.random() * 3))
        .map((doctor, index) => {
          const date = generateRandomDate(true);
          const time = generateRandomTime();
          const reason = generateReason(doctor.specialty);

          return {
            id: index + 1,
            date: date,
            time: time,
            hospitalName: doctor.hospitalName,
            doctorName: doctor.name,
            department: doctor.specialty,
            status: "confirmed",
            location: doctor.hospitalId
              ? `서울시 강남구 테헤란로 ${doctor.hospitalId * 10}`
              : "서울시 강남구 강남대로 123",
            reason: reason,
            doctorId: doctor.id,
            doctor: doctor,
          };
        });

      // 지난 예약 (3-6개)
      const pastAppointments = randomDoctors
        .slice(0, 3 + Math.floor(Math.random() * 4))
        .map((doctor, index) => {
          const date = generateRandomDate(false);
          const time = generateRandomTime();
          const reason = generateReason(doctor.specialty);
          const status = Math.random() > 0.2 ? "completed" : "cancelled"; // 80% 완료, 20% 취소

          const appointment = {
            id: index + 100, // ID 충돌 방지
            date: date,
            time: time,
            hospitalName: doctor.hospitalName,
            doctorName: doctor.name,
            department: doctor.specialty,
            status: status,
            location: doctor.hospitalId
              ? `서울시 강남구 테헤란로 ${doctor.hospitalId * 10}`
              : "서울시 강남구 강남대로 123",
            reason: reason,
            doctorId: doctor.id,
            doctor: doctor,
          };

          if (status === "completed") {
            const diagnosis = generateDiagnosis(doctor.specialty, reason);
            appointment.diagnosis = diagnosis;
            appointment.prescription = generatePrescription(diagnosis);
          } else if (status === "cancelled") {
            appointment.cancellationReason = [
              "개인 사정",
              "일정 변경",
              "컨디션 호전",
            ][Math.floor(Math.random() * 3)];
          }

          return appointment;
        });

      return {
        upcoming: upcomingAppointments,
        past: pastAppointments,
      };
    };

    const appointmentData = generateAppointments();

    // 탭에 따라 다른 데이터를 표시
    setTimeout(() => {
      setAppointments(
        activeTab === "upcoming"
          ? appointmentData.upcoming
          : appointmentData.past
      );
      setIsLoading(false);
    }, 500); // 로딩 시뮬레이션
  }, [activeTab, doctorsData]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleTabChange = (tab) => {
    setIsLoading(true);
    setActiveTab(tab);
  };

  const handleAppointmentChangeClick = (appointment) => {
    // 예약 상세 정보 페이지로 이동
    if (appointment.doctorId) {
      //   navigate(`/detail/doctor/${appointment.doctorId}`, {
      //     state: {
      //       fromAppointment: true,
      //       appointmentDetails: appointment,
      //     },
      //   });

      navigate("/booking", {
        state: { item: appointment.doctor, selectedDoctor: appointment.doctor },
      });
    } else {
      console.log(`예약 상세: ${appointment.id}`);
    }
  };

  const handleAppointmentDetailClick = (appointment) => {
    // 예약 상세 정보 페이지로 이동
    navigate(`/appointment-detail/${appointment.id}`, {
      state: {
        appointmentDetails: appointment,
      },
    });
  };

  // 예약 취소 버튼 클릭 핸들러
  const handleCancelClick = (e, appointment) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setAppointmentToCancel(appointment);
    setShowCancelPopup(true);
  };

  // 예약 취소 확인
  const confirmCancelAppointment = () => {
    if (!appointmentToCancel) return;

    // 실제 구현에서는 API 호출을 통해 예약을 취소
    // 여기서는 상태를 업데이트하여 UI 반영만 수행
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appt) => appt.id !== appointmentToCancel.id)
    );

    // 팝업 닫기
    setShowCancelPopup(false);
    setAppointmentToCancel(null);
  };

  // 팝업 취소
  const closeCancelPopup = () => {
    setShowCancelPopup(false);
    setAppointmentToCancel(null);
  };

  const translateSpecialty = (specialty) => {
    const specialtyMap = {
      neurology: "신경과",
      gastroenterology: "소화기내과",
      cardiology: "심장내과",
      dermatology: "피부과",
      orthopedics: "정형외과",
      ophthalmology: "안과",
      ent: "이비인후과",
      psychiatry: "정신건강의학과",
      pulmonology: "호흡기내과",
      allergy: "알레르기내과",
      urology: "비뇨의학과",
      dentistry: "치과",
      oriental: "한의원",
      family: "가정의학과",
      pain: "통증의학과",
      endocrinology: "내분비내과",
      obgyn: "산부인과",
      surgery: "외과",
      rehabilitation: "재활의학과",
      plastic: "성형외과",
      pediatrics: "소아과",
      internal: "내과",
    };

    return specialtyMap[specialty] || specialty;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="status-badge confirmed">
            <CheckCircle size={14} /> 예약 확정
          </span>
        );
      case "cancelled":
        return (
          <span className="status-badge cancelled">
            <XCircle size={14} /> 취소됨
          </span>
        );
      case "completed":
        return (
          <span className="status-badge completed">
            <BadgeCheck size={14} /> 진료 완료
          </span>
        );
      default:
        return (
          <span className="status-badge pending">
            <AlertCircle size={14} /> 대기중
          </span>
        );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // 요일 구하기
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    const dayName = dayNames[date.getDay()];

    return `${year}년 ${month}월 ${day}일 (${dayName})`;
  };

  return (
    <div className="container">
      <div className="fixed-header">
        <PageHeader
          title="진료 예약 내역"
          backButtonVisible={true}
          onBack={handleBackClick}
        />
      </div>

      <div className="appointment-content">
        <div className="appointment-tabs">
          <button
            className={`appointment-tab ${
              activeTab === "upcoming" ? "active" : ""
            }`}
            onClick={() => handleTabChange("upcoming")}
          >
            예정된 예약
          </button>
          <button
            className={`appointment-tab ${
              activeTab === "past" ? "active" : ""
            }`}
            onClick={() => handleTabChange("past")}
          >
            지난 예약
          </button>
        </div>

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>예약 정보를 불러오는 중...</p>
          </div>
        ) : appointments.length > 0 ? (
          <div className="appointment-list">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="appointment-card">
                <div
                  className="appointment-card-header"
                  onClick={() => handleAppointmentDetailClick(appointment)}
                >
                  {getStatusBadge(appointment.status)}
                  <ChevronRight size={18} className="appointment-arrow" />
                </div>

                <div className="appointment-details">
                  <div className="appointment-hospital">
                    <h3>{appointment.hospitalName}</h3>
                    <p className="appointment-department">
                      {translateSpecialty(appointment.department)} |{" "}
                      {appointment.doctorName} 의사
                    </p>
                  </div>

                  <div className="appointment-info-row">
                    <div className="appointment-info-item">
                      <Calendar size={16} />
                      <span>{formatDate(appointment.date)}</span>
                    </div>
                    <div className="appointment-info-item">
                      <Clock size={16} />
                      <span>{appointment.time}</span>
                    </div>
                  </div>

                  <div className="appointment-info-row">
                    <div className="appointment-info-item location">
                      <MapPin size={16} />
                      <span>{appointment.location}</span>
                    </div>
                  </div>

                  <div className="appointment-reason">
                    <p>
                      <strong>진료 목적:</strong> {appointment.reason}
                    </p>

                    {appointment.status === "completed" && (
                      <div className="appointment-result">
                        <p>
                          <strong>진단:</strong> {appointment.diagnosis}
                        </p>
                        <p>
                          <strong>처방:</strong> {appointment.prescription}
                        </p>
                      </div>
                    )}

                    {appointment.status === "cancelled" && (
                      <p className="cancellation-reason">
                        <strong>취소 사유:</strong>{" "}
                        {appointment.cancellationReason}
                      </p>
                    )}
                  </div>
                </div>

                <div className="appointment-card-actions">
                  {appointment.status === "confirmed" && (
                    <>
                      <button
                        className="action-button reschedule"
                        onClick={() =>
                          handleAppointmentChangeClick(appointment)
                        }
                      >
                        일정 변경
                      </button>
                      <button
                        className="action-button cancel"
                        onClick={(e) => handleCancelClick(e, appointment)}
                      >
                        예약 취소
                      </button>
                    </>
                  )}
                  {appointment.status === "completed" && (
                    <button
                      className="action-button view-record"
                      onClick={() =>
                        navigate(`/medical-records/${appointment.id}`)
                      }
                    >
                      <ClipboardList size={14} />
                      진료/시술 기록 보기
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-appointments">
            <div className="no-data-icon">
              <Calendar size={48} />
            </div>
            <p className="no-data-message">
              {activeTab === "upcoming"
                ? "예정된 진료 예약이 없습니다."
                : "지난 진료 예약 내역이 없습니다."}
            </p>
            {activeTab === "upcoming" && (
              <button
                className="make-appointment-button"
                onClick={() => navigate("/")}
              >
                진료 예약하기
              </button>
            )}
          </div>
        )}
      </div>

      {/* 예약 취소 확인 팝업 */}
      <ConfirmationPopup
        isOpen={showCancelPopup}
        title="예약 취소"
        message={`${appointmentToCancel?.hospitalName || ""} ${
          appointmentToCancel?.date ? formatDate(appointmentToCancel.date) : ""
        } ${appointmentToCancel?.time || ""} 예약을 취소하시겠습니까?`}
        confirmText="예약 취소"
        cancelText="돌아가기"
        onConfirm={confirmCancelAppointment}
        onCancel={closeCancelPopup}
        confirmButtonColor="#e11d48"
      />
    </div>
  );
};

export default AppointmentHistory;
