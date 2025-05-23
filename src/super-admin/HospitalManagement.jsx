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
  Building,
  Phone,
  Mail,
  Clock,
  MapPin,
  Tag,
  FileText,
  ArrowLeft,
  Star,
  Layers,
} from "lucide-react";
import "./HospitalManagement.css";
import HospitalModal from "./components/HospitalModal";

const HospitalManagement = ({
  viewMode = "list",
  itemId,
  onBack,
  onViewDetail,
}) => {
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    type: "all",
    status: "all",
    region: "all",
  });

  // 상세 보기 모드에서 사용할 병원 정보
  const [hospitalDetail, setHospitalDetail] = useState(null);

  // 페이지네이션 설정
  const hospitalsPerPage = 10;

  useEffect(() => {
    // 실제 앱에서는 API 호출을 통해 병원 데이터를 가져옴
    // 여기서는 목업 데이터 사용
    const loadHospitals = () => {
      setIsLoading(true);

      // 상세 보기 모드인 경우 해당 병원 데이터만 로드
      if (viewMode === "detail" && itemId) {
        setTimeout(() => {
          const mockHospital = generateMockHospitalDetail(parseInt(itemId));
          setHospitalDetail(mockHospital);
          setIsLoading(false);
        }, 800);
        return;
      }

      // 목록 모드인 경우 전체 병원 목록 로드
      setTimeout(() => {
        const mockHospitals = generateMockHospitals();
        setHospitals(mockHospitals);
        setFilteredHospitals(mockHospitals);
        setIsLoading(false);
      }, 800);
    };

    loadHospitals();
  }, [viewMode, itemId]);

  useEffect(() => {
    // 목록 모드에서만 필터링 적용
    if (viewMode === "list") {
      // 검색어와 필터 적용
      let results = [...hospitals];

      // 검색어 필터링
      if (searchTerm) {
        results = results.filter(
          (hospital) =>
            hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hospital.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hospital.phone.includes(searchTerm) ||
            hospital.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hospital.categories.some((category) =>
              category.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
      }

      // 유형 필터링
      if (filterOptions.type !== "all") {
        results = results.filter(
          (hospital) => hospital.type === filterOptions.type
        );
      }

      // 상태 필터링
      if (filterOptions.status !== "all") {
        results = results.filter(
          (hospital) => hospital.status === filterOptions.status
        );
      }

      // 지역 필터링
      if (filterOptions.region !== "all") {
        results = results.filter(
          (hospital) => hospital.region === filterOptions.region
        );
      }

      // 결과 정렬 (기본: 병원명순)
      results.sort((a, b) => a.name.localeCompare(b.name));

      setFilteredHospitals(results);
      setCurrentPage(1);
    }
  }, [searchTerm, filterOptions, hospitals, viewMode]);

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

  const handleAddHospital = () => {
    setSelectedHospital(null);
    setShowModal(true);
  };

  const handleHospitalClick = (hospital) => {
    if (onViewDetail) {
      // 상세 보기 페이지로 이동
      onViewDetail(hospital.id);
    } else {
      // 편집 모달 열기
      setSelectedHospital(hospital);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedHospital(null);
  };

  const handleSaveHospital = (hospitalData) => {
    if (selectedHospital) {
      // 기존 병원 정보 수정
      setHospitals(
        hospitals.map((hospital) =>
          hospital.id === selectedHospital.id
            ? { ...hospital, ...hospitalData }
            : hospital
        )
      );
    } else {
      // 새 병원 추가
      const newHospital = {
        id: hospitals.length + 1,
        ...hospitalData,
        status: "pending",
        registrationDate: new Date().toISOString(),
      };
      setHospitals([...hospitals, newHospital]);
    }
    setShowModal(false);
  };

  const handleDeleteHospital = (id) => {
    setHospitals(hospitals.filter((hospital) => hospital.id !== id));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGoBack = () => {
    if (onBack) {
      onBack();
    }
  };

  // 병원 유형 목록
  const hospitalTypes = [
    "의원",
    "병원",
    "종합병원",
    "대학병원",
    "성형외과",
    "피부과",
    "치과",
  ];

  // 지역 목록
  const regions = [
    "서울",
    "부산",
    "인천",
    "대구",
    "광주",
    "대전",
    "울산",
    "경기",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "경북",
    "경남",
    "제주",
  ];

  // 페이지네이션 계산
  const indexOfLastHospital = currentPage * hospitalsPerPage;
  const indexOfFirstHospital = indexOfLastHospital - hospitalsPerPage;
  const currentHospitals = filteredHospitals.slice(
    indexOfFirstHospital,
    indexOfLastHospital
  );
  const totalPages = Math.ceil(filteredHospitals.length / hospitalsPerPage);

  // 날짜 포맷 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // 상태에 따른 배지 렌더링
  const renderStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="super-admin-status-badge active">
            <CheckCircle size={14} /> 활성
          </span>
        );
      case "pending":
        return (
          <span className="super-admin-status-badge pending">
            <AlertTriangle size={14} /> 승인 대기
          </span>
        );
      case "suspended":
        return (
          <span className="super-admin-status-badge suspended">
            <XCircle size={14} /> 일시 중지
          </span>
        );
      case "inactive":
        return (
          <span className="super-admin-status-badge inactive">
            <XCircle size={14} /> 비활성
          </span>
        );
      default:
        return null;
    }
  };

  // 목업 병원 데이터 생성
  function generateMockHospitals() {
    const mockHospitals = [];
    const statuses = ["active", "pending", "suspended", "inactive"];
    const hospitalTypes = [
      "의원",
      "병원",
      "종합병원",
      "대학병원",
      "성형외과",
      "피부과",
      "치과",
    ];

    for (let i = 1; i <= 50; i++) {
      const type =
        hospitalTypes[Math.floor(Math.random() * hospitalTypes.length)];
      const region = regions[Math.floor(Math.random() * regions.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      // 병원 카테고리 설정
      const categories = [];
      const categoryCount = Math.floor(Math.random() * 3) + 1;
      const allCategories = [
        "내과",
        "외과",
        "정형외과",
        "신경외과",
        "소아과",
        "산부인과",
        "안과",
        "이비인후과",
        "피부과",
        "비뇨기과",
        "재활의학과",
        "성형외과",
        "미용성형",
      ];

      for (let j = 0; j < categoryCount; j++) {
        const category =
          allCategories[Math.floor(Math.random() * allCategories.length)];
        if (!categories.includes(category)) {
          categories.push(category);
        }
      }

      mockHospitals.push({
        id: i,
        name: `${region} ${type} ${i}`,
        type: type,
        region: region,
        address: `${region} ${
          ["중구", "서구", "동구", "남구", "북구", "강남구", "송파구"][
            Math.floor(Math.random() * 7)
          ]
        } 메디컬로 ${Math.floor(Math.random() * 100) + 1}`,
        phone: `02-${1000 + Math.floor(Math.random() * 9000)}-${
          1000 + Math.floor(Math.random() * 9000)
        }`,
        email: `hospital${i}@example.com`,
        categories: categories,
        status: status,
        registrationDate: new Date(
          new Date().getFullYear(),
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 28) + 1
        ).toISOString(),
        appointmentsCount: Math.floor(Math.random() * 1000) + 100,
        rating: (Math.random() * 2 + 3).toFixed(1),
      });
    }

    return mockHospitals;
  }

  // 병원 상세 정보 생성
  function generateMockHospitalDetail(id) {
    const type =
      hospitalTypes[Math.floor(Math.random() * hospitalTypes.length)];
    const region = regions[Math.floor(Math.random() * regions.length)];
    const status = ["active", "pending", "suspended", "inactive"][
      Math.floor(Math.random() * 4)
    ];

    // 병원 카테고리 설정
    const categories = [];
    const categoryCount = Math.floor(Math.random() * 3) + 1;
    const allCategories = [
      "내과",
      "외과",
      "정형외과",
      "신경외과",
      "소아과",
      "산부인과",
      "안과",
      "이비인후과",
      "피부과",
      "비뇨기과",
      "재활의학과",
      "성형외과",
      "미용성형",
    ];

    for (let j = 0; j < categoryCount; j++) {
      const category =
        allCategories[Math.floor(Math.random() * allCategories.length)];
      if (!categories.includes(category)) {
        categories.push(category);
      }
    }

    // 병원 운영 시간
    const operatingHours = {
      monday: "09:00-18:00",
      tuesday: "09:00-18:00",
      wednesday: "09:00-18:00",
      thursday: "09:00-18:00",
      friday: "09:00-18:00",
      saturday: Math.random() > 0.5 ? "09:00-13:00" : "휴진",
      sunday: "휴진",
    };

    // 의사 정보
    const doctors = [];
    const doctorCount = Math.floor(Math.random() * 5) + 3;
    for (let j = 1; j <= doctorCount; j++) {
      doctors.push({
        id: j,
        name: `김의사${j}`,
        specialties: [
          categories[Math.floor(Math.random() * categories.length)],
        ],
        profileImage: `/images/doctors/doctor${(j % 3) + 1}.jpg`,
      });
    }

    // 리뷰 정보
    const reviews = [];
    const reviewCount = Math.floor(Math.random() * 20) + 5;
    for (let j = 1; j <= reviewCount; j++) {
      reviews.push({
        id: j,
        userName: `사용자${j}`,
        rating: Math.floor(Math.random() * 3) + 3,
        content: `이 병원은 ${
          [
            "정말 좋아요",
            "서비스가 훌륭해요",
            "의사선생님이 친절해요",
            "진료가 꼼꼼해요",
          ][Math.floor(Math.random() * 4)]
        }. ${
          ["다시 방문할 것 같아요", "추천합니다", "만족스러웠어요"][
            Math.floor(Math.random() * 3)
          ]
        }.`,
        date: new Date(
          new Date().getFullYear(),
          new Date().getMonth() - Math.floor(Math.random() * 3),
          Math.floor(Math.random() * 28) + 1
        ).toISOString(),
      });
    }

    // 통계 데이터
    const stats = {
      appointmentsTotal: Math.floor(Math.random() * 5000) + 1000,
      appointmentsMonthly: Math.floor(Math.random() * 300) + 100,
      usersTotal: Math.floor(Math.random() * 3000) + 500,
      revenueTotal: (Math.floor(Math.random() * 100) + 50) * 1000000,
      revenueMonthly: (Math.floor(Math.random() * 10) + 5) * 1000000,
      averageRating: (Math.random() * 2 + 3).toFixed(1),
    };

    // 결제 정보
    const payments = [];
    const paymentCount = Math.floor(Math.random() * 5) + 3;
    for (let j = 1; j <= paymentCount; j++) {
      payments.push({
        id: j,
        date: new Date(
          new Date().getFullYear(),
          new Date().getMonth() - Math.floor(Math.random() * 2),
          Math.floor(Math.random() * 28) + 1
        ).toISOString(),
        amount: (Math.floor(Math.random() * 50) + 10) * 10000,
        status: ["completed", "pending", "failed"][
          Math.floor(Math.random() * 3)
        ],
        type: ["subscription", "commission", "fee"][
          Math.floor(Math.random() * 3)
        ],
      });
    }

    // 관리자 정보
    const admins = [];
    const adminCount = Math.floor(Math.random() * 2) + 1;
    for (let j = 1; j <= adminCount; j++) {
      admins.push({
        id: j,
        name: `관리자${j}`,
        email: `admin${j}@hospital${id}.com`,
        role: ["owner", "manager", "staff"][Math.floor(Math.random() * 3)],
        lastLogin: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() - Math.floor(Math.random() * 7)
        ).toISOString(),
      });
    }

    return {
      id: id,
      name: `${region} ${type} ${id}`,
      type: type,
      region: region,
      address: `${region} ${
        ["중구", "서구", "동구", "남구", "북구", "강남구", "송파구"][
          Math.floor(Math.random() * 7)
        ]
      } 메디컬로 ${Math.floor(Math.random() * 100) + 1}`,
      phone: `02-${1000 + Math.floor(Math.random() * 9000)}-${
        1000 + Math.floor(Math.random() * 9000)
      }`,
      email: `hospital${id}@example.com`,
      website: `https://hospital${id}.example.com`,
      categories: categories,
      status: status,
      registrationDate: new Date(
        new Date().getFullYear() - Math.floor(Math.random() * 3),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      ).toISOString(),
      lastUpdate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - Math.floor(Math.random() * 30)
      ).toISOString(),
      description: `${region} ${type}은 최상의 의료 서비스를 제공하기 위해 노력하고 있습니다. 숙련된 의료진과 최신 장비를 갖추고 있으며, 환자 중심의 진료 환경을 조성하고 있습니다.`,
      operatingHours: operatingHours,
      doctors: doctors,
      reviews: reviews,
      stats: stats,
      payments: payments,
      admins: admins,
      images: [
        `/images/hospitals/hospital${Math.floor(Math.random() * 3) + 1}.jpg`,
        `/images/hospitals/hospital${Math.floor(Math.random() * 3) + 1}.jpg`,
      ],
      location: {
        latitude: 37.5 + Math.random() * 0.1,
        longitude: 127 + Math.random() * 0.1,
      },
    };
  }

  if (isLoading) {
    return (
      <div className="super-admin-loading-container">
        <div className="super-admin-loading-spinner"></div>
        <p>병원/시설 데이터 로딩 중...</p>
      </div>
    );
  }

  // 상세 보기 모드 렌더링
  if (viewMode === "detail" && hospitalDetail) {
    return (
      <div className="hospital-detail-page">
        <div className="hospital-detail-header">
          <button className="back-button" onClick={handleGoBack}>
            <ArrowLeft size={20} />
          </button>
          <h2 className="hospital-detail-title">{hospitalDetail.name}</h2>
          <div className="hospital-detail-status">
            {renderStatusBadge(hospitalDetail.status)}
          </div>
        </div>

        <div className="hospital-detail-content">
          <div className="hospital-detail-main">
            <div className="hospital-detail-card">
              <div className="hospital-detail-card-header">
                <h3>기본 정보</h3>
                <button className="edit-button">
                  <Edit size={16} />
                  <span>편집</span>
                </button>
              </div>
              <div className="hospital-detail-card-content">
                <div className="hospital-detail-info-grid">
                  <div className="hospital-detail-info-item">
                    <div className="hospital-detail-info-label">
                      <Building size={16} />
                      <span>병원 유형</span>
                    </div>
                    <div className="hospital-detail-info-value">
                      {hospitalDetail.type}
                    </div>
                  </div>
                  <div className="hospital-detail-info-item">
                    <div className="hospital-detail-info-label">
                      <MapPin size={16} />
                      <span>지역</span>
                    </div>
                    <div className="hospital-detail-info-value">
                      {hospitalDetail.region}
                    </div>
                  </div>
                  <div className="hospital-detail-info-item">
                    <div className="hospital-detail-info-label">
                      <MapPin size={16} />
                      <span>주소</span>
                    </div>
                    <div className="hospital-detail-info-value">
                      {hospitalDetail.address}
                    </div>
                  </div>
                  <div className="hospital-detail-info-item">
                    <div className="hospital-detail-info-label">
                      <Phone size={16} />
                      <span>전화번호</span>
                    </div>
                    <div className="hospital-detail-info-value">
                      {hospitalDetail.phone}
                    </div>
                  </div>
                  <div className="hospital-detail-info-item">
                    <div className="hospital-detail-info-label">
                      <Mail size={16} />
                      <span>이메일</span>
                    </div>
                    <div className="hospital-detail-info-value">
                      {hospitalDetail.email}
                    </div>
                  </div>
                  <div className="hospital-detail-info-item">
                    <div className="hospital-detail-info-label">
                      <Tag size={16} />
                      <span>카테고리</span>
                    </div>
                    <div className="hospital-detail-info-value">
                      <div className="hospital-detail-categories">
                        {hospitalDetail.categories.map((category, index) => (
                          <span
                            key={index}
                            className="hospital-detail-category-tag"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hospital-detail-info-item">
                    <div className="hospital-detail-info-label">
                      <Clock size={16} />
                      <span>등록일</span>
                    </div>
                    <div className="hospital-detail-info-value">
                      {formatDate(hospitalDetail.registrationDate)}
                    </div>
                  </div>
                  <div className="hospital-detail-info-item">
                    <div className="hospital-detail-info-label">
                      <Clock size={16} />
                      <span>최근 업데이트</span>
                    </div>
                    <div className="hospital-detail-info-value">
                      {formatDate(hospitalDetail.lastUpdate)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hospital-detail-card">
              <div className="hospital-detail-card-header">
                <h3>통계</h3>
              </div>
              <div className="hospital-detail-card-content">
                <div className="hospital-detail-stats-grid">
                  <div className="hospital-detail-stat-card">
                    <div className="hospital-detail-stat-value">
                      {hospitalDetail.stats.appointmentsTotal.toLocaleString()}
                    </div>
                    <div className="hospital-detail-stat-label">총 예약</div>
                  </div>
                  <div className="hospital-detail-stat-card">
                    <div className="hospital-detail-stat-value">
                      {hospitalDetail.stats.appointmentsMonthly.toLocaleString()}
                    </div>
                    <div className="hospital-detail-stat-label">월간 예약</div>
                  </div>
                  <div className="hospital-detail-stat-card">
                    <div className="hospital-detail-stat-value">
                      {hospitalDetail.stats.usersTotal.toLocaleString()}
                    </div>
                    <div className="hospital-detail-stat-label">총 이용자</div>
                  </div>
                  <div className="hospital-detail-stat-card">
                    <div className="hospital-detail-stat-value">
                      {(hospitalDetail.stats.revenueTotal / 10000).toFixed(0)}
                      만원
                    </div>
                    <div className="hospital-detail-stat-label">총 매출</div>
                  </div>
                  <div className="hospital-detail-stat-card">
                    <div className="hospital-detail-stat-value">
                      {(hospitalDetail.stats.revenueMonthly / 10000).toFixed(0)}
                      만원
                    </div>
                    <div className="hospital-detail-stat-label">월간 매출</div>
                  </div>
                  <div className="hospital-detail-stat-card">
                    <div className="hospital-detail-stat-value">
                      <div className="hospital-detail-rating">
                        <Star size={16} className="star-icon" />
                        <span>{hospitalDetail.stats.averageRating}</span>
                      </div>
                    </div>
                    <div className="hospital-detail-stat-label">평균 평점</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hospital-detail-card">
              <div className="hospital-detail-card-header">
                <h3>관리자 계정</h3>
                <button className="add-button">
                  <Plus size={16} />
                  <span>추가</span>
                </button>
              </div>
              <div className="hospital-detail-card-content">
                <div className="hospital-detail-admins-table">
                  <table className="super-admin-table">
                    <thead>
                      <tr>
                        <th>이름</th>
                        <th>이메일</th>
                        <th>역할</th>
                        <th>최근 로그인</th>
                        <th>작업</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hospitalDetail.admins.map((admin) => (
                        <tr key={admin.id}>
                          <td>{admin.name}</td>
                          <td>{admin.email}</td>
                          <td>
                            <span className={`admin-role-badge ${admin.role}`}>
                              {admin.role === "owner"
                                ? "소유자"
                                : admin.role === "manager"
                                ? "관리자"
                                : "직원"}
                            </span>
                          </td>
                          <td>{formatDate(admin.lastLogin)}</td>
                          <td>
                            <div className="admin-actions">
                              <button className="action-button edit">
                                <Edit size={16} />
                              </button>
                              <button className="action-button delete">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="hospital-detail-card">
              <div className="hospital-detail-card-header">
                <h3>최근 결제 내역</h3>
                <button className="view-all-button">
                  <span>전체 보기</span>
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="hospital-detail-card-content">
                <div className="hospital-detail-payments-table">
                  <table className="super-admin-table">
                    <thead>
                      <tr>
                        <th>결제 ID</th>
                        <th>날짜</th>
                        <th>금액</th>
                        <th>유형</th>
                        <th>상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hospitalDetail.payments.map((payment) => (
                        <tr key={payment.id}>
                          <td>#{payment.id}</td>
                          <td>{formatDate(payment.date)}</td>
                          <td>{payment.amount.toLocaleString()}원</td>
                          <td>
                            {payment.type === "subscription"
                              ? "구독료"
                              : payment.type === "commission"
                              ? "수수료"
                              : "이용료"}
                          </td>
                          <td>
                            <span
                              className={`payment-status-badge ${payment.status}`}
                            >
                              {payment.status === "completed"
                                ? "완료"
                                : payment.status === "pending"
                                ? "대기"
                                : "실패"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="hospital-detail-sidebar">
            <div className="hospital-detail-card">
              <div className="hospital-detail-card-header">
                <h3>계정 관리</h3>
              </div>
              <div className="hospital-detail-card-content">
                <div className="account-management-buttons">
                  <button
                    className={`account-action-button ${
                      hospitalDetail.status === "active" ? "active" : ""
                    }`}
                    disabled={hospitalDetail.status === "active"}
                  >
                    <CheckCircle size={16} />
                    <span>계정 활성화</span>
                  </button>
                  <button
                    className={`account-action-button ${
                      hospitalDetail.status === "suspended" ? "active" : ""
                    }`}
                    disabled={hospitalDetail.status === "suspended"}
                  >
                    <AlertTriangle size={16} />
                    <span>계정 일시 중지</span>
                  </button>
                  <button
                    className={`account-action-button ${
                      hospitalDetail.status === "inactive" ? "active" : ""
                    }`}
                    disabled={hospitalDetail.status === "inactive"}
                  >
                    <XCircle size={16} />
                    <span>계정 비활성화</span>
                  </button>
                  <button className="account-action-button danger">
                    <Trash2 size={16} />
                    <span>계정 삭제</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="hospital-detail-card">
              <div className="hospital-detail-card-header">
                <h3>운영 시간</h3>
              </div>
              <div className="hospital-detail-card-content">
                <div className="operating-hours-list">
                  <div className="operating-hours-item">
                    <div className="operating-hours-day">월요일</div>
                    <div className="operating-hours-time">
                      {hospitalDetail.operatingHours.monday}
                    </div>
                  </div>
                  <div className="operating-hours-item">
                    <div className="operating-hours-day">화요일</div>
                    <div className="operating-hours-time">
                      {hospitalDetail.operatingHours.tuesday}
                    </div>
                  </div>
                  <div className="operating-hours-item">
                    <div className="operating-hours-day">수요일</div>
                    <div className="operating-hours-time">
                      {hospitalDetail.operatingHours.wednesday}
                    </div>
                  </div>
                  <div className="operating-hours-item">
                    <div className="operating-hours-day">목요일</div>
                    <div className="operating-hours-time">
                      {hospitalDetail.operatingHours.thursday}
                    </div>
                  </div>
                  <div className="operating-hours-item">
                    <div className="operating-hours-day">금요일</div>
                    <div className="operating-hours-time">
                      {hospitalDetail.operatingHours.friday}
                    </div>
                  </div>
                  <div className="operating-hours-item">
                    <div className="operating-hours-day">토요일</div>
                    <div className="operating-hours-time">
                      {hospitalDetail.operatingHours.saturday}
                    </div>
                  </div>
                  <div className="operating-hours-item">
                    <div className="operating-hours-day">일요일</div>
                    <div className="operating-hours-time">
                      {hospitalDetail.operatingHours.sunday}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hospital-detail-card">
              <div className="hospital-detail-card-header">
                <h3>이용권 및 플랜</h3>
              </div>
              <div className="hospital-detail-card-content">
                <div className="subscription-info">
                  <div className="subscription-plan">
                    <div className="subscription-plan-name">프리미엄 플랜</div>
                    <div className="subscription-plan-badge active">활성</div>
                  </div>
                  <div className="subscription-details">
                    <div className="subscription-detail-item">
                      <div className="subscription-detail-label">갱신일</div>
                      <div className="subscription-detail-value">
                        {formatDate(
                          new Date(
                            new Date().getFullYear(),
                            new Date().getMonth() + 1,
                            new Date().getDate()
                          ).toISOString()
                        )}
                      </div>
                    </div>
                    <div className="subscription-detail-item">
                      <div className="subscription-detail-label">결제 주기</div>
                      <div className="subscription-detail-value">매월</div>
                    </div>
                    <div className="subscription-detail-item">
                      <div className="subscription-detail-label">금액</div>
                      <div className="subscription-detail-value">
                        300,000원/월
                      </div>
                    </div>
                  </div>
                  <div className="subscription-actions">
                    <button className="subscription-action-button">
                      <Edit size={16} />
                      <span>플랜 변경</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="hospital-detail-card">
              <div className="hospital-detail-card-header">
                <h3>관련 문서</h3>
              </div>
              <div className="hospital-detail-card-content">
                <div className="documents-list">
                  <div className="document-item">
                    <div className="document-icon">
                      <FileText size={20} />
                    </div>
                    <div className="document-info">
                      <div className="document-name">사업자등록증</div>
                      <div className="document-date">
                        {formatDate(
                          new Date(
                            new Date().getFullYear() - 1,
                            Math.floor(Math.random() * 12),
                            Math.floor(Math.random() * 28) + 1
                          ).toISOString()
                        )}
                      </div>
                    </div>
                    <button className="document-action">
                      <Eye size={16} />
                    </button>
                  </div>
                  <div className="document-item">
                    <div className="document-icon">
                      <FileText size={20} />
                    </div>
                    <div className="document-info">
                      <div className="document-name">의료기관 개설 신고증</div>
                      <div className="document-date">
                        {formatDate(
                          new Date(
                            new Date().getFullYear() - 1,
                            Math.floor(Math.random() * 12),
                            Math.floor(Math.random() * 28) + 1
                          ).toISOString()
                        )}
                      </div>
                    </div>
                    <button className="document-action">
                      <Eye size={16} />
                    </button>
                  </div>
                  <div className="document-item">
                    <div className="document-icon">
                      <FileText size={20} />
                    </div>
                    <div className="document-info">
                      <div className="document-name">서비스 이용 계약서</div>
                      <div className="document-date">
                        {formatDate(
                          new Date(
                            new Date().getFullYear(),
                            new Date().getMonth() - 2,
                            Math.floor(Math.random() * 28) + 1
                          ).toISOString()
                        )}
                      </div>
                    </div>
                    <button className="document-action">
                      <Eye size={16} />
                    </button>
                  </div>
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
    <div className="hospital-management">
      <div className="super-admin-section-header">
        <h2 className="super-admin-section-title">병원/시설 관리</h2>
        <p className="super-admin-section-description">
          플랫폼에 등록된 모든 병원과 의료 시설을 관리합니다.
        </p>
      </div>

      <div className="hospital-management-actions">
        <div className="hospital-search-filter-container">
          <div className="hospital-admin-search-bar">
            <Search size={18} className="hospital-search-icon" />
            <input
              type="text"
              placeholder="병원명, 지역, 카테고리 검색..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="hospital-admin-search-input"
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

        <div className="hospital-action-buttons">
          <button className="super-admin-button super-admin-button-secondary">
            <Download size={16} />
            내보내기
          </button>
          <button
            className="super-admin-button super-admin-button-primary"
            onClick={handleAddHospital}
          >
            <Plus size={16} />
            병원 등록
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="super-admin-filters">
          <div className="super-admin-filter-group">
            <label className="super-admin-filter-label">병원 유형</label>
            <div className="super-admin-filter-options">
              <button
                className={`super-admin-filter-option ${
                  filterOptions.type === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("type", "all")}
              >
                전체
              </button>
              {hospitalTypes.map((type, index) => (
                <button
                  key={index}
                  className={`super-admin-filter-option ${
                    filterOptions.type === type ? "active" : ""
                  }`}
                  onClick={() => handleFilterChange("type", type)}
                >
                  {type}
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
                  filterOptions.status === "active" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "active")}
              >
                활성
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.status === "pending" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "pending")}
              >
                승인 대기
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.status === "suspended" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "suspended")}
              >
                일시 중지
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.status === "inactive" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "inactive")}
              >
                비활성
              </button>
            </div>
          </div>

          <div className="super-admin-filter-group">
            <label className="super-admin-filter-label">지역</label>
            <div className="super-admin-filter-options">
              <button
                className={`super-admin-filter-option ${
                  filterOptions.region === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("region", "all")}
              >
                전체
              </button>
              {regions.map((region, index) => (
                <button
                  key={index}
                  className={`super-admin-filter-option ${
                    filterOptions.region === region ? "active" : ""
                  }`}
                  onClick={() => handleFilterChange("region", region)}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="hospital-list-header">
        <h3 className="hospital-list-title">병원 목록</h3>
        <div className="hospital-count">
          총 <span className="count-highlight">{filteredHospitals.length}</span>
          개
        </div>
      </div>

      {filteredHospitals.length === 0 ? (
        <div className="super-admin-empty-state">
          <div className="super-admin-empty-icon">
            <Building size={48} />
          </div>
          <h3 className="super-admin-empty-title">병원 정보가 없습니다</h3>
          <p className="super-admin-empty-description">
            검색 조건에 맞는 병원이 없습니다. 다른 검색어나 필터를 사용해보세요.
          </p>
        </div>
      ) : (
        <>
          <div className="super-admin-table-container">
            <table className="super-admin-table">
              <thead>
                <tr>
                  <th>병원명</th>
                  <th>유형</th>
                  <th>지역</th>
                  <th>연락처</th>
                  <th>카테고리</th>
                  <th>상태</th>
                  <th>등록일</th>
                  <th>작업</th>
                </tr>
              </thead>
              <tbody>
                {currentHospitals.map((hospital) => (
                  <tr
                    key={hospital.id}
                    onClick={() => handleHospitalClick(hospital)}
                  >
                    <td>
                      <div className="hospital-management-hospital-name">
                        {hospital.name}
                      </div>
                    </td>
                    <td>{hospital.type}</td>
                    <td>{hospital.region}</td>
                    <td>
                      <div className="hospital-contact">
                        <div className="hospital-phone">
                          <Phone size={14} />
                          {hospital.phone}
                        </div>
                        <div className="hospital-email">
                          <Mail size={14} />
                          {hospital.email}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="hospital-categories">
                        {hospital.categories.map((category, index) => (
                          <span key={index} className="category-tag">
                            {category}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>{renderStatusBadge(hospital.status)}</td>
                    <td>{formatDate(hospital.registrationDate)}</td>
                    <td>
                      <div
                        className="hospital-actions"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="action-button view"
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewDetail
                              ? onViewDetail(hospital.id)
                              : handleHospitalClick(hospital);
                          }}
                          title="상세 보기"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="action-button edit"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleHospitalClick(hospital);
                          }}
                          title="편집"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="action-button delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteHospital(hospital.id);
                          }}
                          title="삭제"
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
        <HospitalModal
          hospital={selectedHospital}
          onClose={handleCloseModal}
          onSave={handleSaveHospital}
          hospitalTypes={hospitalTypes}
          regions={regions}
        />
      )}
    </div>
  );
};

export default HospitalManagement;
