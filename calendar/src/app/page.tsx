"use client";
import styles from "./page.module.css"
import Calendar from "./components/calendar";


export default function Home(){

  return  (
    <body >
  <div className={styles["background"]}>
    <div className={styles["container"]}>
      <Calendar/>
    </div>
  </div>
  </body>
  );
}
//ADD ONLY MAIN COMPONENTS IN HERE
//STILL NO DB JUST LOCAL CONSOLE 
