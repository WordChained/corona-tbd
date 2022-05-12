import React from 'react';
import { BigCard } from '../../UI/BigCard';
import styles from './VaxOnMorbidity.module.css';

export const VaxOnMorbidity = () => {
  return (
    <section className={styles.container}>
      {/* <BigCard title={'מאומתים יומי - התחסנות'}></BigCard>
      <BigCard title={'חולים קשה - התחסנות'}></BigCard> */}
      <BigCard title={'חולים פעילים - גיל והתחסנות'}></BigCard>
    </section>
  );
};
