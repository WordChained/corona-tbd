import React from 'react';
import styles from './ChildrenMorbidity.module.css';
import { BigCard } from '../../UI/BigCard';
export const ChildrenMorbidity = () => {
  return (
    <div className={styles.container}>
      <BigCard title='מגמת ילדים מאומתים - ממוצע נע 7 ימים'>
        <div></div>
      </BigCard>
      <BigCard title='מגמת ילדים מבודדים - ממוצע נע 7 ימים'>
        <div></div>
      </BigCard>
      <BigCard title='תחלואת ילדים ביחס לחתלואה הכללית - יישובים'>
        <div></div>
      </BigCard>
    </div>
  );
};
