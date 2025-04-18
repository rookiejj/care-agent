import React, { useState } from "react";
import { Calendar, Bell, Repeat, CheckCircle, Plus, X } from "lucide-react";
import "./HealthCheckReminder.css";

const HealthCheckReminder = () => {
  const [dismissed, setDismissed] = useState(false);
  const [checkItems, setCheckItems] = useState([
    {
      id: 1,
      title: "정기 건강검진",
      dueDate: "2025-06-15",
      completed: false,
      interval: "1년",
      category: "checkup",
      priority: "high",
    },
    {
      id: 2,
      title: "치과 정기검진",
      dueDate: "2025-05-10",
      completed: false,
      interval: "6개월",
      category: "dental",
      priority: "medium",
    },
    {
      id: 3,
      title: "안과 검진",
      dueDate: "2025-08-20",
      completed: true,
      interval: "1년",
      category: "eye",
      priority: "low",
    },
  ]);

  if (dismissed) {
    return null;
  }

  const formatDueDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  const getDaysRemaining = (dateStr) => {
    const dueDate = new Date(dateStr);
    const today = new Date();
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return `${Math.abs(diffDays)}일 지남`;
    } else if (diffDays === 0) {
      return "오늘";
    } else {
      return `${diffDays}일 남음`;
    }
  };

  const getStatusClass = (item) => {
    if (item.completed) {
      return "status-completed";
    }

    const dueDate = new Date(item.dueDate);
    const today = new Date();
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return "status-overdue";
    } else if (diffDays <= 30) {
      return "status-upcoming";
    } else {
      return "status-future";
    }
  };

  const toggleComplete = (id) => {
    setCheckItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="health-check-container">
      <div className="health-check-header">
        <div className="health-check-title">
          <Bell className="health-check-title-icon" />
          <h3>건강 체크 리마인더</h3>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="health-check-close-btn"
        >
          <X size={16} />
        </button>
      </div>

      <div className="health-check-content">
        <div className="health-check-item-list">
          {checkItems.map((item) => (
            <div key={item.id} className="health-check-item">
              <button
                onClick={() => toggleComplete(item.id)}
                className={`check-button ${
                  item.completed
                    ? "check-button-complete"
                    : "check-button-incomplete"
                }`}
              >
                {item.completed ? (
                  <CheckCircle className="check-circle" />
                ) : (
                  <div className="check-circle-placeholder"></div>
                )}
              </button>

              <div className="item-content">
                <div className="item-header">
                  <h4
                    className={`item-title ${
                      item.completed ? "item-title-completed" : ""
                    }`}
                  >
                    {item.title}
                  </h4>
                  <div className={`item-status ${getStatusClass(item)}`}>
                    {getDaysRemaining(item.dueDate)}
                  </div>
                </div>

                <div className="item-details">
                  <div className="item-detail">
                    <Calendar className="item-detail-icon" />
                    <span>{formatDueDate(item.dueDate)}</span>
                  </div>
                  <div className="item-detail">
                    <Repeat className="item-detail-icon" />
                    <span>{item.interval} 주기</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="add-item-button">
          <Plus className="add-item-icon" />새 건강 체크 항목 추가
        </button>
      </div>
    </div>
  );
};

export default HealthCheckReminder;
