"use client";
import React, { useState } from "react";
import { Button } from "../components/Button/Button";
import ExamModal from "../components/ExamModal/ExamModal";

const mockQuestions = [
  {
    section: "multiple-choice",
    question: "Which command is used to change the directory in Linux?",
    options: ["mkdir", "chdir", "cd", "pwd"],
    answer: "cd"
  },
  {
    section: "multiple-choice",
    question: "Which command is used to remove a file in Linux?",
    options: ["del", "remove", "rm", "erase"],
    answer: "rm"
  },
  {
    section: "true/false",
    question: "The 'ls' command lists all files in the current directory.",
    options: ["True", "False"],
    answer: "True"
  },
  {
    section: "fill-in-the-blank",
    question: "The '___' command is used to change file permissions.",
    options: [],
    answer: "chmod"
  },
  {
    section: "multiple-choice",
    question: "Which command prints the current working directory?",
    options: ["lsdir", "printcwd", "pwd", "cwdprint"],
    answer: "pwd"
  },
  {
    section: "true/false",
    question: "The 'pwd' command stands for 'Print With Detail'.",
    options: ["True", "False"],
    answer: "False"
  },
  {
    section: "multiple-choice",
    question: "Which command displays the contents of a file?",
    options: ["display", "cat", "show", "see"],
    answer: "cat"
  },
  {
    section: "fill-in-the-blank",
    question: "The command '_____' is used to exit the shell.",
    options: [],
    answer: "exit"
  },
  {
    section: "multiple-choice",
    question: "What does the 'ps' command do?",
    options: ["Pauses the system", "Prints the system", "Shows process status", "Displays active processes"],
    answer: "Displays active processes"
  },
  {
    section: "true/false",
    question: "The 'cp' command is used to copy files.",
    options: ["True", "False"],
    answer: "True"
  },
  {
    section: "multiple-choice",
    question: "Which command is used to move or rename files?",
    options: ["mv", "move", "rename", "chg"],
    answer: "mv"
  },
  {
    section: "fill-in-the-blank",
    question: "To create a new directory, use the command '____'.",
    options: [],
    answer: "mkdir"
  },
  {
    section: "multiple-choice",
    question: "Which command lists the contents of a directory?",
    options: ["ls", "dir", "show", "list"],
    answer: "ls"
  },
  {
    section: "true/false",
    question: "In Linux, 'sudo' is used to execute commands as another user.",
    options: ["True", "False"],
    answer: "True"
  },
  {
    section: "multiple-choice",
    question: "Which command is used to search for text in a file?",
    options: ["search", "grep", "find", "scan"],
    answer: "grep"
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
