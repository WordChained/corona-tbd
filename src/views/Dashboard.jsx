import React from 'react';
import styles from './Dashboard.module.css';
import { Overlook } from '../cmps/Overlook/Overlook';
import { MainStats } from '../cmps/MainStats/MainStats';
import { VaxOnMorbidity } from '../cmps/VaxOnMorbidity/VaxOnMorbidity';
import { FurtherInterrogations } from '../cmps/FurtherInterrogations/FurtherInterrogations';
import { Deceased } from '../cmps/Deceased/Deceased';
import { PopulationVaccination } from '../cmps/PopulationVaccination/PopulationVaccination';
import { Stoplight } from '../cmps/Stoplight/Stoplight';
export const Dashboard = () => {
  return (
    <main className={styles.container}>
      <h2 id='overlook-title'>מבט על</h2>
      <Overlook />
      <h2 id='main-stats-title'>מדדים מרכזיים</h2>
      <MainStats />
      <h2 id='vax-on-morbidity'>השפעת ההתחסנות על התחלואה</h2>
      <VaxOnMorbidity />
      <h2 id='deceased'>נפטרים</h2>
      <Deceased />
      <h2 id='further-interrogations'>תחקורים נוספים</h2>
      <FurtherInterrogations />
      <h2 id='population-vaccination'>התחסנות האוכלוסיה</h2>
      <PopulationVaccination />
      <h2 id='Stoplight'>רמזור</h2>
      <Stoplight />
    </main>
  );
};
