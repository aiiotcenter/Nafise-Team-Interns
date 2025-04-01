"use client";
import React, { useState } from "react";

interface GoalFormProps {
  onAdd: (name: string, days: number) => void;
}

const GoalForm: React.FC<GoalFormProps> = ({ onAdd }) => {
  const [goalName, setGoalName] = useState("");
  const [goalDays, setGoalDays] = useState<number>(0);

  const handleAddGoal = () => {
    if (goalName && goalDays > 0) {
      onAdd(goalName, goalDays);
      setGoalName("");
      setGoalDays(0);
    } else {
      alert("Please enter a valid goal name and number of days.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        maxWidth: "500px",
        margin: "30px auto",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: "22px",
          marginBottom: "20px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        Add a New Goal
      </h2>
      <input
        type="text"
        placeholder="Enter your goal (e.g. Read 10 books)"
        value={goalName}
        onChange={(e) => setGoalName(e.target.value)}
        style={{
          padding: "12px",
          width: "100%",
          marginBottom: "15px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
      <input
        type="number"
        placeholder="Number of days"
        value={goalDays}
        onChange={(e) => setGoalDays(Number(e.target.value))}
        style={{
          padding: "12px",
          width: "100%",
          marginBottom: "20px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />
      <button
        onClick={handleAddGoal}
        style={{
          padding: "12px 30px",
          background: "linear-gradient(to right, #00c6ff, #0072ff)",
          color: "#fff",
          fontSize: "16px",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          transition: "0.3s",
        }}
      >
        Add Goal
      </button>
    </div>
  );
};

export default GoalForm;
