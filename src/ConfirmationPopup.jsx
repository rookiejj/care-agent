import React from "react";
import "./ConfirmationPopup.css";

const ConfirmationPopup = ({
  isOpen,
  title,
  message,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
  confirmButtonColor = "#3b82f6",
  cancelButtonColor = "#9ca3af",
}) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        {title && <h3 className="popup-title">{title}</h3>}
        <p className="popup-message">{message}</p>
        <div className="popup-buttons">
          <button
            className="popup-button-cancel"
            onClick={onCancel}
            style={{ borderColor: cancelButtonColor, color: cancelButtonColor }}
          >
            {cancelText}
          </button>
          <button
            className="popup-button-confirm"
            onClick={onConfirm}
            style={{ backgroundColor: confirmButtonColor }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
