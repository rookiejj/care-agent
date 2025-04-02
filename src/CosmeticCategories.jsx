import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Scissors,
  Eye,
  Smile,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Heart,
  Brush,
  Dumbbell,
  UserRound,
  Zap,
  Gem,
} from "lucide-react";
import "./CosmeticCategories.css";
import { mainCosmeticCategories } from "./cosmeticCategoryData";

const CosmeticCategories = ({ currentLocation, onExpandChange }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const expandedCategoriesRef = useRef(null);

  // Icon mapping for cosmetic categories
  const getCategoryIcon = (categoryId) => {
    const iconMap = {
      skin: <Brush size={24} strokeWidth={1.5} color="#FF96AD" />,
      face: <Smile size={24} strokeWidth={1.5} color="#B388EB" />,
      body: <Dumbbell size={24} strokeWidth={1.5} color="#44BBA4" />,
      hair: <Scissors size={24} strokeWidth={1.5} color="#3A86FF" />,
      antiaging: <Sparkles size={24} strokeWidth={1.5} color="#FB8379" />,
      dental: <Gem size={24} strokeWidth={1.5} color="#8BD3DD" />,
      injectable: <Zap size={24} strokeWidth={1.5} color="#E07BE0" />,
      lip: <Heart size={24} strokeWidth={1.5} color="#FF6B6B" />,
      scar: <Brush size={24} strokeWidth={1.5} color="#6BCB77" />,
      eyebrow: <Eye size={24} strokeWidth={1.5} color="#FFA69E" />,
      laser: <Zap size={24} strokeWidth={1.5} color="#4D96FF" />,
      weight: <UserRound size={24} strokeWidth={1.5} color="#59A96A" />,
      default: <Sparkles size={24} strokeWidth={1.5} color="#555555" />,
    };

    return iconMap[categoryId] || iconMap.default;
  };

  // Toggle the expanded state and notify parent component
  const toggleExpanded = () => {
    const newExpandedState = !expanded;
    setExpanded(newExpandedState);

    // 부모 컴포넌트에게 상태 변경 알림
    if (onExpandChange) {
      onExpandChange(newExpandedState);
    }
  };

  // Use useEffect to scroll to the expanded categories when they appear
  useEffect(() => {
    if (expanded && expandedCategoriesRef.current) {
      // Add a small delay to ensure the DOM has updated
      setTimeout(() => {
        // Scroll to the expanded categories smoothly
        expandedCategoriesRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 100);
    }
  }, [expanded]);

  return (
    <div className="cosmetic-categories-container">
      <div className="cosmetic-categories">
        {/* Always show first 4 categories */}
        {mainCosmeticCategories.slice(0, 4).map((category) => (
          <div
            key={category.id}
            className="cosmetic-category-item"
            onClick={() => {
              // Navigate to categories page with the selected category
              navigate("/categories", {
                state: {
                  serviceType: "cosmetic",
                  currentLocation: currentLocation,
                  selectedCategory: category.id,
                },
              });
            }}
          >
            <div className="cosmetic-category-icon-wrapper">
              {getCategoryIcon(category.id)}
            </div>
            <span className="cosmetic-category-name">{category.label}</span>
          </div>
        ))}

        {/* Toggle button for expanding/collapsing */}
        <div className="cosmetic-category-item" onClick={toggleExpanded}>
          <div className="cosmetic-category-icon-wrapper">
            {expanded ? (
              <ChevronUp size={24} strokeWidth={1.5} color="#0369a1" />
            ) : (
              <ChevronDown size={24} strokeWidth={1.5} color="#0369a1" />
            )}
          </div>
          <span
            className="cosmetic-category-name"
            style={{ color: "#c5587d", fontWeight: "bold" }}
          >
            {expanded ? "닫기" : "부위 더보기"}
          </span>
        </div>
      </div>

      {/* Expanded container for additional categories */}
      {expanded && (
        <div
          className="cosmetic-categories expanded-categories"
          ref={expandedCategoriesRef}
        >
          {mainCosmeticCategories.slice(4).map((category) => (
            <div
              key={category.id}
              className="cosmetic-category-item"
              onClick={() => {
                // Navigate to categories page with the selected category
                navigate("/categories", {
                  state: {
                    serviceType: "cosmetic",
                    currentLocation: currentLocation,
                    selectedCategory: category.id,
                  },
                });
              }}
            >
              <div className="cosmetic-category-icon-wrapper">
                {getCategoryIcon(category.id)}
              </div>
              <span className="cosmetic-category-name">{category.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CosmeticCategories;
