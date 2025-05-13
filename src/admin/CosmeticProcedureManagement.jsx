import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  Clock,
  Scissors,
  Star,
  Camera,
  Tag,
} from "lucide-react";
import "./CosmeticProcedureManagement.css";
import ProcedureModal from "./components/ProcedureModal";

const CosmeticProcedureManagement = () => {
  const [procedures, setProcedures] = useState([]);
  const [filteredProcedures, setFilteredProcedures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProcedure, setSelectedProcedure] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    category: "all",
    priceRange: "all",
    popularity: "all",
    hasPromotion: false,
  });

  // 페이지네이션 설정
  const proceduresPerPage = 10;

  useEffect(() => {
    // 실제 앱에서는 API 호출을 통해 시술 데이터를 가져옴
    // 여기서는 목업 데이터 사용
    const generateMockProcedures = () => {
      const mockProcedures = [];

      // 시술 카테고리 정의
      const categories = [
        { id: "face", name: "안면 성형" },
        { id: "nose", name: "코 성형" },
        { id: "eye", name: "눈 성형" },
        { id: "liposuction", name: "지방 흡입" },
        { id: "lipofilling", name: "지방 이식" },
        { id: "breast", name: "가슴 성형" },
        { id: "antiaging", name: "안티에이징" },
        { id: "botox", name: "보톡스" },
        { id: "filler", name: "필러" },
        { id: "laser", name: "레이저 시술" },
        { id: "skincare", name: "피부 관리" },
        { id: "hairtrans", name: "모발 이식" },
        { id: "lifting", name: "리프팅" },
        { id: "contour", name: "윤곽 성형" },
        { id: "petite", name: "쁘띠 성형" },
      ];

      // 시술 상세 항목 정의
      const procedureItems = [
        // 안면 성형
        {
          name: "안면거상술(페이스리프팅)",
          category: "face",
          price: 8000000,
          duration: 120,
          popularity: 4.2,
        },
        {
          name: "이마거상술",
          category: "face",
          price: 4500000,
          duration: 90,
          popularity: 3.8,
        },
        {
          name: "광대축소술",
          category: "face",
          price: 3500000,
          duration: 60,
          popularity: 4.5,
        },
        {
          name: "사각턱 축소술",
          category: "face",
          price: 4000000,
          duration: 90,
          popularity: 4.7,
        },

        // 코 성형
        {
          name: "코 필러",
          category: "nose",
          price: 350000,
          duration: 30,
          popularity: 4.8,
        },
        {
          name: "코 재수술",
          category: "nose",
          price: 5500000,
          duration: 120,
          popularity: 4.3,
        },
        {
          name: "콧대높임(실리콘)",
          category: "nose",
          price: 2500000,
          duration: 60,
          popularity: 4.6,
        },
        {
          name: "콧대높임(자가연골)",
          category: "nose",
          price: 4500000,
          duration: 90,
          popularity: 4.9,
        },
        {
          name: "비중격 교정",
          category: "nose",
          price: 3000000,
          duration: 90,
          popularity: 4.0,
        },

        // 눈 성형
        {
          name: "쌍꺼풀 수술",
          category: "eye",
          price: 1800000,
          duration: 60,
          popularity: 4.7,
        },
        {
          name: "눈매교정",
          category: "eye",
          price: 2200000,
          duration: 90,
          popularity: 4.5,
        },
        {
          name: "안검하수 교정",
          category: "eye",
          price: 2500000,
          duration: 90,
          popularity: 4.2,
        },
        {
          name: "눈밑지방 재배치",
          category: "eye",
          price: 2000000,
          duration: 60,
          popularity: 4.4,
        },

        // 지방 흡입
        {
          name: "복부 지방흡입",
          category: "liposuction",
          price: 5000000,
          duration: 120,
          popularity: 4.6,
        },
        {
          name: "팔 지방흡입",
          category: "liposuction",
          price: 3500000,
          duration: 90,
          popularity: 4.1,
        },
        {
          name: "허벅지 지방흡입",
          category: "liposuction",
          price: 4500000,
          duration: 120,
          popularity: 4.3,
        },
        {
          name: "종아리 지방흡입",
          category: "liposuction",
          price: 3800000,
          duration: 90,
          popularity: 4.0,
        },

        // 지방 이식
        {
          name: "얼굴 지방이식",
          category: "lipofilling",
          price: 2500000,
          duration: 90,
          popularity: 4.4,
        },
        {
          name: "가슴 지방이식",
          category: "lipofilling",
          price: 6000000,
          duration: 180,
          popularity: 4.2,
        },

        // 가슴 성형
        {
          name: "가슴 확대(보형물)",
          category: "breast",
          price: 7000000,
          duration: 120,
          popularity: 4.8,
        },
        {
          name: "가슴 축소",
          category: "breast",
          price: 8000000,
          duration: 180,
          popularity: 4.3,
        },
        {
          name: "가슴 리프팅",
          category: "breast",
          price: 6500000,
          duration: 150,
          popularity: 4.5,
        },

        // 안티에이징
        {
          name: "프락셀 레이저",
          category: "antiaging",
          price: 450000,
          duration: 45,
          popularity: 4.7,
        },
        {
          name: "울쎄라",
          category: "antiaging",
          price: 2500000,
          duration: 60,
          popularity: 4.6,
        },
        {
          name: "써마지",
          category: "antiaging",
          price: 2000000,
          duration: 60,
          popularity: 4.5,
        },

        // 보톡스
        {
          name: "미간 보톡스",
          category: "botox",
          price: 250000,
          duration: 15,
          popularity: 4.9,
        },
        {
          name: "이마 보톡스",
          category: "botox",
          price: 300000,
          duration: 15,
          popularity: 4.8,
        },
        {
          name: "턱 보톡스",
          category: "botox",
          price: 350000,
          duration: 15,
          popularity: 4.7,
        },
        {
          name: "종아리 보톡스",
          category: "botox",
          price: 600000,
          duration: 30,
          popularity: 4.4,
        },

        // 필러
        {
          name: "입술 필러",
          category: "filler",
          price: 450000,
          duration: 30,
          popularity: 4.8,
        },
        {
          name: "팔자 필러",
          category: "filler",
          price: 550000,
          duration: 30,
          popularity: 4.9,
        },
        {
          name: "이마 필러",
          category: "filler",
          price: 500000,
          duration: 30,
          popularity: 4.7,
        },

        // 레이저 시술
        {
          name: "레이저 토닝",
          category: "laser",
          price: 200000,
          duration: 30,
          popularity: 4.8,
        },
        {
          name: "CO2 레이저",
          category: "laser",
          price: 350000,
          duration: 45,
          popularity: 4.6,
        },
        {
          name: "색소 레이저",
          category: "laser",
          price: 300000,
          duration: 30,
          popularity: 4.5,
        },

        // 피부 관리
        {
          name: "아쿠아필",
          category: "skincare",
          price: 150000,
          duration: 60,
          popularity: 4.7,
        },
        {
          name: "스킨부스터",
          category: "skincare",
          price: 250000,
          duration: 45,
          popularity: 4.6,
        },
        {
          name: "진정 관리",
          category: "skincare",
          price: 180000,
          duration: 60,
          popularity: 4.5,
        },

        // 모발 이식
        {
          name: "자가모발이식",
          category: "hairtrans",
          price: 5000000,
          duration: 240,
          popularity: 4.7,
        },
        {
          name: "앞머리 모발이식",
          category: "hairtrans",
          price: 3500000,
          duration: 180,
          popularity: 4.5,
        },

        // 리프팅
        {
          name: "실리프팅",
          category: "lifting",
          price: 1500000,
          duration: 60,
          popularity: 4.7,
        },
        {
          name: "미니 리프팅",
          category: "lifting",
          price: 3500000,
          duration: 90,
          popularity: 4.5,
        },

        // 윤곽 성형
        {
          name: "V라인 성형",
          category: "contour",
          price: 4500000,
          duration: 120,
          popularity: 4.7,
        },
        {
          name: "안면윤곽 3종",
          category: "contour",
          price: 9000000,
          duration: 180,
          popularity: 4.8,
        },

        // 쁘띠 성형
        {
          name: "돌출 필러",
          category: "petite",
          price: 450000,
          duration: 30,
          popularity: 4.6,
        },
        {
          name: "입꼬리 필러",
          category: "petite",
          price: 350000,
          duration: 30,
          popularity: 4.5,
        },
      ];

      // 목업 데이터 생성
      procedureItems.forEach((item, index) => {
        const categoryObj = categories.find((cat) => cat.id === item.category);
        const hasBeforeAfterImages = Math.random() > 0.3;
        const imagesCount = hasBeforeAfterImages
          ? Math.floor(Math.random() * 8) + 3
          : 0;
        const isPromoted = Math.random() > 0.7;
        const discountRate = isPromoted
          ? Math.floor(Math.random() * 30) + 10
          : 0;

        mockProcedures.push({
          id: index + 1,
          name: item.name,
          categoryId: item.category,
          categoryName: categoryObj ? categoryObj.name : "기타",
          price: item.price,
          discountedPrice: isPromoted
            ? Math.round((item.price * (1 - discountRate / 100)) / 1000) * 1000
            : item.price,
          discountRate: discountRate,
          duration: item.duration,
          description: `${item.name}은 안전하고 효과적인 시술입니다. 개인에 맞춘 맞춤형 성형으로 자연스러운 결과를 제공합니다.`,
          popularity: item.popularity,
          reviewCount: Math.floor(Math.random() * 200) + 10,
          hasBeforeAfterImages: hasBeforeAfterImages,
          imagesCount: imagesCount,
          createdAt: new Date(
            new Date().getTime() -
              Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
          ),
          updatedAt: new Date(
            new Date().getTime() -
              Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
          ),
          isPromoted: isPromoted,
          recommendedDoctors: Math.floor(Math.random() * 5) + 1,
          painLevel: Math.floor(Math.random() * 5) + 1,
          recoveryTime: ["1-2일", "3-5일", "1주", "2주", "1개월"][
            Math.floor(Math.random() * 5)
          ],
          isActive: Math.random() > 0.1,
        });
      });

      return mockProcedures;
    };

    // 데이터 로딩 시뮬레이션
    setTimeout(() => {
      const mockProcedures = generateMockProcedures();
      setProcedures(mockProcedures);
      setFilteredProcedures(mockProcedures);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // 검색어와 필터 적용
    let results = [...procedures];

    // 검색어 필터링
    if (searchTerm) {
      results = results.filter(
        (procedure) =>
          procedure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          procedure.categoryName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          procedure.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 카테고리 필터링
    if (filterOptions.category !== "all") {
      results = results.filter(
        (procedure) => procedure.categoryId === filterOptions.category
      );
    }

    // 가격 범위 필터링
    if (filterOptions.priceRange !== "all") {
      const priceRanges = {
        "0-500000": (price) => price < 500000,
        "500000-1000000": (price) => price >= 500000 && price < 1000000,
        "1000000-3000000": (price) => price >= 1000000 && price < 3000000,
        "3000000-5000000": (price) => price >= 3000000 && price < 5000000,
        "5000000+": (price) => price >= 5000000,
      };

      results = results.filter((procedure) =>
        priceRanges[filterOptions.priceRange](procedure.price)
      );
    }

    // 인기도 필터링
    if (filterOptions.popularity !== "all") {
      const popularityRanges = {
        high: (rating) => rating >= 4.5,
        medium: (rating) => rating >= 4.0 && rating < 4.5,
        low: (rating) => rating < 4.0,
      };

      results = results.filter((procedure) =>
        popularityRanges[filterOptions.popularity](procedure.popularity)
      );
    }

    // 프로모션 필터링
    if (filterOptions.hasPromotion) {
      results = results.filter((procedure) => procedure.isPromoted);
    }

    // 결과 정렬 (기본: 인기도 높은순)
    results.sort((a, b) => b.popularity - a.popularity);

    setFilteredProcedures(results);
    setCurrentPage(1);
  }, [searchTerm, filterOptions, procedures]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (filter, value) => {
    setFilterOptions({
      ...filterOptions,
      [filter]: value,
    });
  };

  const togglePromotionFilter = () => {
    setFilterOptions({
      ...filterOptions,
      hasPromotion: !filterOptions.hasPromotion,
    });
  };

  const handleAddProcedure = () => {
    setSelectedProcedure(null);
    setShowModal(true);
  };

  const handleProcedureClick = (procedure) => {
    setSelectedProcedure(procedure);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProcedure(null);
  };

  const handleSaveProcedure = (procedureData) => {
    if (selectedProcedure) {
      // 기존 시술 정보 수정
      setProcedures(
        procedures.map((procedure) =>
          procedure.id === selectedProcedure.id
            ? { ...procedure, ...procedureData }
            : procedure
        )
      );
    } else {
      // 새 시술 추가
      const newProcedure = {
        id: procedures.length + 1,
        ...procedureData,
        createdAt: new Date(),
        updatedAt: new Date(),
        reviewCount: 0,
        isActive: true,
      };
      setProcedures([...procedures, newProcedure]);
    }
    setShowModal(false);
  };

  const handleDeleteProcedure = (id) => {
    setProcedures(procedures.filter((procedure) => procedure.id !== id));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 카테고리 목록 추출
  const categories = [
    { id: "face", name: "안면 성형" },
    { id: "nose", name: "코 성형" },
    { id: "eye", name: "눈 성형" },
    { id: "liposuction", name: "지방 흡입" },
    { id: "lipofilling", name: "지방 이식" },
    { id: "breast", name: "가슴 성형" },
    { id: "antiaging", name: "안티에이징" },
    { id: "botox", name: "보톡스" },
    { id: "filler", name: "필러" },
    { id: "laser", name: "레이저 시술" },
    { id: "skincare", name: "피부 관리" },
    { id: "hairtrans", name: "모발 이식" },
    { id: "lifting", name: "리프팅" },
    { id: "contour", name: "윤곽 성형" },
    { id: "petite", name: "쁘띠 성형" },
  ];

  // 페이지네이션 계산
  const indexOfLastProcedure = currentPage * proceduresPerPage;
  const indexOfFirstProcedure = indexOfLastProcedure - proceduresPerPage;
  const currentProcedures = filteredProcedures.slice(
    indexOfFirstProcedure,
    indexOfLastProcedure
  );
  const totalPages = Math.ceil(filteredProcedures.length / proceduresPerPage);

  // 가격 포맷 함수
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
  };

  if (isLoading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-spinner"></div>
        <p>시술 데이터 로딩 중...</p>
      </div>
    );
  }

  // CosmeticProcedureManagement.jsx의 return 부분

  return (
    <div className="cosmetic-procedure-management">
      <div className="admin-section-header">
        <h2 className="admin-section-title">성형 시술 관리</h2>
        <p className="admin-section-description">
          모든 성형 시술 정보를 관리하고 프로모션을 설정할 수 있습니다.
        </p>
      </div>

      <div className="procedure-management-actions">
        <div className="procedure-management-search-filter-container">
          <div className="procedure-management-admin-search-bar">
            <Search size={18} className="procedure-management-search-icon" />
            <input
              type="text"
              placeholder="시술명, 카테고리, 설명 검색..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="procedure-management-admin-search-input"
            />
          </div>

          <button
            className="admin-button admin-button-secondary"
            onClick={toggleFilters}
          >
            <Filter size={16} />
            필터
          </button>
        </div>

        <div className="procedure-action-buttons">
          <button className="admin-button admin-button-secondary">
            <Download size={16} />
            내보내기
          </button>
          <button
            className="admin-button admin-button-primary"
            onClick={handleAddProcedure}
          >
            <Plus size={16} />
            시술 등록
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="admin-filters">
          <div className="admin-filter-group">
            <label className="admin-filter-label">카테고리</label>
            <div className="admin-filter-options">
              <button
                className={`admin-filter-option ${
                  filterOptions.category === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("category", "all")}
              >
                전체
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`admin-filter-option ${
                    filterOptions.category === category.id ? "active" : ""
                  }`}
                  onClick={() => handleFilterChange("category", category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="admin-filter-group">
            <label className="admin-filter-label">가격 범위</label>
            <div className="admin-filter-options">
              <button
                className={`admin-filter-option ${
                  filterOptions.priceRange === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("priceRange", "all")}
              >
                전체
              </button>
              <button
                className={`admin-filter-option ${
                  filterOptions.priceRange === "0-500000" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("priceRange", "0-500000")}
              >
                ~50만원
              </button>
              <button
                className={`admin-filter-option ${
                  filterOptions.priceRange === "500000-1000000" ? "active" : ""
                }`}
                onClick={() =>
                  handleFilterChange("priceRange", "500000-1000000")
                }
              >
                50만원~100만원
              </button>
              <button
                className={`admin-filter-option ${
                  filterOptions.priceRange === "1000000-3000000" ? "active" : ""
                }`}
                onClick={() =>
                  handleFilterChange("priceRange", "1000000-3000000")
                }
              >
                100만원~300만원
              </button>
              <button
                className={`admin-filter-option ${
                  filterOptions.priceRange === "3000000-5000000" ? "active" : ""
                }`}
                onClick={() =>
                  handleFilterChange("priceRange", "3000000-5000000")
                }
              >
                300만원~500만원
              </button>
              <button
                className={`admin-filter-option ${
                  filterOptions.priceRange === "5000000+" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("priceRange", "5000000+")}
              >
                500만원~
              </button>
            </div>
          </div>

          <div className="admin-filter-group">
            <label className="admin-filter-label">인기도</label>
            <div className="admin-filter-options">
              <button
                className={`admin-filter-option ${
                  filterOptions.popularity === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("popularity", "all")}
              >
                전체
              </button>
              <button
                className={`admin-filter-option ${
                  filterOptions.popularity === "high" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("popularity", "high")}
              >
                높음 (4.5 이상)
              </button>
              <button
                className={`admin-filter-option ${
                  filterOptions.popularity === "medium" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("popularity", "medium")}
              >
                중간 (4.0-4.5)
              </button>
              <button
                className={`admin-filter-option ${
                  filterOptions.popularity === "low" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("popularity", "low")}
              >
                낮음 (4.0 미만)
              </button>
            </div>
          </div>

          <div className="admin-filter-group promotion-filter">
            <label className="promotion-filter-label">
              <input
                type="checkbox"
                checked={filterOptions.hasPromotion}
                onChange={togglePromotionFilter}
                className="promotion-filter-checkbox"
              />
              <span>프로모션 중인 시술만 보기</span>
            </label>
          </div>
        </div>
      )}

      <div className="procedure-list-header">
        <h3 className="procedure-list-title">성형 시술 목록</h3>
        <div className="procedure-count">
          총{" "}
          <span className="count-highlight">{filteredProcedures.length}</span>개
        </div>
      </div>

      {filteredProcedures.length === 0 ? (
        <div className="admin-empty-state">
          <div className="admin-empty-icon">
            <Scissors size={32} />
          </div>
          <h3 className="admin-empty-title">시술 정보가 없습니다</h3>
          <p className="admin-empty-description">
            검색 조건에 맞는 시술이 없습니다. 다른 검색어나 필터를 사용해보세요.
          </p>
        </div>
      ) : (
        <>
          <div className="admin-table-container">
            <table className="admin-table">
              <colgroup>
                <col style={{ minWidth: "180px" }} />
                <col style={{ minWidth: "100px" }} />
                <col style={{ minWidth: "180px" }} />
                <col style={{ minWidth: "100px" }} />
                <col style={{ minWidth: "100px" }} />
                <col style={{ minWidth: "100px" }} />
                <col style={{ minWidth: "130px" }} />
                <col style={{ minWidth: "100px" }} />
                <col style={{ minWidth: "80px" }} />
              </colgroup>
              <thead>
                <tr>
                  <th>시술명</th>
                  <th>카테고리</th>
                  <th>가격</th>
                  <th>소요시간</th>
                  <th>인기도</th>
                  <th>전후사진</th>
                  <th>프로모션</th>
                  <th>상태</th>
                  <th>작업</th>
                </tr>
              </thead>
              <tbody>
                {currentProcedures.map((procedure) => (
                  <tr
                    key={procedure.id}
                    onClick={() => handleProcedureClick(procedure)}
                  >
                    <td>
                      <div className="procedure-name">{procedure.name}</div>
                    </td>
                    <td>
                      <span className="category-badge">
                        {procedure.categoryName}
                      </span>
                    </td>
                    <td>
                      <div className="procedure-price">
                        {procedure.isPromoted && (
                          <div className="original-price">
                            {formatPrice(procedure.price)}
                          </div>
                        )}
                        <div
                          className={
                            procedure.isPromoted ? "discounted-price" : ""
                          }
                        >
                          {formatPrice(procedure.discountedPrice)}
                        </div>
                        {procedure.isPromoted && (
                          <div className="discount-rate">
                            -{procedure.discountRate}%
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="procedure-duration">
                        <Clock size={14} />
                        <span>{procedure.duration}분</span>
                      </div>
                    </td>
                    <td>
                      <div className="procedure-popularity">
                        <Star size={14} className="star-icon" />
                        <span>{procedure.popularity}</span>
                        <span className="review-count">
                          ({procedure.reviewCount})
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="procedure-images">
                        {procedure.hasBeforeAfterImages ? (
                          <>
                            <Camera size={14} />
                            <div>{procedure.imagesCount}장</div>
                          </>
                        ) : (
                          <div className="cosmic-procedure-management-no-images">
                            없음
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div
                        className={`promotion-status ${
                          procedure.isPromoted ? "active" : "inactive"
                        }`}
                      >
                        {procedure.isPromoted ? (
                          <>
                            <Tag size={14} />
                            <span>{procedure.discountRate}% 할인 중</span>
                          </>
                        ) : (
                          <span>없음</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div
                        className={`procedure-status ${
                          procedure.isActive ? "active" : "inactive"
                        }`}
                      >
                        {procedure.isActive ? "활성" : "비활성"}
                      </div>
                    </td>
                    <td>
                      <div
                        className="procedure-actions"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="action-button edit"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProcedureClick(procedure);
                          }}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="action-button delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProcedure(procedure.id);
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="admin-pagination">
              <button
                className={`admin-pagination-button ${
                  currentPage === 1 ? "disabled" : ""
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;

                // 현재 페이지 주변 5개의 페이지만 표시
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 2 &&
                    pageNumber <= currentPage + 2)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      className={`admin-pagination-button ${
                        pageNumber === currentPage ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (
                  (pageNumber === currentPage - 3 && currentPage > 3) ||
                  (pageNumber === currentPage + 3 &&
                    currentPage < totalPages - 2)
                ) {
                  // 생략 부호 표시
                  return (
                    <span key={pageNumber} className="pagination-ellipsis">
                      ...
                    </span>
                  );
                }

                return null;
              })}

              <button
                className={`admin-pagination-button ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}

      {showModal && (
        <ProcedureModal
          procedure={selectedProcedure}
          onClose={handleCloseModal}
          onSave={handleSaveProcedure}
          categories={categories}
        />
      )}
    </div>
  );
};

export default CosmeticProcedureManagement;
