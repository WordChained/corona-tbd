import React, { useState, useRef } from "react";
import { BigCard } from "../../UI/BigCard";
import styles from "./PopulationVaccination.module.css";
import { Sorter } from "../../UI/Sorter";
import { CoronaTable } from "../../UI/CoronaTable";
import { IoIosCloseCircle } from "react-icons/io";
export const PopulationVaccination = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isText, setIsText] = useState(false);
  const inputRef = useRef();
  const onSortClick = () => {
    setIsOpen(!isOpen);
  };
  const onSortCancel = () => {
    setIsOpen(false);
  };

  const onInput = (ev) => {
    if (ev.target.value.length > 0) setIsText(true);
    else setIsText(false);
  };

  const onXClick = () => {
    inputRef.current.value = "";
    setIsText(false);
  };
  return (
    <section className={styles.container}>
      <BigCard title={"התחסנות לפי ישובים"}>
        <Sorter
          placeholder={"כלל הישובים"}
          isOpen={isOpen}
          openFnction={onSortClick}
        >
          <div className={styles.sorterChildrenContainer}>
            <div>
              <input
                ref={inputRef}
                type="text"
                placeholder="חפש ישוב"
                onInput={onInput}
              />
              <span
                className={`${styles.closeIcon} ${isText ? styles.show : ""}`}
                onClick={onXClick}
              >
                <IoIosCloseCircle />
              </span>
            </div>
            <div className={styles.btnContainer}>
              <button>אישור</button>
              <button onClick={onSortCancel}>ביטול</button>
            </div>
          </div>
        </Sorter>
        <CoronaTable
          titles={[
            "ישוב",
            "% מתחסנים מנה ראשונה ",
            "% מתחסנים מנה שנייה ",
            "% מתחסנים מנה שלישית ",
            "חולים פעילים לכל 10,000 נפש",
            "ציון יומי מחושב",
          ]}
        />
      </BigCard>
    </section>
  );
};
