"use client";
import React from "react";

type ProgressBarProps = {
  progress: number;
  color: string; // Goal'in rengi
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color }) => {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#e0e0e0",
        borderRadius: "8px",
        height: "10px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          backgroundColor: color, // Burada her goal’un rengi kullanılacak
          height: "100%",
          transition: "width 0.5s ease-in-out",
        }}
      />
    </div>
  );
};

export default ProgressBar;
