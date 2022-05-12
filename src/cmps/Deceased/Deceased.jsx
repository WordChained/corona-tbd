import React from 'react';
import styles from './Deceased.module.css';
import { BigCard } from '../../UI/BigCard';
export const Deceased = () => {
  return (
    <section className={styles.container}>
      <BigCard title={'נפטרים - יומי'}></BigCard>
    </section>
  );
};
