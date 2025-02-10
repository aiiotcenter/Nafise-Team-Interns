
"use client"
import api from '../crud';
import { useState, useEffect,useRef } from "react";
import { useForm , SubmitHandler , FormProvider} from "react-hook-form";
import styles from "../components/calender.module.css"
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import NavBar from './NavBar';
import Footer, { current_day } from './Footer';
import Agenda from './Agenda';


const useFocusHandler=()=>{
  const [isInputFocused , setIsInputFocused]=useState<boolean>(false);
  
  const handleFocus=()=>setIsInputFocused(true);
  const handleBlur=()=>setIsInputFocused(false);

  return {isInputFocused,handleFocus,handleBlur}
}
//current month keep
export const current_month=()=>{
    const today = new Date();
    return format(today,"MM");
};
//current year keep
export const current_year=()=>{
    const today = new Date();
    return format(today,"yyyy")// this  year : 2025
};

const Months=["January", "February", "March", "April", "May", "June", "July", 
                   "August", "September", "October", "November", "December"];

const Weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

interface submittedData{
  
  textfield:string;
  starttime:string
  startdate:string;
  enddate:string;
  endtime:string
}


const Calendar=()=>{
  const [month, setMonth] = useState(current_month());
  const [year, setYear] = useState(current_year());
  const [day, setDay] = useState(current_day());
const [startMonth, setStartMonth] = useState(current_month());
const [startYear, setStartYear] = useState(current_year());
const [startDay, setStartDay] = useState(current_day());
const [endMonth, setEndMonth] = useState(current_month());
const [endYear, setEndYear] = useState(current_year());
const [endDay, setEndDay] = useState(current_day());
  const [selectedDate,setSelectedDate]=useState<Date[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);//BUTTON 
  const{isInputFocused,handleFocus,handleBlur}=useFocusHandler();
  const popupRef = useRef<HTMLDivElement | null>(null); // ✅ Declare ref properly
  const [startingDate,setStartingDate]=useState<Date | null>(null);
  const [endingDate,setEndingDate]=useState<Date | null>(null);
  const [startingTime,setStartingTime]=useState<string>('');
  const [endingTime,setEndingTime]=useState<string>('');
  const currentDate=new Date();//"dd-MM-yyyy"
  const [formStep,setFormStep]=useState<"dateSelection" | "finalForm">("dateSelection");
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
const [showCalendar,setShowCalendar]=useState(false);
const[currentFocus, setCurrentFocus]=useState<"start" | "end" | null>(null);
  const[showForm,setShowForm]=useState(true);
//keep
  const handleDateInputFocus = (type: "start" | "end") => {
  setShowForm(false);
    setShowCalendar(true);
  setCurrentFocus(type);
};
//use this function later
const handleCalendarClose = () => {
  setShowCalendar(false);
  setCurrentFocus(null);
};
  
//i think i should move this also
  const onSubmit: SubmitHandler<submittedData> = async(data) => {
    const mergeData={
      textfield:data.textfield,
      startingdate:`${data.startdate} ${data.starttime}`,
      endingdate:`${data.enddate} ${data.endtime}`
    }
//to move in the homepage    
    try{
    const response=await api.addDATE(mergeData);//backend post function

    console.log("Data submitted successfully:", response);
    if(response.status==201){
      Swal.fire({
        position: "center",
            icon: "success",
            title: " Data transfered successfully ",
            showConfirmButton: false,
            timer: 1500
          });
    }
    setIsOpen(false);
    reset();
    } catch (error) {
      console.error("error submitted data : ",error)
      Swal.fire({
        position: "center",
          icon: "error",
          title: " failed transfer data ",
          showConfirmButton: false,
          timer: 1500
      })
    }
    
    };

      const handleDateSelection=(dates:Date[])=>{
        if (dates.length===1){
        const primaryDate=dates[0];
        setStartingDate(primaryDate);

    
        setStartMonth(format(primaryDate,'MM'));
        setStartYear(format(primaryDate,'yyyy'))
        setStartDay(format(primaryDate,'dd'));
        
        }else if (dates.length===2){
          const [start, end ]=dates
          setEndingDate(end)
          setStartingDate(start)
          setStartMonth(format(start, 'MM'));
          setStartYear(format(start, 'yyyy'));
          setStartDay(format(start, 'dd'));
          setEndMonth(format(end, 'MM'));
          setEndYear(format(end, 'yyyy'));
        setEndDay(format(end, 'dd'));
        
        }
//move this
        const handleForm =(dates:Date[])=>{
          setSelectedDates(dates);
          if(dates.length==2){
            setFormStep("finalForm")
          }
        }

  };
//handle Month changes
  const handleMonthChange=(newMonth:string)=>{
    setMonth(newMonth);
  }
  //handle year changes
  const handleYearChange=(newYear:string)=>{
    setYear(newYear)
  }
  //handle day changes
  const handleDayChange=(newDay:string)=>{
    setDay(newDay)
    if (startingDate){
      const newDate=new Date(startingDate);
      newDate.setDate(parseInt(newDay))
      handleDateSelection([newDate])
    }
  }
  
  const methods = useForm<submittedData>();
const { register, handleSubmit, reset, setValue,watch } = methods;
  
useEffect(()=>{
  if (startDay && startMonth && startYear){
    
    const formatedDate=`${startYear}-${startMonth}-${startDay}`;
    setValue("startdate",formatedDate);
  }
},[startDay,startMonth,startYear,setValue])
useEffect(()=>{
  if (endYear && endMonth && endDay){
    const formatedendDate=`${endYear}-${endMonth}-${endDay}`;
    setValue("enddate",formatedendDate);
  }
},[endDay,endMonth,endYear,setValue])
const watchedStartTime=watch("starttime");
const watchedEndTime=watch("endtime");
const textValue = watch("textfield");

{showCalendar && textValue && <h3>{textValue}</h3>}
useEffect(()=>{
  setStartingTime(watchedStartTime);
},[watchedStartTime]);
useEffect(()=>{
  setEndingTime(watchedEndTime);
},[watchedEndTime])
return (
    <div className={`${styles.calendarMain}`}>
      <button
        className={`${styles.calendarOpenButton}`}
        onClick={() => setIsOpen(true)}
        >
        Open form
      </button>

      {isOpen && (
        <div className={styles.calendarOverlay}>
          <div className={styles.calendarPopup} ref={popupRef}>
                    
            <div><h2 className={styles.calendarTitle}>{showForm ? "fill the form" : "Select dates & times"}</h2>
            </div>
            <FormProvider {...methods}>

            <form  onSubmit={handleSubmit(onSubmit)}>
            {showCalendar && textValue && <h3>{textValue}</h3>}
            <div className={showForm ? styles.formVisible : styles.formHidden}>
             <div className={`${styles.formDisplay} ${isInputFocused ? styles.formDispalyHidden : '' }`}>
             <div className={styles.calendarText}>
            </div> 
                <label className={styles.calendarinputdescription}>Lecture name</label>
                <input
                  type="text"
                  {...register("textfield", { required: true })}
                  className={styles.calendarInput}
                  placeholder="Enter text"
                />
              </div>
              
            
              <div className={styles.calendarStartDate}>
                <label className={styles.calendarinputdescription}>
                  Select Time 
                  </label>
                <input
                  type="date"
                  {...register("startdate", { required: true })}
                  className={styles.calendarInput}
                  value={
                    startYear && startMonth && startDay ?
                     `${startYear}-${startMonth}-${startDay}`
                      : ""}  
                  onFocus={()=>handleDateInputFocus("start")}
                />

                
              
                </div>
                
              
              
              </div>
              {/* Conditionally Render Additional Components */}
              {textValue &&(
              <div className={showCalendar ? styles.calendarVisible : styles.calendarHidden}>
                  <NavBar
                   
                  startingDate={startingDate}
                  endingDate={endingDate}
                  startingTime={startingTime}
                  endingTime={endingTime}
                  month={month}
                  year={year}
                  onMonthChange={handleMonthChange}
                  onYearChange={handleYearChange}
                  />
                  <Agenda onDateSelect={handleDateSelection}
                  selectedMonth={parseInt(month , 10)}
                  selectedYear={parseInt(year, 10)} />
                  <Footer
                   startingDate={startingDate}
                   endingDate={endingDate}
                   startingTime={startingTime}
                   endingTime={endingTime}
                   onStartMonthChange={setStartMonth}
                   onStartYearChange={setStartYear}
                   onStartDayChange={setStartDay}
                   onEndMonthChange={setEndMonth}
                   onEndYearChange={setEndYear}
                   onEndDayChange={setEndDay}
                   startMonth={startMonth}
                   startDay={startDay}
                   startYear={startYear}
                   endMonth={endMonth}
                   endDay={endDay}
                   endYear={endYear}
                   />
                   
                </div>
              )}
              <div className={styles.calendarButtons}>
                <div><button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => {
                    setIsOpen(false)
                  setShowForm(true)
                setShowCalendar(false)
              }}
                >
                  Cancel
                </button>
                </div>
                <button
                  type="submit"
                  className={styles.submitButton}
                >
                  Submit
                </button>
              </div>
            </form>
            </FormProvider>
          </div>
        </div>
      )}
      </div>
)
}
    
  


export default Calendar;



