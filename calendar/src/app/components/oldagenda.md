"use client"
import clsx from "clsx";
import{eachDayOfInterval, endOfMonth, format, getDay, isToday, startOfMonth} from "date-fns";
import styles from './agenda.module.css';
import React, { useEffect, useState } from "react";
//agenda front header+inside
const Agenda = () => {

    const currentDate=new Date();//current date 
    const Weekdays=["sunday", "monday","tuesday","wednesday","thursday","friday","Saturday"];//days of the week
    const Months=["january","february","march","april","may","june","july","august","september","octobre","november","december"];//list of months of the year
    const years = Array.from({ length: 21 }, (_, i) => currentDate.getFullYear() - 10 + i);
    //instead of pushing static data this line will provide u with the next and previous 10 years dynamiclly 
   
   
    const firstDayofmonth = startOfMonth(currentDate);//in which day the month start
    const lastdayofmonth = endOfMonth(currentDate);//in which day the month finish 
    
    //when the index is shown traditional way their is a problem 
    //not each month first day is sunday so need to be modified solution below
    //const startingdayindex=getDay(firstDayofmonth);constant way

    const [selectedyear,setSelectedyear]=useState(currentDate.getFullYear());//default "current year"
    const [selectedmonth,setSelectedmonth]=useState(currentDate.getMonth());//default "current month"
    const [startingdayindex, setStartingdayindex] = useState(getDay(startOfMonth(currentDate)));
    const [selectedDate ,setSelecteDate]=useState(new Date());
    
    const numberfodays = eachDayOfInterval({
        start:startOfMonth(new Date(selectedyear,selectedmonth)), //firstDayofmonth,
        end:endOfMonth(new Date(selectedyear,selectedmonth)),//the number of days in each month 
    });
     // Update `startingdayindex` when `selectedyear` or `selectedmonth` changes
     useEffect(() => {
        const firstDayofmonth = startOfMonth(new Date(selectedyear, selectedmonth)); // Calculate the first day of the selected month
        setStartingdayindex(getDay(firstDayofmonth)); // Update the starting day index
    }, [selectedyear, selectedmonth]); // Dependency array ensures this runs when year or month changes
    //when changing the month the starting date changes
    const handlemonthchange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        const newMonth=parseInt(e.target.value,10)
        const updateDate=new Date(selectedDate.getFullYear(),newMonth,1);
        setSelectedmonth(newMonth)
        setSelecteDate(updateDate)
    }
    //when changing the year the starting datee changes
    const handleyearchange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        const newYear=parseInt(e.target.value,10)
        const updateDate=new Date(newYear,selectedDate.getMonth(),1)
        setSelectedyear(newYear)
        setSelecteDate(updateDate)
    }
    return(
    <div className="container mx-auto p-4">
        <div className="present month & year">
            <h2 className="text-center">{format(new Date(selectedyear,selectedmonth),"MMMM yyyy")}</h2>
        </div>
        {/*select container to select year and month */}
        <div className="text-centerbg-gray-200 p-">
            <div className={styles.selectContainer}>
                <select value={selectedyear}
                onChange={handleyearchange}>
                    {years.map((year)=>(
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                <select value={selectedmonth}
                onChange={handlemonthchange}>
                    {Months.map((month,index)=>(
                        <option key={index} value={index}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
            {Weekdays.map((day) => {
                return(
                    <div key={day} className="font-bold text-center">
                        {day}
                    </div>

                ) 
            })}
            {Array.from({length:startingdayindex}).map((_,index)=>{
                return<div key={`empty-${index}`} 
                className="border rounded-md p-2 text-center "
                />
            })}
            {numberfodays.map((day , index)=>{
                return(<div key={index} className={clsx("border rounded-md p-2 text-center ",{
                    "bg-gray-200":isToday(day),
                    "text-gray-900":isToday(day)
                })}>{format(day,"d")}</div>
            );
            })}
        </div>
        
    </div>
)}
export default Agenda;