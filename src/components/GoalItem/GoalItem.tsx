"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "../ProgressBar/ProgressBar";

interface GoalProps {
  goal: {
    id: number;
    name: string;
    days: number;
    completedDays: number;
    color: string;
    history: { date: string; status: "✔" | "❌" }[];
  };
  onDelete: (id: number) => void;
}

const GoalItem: React.FC<GoalProps> = ({ goal, onDelete }) => {
  const router = useRouter();
  const completionRate = Math.round((goal.completedDays / goal.days) * 100);
  const last5Days = goal.history.slice(-5);

  return (
    <div
      style={{
        background: goal.color,
        padding: "20px",
        marginBottom: "16px",
        borderRadius: "16px",
        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)",
        transition: "0.3s ease",
        position: "relative",
        color: "#fff",
      }}
    >
      {/* Delete Button */}
      <button
        onClick={() => onDelete(goal.id)}
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          background: "rgba(255, 255, 255, 0.2)",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "32px",
          height: "32px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        ×
      </button>

      {/* Goal Name */}
      <h3 style={{ fontSize: "1.4rem", marginBottom: "10px" }}>{goal.name}</h3>

      {/* Progress Bar */}
      <ProgressBar progress={completionRate} color="#fff" />

      {/* Completion Info */}
      <p style={{ marginTop: "8px", fontSize: "0.95rem" }}>
        {goal.completedDays} / {goal.days} days completed (<strong>{completionRate}%</strong>)
      </p>

      {/* Last 5 Days */}
      <div style={{ display: "flex", gap: "6px", marginTop: "12px" }}>
        {last5Days.map((day, index) => (
          <div
            key={index}
            style={{
              width: "28px",
              height: "28px",
              backgroundColor: day.status === "✔" ? "#ffffff" : "transparent",
              border: `2px solid #fff`,
              borderRadius: "50%",
              textAlign: "center",
              lineHeight: "28px",
              fontWeight: "bold",
              color: day.status === "✔" ? goal.color : "#fff",
            }}
          >
            {day.status}
          </div>
        ))}
      </div>

      {/* Open Calendar Button */}
      <button
        onClick={() => router.push(`/calendar/${goal.id}`)}
        style={{
          marginTop: "16px",
          padding: "10px 20px",
          backgroundColor: "#ffffff",
          color: goal.color,
          border: "none",
          borderRadius: "10px",
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: "15px",
        }}
      >
        Open Calendar
      </button>
    </div>
  );
};

export default GoalItem;
