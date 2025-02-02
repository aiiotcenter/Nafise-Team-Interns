
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
    
    /*const handleStartDateChange = (day: string, month: string, year: string) => {
        const newDate = new Date(`${year}-${month}-${day}`);
        if (!isNaN(newDate.getTime())) {
            setValue('startdate', format(newDate, 'yyyy-MM-dd'));
        }
    };
    */
    /*const handleEndDateChange = (day: string, month: string, year: string) => {
        const newDate = new Date(`${year}-${month}-${day}`);
        if (!isNaN(newDate.getTime())) {
            setValue('enddate', format(newDate, 'yyyy-MM-dd'));
        }
    };
    const { day: startDay, month: startMonth, year: startYear } = getDateParts(startDate);
    const { day: endDay, month: endMonth, year: endYear } = getDateParts(endDate);
    const [selectedDay, setSelectedDay] = useState<string>(current_day());
    const [selectedMonth, setSelectedMonth] = useState<string>(current_month());
    const [selectedYear, setSelectedYear] = useState<string>(current_year());
   /* const [startingdayindex, setStartingdayindex] = useState(getDay(startOfMonth(currentDate)));
*/
   /* const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDay(e.target.value);
    };

    const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMonth(e.target.value);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedYear(e.target.value);
    };
    */
    /*let dayName = day_name();
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
       
        const { register } = useFormContext();
            const starttimeInputRef=useRef<HTMLInputElement>(null);
            const endTimeInputRef=useRef<HTMLInputElement>(null);
            const handleIconClick=(type:"start"|"end")=>{
                if(type="start"){
                    starttimeInputRef.current?.showPicker();
                }else{
                endTimeInputRef.current?.showPicker();
            }}
        
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
                                {...register("starttime", { required: true })}
                                ref={starttimeInputRef}
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
                            <input type='time' 
                                {...register("endtime", { required: true })}
                                ref={endTimeInputRef}
                            />
                        </div>
                    </div>
                </div>               
            </div>
            </div>
        );
}

export default Footer;