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
  // react-router-dom의 useLocation 훅을 사용하여 현재 페이지 경로 감지
  const location = useNavigate();
  const { pathname } = window.location;
  const isSearchPage = pathname.includes("/search");

  // 컴포넌트 마운트 시점에 한 번 더 확인 (하단 탭 네비게이션 대응)
  const [shouldFocus, setShouldFocus] = useState(false);

  useEffect(() => {
    // 현재 경로가 /search인지 다시 확인 (하단 탭 이동 후에도 작동)
    const checkIfSearchPage = () => {
      const currentPath = window.location.pathname;
      return currentPath.includes("/search");
    };

    setShouldFocus(checkIfSearchPage());
  }, []);
  const [inputText, setInputText] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const previousInputText = useRef(inputText);
  const dummyInputRef = useRef(null); // iOS Safari를 위한 더미 input

  const navigate = useNavigate();

  // initialValue가 변경될 때 inputText 상태 업데이트
  useEffect(() => {
    setInputText(initialValue);
    previousInputText.current = initialValue;
  }, [initialValue]);

  // iOS Safari에서 키보드 표시를 위한 핵심 트릭
  const focusInput = () => {
    // 작은 지연 후 실행
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  // 페이지 로드/마운트 시 키보드 포커싱
  useEffect(() => {
    // 검색 페이지에서만 자동 포커싱 적용 (여러 조건 통합)
    if (
      (shouldAutoFocus || forceKeyboard) &&
      (isSearchPage || !goSearch || shouldFocus)
    ) {
      // DOM이 완전히 렌더링된 후 실행되도록 타이밍 조정
      const timer = setTimeout(focusInput, 400); // 시간 약간 증가

      // 하단 탭으로 진입한 경우를 위한 두 번째 시도
      const secondAttemptTimer = setTimeout(focusInput, 800);

      return () => {
        clearTimeout(timer);
        clearTimeout(secondAttemptTimer);
      };
    }
  }, [shouldAutoFocus, forceKeyboard, goSearch, isSearchPage, shouldFocus]);

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

    // 텍스트 지운 후 포커스 유지
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 10);
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
      {/* iOS Safari를 위한 숨겨진 더미 input - 키보드 활성화용 */}
      <input
        ref={dummyInputRef}
        type="text"
        style={{
          position: "absolute",
          opacity: 0,
          height: 0,
          width: 0,
          pointerEvents: "none",
        }}
        tabIndex={-1}
      />

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
          autoFocus={isSearchPage || !goSearch || shouldFocus}
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
