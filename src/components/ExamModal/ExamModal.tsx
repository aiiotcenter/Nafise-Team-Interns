"use client";
import React, { useState } from "react";
import ProgressIndicator from "../ProgressIndicator/ProgressIndicator";

type Question = {
  section: string;
  question: string;
  options: string[];
  answer: string;
};

type ExamProps = {
  questions: Question[];
};

const Exam: React.FC<ExamProps> = ({ questions }) => {
  const totalQuestions = questions.length;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<{ [key: number]: string }>({});

  const handleNext = () => {
    if (!answeredQuestions.includes(currentQuestionIndex + 1) && selectedAnswer[currentQuestionIndex] !== undefined) {
      setAnsweredQuestions([...answeredQuestions, currentQuestionIndex + 1]);
    }
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswer = (option: string) => {
    setSelectedAnswer({ ...selectedAnswer, [currentQuestionIndex]: option });
  };

  const handleFinish = () => {
    alert("Exam completed! Closing window...");
    window.close(); // Sınav ekranını kapatır
  };

  const question = questions[currentQuestionIndex];

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <ProgressIndicator
        totalQuestions={totalQuestions}
        answeredQuestions={answeredQuestions}
        currentQuestion={currentQuestionIndex + 1}
      />

      <h2>Question {currentQuestionIndex + 1}</h2>
      <p>{question.question}</p>

      {question.options.length > 0 &&
        question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              margin: "5px 0",
              background: selectedAnswer[currentQuestionIndex] === option ? "#6a0dad" : "#f0f0f0",
              color: selectedAnswer[currentQuestionIndex] === option ? "white" : "black",
            }}
          >
            {option}
          </button>
        ))}

      {question.options.length === 0 && (
        <input
          type="text"
          placeholder="Type your answer..."
          value={selectedAnswer[currentQuestionIndex] || ""}
          onChange={(e) => handleAnswer(e.target.value)}
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
        />
      )}

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          style={{ padding: "10px", width: "45%", background: "#f0f0f0", color: "black" }}
        >
          Previous Question
        </button>

        {currentQuestionIndex < totalQuestions - 1 ? (
          <button
            onClick={handleNext}
            style={{ padding: "10px", width: "45%", background: "#6a0dad", color: "white", border: "none" }}
          >
            Next Question
          </button>
        ) : (
          <button
            onClick={handleFinish}
            style={{ padding: "10px", width: "45%", background: "#ff4d4d", color: "white", border: "none" }}
          >
            Finish Exam
          </button>
        )}
      </div>
    </div>
  );
};

export default Exam;
