"use client";
import React from "react";
import GoalItem from "../GoalItem/GoalItem";

interface Goal {
  id: number;
  name: string;
  days: number;
  completedDays: number;
  color: string;
  history: { date: string; status: "✔" | "❌" }[];
}

interface GoalListProps {
  goals: Goal[];
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
}

const GoalList: React.FC<GoalListProps> = ({ goals, setGoals }) => {
  const handleDelete = (id: number) => {
    const updatedGoals = goals.filter((goal) => goal.id !== id);
    setGoals(updatedGoals);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
  };

  return (
    <div>
      {goals.map((goal) => (
        <GoalItem
          key={goal.id}
          goal={goal}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default GoalList;
