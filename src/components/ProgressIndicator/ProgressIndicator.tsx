"use client";
import React from "react";

type ProgressIndicatorProps = {
  totalQuestions: number;
  answeredQuestions: number[];
  currentQuestion: number;
};

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  totalQuestions = 0,
  answeredQuestions = [],
  currentQuestion = 1,
}) => {
  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "20px" }}>
      {[...Array(totalQuestions)].map((_, index) => {
        const questionNumber = index + 1;
        const isAnswered = answeredQuestions.includes(questionNumber);
        const isCurrent = currentQuestion === questionNumber;

        return (
          <div
            key={questionNumber}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              backgroundColor: isAnswered ? "#6a0dad" : isCurrent ? "#ccc" : "#fff",
              border: "2px solid #6a0dad",
              color: isAnswered ? "#fff" : "#6a0dad",
            }}
          >
            {questionNumber}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressIndicator;
