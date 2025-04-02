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
  const focusAttempts = useRef(0);
  const maxFocusAttempts = 3;

  const navigate = useNavigate();

  // initialValue가 변경될 때 inputText 상태 업데이트
  useEffect(() => {
    setInputText(initialValue);
    previousInputText.current = initialValue;
  }, [initialValue]);

  // iOS Safari 감지
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isIOSSafari = isIOS && isSafari;

  // 키보드를 표시하기 위한 강화된 함수
  const showKeyboard = () => {
    if (!inputRef.current) return;

    if (isIOSSafari) {
      // iOS Safari에서의 키보드 강제 표시 기법
      // 1. 먼저 기존 포커스 제거
      document.activeElement && document.activeElement.blur();

      // 2. 약간의 지연 후 포커스 시도
      setTimeout(() => {
        // null 체크 추가
        if (!inputRef.current) return;

        // 2.1 직접 포커스 호출
        inputRef.current.focus();

        // 2.2 readOnly 속성을 토글하여 iOS가 포커스를 인식하도록 함
        inputRef.current.readOnly = true;

        setTimeout(() => {
          // null 체크 추가
          if (!inputRef.current) return;

          inputRef.current.readOnly = false;
          inputRef.current.focus();

          // 2.3 커서를 텍스트 끝으로 이동시켜 iOS 키보드를 트리거
          if (inputText) {
            const length = inputText.length;
            inputRef.current.setSelectionRange(length, length);
          }

          // 2.4 클릭 시뮬레이션
          inputRef.current.click();

          // 포커스가 성공했는지 확인
          setTimeout(() => {
            if (!inputRef.current) return;

            if (
              document.activeElement !== inputRef.current &&
              focusAttempts.current < maxFocusAttempts
            ) {
              focusAttempts.current++;
              showKeyboard(); // 재귀적 재시도
            }
          }, 300);
        }, 50);
      }, 100);
    } else {
      // 비 iOS 환경에서는 간단히 포커스
      inputRef.current.focus();
    }
  };

  // 컴포넌트 마운트 시 자동 포커스 및 키보드 표시
  useEffect(() => {
    let initialTimer;

    if (shouldAutoFocus || forceKeyboard) {
      // 초기 포커스 시도 - 컴포넌트가 완전히 마운트된 후에 실행
      initialTimer = setTimeout(() => {
        if (inputRef.current) {
          showKeyboard();
        }
      }, 500); // 타이머 시간 증가
    }

    return () => {
      if (initialTimer) {
        clearTimeout(initialTimer);
      }
      focusAttempts.current = 0; // 초기화
    };
  }, [shouldAutoFocus, forceKeyboard]);

  // 포커스 상태 변경 감지
  useEffect(() => {
    const checkFocus = () => {
      if (document.activeElement === inputRef.current) {
        setIsFocused(true);
      }
    };

    // 터치 이벤트 후 포커스 상태 확인
    document.addEventListener("touchend", checkFocus);

    return () => {
      document.removeEventListener("touchend", checkFocus);
    };
  }, []);

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

    // 텍스트 지운 후 포커스 유지 및 키보드 표시
    setTimeout(() => {
      if (inputRef.current) {
        showKeyboard();
      }
    }, 50);
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

        {/* focusable div wrapper - iOS Safari에서 큰 타겟 영역 제공 */}
        <div style={{ width: "100%", cursor: "text" }} onClick={showKeyboard}>
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
            onClick={(e) => {
              if (goSearch) {
                navigate("/search");
              }
            }}
          />
        </div>

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
