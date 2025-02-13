"use client";
import React, { useState } from "react";
import { Button } from "./components/Button/Button";
import Calendar from "./components/Calendar/Calendar"


const Home: React.FC = () => {
  const [display, setdisplay] = useState(true);

  const handleClick = () => {
    setdisplay(true);
  };


  // @Hassan & @Amir
  // here you can see an example of how to use a component 
  // your components must be flexable as well , 
  // for example this button can take any color and text and onClick function so we can use it anywhere in our code
  return (
    <div style={{ textAlign: "center", marginTop: "50px"}}>
      <h1>Home Page</h1>
      <Button
        onClick={handleClick}
        place=''
        color="gray"
      >
        Click On Me
      </Button>
      {
      display && 
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "15px"}}>
          <Calendar
              events={[
                {
                  start: new Date(2025, 0, 28, 12, 45),
                  end: new Date(2025, 0, 30, 13, 45),
                  title: "Team meeting",
                  color: "white",
                },
                {
                  start: new Date(2025, 0, 29, 8, 30),
                  end: new Date(2025, 0, 29, 9, 30),
                  title: "Yoga session",
                  color: "green",
                },  
              ]}              
          />
        </div>
      }
    </div>
  );
};

export default Home;
