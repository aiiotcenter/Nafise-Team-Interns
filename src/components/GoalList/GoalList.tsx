"use client";
import React, { useEffect } from "react";
import GoalItem from "../GoalItem/GoalItem";

type Goal = {
  id: number;
  name: string;
  days: number;
  completedDays: number;
  color: string;
  history: { date: string; status: "✔" | "❌" }[];
};

type GoalListProps = {
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
};

const GoalList: React.FC<GoalListProps> = ({ goals, setGoals }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      const storedGoals = localStorage.getItem("goals");
      if (storedGoals) {
        setGoals(JSON.parse(storedGoals));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [setGoals]);

  const handleDelete = (id: number) => {
    const updatedGoals = goals.filter((goal) => goal.id !== id);
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    localStorage.removeItem(`goal-${id}-calendar`);
    localStorage.removeItem(`goal-${id}-data`);
  };

  return (
    <div>
      {goals.map((goal) => (
        <GoalItem key={goal.id} goal={goal} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default GoalList;
