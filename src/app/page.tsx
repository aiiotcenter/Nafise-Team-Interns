"use client";
import React, { useState } from "react";
import { Button } from "../components/Button/Button";

const Home: React.FC = () => {
  const [message, setMessage] = useState("");

  const handleClick = () => {
    setMessage("Welcome User");
  };


  // @Hassan & @Amir
  // here you can see an example of how to use a component 
  // your components must be flexable as well , 
  // for example this button can take any color and text and onClick function so we can use it anywhere in our code
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Home Page</h1>
      <Button
        onClick={handleClick}
        place=''
        color="gray"
      >
        Click On Me
      </Button>
      {message && <p style={{ marginTop: "20px", fontSize: "18px" }}>{message}</p>}
    </div>
  );
};

export default Home;
