
"use client"
import { format , parse} from 'date-fns';
import { useState , useEffect ,useRef} from 'react';
import {useFormContext} from "react-hook-form";
import {current_month , current_year } from './NavBar';
import styles from './footer.module.css'

interface FooterProps {
    startingDate: Date | null;
    endingDate: Date | null;
    startingTime: string;
    endingTime: string;
    endMonth:string;
    endYear:string;
    endDay:string;
    startDay:string;
    startYear:string;
    startMonth:string;
    onStartMonthChange: (month: string) => void;
    onStartYearChange: (year: string) => void;
    onStartDayChange: (day: string) => void;
    onEndMonthChange: (month: string) => void;
    onEndYearChange: (year: string) => void;
    onEndDayChange: (day: string) => void;
}


const Months=[
    "January", "February", "March", "April", "May", "June", "July", "August", 
    "September", "October", "November", "December"
]
//functio  to get the current day 25
export const current_day=() => {
    const today = new Date();
    return format(today,"dd") 
};
//functionn to get the name of the day
export const day_name=()=> {
    const today=new Date();
    return format(today,'EEEE')||"";
};
//function to check if the day-input is valid ex:30feb
export const isValidDate = (day:String , month:String , year:String) : boolean=>{
    const date=new Date (`${year}-${month}-${day}`);
    return !isNaN(date.getTime());
};



const Footer:React.FC<FooterProps>=({startingDate,
    endingDate,
    startingTime,
    endingTime,
    endMonth,
    endYear, 
    endDay,
    startDay,
    startMonth,
    startYear,
    onStartMonthChange,
    onStartYearChange,
    onStartDayChange,
    onEndDayChange,
    onEndMonthChange,
    onEndYearChange
  }) => {
    
    /*const {register ,setValue , watch }=useFormContext();
    const startDate=watch('startdate');
    const endDate=watch('enddate');*/
    const getDateParts=(dateStr:string)=>{
        const date=dateStr ? new Date(dateStr) : new Date();
        return {
            day: format(date, 'dd'),
            month: format(date, 'MM'),
            year: format(date, 'yyyy')
        }
    }
    const handleDayChange = (newDay: string) => {
        if (!startingDate) return;
        const newDate = new Date(startingDate);
        newDate.setDate(parseInt(newDay));
        onStartDayChange(newDay);// i am not sure about this 
      };

        const { register } = useFormContext();
        const startTimeInputRef = useRef<HTMLInputElement>(null);
        const endTimeInputRef = useRef<HTMLInputElement>(null);
        const { ref: startTimeRegisterRef, ...startTimeRest } = register("starttime", { required: true });
        const { ref: endTimeRegisterRef, ...endTimeRest } = register("endtime", { required: true });
        const handleFocus=()=>{
            console.log("Input focused");
        }
        const handleIconClick = (type: "start" | "end") => {
            if (type === "start") {
                startTimeInputRef.current?.showPicker();
            } else {
                endTimeInputRef.current?.showPicker();
            }
        };
        
        return (
            <div className={styles.footer_container}>
            <div className={styles.footer}>
                <div className={styles.start_time_picker_footer}>
                    <h2>FROM</h2>
                    <div className={styles.horizontal_container}>
                        <div className={styles.starting_day_footer}>
                            <input
                                type='text'
                                placeholder={current_day()}
                                value={startDay}
                                onChange={(e)=> onStartDayChange(e.target.value)}
                            />
                        </div>
    
                        <div className={styles.date_container}>
                            <div className={styles.month_year}>
                            <input
                                type='text'
                                placeholder={Months[parseInt(current_month()) - 1]}
                                value={startMonth}
                                onChange={(e)=>onStartMonthChange(e.target.value)}
                            />
                            <input
                                type='text'
                                placeholder={current_year()}
                                value={startYear}
                                onChange={(e)=>{onStartYearChange(e.target.value)}}
                            />
                        </div>
                        <div className={styles.day_name}>
                            {format(startingDate?? new Date(),"EEEE")}
                        </div>
                        </div>
    
                        <div className={styles.Clock_icon } onClick={()=>handleIconClick("start")}>
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
                                {...startTimeRest}
                                ref={(e)=>{startTimeRegisterRef(e);
                                    startTimeInputRef.current=e
                                }}
                                onFocus={handleFocus}
                                step="1"
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
                                placeholder={current_day()}
                                value={endDay}
                                onChange={(e)=>onEndDayChange(e.target.value)}
                            />
                        </div>
                        <div className={styles.date_container}>
                            <div className={styles.month_year}>
                            <input
                                type='text'
                                placeholder={Months[parseInt(current_month()) - 1]}
                                value={endMonth}
                                onChange={(e)=>onEndMonthChange(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder={current_year()}
                                value={endYear}
                                onChange={(e)=>onEndYearChange(e.target.value)}
                            />
                        </div>
                        <div className={styles.day_name}>
                            {format(endingDate ?? new Date(),"EEEE")}
                        </div>
                        </div>
                        <div className={styles.Clock2_icon} onClick={()=>handleIconClick("end")}>
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
                        

                        <input 
                            type="time"
                            {...endTimeRest}
                            ref={(e) => {
                            endTimeRegisterRef(e);
                            endTimeInputRef.current = e;
                            }}
                            onFocus={handleFocus}
                            step="1"
                        />
                        </div>
                    </div>
                </div>               
            </div>
            </div>
        );
}

export default Footer;