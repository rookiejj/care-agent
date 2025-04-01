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
  provideInputRef = null, // 새 prop: 부모 컴포넌트에 ref 전달
}) => {
  const [inputText, setInputText] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const previousInputText = useRef(inputText);

  const navigate = useNavigate();

  // 부모 컴포넌트에 ref 전달
  useEffect(() => {
    if (provideInputRef && inputRef.current) {
      provideInputRef(inputRef.current);
    }
  }, [provideInputRef]);

  // 컴포넌트가 마운트될 때 자동으로 포커스 설정 시도
  useEffect(() => {
    // iOS와 Safari 감지
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (shouldAutoFocus && inputRef.current) {
      const timer = setTimeout(() => {
        // 포커스 시도
        inputRef.current.focus();

        // iOS Safari에서는 추가 시도 없음 - 페이지 이동 시 자동 키보드 표시는
        // 사용자 상호작용 없이는 iOS에서 거의 불가능하므로
        // 대신 시각적 힌트를 제공하는 것이 좋음
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [shouldAutoFocus]);

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
      onSearch(inputText);
    }
    previousInputText.current = inputText;
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  // Clear input and reset search results
  const handleClear = () => {
    setInputText("");
    if (onSearch) {
      onSearch("");
    }
    previousInputText.current = "";

    // 입력을 지운 후 다시 포커스
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // 포커스를 잃을 때 텍스트가 변경되었다면 검색 실행
  const handleBlur = () => {
    setIsFocused(false);
    if (previousInputText.current !== inputText && onSearch) {
      onSearch(inputText);
      previousInputText.current = inputText;
    }
  };

  // 검색창 클릭 시 동작
  const handleInputClick = () => {
    if (goSearch) {
      navigate("/search");
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
          <Search size={18} strokeWidth={2} />
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
          onClick={handleInputClick}
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
