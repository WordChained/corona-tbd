import React from 'react';
import { BigCard } from '../../UI/BigCard';
import styles from './PopulationVaccination.module.css';

export const PopulationVaccination = () => {
  return (
    <section className={styles.container}>
      <BigCard title={'התחסנות לפי ישובים'}></BigCard>
    </section>
  );
};
