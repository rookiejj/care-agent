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
  Package,
  Tag,
  Scissors,
  Clock,
  Calendar,
  User,
  Check,
  X,
  ShoppingBag,
  DollarSign,
  Percent,
  Star,
  ArrowRight,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import "./PackageManagement.css";
import PackageModal from "./components/PackageModal";

const PackageManagement = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    category: "all",
    status: "all",
    priceRange: "all",
  });
  const [sortOption, setSortOption] = useState("popular"); // popular, priceAsc, priceDesc, newest

  // 페이지네이션 설정
  const packagesPerPage = 10;

  useEffect(() => {
    // 실제 앱에서는 API 호출을 통해 패키지 데이터를 가져옴
    // 여기서는 목업 데이터 사용
    const generateMockPackages = () => {
      const mockPackages = [];
      const packageCategories = [
        "안면 패키지",
        "코 성형 패키지",
        "눈 성형 패키지",
        "지방 패키지",
        "가슴 성형 패키지",
        "안티에이징 패키지",
        "보톡스/필러 패키지",
        "레이저 패키지",
        "윤곽 패키지",
        "신혼 패키지",
        "VIP 패키지",
      ];

      const proceduresByCategory = {
        "안면 패키지": [
          "안면거상술",
          "이마거상술",
          "광대축소술",
          "사각턱 축소술",
        ],
        "코 성형 패키지": ["코 필러", "콧대높임", "코 재수술", "비중격 교정"],
        "눈 성형 패키지": [
          "쌍꺼풀 수술",
          "눈매교정",
          "안검하수 교정",
          "눈밑지방 재배치",
        ],
        "지방 패키지": [
          "얼굴 지방이식",
          "가슴 지방이식",
          "복부 지방흡입",
          "허벅지 지방흡입",
        ],
        "가슴 성형 패키지": ["가슴 확대", "가슴 축소", "가슴 리프팅"],
        "안티에이징 패키지": [
          "프락셀 레이저",
          "울쎄라",
          "써마지",
          "안티에이징 관리",
        ],
        "보톡스/필러 패키지": [
          "이마 보톡스",
          "팔자 필러",
          "입술 필러",
          "턱 보톡스",
        ],
        "레이저 패키지": [
          "레이저 토닝",
          "CO2 레이저",
          "색소 레이저",
          "여드름 레이저",
        ],
        "윤곽 패키지": [
          "V라인 성형",
          "안면윤곽 3종",
          "양악수술",
          "사각턱 보톡스",
        ],
        "신혼 패키지": ["쁘띠 성형", "피부 관리", "보톡스", "필러"],
        "VIP 패키지": [
          "맞춤형 성형",
          "프리미엄 관리",
          "전담 의료진",
          "VIP 서비스",
        ],
      };

      const includedServices = [
        "상담",
        "사후관리",
        "마취",
        "입원",
        "전담 간호사",
        "영양제",
      ];

      for (let i = 1; i <= 40; i++) {
        const createdAt = new Date();
        createdAt.setDate(
          createdAt.getDate() - Math.floor(Math.random() * 365)
        );

        const category =
          packageCategories[
            Math.floor(Math.random() * packageCategories.length)
          ];
        const procedures = proceduresByCategory[category] || [];

        // 패키지에 포함된 시술 선택 (2-4개)
        const includedProcedures = [];
        const procedureCount = Math.floor(Math.random() * 3) + 2; // 2-4개

        for (let j = 0; j < procedureCount; j++) {
          if (j < procedures.length) {
            includedProcedures.push(procedures[j]);
          }
        }

        // 패키지에 포함된 서비스 선택 (1-3개)
        const services = [];
        const serviceCount = Math.floor(Math.random() * 3) + 1; // 1-3개

        for (let j = 0; j < serviceCount; j++) {
          const service =
            includedServices[
              Math.floor(Math.random() * includedServices.length)
            ];
          if (!services.includes(service)) {
            services.push(service);
          }
        }

        // 가격 생성
        const individualPrice = (Math.floor(Math.random() * 50) + 10) * 100000; // 100만원 ~ 600만원
        const discountRate = Math.floor(Math.random() * 30) + 10; // 10% ~ 40%
        const packagePrice =
          Math.round((individualPrice * (1 - discountRate / 100)) / 10000) *
          10000;

        // 유효기간 설정
        const validityPeriod = [30, 60, 90, 180, 365][
          Math.floor(Math.random() * 5)
        ]; // 30일, 60일, 90일, 180일, 1년

        // 인기도 설정
        const popularity = parseFloat((Math.random() * 5).toFixed(1));

        // 판매 상태 설정
        const status = ["active", "inactive", "comingSoon"][
          Math.floor(Math.random() * 3)
        ];

        // 판매량 설정
        const soldCount = Math.floor(Math.random() * 200);

        // 패키지 명 설정
        const packageName = `${category} ${
          ["스페셜", "베이직", "프리미엄", "플러스", "골드", "실버"][
            Math.floor(Math.random() * 6)
          ]
        }`;

        mockPackages.push({
          id: i,
          name: packageName,
          category: category,
          includedProcedures: includedProcedures,
          includedServices: services,
          individualPrice: individualPrice,
          packagePrice: packagePrice,
          discountRate: discountRate,
          description: `${packageName}는 ${category.replace(
            " 패키지",
            ""
          )} 관련 시술들을 합리적인 가격으로 제공합니다. ${includedProcedures.join(
            ", "
          )} 시술이 포함되어 있으며, ${services.join(
            ", "
          )} 서비스도 함께 제공됩니다.`,
          validityPeriod: validityPeriod,
          popularity: popularity,
          status: status,
          soldCount: soldCount,
          createdAt: createdAt, // 이미 위에서 정의한 createdAt 변수 사용
          updatedAt: new Date(),
          isFeatured: Math.random() > 0.7, // 30% 확률로 추천 패키지
        });
      }

      return mockPackages;
    };

    // 데이터 로딩 시뮬레이션
    setTimeout(() => {
      const mockPackages = generateMockPackages();
      setPackages(mockPackages);
      setFilteredPackages(mockPackages);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // 검색어와 필터 적용
    let results = [...packages];

    // 검색어 필터링
    if (searchTerm) {
      results = results.filter(
        (pack) =>
          pack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pack.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pack.includedProcedures.some((proc) =>
            proc.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          pack.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 카테고리 필터링
    if (filterOptions.category !== "all") {
      results = results.filter(
        (pack) => pack.category === filterOptions.category
      );
    }

    // 상태 필터링
    if (filterOptions.status !== "all") {
      results = results.filter((pack) => pack.status === filterOptions.status);
    }

    // 가격 범위 필터링
    if (filterOptions.priceRange !== "all") {
      const priceRanges = {
        under1m: (price) => price < 1000000,
        "1m-3m": (price) => price >= 1000000 && price < 3000000,
        "3m-5m": (price) => price >= 3000000 && price < 5000000,
        over5m: (price) => price >= 5000000,
      };

      results = results.filter((pack) =>
        priceRanges[filterOptions.priceRange](pack.packagePrice)
      );
    }

    // 정렬 적용
    switch (sortOption) {
      case "popular":
        results.sort((a, b) => b.popularity - a.popularity);
        break;
      case "priceAsc":
        results.sort((a, b) => a.packagePrice - b.packagePrice);
        break;
      case "priceDesc":
        results.sort((a, b) => b.packagePrice - a.packagePrice);
        break;
      case "newest":
        results.sort((a, b) => b.createdAt - a.createdAt);
        break;
      default:
        break;
    }

    setFilteredPackages(results);
    setCurrentPage(1);
  }, [searchTerm, filterOptions, packages, sortOption]);

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

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const handleAddPackage = () => {
    setSelectedPackage(null);
    setShowModal(true);
  };

  const handlePackageClick = (pack) => {
    setSelectedPackage(pack);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPackage(null);
  };

  const handleSavePackage = (packageData) => {
    if (selectedPackage) {
      // 기존 패키지 정보 수정
      setPackages(
        packages.map((pack) =>
          pack.id === selectedPackage.id ? { ...pack, ...packageData } : pack
        )
      );
    } else {
      // 새 패키지 추가
      const newPackage = {
        id: packages.length + 1,
        ...packageData,
        createdAt: new Date(),
        updatedAt: new Date(),
        soldCount: 0,
        popularity: 0,
      };
      setPackages([...packages, newPackage]);
    }
    setShowModal(false);
  };

  const handleDeletePackage = (id) => {
    setPackages(packages.filter((pack) => pack.id !== id));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 카테고리 목록 추출
  const categories = [...new Set(packages.map((pack) => pack.category))];

  // 페이지네이션 계산
  const indexOfLastPackage = currentPage * packagesPerPage;
  const indexOfFirstPackage = indexOfLastPackage - packagesPerPage;
  const currentPackages = filteredPackages.slice(
    indexOfFirstPackage,
    indexOfLastPackage
  );
  const totalPages = Math.ceil(filteredPackages.length / packagesPerPage);

  // 가격 포맷 함수
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
  };

  // 상태에 따른 배지 렌더링
  const renderStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="status-badge active">
            <Check size={14} /> 판매중
          </span>
        );
      case "inactive":
        return (
          <span className="status-badge inactive">
            <X size={14} /> 판매중지
          </span>
        );
      case "comingSoon":
        return (
          <span className="status-badge coming-soon">
            <Calendar size={14} /> 출시예정
          </span>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-spinner"></div>
        <p>패키지 데이터 로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="package-management">
      <div className="admin-section-header">
        <h2 className="admin-section-title">패키지 관리</h2>
        <p className="admin-section-description">
          성형 패키지 상품을 생성하고 관리할 수 있습니다. 할인율, 포함 시술 및
          서비스를 설정하세요.
        </p>
      </div>

      <div className="package-management-actions">
        <div className="package-management-search-filter-container">
          <div className="package-management-search-bar">
            <Search size={18} className="package-management-search-icon" />
            <input
              type="text"
              placeholder="패키지명, 시술, 카테고리 검색..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="package-management-search-input"
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

        <div className="package-sort-options">
          <span className="sort-label">정렬:</span>
          <div className="sort-buttons">
            <button
              className={`sort-button ${
                sortOption === "popular" ? "active" : ""
              }`}
              onClick={() => handleSortChange("popular")}
            >
              <Star size={14} />
              인기순
            </button>
            <button
              className={`sort-button ${
                sortOption === "priceAsc" ? "active" : ""
              }`}
              onClick={() => handleSortChange("priceAsc")}
            >
              <ArrowUp size={14} />
              가격낮은순
            </button>
            <button
              className={`sort-button ${
                sortOption === "priceDesc" ? "active" : ""
              }`}
              onClick={() => handleSortChange("priceDesc")}
            >
              <ArrowDown size={14} />
              가격높은순
            </button>
            <button
              className={`sort-button ${
                sortOption === "newest" ? "active" : ""
              }`}
              onClick={() => handleSortChange("newest")}
            >
              <Calendar size={14} />
              최신순
            </button>
          </div>
        </div>

        <div className="package-action-buttons">
          <button className="admin-button admin-button-secondary">
            <Download size={16} />
            내보내기
          </button>
          <button
            className="admin-button admin-button-primary"
            onClick={handleAddPackage}
          >
            <Plus size={16} />
            패키지 생성
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="package-filters">
          <div className="filter-group">
            <label className="filter-label">패키지 카테고리</label>
            <div className="filter-options">
              <button
                className={`filter-option ${
                  filterOptions.category === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("category", "all")}
              >
                전체
              </button>
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`filter-option ${
                    filterOptions.category === category ? "active" : ""
                  }`}
                  onClick={() => handleFilterChange("category", category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">판매 상태</label>
            <div className="filter-options">
              <button
                className={`filter-option ${
                  filterOptions.status === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "all")}
              >
                전체
              </button>
              <button
                className={`filter-option ${
                  filterOptions.status === "active" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "active")}
              >
                판매중
              </button>
              <button
                className={`filter-option ${
                  filterOptions.status === "inactive" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "inactive")}
              >
                판매중지
              </button>
              <button
                className={`filter-option ${
                  filterOptions.status === "comingSoon" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "comingSoon")}
              >
                출시예정
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">가격 범위</label>
            <div className="filter-options">
              <button
                className={`filter-option ${
                  filterOptions.priceRange === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("priceRange", "all")}
              >
                전체
              </button>
              <button
                className={`filter-option ${
                  filterOptions.priceRange === "under1m" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("priceRange", "under1m")}
              >
                100만원 미만
              </button>
              <button
                className={`filter-option ${
                  filterOptions.priceRange === "1m-3m" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("priceRange", "1m-3m")}
              >
                100만원 ~ 300만원
              </button>
              <button
                className={`filter-option ${
                  filterOptions.priceRange === "3m-5m" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("priceRange", "3m-5m")}
              >
                300만원 ~ 500만원
              </button>
              <button
                className={`filter-option ${
                  filterOptions.priceRange === "over5m" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("priceRange", "over5m")}
              >
                500만원 이상
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="package-list-header">
        <h3 className="package-list-title">패키지 목록</h3>
        <div className="package-count">
          총 <span className="count-highlight">{filteredPackages.length}</span>
          개
        </div>
      </div>

      {filteredPackages.length === 0 ? (
        <div className="admin-empty-state">
          <div className="admin-empty-icon">
            <Package size={32} />
          </div>
          <h3 className="admin-empty-title">패키지가 없습니다</h3>
          <p className="admin-empty-description">
            검색 조건에 맞는 패키지가 없습니다. 다른 검색어나 필터를
            사용해보세요.
          </p>
        </div>
      ) : (
        <>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>패키지명</th>
                  <th>카테고리</th>
                  <th>포함 시술</th>
                  <th>가격</th>
                  <th>할인율</th>
                  <th>유효기간</th>
                  <th>판매량</th>
                  <th>상태</th>
                  <th>작업</th>
                </tr>
              </thead>
              <tbody>
                {currentPackages.map((pack) => (
                  <tr
                    key={pack.id}
                    onClick={() => handlePackageClick(pack)}
                    className={pack.isFeatured ? "featured-row" : ""}
                  >
                    <td>
                      <div className="package-name">
                        {pack.name}
                        {pack.isFeatured && (
                          <span className="featured-tag">추천</span>
                        )}
                      </div>
                    </td>
                    <td>{pack.category}</td>
                    <td>
                      <div className="included-procedures">
                        {pack.includedProcedures.map((proc, index) => (
                          <span key={index} className="procedure-tag">
                            {proc}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="package-price">
                        <div className="current-price">
                          {formatPrice(pack.packagePrice)}
                        </div>
                        <div className="original-price">
                          {formatPrice(pack.individualPrice)}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="discount-rate">
                        <Percent size={14} />
                        <span>{pack.discountRate}%</span>
                      </div>
                    </td>
                    <td>
                      <div className="validity-period">
                        <Clock size={14} />
                        <span>{pack.validityPeriod}일</span>
                      </div>
                    </td>
                    <td>
                      <div className="sold-count">
                        <ShoppingBag size={14} />
                        <span>{pack.soldCount}건</span>
                      </div>
                    </td>
                    <td>{renderStatusBadge(pack.status)}</td>
                    <td>
                      <div
                        className="package-actions"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="action-button edit"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePackageClick(pack);
                          }}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="action-button delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePackage(pack.id);
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
        <PackageModal
          package={selectedPackage}
          onClose={handleCloseModal}
          onSave={handleSavePackage}
          categories={categories}
        />
      )}
    </div>
  );
};

export default PackageManagement;
