import React, { useEffect, useState } from 'react';
import { BigCard } from '../../UI/BigCard';
import styles from './VaxOnMorbidity.module.css';
import { useWindowSize } from '../../customHooks/useWindowSize';
import { ActiveMorbidChart } from '../charts/ActiveMorbidChart';
import { MOCK_DATA } from '../../mock-data';
import { activeMorbidInfo } from '../../views/infoBoxData';

export const VaxOnMorbidity = () => {
  const [data, setData] = useState([]);
  const [seriouslyIllData, setSeriouslyIllData] = useState([]);
  const windowSize = useWindowSize();
  const [chartSize, setChartSize] = useState(0);

  useEffect(() => {
    if (!data.length) setData(MOCK_DATA.getPersonMockData(50000));
    if (!seriouslyIllData.length)
      setSeriouslyIllData(MOCK_DATA.getPersonMockData(50000));
    if (windowSize.width > 980) setChartSize(590);
    else if (windowSize.width < 750) setChartSize(windowSize.width - 40);
    else setChartSize(340);
  }, [windowSize.width]);

  return (
    <section className={styles.container}>
      {/* <BigCard title={'מאומתים יומי - התחסנות'}></BigCard>
      <BigCard title={'חולים קשה - התחסנות'}></BigCard> */}
      <BigCard title={'חולים פעילים - גיל והתחסנות'} info={activeMorbidInfo}>
        {!!data.length && (
          <ActiveMorbidChart
            data={data}
            chartSize={chartSize}
            seriouslyIllData={seriouslyIllData}
          />
        )}
      </BigCard>
    </section>
  );
};
