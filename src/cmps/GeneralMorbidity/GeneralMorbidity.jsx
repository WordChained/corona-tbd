import React from 'react';
import styles from './GeneralMorbidity.module.css';
import { BigCard } from '../../UI/BigCard';
export const GeneralMorbidity = () => {
  return (
    <div className={styles.container}>
      <BigCard title='אחוז תפוסת מיטות באשפוזים'>
        <div></div>
      </BigCard>
      <BigCard title='תפוסת מיטות בביה"ח'>
        <div></div>
      </BigCard>
    </div>
  );
};
