import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PageHeader } from "./App";
import { useData } from "./DataContext";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  MessageSquare,
  ChevronRight,
  Image,
  X,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Edit2,
} from "lucide-react";
import "./BookingPage.css";

const BookingPage = ({ currentLocation }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [item, setItem] = useState(location.state?.item || {});
  const [selectedDoctor, setSelectedDoctor] = useState(
    location.state?.selectedDoctor || null
  );
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookingType, setBookingType] = useState(
    location.state?.type || "medical"
  );
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [savedName, setSavedName] = useState("");
  const [savedPhone, setSavedPhone] = useState("");
  const [patientSsn, setPatientSsn] = useState(""); // 주민등록번호
  const [savedSsn, setSavedSsn] = useState(""); // 저장된 주민등록번호
  const [symptoms, setSymptoms] = useState("");
  const [symptomImages, setSymptomImages] = useState([]);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [step, setStep] = useState(1);
  const fileInputRef = useRef(null);
  // Payment related states
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [cardName, setCardName] = useState("");
  const [savedCardNumber, setSavedCardNumber] = useState("");
  const [savedCardExpiry, setSavedCardExpiry] = useState("");
  const [savedCardCVC, setSavedCardCVC] = useState("");
  const [savedCardName, setSavedCardName] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [agreePaymentTerms, setAgreePaymentTerms] = useState(false);

  const [isRescheduling, setIsRescheduling] = useState(false);
  const [originalAppointment, setOriginalAppointment] = useState(null);

  useEffect(() => {
    if (!item || Object.keys(item).length === 0) {
      navigate(-1);
      return;
    }

    // 일정 변경에서 넘어온 경우 처리
    if (location.state?.fromReschedule && location.state?.originalAppointment) {
      const appointment = location.state.originalAppointment;
      setIsRescheduling(true);
      setOriginalAppointment(appointment);
      setBookingType("reschedule");

      // 기존 예약 정보에서 증상 메모 가져오기
      if (appointment.reason) {
        setSymptoms(appointment.reason);
      }
    }

    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Generate available dates (next 7 days)
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);

      // Skip Sunday (0) if needed based on doctor/hospital availability
      if (date.getDay() === 0) continue;

      dates.push({
        date: date,
        formatted: formatDate(date),
        dayName: getDayName(date),
      });
    }

    setAvailableDates(dates);

    // 저장된 주민번호 불러오기 (localStorage에서)
    const storedSsn = localStorage.getItem("patientSsn");
    const storedName = localStorage.getItem("patientName");
    const storedPhone = localStorage.getItem("patientPhone");
    const storedCardNumber = localStorage.getItem("cardNumber");
    const storedCardExpiry = localStorage.getItem("cardExpiry");
    const storedCardCVC = localStorage.getItem("cardCVC");
    const storedCardName = localStorage.getItem("cardName");

    if (storedSsn) {
      setSavedSsn(storedSsn);
    }
    if (storedName) {
      setSavedName(storedName);
    }
    if (storedPhone) {
      setSavedPhone(storedPhone);
    }
    if (storedCardNumber) {
      setSavedCardNumber(storedCardNumber);
    }
    if (storedCardExpiry) {
      setSavedCardExpiry(storedCardExpiry);
    }
    if (storedCardCVC) {
      setSavedCardCVC(storedCardCVC);
    }
    if (storedCardName) {
      setSavedCardName(storedCardName);
    }
  }, [item, location.state]);

  useEffect(() => {
    // Generate available time slots when date is selected
    if (selectedDate) {
      const selectedDateObj = availableDates.find(
        (d) => d.formatted === selectedDate
      );

      if (selectedDateObj) {
        const date = selectedDateObj.date;
        const times = generateTimeSlots(date);
        setAvailableTimes(times);
        setSelectedTime(""); // Reset selected time when date changes
      }
    }
  }, [selectedDate]);

  const handleBackClick = () => {
    if (step == 1 || paymentSuccess) {
      navigate(-1);
    }

    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getDayName = (date) => {
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    return dayNames[date.getDay()];
  };

  const generateTimeSlots = (date) => {
    const times = [];
    const day = date.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Default operating hours based on day
    let startHour = 9; // 9 AM
    let endHour = 18; // 6 PM

    // Adjust for weekend or specific doctor's schedule
    if (day === 6) {
      // Saturday
      endHour = 13; // Close earlier
    }

    // If we have doctor data, use their schedule
    if (selectedDoctor && selectedDoctor.availableTime) {
      const dayNames = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ];
      const schedule = selectedDoctor.availableTime[dayNames[day]];

      // Skip if closed ("휴진")
      if (schedule === "휴진") return [];

      // Parse schedule if available
      if (schedule && schedule.includes("-")) {
        const [start, end] = schedule.split("-");
        const [startHourStr, startMinStr] = start.split(":");
        const [endHourStr, endMinStr] = end.split(":");

        startHour = parseInt(startHourStr);
        endHour = parseInt(endHourStr);
      }
    }

    // Generate time slots at 30-minute intervals
    const currentDate = new Date();
    const isToday = date.toDateString() === currentDate.toDateString();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    // Start from current time if it's today
    const initialHour = isToday ? Math.max(startHour, currentHour) : startHour;
    const initialMinute =
      isToday && initialHour === currentHour
        ? currentMinute < 30
          ? 30
          : 0
        : 0;
    const initialHourOffset =
      isToday && initialHour === currentHour && currentMinute >= 30 ? 1 : 0;

    for (let hour = initialHour + initialHourOffset; hour < endHour; hour++) {
      for (
        let minute = hour === initialHour ? initialMinute : 0;
        minute < 60;
        minute += 30
      ) {
        // Stop if we've reached closing time
        if (hour === endHour - 1 && minute >= 30) break;

        const formattedHour = String(hour).padStart(2, "0");
        const formattedMinute = String(minute).padStart(2, "0");
        times.push(`${formattedHour}:${formattedMinute}`);
      }
    }

    return times;
  };

  const getFullDateDisplay = (dateStr) => {
    if (!dateStr) return "";

    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayName = getDayName(date);

    return `${month}월 ${day}일 (${dayName})`;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setSymptomImages([...symptomImages, ...newImages]);
    // Reset the file input value so the same file can be selected again
    e.target.value = null;
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...symptomImages];
    // Release the object URL to avoid memory leaks
    URL.revokeObjectURL(updatedImages[index].preview);
    updatedImages.splice(index, 1);
    setSymptomImages(updatedImages);
  };

  const handleSsnChange = (e) => {
    const value = e.target.value.replace(/[^0-9-]/g, "");

    // 주민번호 포맷팅 (6자리-7자리)
    if (value.length <= 6) {
      setPatientSsn(value);
      const handleNextButtonClick = () => {
        switch (step) {
          case 1:
            if (!selectedDate || !selectedTime) {
              alert("날짜와 시간을 선택해주세요.");
              return;
            }
            break;
          case 2:
            if (!patientName.trim() || !patientPhone.trim()) {
              alert("이름과 전화번호는 필수 입력사항입니다.");
              return;
            }

            // 주민번호 검증 - 현재 표시된 주민번호 사용
            const currentSsn = editingSsn ? patientSsn : savedSsn;
            const isValidSsn =
              currentSsn &&
              ((currentSsn.includes("-") && currentSsn.length === 14) ||
                (!currentSsn.includes("-") && currentSsn.length === 13));

            if (!isValidSsn) {
              alert("주민등록번호를 정확히 입력해주세요.");
              return;
            }

            if (!agreeTerms) {
              alert("개인정보 수집 및 이용에 동의해주세요.");
              return;
            }

            // 주민번호 저장 (수정 모드인 경우에만)
            if (editingSsn) {
              localStorage.setItem("patientSsn", patientSsn);
              setSavedSsn(patientSsn);
              setEditingSsn(false);
            }
            break;
          case 3:
            // 예약 확인 단계에서는 추가 검증 없음
            break;
          case 4:
            // 결제 단계 - 이 단계에서는 이 함수 사용하지 않음
            return;
        }

        setStep(step + 1);
        window.scrollTo(0, 0);
      };
    } else {
      const prefix = value.substring(0, 6);
      let suffix = value.substring(6).replace(/-/g, "");

      // 최대 7자리까지만 허용
      suffix = suffix.substring(0, 7);

      if (suffix.length > 0) {
        setPatientSsn(`${prefix}-${suffix}`);
      } else {
        setPatientSsn(prefix);
      }
    }
  };

  // 이름 변경 버튼 클릭 처리
  const toggleNameEdit = () => {
    setPatientName(savedName);
  };

  // 전화번호 변경 버튼 클릭 처리
  const togglePhoneEdit = () => {
    setPatientPhone(savedPhone);
  };

  const toggleSsnEdit = () => {
    setPatientSsn(savedSsn);
  };

  const toggleCardNumberEdit = () => {
    setCardNumber(savedCardNumber);
  };

  const toggleCardExpiryEdit = () => {
    setCardExpiry(savedCardExpiry);
  };

  const toggleCardCVCEdit = () => {
    setCardCVC(savedCardCVC);
  };

  const toggleCardNameEdit = () => {
    setCardName(savedCardName);
  };

  const handleNextButtonClick = () => {
    switch (step) {
      case 1:
        if (!selectedDate || !selectedTime) {
          alert("날짜와 시간을 선택해주세요.");
          return;
        }
        break;
      case 2:
        // 이름 검증 - 입력된 값이 있으면 그 값 사용, 아니면 저장된 값 사용
        const nameToUse = patientName || savedName;
        if (!nameToUse.trim()) {
          alert("이름을 입력해주세요.");
          return;
        }

        // 전화번호 검증 - 입력된 값이 있으면 그 값 사용, 아니면 저장된 값 사용
        const phoneToUse = patientPhone || savedPhone;
        if (!phoneToUse.trim()) {
          alert("전화번호를 입력해주세요.");
          return;
        }

        // 주민번호 검증 - 입력된 값이 있으면 그 값 사용, 아니면 저장된 값 사용
        const ssnToUse = patientSsn || savedSsn;
        const isValidSsn =
          ssnToUse &&
          ((ssnToUse.includes("-") && ssnToUse.length === 14) ||
            (!ssnToUse.includes("-") && ssnToUse.length === 13));

        if (!isValidSsn) {
          alert("주민등록번호를 정확히 입력해주세요.");
          return;
        }

        if (!agreeTerms) {
          alert("개인정보 수집 및 이용에 동의해주세요.");
          return;
        }

        // 이름 저장 (입력된 값이 있고 기존 값과 다른 경우에만)
        if (patientName && patientName !== savedName) {
          localStorage.setItem("patientName", patientName);
          setSavedName(patientName);
        }

        // 전화번호 저장 (입력된 값이 있고 기존 값과 다른 경우에만)
        if (patientPhone && patientPhone !== savedPhone) {
          localStorage.setItem("patientPhone", patientPhone);
          setSavedPhone(patientPhone);
        }

        // 주민번호 저장 (입력된 값이 있고 기존 값과 다른 경우에만)
        if (patientSsn && patientSsn !== savedSsn) {
          localStorage.setItem("patientSsn", patientSsn);
          setSavedSsn(patientSsn);
        }
        break;
      case 3:
        // 예약 확인 단계에서는 추가 검증 없음
        break;
      case 4:
        // 결제 단계 - 이 단계에서는 이 함수 사용하지 않음
        return;
    }

    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const handlePrevButtonClick = () => {
    if (step === 1) {
      navigate(-1);
    } else {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  // 이전 버튼 비활성화 조건
  const isPrevButtonDisabled = () => {
    // 결제 처리 중일 때만 이전 버튼 비활성화
    return step === 4 && isProcessingPayment;
  };

  // 다음 버튼 비활성화 조건
  const isNextButtonDisabled = () => {
    switch (step) {
      case 1:
        return !selectedDate || !selectedTime;
      case 2:
        // 이름과 전화번호 검증
        const nameToCheck = patientName || savedName;
        const phoneToCheck = patientPhone || savedPhone;

        // 주민번호 형식 체크
        const ssnToCheck = patientSsn || savedSsn;
        const isValidSsn =
          ssnToCheck &&
          ((ssnToCheck.includes("-") && ssnToCheck.length === 14) ||
            (!ssnToCheck.includes("-") && ssnToCheck.length === 13));

        return (
          !nameToCheck.trim() ||
          !phoneToCheck.trim() ||
          !isValidSsn ||
          !agreeTerms
        );
      case 3:
        return false; // 예약 확인 단계에서는 항상 활성화
      default:
        return false;
    }
  };

  // 결제 버튼 비활성화 조건
  const isPaymentButtonDisabled = () => {
    if (isProcessingPayment || !agreePaymentTerms) {
      return true;
    }

    if (paymentMethod === "card") {
      const currentCardNumber = cardNumber || savedCardNumber;
      const currentCardExpiry = cardExpiry || savedCardExpiry;
      const currentCardCVC = cardCVC || savedCardCVC;

      // 카드 정보가 모두 입력되었는지 확인
      if (
        !currentCardNumber.replace(/\s/g, "").trim() ||
        !currentCardExpiry.replace(/\//g, "").trim() ||
        !currentCardCVC.trim()
      ) {
        return true;
      }
    }

    return false;
  };

  // Format credit card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Format expiry date MM/YY
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }

    return v;
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  const handleExpiryChange = (e) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setCardExpiry(formattedValue);
  };

  const handleCVCChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 3);
    setCardCVC(value);
  };

  const handlePayment = () => {
    // Validate payment information
    if (paymentMethod === "card") {
      const currentCardNumber = cardNumber || savedCardNumber;
      const currentCardExpiry = cardExpiry || savedCardExpiry;
      const currentCardCVC = cardCVC || savedCardCVC;

      if (
        !currentCardNumber.replace(/\s/g, "").trim() ||
        !currentCardExpiry.replace(/\//g, "").trim() ||
        !currentCardCVC.trim()
      ) {
        alert("카드 정보를 모두 입력해주세요.");
        return;
      }

      // 카드 정보 저장 (입력된 값이 있고 기존 값과 다른 경우에만)
      if (cardNumber && cardNumber !== savedCardNumber) {
        localStorage.setItem("cardNumber", cardNumber);
        setSavedCardNumber(cardNumber);
      }

      if (cardExpiry && cardExpiry !== savedCardExpiry) {
        localStorage.setItem("cardExpiry", cardExpiry);
        setSavedCardExpiry(cardExpiry);
      }

      if (cardCVC && cardCVC !== savedCardCVC) {
        localStorage.setItem("cardCVC", cardCVC);
        setSavedCardCVC(cardCVC);
      }

      if (cardName && cardName !== savedCardName) {
        localStorage.setItem("cardName", cardName);
        setSavedCardName(cardName);
      }
    }

    if (!agreePaymentTerms) {
      alert("결제 동의 약관에 동의해주세요.");
      return;
    }

    // Simulate payment processing
    setIsProcessingPayment(true);

    // Fake payment processing delay
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  // 마스킹된 카드번호 표시 함수
  const getMaskedCardNumber = (cardNum) => {
    if (!cardNum) return "";

    const cleanNum = cardNum.replace(/\s/g, "");
    if (cleanNum.length < 13) return cardNum;

    // 앞 4자리와 마지막 4자리만 표시, 나머지는 '*'로 대체
    const firstFour = cleanNum.substring(0, 4);
    const lastFour = cleanNum.substring(cleanNum.length - 4);
    const maskedPart = "*".repeat(cleanNum.length - 8);

    // 4자리마다 공백 추가
    return `${firstFour} ${maskedPart.substring(0, 4)} ${maskedPart.substring(
      4,
      8
    )} ${lastFour}`;
  };

  // 마스킹된 CVC 표시 함수
  const getMaskedCVC = () => {
    return "***";
  };

  const handleBookingComplete = () => {
    if (isRescheduling && originalAppointment) {
      // 실제 앱에서는 여기서 API 호출하여 기존 예약 취소 및 새 예약 생성
      console.log("기존 예약 ID:", originalAppointment.id, "취소 처리됨");
      console.log("새 예약 생성 완료:", selectedDate, selectedTime);
    }

    navigate(-1);
  };

  const formatTimeWithAmPm = (timeStr) => {
    if (!timeStr) return "";

    const [hourStr, minuteStr] = timeStr.split(":");
    const hour = parseInt(hourStr);

    const ampm = hour < 12 ? "오전" : "오후";
    const displayHour = hour % 12 || 12;

    return `${ampm} ${displayHour}:${minuteStr}`;
  };

  // 주민번호 마스킹 처리 함수
  const getMaskedSsn = (ssn) => {
    if (!ssn) return "";

    // 주민번호 형식이 "123456-1234567"인 경우
    if (ssn.includes("-")) {
      const [prefix, suffix] = ssn.split("-");
      return `${prefix}-${suffix.substring(0, 1)}******`;
    }

    // 주민번호 형식이 "1234561234567"인 경우
    return `${ssn.substring(0, 6)}-${ssn.substring(6, 7)}******`;
  };

  // Calculate the total price (example)
  const calculatePrice = () => {
    // Default consultation fee
    let basePrice = 15000;

    // Additional fee for specific doctors or specialties
    if (selectedDoctor && selectedDoctor.premium) {
      basePrice += 5000;
    }

    // Add any other fees based on booking type
    if (bookingType === "procedure") {
      basePrice += 10000;
    }

    return basePrice;
  };

  const getStepTitle = () => {
    // 일정 변경인 경우 타이틀 변경
    if (isRescheduling) {
      switch (step) {
        case 1:
          return "일정 변경";
        case 2:
          return "예약자 정보";
        case 3:
          return "변경 예약 확인";
        case 4:
          return !paymentSuccess ? "결제하기" : "결제완료";
        default:
          return "일정 변경";
      }
    }

    switch (step) {
      case 1:
        return "예약하기";
      case 2:
        return "예약자 정보";
      case 3:
        return "예약 확인";
      case 4:
        return !paymentSuccess ? "결제하기" : "결제완료";
      default:
        return "예약하기";
    }
  };

  // 개선된 취소 핸들러 함수
  const handleCancelBooking = () => {
    // 작성 중인 예약 정보가 있을 때만 확인 팝업 표시
    if (
      selectedDate ||
      selectedTime ||
      patientName ||
      patientPhone ||
      patientSsn ||
      symptoms
    ) {
      const confirmed = window.confirm(
        "예약을 취소하시겠습니까? 입력한 정보는 저장되지 않습니다."
      );
      if (!confirmed) {
        return; // 사용자가 취소를 선택하면 함수 종료
      }
    }

    // 사용자가 확인을 선택하거나 작성 중인 정보가 없으면 이전 페이지로 이동
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="fixed-header">
        <PageHeader
          currentLocation={currentLocation}
          backButtonVisible={true}
          onBack={handleBackClick}
          title={getStepTitle()}
          rightComponent={
            !paymentSuccess ? (
              <button
                onClick={handleCancelBooking}
                className="booking-cancel-button"
              >
                취소
              </button>
            ) : null
          }
        />
      </div>

      <div className="booking-content">
        {step === 1 && (
          <div className="booking-step date-time-selection">
            <div className="booking-info-card">
              <div className="booking-info-header">
                <h3 className="booking-info-title">
                  {selectedDoctor ? `${selectedDoctor.name} 의사` : item.title}
                </h3>
                <p className="booking-info-subtitle">
                  {selectedDoctor
                    ? `${selectedDoctor.hospitalName || item.title}`
                    : item.subtitle || ""}
                </p>
              </div>

              <div className="booking-type-tag">
                {isRescheduling
                  ? "일정 변경"
                  : bookingType === "medical"
                  ? "진료 예약"
                  : "시술 예약"}
              </div>
            </div>

            <div className="booking-section">
              <h3 className="booking-section-title">
                <Calendar size={18} />
                날짜 선택
              </h3>
              <div className="date-selection">
                {availableDates.map((dateInfo, index) => (
                  <button
                    key={index}
                    className={`date-button ${
                      selectedDate === dateInfo.formatted ? "selected" : ""
                    }`}
                    onClick={() => handleDateSelect(dateInfo.formatted)}
                  >
                    <span className="date-day">{dateInfo.dayName}</span>
                    <span className="date-number">
                      {dateInfo.date.getDate()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {selectedDate && (
              <div className="booking-section">
                <h3 className="booking-section-title">
                  <Clock size={18} />
                  시간 선택
                </h3>
                {availableTimes.length > 0 ? (
                  <div className="time-selection">
                    {availableTimes.map((time, index) => (
                      <button
                        key={index}
                        className={`time-button ${
                          selectedTime === time ? "selected" : ""
                        }`}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {formatTimeWithAmPm(time)}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="no-times-message">
                    선택한 날짜에 예약 가능한 시간이 없습니다.
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="booking-step patient-info">
            <div className="booking-summary-card">
              <div className="booking-summary-item">
                <span className="booking-summary-label">예약 일시</span>
                <span className="booking-summary-value">
                  {getFullDateDisplay(selectedDate)}{" "}
                  {formatTimeWithAmPm(selectedTime)}
                </span>
              </div>
              <div className="booking-summary-item">
                <span className="booking-summary-label">
                  {selectedDoctor ? "의사" : "병원"}
                </span>
                <span className="booking-summary-value">
                  {selectedDoctor ? `${selectedDoctor.name} 의사` : item.title}
                </span>
              </div>
              {selectedDoctor && (
                <div className="booking-summary-item">
                  <span className="booking-summary-label">병원</span>
                  <span className="booking-summary-value">
                    {selectedDoctor.hospitalName || item.title}
                  </span>
                </div>
              )}
            </div>

            <div className="booking-section">
              <h3 className="booking-section-title">
                <User size={18} />
                예약자 정보
              </h3>
              {/* 이름 입력 부분 */}
              <div className="form-group">
                <label className="form-label">이름 *</label>
                <div className="ssn-container">
                  {savedName && !patientName ? (
                    // 저장된 이름이 있고 현재 새로운 입력이 없는 경우
                    <>
                      <input
                        type="text"
                        className="form-input masked-input"
                        value={savedName}
                        readOnly
                        style={{ flex: 1 }}
                      />
                      <button
                        onClick={toggleNameEdit}
                        className="ssn-edit-button"
                        type="button"
                      >
                        <Edit2 size={16} />
                      </button>
                    </>
                  ) : (
                    // 저장된 이름이 없거나 새로운 입력이 있는 경우
                    <input
                      type="text"
                      className="form-input"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="실명을 입력해주세요"
                      required
                    />
                  )}
                </div>
              </div>

              {/* 전화번호 입력 부분 */}
              <div className="form-group">
                <label className="form-label">전화번호 *</label>
                <div className="ssn-container">
                  {savedPhone && !patientPhone ? (
                    // 저장된 전화번호가 있고 현재 새로운 입력이 없는 경우
                    <>
                      <input
                        type="text"
                        className="form-input masked-input"
                        value={savedPhone}
                        readOnly
                        style={{ flex: 1 }}
                      />
                      <button
                        onClick={togglePhoneEdit}
                        className="ssn-edit-button"
                        type="button"
                      >
                        <Edit2 size={16} />
                      </button>
                    </>
                  ) : (
                    // 저장된 전화번호가 없거나 새로운 입력이 있는 경우
                    <input
                      type="tel"
                      className="form-input"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="연락 가능한 번호를 입력해주세요"
                      required
                    />
                  )}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">주민등록번호 *</label>
                <div className="ssn-container">
                  {savedSsn && !patientSsn ? (
                    // 저장된 주민번호가 있고 현재 새로운 입력이 없는 경우
                    <>
                      <input
                        type="text"
                        className="form-input masked-input"
                        value={getMaskedSsn(savedSsn)}
                        readOnly
                        style={{ flex: 1 }}
                      />
                      <button
                        onClick={toggleSsnEdit}
                        className="ssn-edit-button"
                        type="button"
                      >
                        <Edit2 size={16} />
                      </button>
                    </>
                  ) : (
                    // 저장된 주민번호가 없거나 새로운 입력이 있는 경우
                    <input
                      type="text"
                      className="form-input ssn-input"
                      value={patientSsn}
                      onChange={handleSsnChange}
                      placeholder="주민등록번호를 입력해주세요 (예: 123456-1234567)"
                      maxLength={14}
                      required
                    />
                  )}
                </div>
                <span className="input-help-text">
                  주민등록번호는 환자 식별 및 진료 기록 관리를 위해 필요합니다
                </span>
              </div>
            </div>

            <div className="booking-section">
              <h3 className="booking-section-title">
                <MessageSquare size={18} />
                증상 메모
              </h3>
              <div className="symptoms-container">
                <textarea
                  className="symptoms-textarea"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="의사에게 알리고 싶은 증상이나 문의사항을 적어주세요"
                ></textarea>

                <div className="image-upload-container">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                  <button
                    type="button"
                    className="image-upload-button"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <Image size={18} />
                    이미지 첨부하기
                  </button>
                </div>

                {symptomImages.length > 0 && (
                  <div className="image-preview-container">
                    {symptomImages.map((image, index) => (
                      <div key={index} className="image-preview-item">
                        <img
                          src={image.preview}
                          alt={`증상 이미지 ${index + 1}`}
                        />
                        <button
                          className="image-remove-button"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="terms-agreement">
              <div
                className="checkbox-container"
                onClick={() => setAgreeTerms(!agreeTerms)}
              >
                <div
                  className={`custom-checkbox ${agreeTerms ? "checked" : ""}`}
                >
                  {agreeTerms && <span className="checkmark"></span>}
                </div>
                <label>개인정보 수집 및 이용에 동의합니다 *</label>
              </div>
              <button className="terms-detail-button">
                자세히 <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="booking-step booking-confirmation">
            <div className="confirmation-card">
              <h3 className="confirmation-title">예약 정보를 확인해주세요</h3>

              <div className="confirmation-section">
                <h4 className="confirmation-section-title">예약 일시</h4>
                <p className="confirmation-text">
                  {getFullDateDisplay(selectedDate)}{" "}
                  {formatTimeWithAmPm(selectedTime)}
                </p>
              </div>

              <div className="confirmation-section">
                <h4 className="confirmation-section-title">
                  {selectedDoctor ? "의사 정보" : "병원 정보"}
                </h4>
                <p className="confirmation-text">
                  {selectedDoctor ? `${selectedDoctor.name} 의사` : item.title}
                </p>
                <p className="confirmation-subtext">
                  {selectedDoctor
                    ? selectedDoctor.hospitalName
                    : item.location || ""}
                </p>
              </div>

              <div className="confirmation-section">
                <h4 className="confirmation-section-title">예약자 정보</h4>
                <div className="confirmation-info-item">
                  <User size={16} />
                  <p>{patientName || savedName}</p>
                </div>
                <div className="confirmation-info-item">
                  <Phone size={16} />
                  <p>{patientPhone || savedPhone}</p>
                </div>
                <div className="confirmation-info-item">
                  <User size={16} />
                  <p>주민등록번호: {getMaskedSsn(patientSsn || savedSsn)}</p>
                </div>
              </div>

              {(symptoms || symptomImages.length > 0) && (
                <div className="confirmation-section">
                  <h4 className="confirmation-section-title">증상 메모</h4>
                  {symptoms && <p className="confirmation-text">{symptoms}</p>}
                  {symptomImages.length > 0 && (
                    <div className="image-preview-container">
                      {symptomImages.map((image, index) => (
                        <div key={index} className="image-preview-item">
                          <img
                            src={image.preview}
                            alt={`증상 이미지 ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="confirmation-section">
                <h4 className="confirmation-section-title">진료비</h4>
                <div className="confirmation-price">
                  <span className="confirmation-price-label">총 결제 금액</span>
                  <span className="confirmation-price-value">
                    {calculatePrice().toLocaleString()}원
                  </span>
                </div>
                <p className="confirmation-price-note">
                  * 진료비는 예상 금액이며, 실제 진료 후 변경될 수 있습니다.
                </p>
              </div>

              <div className="confirmation-notes">
                <h4 className="confirmation-notes-title">예약 시 참고사항</h4>
                <ul className="confirmation-notes-list">
                  <li>예약 시간 10분 전에 도착해주세요.</li>
                  <li>초진인 경우 건강보험증을 지참해주세요.</li>
                  <li>
                    부득이하게 예약을 취소해야 할 경우, 최소 2시간 전에 연락
                    부탁드립니다.
                  </li>
                  <li>주차는 병원 주차장을 이용하실 수 있습니다.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="booking-step payment-step">
            <div className="booking-summary-card">
              <div className="booking-summary-item">
                <span className="booking-summary-label">예약 일시</span>
                <span className="booking-summary-value">
                  {getFullDateDisplay(selectedDate)}{" "}
                  {formatTimeWithAmPm(selectedTime)}
                </span>
              </div>
              <div className="booking-summary-item">
                <span className="booking-summary-label">
                  {selectedDoctor ? "의사" : "병원"}
                </span>
                <span className="booking-summary-value">
                  {selectedDoctor ? `${selectedDoctor.name} 의사` : item.title}
                </span>
              </div>
              <div className="booking-summary-item payment-amount">
                <span className="booking-summary-label">결제 금액</span>
                <span className="booking-summary-value price-value">
                  {calculatePrice().toLocaleString()}원
                </span>
              </div>
            </div>

            {!paymentSuccess ? (
              <>
                <div className="booking-section payment-methods">
                  <h3 className="booking-section-title">
                    <CreditCard size={18} />
                    결제 수단 선택
                  </h3>
                  <div className="payment-method-options">
                    <div
                      className={`payment-method-option ${
                        paymentMethod === "card" ? "selected" : ""
                      }`}
                      onClick={() => setPaymentMethod("card")}
                    >
                      <div className="payment-method-radio">
                        <div
                          className={`radio-inner ${
                            paymentMethod === "card" ? "selected" : ""
                          }`}
                        ></div>
                      </div>
                      <span>신용/체크카드</span>
                    </div>
                    <div
                      className={`payment-method-option ${
                        paymentMethod === "transfer" ? "selected" : ""
                      }`}
                      onClick={() => setPaymentMethod("transfer")}
                    >
                      <div className="payment-method-radio">
                        <div
                          className={`radio-inner ${
                            paymentMethod === "transfer" ? "selected" : ""
                          }`}
                        ></div>
                      </div>
                      <span>실시간 계좌이체</span>
                    </div>
                    <div
                      className={`payment-method-option ${
                        paymentMethod === "virtual" ? "selected" : ""
                      }`}
                      onClick={() => setPaymentMethod("virtual")}
                    >
                      <div className="payment-method-radio">
                        <div
                          className={`radio-inner ${
                            paymentMethod === "virtual" ? "selected" : ""
                          }`}
                        ></div>
                      </div>
                      <span>가상계좌</span>
                    </div>
                    <div
                      className={`payment-method-option ${
                        paymentMethod === "phone" ? "selected" : ""
                      }`}
                      onClick={() => setPaymentMethod("phone")}
                    >
                      <div className="payment-method-radio">
                        <div
                          className={`radio-inner ${
                            paymentMethod === "phone" ? "selected" : ""
                          }`}
                        ></div>
                      </div>
                      <span>휴대폰 결제</span>
                    </div>
                  </div>
                </div>

                {paymentMethod === "card" && (
                  <div className="booking-section payment-card-info">
                    <h3 className="booking-section-title">카드 정보 입력</h3>
                    {/* 카드번호 입력 부분 */}
                    <div className="form-group">
                      <label className="form-label">카드번호 *</label>
                      <div className="ssn-container">
                        {savedCardNumber && !cardNumber ? (
                          // 저장된 카드번호가 있고 현재 새로운 입력이 없는 경우
                          <>
                            <input
                              type="text"
                              className="form-input masked-input"
                              value={getMaskedCardNumber(savedCardNumber)}
                              readOnly
                              style={{ flex: 1 }}
                            />
                            <button
                              onClick={toggleCardNumberEdit}
                              className="ssn-edit-button"
                              type="button"
                            >
                              <Edit2 size={16} />
                            </button>
                          </>
                        ) : (
                          // 저장된 카드번호가 없거나 새로운 입력이 있는 경우
                          <input
                            type="text"
                            className="form-input"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="0000 0000 0000 0000"
                            maxLength={19}
                            required
                          />
                        )}
                      </div>
                      <span className="input-help-text">
                        16자리 숫자를 입력하세요 (공백 자동 추가)
                      </span>
                    </div>

                    {/* 유효기간과 CVC 입력 부분 */}
                    <div className="form-row">
                      <div className="form-group half">
                        <label className="form-label">유효기간 *</label>
                        <div className="ssn-container">
                          {savedCardExpiry && !cardExpiry ? (
                            // 저장된 유효기간이 있고 현재 새로운 입력이 없는 경우
                            <>
                              <input
                                type="text"
                                className="form-input masked-input"
                                value={savedCardExpiry}
                                readOnly
                                style={{ flex: 1 }}
                              />
                              <button
                                onClick={toggleCardExpiryEdit}
                                className="ssn-edit-button"
                                type="button"
                              >
                                <Edit2 size={14} />
                              </button>
                            </>
                          ) : (
                            // 저장된 유효기간이 없거나 새로운 입력이 있는 경우
                            <input
                              type="text"
                              className="form-input"
                              value={cardExpiry}
                              onChange={handleExpiryChange}
                              placeholder="MM/YY"
                              maxLength={5}
                              required
                            />
                          )}
                        </div>
                        <span className="input-help-text">예: 01/26</span>
                      </div>
                      <div className="form-group half">
                        <label className="form-label">CVC *</label>
                        <div className="ssn-container">
                          {savedCardCVC && !cardCVC ? (
                            // 저장된 CVC가 있고 현재 새로운 입력이 없는 경우
                            <>
                              <input
                                type="text"
                                className="form-input masked-input"
                                value={getMaskedCVC()}
                                readOnly
                                style={{ flex: 1 }}
                              />
                              <button
                                onClick={toggleCardCVCEdit}
                                className="ssn-edit-button"
                                type="button"
                              >
                                <Edit2 size={14} />
                              </button>
                            </>
                          ) : (
                            // 저장된 CVC가 없거나 새로운 입력이 있는 경우
                            <input
                              type="text"
                              className="form-input"
                              value={cardCVC}
                              onChange={handleCVCChange}
                              placeholder="000"
                              maxLength={3}
                              required
                            />
                          )}
                        </div>
                        <span className="input-help-text">카드 뒷면 3자리</span>
                      </div>
                    </div>

                    {/* 카드 소유자 이름 입력 부분 */}
                    <div className="form-group">
                      <label className="form-label">카드 소유자 이름</label>
                      <div className="ssn-container">
                        {savedCardName && !cardName ? (
                          // 저장된 카드 소유자 이름이 있고 현재 새로운 입력이 없는 경우
                          <>
                            <input
                              type="text"
                              className="form-input masked-input"
                              value={savedCardName}
                              readOnly
                              style={{ flex: 1 }}
                            />
                            <button
                              onClick={toggleCardNameEdit}
                              className="ssn-edit-button"
                              type="button"
                            >
                              <Edit2 size={16} />
                            </button>
                          </>
                        ) : (
                          // 저장된 카드 소유자 이름이 없거나 새로운 입력이 있는 경우
                          <input
                            type="text"
                            className="form-input"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="카드에 표시된 이름"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "transfer" && (
                  <div className="booking-section payment-transfer-info">
                    <div className="payment-info-message">
                      <AlertCircle size={18} />
                      <p>다음 화면에서 계좌이체 정보를 입력하게 됩니다.</p>
                    </div>
                  </div>
                )}

                {paymentMethod === "virtual" && (
                  <div className="booking-section payment-virtual-info">
                    <div className="payment-info-message">
                      <AlertCircle size={18} />
                      <p>
                        가상계좌 발급 후 24시간 이내에 입금해주셔야 예약이
                        확정됩니다.
                      </p>
                    </div>
                  </div>
                )}

                {paymentMethod === "phone" && (
                  <div className="booking-section payment-phone-info">
                    <div className="payment-info-message">
                      <AlertCircle size={18} />
                      <p>
                        휴대폰 결제는 월 결제한도 범위 내에서 이용 가능합니다.
                      </p>
                    </div>
                  </div>
                )}

                <div className="payment-terms-agreement">
                  <div
                    className="checkbox-container"
                    onClick={() => setAgreePaymentTerms(!agreePaymentTerms)}
                  >
                    <div
                      className={`custom-checkbox ${
                        agreePaymentTerms ? "checked" : ""
                      }`}
                    >
                      {agreePaymentTerms && <span className="checkmark"></span>}
                    </div>
                    <label>결제 진행 및 예약 정보 제공에 동의합니다 *</label>
                  </div>
                  <button className="terms-detail-button">
                    자세히 <ChevronRight size={14} />
                  </button>
                </div>
              </>
            ) : (
              <div className="payment-success">
                <div className="payment-success-icon">
                  <CheckCircle size={48} />
                </div>
                <h3 className="payment-success-title">결제가 완료되었습니다</h3>
                <p className="payment-success-message">
                  예약이 확정되었습니다.<br></br>예약 내역은 마이페이지에서
                  확인하실 수 있습니다.
                </p>
                <button
                  className="payment-complete-button"
                  onClick={handleBookingComplete}
                >
                  확인
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="detail-page-footer">
        {step < 5 && !paymentSuccess && (
          <div className="button-group">
            <button
              className="booking-prev-button"
              onClick={handlePrevButtonClick}
              disabled={isPrevButtonDisabled()}
            >
              이전
            </button>

            {step < 4 ? (
              <button
                className="primary-button"
                onClick={handleNextButtonClick}
                disabled={isNextButtonDisabled()}
              >
                {step === 3 ? "결제하기" : "다음"}
              </button>
            ) : (
              <button
                className={`payment-button ${
                  isProcessingPayment ? "processing" : ""
                }`}
                onClick={handlePayment}
                disabled={isPaymentButtonDisabled()}
              >
                {isProcessingPayment ? (
                  <span className="payment-processing">
                    <span className="spinner"></span>
                    결제 처리 중...
                  </span>
                ) : (
                  `${calculatePrice().toLocaleString()}원 결제하기`
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
