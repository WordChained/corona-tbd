import React, { useEffect, useState } from 'react';
import { BigCard } from '../../UI/BigCard';
import styles from './MainStats.module.css';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

import { useWindowSize } from '../../customHooks/useWindowSize';
import { Sorter } from '../../UI/Sorter';
import { CustomTooltip } from '../../UI/CustomTooltip';
import { CustomLabel } from '../../UI/CustomLabel';
export const MainStats = ({ totalDaysData }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState('קשה, בינוני, קל, חודש אחרון');

  const windowSize = useWindowSize();
  const [chartSize, setChartSize] = useState(0);
  const filterData = () => {};
  const onFilterClick = () => {
    setIsOpen(!isOpen);
  };
  const onFilterCancel = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if (!data.length) morbidDataToArray();
    if (windowSize.width > 980) setChartSize(590);
    else if (windowSize.width < 750) setChartSize(windowSize.width - 40);
    else setChartSize(340);
  }, [windowSize.width]);

  const morbidDataToArray = () => {
    const totalDays = [];
    for (const year in totalDaysData) {
      const years = totalDaysData[year];
      for (const month in years) {
        const months = totalDaysData[year][month];
        for (const day in months) {
          totalDays.push({
            date: months[day].date,
            // date: new Date(months[day].date).toLocaleDateString('he-IL', {
            //   day: '2-digit',
            //   month: '2-digit',
            //   // year: '2-digit',
            // }),
            light: months[day].morbid.light,
            medium: months[day].morbid.medium,
            serious: months[day].morbid.serious.total,
          });
        }
      }
    }
    setData(totalDays);
    setFilteredData(totalDays);
  };
  return (
    <section className={styles.container}>
      <BigCard title={'מספר מאושפזים - יומי'}>
        <div>
          <div style={{ marginTop: '20px' }}>
            <Sorter
              isOpen={isOpen}
              openFunction={onFilterClick}
              placeholder={placeholder}
            >
              <div className={styles.sorterChildrenContainer}>
                <div className={styles.innerList}>
                  <h3>מצב מאושפזים</h3>
                  <div className={styles.checkboxes}>
                    <label>
                      <input type='checkbox' />
                      קשה
                    </label>
                    <label>
                      <input type='checkbox' />
                      בינוני
                    </label>
                    <label>
                      <input type='checkbox' />
                      קל
                    </label>
                  </div>
                  <h3>זמן</h3>
                  <div className={styles.radioBtns}>
                    <label></label>
                    <input type='radio' name='' id='' />
                    עד עכשיו
                    <label>
                      <input type='radio' name='' id='' />
                      שנה
                    </label>
                    <label>
                      <input type='radio' name='' id='' />6 חודשים
                    </label>
                    <label>
                      <input type='radio' name='' id='' />3 חודשים
                    </label>
                    <label>
                      <input type='radio' name='' id='' />
                      חודש אחרון
                    </label>
                  </div>
                </div>
                <div className={styles.btnContainer}>
                  <button onClick={filterData}>אישור</button>
                  <button onClick={onFilterCancel}>ביטול</button>
                </div>
              </div>
            </Sorter>
          </div>
          <div className={styles.legend}>
            <div>
              <span
                style={{ backgroundColor: '#3bc3fb' }}
                className={styles.circle}
              ></span>
              <span>קשה</span>
            </div>
            <div>
              <span
                style={{ backgroundColor: '#c1d750' }}
                className={styles.circle}
              ></span>
              <span>בינוני</span>
            </div>
            <div>
              <span
                style={{ backgroundColor: '#167070' }}
                className={styles.circle}
              ></span>
              <span>קל</span>
            </div>
          </div>
          <span className={styles.yHeader}>מספר מאושפזים</span>
        </div>
        <div className={styles.chartContainer}>
          <AreaChart
            width={chartSize}
            height={270}
            data={filteredData}
            margin={{
              top: 43,
              right: 10,
              left: 20,
              bottom: 30,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              fontSize={'0.75rem'}
              // axisLine={false}
              // tickLine={false}
              tickMargin={5}
              tickSize={12}
              tickLine={{ strokeWidth: 0.2 }}
              axisLine={{ stroke: '#cccccc' }}
              tickFormatter={(value) => [
                new Date(value).toLocaleDateString('he-IL', {
                  day: '2-digit',
                  month: '2-digit',
                }),
              ]}
              label={{ value: `תאריך`, position: 'bottom', fontSize: '0.9rem' }}
              // label={<CustomLabel key='תאריך' />}
            />
            <YAxis
              fontSize={'0.75rem'}
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tick={{ stroke: 'black', strokeWidth: 0.1 }}
              // label={{
              //   value: `מספר מאושפזים`,
              //   position: 'top',
              // }}
              // label={<CustomLabel key='מספר מאושפזים' />}
            />
            {!!filteredData.length && <Tooltip content={<CustomTooltip />} />}
            <Area
              type='monotone'
              dataKey='light'
              stackId='1'
              stroke='#3bc3fb'
              fill='#3bc3fb'
              legendType='dot'
              dot={{
                fill: '#3bc3fb',
                strokeWidth: 0.8,
                stroke: 'white',
                r: 3.5,
              }}
            />
            <Area
              type='monotone'
              dataKey='medium'
              stackId='1'
              stroke='#c1d750'
              fill='#c1d750'
              legendType='dot'
              dot={{
                fill: '#c1d750',
                strokeWidth: 0.5,
                stroke: 'white',
                r: 3,
              }}
            />
            <Area
              type='monotone'
              dataKey='serious'
              stackId='1'
              stroke='#167070'
              fill='#167070'
              legendType='dot'
              dot={{
                fill: '#167070',
                strokeWidth: 0.5,
                stroke: 'white',
                r: 3,
              }}
            />
          </AreaChart>
        </div>
      </BigCard>
      <BigCard title={'מאומתים חדשים - יומי'}>
        <div></div>
      </BigCard>
    </section>
  );
};
