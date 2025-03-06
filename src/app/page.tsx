"use client";
import React, { useState } from "react";
import { Button } from "./components/Button/Button";
import Calendar from "./components/Calendar/Calendar";
import PropagateLoader from "react-spinners/PropagateLoader";

const Home: React.FC = () => {
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTimeout = () => {
    setLoading(false);
    setDisplay(true);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", alignContent: "center" }}>
      <h1>Home Page</h1>
      <Button
        onClick={() => {
          setLoading(true);
          setTimeout(handleTimeout, 3000);
        }}
        place=""
        color="gray"
      >
        Click On Me
      </Button>

      {loading ? (
        <div
          style={{
            height: "70vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PropagateLoader className="loading" color="#98c2e0" size={15} />
        </div>
      ) : (
        display && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "15px",
            }}
          >
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
        )
      )}
    </div>
  );
};

export default Home;
