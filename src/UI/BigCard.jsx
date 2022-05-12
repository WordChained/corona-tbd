import React from 'react';
import styles from './BigCard.module.css';
import { RiMore2Fill } from 'react-icons/ri';
import { IoIosInformationCircle } from 'react-icons/io';
export const BigCard = ({
  children,
  title,
  showInfoIcon = true,
  showMoreIcon = true,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeaderContainer}>
        <h4>{title}</h4>
        {showInfoIcon && <IoIosInformationCircle />}
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
