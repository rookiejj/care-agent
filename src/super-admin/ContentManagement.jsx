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
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Layers,
  FileText,
  Image,
  Calendar,
  Tag,
  ArrowLeft,
  Star,
  ThumbsUp,
  MessageSquare,
  Users,
  BarChart3,
  Settings,
  Upload,
  Copy,
  ExternalLink,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";
import "./ContentManagement.css";
import ContentModal from "./components/ContentModal";

const ContentManagement = ({
  viewMode = "list",
  itemId,
  onBack,
  onViewDetail,
}) => {
  const [contents, setContents] = useState([]);
  const [filteredContents, setFilteredContents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    contentType: "all",
    status: "all",
    category: "all",
    platform: "all",
    priority: "all",
    dateRange: "all",
  });

  // 상세 보기 모드에서 사용할 컨텐츠 정보
  const [contentDetail, setContentDetail] = useState(null);

  // 페이지네이션 설정
  const contentsPerPage = 12;

  useEffect(() => {
    const loadContents = () => {
      setIsLoading(true);

      // 상세 보기 모드인 경우 해당 컨텐츠 데이터만 로드
      if (viewMode === "detail" && itemId) {
        setTimeout(() => {
          const mockContent = generateMockContentDetail(parseInt(itemId));
          setContentDetail(mockContent);
          setIsLoading(false);
        }, 800);
        return;
      }

      // 목록 모드인 경우 전체 컨텐츠 목록 로드
      setTimeout(() => {
        const mockContents = generateMockContents();
        setContents(mockContents);
        setFilteredContents(mockContents);
        setIsLoading(false);
      }, 800);
    };

    loadContents();
  }, [viewMode, itemId]);

  useEffect(() => {
    if (viewMode === "list") {
      // 검색어와 필터 적용
      let results = [...contents];

      // 검색어 필터링
      if (searchTerm) {
        results = results.filter(
          (content) =>
            content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            content.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            content.tags.some((tag) =>
              tag.toLowerCase().includes(searchTerm.toLowerCase())
            ) ||
            content.author.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // 컨텐츠 유형 필터링
      if (filterOptions.contentType !== "all") {
        results = results.filter(
          (content) => content.contentType === filterOptions.contentType
        );
      }

      // 상태 필터링
      if (filterOptions.status !== "all") {
        results = results.filter(
          (content) => content.status === filterOptions.status
        );
      }

      // 카테고리 필터링
      if (filterOptions.category !== "all") {
        results = results.filter(
          (content) => content.category === filterOptions.category
        );
      }

      // 플랫폼 필터링
      if (filterOptions.platform !== "all") {
        results = results.filter(
          (content) => content.platform === filterOptions.platform
        );
      }

      // 우선순위 필터링
      if (filterOptions.priority !== "all") {
        results = results.filter(
          (content) => content.priority === filterOptions.priority
        );
      }

      // 날짜 범위 필터링
      if (filterOptions.dateRange !== "all") {
        const now = new Date();
        const periodMap = {
          "1week": 7,
          "1month": 30,
          "3months": 90,
          "6months": 180,
          "1year": 365,
        };
        const days = periodMap[filterOptions.dateRange];
        if (days) {
          const cutoffDate = new Date(
            now.getTime() - days * 24 * 60 * 60 * 1000
          );
          results = results.filter(
            (content) => new Date(content.createdDate) >= cutoffDate
          );
        }
      }

      // 결과 정렬 (기본: 생성일 최신순)
      results.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));

      setFilteredContents(results);
      setCurrentPage(1);
    }
  }, [searchTerm, filterOptions, contents, viewMode]);

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

  const handleAddContent = () => {
    setSelectedContent(null);
    setShowModal(true);
  };

  const handleContentClick = (content) => {
    if (onViewDetail) {
      onViewDetail(content.id);
    } else {
      setSelectedContent(content);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedContent(null);
  };

  const handleSaveContent = (contentData) => {
    if (selectedContent) {
      setContents(
        contents.map((content) =>
          content.id === selectedContent.id
            ? {
                ...content,
                ...contentData,
                updatedDate: new Date().toISOString(),
              }
            : content
        )
      );
    } else {
      const newContent = {
        id: contents.length + 1,
        ...contentData,
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        author: "관리자",
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0,
      };
      setContents([...contents, newContent]);
    }
    setShowModal(false);
  };

  const handleDeleteContent = (id) => {
    setContents(contents.filter((content) => content.id !== id));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGoBack = () => {
    if (onBack) {
      onBack();
    }
  };

  // 컨텐츠 상태 변경
  const handleStatusChange = (contentId, newStatus) => {
    setContents(
      contents.map((content) =>
        content.id === contentId
          ? {
              ...content,
              status: newStatus,
              updatedDate: new Date().toISOString(),
            }
          : content
      )
    );
  };

  // 컨텐츠 유형 목록
  const contentTypes = [
    "banner",
    "notice",
    "faq",
    "terms",
    "privacy",
    "news",
    "event",
    "tutorial",
    "template",
    "category",
  ];

  // 카테고리 목록
  const categories = [
    "메인페이지",
    "병원소개",
    "진료안내",
    "예약시스템",
    "이벤트",
    "공지사항",
    "고객지원",
    "마케팅",
    "시스템",
  ];

  // 플랫폼 목록
  const platforms = ["web", "mobile", "tablet", "all"];

  // 페이지네이션 계산
  const indexOfLastContent = currentPage * contentsPerPage;
  const indexOfFirstContent = indexOfLastContent - contentsPerPage;
  const currentContents = filteredContents.slice(
    indexOfFirstContent,
    indexOfLastContent
  );
  const totalPages = Math.ceil(filteredContents.length / contentsPerPage);

  // 날짜 포맷 함수
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // 날짜 및 시간 포맷 함수
  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 숫자 포맷 함수
  const formatNumber = (number) => {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + "K";
    }
    return number.toString();
  };

  // 상태에 따른 배지 렌더링
  const renderStatusBadge = (status) => {
    switch (status) {
      case "published":
        return (
          <span className="super-admin-content-status-badge published">
            <CheckCircle size={14} /> 게시됨
          </span>
        );
      case "draft":
        return (
          <span className="super-admin-content-status-badge draft">
            <Edit size={14} /> 초안
          </span>
        );
      case "scheduled":
        return (
          <span className="super-admin-content-status-badge scheduled">
            <Calendar size={14} /> 예약됨
          </span>
        );
      case "archived":
        return (
          <span className="super-admin-content-status-badge archived">
            <XCircle size={14} /> 보관됨
          </span>
        );
      default:
        return null;
    }
  };

  // 컨텐츠 유형 배지 렌더링
  const renderContentTypeBadge = (contentType) => {
    const typeMap = {
      banner: { icon: Image, label: "배너", color: "blue" },
      notice: { icon: FileText, label: "공지", color: "green" },
      faq: { icon: MessageSquare, label: "FAQ", color: "purple" },
      terms: { icon: FileText, label: "약관", color: "gray" },
      privacy: { icon: FileText, label: "개인정보", color: "gray" },
      news: { icon: FileText, label: "뉴스", color: "amber" },
      event: { icon: Calendar, label: "이벤트", color: "red" },
      tutorial: { icon: FileText, label: "튜토리얼", color: "indigo" },
      template: { icon: Layers, label: "템플릿", color: "pink" },
      category: { icon: Tag, label: "카테고리", color: "teal" },
    };

    const typeInfo = typeMap[contentType] || {
      icon: FileText,
      label: contentType,
      color: "gray",
    };
    const IconComponent = typeInfo.icon;

    return (
      <span className={`super-admin-content-type-badge ${typeInfo.color}`}>
        <IconComponent size={14} />
        {typeInfo.label}
      </span>
    );
  };

  // 우선순위 배지 렌더링
  const renderPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return (
          <span className="super-admin-content-priority-badge high">
            <AlertTriangle size={14} /> 높음
          </span>
        );
      case "medium":
        return (
          <span className="super-admin-content-priority-badge medium">
            <Star size={14} /> 보통
          </span>
        );
      case "low":
        return (
          <span className="super-admin-content-priority-badge low">낮음</span>
        );
      default:
        return null;
    }
  };

  // 플랫폼 아이콘 렌더링
  const renderPlatformIcon = (platform) => {
    switch (platform) {
      case "web":
        return <Monitor size={16} className="platform-icon web" />;
      case "mobile":
        return <Smartphone size={16} className="platform-icon mobile" />;
      case "tablet":
        return <Tablet size={16} className="platform-icon tablet" />;
      case "all":
        return <Globe size={16} className="platform-icon all" />;
      default:
        return null;
    }
  };

  // 목업 컨텐츠 데이터 생성
  function generateMockContents() {
    const mockContents = [];
    const statuses = ["published", "draft", "scheduled", "archived"];
    const priorities = ["high", "medium", "low"];

    for (let i = 1; i <= 50; i++) {
      const contentType =
        contentTypes[Math.floor(Math.random() * contentTypes.length)];
      const category =
        categories[Math.floor(Math.random() * categories.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const priority =
        priorities[Math.floor(Math.random() * priorities.length)];
      const platform = platforms[Math.floor(Math.random() * platforms.length)];

      // 컨텐츠 제목 생성
      const titleTemplates = {
        banner: [`${category} 메인 배너 ${i}`, `신규 ${category} 홍보 배너`],
        notice: [
          `${category} 서비스 개선 안내`,
          `${category} 시스템 점검 공지`,
        ],
        faq: [`${category} 자주 묻는 질문`, `${category} 이용 가이드`],
        terms: [`${category} 이용약관`, `${category} 서비스 약관`],
        privacy: [
          `${category} 개인정보처리방침`,
          `${category} 개인정보 보호정책`,
        ],
        news: [`${category} 업데이트 소식`, `${category} 새로운 기능 출시`],
        event: [`${category} 특별 이벤트`, `${category} 할인 프로모션`],
        tutorial: [`${category} 사용법 가이드`, `${category} 튜토리얼`],
        template: [`${category} 기본 템플릿`, `${category} 커스텀 템플릿`],
        category: [`${category} 카테고리`, `신규 ${category} 분류`],
      };

      const titleOptions = titleTemplates[contentType] || [
        `${category} 컨텐츠 ${i}`,
      ];
      const title =
        titleOptions[Math.floor(Math.random() * titleOptions.length)];

      // 태그 생성
      const allTags = [
        "의료",
        "병원",
        "예약",
        "진료",
        "건강",
        "의사",
        "환자",
        "서비스",
        "이벤트",
        "할인",
      ];
      const tagCount = Math.floor(Math.random() * 3) + 1;
      const tags = [];
      for (let j = 0; j < tagCount; j++) {
        const tag = allTags[Math.floor(Math.random() * allTags.length)];
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      }

      // 생성일 및 수정일
      const createdDate = new Date(
        new Date().getFullYear(),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      ).toISOString();

      const updatedDate = new Date(
        new Date(createdDate).getTime() +
          Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
      ).toISOString();

      // 게시일 (예약 게시의 경우)
      const publishDate =
        status === "scheduled"
          ? new Date(
              new Date().getTime() +
                Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
            ).toISOString()
          : createdDate;

      mockContents.push({
        id: i,
        title,
        description: `${title}에 대한 상세 설명입니다. 이 컨텐츠는 ${category}와 관련된 중요한 정보를 포함하고 있습니다.`,
        contentType,
        category,
        status,
        priority,
        platform,
        author: ["관리자", "시스템", "마케팅팀", "개발팀"][
          Math.floor(Math.random() * 4)
        ],
        tags,
        createdDate,
        updatedDate,
        publishDate,
        expiryDate:
          Math.random() > 0.7
            ? new Date(
                new Date().getTime() +
                  Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000
              ).toISOString()
            : null,
        views: Math.floor(Math.random() * 10000),
        likes: Math.floor(Math.random() * 500),
        comments: Math.floor(Math.random() * 100),
        shares: Math.floor(Math.random() * 50),
        imageUrl:
          contentType === "banner"
            ? `/images/banners/banner${(i % 5) + 1}.jpg`
            : null,
        url: contentType === "banner" ? `/content/${contentType}/${i}` : null,
        isActive: Math.random() > 0.2,
        isFeatured: Math.random() > 0.8,
        sortOrder: i,
      });
    }

    return mockContents;
  }

  // 컨텐츠 상세 정보 생성
  function generateMockContentDetail(id) {
    const content =
      generateMockContents().find((c) => c.id === id) ||
      generateMockContents()[0];

    // 버전 히스토리
    const versionHistory = [];
    const versionCount = Math.floor(Math.random() * 5) + 1;
    for (let i = 1; i <= versionCount; i++) {
      versionHistory.push({
        version: `v1.${i}`,
        author: ["관리자", "시스템", "마케팅팀"][Math.floor(Math.random() * 3)],
        date: new Date(
          new Date(content.createdDate).getTime() + i * 24 * 60 * 60 * 1000
        ).toISOString(),
        changes: [
          "텍스트 내용 수정",
          "이미지 업데이트",
          "링크 수정",
          "스타일 변경",
          "오타 수정",
        ][Math.floor(Math.random() * 5)],
        size: `${Math.floor(Math.random() * 100) + 10}KB`,
      });
    }

    // 분석 데이터
    const analyticsData = {
      dailyViews: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(new Date().getTime() - (29 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        views: Math.floor(Math.random() * 200) + 10,
        uniqueViews: Math.floor(Math.random() * 150) + 5,
      })),
      demographics: {
        age: [
          { range: "20-29", percentage: 25 },
          { range: "30-39", percentage: 35 },
          { range: "40-49", percentage: 20 },
          { range: "50-59", percentage: 15 },
          { range: "60+", percentage: 5 },
        ],
        gender: [
          { type: "남성", percentage: 45 },
          { type: "여성", percentage: 55 },
        ],
        region: [
          { name: "서울", percentage: 40 },
          { name: "경기", percentage: 25 },
          { name: "부산", percentage: 10 },
          { name: "기타", percentage: 25 },
        ],
      },
      performance: {
        loadTime: `${(Math.random() * 2 + 0.5).toFixed(2)}s`,
        bounceRate: `${(Math.random() * 30 + 20).toFixed(1)}%`,
        avgTimeOnPage: `${Math.floor(Math.random() * 180 + 60)}s`,
        conversionRate: `${(Math.random() * 5 + 1).toFixed(2)}%`,
      },
    };

    // 댓글/피드백
    const feedback = [];
    const feedbackCount = Math.floor(Math.random() * 20) + 5;
    for (let i = 1; i <= feedbackCount; i++) {
      feedback.push({
        id: i,
        author: `사용자${i}`,
        content: [
          "유용한 정보네요!",
          "도움이 많이 되었습니다.",
          "내용이 명확해서 좋아요.",
          "더 자세한 설명이 있으면 좋겠어요.",
          "이해하기 쉽게 잘 설명되어 있어요.",
        ][Math.floor(Math.random() * 5)],
        rating: Math.floor(Math.random() * 3) + 3,
        date: new Date(
          new Date().getTime() -
            Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
        ).toISOString(),
        isPublic: Math.random() > 0.3,
      });
    }

    return {
      ...content,
      content: `# ${content.title}

이것은 ${content.category}와 관련된 상세한 컨텐츠입니다.

## 주요 내용

${content.description}

### 특징
- 사용자 친화적인 인터페이스
- 반응형 디자인 지원
- 다양한 플랫폼 호환성
- 실시간 업데이트

### 주의사항
- 정기적인 업데이트가 필요합니다
- 사용자 피드백을 반영해야 합니다
- 성능 최적화가 중요합니다

---

*마지막 업데이트: ${formatDate(content.updatedDate)}*`,
      versionHistory: versionHistory.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      ),
      analytics: analyticsData,
      feedback: feedback.sort((a, b) => new Date(b.date) - new Date(a.date)),
      seo: {
        metaTitle: content.title,
        metaDescription: content.description,
        keywords: content.tags.join(", "),
        ogImage: content.imageUrl,
        canonicalUrl: content.url,
      },
      settings: {
        allowComments: Math.random() > 0.5,
        enableAnalytics: Math.random() > 0.3,
        showAuthor: Math.random() > 0.4,
        enableSharing: Math.random() > 0.3,
        requireLogin: Math.random() > 0.7,
      },
    };
  }

  if (isLoading) {
    return (
      <div className="super-admin-loading-container">
        <div className="super-admin-loading-spinner"></div>
        <p>컨텐츠 데이터 로딩 중...</p>
      </div>
    );
  }

  // 상세 보기 모드 렌더링
  if (viewMode === "detail" && contentDetail) {
    return (
      <div className="super-admin-content-detail-page">
        <div className="super-admin-content-detail-header">
          <button className="back-button" onClick={handleGoBack}>
            <ArrowLeft size={20} />
          </button>
          <div className="super-admin-content-detail-title-section">
            <h2 className="super-admin-content-detail-title">
              {contentDetail.title}
            </h2>
            <div className="super-admin-content-detail-subtitle">
              {contentDetail.category} •{" "}
              {formatDateTime(contentDetail.updatedDate)}
            </div>
          </div>
          <div className="super-admin-content-detail-status">
            {renderStatusBadge(contentDetail.status)}
            {renderContentTypeBadge(contentDetail.contentType)}
          </div>
        </div>

        <div className="super-admin-content-detail-content">
          <div className="super-admin-content-detail-main">
            <div className="super-admin-content-detail-card">
              <div className="super-admin-content-detail-card-header">
                <h3>컨텐츠 정보</h3>
                <button className="edit-button">
                  <Edit size={16} />
                  <span>편집</span>
                </button>
              </div>
              <div className="super-admin-content-detail-card-content">
                <div className="super-admin-content-detail-info-grid">
                  <div className="super-admin-content-detail-info-item">
                    <div className="super-admin-content-detail-info-label">
                      <Layers size={16} />
                      <span>컨텐츠 유형</span>
                    </div>
                    <div className="super-admin-content-detail-info-value">
                      {renderContentTypeBadge(contentDetail.contentType)}
                    </div>
                  </div>
                  <div className="super-admin-content-detail-info-item">
                    <div className="super-admin-content-detail-info-label">
                      <Tag size={16} />
                      <span>카테고리</span>
                    </div>
                    <div className="super-admin-content-detail-info-value">
                      {contentDetail.category}
                    </div>
                  </div>
                  <div className="super-admin-content-detail-info-item">
                    <div className="super-admin-content-detail-info-label">
                      <Users size={16} />
                      <span>작성자</span>
                    </div>
                    <div className="super-admin-content-detail-info-value">
                      {contentDetail.author}
                    </div>
                  </div>
                  <div className="super-admin-content-detail-info-item">
                    <div className="super-admin-content-detail-info-label">
                      <Star size={16} />
                      <span>우선순위</span>
                    </div>
                    <div className="super-admin-content-detail-info-value">
                      {renderPriorityBadge(contentDetail.priority)}
                    </div>
                  </div>
                  <div className="super-admin-content-detail-info-item">
                    <div className="super-admin-content-detail-info-label">
                      <Globe size={16} />
                      <span>플랫폼</span>
                    </div>
                    <div className="super-admin-content-detail-info-value">
                      <div className="platform-info">
                        {renderPlatformIcon(contentDetail.platform)}
                        <span>
                          {contentDetail.platform === "all"
                            ? "전체"
                            : contentDetail.platform}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="super-admin-content-detail-info-item">
                    <div className="super-admin-content-detail-info-label">
                      <Calendar size={16} />
                      <span>생성일</span>
                    </div>
                    <div className="super-admin-content-detail-info-value">
                      {formatDateTime(contentDetail.createdDate)}
                    </div>
                  </div>
                  <div className="super-admin-content-detail-info-item">
                    <div className="super-admin-content-detail-info-label">
                      <Calendar size={16} />
                      <span>게시일</span>
                    </div>
                    <div className="super-admin-content-detail-info-value">
                      {formatDateTime(contentDetail.publishDate)}
                    </div>
                  </div>
                  <div className="super-admin-content-detail-info-item">
                    <div className="super-admin-content-detail-info-label">
                      <Tag size={16} />
                      <span>태그</span>
                    </div>
                    <div className="super-admin-content-detail-info-value">
                      <div className="super-admin-content-detail-tags">
                        {contentDetail.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="super-admin-content-detail-tag"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="super-admin-content-detail-card">
              <div className="super-admin-content-detail-card-header">
                <h3>성과 통계</h3>
              </div>
              <div className="super-admin-content-detail-card-content">
                <div className="super-admin-content-detail-stats-grid">
                  <div className="super-admin-content-detail-stat-card">
                    <div className="super-admin-content-detail-stat-value">
                      {formatNumber(contentDetail.views)}
                    </div>
                    <div className="super-admin-content-detail-stat-label">
                      조회수
                    </div>
                  </div>
                  <div className="super-admin-content-detail-stat-card">
                    <div className="super-admin-content-detail-stat-value">
                      {formatNumber(contentDetail.likes)}
                    </div>
                    <div className="super-admin-content-detail-stat-label">
                      좋아요
                    </div>
                  </div>
                  <div className="super-admin-content-detail-stat-card">
                    <div className="super-admin-content-detail-stat-value">
                      {formatNumber(contentDetail.comments)}
                    </div>
                    <div className="super-admin-content-detail-stat-label">
                      댓글
                    </div>
                  </div>
                  <div className="super-admin-content-detail-stat-card">
                    <div className="super-admin-content-detail-stat-value">
                      {formatNumber(contentDetail.shares)}
                    </div>
                    <div className="super-admin-content-detail-stat-label">
                      공유
                    </div>
                  </div>
                  <div className="super-admin-content-detail-stat-card">
                    <div className="super-admin-content-detail-stat-value">
                      {contentDetail.analytics.performance.loadTime}
                    </div>
                    <div className="super-admin-content-detail-stat-label">
                      로딩 시간
                    </div>
                  </div>
                  <div className="super-admin-content-detail-stat-card">
                    <div className="super-admin-content-detail-stat-value">
                      {contentDetail.analytics.performance.conversionRate}
                    </div>
                    <div className="super-admin-content-detail-stat-label">
                      전환율
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="super-admin-content-detail-card">
              <div className="super-admin-content-detail-card-header">
                <h3>컨텐츠 본문</h3>
                <button className="edit-button">
                  <Edit size={16} />
                  <span>편집</span>
                </button>
              </div>
              <div className="super-admin-content-detail-card-content">
                <div className="super-admin-content-preview">
                  <pre className="content-text">{contentDetail.content}</pre>
                </div>
              </div>
            </div>

            <div className="super-admin-content-detail-card">
              <div className="super-admin-content-detail-card-header">
                <h3>버전 히스토리</h3>
                <button className="view-all-button">
                  <span>전체 보기</span>
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="super-admin-content-detail-card-content">
                <div className="super-admin-content-version-list">
                  {contentDetail.versionHistory.slice(0, 5).map((version) => (
                    <div
                      key={version.version}
                      className="super-admin-content-version-item"
                    >
                      <div className="super-admin-content-version-info">
                        <div className="super-admin-content-version-number">
                          {version.version}
                        </div>
                        <div className="super-admin-content-version-details">
                          <div className="super-admin-content-version-author">
                            {version.author}
                          </div>
                          <div className="super-admin-content-version-changes">
                            {version.changes}
                          </div>
                        </div>
                      </div>
                      <div className="super-admin-content-version-meta">
                        <div className="super-admin-content-version-date">
                          {formatDateTime(version.date)}
                        </div>
                        <div className="super-admin-content-version-size">
                          {version.size}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="super-admin-content-detail-card">
              <div className="super-admin-content-detail-card-header">
                <h3>사용자 피드백</h3>
                <button className="view-all-button">
                  <span>전체 보기</span>
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="super-admin-content-detail-card-content">
                <div className="super-admin-content-feedback-list">
                  {contentDetail.feedback.slice(0, 3).map((feedback) => (
                    <div
                      key={feedback.id}
                      className="super-admin-content-feedback-item"
                    >
                      <div className="super-admin-content-feedback-header">
                        <div className="super-admin-content-feedback-author">
                          {feedback.author}
                        </div>
                        <div className="super-admin-content-feedback-meta">
                          <div className="super-admin-content-feedback-rating">
                            <Star size={14} className="star-icon" />
                            <span>{feedback.rating}</span>
                          </div>
                          <div className="super-admin-content-feedback-date">
                            {formatDate(feedback.date)}
                          </div>
                          {!feedback.isPublic && (
                            <span className="super-admin-feedback-private-badge">
                              <AlertTriangle size={12} />
                              비공개
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="super-admin-content-feedback-content">
                        {feedback.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="super-admin-content-detail-sidebar">
            <div className="super-admin-content-detail-card">
              <div className="super-admin-content-detail-card-header">
                <h3>컨텐츠 관리</h3>
              </div>
              <div className="super-admin-content-detail-card-content">
                <div className="super-admin-content-management-buttons">
                  <button
                    className={`super-admin-content-action-button ${
                      contentDetail.status === "published" ? "active" : ""
                    }`}
                    disabled={contentDetail.status === "published"}
                    onClick={() =>
                      handleStatusChange(contentDetail.id, "published")
                    }
                  >
                    <CheckCircle size={16} />
                    <span>게시</span>
                  </button>
                  <button
                    className={`super-admin-content-action-button ${
                      contentDetail.status === "draft" ? "active" : ""
                    }`}
                    disabled={contentDetail.status === "draft"}
                    onClick={() =>
                      handleStatusChange(contentDetail.id, "draft")
                    }
                  >
                    <Edit size={16} />
                    <span>초안으로 전환</span>
                  </button>
                  <button
                    className={`super-admin-content-action-button ${
                      contentDetail.status === "archived" ? "active" : ""
                    }`}
                    disabled={contentDetail.status === "archived"}
                    onClick={() =>
                      handleStatusChange(contentDetail.id, "archived")
                    }
                  >
                    <XCircle size={16} />
                    <span>보관</span>
                  </button>
                  <button className="super-admin-content-action-button">
                    <Copy size={16} />
                    <span>복제</span>
                  </button>
                  <button className="super-admin-content-action-button danger">
                    <Trash2 size={16} />
                    <span>삭제</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="super-admin-content-detail-card">
              <div className="super-admin-content-detail-card-header">
                <h3>SEO 설정</h3>
                <button className="edit-button">
                  <Edit size={16} />
                  <span>편집</span>
                </button>
              </div>
              <div className="super-admin-content-detail-card-content">
                <div className="super-admin-content-seo-list">
                  <div className="super-admin-content-seo-item">
                    <div className="super-admin-content-seo-label">
                      메타 제목
                    </div>
                    <div className="super-admin-content-seo-value">
                      {contentDetail.seo.metaTitle}
                    </div>
                  </div>
                  <div className="super-admin-content-seo-item">
                    <div className="super-admin-content-seo-label">
                      메타 설명
                    </div>
                    <div className="super-admin-content-seo-value">
                      {contentDetail.seo.metaDescription}
                    </div>
                  </div>
                  <div className="super-admin-content-seo-item">
                    <div className="super-admin-content-seo-label">키워드</div>
                    <div className="super-admin-content-seo-value">
                      {contentDetail.seo.keywords}
                    </div>
                  </div>
                  {contentDetail.seo.canonicalUrl && (
                    <div className="super-admin-content-seo-item">
                      <div className="super-admin-content-seo-label">
                        정규 URL
                      </div>
                      <div className="super-admin-content-seo-value">
                        <a
                          href={contentDetail.seo.canonicalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {contentDetail.seo.canonicalUrl}
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="super-admin-content-detail-card">
              <div className="super-admin-content-detail-card-header">
                <h3>컨텐츠 설정</h3>
                <button className="edit-button">
                  <Edit size={16} />
                  <span>편집</span>
                </button>
              </div>
              <div className="super-admin-content-detail-card-content">
                <div className="super-admin-content-settings-list">
                  <div className="super-admin-content-settings-item">
                    <div className="super-admin-content-settings-label">
                      댓글 허용
                    </div>
                    <div className="super-admin-content-settings-value">
                      <span
                        className={`super-admin-content-settings-badge ${
                          contentDetail.settings.allowComments
                            ? "enabled"
                            : "disabled"
                        }`}
                      >
                        {contentDetail.settings.allowComments ? "허용" : "차단"}
                      </span>
                    </div>
                  </div>
                  <div className="super-admin-content-settings-item">
                    <div className="super-admin-content-settings-label">
                      분석 활성화
                    </div>
                    <div className="super-admin-content-settings-value">
                      <span
                        className={`super-admin-content-settings-badge ${
                          contentDetail.settings.enableAnalytics
                            ? "enabled"
                            : "disabled"
                        }`}
                      >
                        {contentDetail.settings.enableAnalytics
                          ? "활성"
                          : "비활성"}
                      </span>
                    </div>
                  </div>
                  <div className="super-admin-content-settings-item">
                    <div className="super-admin-content-settings-label">
                      작성자 표시
                    </div>
                    <div className="super-admin-content-settings-value">
                      <span
                        className={`super-admin-content-settings-badge ${
                          contentDetail.settings.showAuthor
                            ? "enabled"
                            : "disabled"
                        }`}
                      >
                        {contentDetail.settings.showAuthor ? "표시" : "숨김"}
                      </span>
                    </div>
                  </div>
                  <div className="super-admin-content-settings-item">
                    <div className="super-admin-content-settings-label">
                      공유 허용
                    </div>
                    <div className="super-admin-content-settings-value">
                      <span
                        className={`super-admin-content-settings-badge ${
                          contentDetail.settings.enableSharing
                            ? "enabled"
                            : "disabled"
                        }`}
                      >
                        {contentDetail.settings.enableSharing ? "허용" : "차단"}
                      </span>
                    </div>
                  </div>
                  <div className="super-admin-content-settings-item">
                    <div className="super-admin-content-settings-label">
                      로그인 필요
                    </div>
                    <div className="super-admin-content-settings-value">
                      <span
                        className={`super-admin-content-settings-badge ${
                          contentDetail.settings.requireLogin
                            ? "enabled"
                            : "disabled"
                        }`}
                      >
                        {contentDetail.settings.requireLogin
                          ? "필요"
                          : "불필요"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="super-admin-content-detail-card">
              <div className="super-admin-content-detail-card-header">
                <h3>게시 일정</h3>
                <button className="edit-button">
                  <Edit size={16} />
                  <span>편집</span>
                </button>
              </div>
              <div className="super-admin-content-detail-card-content">
                <div className="super-admin-content-schedule-list">
                  <div className="super-admin-content-schedule-item">
                    <div className="super-admin-content-schedule-label">
                      게시일
                    </div>
                    <div className="super-admin-content-schedule-value">
                      {formatDateTime(contentDetail.publishDate)}
                    </div>
                  </div>
                  {contentDetail.expiryDate && (
                    <div className="super-admin-content-schedule-item">
                      <div className="super-admin-content-schedule-label">
                        만료일
                      </div>
                      <div className="super-admin-content-schedule-value">
                        {formatDateTime(contentDetail.expiryDate)}
                      </div>
                    </div>
                  )}
                  <div className="super-admin-content-schedule-item">
                    <div className="super-admin-content-schedule-label">
                      활성 상태
                    </div>
                    <div className="super-admin-content-schedule-value">
                      <span
                        className={`super-admin-content-active-badge ${
                          contentDetail.isActive ? "active" : "inactive"
                        }`}
                      >
                        {contentDetail.isActive ? "활성" : "비활성"}
                      </span>
                    </div>
                  </div>
                  {contentDetail.isFeatured && (
                    <div className="super-admin-content-schedule-item">
                      <div className="super-admin-content-schedule-label">
                        추천 컨텐츠
                      </div>
                      <div className="super-admin-content-schedule-value">
                        <span className="super-admin-content-featured-badge">
                          <Star size={12} />
                          추천
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 목록 모드 렌더링
  return (
    <div className="super-admin-content-management">
      <div className="super-admin-section-header">
        <h2 className="super-admin-section-title">컨텐츠 관리</h2>
        <p className="super-admin-section-description">
          플랫폼의 모든 컨텐츠(배너, 공지사항, FAQ, 약관 등)를 통합 관리합니다.
        </p>
      </div>

      <div className="super-admin-content-management-actions">
        <div className="super-admin-content-search-filter-container">
          <div className="super-admin-content-admin-search-bar">
            <Search size={18} className="super-admin-content-search-icon" />
            <input
              type="text"
              placeholder="제목, 설명, 태그, 작성자 검색..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="super-admin-content-admin-search-input"
            />
          </div>

          <button
            className="super-admin-button super-admin-button-secondary"
            onClick={toggleFilters}
          >
            <Filter size={16} />
            필터
          </button>
        </div>

        <div className="super-admin-content-action-buttons">
          <button className="super-admin-button super-admin-button-secondary">
            <Upload size={16} />
            일괄 업로드
          </button>
          <button className="super-admin-button super-admin-button-secondary">
            <Download size={16} />
            내보내기
          </button>
          <button
            className="super-admin-button super-admin-button-primary"
            onClick={handleAddContent}
          >
            <Plus size={16} />
            컨텐츠 생성
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="super-admin-filters">
          <div className="super-admin-filter-group">
            <label className="super-admin-filter-label">컨텐츠 유형</label>
            <div className="super-admin-filter-options">
              <button
                className={`super-admin-filter-option ${
                  filterOptions.contentType === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("contentType", "all")}
              >
                전체
              </button>
              {contentTypes.map((type, index) => (
                <button
                  key={index}
                  className={`super-admin-filter-option ${
                    filterOptions.contentType === type ? "active" : ""
                  }`}
                  onClick={() => handleFilterChange("contentType", type)}
                >
                  {type === "banner"
                    ? "배너"
                    : type === "notice"
                    ? "공지"
                    : type === "faq"
                    ? "FAQ"
                    : type === "terms"
                    ? "약관"
                    : type === "privacy"
                    ? "개인정보"
                    : type === "news"
                    ? "뉴스"
                    : type === "event"
                    ? "이벤트"
                    : type === "tutorial"
                    ? "튜토리얼"
                    : type === "template"
                    ? "템플릿"
                    : type === "category"
                    ? "카테고리"
                    : type}
                </button>
              ))}
            </div>
          </div>

          <div className="super-admin-filter-group">
            <label className="super-admin-filter-label">상태</label>
            <div className="super-admin-filter-options">
              <button
                className={`super-admin-filter-option ${
                  filterOptions.status === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "all")}
              >
                전체
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.status === "published" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "published")}
              >
                게시됨
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.status === "draft" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "draft")}
              >
                초안
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.status === "scheduled" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "scheduled")}
              >
                예약됨
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.status === "archived" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "archived")}
              >
                보관됨
              </button>
            </div>
          </div>

          <div className="super-admin-filter-group">
            <label className="super-admin-filter-label">카테고리</label>
            <div className="super-admin-filter-options">
              <button
                className={`super-admin-filter-option ${
                  filterOptions.category === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("category", "all")}
              >
                전체
              </button>
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`super-admin-filter-option ${
                    filterOptions.category === category ? "active" : ""
                  }`}
                  onClick={() => handleFilterChange("category", category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="super-admin-filter-group">
            <label className="super-admin-filter-label">플랫폼</label>
            <div className="super-admin-filter-options">
              <button
                className={`super-admin-filter-option ${
                  filterOptions.platform === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("platform", "all")}
              >
                전체
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.platform === "web" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("platform", "web")}
              >
                웹
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.platform === "mobile" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("platform", "mobile")}
              >
                모바일
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.platform === "tablet" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("platform", "tablet")}
              >
                태블릿
              </button>
            </div>
          </div>

          <div className="super-admin-filter-group">
            <label className="super-admin-filter-label">우선순위</label>
            <div className="super-admin-filter-options">
              <button
                className={`super-admin-filter-option ${
                  filterOptions.priority === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("priority", "all")}
              >
                전체
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.priority === "high" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("priority", "high")}
              >
                높음
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.priority === "medium" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("priority", "medium")}
              >
                보통
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.priority === "low" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("priority", "low")}
              >
                낮음
              </button>
            </div>
          </div>

          <div className="super-admin-filter-group">
            <label className="super-admin-filter-label">생성 기간</label>
            <div className="super-admin-filter-options">
              <button
                className={`super-admin-filter-option ${
                  filterOptions.dateRange === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "all")}
              >
                전체
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.dateRange === "1week" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "1week")}
              >
                1주일
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.dateRange === "1month" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "1month")}
              >
                1개월
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.dateRange === "3months" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "3months")}
              >
                3개월
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.dateRange === "6months" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "6months")}
              >
                6개월
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.dateRange === "1year" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("dateRange", "1year")}
              >
                1년
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="super-admin-content-list-header">
        <h3 className="super-admin-content-list-title">컨텐츠 목록</h3>
        <div className="super-admin-content-count">
          총 <span className="count-highlight">{filteredContents.length}</span>
          개
        </div>
      </div>

      {filteredContents.length === 0 ? (
        <div className="super-admin-empty-state">
          <div className="super-admin-empty-icon">
            <Layers size={48} />
          </div>
          <h3 className="super-admin-empty-title">컨텐츠가 없습니다</h3>
          <p className="super-admin-empty-description">
            검색 조건에 맞는 컨텐츠가 없습니다. 다른 검색어나 필터를
            사용해보세요.
          </p>
        </div>
      ) : (
        <>
          <div className="super-admin-content-grid">
            {currentContents.map((content) => (
              <div
                key={content.id}
                className="super-admin-content-card"
                onClick={() => handleContentClick(content)}
              >
                {content.imageUrl && (
                  <div className="super-admin-content-card-image">
                    <img src={content.imageUrl} alt={content.title} />
                    <div className="super-admin-content-card-overlay">
                      {renderContentTypeBadge(content.contentType)}
                    </div>
                  </div>
                )}
                <div className="super-admin-content-card-content">
                  <div className="super-admin-content-card-header">
                    <h4 className="super-admin-content-card-title">
                      {content.title}
                    </h4>
                    <div className="super-admin-content-card-status">
                      {renderStatusBadge(content.status)}
                    </div>
                  </div>

                  <div className="super-admin-content-card-meta">
                    <div className="super-admin-content-card-category">
                      <Tag size={14} />
                      {content.category}
                    </div>
                    <div className="super-admin-content-card-platform">
                      {renderPlatformIcon(content.platform)}
                    </div>
                    {content.priority !== "low" &&
                      renderPriorityBadge(content.priority)}
                  </div>

                  <p className="super-admin-content-card-description">
                    {content.description}
                  </p>

                  <div className="super-admin-content-card-tags">
                    {content.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="super-admin-content-card-tag"
                      >
                        {tag}
                      </span>
                    ))}
                    {content.tags.length > 3 && (
                      <span className="super-admin-content-card-tag-more">
                        +{content.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="super-admin-content-card-stats">
                    <div className="super-admin-content-card-stat">
                      <Eye size={14} />
                      <span>{formatNumber(content.views)}</span>
                    </div>
                    <div className="super-admin-content-card-stat">
                      <ThumbsUp size={14} />
                      <span>{formatNumber(content.likes)}</span>
                    </div>
                    <div className="super-admin-content-card-stat">
                      <MessageSquare size={14} />
                      <span>{formatNumber(content.comments)}</span>
                    </div>
                  </div>

                  <div className="super-admin-content-card-footer">
                    <div className="super-admin-content-card-author">
                      <Users size={14} />
                      {content.author}
                    </div>
                    <div className="super-admin-content-card-date">
                      {formatDate(content.updatedDate)}
                    </div>
                  </div>
                </div>

                <div
                  className="super-admin-content-card-actions"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="action-button view"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetail: handleContentClick(content);
                    }}
                    title="상세 보기"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    className="action-button edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContentClick(content);
                    }}
                    title="편집"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="action-button delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteContent(content.id);
                    }}
                    title="삭제"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="super-admin-pagination">
              <button
                className={`super-admin-pagination-button ${
                  currentPage === 1 ? "disabled" : ""
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} />
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;

                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 2 &&
                    pageNumber <= currentPage + 2)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      className={`super-admin-pagination-button ${
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
                  return (
                    <span key={pageNumber} className="pagination-ellipsis">
                      ...
                    </span>
                  );
                }

                return null;
              })}

              <button
                className={`super-admin-pagination-button ${
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
        <ContentModal
          content={selectedContent}
          onClose={handleCloseModal}
          onSave={handleSaveContent}
          contentTypes={contentTypes}
          categories={categories}
          platforms={platforms}
        />
      )}
    </div>
  );
};

export default ContentManagement;
