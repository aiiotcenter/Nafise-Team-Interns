"use client";
import React, { useEffect, useState } from "react";
import GoalList from "../components/GoalList/GoalList";
import GoalForm from "../components/GoalForm/GoalForm";

interface Goal {
  id: number;
  name: string;
  days: number;
  completedDays: number;
  color: string;
  history: { date: string; status: "✔" | "❌" }[];
}

const HomePage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    const storedGoals = localStorage.getItem("goals");
    if (storedGoals) {
      setGoals(JSON.parse(storedGoals));
    }
  }, []);

  const handleAddGoal = (name: string, days: number) => {
    const newGoal: Goal = {
      id: Date.now(),
      name,
      days,
      completedDays: 0,
      color: getRandomColor(),
      history: [],
    };
    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    localStorage.setItem(`goal-${newGoal.id}-data`, JSON.stringify(newGoal));
    localStorage.setItem(`goal-${newGoal.id}-calendar`, JSON.stringify({}));
  };

  const getRandomColor = () => {
    const colors = ["#ff6b6b", "#6bc5ff", "#ffd166", "#06d6a0", "#a29bfe"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <main
      style={{
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
        padding: "40px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "32px", marginBottom: "30px", color: "#333" }}>
        Goal Tracker
      </h1>
      <GoalForm onAdd={handleAddGoal} />
      <div style={{ maxWidth: "800px", margin: "40px auto 0 auto" }}>
        <GoalList goals={goals} setGoals={setGoals} />
      </div>
    </main>
  );
};

export default HomePage;
