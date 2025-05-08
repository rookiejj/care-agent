import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const MedicalRecordModal = ({
  record,
  onClose,
  onSave,
  departments,
  doctors,
}) => {
  const [formData, setFormData] = useState({
    patientId: "",
    patientName: "",
    department: "",
    doctor: "",
    symptoms: "",
    diagnosis: "",
    treatment: "",
    medication: "",
    notes: "",
    isReviewed: false,
  });

  useEffect(() => {
    if (record) {
      setFormData({
        patientId: record.patientId,
        patientName: record.patientName,
        department: record.department,
        doctor: record.doctor,
        symptoms: record.symptoms,
        diagnosis: record.diagnosis,
        treatment: record.treatment,
        medication: record.medication,
        notes: record.notes,
        isReviewed: record.isReviewed,
      });
    }
  }, [record]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="medical-record-modal-backdrop" onClick={onClose}>
      <div
        className="medical-record-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 className="modal-title">
            {record ? "진료 기록 수정" : "새로운 진료 기록"}
          </h2>
          <button className="modal-close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="patientId" className="form-label">
              환자 ID
            </label>
            <input
              type="text"
              id="patientId"
              name="patientId"
              className="form-input"
              value={formData.patientId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="patientName" className="form-label">
              환자 이름
            </label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              className="form-input"
              value={formData.patientName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department" className="form-label">
              진료과
            </label>
            <select
              id="department"
              name="department"
              className="form-select"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">진료과 선택</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="doctor" className="form-label">
              담당 의사
            </label>
            <select
              id="doctor"
              name="doctor"
              className="form-select"
              value={formData.doctor}
              onChange={handleChange}
              required
            >
              <option value="">의사 선택</option>
              {doctors.map((doctor, index) => (
                <option key={index} value={doctor}>
                  {doctor}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group full-width">
            <label htmlFor="symptoms" className="form-label">
              증상
            </label>
            <textarea
              id="symptoms"
              name="symptoms"
              className="form-textarea"
              value={formData.symptoms}
              onChange={handleChange}
              required
              placeholder="환자가 호소하는 증상을 입력하세요"
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="diagnosis" className="form-label">
              진단
            </label>
            <input
              type="text"
              id="diagnosis"
              name="diagnosis"
              className="form-input"
              value={formData.diagnosis}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="treatment" className="form-label">
              치료
            </label>
            <input
              type="text"
              id="treatment"
              name="treatment"
              className="form-input"
              value={formData.treatment}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="medication" className="form-label">
              처방 약물
            </label>
            <textarea
              id="medication"
              name="medication"
              className="form-textarea"
              value={formData.medication}
              onChange={handleChange}
              placeholder="처방한 약물을 입력하세요"
            ></textarea>
          </div>

          <div className="form-group full-width">
            <label htmlFor="notes" className="form-label">
              특이사항
            </label>
            <textarea
              id="notes"
              name="notes"
              className="form-textarea"
              value={formData.notes}
              onChange={handleChange}
              placeholder="추가 메모 사항이나 특이사항을 입력하세요"
            ></textarea>
          </div>

          <div className="form-group">
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                id="isReviewed"
                name="isReviewed"
                checked={formData.isReviewed}
                onChange={handleChange}
                style={{ marginRight: "0.5rem" }}
              />
              <label
                htmlFor="isReviewed"
                className="form-label"
                style={{ margin: 0 }}
              >
                검토 완료
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="form-button form-button-cancel"
              onClick={onClose}
            >
              취소
            </button>
            <button type="submit" className="form-button form-button-save">
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicalRecordModal;
