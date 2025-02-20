"use client";
import React, { useState } from "react";
import Card from "./../components/card/card";

const Home: React.FC = () => {
    const [cities, setCities] = useState([
        { name: "Nicosia" },
        { name: "Tehran" },
        { name: "Amsterdam" },
    ]);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            const newCity = {
                name: searchQuery.trim(),
                color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, 
            };
            setCities((prevCities) => [newCity, ...prevCities.slice(0, 3)]); 
            setSearchQuery(""); 
        }
    };

    return (
        <div
            style={{
                textAlign: "center",
                padding: "20px",
                minHeight: "100vh",
                background: "linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb, #a6c1ee, #f6d365)",
                backgroundSize: "400% 400%",
                animation: "gradientBackground 15s ease infinite",
            }}
        >
            <h1 style={{ color: "#fff", marginBottom: "20px" }}>Weather Information</h1>
            <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter a city name"
                    style={{
                        padding: "10px",
                        fontSize: "16px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        marginRight: "10px",
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        borderRadius: "5px",
                        border: "none",
                        backgroundColor: "#6B5B95",
                        color: "#fff",
                        cursor: "pointer",
                    }}
                >
                    Search
                </button>
            </form>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "20px",
                    justifyContent: "center",
                    maxWidth: "800px",
                    margin: "0 auto",
                }}
            >
                {cities.map((city, index) => (
                    <Card key={index} city={city.name} />
                ))}
            </div>
            <style jsx>{`
                @keyframes gradientBackground {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
            `}</style>
        </div>
    );
};

export default Home;