import React from "react";
import { Bell } from "lucide-react";

const NotificationIcon = ({ count = 0, onClick }) => {
  const hasUnread = count > 0;

  // 숫자 나오도록 하는 부분 제거
  //
  //   return (
  //     <button
  //       onClick={onClick}
  //       style={{
  //         backgroundColor: "#dbeafe",
  //         padding: "0.5rem",
  //         borderRadius: "9999px",
  //         border: "none",
  //         cursor: "pointer",
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         width: "2.5rem",
  //         height: "2.5rem",
  //         position: "relative",
  //         // marginRight: "0.5rem",
  //       }}
  //     >
  //       <Bell size={20} color="#4b5563" />
  //       {count > 0 && (
  //         <span
  //           style={{
  //             position: "absolute",
  //             top: "0",
  //             right: "0",
  //             backgroundColor: "#ef4444",
  //             color: "white",
  //             fontSize: "0.75rem",
  //             width: "1.25rem",
  //             height: "1.25rem",
  //             borderRadius: "9999px",
  //             display: "flex",
  //             alignItems: "center",
  //             justifyContent: "center",
  //           }}
  //         >
  //           {count}
  //         </span>
  //       )}
  //     </button>
  //   );

  return (
    <button
      onClick={onClick}
      style={{
        // backgroundColor: "#dbeafe",
        backgroundColor: "white",
        padding: "0.5rem",
        borderRadius: "9999px",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "2.5rem",
        height: "2.5rem",
        position: "relative",
      }}
    >
      <Bell size={20} color="#4b5563" />
      {hasUnread && (
        <div
          style={{
            position: "absolute",
            top: "6px",
            right: "6px",
            width: "6px",
            height: "6px",
            backgroundColor: "#ef4444",
            borderRadius: "50%",
          }}
        />
      )}
    </button>
  );
};

export default NotificationIcon;
