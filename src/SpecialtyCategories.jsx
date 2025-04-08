import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Stethoscope,
  Bone,
  Brain,
  ChevronDown,
  ChevronUp,
  Microscope,
  Pill,
  Scissors,
  Eye,
  Ear,
  Baby,
  UserRound,
  Syringe,
  Smile,
  Activity,
  Wind,
  Clock,
  Leaf,
} from "lucide-react";
import "./SpecialtyCategories.css";
import { medicalSpecialties } from "./medicalCategoryData";

const SpecialtyCategories = ({ currentLocation, onExpandChange }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const expandedCategoriesRef = useRef(null);

  // Icon mapping for specialties
  const getSpecialtyIcon = (specialtyId) => {
    const iconMap = {
      internal: <Stethoscope size={24} strokeWidth={1.5} color="#3b82f6" />,
      surgery: <Scissors size={24} strokeWidth={1.5} color="#f43f5e" />,
      obgyn: <Baby size={24} strokeWidth={1.5} color="#ec4899" />,
      pediatrics: <Baby size={24} strokeWidth={1.5} color="#8b5cf6" />,
      neurology: <Brain size={24} strokeWidth={1.5} color="#6366f1" />,
      psychiatry: <Brain size={24} strokeWidth={1.5} color="#a855f7" />,
      orthopedics: <Bone size={24} strokeWidth={1.5} color="#2563eb" />,
      dermatology: <UserRound size={24} strokeWidth={1.5} color="#db2777" />,
      ophthalmology: <Eye size={24} strokeWidth={1.5} color="#0ea5e9" />,
      ent: <Ear size={24} strokeWidth={1.5} color="#f59e0b" />,
      urology: <Syringe size={24} strokeWidth={1.5} color="#4f46e5" />,
      dentistry: <Smile size={24} strokeWidth={1.5} color="#0d9488" />,
      rehabilitation: <Clock size={24} strokeWidth={1.5} color="#0891b2" />,
      family: <Heart size={24} strokeWidth={1.5} color="#f97316" />,
      oriental: <Leaf size={24} strokeWidth={1.5} color="#16a34a" />,
      cardiology: <Heart size={24} strokeWidth={1.5} color="#dc2626" />,
      gastroenterology: <Pill size={24} strokeWidth={1.5} color="#9333ea" />,
      pulmonology: <Wind size={24} strokeWidth={1.5} color="#4338ca" />,
      allergy: <Microscope size={24} strokeWidth={1.5} color="#15803d" />,
      endocrinology: <Activity size={24} strokeWidth={1.5} color="#7c3aed" />,
      plastic: <Smile size={24} strokeWidth={1.5} color="#be185d" />,
      pain: <Syringe size={24} strokeWidth={1.5} color="#b91c1c" />,
      default: <Stethoscope size={24} strokeWidth={1.5} color="#555555" />,
    };

    return iconMap[specialtyId] || iconMap.default;
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
        const container = document.querySelector(".content");
        if (container) {
          const rect = expandedCategoriesRef.current.getBoundingClientRect();
          const offset = rect.height + 20; // 추가 여백으로 20px 더함
          container.scrollBy({
            top: offset,
            behavior: "smooth",
          });
        } else {
          expandedCategoriesRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      }, 100);
    }
  }, [expanded]);

  // 진료과목 항목 클릭 핸들러
  const handleSpecialtyClick = (specialty) => {
    navigate("/categories", {
      state: {
        serviceType: "specialty",
        currentLocation: currentLocation,
        selectedSpecialty: specialty.id,
      },
    });
  };

  return (
    <div className="specialty-categories-container">
      <div className="specialty-categories">
        {/* Always show first 4 specialties */}
        {medicalSpecialties.slice(0, 4).map((specialty) => (
          <div
            key={specialty.id}
            className="specialty-category-item"
            onClick={() => handleSpecialtyClick(specialty)}
          >
            <div className="specialty-category-icon-wrapper">
              {getSpecialtyIcon(specialty.id)}
            </div>
            <span className="specialty-category-name">{specialty.label}</span>
          </div>
        ))}

        {/* Toggle button for expanding/collapsing */}
        <div className="specialty-category-item" onClick={toggleExpanded}>
          <div className="specialty-category-icon-wrapper">
            {expanded ? (
              <ChevronUp size={24} strokeWidth={1.5} color="#0d9488" />
            ) : (
              <ChevronDown size={24} strokeWidth={1.5} color="#0d9488" />
            )}
          </div>
          <span
            className="specialty-category-name"
            style={{ color: "#0d9488", fontWeight: "bold" }}
          >
            {expanded ? "닫기" : "과목 더보기"}
          </span>
        </div>
      </div>

      {/* Expanded container for additional specialties */}
      {expanded && (
        <div
          className="specialty-categories expanded-categories"
          ref={expandedCategoriesRef}
        >
          {medicalSpecialties.slice(4).map((specialty) => (
            <div
              key={specialty.id}
              className="specialty-category-item"
              onClick={() => handleSpecialtyClick(specialty)}
            >
              <div className="specialty-category-icon-wrapper">
                {getSpecialtyIcon(specialty.id)}
              </div>
              <span className="specialty-category-name">{specialty.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpecialtyCategories;
