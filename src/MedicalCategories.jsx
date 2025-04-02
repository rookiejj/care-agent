import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Baby,
  Bone,
  Brain,
  ChevronDown,
  ChevronUp,
  Thermometer,
  Pill,
  Wind,
  Eye,
  Ear,
  Clipboard,
  UserRound,
  Sun,
  Bed,
} from "lucide-react";
import "./MedicalCategories.css";
import { mainCategories } from "./medicalCategoryData";

const MedicalCategories = ({ currentLocation }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const expandedCategoriesRef = useRef(null);

  // Icon mapping for categories
  const getCategoryIcon = (categoryId) => {
    const iconMap = {
      head: <Brain size={24} strokeWidth={1.5} color="#9D65C9" />,
      cold: <Wind size={24} strokeWidth={1.5} color="#FF6B6B" />,
      stomach: <Pill size={24} strokeWidth={1.5} color="#FDA65D" />,
      skin: <UserRound size={24} strokeWidth={1.5} color="#FF9D7B" />,
      joint: <Bone size={24} strokeWidth={1.5} color="#6BCB77" />,
      chest: <Heart size={24} strokeWidth={1.5} color="#FF5A5A" />,
      sleep: <Bed size={24} strokeWidth={1.5} color="#6495ED" />,
      eye: <Eye size={24} strokeWidth={1.5} color="#4D96FF" />,
      ear: <Ear size={24} strokeWidth={1.5} color="#BB86FC" />,
      mental: <Clipboard size={24} strokeWidth={1.5} color="#9C7BFF" />,
      allergy: <Sun size={24} strokeWidth={1.5} color="#FFB74D" />,
      fever: <Thermometer size={24} strokeWidth={1.5} color="#F06292" />,
      default: <Pill size={24} strokeWidth={1.5} color="#555555" />,
    };

    return iconMap[categoryId] || iconMap.default;
  };

  // Toggle the expanded state
  const toggleExpanded = () => {
    setExpanded(!expanded);
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
    <div className="medical-categories-container">
      <div className="medical-categories">
        {/* Always show first 4 categories */}
        {mainCategories.slice(0, 4).map((category) => (
          <div
            key={category.id}
            className="medical-category-item"
            onClick={() => {
              // Navigate to categories page with the selected category
              navigate("/categories", {
                state: {
                  serviceType: "medical",
                  currentLocation: currentLocation,
                  selectedCategory: category.id,
                },
              });
            }}
          >
            <div className="medical-category-icon-wrapper">
              {getCategoryIcon(category.id)}
            </div>
            <span className="medical-category-name">{category.label}</span>
          </div>
        ))}

        {/* Toggle button for expanding/collapsing */}
        <div className="medical-category-item" onClick={toggleExpanded}>
          <div className="medical-category-icon-wrapper">
            {expanded ? (
              <ChevronUp size={24} strokeWidth={1.5} color="#0369a1" />
            ) : (
              <ChevronDown size={24} strokeWidth={1.5} color="#0369a1" />
            )}
          </div>
          <span
            className="medical-category-name"
            style={{ color: "#0369a1", fontWeight: "bold" }}
          >
            {expanded ? "닫기" : "증상 더보기"}
          </span>
        </div>
      </div>

      {/* Expanded container for additional categories */}
      {expanded && (
        <div
          className="medical-categories expanded-categories"
          ref={expandedCategoriesRef}
        >
          {mainCategories.slice(4).map((category) => (
            <div
              key={category.id}
              className="medical-category-item"
              onClick={() => {
                // Navigate to categories page with the selected category
                navigate("/categories", {
                  state: {
                    serviceType: "medical",
                    currentLocation: currentLocation,
                    selectedCategory: category.id,
                  },
                });
              }}
            >
              <div className="medical-category-icon-wrapper">
                {getCategoryIcon(category.id)}
              </div>
              <span className="medical-category-name">{category.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalCategories;
