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
  const maxWidth = 80; // Progress Bar toplam genişliği (yüzde olarak)
  const circleSize = totalQuestions > 10 ? 20 : 30; // Küçük soru sayısı için büyük yuvarlaklar
  const spacing = totalQuestions > 10 ? 4 : 10; // Küçük soru sayısı için dar mesafeler

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "20px",
        width: `${maxWidth}%`,
        margin: "auto",
        flexWrap: "nowrap",
        overflowX: "auto",
      }}
    >
      {[...Array(totalQuestions)].map((_, index) => {
        const questionNumber = index + 1;
        const isAnswered = answeredQuestions.includes(questionNumber);
        const isCurrent = currentQuestion === questionNumber;

        return (
          <React.Fragment key={questionNumber}>
            <div
              style={{
                width: `${circleSize}px`,
                height: `${circleSize}px`,
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
            {questionNumber !== totalQuestions && (
              <span style={{ margin: `0 ${spacing}px`, fontSize: "20px", fontWeight: "bold", color: "#6a0dad" }}>
                -
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProgressIndicator;
