/*"use client"
import {format , parse} from 'date-fns';
import { useState } from 'react';
import {useForm} from "react-hook-form";
import {current_month , current_year } from './NavBar';
import styles from './footer.module.css'

const Months=[
    "January", "February", "March", "April", "May", "June", "July", "August", 
    "September", "October", "November", "December"
]

export const current_day=() => {
    const today = new Date();
    return format(today,"dd")//this day 25 
};

export const day_name=()=> {
    const today=new Date();
    return format(today,'EEEE')||"";
};

export const isValidDate = (day:String , month:String , year:String) : boolean=>{
    const date=new Date (`${year}-${month}-${day}`);
    return !isNaN(date.getTime());
};

const Footer=()=>{
    const {register}=useForm();
    const [selectedDay, setSelectedDay] = useState<string>(current_day());
    const [selectedMonth, setSelectedMonth] = useState<string>(current_month());
    const [selectedYear, setSelectedYear] = useState<string>(current_year());

    const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDay(e.target.value);
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMonth(e.target.value);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedYear(e.target.value);
    };
    
    let dayName = day_name();
    try {
        if (isValidDate(selectedDay,selectedMonth,selectedYear)){
            const monthName=Months[parseInt(selectedMonth)-1]
        
        const date = parse(`${selectedDay} ${monthName} ${selectedYear}`, "dd MMMM yyyy", new Date());
        
        dayName = format(date, "EEEE");
        } else {
            throw new Error("Invalid date input:")}
        } catch (error){
        console.error("Invalid date input:", error);
        const defaultDate = new Date(); // Fallback to today's date
        dayName = format(defaultDate, "EEEE");
        }
    */
      /*  return (
            <div className={styles.footer}>
                <div className={styles.start_time_picker_footer}>
                    <h2>FROM</h2>
                    <div className={styles.horizontal_container}>
                        <div className={styles.starting_day_footer}>
                            <input
                                type='text'
                                placeholder={current_day()}
                                value={selectedDay}
                                onChange={handleDayChange}
                            />
                        </div>
    
                        <div className={styles.date_container}>
                            <div className={styles.month_year}>
                            <input
                                type='text'
                                placeholder={Months[parseInt(current_month()) - 1]}
                                value={selectedMonth}
                                onChange={handleMonthChange}
                            />
                            <input
                                type='text'
                                placeholder={current_year()}
                                value={selectedYear}
                                onChange={handleYearChange}
                            />
                        </div>
                        <div className={styles.day_name}>
                            {dayName}
                        </div>
                        </div>
    
                        <div className={styles.Clock_icon}>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth={1.5} 
                                stroke="currentColor" 
                                className={styles.Clock_icon}
                            >
                                <path
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" 
                                />
                            </svg>
                        </div>
    
                        <div className={styles.start_time_picker}>
                            <input type='time' 
                                {...register("starttime", { required: true })}
                            />
                        </div>
                    </div>
                </div>
    
                <div className={styles.ending_time_footer}>
                    <h2>TO</h2>
                    <div className={styles.horizontal_container}>
                        <div className={styles.ending_day_footer}>
                            <input
                                type='text'
                                placeholder={selectedDay}
                                value={selectedDay}
                                onChange={handleDayChange}
                            />
                        </div>
                        <div className={styles.date_container}>
                            <div className={styles.month_year}>
                            <input
                                type='text'
                                placeholder={Months[parseInt(current_month()) - 1]}
                                value={selectedMonth}
                                onChange={handleMonthChange}
                            />
                            <input
                                type="text"
                                placeholder={selectedYear}
                                value={selectedYear}
                                onChange={handleYearChange}
                            />
                        </div>
                        <div className={styles.day_name}>
                            {dayName}
                        </div>
                        </div>
                        <div className={styles.Clock2_icon}>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth={1.5} 
                                stroke="currentColor" 
                                className={styles.Clock2_icon}
                            >
                                <path
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" 
                                />
                            </svg>
                        </div>
                        <div className={styles.ending_time_picker}>
                            <input type='time' 
                                {...register("endtime", { required: true })}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default Footer;*/
