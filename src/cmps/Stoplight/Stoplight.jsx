import React from 'react';
import styles from './Stoplight.module.css';
import { BigCard } from '../../UI/BigCard';
export const Stoplight = () => {
  return (
    <section className={styles.container}>
      <BigCard title={'תכנית הרמזור'} showMoreIcon={false}></BigCard>
    </section>
  );
};
