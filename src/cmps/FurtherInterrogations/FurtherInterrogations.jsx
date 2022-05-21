import React, { useEffect, useState } from 'react';
import { BigCard } from '../../UI/BigCard';
import { segmentationToSexAndAgeInfo } from '../../views/infoBoxData';
import { SegmentationByAgeAndSexChart } from '../charts/SegmentationByAgeAndSexChart';
import styles from './FurtherInterrogations.module.css';
import { deceasedChartInfo } from '../../views/infoBoxData';
import { DeceasedChart } from '../charts/DeceasedChart';
import { useWindowSize } from '../../customHooks/useWindowSize';
import { MOCK_DATA } from '../../mock-data';
export const FurtherInterrogations = () => {
  const [data, setData] = useState(null);

  const windowSize = useWindowSize();
  const [chartSize, setChartSize] = useState(0);

  useEffect(() => {
    if (!data) allTypesOfData();
    if (windowSize.width > 980) setChartSize(590);
    else if (windowSize.width < 750) setChartSize(windowSize.width - 40);
    else setChartSize(340);
  }, [windowSize.width]);

  const allTypesOfData = () => {
    setData({
      confirmed: MOCK_DATA.getPersonMockData(50000),
      deceased: MOCK_DATA.getPersonMockData(50000),
      repirated: MOCK_DATA.getPersonMockData(50000),
      seroiuslyMorbid: MOCK_DATA.getPersonMockData(50000),
    });
  };
  return (
    <section className={styles.container}>
      <BigCard
        title={'פילוח מדדים שונים על פי גיל ומין'}
        info={segmentationToSexAndAgeInfo}
      >
        {data && (
          <SegmentationByAgeAndSexChart data={data} chartSize={chartSize} />
        )}
      </BigCard>
    </section>
  );
};
