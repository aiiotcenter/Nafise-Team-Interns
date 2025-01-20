import React, { ReactElement, ReactNode } from "react";
import styles from "./button.module.css";

interface ButtonProps {
    children: string;
    place: string;
    onClick?: () => void;
    loader?: true | false;
    type?: "submit" | "button";
    color?: string;
}

interface ImageButtonProps {
    children: string;
    onClick?: () => void;
    loader?: true | false;
    type?: "submit" | "button";
    color?: string;
    state: boolean;
    backgroundColor: string;
    image: ReactNode;
}

interface CircularButtonProps {
    onClick?: () => void;
    loader?: true | false;
    type?: "submit" | "button";
    color?: string;
    backgroundColor: string;
    image: ReactElement;
}

export function Button({
    place,
    onClick,
    children,
    color,
    type = "button",
}: ButtonProps) {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`${styles.button} ${styles.customButton}`}
            style={{
                placeSelf: place ?? "end",
                backgroundColor: color,
            }}
        >
            {children}
        </button>
    );
}

export function ImageButton({
    onClick,
    children,
    backgroundColor = "var(--accent)",
    type = "button",
    image,
    state,
}: ImageButtonProps) {
    return (
        <button
            className={`${styles.button} ${styles.imageButton} ${
                state ? "selected" : ""
            }`}
            style={{
                backgroundColor: `${state ? backgroundColor : ""}`,
            }}
            onClick={onClick}
            type={type}
        >
            
                <div className={`${styles.innerButtonWrapper}`}>
                    {image}
                    {children}
                </div>
            
        </button>
    );
}

export function StateButton({
    onClick,
    children,
    backgroundColor = "var(--accent)",
    type = "button",
    state,
}: ImageButtonProps) {
    return (
        <button
            className={`${styles.button} ${styles.stateButton} ${
                state ? "selected" : ""
            }`}
            style={{
                backgroundColor: `${state ? backgroundColor : ""}`,
            }}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
}

export function CircularButton({
    onClick,
    backgroundColor = "var(--accent)",
    type = "button",
    image,
}: CircularButtonProps) {
    return (
        <button
            className={`${styles.button} ${styles.circularButton}`}
            style={{ backgroundColor: backgroundColor }}
            onClick={onClick}
            type={type}
        >
            {image}
        </button>
    );
}