"use client"
import {format , parse} from 'date-fns';
import { useState } from 'react';
import {useForm} from "react-hook-form";
import {current_month , current_year } from './NavBar';
import styles from './footer.module.css'

const Months=[
    "January", "February", "March", "April", "May", "June", "July", "August", 
    "September", "October", "November", "December"
]

export const current_day=() => {
    const today = new Date();
    return format(today,"dd")//this day 25 
};

export const day_name=()=> {
    const today=new Date();
    return format(today,'EEEE')||"";
};

export const isValidDate = (day:String , month:String , year:String) : boolean=>{
    const date=new Date (`${year}-${month}-${day}`);
    return !isNaN(date.getTime());
};

const Footer=()=>{
    const {register}=useForm();
    const [selectedDay, setSelectedDay] = useState<string>(current_day());
    const [selectedMonth, setSelectedMonth] = useState<string>(current_month());
    const [selectedYear, setSelectedYear] = useState<string>(current_year());

    const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDay(e.target.value);
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMonth(e.target.value);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedYear(e.target.value);
    };
    
    let dayName = day_name();
    try {
        if (isValidDate(selectedDay,selectedMonth,selectedYear)){
            const monthName=Months[parseInt(selectedMonth)-1]
        
        const date = parse(`${selectedDay} ${monthName} ${selectedYear}`, "dd MMMM yyyy", new Date());
        
        dayName = format(date, "EEEE");
        } else {
            throw new Error("Invalid date input:")}
        } catch (error){
        console.error("Invalid date input:", error);
        const defaultDate = new Date(); // Fallback to today's date
        dayName = format(defaultDate, "EEEE");
        }
    
        return (
            <div className={styles.footer}>
                <div className={styles.start_time_picker_footer}>
                    <h2>FROM</h2>
                    <div className={styles.horizontal_container}>
                        <div className={styles.starting_day_footer}>
                            <input
                                type='text'
                                placeholder={current_day()}
                                value={selectedDay}
                                onChange={handleDayChange}
                            />
                        </div>
    
                        <div className={styles.date_container}>
                            <div className={styles.month_year}>
                            <input
                                type='text'
                                placeholder={Months[parseInt(current_month()) - 1]}
                                value={selectedMonth}
                                onChange={handleMonthChange}
                            />
                            <input
                                type='text'
                                placeholder={current_year()}
                                value={selectedYear}
                                onChange={handleYearChange}
                            />
                        </div>
                        <div className={styles.day_name}>
                            {dayName}
                        </div>
                        </div>
    
                        <div className={styles.Clock_icon}>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth={1.5} 
                                stroke="currentColor" 
                                className={styles.Clock_icon}
                            >
                                <path
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" 
                                />
                            </svg>
                        </div>
    
                        <div className={styles.start_time_picker}>
                            <input type='time' 
                                {...register("starttime", { required: true })}
                            />
                        </div>
                    </div>
                </div>
    
                <div className={styles.ending_time_footer}>
                    <h2>TO</h2>
                    <div className={styles.horizontal_container}>
                        <div className={styles.ending_day_footer}>
                            <input
                                type='text'
                                placeholder={selectedDay}
                                value={selectedDay}
                                onChange={handleDayChange}
                            />
                        </div>
                        <div className={styles.date_container}>
                            <div className={styles.month_year}>
                            <input
                                type='text'
                                placeholder={Months[parseInt(current_month()) - 1]}
                                value={selectedMonth}
                                onChange={handleMonthChange}
                            />
                            <input
                                type="text"
                                placeholder={selectedYear}
                                value={selectedYear}
                                onChange={handleYearChange}
                            />
                        </div>
                        <div className={styles.day_name}>
                            {dayName}
                        </div>
                        </div>
                        <div className={styles.Clock2_icon}>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth={1.5} 
                                stroke="currentColor" 
                                className={styles.Clock2_icon}
                            >
                                <path
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" 
                                />
                            </svg>
                        </div>
                        <div className={styles.ending_time_picker}>
                            <input type='time' 
                                {...register("endtime", { required: true })}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default Footer;