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
  forceKeyboard = false,
}) => {
  const [inputText, setInputText] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const previousInputText = useRef(inputText);
  const focusAttempted = useRef(false);

  const navigate = useNavigate();

  // initialValue가 변경될 때 inputText 상태 업데이트
  useEffect(() => {
    setInputText(initialValue);
    previousInputText.current = initialValue;
  }, [initialValue]);

  useEffect(() => {
    // Skip focus if we're in search mode (main page) and not forcing keyboard
    if (goSearch && !forceKeyboard) return;

    // Mark that we've attempted to focus
    focusAttempted.current = true;

    // Use multiple timers with different delays for better iOS compatibility
    const timers = [];

    const attemptFocus = () => {
      if (inputRef.current) {
        inputRef.current.focus();

        // For iOS, create and dispatch a fake touch event to help show keyboard
        try {
          const touchEvent = new TouchEvent("touchstart", {
            bubbles: true,
            cancelable: true,
            view: window,
          });
          inputRef.current.dispatchEvent(touchEvent);
          inputRef.current.click();
        } catch (e) {
          // Fallback for browsers that don't support TouchEvent constructor
          inputRef.current.click();
        }
      }
    };

    // Multiple attempts with increasing delays
    timers.push(setTimeout(attemptFocus, 50));
    timers.push(setTimeout(attemptFocus, 200));
    timers.push(setTimeout(attemptFocus, 500));

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [shouldAutoFocus, forceKeyboard, goSearch]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputText(newValue);

    if (newValue === "" && onSearch) {
      onSearch("");
      previousInputText.current = "";
    }
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(inputText);
    }
    previousInputText.current = inputText;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleClear = () => {
    setInputText("");
    if (onSearch) {
      onSearch("");
    }
    previousInputText.current = "";

    // 텍스트 지운 후 포커스 유지 - 단일 타이머만 사용
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (previousInputText.current !== inputText && onSearch) {
      onSearch(inputText);
      previousInputText.current = inputText;
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  // 전체 검색 영역 클릭 핸들러
  const handleSearchAreaClick = () => {
    if (goSearch) {
      navigate("/search");
      return;
    }

    if (inputRef.current) {
      inputRef.current.focus();
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
        onClick={handleSearchAreaClick}
      >
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
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
          autoFocus={true}
        />

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
