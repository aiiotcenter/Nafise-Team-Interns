"use client";
import clsx from "clsx";
import { eachDayOfInterval, endOfMonth, format, getDay, isToday, startOfMonth } from "date-fns";
import styles from './agenda.module.css';
import React, { useEffect, useState } from "react";

interface AgendaProps {
    onDateSelect: (dates: Date[]) => void; // Correct type definition
    selectedMonth:number;
    selectedYear:number;
}

const chunkArray = (array: any[], chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

const Agenda = ({
    onDateSelect,
    selectedMonth,
    selectedYear}:AgendaProps) => {
    // Base date for calculations
    const currentDate = new Date();
    
    // Constants
    const Weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const Months = ["January", "February", "March", "April", "May", "June", "July", 
                   "August", "September", "October", "November", "December"];
    
    // Generate 21 years (current year ±10)
    const years = Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() + i);

    // State Management
    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [selectedyear, setSelectedyear] = useState(currentDate.getFullYear());
    const [selectedmonth, setSelectedmonth] = useState(currentDate.getMonth());
    const [startingdayindex, setStartingdayindex] = useState(getDay(startOfMonth(currentDate)));

    // Calculate days in selected month
    const daysInMonth = eachDayOfInterval({
        start: startOfMonth(new Date(selectedYear, selectedMonth-1)),
        end: endOfMonth(new Date(selectedYear, selectedMonth-1))
    });

    // Update grid alignment when month/year changes
    useEffect(() => {
        const firstDay = startOfMonth(new Date(selectedYear, selectedMonth-1));
        setStartingdayindex(getDay(firstDay));
    }, [selectedYear, selectedMonth]);

    // Event Handlers
    const handleDateClick=(date:Date)=>{
        let newDates=[...selectedDates];
        if (newDates.length===2){
            newDates=[date];
        }else if (newDates.length===1){
            newDates = newDates [0] < date ? [newDates[0], date] : [date, newDates[0]];
        }else {
            newDates=[date]
        }
        setSelectedDates(newDates)
        onDateSelect(newDates);
    };

    /*const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMonth = parseInt(e.target.value, 10);
        setSelectedmonth(newMonth);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newYear = parseInt(e.target.value, 10);
        setSelectedyear(newYear);
    };*/
    const allCells = [
        ...Array.from({ length: startingdayindex }), // Empty cells
        ...daysInMonth // Actual days
      ];
    
      // Split into weekly chunks
      const weeks = chunkArray(allCells, 7);
      return(
      <div className="container mx-auto p-4">
      {/* Calendar Grid */}
      <section>
        {/* Weekday Headers (keep existing) */}
        <div className={styles.Weekdays_header}>
          {Weekdays.map((day) => (
            <div key={day} className={styles.weekdayCell}>
              {day.substring(0, 2)}
            </div>
          ))}
        </div>

        <div className={styles.days}>
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className={styles.weekRow}>
              {week.map((cell, cellIndex) => {
                // Render empty cells
                if (cell === undefined) {
                  return (
                    <div 
                      key={`empty-${weekIndex}-${cellIndex}`} 
                      className="aspect-square border rounded-md" 
                    />
                  );
                }
                
                // Render actual days
                const day = cell as Date;
                const isSelected = selectedDates.some((d)=>d.toDateString()===day.toDateString())
                return (
                  <div
                    key={day.toISOString()}
                    className={clsx(
                      "aspect-square border rounded-md p-2",
                      "flex items-center justify-center transition-colors",
                      {
                        "bg-blue-100 border-blue-500 font-bold": isToday(day),
                        "hover:bg-gray-50": !isToday(day)
                      }
                    )}
                    onClick={()=>handleDateClick(day)}
                  >
                    <span className={clsx({
                      "text-blue-600": isToday(day),
                      "text-gray-800": !isToday(day)
                    })}>
                      {format(day, "d")}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Agenda;