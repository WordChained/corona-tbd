import React, { useContext, useState } from "react";
import styles from "./Sorter.module.css";
import { BiChevronDown } from "react-icons/bi";
import { ThemeContext } from "../store/context/ThemeContext";
export const Sorter = ({ children, placeholder, isOpen, openFunction }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
      <div
        onClick={openFunction}
        className={`${styles.mainDropdown} ${isOpen ? styles.open : ""}`}
      >
        <span>{placeholder}</span>
        <span className={styles.arrow}>
          <BiChevronDown />
        </span>
      </div>
      <div className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
        {children}
      </div>
    </div>
  );
};
