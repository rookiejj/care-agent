import { useNavigate, useLocation } from "react-router-dom";

import { Heart, Baby, Bone, Brain, GripHorizontal } from "lucide-react";
import "./MedicalCategories.css";

const MedicalCategories = ({ currentLocation }) => {
  const navigate = useNavigate();

  // 카테고리 데이터
  const categories = [
    {
      id: 1,
      name: "심장내과",
      icon: <Heart size={24} strokeWidth={1.5} color="#FF6B6B" />,
    },
    {
      id: 2,
      name: "소아과",
      icon: <Baby size={24} strokeWidth={1.5} color="#4D96FF" />,
    },
    {
      id: 3,
      name: "정형외과",
      icon: <Bone size={24} strokeWidth={1.5} color="#6BCB77" />,
    },
    {
      id: 4,
      name: "신경과",
      icon: <Brain size={24} strokeWidth={1.5} color="#9D65C9" />,
    },
    {
      id: 5,
      name: "진료 더보기",
      icon: <GripHorizontal size={24} strokeWidth={1.5} color="#555555" />,
      onClick: () =>
        navigate("/categories", {
          state: {
            serviceType: "medical",
            currentLocation: currentLocation,
          },
        }),
    },
  ];

  return (
    <div className="medical-categories-container">
      <div className="medical-categories">
        {categories.map((category) => (
          <div
            key={category.id}
            className="medical-category-item"
            onClick={category.onClick}
          >
            <div className="medical-category-icon-wrapper">{category.icon}</div>
            <span className="medical-category-name">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalCategories;
