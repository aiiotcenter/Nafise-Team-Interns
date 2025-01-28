/*
"use client"
import api from '../crud';
import { useState } from "react";
import { useForm , SubmitHandler } from "react-hook-form";
import styles from "../components/calender.module.css"
import Swal from 'sweetalert2';

interface submitteddata{//DECLARATIONS
    
    startdate:string;
    enddate:string;
  
    
}
const Calendar =()=>{
    const [isOpen, setIsOpen] = useState(false);//BUTTON 
  const { register, handleSubmit, reset } = useForm<submitteddata>();

  const onSubmit: SubmitHandler<submitteddata> = async(data) => {
    try{
    const response=await api.addDATE(data);//backend post function
    console.log("Data submitted successfully:", response.data);
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
          <div className={styles.calendarPopup}>
            <div><h2 className={styles.calendarTitle}>Fill the Form</h2></div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div> <div className={styles.calendarText}>
                <label className={styles.calendarinputdescription}>Lecture name</label>
                <input
                  type="text"
                  {...register("textfield", { required: true })}
                  className={styles.calendarInput}
                  placeholder="Enter text"
                />
              </div>
              
              <div className={styles.calendarStartDate}>
                <label className={styles.calendarinputdescription}>Start Time</label>
                <input
                  type="date"
                  {...register("startdate", { required: true })}
                  className={styles.calendarInput}
                />
                {/*<div><input 
                type="time"
                {...register("starttime",{required:true})}
                className={styles.calendarInput}/>
                </div>
              </div>
              <div className={styles.calendarEndDate}>
                <label className={styles.calendarinputdescription}>End Time</label>
                <input
                  type="date"
                  {...register("enddate", { required: true })}
                  className={styles.calendarInput}
                />
                
                {/*<div><input 
                type="time"
                {...register("endtime",{required:true})}
                className={styles.calendarInput}
                />
                </div>
              </div>
              <div className={styles.calendarButtons}>
                {/*<div><button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setIsOpen(false)}
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
*/
