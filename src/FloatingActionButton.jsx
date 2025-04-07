import React from "react";
import { PenLine } from "lucide-react";
import "./FloatingActionButton.css";

const FloatingActionButton = ({ onClick }) => {
  return (
    <button
      className="floating-action-button"
      onClick={onClick}
      aria-label="글쓰기"
    >
      <PenLine size={22} strokeWidth={1.5} />
    </button>
  );
};

export default FloatingActionButton;
