import React, { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  Activity,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart4,
  PieChart,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  FilePlus,
} from "lucide-react";
import "./Dashboard.css";
import StatCard from "./components/StatCard";
import AppointmentItem from "./components/AppointmentItem";
import CustomLineChart from "./components/CustomLineChart";
import PieChartComponent from "./components/PieChartComponent";

const Dashboard = ({
  hospitalData,
  onViewPatientAnalytics,
  onSectionChange,
}) => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [patientVisitsData, setPatientVisitsData] = useState([]);
  const [departmentDistribution, setDepartmentDistribution] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    patients: {
      total: 0,
      new: 0,
      returning: 0,
      change: 0,
    },
    appointments: {
      today: 0,
      upcoming: 0,
      completed: 0,
      cancelled: 0,
      change: 0,
    },
    doctors: {
      total: 0,
      available: 0,
    },
  });

  useEffect(() => {
    // 실제 구현에서는 API 호출을 통해 데이터를 가져옴
    // 여기서는 목업 데이터 사용

    // 대시보드 통계 데이터 생성
    const mockStats = {
      patients: {
        total: 1458,
        new: 37,
        returning: 128,
        change: 12.4,
      },
      appointments: {
        today: 32,
        upcoming: 78,
        completed: 24,
        cancelled: 3,
        change: 8.7,
      },
      doctors: {
        total: hospitalData?.doctors || 12,
        available: 8,
      },
    };

    // 오늘 예약 목록 생성
    const mockAppointments = [
      {
        id: 1,
        patientName: "김환자",
        time: "09:30",
        department: "내과",
        doctorName: "이의사",
        status: "confirmed",
      },
      {
        id: 2,
        patientName: "박건강",
        time: "10:15",
        department: "정형외과",
        doctorName: "정의사",
        status: "confirmed",
      },
      {
        id: 3,
        patientName: "최병원",
        time: "11:00",
        department: "피부과",
        doctorName: "한의사",
        status: "waiting",
      },
      {
        id: 4,
        patientName: "이진료",
        time: "13:30",
        department: "소아과",
        doctorName: "김의사",
        status: "confirmed",
      },
      {
        id: 5,
        patientName: "정상담",
        time: "15:00",
        department: "내과",
        doctorName: "이의사",
        status: "confirmed",
      },
    ];

    // 환자 방문 차트 데이터 생성
    const mockPatientVisitsData = [
      { name: "1월", 환자수: 65 },
      { name: "2월", 환자수: 59 },
      { name: "3월", 환자수: 80 },
      { name: "4월", 환자수: 81 },
      { name: "5월", 환자수: 56 },
      { name: "6월", 환자수: 55 },
      { name: "7월", 환자수: 40 },
      { name: "8월", 환자수: 70 },
      { name: "9월", 환자수: 90 },
      { name: "10월", 환자수: 110 },
      { name: "11월", 환자수: 105 },
      { name: "12월", 환자수: 120 },
    ];

    // 진료과별 분포 차트 데이터 생성
    const mockDepartmentDistribution = [
      { name: "내과", value: 35 },
      { name: "정형외과", value: 20 },
      { name: "피부과", value: 15 },
      { name: "소아과", value: 10 },
      { name: "이비인후과", value: 10 },
      { name: "기타", value: 10 },
    ];

    // 데이터 로딩 시뮬레이션
    setTimeout(() => {
      setStats(mockStats);
      setUpcomingAppointments(mockAppointments);
      setPatientVisitsData(mockPatientVisitsData);
      setDepartmentDistribution(mockDepartmentDistribution);
      setIsLoading(false);
    }, 1000);
  }, [hospitalData]);

  // 진료과별 환자 분포 위젯의 "자세히 보기" 버튼 클릭 핸들러
  const handleViewPatientsByDepartment = () => {
    // 환자/고객 관리 섹션으로 이동
    onSectionChange && onSectionChange("patients");
  };

  // 오늘의 예약 위젯의 "전체 보기" 버튼 클릭 핸들러
  const handleViewAllAppointments = () => {
    // 예약 관리 섹션으로 이동
    onSectionChange && onSectionChange("appointments");
  };

  // 알림 "모두 보기" 버튼 클릭 핸들러
  const handleViewAllNotifications = () => {
    // 알림 관리 섹션으로 이동
    onSectionChange && onSectionChange("notifications");
  };

  // 진료 기록 작성 버튼 클릭 핸들러
  const handleCreateMedicalRecord = () => {
    // 진료 기록 관리 섹션으로 이동
    onSectionChange && onSectionChange("medical-records");
  };

  if (isLoading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-spinner"></div>
        <p>대시보드 데이터 로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <h2 className="admin-section-title">대시보드</h2>
        <p className="admin-section-description">
          병원 운영 현황과 주요 데이터를 한눈에 확인하세요.
        </p>
      </div>

      <div className="admin-stats-grid">
        <StatCard
          title="전체 환자"
          value={stats.patients.total}
          icon={<Users size={24} />}
          color="blue"
          change={stats.patients.change}
          changeType="increase"
          subtitle={`신규: ${stats.patients.new} | 재방문: ${stats.patients.returning}`}
        />

        <StatCard
          title="오늘 예약"
          value={stats.appointments.today}
          icon={<Calendar size={24} />}
          color="purple"
          change={stats.appointments.change}
          changeType="increase"
          subtitle={`완료: ${stats.appointments.completed} | 취소: ${stats.appointments.cancelled}`}
        />

        <StatCard
          title="의료진 현황"
          value={`${stats.doctors.available} / ${stats.doctors.total}`}
          icon={<Activity size={24} />}
          color="green"
          subtitle="근무 가능한 의사 수"
        />

        <StatCard
          title="평균 대기 시간"
          value="24분"
          icon={<Clock size={24} />}
          color="orange"
          change={-5.2}
          changeType="decrease"
          subtitle="지난주 대비 5.2% 감소"
        />
      </div>

      <div className="admin-dashboard-content">
        <div className="admin-dashboard-left">
          <div className="admin-card chart-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">월별 환자 방문 추이</h3>
              <div className="admin-card-actions">
                <button
                  className="admin-button admin-button-secondary"
                  onClick={onViewPatientAnalytics}
                >
                  <BarChart4 size={16} />
                  자세히 보기
                </button>
              </div>
            </div>
            <CustomLineChart data={patientVisitsData} />
          </div>

          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">오늘의 예약</h3>
              <div className="admin-card-actions">
                <button
                  className="admin-button admin-button-secondary"
                  onClick={handleViewAllAppointments}
                >
                  <Calendar size={16} />
                  전체 보기
                </button>
              </div>
            </div>
            <div className="appointments-list">
              {upcomingAppointments.map((appointment) => (
                <AppointmentItem
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="admin-dashboard-right">
          <div className="admin-card chart-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">진료과별 환자 분포</h3>
              <div className="admin-card-actions">
                <button
                  className="admin-button admin-button-secondary"
                  onClick={handleViewPatientsByDepartment}
                >
                  <PieChart size={16} />
                  자세히 보기
                </button>
              </div>
            </div>
            <div className="pie-chart-container">
              <PieChartComponent data={departmentDistribution} />
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">빠른 작업</h3>
            </div>
            <div className="quick-actions">
              <button
                className="quick-action-button"
                onClick={() =>
                  onSectionChange && onSectionChange("appointments")
                }
              >
                <Calendar size={18} />새 예약 등록
              </button>
              <button
                className="quick-action-button"
                onClick={() => onSectionChange && onSectionChange("patients")}
              >
                <Users size={18} />
                환자 등록
              </button>
              <button
                className="quick-action-button"
                onClick={handleCreateMedicalRecord}
              >
                <FilePlus size={18} />
                진료 기록 작성
              </button>
              <button
                className="quick-action-button"
                onClick={() => onSectionChange && onSectionChange("reports")}
              >
                <TrendingUp size={18} />
                매출 보고서
              </button>
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">알림</h3>
              <div className="admin-card-actions">
                <button
                  className="admin-button admin-button-secondary"
                  onClick={handleViewAllNotifications}
                >
                  <ChevronRight size={16} />
                  모두 보기
                </button>
              </div>
            </div>
            <div className="notification-list">
              <div className="notification-item">
                <div className="notification-icon green">
                  <CheckCircle size={16} />
                </div>
                <div className="notification-content">
                  <p className="notification-message">
                    오늘 5명의 신규 환자가 등록했습니다
                  </p>
                  <span className="notification-time">2시간 전</span>
                </div>
              </div>
              <div className="notification-item">
                <div className="notification-icon amber">
                  <AlertCircle size={16} />
                </div>
                <div className="notification-content">
                  <p className="notification-message">
                    김환자님이 예약을 취소했습니다
                  </p>
                  <span className="notification-time">3시간 전</span>
                </div>
              </div>
              <div className="notification-item">
                <div className="notification-icon blue">
                  <Calendar size={16} />
                </div>
                <div className="notification-content">
                  <p className="notification-message">
                    내일 예약이 15건 등록되어 있습니다
                  </p>
                  <span className="notification-time">5시간 전</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
