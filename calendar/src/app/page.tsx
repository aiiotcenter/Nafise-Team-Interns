"use client";

import Agenda from "./components/Agenda";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import styles from "./page.module.css"
import { format } from "path";
import { useState } from "react";


export default function Home(){
 /* const [selectedMonth,setSelectedMonth]=useState(()=>format(new Date(),'MM'));
  const [selectedYear,setSelectedYear]=useState(()=>format(new Date(),'yyyy'));

  const handleMonthChange = (newMonth: string) => {
    if (parseInt(newMonth) >= 1 && parseInt(newMonth) <= 12) {
      setSelectedMonth(newMonth.padStart(2, '0'));
    }
  };

  const handleYearChange = (newYear: string) => {
    setSelectedYear(newYear);
  };
  */
  return  (
    <body >
  <div className={styles["background"]}>
    <div className={styles["container"]}>
      <NavBar/>
      <Agenda/>
      <Footer/>
    </div>
  </div>
  </body>
  );
}
//ADD ONLY MAIN COMPONENTS IN HERE
//STILL NO DB JUST LOCAL CONSOLE 
