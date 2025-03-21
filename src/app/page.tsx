"use client";
import React, { useEffect, useState } from "react";
import GoalList from "../components/GoalList/GoalList";

const HomePage = () => {
  const [goals, setGoals] = useState<any[]>([]);
  const [goalName, setGoalName] = useState("");
  const [goalDays, setGoalDays] = useState(30);

  useEffect(() => {
    const storedGoals = localStorage.getItem("goals");
    if (storedGoals) {
      setGoals(JSON.parse(storedGoals));
    }
  }, []);

  const handleAddGoal = () => {
    const newGoal = {
      id: Date.now(),
      name: goalName,
      days: goalDays,
      completedDays: 0,
      color: getRandomColor(),
      history: [],
      startDate: new Date().toISOString().split("T")[0],
    };
    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    localStorage.setItem(`goal-${newGoal.id}-data`, JSON.stringify(newGoal));
    setGoalName("");
    setGoalDays(30);
  };

  const getRandomColor = () => {
    const colors = ["#f44336", "#4caf50", "#2196f3", "#ff9800", "#9c27b0"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = localStorage.getItem("goals");
      if (updated) {
        setGoals(JSON.parse(updated));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Goal Tracker</h1>
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Goal Name"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
          style={{ padding: 10, marginRight: 10 }}
        />
        <input
          type="number"
          placeholder="Number of Days"
          value={goalDays}
          onChange={(e) => setGoalDays(parseInt(e.target.value))}
          style={{ padding: 10, width: 80, marginRight: 10 }}
        />
        <button onClick={handleAddGoal} style={{ padding: 10 }}>
          Add Goal
        </button>
      </div>
      <GoalList goals={goals} setGoals={setGoals} />
    </div>
  );
};

export default HomePage;
