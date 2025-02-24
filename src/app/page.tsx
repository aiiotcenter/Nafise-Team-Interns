"use client";
import React, { useState } from "react";
import { Button } from "../components/Button/Button";
import ExamModal from "../components/ExamModal/ExamModal";

const mockQuestions = [
    {
        "section": "multiple-choice",
        "question": "What command is used to change directory in Linux?",
        "options": ["mkdir", "chdir", "cd", "pwd"],
        "answer": "cd"
    },
    {
        "section": "multiple-choice",
        "question": "Which command is used to remove a file in Linux?",
        "options": ["del", "remove", "rm", "eradicate"],
        "answer": "rm"
    },
    {
        "section": "true/false",
        "question": "The 'ls' command lists all files in the current directory.",
        "options": ["True", "False"],
        "answer": "True"
    },
    {
        "section": "fill-in-the-blank",
        "question": "The '___' command is used to change the permissions of a file.",
        "options": [],
        "answer": "chmod"
    }
];

const Home: React.FC = () => {
  const [isExamOpen, setIsExamOpen] = useState(false);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Online Exam</h1>
      <Button onClick={() => setIsExamOpen(true)} place="" color="gray">
        Start Exam
      </Button>

      {isExamOpen && <ExamModal questions={mockQuestions} onClose={() => setIsExamOpen(false)} />}
    </div>
  );
};

export default Home;
