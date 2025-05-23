import React, { useState, useEffect } from "react";
import {
  Users,
  Building2,
  Calendar,
  CreditCard,
  TrendingUp,
  TrendingDown,
  AlarmClock,
  Server,
  Shield,
  Download,
  RefreshCw,
  Activity,
  AlertTriangle,
  ArrowRight,
  Map,
  FileBarChart2,
  ListFilter,
  ChevronRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import "./SuperAdminDashboard.css";

const SuperAdminDashboard = ({
  platformData,
  onSectionChange,
  onViewDetail,
}) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("month");
  const [systemStatus, setSystemStatus] = useState({
    status: "healthy",
    uptime: "99.98%",
    lastRestart: "2025-05-14T08:23:45Z",
    serverLoad: {
      cpu: 24,
      memory: 38,
      disk: 47,
    },
  });

  useEffect(() => {
    // 실제 앱에서는 API 호출을 통해 데이터를 가져옴
    // 여기서는 목업 데이터 생성
    const loadDashboardData = () => {
      setIsLoading(true);

      // 목업 데이터 생성
      const mockData = {
        stats: {
          totalHospitals: platformData?.stats?.hospitals || 287,
          totalUsers: platformData?.stats?.users || 12458,
          totalAppointments: platformData?.stats?.appointments || 8754,
          totalRevenue: platformData?.stats?.revenue || 457890000,
        },
        trends: {
          hospitals: {
            change: 12.5,
            trend: "up",
          },
          users: {
            change: 8.2,
            trend: "up",
          },
          appointments: {
            change: 5.7,
            trend: "up",
          },
          revenue: {
            change: 15.3,
            trend: "up",
          },
        },
        charts: {
          userGrowth: generateUserGrowthData(timeRange),
          revenueByCategory: generateRevenueByCategoryData(),
          appointmentTrend: generateAppointmentTrendData(timeRange),
          hospitalsByRegion: generateHospitalsByRegionData(),
        },
        recentActivity: generateRecentActivity(),
        alerts: generateAlerts(),
        topHospitals: generateTopHospitals(),
      };

      setTimeout(() => {
        setDashboardData(mockData);
        setIsLoading(false);
      }, 800);
    };

    loadDashboardData();
  }, [platformData, timeRange]);

  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
  };

  const refreshData = () => {
    setIsLoading(true);
    // 실제 앱에서는 API 호출을 통해 새로운 데이터를 가져옴
    setTimeout(() => {
      // 목업 데이터 업데이트
      const updatedData = { ...dashboardData };
      updatedData.charts.userGrowth = generateUserGrowthData(timeRange);
      updatedData.charts.appointmentTrend =
        generateAppointmentTrendData(timeRange);
      setDashboardData(updatedData);
      setIsLoading(false);
    }, 800);
  };

  // 사용자 성장 데이터 생성
  function generateUserGrowthData(period) {
    const data = [];
    let days, weeks, months;

    switch (period) {
      case "week":
        days = 7;
        for (let i = 0; i < days; i++) {
          const date = new Date();
          date.setDate(date.getDate() - (days - i - 1));
          data.push({
            date: `${date.getMonth() + 1}/${date.getDate()}`,
            patients: Math.floor(Math.random() * 100) + 200,
            doctors: Math.floor(Math.random() * 20) + 10,
          });
        }
        break;
      case "year":
        months = 12;
        for (let i = 0; i < months; i++) {
          const date = new Date();
          date.setMonth(date.getMonth() - (months - i - 1));
          data.push({
            date: `${date.getFullYear()}/${date.getMonth() + 1}`,
            patients: Math.floor(Math.random() * 800) + 1000,
            doctors: Math.floor(Math.random() * 100) + 50,
          });
        }
        break;
      case "month":
      default:
        days = 30;
        for (let i = 0; i < days; i++) {
          const date = new Date();
          date.setDate(date.getDate() - (days - i - 1));
          data.push({
            date: `${date.getMonth() + 1}/${date.getDate()}`,
            patients: Math.floor(Math.random() * 300) + 400,
            doctors: Math.floor(Math.random() * 40) + 20,
          });
        }
        break;
    }

    return data;
  }

  // 카테고리별 매출 데이터 생성
  function generateRevenueByCategoryData() {
    return [
      { name: "일반진료", value: 35 },
      { name: "성형시술", value: 25 },
      { name: "피부과", value: 15 },
      { name: "치과", value: 12 },
      { name: "기타", value: 13 },
    ];
  }

  // 예약 트렌드 데이터 생성
  function generateAppointmentTrendData(period) {
    const data = [];
    let days, weeks, months;

    switch (period) {
      case "week":
        days = 7;
        for (let i = 0; i < days; i++) {
          const date = new Date();
          date.setDate(date.getDate() - (days - i - 1));
          data.push({
            date: `${date.getMonth() + 1}/${date.getDate()}`,
            appointments: Math.floor(Math.random() * 50) + 100,
            completed: Math.floor(Math.random() * 40) + 80,
            cancelled: Math.floor(Math.random() * 10) + 5,
          });
        }
        break;
      case "year":
        months = 12;
        for (let i = 0; i < months; i++) {
          const date = new Date();
          date.setMonth(date.getMonth() - (months - i - 1));
          data.push({
            date: `${date.getFullYear()}/${date.getMonth() + 1}`,
            appointments: Math.floor(Math.random() * 500) + 800,
            completed: Math.floor(Math.random() * 400) + 600,
            cancelled: Math.floor(Math.random() * 100) + 50,
          });
        }
        break;
      case "month":
      default:
        days = 30;
        for (let i = 0; i < days; i++) {
          const date = new Date();
          date.setDate(date.getDate() - (days - i - 1));
          data.push({
            date: `${date.getMonth() + 1}/${date.getDate()}`,
            appointments: Math.floor(Math.random() * 100) + 200,
            completed: Math.floor(Math.random() * 80) + 150,
            cancelled: Math.floor(Math.random() * 20) + 10,
          });
        }
        break;
    }

    return data;
  }

  // 지역별 병원 데이터 생성
  function generateHospitalsByRegionData() {
    return [
      { name: "서울", value: 120 },
      { name: "부산", value: 45 },
      { name: "인천", value: 38 },
      { name: "대구", value: 30 },
      { name: "광주", value: 25 },
      { name: "대전", value: 22 },
      { name: "기타", value: 67 },
    ];
  }

  // 최근 활동 데이터 생성
  function generateRecentActivity() {
    return [
      {
        id: 1,
        type: "hospital",
        action: "new",
        name: "서울 메디컬 센터",
        time: "2시간 전",
      },
      {
        id: 2,
        type: "user",
        action: "signup",
        name: "김환자",
        time: "3시간 전",
      },
      {
        id: 3,
        type: "appointment",
        action: "complete",
        name: "이의사 - 박환자",
        time: "4시간 전",
      },
      {
        id: 4,
        type: "payment",
        action: "success",
        name: "강남 피부과 - 정산",
        time: "5시간 전",
      },
      {
        id: 5,
        type: "hospital",
        action: "update",
        name: "부산 성형외과",
        time: "6시간 전",
      },
    ];
  }

  // 알림 데이터 생성
  function generateAlerts() {
    return [
      {
        id: 1,
        type: "warning",
        message: "서버 CPU 사용량이 80%를 초과했습니다.",
        time: "10분 전",
      },
      {
        id: 2,
        type: "info",
        message: "시스템 업데이트가 예정되어 있습니다.",
        time: "1시간 전",
      },
      {
        id: 3,
        type: "error",
        message: "결제 게이트웨이 연결 오류가 발생했습니다.",
        time: "2시간 전",
      },
    ];
  }

  // 인기 병원 데이터 생성
  function generateTopHospitals() {
    return [
      {
        id: 1,
        name: "서울 뷰티 클리닉",
        type: "성형외과",
        appointments: 2145,
        revenue: 387500000,
        rating: 4.8,
      },
      {
        id: 2,
        name: "강남 메디컬 센터",
        type: "종합병원",
        appointments: 1876,
        revenue: 298700000,
        rating: 4.7,
      },
      {
        id: 3,
        name: "해운대 피부과",
        type: "피부과",
        appointments: 1543,
        revenue: 187600000,
        rating: 4.9,
      },
      {
        id: 4,
        name: "청담 미소 치과",
        type: "치과",
        appointments: 1298,
        revenue: 156400000,
        rating: 4.6,
      },
      {
        id: 5,
        name: "분당 종합 진료소",
        type: "가정의학과",
        appointments: 1176,
        revenue: 124800000,
        rating: 4.5,
      },
    ];
  }

  // 차트 색상 정의
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
    "#FCCDE5",
    "#FB8072",
  ];

  if (isLoading) {
    return (
      <div className="super-admin-loading-container">
        <div className="super-admin-loading-spinner"></div>
        <p>대시보드 데이터 로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="super-admin-dashboard">
      <div className="super-admin-dashboard-header">
        <div className="super-admin-dashboard-filters">
          <div className="super-admin-time-range">
            <label htmlFor="timeRange">기간:</label>
            <select
              id="timeRange"
              value={timeRange}
              onChange={handleTimeRangeChange}
            >
              <option value="week">최근 7일</option>
              <option value="month">최근 30일</option>
              <option value="year">최근 1년</option>
            </select>
          </div>
          <button
            className="super-admin-refresh-button"
            onClick={refreshData}
            disabled={isLoading}
          >
            <RefreshCw size={16} />
            <span>새로고침</span>
          </button>
        </div>
        <div className="super-admin-export-button">
          <button className="super-admin-button super-admin-button-secondary">
            <Download size={16} />
            <span>보고서 내보내기</span>
          </button>
        </div>
      </div>

      {/* 주요 지표 */}
      <div className="super-admin-metric-cards">
        <div className="super-admin-metric-card">
          <div className="super-admin-metric-icon blue">
            <Building2 size={24} />
          </div>
          <div className="super-admin-metric-info">
            <div className="super-admin-metric-label">총 병원/시설</div>
            <div className="super-admin-metric-value">
              {dashboardData.stats.totalHospitals.toLocaleString()}
            </div>
            <div
              className={`super-admin-metric-trend ${dashboardData.trends.hospitals.trend}`}
            >
              {dashboardData.trends.hospitals.trend === "up" ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}
              <span>{dashboardData.trends.hospitals.change}% 전월 대비</span>
            </div>
          </div>
        </div>

        <div className="super-admin-metric-card">
          <div className="super-admin-metric-icon purple">
            <Users size={24} />
          </div>
          <div className="super-admin-metric-info">
            <div className="super-admin-metric-label">총 사용자</div>
            <div className="super-admin-metric-value">
              {dashboardData.stats.totalUsers.toLocaleString()}
            </div>
            <div
              className={`super-admin-metric-trend ${dashboardData.trends.users.trend}`}
            >
              {dashboardData.trends.users.trend === "up" ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}
              <span>{dashboardData.trends.users.change}% 전월 대비</span>
            </div>
          </div>
        </div>

        <div className="super-admin-metric-card">
          <div className="super-admin-metric-icon amber">
            <Calendar size={24} />
          </div>
          <div className="super-admin-metric-info">
            <div className="super-admin-metric-label">총 예약</div>
            <div className="super-admin-metric-value">
              {dashboardData.stats.totalAppointments.toLocaleString()}
            </div>
            <div
              className={`super-admin-metric-trend ${dashboardData.trends.appointments.trend}`}
            >
              {dashboardData.trends.appointments.trend === "up" ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}
              <span>{dashboardData.trends.appointments.change}% 전월 대비</span>
            </div>
          </div>
        </div>

        <div className="super-admin-metric-card">
          <div className="super-admin-metric-icon green">
            <CreditCard size={24} />
          </div>
          <div className="super-admin-metric-info">
            <div className="super-admin-metric-label">총 매출</div>
            <div className="super-admin-metric-value">
              {dashboardData.stats.totalRevenue.toLocaleString()}원
            </div>
            <div
              className={`super-admin-metric-trend ${dashboardData.trends.revenue.trend}`}
            >
              {dashboardData.trends.revenue.trend === "up" ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}
              <span>{dashboardData.trends.revenue.change}% 전월 대비</span>
            </div>
          </div>
        </div>
      </div>

      {/* 그래프 섹션 */}
      <div className="super-admin-charts">
        <div className="super-admin-chart-card">
          <div className="super-admin-chart-header">
            <h3>사용자 성장 추이</h3>
          </div>
          <div className="super-admin-chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={dashboardData.charts.userGrowth}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorPatients"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorDoctors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="patients"
                  name="환자"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorPatients)"
                />
                <Area
                  type="monotone"
                  dataKey="doctors"
                  name="의사"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorDoctors)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="super-admin-chart-footer">
            <button
              className="super-admin-view-details-button"
              onClick={() => onSectionChange("users")}
            >
              <span>사용자 관리로 이동</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="super-admin-chart-card">
          <div className="super-admin-chart-header">
            <h3>카테고리별 매출 분포</h3>
          </div>
          <div className="super-admin-chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dashboardData.charts.revenueByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {dashboardData.charts.revenueByCategory.map(
                    (entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    )
                  )}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "비율"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="super-admin-chart-footer">
            <button
              className="super-admin-view-details-button"
              onClick={() => onSectionChange("payments")}
            >
              <span>결제 관리로 이동</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="super-admin-chart-card">
          <div className="super-admin-chart-header">
            <h3>예약 현황 추이</h3>
          </div>
          <div className="super-admin-chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={dashboardData.charts.appointmentTrend}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="appointments"
                  name="총 예약"
                  stackId="a"
                  fill="#8884d8"
                />
                <Bar
                  dataKey="completed"
                  name="완료"
                  stackId="a"
                  fill="#82ca9d"
                />
                <Bar
                  dataKey="cancelled"
                  name="취소"
                  stackId="a"
                  fill="#ffc658"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="super-admin-chart-footer">
            <button
              className="super-admin-view-details-button"
              onClick={() => onSectionChange("logs")}
            >
              <span>상세 보고서 보기</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="super-admin-chart-card">
          <div className="super-admin-chart-header">
            <h3>지역별 병원 분포</h3>
          </div>
          <div className="super-admin-chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={dashboardData.charts.hospitalsByRegion}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  width={80}
                />
                <Tooltip />
                <Bar
                  dataKey="value"
                  name="병원 수"
                  fill="#0088FE"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="super-admin-chart-footer">
            <button
              className="super-admin-view-details-button"
              onClick={() => onSectionChange("hospitals")}
            >
              <span>병원 관리로 이동</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 시스템 상태 섹션 */}
      <div className="super-admin-secondary-cards">
        <div className="super-admin-card super-admin-system-status">
          <div className="super-admin-card-header">
            <h3>시스템 상태</h3>
            <button className="super-admin-card-refresh">
              <RefreshCw size={16} />
            </button>
          </div>
          <div className="super-admin-card-content">
            <div className="super-admin-status-item">
              <div className="super-admin-status-label">상태</div>
              <div className="super-admin-status-value">
                <span
                  className={`super-admin-status-badge ${systemStatus.status}`}
                >
                  {systemStatus.status === "healthy"
                    ? "정상"
                    : systemStatus.status === "warning"
                    ? "주의"
                    : "오류"}
                </span>
              </div>
            </div>
            <div className="super-admin-status-item">
              <div className="super-admin-status-label">가동 시간</div>
              <div className="super-admin-status-value">
                {systemStatus.uptime}
              </div>
            </div>
            <div className="super-admin-status-item">
              <div className="super-admin-status-label">마지막 재시작</div>
              <div className="super-admin-status-value">
                {new Date(systemStatus.lastRestart).toLocaleString()}
              </div>
            </div>
            <div className="super-admin-status-item">
              <div className="super-admin-status-label">서버 부하</div>
              <div className="super-admin-status-value">
                <div className="super-admin-progress-bars">
                  <div className="super-admin-progress-item">
                    <span>CPU</span>
                    <div className="super-admin-progress-container">
                      <div
                        className="super-admin-progress-bar"
                        style={{ width: `${systemStatus.serverLoad.cpu}%` }}
                      ></div>
                    </div>
                    <span>{systemStatus.serverLoad.cpu}%</span>
                  </div>
                  <div className="super-admin-progress-item">
                    <span>메모리</span>
                    <div className="super-admin-progress-container">
                      <div
                        className="super-admin-progress-bar"
                        style={{
                          width: `${systemStatus.serverLoad.memory}%`,
                        }}
                      ></div>
                    </div>
                    <span>{systemStatus.serverLoad.memory}%</span>
                  </div>
                  <div className="super-admin-progress-item">
                    <span>디스크</span>
                    <div className="super-admin-progress-container">
                      <div
                        className="super-admin-progress-bar"
                        style={{
                          width: `${systemStatus.serverLoad.disk}%`,
                        }}
                      ></div>
                    </div>
                    <span>{systemStatus.serverLoad.disk}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="super-admin-card-footer">
            <button
              className="super-admin-view-details-button"
              onClick={() => onSectionChange("settings")}
            >
              <span>시스템 설정 보기</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="super-admin-card super-admin-recent-activity">
          <div className="super-admin-card-header">
            <h3>최근 활동</h3>
          </div>
          <div className="super-admin-card-content">
            <div className="super-admin-activity-list">
              {dashboardData.recentActivity.map((activity) => (
                <div key={activity.id} className="super-admin-activity-item">
                  <div className={`super-admin-activity-icon ${activity.type}`}>
                    {activity.type === "hospital" ? (
                      <Building2 size={16} />
                    ) : activity.type === "user" ? (
                      <Users size={16} />
                    ) : activity.type === "appointment" ? (
                      <Calendar size={16} />
                    ) : (
                      <CreditCard size={16} />
                    )}
                  </div>
                  <div className="super-admin-activity-details">
                    <div className="super-admin-activity-message">
                      {activity.action === "new"
                        ? `신규 ${
                            activity.type === "hospital"
                              ? "병원"
                              : activity.type === "user"
                              ? "사용자"
                              : activity.type === "appointment"
                              ? "예약"
                              : "결제"
                          } 등록: ${activity.name}`
                        : activity.action === "update"
                        ? `${
                            activity.type === "hospital"
                              ? "병원"
                              : activity.type === "user"
                              ? "사용자"
                              : activity.type === "appointment"
                              ? "예약"
                              : "결제"
                          } 정보 업데이트: ${activity.name}`
                        : activity.action === "signup"
                        ? `신규 가입: ${activity.name}`
                        : activity.action === "complete"
                        ? `예약 완료: ${activity.name}`
                        : `결제 성공: ${activity.name}`}
                    </div>
                    <div className="super-admin-activity-time">
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="super-admin-card-footer">
            <button
              className="super-admin-view-details-button"
              onClick={() => onSectionChange("logs")}
            >
              <span>모든 활동 보기</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="super-admin-card super-admin-alerts">
          <div className="super-admin-card-header">
            <h3>알림</h3>
          </div>
          <div className="super-admin-card-content">
            <div className="super-admin-alerts-list">
              {dashboardData.alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`super-admin-alert-item ${alert.type}`}
                >
                  <div className="super-admin-alert-icon">
                    {alert.type === "warning" ? (
                      <AlertTriangle size={16} />
                    ) : alert.type === "info" ? (
                      <Activity size={16} />
                    ) : (
                      <AlertTriangle size={16} />
                    )}
                  </div>
                  <div className="super-admin-alert-details">
                    <div className="super-admin-alert-message">
                      {alert.message}
                    </div>
                    <div className="super-admin-alert-time">{alert.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="super-admin-card-footer">
            <button
              className="super-admin-view-details-button"
              onClick={() => onSectionChange("logs")}
            >
              <span>모든 알림 보기</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="super-admin-card super-admin-top-hospitals">
          <div className="super-admin-card-header">
            <h3>인기 병원</h3>
          </div>
          <div className="super-admin-card-content">
            <div className="super-admin-table-container">
              <table className="super-admin-table">
                <thead>
                  <tr>
                    <th>병원명</th>
                    <th>카테고리</th>
                    <th>예약수</th>
                    <th>매출</th>
                    <th>평점</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.topHospitals.map((hospital) => (
                    <tr key={hospital.id}>
                      <td>{hospital.name}</td>
                      <td>{hospital.type}</td>
                      <td>{hospital.appointments.toLocaleString()}</td>
                      <td>{hospital.revenue.toLocaleString()}원</td>
                      <td>
                        <div className="super-admin-rating">
                          <span
                            className="super-admin-rating-stars"
                            style={{
                              width: `${(hospital.rating / 5) * 100}%`,
                            }}
                          ></span>
                          <span className="super-admin-rating-value">
                            {hospital.rating}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="super-admin-card-footer">
            <button
              className="super-admin-view-details-button"
              onClick={() => onSectionChange("hospitals")}
            >
              <span>모든 병원 보기</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="super-admin-dashboard-footer">
        <div className="super-admin-dashboard-actions">
          <button
            className="super-admin-button super-admin-button-primary"
            onClick={() => onSectionChange("settings")}
          >
            <Shield size={16} />
            <span>시스템 설정</span>
          </button>
          <button
            className="super-admin-button super-admin-button-secondary"
            onClick={() => onSectionChange("logs")}
          >
            <FileBarChart2 size={16} />
            <span>보고서 및 로그</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
