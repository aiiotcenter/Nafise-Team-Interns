"use client";
import React, { useState } from "react";

type GoalFormProps = {
  onAddGoal: (goalName: string, totalDays: number) => void;
};

const GoalForm: React.FC<GoalFormProps> = ({ onAddGoal }) => {
  const [goal, setGoal] = useState("");
  const [days, setDays] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!goal || !days) {
      alert("Please enter a goal name and number of days.");
      return;
    }

    onAddGoal(goal, parseInt(days));
    setGoal("");
    setDays("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Goal Name"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        required
        style={{
          padding: "10px",
          width: "60%",
          marginRight: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <input
        type="number"
        placeholder="Days"
        value={days}
        onChange={(e) => setDays(e.target.value)}
        required
        style={{
          padding: "10px",
          width: "20%",
          marginRight: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 15px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Goal
      </button>
    </form>
  );
};

export default GoalForm;
