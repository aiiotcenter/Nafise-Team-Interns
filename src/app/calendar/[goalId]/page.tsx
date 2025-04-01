"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

interface Goal {
  id: number;
  name: string;
  days: number;
  completedDays: number;
  color: string;
  history: { date: string; status: "✔" | "❌" }[];
}

const CalendarPage = () => {
  const router = useRouter();
  const params = useParams();
  const goalId = params.goalId as string;

  const [selectedDays, setSelectedDays] = useState<{ [key: string]: "✔" | "❌" }>({});
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [goalInfo, setGoalInfo] = useState<Goal | null>(null);

  const handleDayClick = (date: string) => {
    const today = new Date().toISOString().split("T")[0];
    if (date > today) return;

    setSelectedDays((prev) => {
      const newStatus = prev[date] === "✔" ? "❌" : prev[date] === "❌" ? null : "✔";
      const updatedDays = { ...prev };
      if (newStatus) {
        updatedDays[date] = newStatus;
      } else {
        delete updatedDays[date];
      }

      localStorage.setItem(`goal-${goalId}-calendar`, JSON.stringify(updatedDays));

      const completedCount = Object.values(updatedDays).filter((val) => val === "✔").length;
      const storedGoals = JSON.parse(localStorage.getItem("goals") || "[]");
      const updatedGoals = storedGoals.map((goal: Goal) => {
        if (goal.id.toString() === goalId) {
          return { ...goal, completedDays: completedCount };
        }
        return goal;
      });
      localStorage.setItem("goals", JSON.stringify(updatedGoals));

      const storedGoal = localStorage.getItem(`goal-${goalId}-data`);
      if (storedGoal) {
        const parsed = JSON.parse(storedGoal);
        parsed.completedDays = completedCount;
        localStorage.setItem(`goal-${goalId}-data`, JSON.stringify(parsed));
        setGoalInfo(parsed);
      }

      return updatedDays;
    });
  };

  useEffect(() => {
    try {
      const storedCalendar = localStorage.getItem(`goal-${goalId}-calendar`);
      if (storedCalendar) {
        const parsedCalendar = JSON.parse(storedCalendar);
        setSelectedDays(parsedCalendar);
      } else {
        setSelectedDays({});
      }

      const storedGoal = localStorage.getItem(`goal-${goalId}-data`);
      if (storedGoal) {
        const parsedGoal = JSON.parse(storedGoal);
        setGoalInfo(parsedGoal);
      }
    } catch (error) {
      console.error("Data loading error:", error);
    }
  }, [goalId]);

  const handleMonthChange = (change: number) => {
    let newMonth = currentMonth + change;
    let newYear = currentYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const totalDays = getDaysInMonth(currentMonth, currentYear);
  const monthName = new Date(currentYear, currentMonth).toLocaleString("en-US", { month: "long" });
  const todayDate = new Date().toISOString().split("T")[0];
  const completionRate = goalInfo ? Math.round((goalInfo.completedDays / goalInfo.days) * 100) : 0;

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#fff", padding: "30px", borderRadius: "20px", boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)", textAlign: "center" }}>
        <h1 style={{ fontSize: "30px", marginBottom: "10px", color: "#333" }}>Goal Calendar</h1>

        {goalInfo && (
          <div style={{ marginBottom: "25px" }}>
            <h2 style={{ fontSize: "22px", color: goalInfo.color }}>{goalInfo.name}</h2>
            <p style={{ fontSize: "18px", color: "#555" }}>{goalInfo.completedDays} / {goalInfo.days} days completed</p>
            <div style={{ fontSize: "38px", fontWeight: "bold", color: goalInfo.color }}>{completionRate}%</div>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "25px" }}>
          <button onClick={() => handleMonthChange(-1)} style={navButtonStyle}>◀</button>
          <h2 style={{ margin: "0 20px", fontSize: "22px" }}>{monthName} {currentYear}</h2>
          <button onClick={() => handleMonthChange(1)} style={navButtonStyle}>▶</button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))",
            gap: "12px",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          {[...Array(totalDays)].map((_, index) => {
            const day = index + 1;
            const date = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const status = selectedDays[date] || null;
            const isFuture = new Date(date) > new Date();
            const isToday = date === todayDate;

            return (
              <div
                key={date}
                onClick={() => handleDayClick(date)}
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: status === "✔" ? "#4caf50" : status === "❌" ? "#f44336" : "#ffffff",
                  border: isToday ? "3px solid #1e88e5" : "2px solid #ccc",
                  borderRadius: "12px",
                  textAlign: "center",
                  lineHeight: "50px",
                  fontWeight: "bold",
                  cursor: isFuture ? "not-allowed" : "pointer",
                  color: status ? "#fff" : "#555",
                  boxShadow: isToday ? "0 0 10px rgba(30, 136, 229, 0.6)" : "0 2px 6px rgba(0,0,0,0.05)",
                  opacity: isFuture ? 0.5 : 1,
                  transition: "all 0.2s ease-in-out",
                }}
              >
                {status || day}
              </div>
            );
          })}
        </div>

        <button
          onClick={() => router.push("/")}
          style={{
            marginTop: "40px",
            padding: "12px 24px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0, 123, 255, 0.3)",
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

const navButtonStyle = {
  padding: "10px 14px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "18px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
};

export default CalendarPage;
