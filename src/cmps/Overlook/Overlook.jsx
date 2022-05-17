import React, { useEffect, useState } from 'react';
import styles from './Overlook.module.css';
import { Card } from '../../UI/Card';
import { useWindowSize } from '../../customHooks/useWindowSize';
import { formatNumber } from '../../services/utilService';
import {
  confirmedDataInfo,
  seriouslyMorbidInfo,
  vaccinatedInfo,
  deceasedInfo,
  testedPositiveInfo,
  isolatedInfo,
  numOfConfirmedPast7DaysInfo,
  seriouslyIllPast7DaysInfo,
  deceasedPast7DaysInfo,
  testedPast7DaysInfo,
} from '../../views/infoBoxData';
export const Overlook = ({ dailyData, weeklyData }) => {
  const [boldNumberSize, setBoldNumberSize] = useState({ fontSize: '1rem' });
  const windowSize = useWindowSize();
  useEffect(() => {
    if (windowSize.width > 700) setBoldNumberSize({ fontSize: '1.4rem' });
    else setBoldNumberSize({ fontSize: '1rem' });
  }, [windowSize.width]);

  if (dailyData === null || weeklyData === null) return <div>LOADER...</div>;
  return (
    <section className={styles.container}>
      <div className={styles.cardsContainer}>
        <Card title='מאומתים אתמול' info={confirmedDataInfo}>
          <span
            style={boldNumberSize}
            className={`${styles.bold} ${styles.numberDirection}`}
          >
            {formatNumber(dailyData.confirmed.totalToday)}
          </span>
          <span className={styles.breakable}>
            <span className={`${styles.bold} ${styles.numberDirection}`}>
              {formatNumber(dailyData.confirmed.fromMidnight)}
            </span>
            <span>מחצות</span>
            <span className={`${styles.bold} ${styles.numberDirection}`}>
              {formatNumber(dailyData.confirmed.total)}
            </span>
            <span>סה"כ</span>
          </span>
          <div className={styles.activeSick}>
            <span className={styles.bold}>חולים פעילים</span>
            <span
              style={boldNumberSize}
              className={`${styles.bold} ${styles.numberDirection}`}
            >
              {formatNumber(dailyData.morbid.active.total)}
            </span>
          </div>
          <span className={styles.breakable}>
            <span className={`${styles.bold} ${styles.numberDirection}`}>
              {formatNumber(dailyData.morbid.active.fromMidnight)}
            </span>
            <span>מחצות</span>
            <span className={`${styles.bold} ${styles.numberDirection}`}>
              {formatNumber(dailyData.morbid.active.hospitalized)}
            </span>
            <span>בבי"ח</span>
          </span>
        </Card>
        <Card title='חולים קשה' info={seriouslyMorbidInfo}>
          <span
            style={boldNumberSize}
            className={`${styles.bold} ${styles.numberDirection}`}
          >
            {formatNumber(dailyData.morbid.serious.total)}
          </span>
          <ul className={styles.colorStyleList}>
            <li className={styles.red}>
              <span>מתוכם קריטי</span>
              <span className={`${styles.bold} ${styles.numberDirection}`}>
                {formatNumber(dailyData.morbid.serious.critical)}
              </span>
            </li>
            <li className={styles.red}>
              <span>מחוברים לאקמו</span>
              <span className={`${styles.bold} ${styles.numberDirection}`}>
                {formatNumber(dailyData.morbid.serious.connectedToEcmo)}
              </span>
            </li>
            <li className={styles.yellow}>
              <span>מונשמים</span>
              <span className={`${styles.bold} ${styles.numberDirection}`}>
                {formatNumber(dailyData.morbid.serious.respirated)}
              </span>
            </li>
          </ul>
          <ul className={styles.noStyle}>
            <li>
              <span>חולים בינוני</span>
              <span className={`${styles.bold} ${styles.numberDirection}`}>
                {formatNumber(dailyData.morbid.medium)}
              </span>
            </li>
            <li>
              <span>חולים קל</span>
              <span className={`${styles.bold} ${styles.numberDirection}`}>
                {formatNumber(dailyData.morbid.light)}
              </span>
            </li>
          </ul>
        </Card>
        <Card title='מתחסנים' info={vaccinatedInfo}>
          <ul className={styles.doseList}>
            <li>
              <span>מנה 1</span>
              <span className={styles.numberDirection}>
                {formatNumber(dailyData.vaccinated.shot_1)}
              </span>
            </li>
            <li>
              <span>מנה 2</span>
              <span className={styles.numberDirection}>
                {formatNumber(dailyData.vaccinated.shot_2)}
              </span>
            </li>
            <li>
              <span>מנה 3</span>
              <span className={styles.numberDirection}>
                {formatNumber(dailyData.vaccinated.shot_3)}
              </span>
            </li>
            <li>
              <span>מנה 4</span>
              <span className={styles.numberDirection}>
                {formatNumber(dailyData.vaccinated.shot_4)}
              </span>
            </li>
          </ul>
        </Card>
        <Card title='נפטרים מצטבר' info={deceasedInfo}>
          <div style={boldNumberSize} className={styles.bold}>
            {formatNumber(dailyData.deceased.total)}
          </div>
        </Card>
        <Card title='אחוז נבדקים חיוביים אתמול' info={testedPositiveInfo}>
          <span
            style={boldNumberSize}
            className={`${styles.bold} ${styles.numberDirection}`}
          >
            {formatNumber(dailyData.tested.positive_percent)}%
          </span>
          <div className={styles.positive}>
            <div>
              <span className={styles.numberDirection}>
                {formatNumber(dailyData.tested.primaryTestsTotal)}
              </span>
              <span>נבדקים לגילוי הנגיף אתמול</span>
            </div>
            <div>
              <span className={styles.numberDirection}>
                {formatNumber(dailyData.tested.total)}
              </span>
              <span>כלל הבדיקות אתמול</span>
            </div>
          </div>
        </Card>
        <Card title='מבודדים חדשים אתמול' info={isolatedInfo}>
          <div
            style={boldNumberSize}
            className={`${styles.bold} ${styles.numberDirection}`}
          >
            {formatNumber(dailyData.isolated.new)}
          </div>
          <div className={styles.col}>
            <span className={styles.bold}>סה"כ שוהים בבידוד</span>
            <span
              style={boldNumberSize}
              className={`${styles.bold} ${styles.numberDirection}`}
            >
              {formatNumber(dailyData.isolated.currentlyIsolated)}
            </span>
          </div>
        </Card>
      </div>
      <div className={styles.bigCard}>
        <h3>סיכום 7 ימים אחרונים</h3>
        <div className={styles.innerCardsContainer}>
          <Card
            title='מספר המאומתים'
            inSummary={true}
            info={numOfConfirmedPast7DaysInfo}
          >
            <span
              style={boldNumberSize}
              className={`${styles.bold} ${styles.numberDirection}`}
            >
              {formatNumber(weeklyData.confirmed.totalPast7Days)}
            </span>
            <div className={styles.bigCardRow}>
              <span className={`${styles.bold} ${styles.numberDirection}`}>
                {formatNumber(weeklyData.confirmed.relativeToPast7Days_percent)}
                %
              </span>
              <span>משבעה ימים קודמים</span>
            </div>
          </Card>
          <Card
            inSummary={true}
            title='מספר חולים קשה'
            info={seriouslyIllPast7DaysInfo}
          >
            <div
              style={boldNumberSize}
              className={`${styles.bold} ${styles.numberDirection}`}
            >
              {formatNumber(weeklyData.morbid.serious.totalPast7Days)}
            </div>
            <div className={styles.bigCardRow}>
              <span className={`${styles.bold} ${styles.numberDirection}`}>
                {formatNumber(
                  weeklyData.morbid.serious.relativeToPast7Days_percent
                )}
                %
              </span>
              <span>משבעה ימים קודמים</span>
            </div>
          </Card>
          <Card
            inSummary={true}
            title='מספר הנפטרים'
            info={deceasedPast7DaysInfo}
          >
            <div
              className={`${styles.bold} ${styles.numberDirection}`}
              style={boldNumberSize}
            >
              {formatNumber(weeklyData.deceased.totalPast7Days)}
            </div>
            <div className={styles.bigCardRow}>
              <span className={`${styles.bold} ${styles.numberDirection}`}>
                {formatNumber(weeklyData.deceased.relativeToPast7Days_percent)}%
              </span>
              <span>משבעה ימים קודמים</span>
            </div>
          </Card>
          <Card inSummary={true} title='מספר נבדקים' info={testedPast7DaysInfo}>
            <div
              style={boldNumberSize}
              className={`${styles.bold} ${styles.numberDirection}`}
            >
              {formatNumber(weeklyData.tested.totalPast7Days)}
            </div>
            <div className={styles.bigCardRow}>
              <span className={`${styles.bold} ${styles.numberDirection}`}>
                {weeklyData.tested.totalPast7Days > 0 ? '+' : '-'}
                {formatNumber(weeklyData.tested.relativeToPast7Days_percent)}%
              </span>
              <span>משבעה ימים קודמים</span>
            </div>
            <div className={styles.bigCardRow}>
              <span className={`${styles.bold} ${styles.numberDirection}`}>
                {formatNumber(weeklyData.tested.positive_percent)}%
              </span>
              <span>נבדקים חיוביים</span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
