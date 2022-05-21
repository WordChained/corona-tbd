import React from 'react';
import { BigCard } from '../../UI/BigCard';
import { segmentationToSexAndAgeInfo } from '../../views/infoBoxData';
import styles from './FurtherInterrogations.module.css';

export const FurtherInterrogations = () => {
  return (
    <section className={styles.container}>
      <BigCard
        title={'פילוח מדדים שונים על פי גיל ומין'}
        info={segmentationToSexAndAgeInfo}
      ></BigCard>
    </section>
  );
};
