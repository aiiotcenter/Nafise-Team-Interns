"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "../ProgressBar/ProgressBar";

type GoalProps = {
  goal: {
    id: number;
    name: string;
    days: number;
    completedDays: number;
    color: string;
    history: { date: string; status: "✔" | "❌" }[];
  };
  onDelete: (id: number) => void;
};

const GoalItem: React.FC<GoalProps> = ({ goal, onDelete }) => {
  const router = useRouter();
  const completionRate = Math.round((goal.completedDays / goal.days) * 100);
  const last5Days = goal.history.slice(-5);

  return (
    <div
      style={{
        background: "#ffffff",
        border: `3px solid ${goal.color}`,
        padding: "15px",
        marginBottom: "16px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "0.3s ease",
        textAlign: "left",
        position: "relative",
      }}
    >
      {/* Delete button */}
      <button
        onClick={() => onDelete(goal.id)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "transparent",
          border: "none",
          fontSize: "18px",
          cursor: "pointer",
          color: "#999",
        }}
        title="Delete Goal"
      >
        ✖
      </button>

      <h3 style={{ marginBottom: "8px", color: "#333" }}>{goal.name}</h3>

      <ProgressBar progress={completionRate} color={goal.color} />

      <p style={{ fontSize: "0.9rem", color: "#555", marginTop: "10px" }}>
        {goal.completedDays} / {goal.days} days completed (<strong>{completionRate}%</strong>)
      </p>

      <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
        {last5Days.map((day, index) => (
          <div
            key={index}
            style={{
              width: "25px",
              height: "25px",
              backgroundColor: day.status === "✔" ? goal.color : "#fff",
              border: `2px solid ${goal.color}`,
              borderRadius: "50%",
              textAlign: "center",
              lineHeight: "25px",
              fontWeight: "bold",
              color: day.status === "✔" ? "#fff" : goal.color,
            }}
          >
            {day.status}
          </div>
        ))}
      </div>

      <button
        onClick={() => router.push(`/calendar/${goal.id}`)}
        style={{
          marginTop: "10px",
          padding: "10px 15px",
          backgroundColor: goal.color,
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Open Calendar
      </button>
    </div>
  );
};

export default GoalItem;
