import React, { useContext, useState } from "react";
import styles from "./BigCard.module.css";
import { RiMore2Fill } from "react-icons/ri";
import { IoIosInformationCircle } from "react-icons/io";
import { useWindowSize } from "../customHooks/useWindowSize";
import { ThemeContext } from "../store/context/ThemeContext";
export const BigCard = ({
  children,
  title,
  showInfoIcon = true,
  showMoreIcon = true,
  info = "",
  isFullWidth = false,
  isAloneInGroup = false,
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
      className={`${styles.card} ${isFullWidth ? styles.fullWidth : ""} ${
        isAloneInGroup ? styles.bigger : ""
      } ${darkMode ? styles.dark : ""}`}
    >
      <div className={styles.cardHeaderContainer}>
        <h4>{title}</h4>
        {showInfoIcon && (
          <div
            onClick={onInfoClick}
            onMouseOver={onInfoHover}
            onMouseLeave={closeInfoBox}
          >
            <IoIosInformationCircle />
            {showInfo && <div className={styles.infoBox}>{info}</div>}
          </div>
        )}
        {showMoreIcon && (
          <span className={styles.more}>
            <RiMore2Fill />
          </span>
        )}
      </div>
      {children}
    </div>
  );
};
