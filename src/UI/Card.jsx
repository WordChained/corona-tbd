import React from "react";
import styles from "./Card.module.css";
import { IoIosInformationCircle } from "react-icons/io";
export const Card = ({ children, title, showInfoIcon = true }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeaderContainer}>
        <h4>{title}</h4>
        {showInfoIcon && <IoIosInformationCircle />}
      </div>
      {children}
    </div>
  );
};
