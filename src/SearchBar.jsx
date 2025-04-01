import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Search } from "lucide-react";

const SearchBar = ({
  placeholder,
  onSearch,
  initialValue = "",
  style = {},
  inputStyle = {},
  iconStyle = {},
  goSearch = false,
  shouldAutoFocus = true,
}) => {
  const [inputText, setInputText] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const previousInputText = useRef(inputText);

  const navigate = useNavigate();

  // 컴포넌트가 마운트될 때 자동으로 포커스 설정
  useEffect(() => {
    // 약간의 지연 후 포커스 (이동 애니메이션이 완료될 때까지 기다림)
    const timer = setTimeout(() => {
      if (shouldAutoFocus && inputRef.current) {
        inputRef.current.focus();

        // 모바일에서 키보드를 강제로 표시하기 위한 추가 조치
        inputRef.current.click(); // 클릭 이벤트 발생

        // iOS Safari에서 키보드를 표시하기 위한 추가 조치
        if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
          inputRef.current.blur();
          setTimeout(() => {
            inputRef.current.focus();
          }, 50);
        }
      }
    }, 300); // 시간을 300ms로 증가하여 페이지 전환 후 포커스되도록 함

    return () => clearTimeout(timer);
  }, [shouldAutoFocus]); // shouldAutoFocus가 변경될 때마다 실행되도록 수정

  // initialValue가 변경되면 input 값도 업데이트
  useEffect(() => {
    setInputText(initialValue);
    previousInputText.current = initialValue;
  }, [initialValue]);

  // Simple direct state update
  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  // Handle search button click
  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(inputText); // 항상 검색 함수 호출, 빈 값이어도 호출
    }
    previousInputText.current = inputText;
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick(); // 항상 검색 함수 호출
    }
  };

  // Clear input and reset search results
  const handleClear = () => {
    setInputText("");
    if (onSearch) {
      onSearch(""); // 빈 문자열로 검색 함수 호출하여 초기 상태로 돌아가게 함
    }
    previousInputText.current = "";
  };

  // 포커스를 잃을 때 텍스트가 변경되었다면 검색 실행
  const handleBlur = () => {
    setIsFocused(false);
    if (previousInputText.current !== inputText && onSearch) {
      onSearch(inputText);
      previousInputText.current = inputText;
    }
  };

  return (
    <div style={{ flex: "1", marginBottom: "1rem", ...style }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: isFocused ? "#ffffff" : "#f3f4f6",
          padding: "0 12px",
          borderRadius: "100px",
          border: isFocused ? "1px solid #3b82f6" : "1px solid #e5e7eb",
          boxShadow: isFocused
            ? "0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06)"
            : "none",
          transition: "all 0.2s ease",
        }}
      >
        {/* Search Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px 4px 8px 0",
            color: isFocused ? "#3b82f6" : "#9ca3af",
            transition: "color 0.2s ease",
            ...iconStyle,
          }}
        >
          {/* <Search size={18} strokeWidth={2} /> */}
        </div>

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          placeholder={placeholder || "증상이나 서비스를 검색하세요"}
          style={{
            border: "none",
            backgroundColor: "transparent",
            outline: "none",
            width: "100%",
            padding: "10px 8px",
            fontSize: "14px",
            color: "#1f2937",
            fontWeight: "500",
            ...inputStyle,
          }}
          onClick={(e) => {
            if (goSearch) {
              navigate("/search");
            }
          }}
        />

        {/* Clear Button - Only show when there's text */}
        {inputText && (
          <button
            onClick={handleClear}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#e5e7eb",
              color: "#6b7280",
              border: "none",
              borderRadius: "50%",
              minWidth: "28px",
              minHeight: "28px",
              width: "28px",
              height: "28px",
              flexShrink: 0,
              padding: 0,
              cursor: "pointer",
              transition: "all 0.2s ease",
              marginRight: "8px",
              boxSizing: "border-box",
            }}
            aria-label="clear"
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        )}

        {/* Search Button */}
        <button
          onClick={handleSearchClick}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: inputText.trim() ? "#3b82f6" : "#e5e7eb",
            color: inputText.trim() ? "white" : "#9ca3af",
            border: "none",
            borderRadius: "50%",
            minWidth: "28px",
            minHeight: "28px",
            width: "28px",
            height: "28px",
            flexShrink: 0,
            padding: "0",
            marginLeft: "4px",
            cursor: inputText.trim() ? "pointer" : "not-allowed",
            transition: "all 0.2s ease",
            boxSizing: "border-box",
          }}
          aria-label="search"
        >
          <Search size={15} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
