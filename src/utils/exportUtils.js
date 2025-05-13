// utils/exportUtils.js
// 데이터 내보내기 관련 유틸리티 함수 모음

import * as XLSX from "xlsx";

/**
 * 데이터를 CSV 파일로 내보내는 함수
 * @param {Array} data - 내보낼 데이터 배열
 * @param {String} filename - 파일명 (확장자 제외)
 */
export const exportToCSV = (data, filename) => {
  if (!data || !data.length) {
    console.warn("내보낼 데이터가 없습니다.");
    return;
  }

  // CSV 문자열 생성
  let csvContent = "data:text/csv;charset=utf-8,";

  // 헤더 추가
  const headers = Object.keys(data[0]);
  csvContent += headers.join(",") + "\n";

  // 데이터 행 추가
  data.forEach((row) => {
    let rowContent = headers
      .map((header) => {
        // 쉼표가 포함된 데이터는 따옴표로 감싸기
        const cell = row[header] !== undefined ? row[header].toString() : "";
        return cell.includes(",") ? `"${cell}"` : cell;
      })
      .join(",");
    csvContent += rowContent + "\n";
  });

  // 다운로드 링크 생성 및 클릭
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute(
    "download",
    `${filename || "export"}_${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * 데이터를 Excel 파일로 내보내는 함수
 * @param {Array} data - 내보낼 데이터 배열
 * @param {String} filename - 파일명 (확장자 제외)
 * @param {String} sheetName - 시트 이름
 */
export const exportToExcel = (data, filename, sheetName = "Sheet1") => {
  if (!data || !data.length) {
    console.warn("내보낼 데이터가 없습니다.");
    return;
  }

  // 워크시트 생성
  const worksheet = XLSX.utils.json_to_sheet(data);

  // 워크북 생성 및 워크시트 추가
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // 파일 다운로드
  XLSX.writeFile(
    workbook,
    `${filename || "export"}_${new Date().toISOString().slice(0, 10)}.xlsx`
  );
};

/**
 * 필터링된 환자 데이터를 내보내기 용도로 변환하는 함수
 * @param {Array} patients - 환자 데이터 배열
 * @returns {Array} - 내보내기 용도로 가공된 데이터
 */
export const formatPatientDataForExport = (patients) => {
  return patients.map((patient) => ({
    ID: patient.id,
    이름: patient.name,
    성별: patient.gender,
    나이: patient.age,
    생년월일: patient.birthDate
      ? new Date(patient.birthDate).toLocaleDateString()
      : "",
    전화번호: patient.phoneNumber,
    이메일: patient.email || "",
    주소: patient.address || "",
    혈액형: patient.bloodType || "",
    "마지막 방문": patient.lastVisit
      ? new Date(patient.lastVisit).toLocaleDateString()
      : "",
    "방문 횟수": patient.visitCount,
    "방문 상태": patient.status,
    "환자 유형": patient.patientType,
    "관심 시술": patient.cosmeticInterests
      ? patient.cosmeticInterests.join(", ")
      : "",
    "이전 시술": patient.previousProcedures
      ? patient.previousProcedures.join(", ")
      : "",
    "보험 유형": patient.insuranceType || "",
    "의료 이력": patient.medicalHistory || "",
    "다음 예약": patient.upcomingAppointment
      ? new Date(patient.upcomingAppointment).toLocaleDateString()
      : "",
    추천인: patient.recommendedBy || "",
  }));
};

/**
 * 예약 데이터를 내보내기 용도로 변환하는 함수
 * @param {Array} appointments - 예약 데이터 배열
 * @returns {Array} - 내보내기 용도로 가공된 데이터
 */
export const formatAppointmentDataForExport = (appointments) => {
  return appointments.map((appointment) => ({
    "예약 ID": appointment.id,
    "환자 이름": appointment.patientName,
    "의사/담당자": appointment.doctor || "",
    "예약 일시": appointment.date
      ? new Date(appointment.dateTime).toLocaleString()
      : "",
    "예약 유형": appointment.department,
    "시술/진료": appointment.reason || "",
    상태: appointment.status,
    메모: appointment.note || "",
  }));
};

/**
 * 의료진 데이터를 내보내기 용도로 변환하는 함수
 * @param {Array} doctors - 의료진 데이터 배열
 * @returns {Array} - 내보내기 용도로 가공된 데이터
 */
export const formatDoctorDataForExport = (doctors) => {
  return doctors.map((doctor) => ({
    ID: doctor.id,
    이름: doctor.name,
    "전문 분야": doctor.specialization || "",
    직책: doctor.position || "",
    이메일: doctor.email || "",
    전화번호: doctor.phoneNumber || "",
    "근무 시작일": doctor.startDate
      ? new Date(doctor.startDate).toLocaleDateString()
      : "",
    자격증: doctor.certifications ? doctor.certifications.join(", ") : "",
    "담당 서비스": doctor.services ? doctor.services.join(", ") : "",
  }));
};

/**
 * 시술 데이터를 내보내기 용도로 변환하는 함수
 * @param {Array} procedures - 시술 데이터 배열
 * @returns {Array} - 내보내기 용도로 가공된 데이터
 */
export const formatProcedureDataForExport = (procedures) => {
  return procedures.map((procedure) => ({
    ID: procedure.id,
    시술명: procedure.name,
    카테고리: procedure.category || "",
    가격: procedure.price ? `${procedure.price.toLocaleString()}원` : "",
    "소요 시간": procedure.duration ? `${procedure.duration}분` : "",
    "회복 기간": procedure.recoveryTime || "",
    설명: procedure.description || "",
  }));
};

/**
 * 객체 배열을 CSV 문자열로 변환하는 함수
 * @param {Array} data - 객체 배열
 * @returns {String} - CSV 문자열
 */
export const convertArrayToCSV = (data) => {
  if (!data || !data.length) return "";

  const headers = Object.keys(data[0]);
  const csvRows = [];

  // 헤더 추가
  csvRows.push(headers.join(","));

  // 데이터 행 추가
  for (const row of data) {
    const values = headers.map((header) => {
      const escaped = ("" + (row[header] || "")).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }

  return csvRows.join("\n");
};
