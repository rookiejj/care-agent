import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SwipeableLayout.css";

const SwipeableLayout = ({ children, bottomNav }) => {
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const [startX, setStartX] = useState(null);
  const [currentX, setCurrentX] = useState(null);

  // 스와이프 감지 및 처리
  const handleTouchStart = (e) => {
    // 화면 왼쪽 가장자리에서 시작된 경우만 처리 (20px 이내)
    if (e.touches[0].clientX <= 20) {
      setStartX(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e) => {
    // 시작점이 설정된 경우에만 처리
    if (startX !== null) {
      const x = e.touches[0].clientX;
      setCurrentX(x);

      // 오른쪽으로 스와이프할 때만 이동 (왼쪽으로 스와이프는 무시)
      if (x > startX) {
        const moveDistance = x - startX;
        // 스와이프 거리에 감쇠 적용 (저항감 표현)
        const dampenedDistance = Math.min(
          moveDistance * 0.8,
          window.innerWidth * 0.6
        );

        if (contentRef.current) {
          contentRef.current.style.transform = `translateX(${dampenedDistance}px)`;
        }
      }
    }
  };

  const handleTouchEnd = () => {
    // 스와이프가 발생했을 때만 처리
    if (startX !== null && currentX !== null) {
      const moveDistance = currentX - startX;

      if (contentRef.current) {
        // 충분한 거리를 스와이프했으면 뒤로 가기
        if (moveDistance > window.innerWidth * 0.3) {
          contentRef.current.style.transform = `translateX(${window.innerWidth}px)`;
          contentRef.current.style.transition = "transform 0.3s ease-out";

          // 애니메이션 후 뒤로가기 실행
          setTimeout(() => {
            navigate(-1);
          }, 300);
        } else {
          // 불충분한 스와이프는 원위치
          contentRef.current.style.transform = "translateX(0)";
          contentRef.current.style.transition = "transform 0.3s ease-out";
        }

        // 트랜지션 완료 후 스타일 초기화
        setTimeout(() => {
          if (contentRef.current) {
            contentRef.current.style.transition = "";
            if (moveDistance <= window.innerWidth * 0.3) {
              contentRef.current.style.transform = "";
            }
          }
        }, 300);
      }
    }

    // 상태 초기화
    setStartX(null);
    setCurrentX(null);
  };

  // 컴포넌트 언마운트 시 리스너 정리
  useEffect(() => {
    return () => {
      setStartX(null);
      setCurrentX(null);
    };
  }, []);

  return (
    <div className="swipeable-container">
      <div
        ref={contentRef}
        className="swipeable-content"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
      <div className="fixed-bottom-nav">{bottomNav}</div>
    </div>
  );
};

export default SwipeableLayout;
