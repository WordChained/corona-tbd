import React from 'react';
import { BigCard } from '../../UI/BigCard';
import styles from './MainStats.module.css';
export const MainStats = () => {
  return (
    <section className={styles.container}>
      <BigCard title={'מספר מאושפזים - יומי'}>
        <div></div>
      </BigCard>
      <BigCard title={'מאומתים חדשים - יומי'}>
        <div></div>
      </BigCard>
    </section>
  );
};
