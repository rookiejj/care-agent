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
  User,
  Phone,
  Mail,
  Clock,
  MapPin,
  Calendar,
  ArrowLeft,
  Shield,
  Ban,
  UserCheck,
  Activity,
  Heart,
  Star,
  MessageCircle,
  CreditCard,
  FileText,
  MoreHorizontal,
} from "lucide-react";
import "./UserManagement.css";
import UserModal from "./components/UserModal";

const UserManagement = ({
  viewMode = "list",
  itemId,
  onBack,
  onViewDetail,
}) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    userType: "all",
    status: "all",
    region: "all",
    ageGroup: "all",
    gender: "all",
    registrationPeriod: "all",
    activityLevel: "all",
  });

  // 상세 보기 모드에서 사용할 사용자 정보
  const [userDetail, setUserDetail] = useState(null);

  // 페이지네이션 설정
  const usersPerPage = 15;

  useEffect(() => {
    const loadUsers = () => {
      setIsLoading(true);

      // 상세 보기 모드인 경우 해당 사용자 데이터만 로드
      if (viewMode === "detail" && itemId) {
        setTimeout(() => {
          const mockUser = generateMockUserDetail(parseInt(itemId));
          setUserDetail(mockUser);
          setIsLoading(false);
        }, 800);
        return;
      }

      // 목록 모드인 경우 전체 사용자 목록 로드
      setTimeout(() => {
        const mockUsers = generateMockUsers();
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
        setIsLoading(false);
      }, 800);
    };

    loadUsers();
  }, [viewMode, itemId]);

  useEffect(() => {
    if (viewMode === "list") {
      // 검색어와 필터 적용
      let results = [...users];

      // 검색어 필터링
      if (searchTerm) {
        results = results.filter(
          (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone.includes(searchTerm) ||
            user.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.region.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // 사용자 유형 필터링
      if (filterOptions.userType !== "all") {
        results = results.filter(
          (user) => user.userType === filterOptions.userType
        );
      }

      // 상태 필터링
      if (filterOptions.status !== "all") {
        results = results.filter(
          (user) => user.status === filterOptions.status
        );
      }

      // 지역 필터링
      if (filterOptions.region !== "all") {
        results = results.filter(
          (user) => user.region === filterOptions.region
        );
      }

      // 연령대 필터링
      if (filterOptions.ageGroup !== "all") {
        results = results.filter(
          (user) => user.ageGroup === filterOptions.ageGroup
        );
      }

      // 성별 필터링
      if (filterOptions.gender !== "all") {
        results = results.filter(
          (user) => user.gender === filterOptions.gender
        );
      }

      // 등록 기간 필터링
      if (filterOptions.registrationPeriod !== "all") {
        const now = new Date();
        const periodMap = {
          "1week": 7,
          "1month": 30,
          "3months": 90,
          "6months": 180,
          "1year": 365,
        };
        const days = periodMap[filterOptions.registrationPeriod];
        if (days) {
          const cutoffDate = new Date(
            now.getTime() - days * 24 * 60 * 60 * 1000
          );
          results = results.filter(
            (user) => new Date(user.registrationDate) >= cutoffDate
          );
        }
      }

      // 활동 수준 필터링
      if (filterOptions.activityLevel !== "all") {
        results = results.filter(
          (user) => user.activityLevel === filterOptions.activityLevel
        );
      }

      // 결과 정렬 (기본: 등록일 최신순)
      results.sort(
        (a, b) => new Date(b.registrationDate) - new Date(a.registrationDate)
      );

      setFilteredUsers(results);
      setCurrentPage(1);
    }
  }, [searchTerm, filterOptions, users, viewMode]);

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

  const handleAddUser = () => {
    setSelectedUser(null);
    setShowModal(true);
  };

  const handleUserClick = (user) => {
    if (onViewDetail) {
      onViewDetail(user.id);
    } else {
      setSelectedUser(user);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleSaveUser = (userData) => {
    if (selectedUser) {
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? { ...user, ...userData } : user
        )
      );
    } else {
      const newUser = {
        id: users.length + 1,
        ...userData,
        registrationDate: new Date().toISOString(),
        lastLoginDate: null,
        activityLevel: "new",
      };
      setUsers([...users, newUser]);
    }
    setShowModal(false);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGoBack = () => {
    if (onBack) {
      onBack();
    }
  };

  // 사용자 상태 변경
  const handleStatusChange = (userId, newStatus) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  };

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
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

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

  // 나이 계산 함수
  const calculateAge = (birthDate) => {
    if (!birthDate) return "-";
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  // 연령대 계산 함수
  const getAgeGroup = (birthDate) => {
    const age = calculateAge(birthDate);
    if (age === "-") return "-";
    if (age < 20) return "10대";
    if (age < 30) return "20대";
    if (age < 40) return "30대";
    if (age < 50) return "40대";
    if (age < 60) return "50대";
    if (age < 70) return "60대";
    return "70대+";
  };

  // 상태에 따른 배지 렌더링
  const renderStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="super-admin-user-status-badge active">
            <CheckCircle size={14} /> 활성
          </span>
        );
      case "inactive":
        return (
          <span className="super-admin-user-status-badge inactive">
            <Clock size={14} /> 비활성
          </span>
        );
      case "suspended":
        return (
          <span className="super-admin-user-status-badge suspended">
            <Ban size={14} /> 정지
          </span>
        );
      case "blocked":
        return (
          <span className="super-admin-user-status-badge blocked">
            <XCircle size={14} /> 차단
          </span>
        );
      default:
        return null;
    }
  };

  // 사용자 유형 배지 렌더링
  const renderUserTypeBadge = (userType) => {
    switch (userType) {
      case "patient":
        return (
          <span className="super-admin-user-type-badge patient">
            <User size={14} /> 환자
          </span>
        );
      case "admin":
        return (
          <span className="super-admin-user-type-badge admin">
            <Shield size={14} /> 관리자
          </span>
        );
      case "doctor":
        return (
          <span className="super-admin-user-type-badge doctor">
            <UserCheck size={14} /> 의료진
          </span>
        );
      default:
        return null;
    }
  };

  // 활동 수준 배지 렌더링
  const renderActivityLevelBadge = (level) => {
    switch (level) {
      case "high":
        return (
          <span className="super-admin-activity-badge high">
            <Activity size={14} /> 높음
          </span>
        );
      case "medium":
        return (
          <span className="super-admin-activity-badge medium">
            <Activity size={14} /> 보통
          </span>
        );
      case "low":
        return (
          <span className="super-admin-activity-badge low">
            <Activity size={14} /> 낮음
          </span>
        );
      case "new":
        return (
          <span className="super-admin-activity-badge new">
            <Star size={14} /> 신규
          </span>
        );
      default:
        return null;
    }
  };

  // 목업 사용자 데이터 생성
  function generateMockUsers() {
    const mockUsers = [];
    const statuses = ["active", "inactive", "suspended", "blocked"];
    const userTypes = ["patient", "admin", "doctor"];
    const genders = ["male", "female"];
    const activityLevels = ["high", "medium", "low", "new"];

    for (let i = 1; i <= 100; i++) {
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
        "민수",
        "영희",
        "철수",
        "순이",
        "현우",
        "지영",
        "동현",
        "수진",
        "태형",
        "은주",
        "민정",
        "성호",
        "혜진",
        "준영",
        "소영",
        "진우",
      ][Math.floor(Math.random() * 16)];
      const name = firstName + lastName;

      const userType = userTypes[Math.floor(Math.random() * userTypes.length)];
      const gender = genders[Math.floor(Math.random() * genders.length)];
      const region = regions[Math.floor(Math.random() * regions.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const activityLevel =
        activityLevels[Math.floor(Math.random() * activityLevels.length)];

      // 생년월일 생성 (20-80세)
      const birthYear =
        new Date().getFullYear() - (Math.floor(Math.random() * 60) + 20);
      const birthMonth = Math.floor(Math.random() * 12) + 1;
      const birthDay = Math.floor(Math.random() * 28) + 1;
      const birthDate = new Date(
        birthYear,
        birthMonth - 1,
        birthDay
      ).toISOString();

      // 등록일 생성 (최근 2년 내)
      const registrationDate = new Date(
        new Date().getFullYear() - Math.floor(Math.random() * 2),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      ).toISOString();

      // 마지막 로그인 생성
      const lastLoginDate =
        status === "active"
          ? new Date(
              new Date().getTime() -
                Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
            ).toISOString()
          : null;

      mockUsers.push({
        id: i,
        userId: `user${String(i).padStart(4, "0")}`,
        name,
        email: `${firstName}${lastName}${i}@example.com`,
        phone: `010-${1000 + Math.floor(Math.random() * 9000)}-${
          1000 + Math.floor(Math.random() * 9000)
        }`,
        userType,
        gender,
        birthDate,
        ageGroup: getAgeGroup(birthDate),
        region,
        address: `${region} ${
          ["중구", "서구", "동구", "남구", "북구", "강남구", "송파구"][
            Math.floor(Math.random() * 7)
          ]
        } ${Math.floor(Math.random() * 100) + 1}번길 ${
          Math.floor(Math.random() * 50) + 1
        }`,
        status,
        registrationDate,
        lastLoginDate,
        activityLevel,
        totalAppointments: Math.floor(Math.random() * 50),
        totalReviews: Math.floor(Math.random() * 20),
        averageRating:
          Math.random() > 0.3 ? (Math.random() * 2 + 3).toFixed(1) : null,
        favoriteHospitals: Math.floor(Math.random() * 10),
        totalPayments: Math.floor(Math.random() * 1000000),
        deviceType: ["mobile", "desktop", "tablet"][
          Math.floor(Math.random() * 3)
        ],
        marketingConsent: Math.random() > 0.5,
        profileImage: `/images/profiles/profile${(i % 5) + 1}.jpg`,
      });
    }

    return mockUsers;
  }

  // 사용자 상세 정보 생성
  function generateMockUserDetail(id) {
    const user =
      generateMockUsers().find((u) => u.id === id) || generateMockUsers()[0];

    // 예약 내역
    const appointments = [];
    for (let i = 1; i <= user.totalAppointments; i++) {
      appointments.push({
        id: i,
        hospitalName: `${user.region} ${
          ["의원", "병원", "클리닉"][Math.floor(Math.random() * 3)]
        } ${i}`,
        doctorName: `${["김", "이", "박"][Math.floor(Math.random() * 3)]}의사`,
        date: new Date(
          new Date().getTime() -
            Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000
        ).toISOString(),
        status: ["completed", "cancelled", "no-show"][
          Math.floor(Math.random() * 3)
        ],
        type: ["진료", "검진", "상담"][Math.floor(Math.random() * 3)],
        amount: Math.floor(Math.random() * 100000) + 10000,
      });
    }

    // 리뷰 내역
    const reviews = [];
    for (let i = 1; i <= user.totalReviews; i++) {
      reviews.push({
        id: i,
        hospitalName: `${user.region} ${
          ["의원", "병원", "클리닉"][Math.floor(Math.random() * 3)]
        } ${i}`,
        rating: Math.floor(Math.random() * 3) + 3,
        content: `${
          ["좋은 서비스였습니다", "친절한 진료", "시설이 깔끔해요"][
            Math.floor(Math.random() * 3)
          ]
        }.`,
        date: new Date(
          new Date().getTime() -
            Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000
        ).toISOString(),
        isReported: Math.random() > 0.9,
      });
    }

    // 결제 내역
    const payments = [];
    const paymentCount = Math.floor(Math.random() * 20) + 5;
    for (let i = 1; i <= paymentCount; i++) {
      payments.push({
        id: i,
        hospitalName: `${user.region} ${
          ["의원", "병원", "클리닉"][Math.floor(Math.random() * 3)]
        } ${i}`,
        amount: Math.floor(Math.random() * 200000) + 10000,
        date: new Date(
          new Date().getTime() -
            Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000
        ).toISOString(),
        status: ["completed", "failed", "refunded"][
          Math.floor(Math.random() * 3)
        ],
        method: ["card", "transfer", "mobile"][Math.floor(Math.random() * 3)],
      });
    }

    // 찜한 병원
    const favoriteHospitals = [];
    for (let i = 1; i <= user.favoriteHospitals; i++) {
      favoriteHospitals.push({
        id: i,
        name: `${user.region} ${
          ["의원", "병원", "클리닉"][Math.floor(Math.random() * 3)]
        } ${i}`,
        category: ["내과", "피부과", "성형외과"][Math.floor(Math.random() * 3)],
        rating: (Math.random() * 2 + 3).toFixed(1),
        addedDate: new Date(
          new Date().getTime() -
            Math.floor(Math.random() * 180) * 24 * 60 * 60 * 1000
        ).toISOString(),
      });
    }

    // 활동 로그
    const activityLogs = [];
    const logCount = Math.floor(Math.random() * 50) + 20;
    for (let i = 1; i <= logCount; i++) {
      activityLogs.push({
        id: i,
        action: ["login", "search", "booking", "review", "payment"][
          Math.floor(Math.random() * 5)
        ],
        description: {
          login: "로그인",
          search: "병원 검색",
          booking: "예약 생성",
          review: "리뷰 작성",
          payment: "결제 완료",
        }[
          ["login", "search", "booking", "review", "payment"][
            Math.floor(Math.random() * 5)
          ]
        ],
        timestamp: new Date(
          new Date().getTime() -
            Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000
        ).toISOString(),
        ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(
          Math.random() * 255
        )}`,
        deviceInfo: user.deviceType,
      });
    }

    return {
      ...user,
      appointments: appointments.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      ),
      reviews: reviews.sort((a, b) => new Date(b.date) - new Date(a.date)),
      payments: payments.sort((a, b) => new Date(b.date) - new Date(a.date)),
      favoriteHospitals,
      activityLogs: activityLogs.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      ),
      totalSpent: payments
        .filter((p) => p.status === "completed")
        .reduce((sum, p) => sum + p.amount, 0),
      statistics: {
        loginCount: Math.floor(Math.random() * 200) + 50,
        searchCount: Math.floor(Math.random() * 500) + 100,
        bookingCount: user.totalAppointments,
        reviewCount: user.totalReviews,
        favoriteCount: user.favoriteHospitals,
      },
    };
  }

  if (isLoading) {
    return (
      <div className="super-admin-loading-container">
        <div className="super-admin-loading-spinner"></div>
        <p>사용자 데이터 로딩 중...</p>
      </div>
    );
  }

  // 상세 보기 모드 렌더링
  if (viewMode === "detail" && userDetail) {
    return (
      <div className="super-admin-user-detail-page">
        <div className="super-admin-user-detail-header">
          <button className="back-button" onClick={handleGoBack}>
            <ArrowLeft size={20} />
          </button>
          <div className="super-admin-user-detail-title-section">
            <h2 className="super-admin-user-detail-title">{userDetail.name}</h2>
            <div className="super-admin-user-detail-subtitle">
              ID: {userDetail.userId} • {userDetail.email}
            </div>
          </div>
          <div className="super-admin-user-detail-status">
            {renderStatusBadge(userDetail.status)}
            {renderUserTypeBadge(userDetail.userType)}
          </div>
        </div>

        <div className="super-admin-user-detail-content">
          <div className="super-admin-user-detail-main">
            <div className="super-admin-user-detail-card">
              <div className="super-admin-user-detail-card-header">
                <h3>기본 정보</h3>
                <button className="edit-button">
                  <Edit size={16} />
                  <span>편집</span>
                </button>
              </div>
              <div className="super-admin-user-detail-card-content">
                <div className="super-admin-user-detail-info-grid">
                  <div className="super-admin-user-detail-info-item">
                    <div className="super-admin-user-detail-info-label">
                      <User size={16} />
                      <span>이름</span>
                    </div>
                    <div className="super-admin-user-detail-info-value">
                      {userDetail.name}
                    </div>
                  </div>
                  <div className="super-admin-user-detail-info-item">
                    <div className="super-admin-user-detail-info-label">
                      <Mail size={16} />
                      <span>이메일</span>
                    </div>
                    <div className="super-admin-user-detail-info-value">
                      {userDetail.email}
                    </div>
                  </div>
                  <div className="super-admin-user-detail-info-item">
                    <div className="super-admin-user-detail-info-label">
                      <Phone size={16} />
                      <span>전화번호</span>
                    </div>
                    <div className="super-admin-user-detail-info-value">
                      {userDetail.phone}
                    </div>
                  </div>
                  <div className="super-admin-user-detail-info-item">
                    <div className="super-admin-user-detail-info-label">
                      <Calendar size={16} />
                      <span>생년월일</span>
                    </div>
                    <div className="super-admin-user-detail-info-value">
                      {formatDate(userDetail.birthDate)} (
                      {calculateAge(userDetail.birthDate)}세)
                    </div>
                  </div>
                  <div className="super-admin-user-detail-info-item">
                    <div className="super-admin-user-detail-info-label">
                      <User size={16} />
                      <span>성별</span>
                    </div>
                    <div className="super-admin-user-detail-info-value">
                      {userDetail.gender === "male" ? "남성" : "여성"}
                    </div>
                  </div>
                  <div className="super-admin-user-detail-info-item">
                    <div className="super-admin-user-detail-info-label">
                      <MapPin size={16} />
                      <span>지역</span>
                    </div>
                    <div className="super-admin-user-detail-info-value">
                      {userDetail.region}
                    </div>
                  </div>
                  <div className="super-admin-user-detail-info-item">
                    <div className="super-admin-user-detail-info-label">
                      <MapPin size={16} />
                      <span>주소</span>
                    </div>
                    <div className="super-admin-user-detail-info-value">
                      {userDetail.address}
                    </div>
                  </div>
                  <div className="super-admin-user-detail-info-item">
                    <div className="super-admin-user-detail-info-label">
                      <Clock size={16} />
                      <span>가입일</span>
                    </div>
                    <div className="super-admin-user-detail-info-value">
                      {formatDate(userDetail.registrationDate)}
                    </div>
                  </div>
                  <div className="super-admin-user-detail-info-item">
                    <div className="super-admin-user-detail-info-label">
                      <Activity size={16} />
                      <span>마지막 로그인</span>
                    </div>
                    <div className="super-admin-user-detail-info-value">
                      {formatDateTime(userDetail.lastLoginDate)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="super-admin-user-detail-card">
              <div className="super-admin-user-detail-card-header">
                <h3>활동 통계</h3>
              </div>
              <div className="super-admin-user-detail-card-content">
                <div className="super-admin-user-detail-stats-grid">
                  <div className="super-admin-user-detail-stat-card">
                    <div className="super-admin-user-detail-stat-value">
                      {userDetail.totalReviews.toLocaleString()}
                    </div>
                    <div className="super-admin-user-detail-stat-label">
                      작성 리뷰
                    </div>
                  </div>
                  <div className="super-admin-user-detail-stat-card">
                    <div className="super-admin-user-detail-stat-value">
                      {userDetail.favoriteHospitals.toLocaleString()}
                    </div>
                    <div className="super-admin-user-detail-stat-label">
                      찜한 병원
                    </div>
                  </div>
                  <div className="super-admin-user-detail-stat-card">
                    <div className="super-admin-user-detail-stat-value">
                      {(userDetail.totalSpent / 10000).toFixed(0)}만원
                    </div>
                    <div className="super-admin-user-detail-stat-label">
                      총 결제금액
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="super-admin-user-detail-card">
              <div className="super-admin-user-detail-card-header">
                <h3>최근 예약 내역</h3>
                <button className="view-all-button">
                  <span>전체 보기</span>
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="super-admin-user-detail-card-content">
                <div className="super-admin-user-detail-table-container">
                  <table className="super-admin-table">
                    <thead>
                      <tr>
                        <th>병원명</th>
                        <th>의사</th>
                        <th>예약일</th>
                        <th>유형</th>
                        <th>상태</th>
                        <th>금액</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userDetail.appointments
                        .slice(0, 5)
                        .map((appointment) => (
                          <tr key={appointment.id}>
                            <td>{appointment.hospitalName}</td>
                            <td>{appointment.doctorName}</td>
                            <td>{formatDate(appointment.date)}</td>
                            <td>{appointment.type}</td>
                            <td>
                              <span
                                className={`super-admin-appointment-status-badge ${appointment.status}`}
                              >
                                {appointment.status === "completed"
                                  ? "완료"
                                  : appointment.status === "cancelled"
                                  ? "취소"
                                  : "노쇼"}
                              </span>
                            </td>
                            <td>{appointment.amount.toLocaleString()}원</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="super-admin-user-detail-card">
              <div className="super-admin-user-detail-card-header">
                <h3>최근 작성 리뷰</h3>
                <button className="view-all-button">
                  <span>전체 보기</span>
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="super-admin-user-detail-card-content">
                <div className="super-admin-user-detail-reviews-list">
                  {userDetail.reviews.slice(0, 3).map((review) => (
                    <div
                      key={review.id}
                      className="super-admin-user-detail-review-item"
                    >
                      <div className="super-admin-user-detail-review-header">
                        <div className="super-admin-user-detail-review-hospital">
                          {review.hospitalName}
                        </div>
                        <div className="super-admin-user-detail-review-meta">
                          <div className="super-admin-user-detail-review-rating">
                            <Star size={14} className="star-icon" />
                            <span>{review.rating}</span>
                          </div>
                          <div className="super-admin-user-detail-review-date">
                            {formatDate(review.date)}
                          </div>
                          {review.isReported && (
                            <span className="super-admin-review-reported-badge">
                              <AlertTriangle size={12} />
                              신고됨
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="super-admin-user-detail-review-content">
                        {review.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="super-admin-user-detail-card">
              <div className="super-admin-user-detail-card-header">
                <h3>최근 활동 로그</h3>
                <button className="view-all-button">
                  <span>전체 보기</span>
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="super-admin-user-detail-card-content">
                <div className="super-admin-user-detail-activity-list">
                  {userDetail.activityLogs.slice(0, 8).map((log) => (
                    <div
                      key={log.id}
                      className="super-admin-user-detail-activity-item"
                    >
                      <div className="super-admin-user-detail-activity-info">
                        <div className="super-admin-user-detail-activity-action">
                          {log.description}
                        </div>
                        <div className="super-admin-user-detail-activity-meta">
                          {formatDateTime(log.timestamp)} • {log.ipAddress} •{" "}
                          {log.deviceInfo}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="super-admin-user-detail-sidebar">
            <div className="super-admin-user-detail-card">
              <div className="super-admin-user-detail-card-header">
                <h3>계정 관리</h3>
              </div>
              <div className="super-admin-user-detail-card-content">
                <div className="super-admin-user-account-management-buttons">
                  <button
                    className={`super-admin-user-account-action-button ${
                      userDetail.status === "active" ? "active" : ""
                    }`}
                    disabled={userDetail.status === "active"}
                    onClick={() => handleStatusChange(userDetail.id, "active")}
                  >
                    <CheckCircle size={16} />
                    <span>계정 활성화</span>
                  </button>
                  <button
                    className={`super-admin-user-account-action-button ${
                      userDetail.status === "suspended" ? "active" : ""
                    }`}
                    disabled={userDetail.status === "suspended"}
                    onClick={() =>
                      handleStatusChange(userDetail.id, "suspended")
                    }
                  >
                    <Ban size={16} />
                    <span>계정 정지</span>
                  </button>
                  <button
                    className={`super-admin-user-account-action-button ${
                      userDetail.status === "blocked" ? "active" : ""
                    }`}
                    disabled={userDetail.status === "blocked"}
                    onClick={() => handleStatusChange(userDetail.id, "blocked")}
                  >
                    <XCircle size={16} />
                    <span>계정 차단</span>
                  </button>
                  <button className="super-admin-user-account-action-button danger">
                    <Trash2 size={16} />
                    <span>계정 삭제</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="super-admin-user-detail-card">
              <div className="super-admin-user-detail-card-header">
                <h3>찜한 병원</h3>
              </div>
              <div className="super-admin-user-detail-card-content">
                <div className="super-admin-user-favorite-hospitals-list">
                  {userDetail.favoriteHospitals.slice(0, 5).map((hospital) => (
                    <div
                      key={hospital.id}
                      className="super-admin-user-favorite-hospital-item"
                    >
                      <div className="super-admin-user-favorite-hospital-info">
                        <div className="super-admin-user-favorite-hospital-name">
                          {hospital.name}
                        </div>
                        <div className="super-admin-user-favorite-hospital-meta">
                          <span className="super-admin-user-favorite-hospital-category">
                            {hospital.category}
                          </span>
                          <div className="super-admin-user-favorite-hospital-rating">
                            <Star size={12} className="star-icon" />
                            <span>{hospital.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="super-admin-user-favorite-hospital-date">
                        {formatDate(hospital.addedDate)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="super-admin-user-detail-card">
              <div className="super-admin-user-detail-card-header">
                <h3>최근 결제 내역</h3>
              </div>
              <div className="super-admin-user-detail-card-content">
                <div className="super-admin-user-payments-list">
                  {userDetail.payments.slice(0, 5).map((payment) => (
                    <div
                      key={payment.id}
                      className="super-admin-user-payment-item"
                    >
                      <div className="super-admin-user-payment-info">
                        <div className="super-admin-user-payment-hospital">
                          {payment.hospitalName}
                        </div>
                        <div className="super-admin-user-payment-meta">
                          <span className="super-admin-user-payment-amount">
                            {payment.amount.toLocaleString()}원
                          </span>
                          <span
                            className={`super-admin-user-payment-status-badge ${payment.status}`}
                          >
                            {payment.status === "completed"
                              ? "완료"
                              : payment.status === "failed"
                              ? "실패"
                              : "환불"}
                          </span>
                        </div>
                      </div>
                      <div className="super-admin-user-payment-date">
                        {formatDate(payment.date)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="super-admin-user-detail-card">
              <div className="super-admin-user-detail-card-header">
                <h3>설정 정보</h3>
              </div>
              <div className="super-admin-user-detail-card-content">
                <div className="super-admin-user-settings-list">
                  <div className="super-admin-user-settings-item">
                    <div className="super-admin-user-settings-label">
                      마케팅 수신 동의
                    </div>
                    <div className="super-admin-user-settings-value">
                      <span
                        className={`super-admin-user-settings-badge ${
                          userDetail.marketingConsent ? "enabled" : "disabled"
                        }`}
                      >
                        {userDetail.marketingConsent ? "동의" : "거부"}
                      </span>
                    </div>
                  </div>
                  <div className="super-admin-user-settings-item">
                    <div className="super-admin-user-settings-label">
                      주 사용 기기
                    </div>
                    <div className="super-admin-user-settings-value">
                      {userDetail.deviceType === "mobile"
                        ? "모바일"
                        : userDetail.deviceType === "desktop"
                        ? "데스크톱"
                        : "태블릿"}
                    </div>
                  </div>
                  <div className="super-admin-user-settings-item">
                    <div className="super-admin-user-settings-label">
                      활동 수준
                    </div>
                    <div className="super-admin-user-settings-value">
                      {renderActivityLevelBadge(userDetail.activityLevel)}
                    </div>
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
    <div className="super-admin-user-management">
      <div className="super-admin-section-header">
        <h2 className="super-admin-section-title">사용자 관리</h2>
        <p className="super-admin-section-description">
          플랫폼에 등록된 모든 사용자(환자, 관리자, 의료진)를 관리합니다.
        </p>
      </div>

      <div className="super-admin-user-management-actions">
        <div className="super-admin-user-search-filter-container">
          <div className="super-admin-user-admin-search-bar">
            <Search size={18} className="super-admin-user-search-icon" />
            <input
              type="text"
              placeholder="이름, 이메일, 전화번호, 사용자 ID 검색..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="super-admin-user-admin-search-input"
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

        <div className="super-admin-user-action-buttons">
          <button className="super-admin-button super-admin-button-secondary">
            <Download size={16} />
            내보내기
          </button>
          <button
            className="super-admin-button super-admin-button-primary"
            onClick={handleAddUser}
          >
            <Plus size={16} />
            사용자 추가
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="super-admin-filters">
          <div className="super-admin-filter-group">
            <label className="super-admin-filter-label">사용자 유형</label>
            <div className="super-admin-filter-options">
              <button
                className={`super-admin-filter-option ${
                  filterOptions.userType === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("userType", "all")}
              >
                전체
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.userType === "patient" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("userType", "patient")}
              >
                환자
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.userType === "admin" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("userType", "admin")}
              >
                관리자
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.userType === "doctor" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("userType", "doctor")}
              >
                의료진
              </button>
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
                  filterOptions.status === "inactive" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "inactive")}
              >
                비활성
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.status === "suspended" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "suspended")}
              >
                정지
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.status === "blocked" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("status", "blocked")}
              >
                차단
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

          <div className="super-admin-filter-group">
            <label className="super-admin-filter-label">연령대</label>
            <div className="super-admin-filter-options">
              <button
                className={`super-admin-filter-option ${
                  filterOptions.ageGroup === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("ageGroup", "all")}
              >
                전체
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.ageGroup === "10대" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("ageGroup", "10대")}
              >
                10대
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.ageGroup === "20대" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("ageGroup", "20대")}
              >
                20대
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.ageGroup === "30대" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("ageGroup", "30대")}
              >
                30대
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.ageGroup === "40대" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("ageGroup", "40대")}
              >
                40대
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.ageGroup === "50대" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("ageGroup", "50대")}
              >
                50대
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.ageGroup === "60대" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("ageGroup", "60대")}
              >
                60대
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.ageGroup === "70대+" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("ageGroup", "70대+")}
              >
                70대+
              </button>
            </div>
          </div>

          <div className="super-admin-filter-group">
            <label className="super-admin-filter-label">성별</label>
            <div className="super-admin-filter-options">
              <button
                className={`super-admin-filter-option ${
                  filterOptions.gender === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("gender", "all")}
              >
                전체
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.gender === "male" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("gender", "male")}
              >
                남성
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.gender === "female" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("gender", "female")}
              >
                여성
              </button>
            </div>
          </div>

          <div className="super-admin-filter-group">
            <label className="super-admin-filter-label">가입 기간</label>
            <div className="super-admin-filter-options">
              <button
                className={`super-admin-filter-option ${
                  filterOptions.registrationPeriod === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("registrationPeriod", "all")}
              >
                전체
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.registrationPeriod === "1week" ? "active" : ""
                }`}
                onClick={() =>
                  handleFilterChange("registrationPeriod", "1week")
                }
              >
                1주일
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.registrationPeriod === "1month" ? "active" : ""
                }`}
                onClick={() =>
                  handleFilterChange("registrationPeriod", "1month")
                }
              >
                1개월
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.registrationPeriod === "3months" ? "active" : ""
                }`}
                onClick={() =>
                  handleFilterChange("registrationPeriod", "3months")
                }
              >
                3개월
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.registrationPeriod === "6months" ? "active" : ""
                }`}
                onClick={() =>
                  handleFilterChange("registrationPeriod", "6months")
                }
              >
                6개월
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.registrationPeriod === "1year" ? "active" : ""
                }`}
                onClick={() =>
                  handleFilterChange("registrationPeriod", "1year")
                }
              >
                1년
              </button>
            </div>
          </div>

          <div className="super-admin-filter-group">
            <label className="super-admin-filter-label">활동 수준</label>
            <div className="super-admin-filter-options">
              <button
                className={`super-admin-filter-option ${
                  filterOptions.activityLevel === "all" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("activityLevel", "all")}
              >
                전체
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.activityLevel === "high" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("activityLevel", "high")}
              >
                높음
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.activityLevel === "medium" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("activityLevel", "medium")}
              >
                보통
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.activityLevel === "low" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("activityLevel", "low")}
              >
                낮음
              </button>
              <button
                className={`super-admin-filter-option ${
                  filterOptions.activityLevel === "new" ? "active" : ""
                }`}
                onClick={() => handleFilterChange("activityLevel", "new")}
              >
                신규
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="super-admin-user-list-header">
        <h3 className="super-admin-user-list-title">사용자 목록</h3>
        <div className="super-admin-user-count">
          총 <span className="count-highlight">{filteredUsers.length}</span>명
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="super-admin-empty-state">
          <div className="super-admin-empty-icon">
            <User size={48} />
          </div>
          <h3 className="super-admin-empty-title">사용자 정보가 없습니다</h3>
          <p className="super-admin-empty-description">
            검색 조건에 맞는 사용자가 없습니다. 다른 검색어나 필터를
            사용해보세요.
          </p>
        </div>
      ) : (
        <>
          <div className="super-admin-table-container">
            <table className="super-admin-table">
              <thead>
                <tr>
                  <th>사용자 정보</th>
                  <th>유형</th>
                  <th>연락처</th>
                  <th>지역</th>
                  <th>상태</th>
                  <th>활동</th>
                  <th>가입일</th>
                  <th>마지막 로그인</th>
                  <th>작업</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id} onClick={() => handleUserClick(user)}>
                    <td>
                      <div className="super-admin-user-info">
                        <div className="super-admin-user-name">{user.name}</div>
                        <div className="super-admin-user-details">
                          <span className="super-admin-user-id">
                            ID: {user.userId}
                          </span>
                          <span className="super-admin-user-age">
                            {calculateAge(user.birthDate)}세 (
                            {user.gender === "male" ? "남" : "여"})
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>{renderUserTypeBadge(user.userType)}</td>
                    <td>
                      <div className="super-admin-user-contact">
                        <div className="super-admin-user-email">
                          <Mail size={14} />
                          {user.email}
                        </div>
                        <div className="super-admin-user-phone">
                          <Phone size={14} />
                          {user.phone}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="super-admin-user-location">
                        <MapPin size={14} />
                        {user.region}
                      </div>
                    </td>
                    <td>{renderStatusBadge(user.status)}</td>
                    <td>
                      <div className="super-admin-user-activity">
                        {renderActivityLevelBadge(user.activityLevel)}
                        <div className="super-admin-user-activity-stats">
                          <span>예약 {user.totalAppointments}건</span>
                          <span>리뷰 {user.totalReviews}건</span>
                        </div>
                      </div>
                    </td>
                    <td>{formatDate(user.registrationDate)}</td>
                    <td>{formatDateTime(user.lastLoginDate)}</td>
                    <td>
                      <div
                        className="super-admin-user-actions"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="action-button view"
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewDetail
                              ? onViewDetail(user.id)
                              : handleUserClick(user);
                          }}
                          title="상세 보기"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="action-button edit"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUserClick(user);
                          }}
                          title="편집"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="action-button delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteUser(user.id);
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

                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 2 &&
                    pageNumber <= currentPage + 2)
                ) {
                  return (
                    <button
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
        <UserModal
          user={selectedUser}
          onClose={handleCloseModal}
          onSave={handleSaveUser}
          regions={regions}
        />
      )}
    </div>
  );
};

export default UserManagement;
