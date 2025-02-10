
"use client"
import api from '../crud';
import { useEffect, useState } from "react";
import { useForm , SubmitHandler } from "react-hook-form";
import {format} from "date-fns"
import styles from "./NavBar.module.css"



interface NavBarProps {
    startingDate: Date | null;
    endingDate: Date | null;
    startingTime: string;
    endingTime: string;
    month:string;
    year:string;
    onMonthChange:(month:string)=>void;
    onYearChange:(year:string)=>void;
}

const Months=[
    "January", "February", "March", "April", "May", "June", "July", "August", 
    "September", "October", "November", "December"
]

//function to get the current month january
export const current_month=()=>{
    const today = new Date();
    return format(today,"MM")//this month january
};
//function to get the current year 2025
export const current_year=()=>{
    const today = new Date();
    return format(today,"yyyy")//this  year :2025
};
//handles month selection
const NavBar: React.FC<NavBarProps> = ({
    startingDate,
    endingDate,
    startingTime,
    endingTime,
    month,
    year,
    onMonthChange,
    onYearChange,
  }) => {
    
    const Toggle=(direction:"previous" | "next")=>{
        let newMonth= parseInt(month)+(direction==="next"? 1:-1)
        let newYear=parseInt(year);

        if (newMonth > 12){
            newMonth = 1;
            newYear++;
        }else if(newMonth<1){
            newMonth = 12; 
            newYear--;
        }
        //to do to handle the arrows 
        onMonthChange(String(newMonth).padStart(2, "0"));
        onYearChange(String(newYear));
        
       
    };
    const currentYear = parseInt(current_year());
    const years = Array.from({ length: 11 }, (_, i) => currentYear + i);
    return(
        <div className={styles.NavBar}>
        <div className={styles.arrows}>
            <div className={styles['left-side-arrow']}>
                <button 
                onClick={()=> Toggle("previous")}
                aria-label='previous_month'>
                <svg
                 xmlns="http://www.w3.org/2000/svg"
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="#333333"
                className={styles["size-6"]}
                >
                    <path strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M15.75 19.5 8.25 12l7.5-7.5" 
                    />

                </svg>

                </button>
            </div>
            
        </div>
        <div className={styles['month-dropdown']}>
            
            <select id='month-selector'
                value={month}
                onChange={(e)=> onMonthChange(e.target.value)}>
                {Months.map((month, index) => (
                <option key={index} value={String(index + 1).padStart(2, "0")}>
                    {month}
                </option>
                ))}
            </select> 
        </div>
        <div className={styles['year-container']}>
            <div className={styles['year-dropdown']}>
                <select id='year-selector'
                    value={year}
                    onChange={(e)=>onYearChange(e.target.value)}>
                    {years.map((year) => (
                    <option key={year} value={year.toString()}>
                        {year}
                    </option>
                ))}
                </select> 
            </div>
            <div className={styles['right-side-arrow']}>
                <button onClick={() => Toggle("next")} aria-label="Next Month">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#333333"
                        className={styles["size-6"]}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
    
        
    );
}
export default NavBar ;
