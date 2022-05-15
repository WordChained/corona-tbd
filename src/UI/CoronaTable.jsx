import React, { useState, useRef } from "react";
import styles from "./CoronaTable.module.css";
export const CoronaTable = ({ titles = [], data = [] }) => {
  //   const [color, setColor] = useState("#f2c580");
  const tableHeaderRef = useRef();
  const onHeaderClick = (ev) => {
    const children = tableHeaderRef.current.children;
    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove(`${styles.active}`);
    }
    ev.target.classList.add(`${styles.active}`);
    //this is not the right logic
    // i need to have three options:
    // first click we add down arrow and a shadow-bo,
    // second click we add an up arrow (shadow-box still active),
    // third click we remove both (remove shadow-box)
  };

  const getColorForDailyScore = (score) => {
    switch (true) {
      case score <= 4.5:
        return "#b8de92";
      //green
      case score <= 6:
        return "#fcfc70";
      //yellow
      case score <= 7.5:
        return "#f2c580";
      //orange
      default:
        return "#fa9e8f";
      //red
    }
  };
  return (
    <div className={styles.container}>
      {
        <div ref={tableHeaderRef} className={styles.tableHeader}>
          {titles.map((title, idx) => (
            <div key={idx} onClick={onHeaderClick}>
              {title}
            </div>
          ))}
        </div>
      }

      {/* {data.map((row, idx) => (
        <div key={idx} className={styles.row}>
          <div>{row.location}</div>
          <div>{row.vaxShot1}</div>
          <div>{row.vaxShot2}</div>
          <div>{row.vaxShot3}</div>
          <div>{row.activeMorbidPer10K}</div>
          <div  <span style={{ backgroundColor: getColorForDailyScore(row.dailyScore) }}>
            {row.dailyScore}
          </span></div>
        </div>
      ))} */}
      <div className={styles.row}>
        <div>{"אבו גוש"}</div>
        <div>{"מעל 90%"}</div>
        <div>{"מעל 90%"}</div>
        <div>{" 80.95%"}</div>
        <div>{"43.2"}</div>
        <div>
          <span style={{ backgroundColor: getColorForDailyScore(6.5) }}>
            {"6.5"}
          </span>
        </div>
      </div>
    </div>
  );
};
