"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const CalendarPage = () => {
  const router = useRouter();
  const params = useParams();
  const goalId = params.goalId as string;

  const [selectedDays, setSelectedDays] = useState<{ [key: string]: "✔" | "❌" }>({});
  const [goalData, setGoalData] = useState<{ startDate: string; days: number; completedDays: number }>({
    startDate: "2024-03-01",
    days: 30,
    completedDays: 0,
  });

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [groupedData, setGroupedData] = useState<{ [year: string]: { [month: string]: string[] } }>({});

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
      const updatedGoals = storedGoals.map((goal: any) => {
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
      }

      return updatedDays;
    });
  };

  useEffect(() => {
    try {
      const storedGoal = localStorage.getItem(`goal-${goalId}-data`);
      const storedCalendar = localStorage.getItem(`goal-${goalId}-calendar`);

      if (storedGoal) {
        const parsedGoal = JSON.parse(storedGoal);
        setGoalData(parsedGoal);
      }

      if (storedCalendar) {
        const parsedCalendar = JSON.parse(storedCalendar);
        setSelectedDays(parsedCalendar);
      } else {
        setSelectedDays({});
      }
    } catch (error) {
      console.error("Data loading error:", error);
    }
  }, [goalId]);

  useEffect(() => {
    const grouped: { [year: string]: { [month: string]: string[] } } = {};
    Object.keys(selectedDays).forEach((date) => {
      const [year, month] = date.split("-");
      if (!grouped[year]) grouped[year] = {};
      if (!grouped[year][month]) grouped[year][month] = [];
      grouped[year][month].push(`${date} (${selectedDays[date]})`);
    });
    setGroupedData(grouped);
  }, [selectedDays]);

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

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Goal Calendar</h1>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <button onClick={() => handleMonthChange(-1)} style={navButtonStyle}>◀ Previous Month</button>
        <h2 style={{ margin: "0 15px" }}>{monthName} {currentYear}</h2>
        <button onClick={() => handleMonthChange(1)} style={navButtonStyle}>Next Month ▶</button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "10px",
          maxWidth: "400px",
          margin: "20px auto",
        }}
      >
        {[...Array(totalDays)].map((_, index) => {
          const day = index + 1;
          const date = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const status = selectedDays[date] || null;
          const isFuture = new Date(date) > new Date();

          return (
            <div
              key={date}
              onClick={() => handleDayClick(date)}
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: status === "✔" ? "#4caf50" : status === "❌" ? "#f44336" : "#fff",
                border: isFuture ? "2px dashed #ccc" : "2px solid #333",
                borderRadius: "50%",
                textAlign: "center",
                lineHeight: "50px",
                fontWeight: "bold",
                cursor: isFuture ? "not-allowed" : "pointer",
                transition: "0.2s",
                color: status ? "#fff" : "#333",
                opacity: isFuture ? 0.5 : 1,
              }}
            >
              {status || day}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "40px", textAlign: "left" }}>
        <h3>Marked Days (Grouped by Year-Month)</h3>
        {Object.entries(groupedData).map(([year, months]) => (
          <div key={year} style={{ marginBottom: "10px" }}>
            <strong>{year}</strong>
            {Object.entries(months).map(([month, days]) => (
              <div key={month} style={{ marginLeft: "15px" }}>
                <em>Month {month}</em>: {days.join(", ")}
              </div>
            ))}
          </div>
        ))}
      </div>

      <button
        onClick={() => router.push("/")}
        style={{
          marginTop: "20px",
          padding: "10px 15px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Back to Home
      </button>
    </div>
  );
};

const navButtonStyle = {
  padding: "10px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default CalendarPage;