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
  forceKeyboard = false, // 키보드 강제 표시 여부
}) => {
  const [inputText, setInputText] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const previousInputText = useRef(inputText);

  const navigate = useNavigate();

  // 사파리 및 iOS 감지
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  // 키보드를 표시하기 위한 함수
  const showKeyboard = () => {
    if (!inputRef.current) return;

    // 표준 방식으로 포커스
    inputRef.current.focus();

    if (isIOS) {
      // iOS에서 키보드를 강제로 표시하기 위한 방법
      // 1. blur 후 다시 focus
      inputRef.current.blur();

      setTimeout(() => {
        inputRef.current.focus();

        // 2. 터치 이벤트 시뮬레이션 (iOS에서 가장 효과적)
        setTimeout(() => {
          try {
            const touchEvent = new TouchEvent("touchstart", {
              bubbles: true,
              cancelable: true,
              view: window,
            });
            inputRef.current.dispatchEvent(touchEvent);
          } catch (e) {
            // TouchEvent 생성자가 지원되지 않을 경우 MouseEvent로 대체
            const clickEvent = new MouseEvent("mousedown", {
              bubbles: true,
              cancelable: true,
              view: window,
            });
            inputRef.current.dispatchEvent(clickEvent);
          }

          // 3. 입력 영역 클릭 (마지막 시도)
          setTimeout(() => {
            inputRef.current.click();
          }, 50);
        }, 50);
      }, 50);
    } else {
      // 비 iOS 환경에서 클릭 시뮬레이션
      inputRef.current.click();
    }
  };

  // 컴포넌트가 마운트될 때 자동으로 포커스 설정
  useEffect(() => {
    if (shouldAutoFocus || forceKeyboard) {
      // 더 긴 지연 시간 설정 (페이지 전환 완료 기다림)
      const timer = setTimeout(showKeyboard, 600);
      return () => clearTimeout(timer);
    }
  }, [shouldAutoFocus, forceKeyboard]); // 의존성 업데이트

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
