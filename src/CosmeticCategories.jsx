import { useNavigate, useLocation } from "react-router-dom";

import { Scissors, Eye, Smile, Sparkles, GripHorizontal } from "lucide-react";
import "./CosmeticCategories.css";

const CosmeticCategories = ({ currentLocation }) => {
  const navigate = useNavigate();

  // 성형 카테고리 데이터
  const categories = [
    {
      id: 1,
      name: "눈 성형",
      icon: <Eye size={24} strokeWidth={1.5} color="#FF96AD" />,
    },
    {
      id: 2,
      name: "입술 필러",
      icon: <Sparkles size={24} strokeWidth={1.5} color="#FB8379" />,
    },
    {
      id: 3,
      name: "안면 윤곽",
      icon: <Smile size={24} strokeWidth={1.5} color="#B388EB" />,
    },
    {
      id: 4,
      name: "모발 이식",
      icon: <Scissors size={24} strokeWidth={1.5} color="#44BBA4" />,
    },
    {
      id: 5,
      name: "시술 더보기",
      icon: <GripHorizontal size={24} strokeWidth={1.5} color="#555555" />,
      onClick: () =>
        navigate("/categories", {
          state: {
            serviceType: "cosmetic",
            currentLocation: currentLocation,
          },
        }),
    },
  ];

  return (
    <div className="cosmetic-categories-container">
      <div className="cosmetic-categories">
        {categories.map((category) => (
          <div
            key={category.id}
            className="cosmetic-category-item"
            onClick={category.onClick}
          >
            <div className="cosmetic-category-icon-wrapper">
              {category.icon}
            </div>
            <span className="cosmetic-category-name">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CosmeticCategories;
