import React from 'react';
import styles from './AbroadMorbidity.module.css';
import { BigCard } from '../../UI/BigCard';
export const AbroadMorbidity = () => {
  return (
    <section className={styles.container}>
      <BigCard title={'תושבים שנכנסו לישראל - מצב התחסנות'}>
        <div></div>
      </BigCard>
      <BigCard title={'מגמת מאומתים שנכנסו לישראל'}>
        <div></div>
      </BigCard>
      <BigCard title={'מאומתים הנכנסים לישראל לפי מדינות'}>
        <div></div>
      </BigCard>
    </section>
  );
};
