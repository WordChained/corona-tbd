import React from 'react';
import styles from './Deceased.module.css';
import { BigCard } from '../../UI/BigCard';
import { deceasedChartInfo } from '../../views/infoBoxData';
import { DeceasedChart } from '../charts/DeceasedChart';

export const Deceased = () => {
  return (
    <section className={styles.container}>
      <BigCard title={'נפטרים - יומי'} info={deceasedChartInfo}>
        <DeceasedChart />
      </BigCard>
    </section>
  );
};
