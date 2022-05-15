import React, { useState } from "react";
import styles from "./Sorter.module.css";
import { BiChevronDown } from "react-icons/bi";
export const Sorter = ({ children, placeholder, isOpen, openFnction }) => {
  return (
    <div className={styles.container}>
      <div
        onClick={openFnction}
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
