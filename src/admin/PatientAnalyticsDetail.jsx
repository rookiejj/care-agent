import React, { useState, useEffect } from "react";
import {
  BarChart4,
  Calendar,
  Download,
  Users,
  ArrowUp,
  ArrowDown,
  Loader,
  Filter,
  ArrowLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  Activity,
} from "lucide-react";
import CustomLineChart from "./components/CustomLineChart";
import PieChartComponent from "./components/PieChartComponent";
import "./PatientAnalyticsDetail.css";

const PatientAnalyticsDetail = ({ hospitalData, onBack }) => {
  const [timeRange, setTimeRange] = useState("year");
  const [patientType, setPatientType] = useState("all");
  const [department, setDepartment] = useState("all");
  const [patientVisitsData, setPatientVisitsData] = useState([]);
  const [patientsByDepartment, setPatientsByDepartment] = useState([]);
  const [patientsByAge, setPatientsByAge] = useState([]);
  const [patientsByGender, setPatientsByGender] = useState([]);
  const [patientComparisonData, setPatientComparisonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalPatients: 0,
    newPatients: 0,
    returningPatients: 0,
    averageVisitsPerPatient: 0,
    growthRate: 0,
  });

  useEffect(() => {
    // 실제 구현에서는 API 호출을 통해 데이터를 가져옴
    // 여기서는 목업 데이터 사용

    setIsLoading(true);

    // 시간 범위에 따른 데이터 포맷 조정
    let timeFormat;
    let mockPatientVisitsData;

    if (timeRange === "year") {
      timeFormat = "월";
      mockPatientVisitsData = [
        { name: "1월", 신규환자: 35, 재방문환자: 30, 총환자수: 65 },
        { name: "2월", 신규환자: 28, 재방문환자: 31, 총환자수: 59 },
        { name: "3월", 신규환자: 34, 재방문환자: 46, 총환자수: 80 },
        { name: "4월", 신규환자: 39, 재방문환자: 42, 총환자수: 81 },
        { name: "5월", 신규환자: 26, 재방문환자: 30, 총환자수: 56 },
        { name: "6월", 신규환자: 25, 재방문환자: 30, 총환자수: 55 },
        { name: "7월", 신규환자: 18, 재방문환자: 22, 총환자수: 40 },
        { name: "8월", 신규환자: 29, 재방문환자: 41, 총환자수: 70 },
        { name: "9월", 신규환자: 38, 재방문환자: 52, 총환자수: 90 },
        { name: "10월", 신규환자: 48, 재방문환자: 62, 총환자수: 110 },
        { name: "11월", 신규환자: 45, 재방문환자: 60, 총환자수: 105 },
        { name: "12월", 신규환자: 52, 재방문환자: 68, 총환자수: 120 },
      ];
    } else if (timeRange === "quarter") {
      timeFormat = "주";
      mockPatientVisitsData = [
        { name: "1주", 신규환자: 12, 재방문환자: 18, 총환자수: 30 },
        { name: "2주", 신규환자: 15, 재방문환자: 20, 총환자수: 35 },
        { name: "3주", 신규환자: 18, 재방문환자: 22, 총환자수: 40 },
        { name: "4주", 신규환자: 14, 재방문환자: 16, 총환자수: 30 },
        { name: "5주", 신규환자: 16, 재방문환자: 19, 총환자수: 35 },
        { name: "6주", 신규환자: 20, 재방문환자: 25, 총환자수: 45 },
        { name: "7주", 신규환자: 22, 재방문환자: 23, 총환자수: 45 },
        { name: "8주", 신규환자: 23, 재방문환자: 27, 총환자수: 50 },
        { name: "9주", 신규환자: 25, 재방문환자: 30, 총환자수: 55 },
        { name: "10주", 신규환자: 28, 재방문환자: 32, 총환자수: 60 },
        { name: "11주", 신규환자: 30, 재방문환자: 35, 총환자수: 65 },
        { name: "12주", 신규환자: 33, 재방문환자: 37, 총환자수: 70 },
      ];
    } else if (timeRange === "month") {
      timeFormat = "일";
      mockPatientVisitsData = Array.from({ length: 31 }, (_, i) => {
        const day = i + 1;
        const newPatients = Math.floor(Math.random() * 8) + 2;
        const returningPatients = Math.floor(Math.random() * 12) + 3;
        return {
          name: `${day}${timeFormat}`,
          신규환자: newPatients,
          재방문환자: returningPatients,
          총환자수: newPatients + returningPatients,
        };
      });
    } else if (timeRange === "week") {
      timeFormat = "일";
      const days = ["월", "화", "수", "목", "금", "토", "일"];
      mockPatientVisitsData = days.map((day) => {
        const newPatients = Math.floor(Math.random() * 5) + 1;
        const returningPatients = Math.floor(Math.random() * 8) + 2;
        return {
          name: day,
          신규환자: newPatients,
          재방문환자: returningPatients,
          총환자수: newPatients + returningPatients,
        };
      });
    }

    // 진료과별 환자 분포 차트 데이터
    const mockPatientsByDepartment = [
      { name: "내과", value: 35 },
      { name: "정형외과", value: 20 },
      { name: "피부과", value: 15 },
      { name: "소아과", value: 10 },
      { name: "이비인후과", value: 10 },
      { name: "성형외과", value: 8 },
      { name: "기타", value: 2 },
    ];

    // 연령대별 환자 분포 차트 데이터
    const mockPatientsByAge = [
      { name: "10대 이하", value: 5 },
      { name: "20대", value: 15 },
      { name: "30대", value: 25 },
      { name: "40대", value: 20 },
      { name: "50대", value: 18 },
      { name: "60대", value: 12 },
      { name: "70대 이상", value: 5 },
    ];

    // 성별 환자 분포 차트 데이터
    const mockPatientsByGender = [
      { name: "여성", value: 58 },
      { name: "남성", value: 42 },
    ];

    // 작년 대비 환자 수 비교 데이터
    const mockPatientComparisonData = [
      { name: "1월", 올해: 65, 작년: 55 },
      { name: "2월", 올해: 59, 작년: 50 },
      { name: "3월", 올해: 80, 작년: 65 },
      { name: "4월", 올해: 81, 작년: 70 },
      { name: "5월", 올해: 56, 작년: 48 },
      { name: "6월", 올해: 55, 작년: 45 },
      { name: "7월", 올해: 40, 작년: 38 },
      { name: "8월", 올해: 70, 작년: 60 },
      { name: "9월", 올해: 90, 작년: 75 },
      { name: "10월", 올해: 110, 작년: 85 },
      { name: "11월", 올해: 105, 작년: 80 },
      { name: "12월", 올해: 120, 작년: 90 },
    ];

    // 주요 지표 계산
    const total = mockPatientVisitsData.reduce(
      (sum, item) => sum + item.총환자수,
      0
    );
    const newTotal = mockPatientVisitsData.reduce(
      (sum, item) => sum + item.신규환자,
      0
    );
    const returningTotal = mockPatientVisitsData.reduce(
      (sum, item) => sum + item.재방문환자,
      0
    );
    const avgVisits = (returningTotal / (newTotal || 1) + 1).toFixed(2);

    // 전년 대비 성장률
    const thisYearTotal = mockPatientComparisonData.reduce(
      (sum, item) => sum + item.올해,
      0
    );
    const lastYearTotal = mockPatientComparisonData.reduce(
      (sum, item) => sum + item.작년,
      0
    );
    const growthRate = (
      ((thisYearTotal - lastYearTotal) / lastYearTotal) *
      100
    ).toFixed(1);

    const mockMetrics = {
      totalPatients: total,
      newPatients: newTotal,
      returningPatients: returningTotal,
      averageVisitsPerPatient: avgVisits,
      growthRate: parseFloat(growthRate),
    };

    // 데이터 로딩 시뮬레이션
    setTimeout(() => {
      setPatientVisitsData(mockPatientVisitsData);
      setPatientsByDepartment(mockPatientsByDepartment);
      setPatientsByAge(mockPatientsByAge);
      setPatientsByGender(mockPatientsByGender);
      setPatientComparisonData(mockPatientComparisonData);
      setMetrics(mockMetrics);
      setIsLoading(false);
    }, 800);
  }, [timeRange, patientType, department]);

  // 필터 변경 핸들러
  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
  };

  const handlePatientTypeChange = (e) => {
    setPatientType(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  // 데이터 내보내기 핸들러
  const handleExportData = () => {
    alert("데이터가 엑셀 파일로 내보내기 됩니다.");
  };

  if (isLoading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-spinner"></div>
        <p>분석 데이터 로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="patient-analytics-detail">
      <div className="analytics-page-header">
        <div className="analytics-back-section">
          <button onClick={onBack} className="analytics-back-button">
            <ArrowLeft size={20} style={{ marginRight: "0.5rem" }} />
            대시보드로 돌아가기
          </button>
          <div className="analytics-location-info">
            현재 위치:{" "}
            <span className="analytics-location-current">환자 방문 분석</span>
          </div>
        </div>

        <h2 className="admin-section-title">환자 방문 분석</h2>
        <p className="admin-section-description">
          시간별, 유형별, 진료과별 환자 방문 현황을 분석하고 추세를 파악합니다.
        </p>
      </div>

      {/* 필터 섹션 */}
      <div className="analytics-filters">
        <div className="analytics-filter-item">
          <span className="analytics-filter-label">기간:</span>
          <select
            className="analytics-filter-select"
            value={timeRange}
            onChange={handleTimeRangeChange}
          >
            <option value="year">연간</option>
            <option value="quarter">분기</option>
            <option value="month">월간</option>
            <option value="week">주간</option>
          </select>
        </div>
        <div className="analytics-filter-item">
          <span className="analytics-filter-label">환자 유형:</span>
          <select
            className="analytics-filter-select"
            value={patientType}
            onChange={handlePatientTypeChange}
          >
            <option value="all">모든 환자</option>
            <option value="new">신규 환자</option>
            <option value="returning">재방문 환자</option>
          </select>
        </div>
        <div className="analytics-filter-item">
          <span className="analytics-filter-label">진료과:</span>
          <select
            className="analytics-filter-select"
            value={department}
            onChange={handleDepartmentChange}
          >
            <option value="all">모든 진료과</option>
            <option value="internal">내과</option>
            <option value="orthopedics">정형외과</option>
            <option value="dermatology">피부과</option>
            <option value="pediatrics">소아과</option>
            <option value="ent">이비인후과</option>
            <option value="cosmetic">성형외과</option>
          </select>
        </div>
        <button
          className="admin-button admin-button-secondary"
          onClick={handleExportData}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <Download size={16} />
          데이터 내보내기
        </button>
      </div>

      {/* 주요 지표 섹션 */}
      <div className="admin-stats-grid">
        <div className="admin-card">
          <h3
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#111827",
              marginBottom: "0.5rem",
            }}
          >
            {metrics.totalPatients.toLocaleString()}
          </h3>
          <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>총 환자 수</p>
        </div>
        <div className="admin-card">
          <h3
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#111827",
              marginBottom: "0.5rem",
            }}
          >
            {metrics.newPatients.toLocaleString()}
          </h3>
          <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>신규 환자 수</p>
        </div>
        <div className="admin-card">
          <h3
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#111827",
              marginBottom: "0.5rem",
            }}
          >
            {metrics.returningPatients.toLocaleString()}
          </h3>
          <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
            재방문 환자 수
          </p>
        </div>
        <div className="admin-card">
          <h3
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#111827",
              marginBottom: "0.5rem",
            }}
          >
            {metrics.averageVisitsPerPatient}
          </h3>
          <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
            환자당 평균 방문 횟수
          </p>
        </div>
        <div className="admin-card">
          <div style={{ display: "flex", alignItems: "center" }}>
            <h3
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#111827",
                marginBottom: "0.5rem",
              }}
            >
              {metrics.growthRate}%
            </h3>
            {metrics.growthRate > 0 ? (
              <ArrowUp
                size={24}
                color="#059669"
                style={{ marginLeft: "0.5rem" }}
              />
            ) : (
              <ArrowDown
                size={24}
                color="#dc2626"
                style={{ marginLeft: "0.5rem" }}
              />
            )}
          </div>
          <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
            전년 대비 성장률
          </p>
        </div>
      </div>

      {/* 환자 방문 추이 차트 */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">환자 방문 추이</h3>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#3b82f6",
                  borderRadius: "2px",
                }}
              ></div>
              <span style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                신규 환자
              </span>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#10b981",
                  borderRadius: "2px",
                }}
              ></div>
              <span style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                재방문 환자
              </span>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#6366f1",
                  borderRadius: "2px",
                }}
              ></div>
              <span style={{ fontSize: "0.875rem", color: "#4b5563" }}>
                총 환자수
              </span>
            </div>
          </div>
        </div>
        <div style={{ height: "400px" }}>
          <CustomLineChart data={patientVisitsData} />
        </div>
      </div>

      {/* 환자 비교 차트 */}
      <div style={{ marginBottom: "2rem" }}>
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            color: "#111827",
            marginBottom: "1rem",
          }}
        >
          전년 대비 환자 방문 비교
        </h3>
        <div className="admin-card">
          <div style={{ height: "400px" }}>
            <CustomLineChart data={patientComparisonData} />
          </div>
        </div>
      </div>

      {/* 환자 분포 차트 그리드 */}
      <div className="admin-grid">
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">진료과별 환자 분포</h3>
          </div>
          <div style={{ height: "300px" }}>
            <PieChartComponent data={patientsByDepartment} />
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">연령대별 환자 분포</h3>
          </div>
          <div style={{ height: "300px" }}>
            <PieChartComponent data={patientsByAge} />
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">성별 환자 분포</h3>
          </div>
          <div style={{ height: "300px" }}>
            <PieChartComponent data={patientsByGender} />
          </div>
        </div>
      </div>

      {/* 상세 데이터 테이블 */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>기간</th>
              <th>총 환자수</th>
              <th>신규 환자</th>
              <th>재방문 환자</th>
              <th>전월 대비</th>
              <th>전년 동월 대비</th>
            </tr>
          </thead>
          <tbody>
            {patientVisitsData.slice(0, 8).map((item, index) => {
              const prevMonthChange =
                index > 0
                  ? (
                      ((item.총환자수 - patientVisitsData[index - 1].총환자수) /
                        patientVisitsData[index - 1].총환자수) *
                      100
                    ).toFixed(1)
                  : 0;

              const lastYearData = patientComparisonData.find(
                (d) => d.name === item.name
              );
              const lastYearChange = lastYearData
                ? (
                    ((item.총환자수 - lastYearData.작년) / lastYearData.작년) *
                    100
                  ).toFixed(1)
                : 0;

              return (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.총환자수}</td>
                  <td>{item.신규환자}</td>
                  <td>{item.재방문환자}</td>
                  <td>
                    {index > 0 && (
                      <div
                        className={`admin-badge ${
                          prevMonthChange >= 0
                            ? "admin-badge-success"
                            : "admin-badge-danger"
                        }`}
                      >
                        {prevMonthChange >= 0 ? "+" : ""}
                        {prevMonthChange}%
                      </div>
                    )}
                  </td>
                  <td>
                    {lastYearData && (
                      <div
                        className={`admin-badge ${
                          lastYearChange >= 0
                            ? "admin-badge-success"
                            : "admin-badge-danger"
                        }`}
                      >
                        {lastYearChange >= 0 ? "+" : ""}
                        {lastYearChange}%
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientAnalyticsDetail;
