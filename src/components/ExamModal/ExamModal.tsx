"use client";
import React, { useState } from "react";
import ProgressIndicator from "../ProgressIndicator/ProgressIndicator";

type Question = {
  section: string;
  question: string;
  options: string[];
  answer: string;
};

type ExamModalProps = {
  questions: Question[];
  onClose: () => void;
};

const ExamModal: React.FC<ExamModalProps> = ({ questions, onClose }) => {
  const totalQuestions = questions.length;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  const handleNext = () => {
    if (!answeredQuestions.includes(currentQuestionIndex + 1)) {
      setAnsweredQuestions([...answeredQuestions, currentQuestionIndex + 1]);
    }
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
    } else {
      alert("Exam Completed!");
      onClose();
    }
  };

  const question = questions[currentQuestionIndex];

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "white",
        padding: "20px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
        width: "400px",
        textAlign: "center",
      }}
    >
      <h2>Question {currentQuestionIndex + 1}</h2>
      <p>{question.question}</p>

      {question.options.length > 0 &&
        question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedAnswer(option)}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              margin: "5px 0",
              background: selectedAnswer === option ? "#6a0dad" : "#f0f0f0",
              color: selectedAnswer === option ? "white" : "black",
            }}
          >
            {option}
          </button>
        ))}

      {question.options.length === 0 && (
        <input
          type="text"
          placeholder="Type your answer..."
          value={selectedAnswer}
          onChange={(e) => setSelectedAnswer(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
        />
      )}

      <ProgressIndicator
        totalQuestions={totalQuestions}
        answeredQuestions={answeredQuestions}
        currentQuestion={currentQuestionIndex + 1}
      />

      <button
        onClick={handleNext}
        style={{
          marginTop: "20px",
          padding: "10px",
          width: "100%",
          background: "#6a0dad",
          color: "white",
          border: "none",
        }}
      >
        Next Question
      </button>

      <button onClick={onClose} style={{ marginTop: "10px", width: "100%" }}>
        Close
      </button>
    </div>
  );
};

export default ExamModal;
