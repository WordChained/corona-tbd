import React, { useContext, useState } from "react";
import styles from "./Card.module.css";
import { IoIosInformationCircle } from "react-icons/io";
import { useWindowSize } from "../customHooks/useWindowSize";
import { ThemeContext } from "../store/context/ThemeContext";
export const Card = ({
  children,
  title,
  showInfoIcon = true,
  inSummary = false,
  info = "",
}) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const [showInfo, setShowInfo] = useState(false);
  const windowSize = useWindowSize();
  const onInfoHover = () => {
    if (windowSize.width < 700 || !info.length) return;

    setShowInfo(true);
  };
  const closeInfoBox = () => {
    setShowInfo(false);
  };
  const onInfoClick = () => {
    if (windowSize.width > 700 || !info.length) return;
    setShowInfo(true);
  };
  return (
    <div
      className={`${styles.card} ${inSummary ? styles.summary : ""} ${
        darkMode ? styles.dark : ""
      }`}
    >
      <div className={styles.cardHeaderContainer}>
        <h4>{title}</h4>
        <div
          onClick={onInfoClick}
          onMouseOver={onInfoHover}
          onMouseLeave={closeInfoBox}
        >
          {showInfoIcon && <IoIosInformationCircle />}
          {showInfo && <div className={styles.infoBox}>{info}</div>}
        </div>
      </div>
      {children}
    </div>
  );
};
