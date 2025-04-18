import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { getHospitalImage } from "./App";
import "./PopularHospitalsCarousel.css";

const PopularHospitalsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const hospitals = [
    {
      id: 1,
      name: "서울 연세 내과",
      specialty: "심장내과 전문",
      rating: 4.8,
      reviewCount: 124,
      image: getHospitalImage("all", 1),
      tags: ["내과", "검진", "할인 이벤트"],
    },
    {
      id: 2,
      name: "미소성형외과",
      specialty: "눈매교정/안면윤곽 전문",
      rating: 4.9,
      reviewCount: 243,
      image: getHospitalImage("all", 2),
      tags: ["성형외과", "눈성형", "이벤트"],
    },
    {
      id: 3,
      name: "청각케어 이비인후과",
      specialty: "귀 질환/난청 전문",
      rating: 4.7,
      reviewCount: 132,
      image: getHospitalImage("all", 3),
      tags: ["이비인후과", "청력검사", "이명"],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % hospitals.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [hospitals.length]);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % hospitals.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + hospitals.length) % hospitals.length
    );
  };

  return (
    <div className="carousel-container">
      <div className="carousel-header">
        <h3 className="carousel-title">인기 병원</h3>
        <span className="carousel-view-all">모두 보기</span>
      </div>

      <div className="carousel-wrapper">
        <div className="carousel-slides">
          {hospitals.map((hospital, index) => (
            <div
              key={hospital.id}
              className="carousel-slide"
              style={{ opacity: index === activeIndex ? 1 : 0 }}
            >
              <img
                src={hospital.image}
                alt={hospital.name}
                className="slide-image"
              />
              <div className="slide-gradient"></div>
              <div className="slide-content">
                <h4 className="hospital-name">{hospital.name}</h4>
                <p className="hospital-specialty">{hospital.specialty}</p>
                <div className="rating-container">
                  <Star className="star-icon" />
                  <span className="rating-value">{hospital.rating}</span>
                  <span className="review-count">({hospital.reviewCount})</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={prevSlide} className="carousel-button prev-button">
          <ChevronLeft className="button-icon" />
        </button>

        <button onClick={nextSlide} className="carousel-button next-button">
          <ChevronRight className="button-icon" />
        </button>

        <div className="indicators">
          {hospitals.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`indicator ${
                index === activeIndex ? "indicator-active" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularHospitalsCarousel;
