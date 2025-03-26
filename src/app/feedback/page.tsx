// filepath: c:\Users\navin\Documents\Nafise-Team-Interns-1\src\app\feedback\page.tsx
"use client";
import React from "react";
import Feedback from "./../../components/feedback/feedback"; // Import the Feedback component

const FeedbackPage: React.FC = () => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb, #a6c1ee, #f6d365)",
        backgroundSize: "400% 400%",
        animation: "gradientBackground 15s ease infinite",
      }}
    >
      <h1 style={{ color: "#fff", marginBottom: "20px" }}>Feedback Page</h1>
      <Feedback />
      <style jsx>{`
        @keyframes gradientBackground {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default FeedbackPage;