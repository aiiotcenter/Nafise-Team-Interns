import React, { useState, useEffect, useRef } from "react";
import { startOfMonth, lastDayOfMonth, eachDayOfInterval, format, getDay, isToday, isSameDay, addMonths, subMonths, isSameMonth } from "date-fns";
import { BsCalendar2CheckFill, BsFillFlagFill } from "react-icons/bs";
import "./calendar.css";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Event {
  start: Date;
  end: Date;
  title: string;
  color: string;
}

interface CalendarProps {
  events: Event[];
}

function Calendar({ events }: CalendarProps) {
  const [S2, setS2] = useState(false);
  const [le, setLe] = useState(events);
  const [input, setInput] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    color: "#000000",
  });
  const formRef = useRef<HTMLFormElement | null>(null);

  const firstDay = startOfMonth(currentMonth);
  const lastDay = lastDayOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: firstDay, end: lastDay });
  const emptyArray = Array.from({ length: getDay(firstDay) });

  function handlePrevMonth() {
    setCurrentMonth((prev) => subMonths(prev, 1));
  }

  function handleNextMonth() {
    setCurrentMonth((prev) => addMonths(prev, 1));
  }

  function handleCalendar() {
    setS2(false);
  }

  function handleMonthly() {
    setS2(true);
  }

  function formatTimeRange(start: Date, end: Date) {
    return `${format(start, "hh:mm a")} - ${format(end, "hh:mm a")}`;
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setInput(false);
      }
    }

    if (input) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [input]);

  function handleDayClick(day: Date) {
    setSelectedDate(day);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const newEventData = {
      ...newEvent,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end),
    };
    setLe([...le, newEventData]);
    setInput(false);
    setNewEvent({ title: "", start: "", end: "", color: "#000000" });
  }

  function getEventsForSelectedDay() {
    if (!selectedDate) return [];
    return le.filter(
      (event) => isSameDay(event.start, selectedDate) || (event.start <= selectedDate && event.end >= selectedDate)
    );
  }

  function getEventBorders(day: Date) {
    const eventOnDay = le.find((event) => {
      return (
        (event.start <= day && event.end >= day) || 
        isSameDay(event.start, day) || 
        isSameDay(event.end, day)
      );
    });

    if (!eventOnDay) return null;

    const isStartDay = isSameDay(eventOnDay.start, day);
    const isEndDay = isSameDay(eventOnDay.end, day);
    const isMiddleDay = !isStartDay && !isEndDay;

    let borderRadius = "0";
    let backgroundColor = eventOnDay.color;

    if (isStartDay) {
      borderRadius = "5px 0 0 5px";
    }
    if (isMiddleDay) {
      borderRadius = "0";
    }
    if (isEndDay) {
      borderRadius = "0 5px 5px 0";
    }

    if (eventOnDay.start == eventOnDay.end){
      borderRadius = "100%";
    }

    return { borderRadius, backgroundColor };
  }

  return (
    <section className="main">
      <div className="top">
        <button onClick={handlePrevMonth}>{"<"}</button>
        <h3>{format(currentMonth, "MMM yyyy")}</h3>
        <button onClick={handleNextMonth}>{">"}</button>
      </div>

      {input && (
        <form ref={formRef} className="newEventForm" onSubmit={handleSubmit}>
          <div style={{ fontWeight: "bold", flex: 1 }}>New Event</div>
          <div className="inputs">
            <div>
              <label>Event Title:</label> 
              <input
                type="text"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Event Start Date:</label> 
              <input
                type="date"
                value={newEvent.start}
                onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Event End Date:</label> 
              <input
                type="date"
                value={newEvent.end}
                onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Event Color:</label> 
              <input
                type="color"
                value={newEvent.color}
                onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value })}
                required
              />
            </div>
            <div>
              <button type="submit">Add Event</button>
            </div>
          </div>
        </form>
      )}

      {!S2 && (
        <>
          <div className="Wdays">
            {weekdays.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="daysGrid">
            {emptyArray.map((_, i) => (
              <div key={i}></div>
            ))}
            {daysInMonth.map((day, index) => {
              const today = isToday(day);
              const eventsForDay = le.filter(
                (event) =>
                  isSameDay(event.start, day) ||
                  (event.start <= day && event.end >= day)
              );

              const { borderRadius, backgroundColor } = getEventBorders(day) || {};

              return (
                <div
                  key={index}
                  className="day"
                  onClick={() => handleDayClick(day)}
                  style={{
                    backgroundColor: today ? "rgb(61, 141, 252)" : backgroundColor,
                    color: (eventsForDay.length > 0 || today) ? "white" : "black",
                    padding: today ? "2px" : "0",
                    position: "relative",
                    cursor: "pointer",
                    borderRadius: borderRadius,
                  }}
                >
                  <div className="num">{format(day, "d")}</div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {S2 && (
        <>
          <div className="mevents">
            {le.map((event, index) => {
              if (isSameMonth(event.start, currentMonth)) {
                return (
                  <div className="eventl" key={index}>
                    <div className="eTime" style={{display: "block"}}>
                      <b><p style={{fontSize: "15px"}}>{format(event.start, "dd")}</p>{format(event.start, "EEE")}</b>
                    </div>
                    <div
                      className="eTitle"
                      style={{
                        backgroundColor: event.color,
                        color: "white",
                        borderRadius: "5px",
                      }}
                    >
                      {event.title}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </>
      )}

      {!S2 && selectedDate && (
        <div className="dailyEventsList">
          {getEventsForSelectedDay().map((event, index) => (
            <div className="eventl" key={index}>
              <div className="eTime">
                {formatTimeRange(event.start, event.end)}
              </div>
              <div
                className="eTitle"
                style={{
                  backgroundColor: event.color,
                  color: "white",
                  borderRadius: "5px",
                }}
              >
                {event.title}
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="newEvent" onClick={() => setInput(true)}>
        +
      </button>
      <div className="navfooter">
        <BsCalendar2CheckFill onClick={handleCalendar} />
        <BsFillFlagFill onClick={handleMonthly} />
      </div>
    </section>
  );
}

export default Calendar;