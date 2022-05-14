import React, { useState } from 'react';
import styles from './BigCard.module.css';
import { RiMore2Fill } from 'react-icons/ri';
import { IoIosInformationCircle } from 'react-icons/io';
import { useWindowSize } from '../customHooks/useWindowSize';
export const BigCard = ({
  children,
  title,
  showInfoIcon = true,
  showMoreIcon = true,
  info = '',
}) => {
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
    <div className={styles.card}>
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
