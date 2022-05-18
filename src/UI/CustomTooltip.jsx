import React from 'react';
import styles from './CustomTooltip.module.css';
export const CustomTooltip = (props) => {
  const daysInLetters = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];

  if (!props.payload.length) return <div>loader</div>;
  return (
    <div className={styles.container}>
      <div className={styles.label}>
        <span>{`יום ${daysInLetters[new Date(props.label).getDay()]}' `}</span>
        {new Date(props.label).toLocaleDateString('he-IL', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
        })}
      </div>

      <div className={styles.row}>
        <span
          style={{ backgroundColor: '#3bc3fb' }}
          className={styles.circle}
        ></span>
        <span>{props.payload[2].value}</span>
        <span>קשה</span>
      </div>
      <div className={styles.row}>
        <span
          style={{ backgroundColor: '#c1d750' }}
          className={styles.circle}
        ></span>
        <span>{props.payload[1].value}</span>
        <span>בינוני</span>
      </div>
      <div className={styles.row}>
        <span
          style={{ backgroundColor: '#167070' }}
          className={styles.circle}
        ></span>
        <span>{props.payload[0].value}</span>
        <span>קל</span>
      </div>
    </div>
  );
};
