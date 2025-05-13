import React, { useState, useEffect } from "react";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Calendar,
  Users,
  DollarSign,
  Clock,
  Share2,
  Download,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Filter,
  Activity,
  RefreshCw,
  FileText,
  Wallet,
  Award,
  Heart,
  Stethoscope,
  FileBarChart,
  FilePlus,
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
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import "./Reports.css";

const Reports = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reportPeriod, setReportPeriod] = useState("month");
  const [reportData, setReportData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showExportMenu, setShowExportMenu] = useState(false);

  useEffect(() => {
    // 현재 날짜 설정
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    // 기본 기간 설정 (한 달)
    const currentDate = `${year}-${month}-${day}`;
    const pastDate = `${year}-${String(now.getMonth()).padStart(
      2,
      "0"
    )}-${day}`;

    setEndDate(currentDate);
    setStartDate(pastDate);

    // 데이터 로딩 시뮬레이션
    fetchReportData(reportPeriod);
  }, []);

  const fetchReportData = (period) => {
    setIsLoading(true);

    // 실제 앱에서는 API 호출을 통해 데이터를 가져옴
    // 여기서는 목업 데이터 사용
    setTimeout(() => {
      const data = generateMockData(period);
      setReportData(data);
      setIsLoading(false);
    }, 1000);
  };

  const handlePeriodChange = (e) => {
    const newPeriod = e.target.value;
    setReportPeriod(newPeriod);
    fetchReportData(newPeriod);
  };

  const handleDateChange = (e) => {
    const { id, value } = e.target;
    if (id === "start-date") {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

  const handleFilterApply = () => {
    // 실제 앱에서는 선택된 날짜로 데이터를 필터링
    fetchReportData(reportPeriod);
  };

  const toggleExportMenu = () => {
    setShowExportMenu(!showExportMenu);
  };

  const handleExport = (format) => {
    // 실제 앱에서는 선택된 형식으로 보고서 내보내기 기능 구현
    alert(`보고서를 ${format} 형식으로 내보냅니다.`);
    setShowExportMenu(false);
  };

  const generateMockData = (period) => {
    // 기간에 따라 다른 목업 데이터 생성
    const months = [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ];
    const days = Array.from({ length: 30 }, (_, i) => `${i + 1}일`);
    const weeks = ["1주차", "2주차", "3주차", "4주차", "5주차"];

    let patientVisits;
    let revenueData;
    let xAxisData;

    switch (period) {
      case "day":
        xAxisData = Array.from({ length: 24 }, (_, i) => `${i}시`);
        patientVisits = xAxisData.map((hour) => ({
          name: hour,
          value: Math.floor(Math.random() * 15) + 1,
        }));
        revenueData = xAxisData.map((hour) => ({
          name: hour,
          수입: Math.floor(Math.random() * 500000) + 100000,
        }));
        break;
      case "week":
        xAxisData = Array.from(
          { length: 7 },
          (_, i) => ["일", "월", "화", "수", "목", "금", "토"][i]
        );
        patientVisits = xAxisData.map((day) => ({
          name: day,
          value: Math.floor(Math.random() * 50) + 10,
        }));
        revenueData = xAxisData.map((day) => ({
          name: day,
          수입: Math.floor(Math.random() * 1000000) + 500000,
        }));
        break;
      case "year":
        xAxisData = months;
        patientVisits = xAxisData.map((month) => ({
          name: month,
          value: Math.floor(Math.random() * 500) + 100,
        }));
        revenueData = xAxisData.map((month) => ({
          name: month,
          수입: Math.floor(Math.random() * 50000000) + 10000000,
        }));
        break;
      case "month":
      default:
        xAxisData = Array.from({ length: 30 }, (_, i) => `${i + 1}일`);
        patientVisits = xAxisData.map((day) => ({
          name: day,
          value: Math.floor(Math.random() * 80) + 20,
        }));
        revenueData = xAxisData.map((day) => ({
          name: day,
          수입: Math.floor(Math.random() * 2000000) + 1000000,
        }));
        break;
    }

    // 진료과별 환자 분포
    const departments = [
      "내과",
      "외과",
      "소아과",
      "산부인과",
      "정형외과",
      "신경과",
      "안과",
      "이비인후과",
      "피부과",
      "비뇨기과",
    ];

    const COLORS = [
      "#0088FE",
      "#00C49F",
      "#FFBB28",
      "#FF8042",
      "#8884D8",
      "#82CA9D",
      "#FFC658",
      "#8DD1E1",
      "#A4DE6C",
      "#D0ED57",
    ];

    const departmentData = departments.map((dept, index) => ({
      name: dept,
      value: Math.floor(Math.random() * 100) + 50,
      color: COLORS[index % COLORS.length],
    }));

    // 시간대별 환자 유입
    const hourlyFlow = Array.from({ length: 12 }, (_, i) => ({
      name: `${i + 9}시`,
      방문: Math.floor(Math.random() * 15) + 5,
      예약: Math.floor(Math.random() * 20) + 10,
    }));

    // 상위 의사
    const topDoctors = [
      {
        name: "김의사",
        department: "내과",
        patients: Math.floor(Math.random() * 50) + 100,
      },
      {
        name: "이의사",
        department: "소아과",
        patients: Math.floor(Math.random() * 40) + 90,
      },
      {
        name: "박의사",
        department: "정형외과",
        patients: Math.floor(Math.random() * 30) + 80,
      },
      {
        name: "최의사",
        department: "피부과",
        patients: Math.floor(Math.random() * 20) + 70,
      },
      {
        name: "정의사",
        department: "신경과",
        patients: Math.floor(Math.random() * 20) + 60,
      },
    ].sort((a, b) => b.patients - a.patients);

    // 주요 진료 항목
    const topServices = [
      {
        name: "일반 진료",
        revenue: Math.floor(Math.random() * 5000000) + 10000000,
      },
      {
        name: "건강 검진",
        revenue: Math.floor(Math.random() * 4000000) + 8000000,
      },
      {
        name: "예방 접종",
        revenue: Math.floor(Math.random() * 3000000) + 6000000,
      },
      {
        name: "물리 치료",
        revenue: Math.floor(Math.random() * 2000000) + 4000000,
      },
      {
        name: "영상 진단",
        revenue: Math.floor(Math.random() * 1000000) + 3000000,
      },
    ].sort((a, b) => b.revenue - a.revenue);

    return {
      summary: {
        patients: {
          total: Math.floor(Math.random() * 1000) + 1000,
          change: Math.floor(Math.random() * 15) + 5,
          trend: "up",
        },
        revenue: {
          total: Math.floor(Math.random() * 100000000) + 50000000,
          change: Math.floor(Math.random() * 10) + 2,
          trend: "up",
        },
        appointments: {
          total: Math.floor(Math.random() * 800) + 800,
          change: Math.floor(Math.random() * 5) - 2,
          trend: "down",
        },
        averageWait: {
          total: Math.floor(Math.random() * 10) + 20,
          change: Math.floor(Math.random() * 5) - 2,
          trend: "down",
        },
      },
      patientVisits,
      revenueData,
      departmentData,
      hourlyFlow,
      topDoctors,
      topServices,
      xAxisData,
    };
  };

  if (isLoading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-spinner"></div>
        <p>보고서 데이터 로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="reports-page">
      <div className="admin-section-header">
        <h2 className="admin-section-title">통계 및 보고서</h2>
        <p className="admin-section-description">
          환자 방문, 매출, 진료과별 통계 등 병원 운영에 필요한 통계와 보고서를
          확인하세요.
        </p>
      </div>

      <div className="admin-filters">
        <div className="reports-filter-group">
          <span className="reports-filter-label">기간:</span>
          <select
            className="reports-filter-select"
            value={reportPeriod}
            onChange={handlePeriodChange}
          >
            <option value="day">일간</option>
            <option value="week">주간</option>
            <option value="month">월간</option>
            <option value="year">연간</option>
          </select>
        </div>

        <div className="reports-filter-group">
          <span className="reports-filter-label">시작일:</span>
          <input
            type="date"
            id="start-date"
            className="reports-filter-datepicker"
            value={startDate}
            onChange={handleDateChange}
          />
        </div>

        <div className="reports-filter-group">
          <span className="reports-filter-label">종료일:</span>
          <input
            type="date"
            id="end-date"
            className="reports-filter-datepicker"
            value={endDate}
            onChange={handleDateChange}
          />
        </div>

        <div className="reports-filter-group">
          <button className="reports-filter-button" onClick={handleFilterApply}>
            <Filter size={16} />
            <span>필터 적용</span>
          </button>
        </div>

        <div className="report-actions">
          <div style={{ position: "relative" }}>
            <button
              className="reports-filter-button"
              onClick={toggleExportMenu}
            >
              <Download size={16} />
              <span>내보내기</span>
            </button>

            {showExportMenu && (
              <div className="export-menu">
                <div
                  className="export-option"
                  onClick={() => handleExport("pdf")}
                >
                  <FileText size={16} />
                  <span>PDF</span>
                </div>
                <div
                  className="export-option"
                  onClick={() => handleExport("excel")}
                >
                  <FileBarChart size={16} />
                  <span>Excel</span>
                </div>
                <div
                  className="export-option"
                  onClick={() => handleExport("csv")}
                >
                  <FilePlus size={16} />
                  <span>CSV</span>
                </div>
              </div>
            )}
          </div>

          <button
            className="reports-filter-button"
            onClick={() => fetchReportData(reportPeriod)}
          >
            <RefreshCw size={16} />
            <span>새로고침</span>
          </button>
        </div>
      </div>

      {/* 요약 지표 */}
      <div className="metric-row">
        <div className="metric-card">
          <div className="reports-metric-icon blue">
            <Users size={24} />
          </div>
          <div className="metric-info">
            <div className="reports-metric-label">총 환자 수</div>
            <div className="reports-metric-value">
              {reportData.summary.patients.total.toLocaleString()}명
            </div>
            <div
              className={`metric-trend ${reportData.summary.patients.trend}`}
            >
              {reportData.summary.patients.trend === "up" ? (
                <ArrowUp size={14} />
              ) : (
                <ArrowDown size={14} />
              )}
              <span>{reportData.summary.patients.change}% 전월 대비</span>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="reports-metric-icon green">
            <DollarSign size={24} />
          </div>
          <div className="metric-info">
            <div className="reports-metric-label">총 매출</div>
            <div className="reports-metric-value">
              {reportData.summary.revenue.total.toLocaleString()}원
            </div>
            <div className={`metric-trend ${reportData.summary.revenue.trend}`}>
              {reportData.summary.revenue.trend === "up" ? (
                <ArrowUp size={14} />
              ) : (
                <ArrowDown size={14} />
              )}
              <span>{reportData.summary.revenue.change}% 전월 대비</span>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="reports-metric-icon amber">
            <Calendar size={24} />
          </div>
          <div className="metric-info">
            <div className="reports-metric-label">총 예약 건수</div>
            <div className="reports-metric-value">
              {reportData.summary.appointments.total.toLocaleString()}건
            </div>
            <div
              className={`metric-trend ${reportData.summary.appointments.trend}`}
            >
              {reportData.summary.appointments.trend === "up" ? (
                <ArrowUp size={14} />
              ) : (
                <ArrowDown size={14} />
              )}
              <span>{reportData.summary.appointments.change}% 전월 대비</span>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="reports-metric-icon purple">
            <Clock size={24} />
          </div>
          <div className="metric-info">
            <div className="reports-metric-label">평균 대기 시간</div>
            <div className="reports-metric-value">
              {reportData.summary.averageWait.total}분
            </div>
            <div
              className={`metric-trend ${reportData.summary.averageWait.trend}`}
            >
              {reportData.summary.averageWait.trend === "up" ? (
                <ArrowUp size={14} />
              ) : (
                <ArrowDown size={14} />
              )}
              <span>{reportData.summary.averageWait.change}% 전월 대비</span>
            </div>
          </div>
        </div>
      </div>

      {/* 차트 그리드 */}
      <div className="reports-grid">
        {/* 환자 방문 추이 */}
        <div className="report-card">
          <div className="report-card-header">
            <h3 className="report-card-title">환자 방문 추이</h3>
            <div className="report-card-actions">
              <button className="report-card-action">
                <Share2 size={16} />
              </button>
              <button className="report-card-action">
                <Download size={16} />
              </button>
            </div>
          </div>
          <div className="report-card-content">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={reportData.patientVisits}
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
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tickFormatter={(value) => {
                    // x축 라벨 길이에 따라 표시 방식 조정
                    return reportData.patientVisits.length > 20
                      ? value.slice(0, 1)
                      : value;
                  }}
                />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  name="환자 수"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorPatients)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 진료과별 환자 분포 */}
        <div className="report-card">
          <div className="report-card-header">
            <h3 className="report-card-title">진료과별 환자 분포</h3>
            <div className="report-card-actions">
              <button className="report-card-action">
                <Share2 size={16} />
              </button>
              <button className="report-card-action">
                <Download size={16} />
              </button>
            </div>
          </div>
          <div className="report-card-content">
            <div className="department-breakdown">
              <div className="department-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={reportData.departmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      nameKey="name"
                    >
                      {reportData.departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="department-list">
                {reportData.departmentData.map((dept, index) => (
                  <div key={index} className="department-item">
                    <div
                      className="department-color"
                      style={{ backgroundColor: dept.color }}
                    ></div>
                    <div className="department-name">{dept.name}</div>
                    <div className="department-value">{dept.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 매출 추이 */}
        <div className="report-card">
          <div className="report-card-header">
            <h3 className="report-card-title">매출 추이</h3>
            <div className="report-card-actions">
              <button className="report-card-action">
                <Share2 size={16} />
              </button>
              <button className="report-card-action">
                <Download size={16} />
              </button>
            </div>
          </div>
          <div className="report-card-content">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={reportData.revenueData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tickFormatter={(value) => {
                    return reportData.revenueData.length > 20
                      ? value.slice(0, 1)
                      : value;
                  }}
                />
                <YAxis
                  tickFormatter={(value) =>
                    value >= 1000000
                      ? `${(value / 1000000).toFixed(1)}M`
                      : value >= 1000
                      ? `${(value / 1000).toFixed(1)}K`
                      : value
                  }
                />
                <Tooltip
                  formatter={(value) => [`${value.toLocaleString()}원`, "매출"]}
                />
                <Bar
                  dataKey="수입"
                  name="매출"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 시간대별 환자 유입 */}
        <div className="report-card">
          <div className="report-card-header">
            <h3 className="report-card-title">시간대별 환자 유입</h3>
            <div className="report-card-actions">
              <button className="report-card-action">
                <Share2 size={16} />
              </button>
              <button className="report-card-action">
                <Download size={16} />
              </button>
            </div>
          </div>
          <div className="report-card-content">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={reportData.hourlyFlow}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="예약"
                  name="예약 환자"
                  fill="#8884d8"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="방문"
                  name="방문 환자"
                  fill="#82ca9d"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 상위 의사 */}
        <div className="report-card">
          <div className="report-card-header">
            <h3 className="report-card-title">환자 담당 상위 의사</h3>
            <div className="report-card-actions">
              <button className="report-card-action">
                <Share2 size={16} />
              </button>
              <button className="report-card-action">
                <Download size={16} />
              </button>
            </div>
          </div>
          <div className="report-card-content">
            <div className="ranking-list">
              {reportData.topDoctors.map((doctor, index) => (
                <div key={index} className="ranking-item">
                  <div className="ranking-number">{index + 1}</div>
                  <div className="ranking-info">
                    <h4 className="ranking-name">{doctor.name}</h4>
                    <p className="ranking-detail">{doctor.department}</p>
                  </div>
                  <div className="ranking-value">{doctor.patients}명</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 주요 진료 항목 */}
        <div className="report-card">
          <div className="report-card-header">
            <h3 className="report-card-title">주요 진료 항목 (매출 기준)</h3>
            <div className="report-card-actions">
              <button className="report-card-action">
                <Share2 size={16} />
              </button>
              <button className="report-card-action">
                <Download size={16} />
              </button>
            </div>
          </div>
          <div className="report-card-content">
            <div className="ranking-list">
              {reportData.topServices.map((service, index) => (
                <div key={index} className="ranking-item">
                  <div className="ranking-number">{index + 1}</div>
                  <div className="ranking-info">
                    <h4 className="ranking-name">{service.name}</h4>
                  </div>
                  <div className="ranking-value">
                    {service.revenue.toLocaleString()}원
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 상세 데이터 테이블 */}
        <div className="report-card full-width">
          <div className="report-card-header">
            <h3 className="report-card-title">일별 환자 방문 상세 데이터</h3>
            <div className="report-card-actions">
              <button className="report-card-action">
                <Share2 size={16} />
              </button>
              <button className="report-card-action">
                <Download size={16} />
              </button>
            </div>
          </div>
          <div
            className="report-card-content"
            style={{ height: "auto", padding: 0 }}
          >
            <table className="data-table">
              <thead>
                <tr>
                  <th>날짜</th>
                  <th>환자 수</th>
                  <th>예약 건수</th>
                  <th>취소 건수</th>
                  <th>매출</th>
                  <th>평균 대기 시간</th>
                </tr>
              </thead>
              <tbody>
                {reportData.patientVisits.slice(0, 10).map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.value}명</td>
                    <td>{Math.floor(item.value * 1.2)}건</td>
                    <td>{Math.floor(item.value * 0.1)}건</td>
                    <td>{(Math.floor(Math.random() * 50) + 10) * 10000}원</td>
                    <td>{Math.floor(Math.random() * 10) + 15}분</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
