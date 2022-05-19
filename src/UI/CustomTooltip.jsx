import React from "react";
import styles from "./CustomTooltip.module.css";
export const CustomTooltip = (props) => {
  const daysInLetters = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];
  if (!props.payload.length) return <div>אין נתונים</div>;
  return (
    <div className={styles.container}>
      <div className={styles.label}>
        <span>{`יום ${daysInLetters[new Date(props.label).getDay()]}' `}</span>
        {new Date(props.label).toLocaleDateString("he-IL", {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
        })}
      </div>
      {props.payload[3] && (
        <div className={styles.row}>
          <span
            style={{ backgroundColor: props.colors[0] }}
            className={styles.circle}
          ></span>
          <span>{props.payload[3].value}</span>
          <span>{props.info[0]}</span>
        </div>
      )}
      {props.payload[2] && (
        <div className={styles.row}>
          <span
            style={{ backgroundColor: props.colors[1] }}
            className={styles.circle}
          ></span>
          <span>{props.payload[2].value}</span>
          <span>{props.info[0]}</span>
        </div>
      )}
      {props.payload[1] && (
        <div className={styles.row}>
          <span
            style={{ backgroundColor: props.colors[2] }}
            className={styles.circle}
          ></span>
          <span>{props.payload[1].value}</span>
          <span>{props.info[1]}</span>
        </div>
      )}
      <div className={styles.row}>
        <span
          style={{ backgroundColor: props.colors[3] }}
          className={styles.circle}
        ></span>
        <span>{props.payload[0].value}</span>
        <span>{props.info[2]}</span>
      </div>
    </div>
  );
};
