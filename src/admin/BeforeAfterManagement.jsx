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
  Camera,
  Users,
  Scissors,
  Eye,
  EyeOff,
  Check,
  X,
  FileImage,
  Calendar,
  Tag,
  ArrowUpRight,
} from "lucide-react";
import "./BeforeAfterManagement.css";
import BeforeAfterModal from "./components/BeforeAfterModal";

const BeforeAfterManagement = () => {
  const [galleries, setGalleries] = useState([]);
  const [filteredGalleries, setFilteredGalleries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    procedureCategory: "all",
    visibility: "all",
    dateRange: "all",
  });

  // 페이지네이션 설정
  const galleriesPerPage = 8;

  useEffect(() => {
    // 실제 앱에서는 API 호출을 통해 갤러리 데이터를 가져옴
    // 여기서는 목업 데이터 사용
    const generateMockGalleries = () => {
      const mockGalleries = [];
      const procedureCategories = [
        "안면 성형",
        "코 성형",
        "눈 성형",
        "지방 이식",
        "지방 흡입",
        "가슴 성형",
        "안티에이징",
        "보톡스/필러",
        "레이저 시술",
        "윤곽 성형",
        "쁘띠 성형",
      ];

      const specificProcedures = {
        "안면 성형": [
          "안면거상술",
          "이마거상술",
          "광대축소술",
          "사각턱 축소술",
        ],
        "코 성형": ["코 필러", "콧대높임", "코 재수술", "비중격 교정"],
        "눈 성형": [
          "쌍꺼풀 수술",
          "눈매교정",
          "안검하수 교정",
          "눈밑지방 재배치",
        ],
        "지방 이식": ["얼굴 지방이식", "가슴 지방이식"],
        "지방 흡입": ["복부 지방흡입", "팔 지방흡입", "허벅지 지방흡입"],
        "가슴 성형": ["가슴 확대", "가슴 축소", "가슴 리프팅"],
        안티에이징: ["프락셀 레이저", "울쎄라", "써마지"],
        "보톡스/필러": ["이마 보톡스", "팔자 필러", "입술 필러"],
        "레이저 시술": ["레이저 토닝", "CO2 레이저", "색소 레이저"],
        "윤곽 성형": ["V라인 성형", "안면윤곽 3종"],
        "쁘띠 성형": ["돌출 필러", "입꼬리 필러"],
      };

      const doctors = ["김의사", "이의사", "박의사", "최의사", "정의사"];

      // 80개의 갤러리 항목 생성
      for (let i = 1; i <= 80; i++) {
        const createdDate = new Date();
        createdDate.setDate(
          createdDate.getDate() - Math.floor(Math.random() * 365)
        );

        const category =
          procedureCategories[
            Math.floor(Math.random() * procedureCategories.length)
          ];
        const procedureOptions = specificProcedures[category] || [];
        const procedure =
          procedureOptions[
            Math.floor(Math.random() * procedureOptions.length)
          ] || category;

        // 고객 생성
        const firstName = [
          "김",
          "이",
          "박",
          "최",
          "정",
          "강",
          "조",
          "윤",
          "장",
          "임",
        ][Math.floor(Math.random() * 10)];
        const lastName = [
          "준",
          "민",
          "서",
          "지",
          "현",
          "우",
          "영",
          "수",
          "은",
          "연",
          "호",
        ][Math.floor(Math.random() * 11)];

        const patientName = firstName + lastName;
        const patientAge = 20 + Math.floor(Math.random() * 40);
        const patientGender = Math.random() > 0.5 ? "여성" : "남성";

        // 이미지 수
        const imageCount = Math.floor(Math.random() * 5) + 1;

        // 공개 여부
        const isPublic = Math.random() > 0.3;

        // 태그
        const tags = [];
        const possibleTags = [
          "인기",
          "시술추천",
          "효과좋음",
          "자연스러움",
          "간단시술",
          "빠른회복",
          "연예인",
        ];
        const tagCount = Math.floor(Math.random() * 3);
        for (let j = 0; j < tagCount; j++) {
          const tag =
            possibleTags[Math.floor(Math.random() * possibleTags.length)];
          if (!tags.includes(tag)) {
            tags.push(tag);
          }
        }

        // 담당 의사
        const doctor = doctors[Math.floor(Math.random() * doctors.length)];

        // 조회수
        const views = Math.floor(Math.random() * 2000);

        mockGalleries.push({
          id: i,
          title: `${procedure} 전후사진 ${i}`,
          procedureCategory: category,
          procedure: procedure,
          patientId: Math.floor(Math.random() * 1000) + 1,
          patientName: isPublic ? patientName : "비공개",
          patientAge: isPublic ? patientAge : null,
          patientGender: patientGender,
          description: `${patientGender} ${
            patientAge ? patientAge + "세" : ""
          } 고객님의 ${procedure} 전후 사진입니다. ${
            Math.random() > 0.5
              ? "수술 후 3개월 경과 사진입니다."
              : "시술 직후 촬영한 사진입니다."
          }`,
          imageCount: imageCount,
          images: Array.from({ length: imageCount }, (_, i) => ({
            id: i + 1,
            type: i === 0 ? "before" : i === 1 ? "after" : "detail",
            url: `/images/gallery/${i + 1}.jpg`, // 실제로는 이 경로에 이미지가 없음
          })),
          isPublic: isPublic,
          createdAt: createdDate,
          tags: tags,
          doctor: doctor,
          views: views,
          featuredOrder:
            Math.random() > 0.8 ? Math.floor(Math.random() * 10) + 1 : null,
        });
      }

      return mockGalleries.sort((a, b) => b.createdAt - a.createdAt);
    };

    // 데이터 로딩 시뮬레이션
    setTimeout(() => {
      const mockGalleries = generateMockGalleries();
      setGalleries(mockGalleries);
      setFilteredGalleries(mockGalleries);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // 검색어와 필터 적용
    let results = [...galleries];

    // 검색어 필터링
    if (searchTerm) {
      results = results.filter(
        (gallery) =>
          gallery.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          gallery.procedure.toLowerCase().includes(searchTerm.toLowerCase()) ||
          gallery.patientName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          gallery.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          gallery.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          gallery.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // 시술 카테고리 필터링
    if (filterOptions.procedureCategory !== "all") {
      results = results.filter(
        (gallery) =>
          gallery.procedureCategory === filterOptions.procedureCategory
      );
    }

    // 공개 여부 필터링
    if (filterOptions.visibility !== "all") {
      results = results.filter(
        (gallery) =>
          gallery.isPublic === (filterOptions.visibility === "public")
      );
    }

    // 날짜 범위 필터링
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const lastYear = new Date(today);
    lastYear.setFullYear(lastYear.getFullYear() - 1);

    switch (filterOptions.dateRange) {
      case "week":
        results = results.filter((gallery) => gallery.createdAt >= lastWeek);
        break;
      case "month":
        results = results.filter((gallery) => gallery.createdAt >= lastMonth);
        break;
      case "year":
        results = results.filter((gallery) => gallery.createdAt >= lastYear);
        break;
      case "all":
      default:
        // 모든 날짜 포함
        break;
    }

    // 결과 날짜순 정렬 (최신순)
    results.sort((a, b) => b.createdAt - a.createdAt);

    setFilteredGalleries(results);
    setCurrentPage(1);
  }, [searchTerm, filterOptions, galleries]);

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

  const handleAddGallery = () => {
    setSelectedGallery(null);
    setShowModal(true);
  };

  const handleGalleryClick = (gallery) => {
    setSelectedGallery(gallery);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedGallery(null);
  };

  const handleSaveGallery = (galleryData) => {
    if (selectedGallery) {
      // 기존 갤러리 정보 수정
      setGalleries(
        galleries.map((gallery) =>
          gallery.id === selectedGallery.id
            ? { ...gallery, ...galleryData }
            : gallery
        )
      );
    } else {
      // 새 갤러리 추가
      const newGallery = {
        id: galleries.length + 1,
        ...galleryData,
        createdAt: new Date(),
        views: 0,
      };
      setGalleries([newGallery, ...galleries]);
    }
    setShowModal(false);
  };

  const handleDeleteGallery = (id) => {
    setGalleries(galleries.filter((gallery) => gallery.id !== id));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 카테고리 목록 추출
  const categories = [
    ...new Set(galleries.map((gallery) => gallery.procedureCategory)),
  ];

  // 페이지네이션 계산
  const indexOfLastGallery = currentPage * galleriesPerPage;
  const indexOfFirstGallery = indexOfLastGallery - galleriesPerPage;
  const currentGalleries = filteredGalleries.slice(
    indexOfFirstGallery,
    indexOfLastGallery
  );
  const totalPages = Math.ceil(filteredGalleries.length / galleriesPerPage);

  // 날짜 포맷 함수
  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString("ko-KR", options);
  };

  if (isLoading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-spinner"></div>
        <p>갤러리 데이터 로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="before-after-management">
      <div className="admin-section-header">
        <h2 className="admin-section-title">전후사진 관리</h2>
        <p className="admin-section-description">
          시술 전후 사진을 관리하고 웹사이트에 노출 여부를 설정할 수 있습니다.
        </p>
      </div>

      <div className="before-after-management-actions">
        <div className="before-after-management-search-filter-container">
          <div className="before-after-management-search-bar">
            <Search size={18} className="before-after-management-search-icon" />
            <input
              type="text"
              placeholder="시술명, 환자명, 담당의사, 태그 검색..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="before-after-management-search-input"
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

        <div className="before-after-action-buttons">
          <button className="admin-button admin-button-secondary">
            <Download size={16} />
            내보내기
          </button>
          <button
            className="admin-button admin-button-primary"
            onClick={handleAddGallery}
          >
            <Plus size={16} />
            전후사진 등록
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="before-after-filters">
          <div className="filter-group">
            <label className="filter-label">시술 카테고리</label>
            <div className="filter-options">
              <button
                className={`filter-option ${
                  filterOptions.procedureCategory === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("procedureCategory", "all")}
              >
                전체
              </button>
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`filter-option ${
                    filterOptions.procedureCategory === category ? "active" : ""
                  }`}
                  onClick={() =>
                    handleFilterChange("procedureCategory", category)
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">공개 여부</label>
            <div className="filter-options">
              <button
                className={`filter-option ${
                  filterOptions.visibility === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("visibility", "all")}
              >
                전체
              </button>
              <button
                className={`filter-option ${
                  filterOptions.visibility === "public" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("visibility", "public")}
              >
                공개
              </button>
              <button
                className={`filter-option ${
                  filterOptions.visibility === "private" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("visibility", "private")}
              >
                비공개
              </button>
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">등록일</label>
            <div className="filter-options">
              <button
                className={`filter-option ${
                  filterOptions.dateRange === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "all")}
              >
                전체 기간
              </button>
              <button
                className={`filter-option ${
                  filterOptions.dateRange === "week" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "week")}
              >
                최근 1주일
              </button>
              <button
                className={`filter-option ${
                  filterOptions.dateRange === "month" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "month")}
              >
                최근 1개월
              </button>
              <button
                className={`filter-option ${
                  filterOptions.dateRange === "year" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "year")}
              >
                최근 1년
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="before-after-list-header">
        <h3 className="before-after-list-title">전후사진 목록</h3>
        <div className="before-after-count">
          총 <span className="count-highlight">{filteredGalleries.length}</span>
          건
        </div>
      </div>

      {filteredGalleries.length === 0 ? (
        <div className="admin-empty-state">
          <div className="admin-empty-icon">
            <Camera size={32} />
          </div>
          <h3 className="admin-empty-title">전후사진이 없습니다</h3>
          <p className="admin-empty-description">
            검색 조건에 맞는 전후사진이 없습니다. 다른 검색어나 필터를
            사용해보세요.
          </p>
        </div>
      ) : (
        <>
          <div className="before-after-grid">
            {currentGalleries.map((gallery) => (
              <div
                key={gallery.id}
                className="before-after-card"
                onClick={() => handleGalleryClick(gallery)}
              >
                <div className="before-after-card-image">
                  <div className="image-placeholder">
                    <FileImage size={32} />
                  </div>
                  <div className="image-count">
                    <Camera size={14} />
                    <span>{gallery.imageCount}장</span>
                  </div>
                  {gallery.featuredOrder !== null && (
                    <div className="featured-badge">
                      <span>추천</span>
                    </div>
                  )}
                </div>

                <div className="before-after-card-content">
                  <h4 className="before-after-title">{gallery.title}</h4>

                  <div className="before-after-procedure">
                    <Scissors size={14} />
                    <span>{gallery.procedure}</span>
                  </div>

                  <div className="before-after-patient">
                    <Users size={14} />
                    <span>
                      {gallery.patientName}
                      {gallery.patientAge && gallery.isPublic
                        ? ` (${gallery.patientAge}세, ${gallery.patientGender})`
                        : `(${gallery.patientGender})`}
                    </span>
                  </div>

                  <div className="before-after-info">
                    <div className="before-after-views">
                      <Eye size={14} />
                      <span>{gallery.views}</span>
                    </div>

                    <div className="before-after-date">
                      <Calendar size={14} />
                      <span>{formatDate(gallery.createdAt)}</span>
                    </div>
                  </div>

                  <div className="before-after-tags">
                    {gallery.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        # {tag}
                      </span>
                    ))}
                  </div>

                  <div className="before-after-status">
                    <div className="doctor">
                      <span>{gallery.doctor}</span>
                    </div>

                    <div
                      className={`visibility-badge ${
                        gallery.isPublic ? "public" : "private"
                      }`}
                    >
                      {gallery.isPublic ? (
                        <Eye size={14} />
                      ) : (
                        <EyeOff size={14} />
                      )}
                      <span>{gallery.isPublic ? "공개" : "비공개"}</span>
                    </div>
                  </div>
                </div>

                <div className="before-after-card-actions">
                  <button
                    className="action-button edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGalleryClick(gallery);
                    }}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="action-button delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteGallery(gallery.id);
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
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
        <BeforeAfterModal
          gallery={selectedGallery}
          onClose={handleCloseModal}
          onSave={handleSaveGallery}
          categories={categories}
        />
      )}
    </div>
  );
};

export default BeforeAfterManagement;
