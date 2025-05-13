// components/admin/ExportButton.jsx
// 재사용 가능한 내보내기 버튼 컴포넌트

import React, { useState, useRef, useEffect } from "react";
import { Download, FileText, Table } from "lucide-react";
import { exportToCSV, exportToExcel } from "../../utils/exportUtils";
import "./ExportButton.css";

/**
 * 재사용 가능한 내보내기 버튼 컴포넌트
 * @param {Object} props
 * @param {Array} props.data - 내보낼 데이터 배열
 * @param {String} props.filename - 기본 파일명 (확장자 제외)
 * @param {String} props.sheetName - Excel 시트 이름
 * @param {Object} props.customButtons - 사용자 정의 내보내기 버튼 목록 (선택사항)
 */
const ExportButton = ({
  data = [],
  filename = "exported_data",
  sheetName = "Sheet1",
  customButtons = null,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);

  // 외부 클릭 감지하여 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 내보내기 옵션 토글
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  // CSV 내보내기 핸들러
  const handleExportCSV = () => {
    exportToCSV(data, filename);
    setShowOptions(false);
  };

  // Excel 내보내기 핸들러
  const handleExportExcel = () => {
    exportToExcel(data, filename, sheetName);
    setShowOptions(false);
  };

  // 데이터가 없는 경우 비활성화
  const isDisabled = !data || data.length === 0;

  return (
    <div className="admin-export-dropdown" ref={dropdownRef}>
      <button
        className={`admin-button admin-button-secondary ${
          isDisabled ? "disabled" : ""
        }`}
        type="button"
        onClick={toggleOptions}
        disabled={isDisabled}
      >
        <Download size={16} />
        내보내기
      </button>

      {showOptions && (
        <div className="admin-export-options">
          <button className="admin-export-option" onClick={handleExportCSV}>
            <Table size={16} />
            CSV 파일로 내보내기
          </button>
          <button className="admin-export-option" onClick={handleExportExcel}>
            <FileText size={16} />
            Excel 파일로 내보내기
          </button>

          {/* 사용자 정의 버튼이 있는 경우 렌더링 */}
          {customButtons &&
            Object.entries(customButtons).map(
              ([key, { icon, label, handler }]) => (
                <button
                  key={key}
                  className="admin-export-option"
                  onClick={() => {
                    handler(data);
                    setShowOptions(false);
                  }}
                >
                  {icon}
                  {label}
                </button>
              )
            )}
        </div>
      )}
    </div>
  );
};

export default ExportButton;
