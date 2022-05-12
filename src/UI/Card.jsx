import React from "react";
import styles from "./Card.module.css";
import { IoIosInformationCircle } from "react-icons/io";
export const Card = ({
  children,
  title,
  showInfoIcon = true,
  inSummary = false,
}) => {
  return (
    <div className={`${styles.card} ${inSummary ? styles.summary : ""}`}>
      <div className={styles.cardHeaderContainer}>
        <h4>{title}</h4>
        {showInfoIcon && <IoIosInformationCircle />}
      </div>
      {children}
    </div>
  );
};
