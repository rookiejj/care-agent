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
  Mail,
  MessageSquare,
  ChevronRight,
  Image,
  X,
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
  const [patientEmail, setPatientEmail] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [symptomImages, setSymptomImages] = useState([]);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [step, setStep] = useState(1);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!item || Object.keys(item).length === 0) {
      navigate(-1);
      return;
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
  }, [item]);

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
    navigate(-1);
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

  const handleNextStep = () => {
    if (step === 1) {
      // Validate date and time selection
      if (!selectedDate || !selectedTime) {
        alert("날짜와 시간을 선택해주세요.");
        return;
      }
      setStep(2);
      window.scrollTo(0, 0);
    } else if (step === 2) {
      // Validate patient info
      if (!patientName.trim() || !patientPhone.trim()) {
        alert("이름과 전화번호는 필수 입력사항입니다.");
        return;
      }
      if (!agreeTerms) {
        alert("개인정보 수집 및 이용에 동의해주세요.");
        return;
      }
      setStep(3);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    // In a real app, this would send the booking data to a server
    // For demo purposes, we'll just show a success message
    alert("예약이 완료되었습니다.");
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

  return (
    <div className="container">
      <div className="fixed-header">
        <PageHeader
          currentLocation={currentLocation}
          backButtonVisible={true}
          onBack={handleBackClick}
          title={
            step === 1 ? "예약하기" : step === 2 ? "예약자 정보" : "예약 확인"
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
                {bookingType === "medical" ? "진료 예약" : "시술 예약"}
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

            <button
              className="booking-next-button"
              onClick={handleNextStep}
              disabled={!selectedDate || !selectedTime}
            >
              다음
            </button>
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
              <div className="form-group">
                <label className="form-label">이름 *</label>
                <input
                  type="text"
                  className="form-input"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="실명을 입력해주세요"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">전화번호 *</label>
                <input
                  type="tel"
                  className="form-input"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  placeholder="연락 가능한 번호를 입력해주세요"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">이메일</label>
                <input
                  type="email"
                  className="form-input"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  placeholder="예약 확인 메일을 받을 이메일 (선택)"
                />
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

            <button
              className="booking-next-button"
              onClick={handleNextStep}
              disabled={!patientName || !patientPhone || !agreeTerms}
            >
              다음
            </button>
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
                  <p>{patientName}</p>
                </div>
                <div className="confirmation-info-item">
                  <Phone size={16} />
                  <p>{patientPhone}</p>
                </div>
                {patientEmail && (
                  <div className="confirmation-info-item">
                    <Mail size={16} />
                    <p>{patientEmail}</p>
                  </div>
                )}
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

            <div className="booking-actions">
              <button
                className="booking-modify-button"
                onClick={() => setStep(1)}
              >
                수정하기
              </button>
              <button className="booking-confirm-button" onClick={handleSubmit}>
                예약 확정하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
