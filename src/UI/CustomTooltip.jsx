import React, { useContext } from "react";
import styles from "./CustomTooltip.module.css";
import { ThemeContext } from "../store/context/ThemeContext";
export const CustomTooltip = (props) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const daysInLetters = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];
  if (!props.payload?.length) return <div>אין נתונים</div>;
  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
      {!props.isAgeGroups && (
        <div className={styles.label}>
          <span>{`יום ${
            daysInLetters[new Date(props.label).getDay()]
          }' `}</span>
          {new Date(props.label).toLocaleDateString("he-IL", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
          })}
        </div>
      )}
      {props.isAgeGroups && (
        <div className={styles.label}>
          <span>{props.ageGroups[props.label]}</span>
        </div>
      )}
      {props.payload.map((pl, idx) => (
        <div key={idx} className={styles.row}>
          <span
            style={{ backgroundColor: props.colors[idx] }}
            className={styles.circle}
          ></span>
          <span>{pl.value}</span>
          <span>{props.info[idx]}</span>
        </div>
      ))}
      {props.payload[0]?.payload.totalConfirmedSoFar && (
        <div className={styles.row}>
          <span
            style={{ backgroundColor: "transparent" }}
            className={styles.circle}
          ></span>
          <span>{props.payload[0].payload.totalConfirmedSoFar}</span>
          <span>{props.info[2]}</span>
        </div>
      )}
    </div>
  );
};
