import React, { useEffect, useState } from 'react';
import styles from './HospitalizedChart.module.css';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

import { Sorter } from '../../UI/Sorter';
import { CustomTooltip } from '../../UI/CustomTooltip';
import { CustomLabel } from '../../UI/CustomLabel';

export const HospitalizedChart = ({ data, chartSize }) => {
  const [isIncludeSerious, setIsIncludeSerious] = useState(true);
  const [isIncludeMedium, setIsIncludeMedium] = useState(true);
  const [isIncludeLight, setIsIncludeLight] = useState(true);
  const [timeframe, setTimeframe] = useState('1-month');

  const [filteredData, setFilteredData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState('קשה, בינוני, קל, חודש אחרון');

  const onFilterConfirm = () => {
    let newPlaceholder = '';
    if (isIncludeSerious) newPlaceholder += 'קשה, ';
    if (isIncludeMedium) newPlaceholder += 'בינוני, ';
    if (isIncludeLight) newPlaceholder += 'קל, ';
    switch (timeframe) {
      case '1-month':
        newPlaceholder += 'חודש אחרון';
        break;
      case '3-months':
        newPlaceholder += '3 חודשים';
        break;
      case '6-months':
        newPlaceholder += '6 חודשים';
        break;
      case 'year':
        newPlaceholder += 'שנה';
        break;
      case 'all':
        newPlaceholder += 'עד עכשיו';
        break;
      default:
        break;
    }
    setPlaceholder(newPlaceholder);
    setIsOpen(false);
    let filteredDataBySeverity;
    let filteredDataByTimeframe;
    let oneDayInMIlliseconds = 86400000;
    filteredDataByTimeframe = data.filter((item) => {
      const mockNowDate = Date.parse('12 may 2022 07:20:00');
      switch (timeframe) {
        case '1-month':
          return item.date > mockNowDate - oneDayInMIlliseconds * 30;
        case '3-months':
          return item.date > mockNowDate - oneDayInMIlliseconds * 90;
        case '6-months':
          return item.date > mockNowDate - oneDayInMIlliseconds * 180;
        case 'year':
          return item.date > mockNowDate - oneDayInMIlliseconds * 365;
        default:
          return true;
      }
    });
    filteredDataBySeverity = filteredDataByTimeframe.reduce((acc, item) => {
      let filteredItem = {};
      filteredItem.date = item.date;
      if (isIncludeLight) filteredItem.light = item.light;
      if (isIncludeMedium) filteredItem.medium = item.medium;
      if (isIncludeSerious) filteredItem.serious = item.serious;
      acc.push(filteredItem);
      return acc;
    }, []);
    setFilteredData(filteredDataBySeverity);
  };
  const onFilterWindowToggle = (ev) => {
    setIsOpen(!isOpen);
  };
  const onFilterCancel = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    onFilterConfirm();
  }, []);

  const onCheckToggle = (ev) => {
    const val = ev.target.value;
    console.log(ev.target.checked);
    if (val === 'קשה') setIsIncludeSerious(!isIncludeSerious);
    else if (val === 'בינוני') setIsIncludeMedium(!isIncludeMedium);
    else if (val === 'קל') setIsIncludeLight(!isIncludeLight);
  };

  const onRadioToggle = (ev) => {
    setTimeframe(ev.target.value);
  };
  if (!data || !data.length) return <div>loader</div>;
  return (
    <div className={styles.container}>
      <div>
        <div style={{ marginTop: '20px' }}>
          <Sorter
            isOpen={isOpen}
            openFunction={onFilterWindowToggle}
            placeholder={placeholder}
          >
            <div className={styles.sorterChildrenContainer}>
              <div className={styles.innerList}>
                <h4>מצב מאושפזים</h4>
                <div className={styles.checkboxes}>
                  <label>
                    <input
                      checked={isIncludeSerious}
                      type='checkbox'
                      value='קשה'
                      onChange={onCheckToggle}
                    />
                    <span>קשה</span>
                  </label>
                  <label>
                    <input
                      checked={isIncludeMedium}
                      type='checkbox'
                      value='בינוני'
                      onChange={onCheckToggle}
                    />
                    <span>בינוני</span>
                  </label>
                  <label>
                    <input
                      checked={isIncludeLight}
                      type='checkbox'
                      value='קל'
                      onChange={onCheckToggle}
                    />
                    <span>קל</span>
                  </label>
                </div>
                <h4>זמן</h4>
                <div className={styles.radioBtns}>
                  <label>
                    <input
                      type='radio'
                      name='time'
                      id=''
                      checked={timeframe === 'all'}
                      onChange={onRadioToggle}
                      value='all'
                    />
                    <span>עד עכשיו</span>
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='time'
                      id=''
                      checked={timeframe === 'year'}
                      onChange={onRadioToggle}
                      value='year'
                    />
                    <span>שנה</span>
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='time'
                      id=''
                      checked={timeframe === '6-months'}
                      onChange={onRadioToggle}
                      value='6-months'
                    />
                    <span>6 חודשים</span>
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='time'
                      id=''
                      checked={timeframe === '3-months'}
                      onChange={onRadioToggle}
                      value='3-months'
                    />
                    <span>3 חודשים</span>
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='time'
                      id=''
                      checked={timeframe === '1-month'}
                      onChange={onRadioToggle}
                      value='1-month'
                    />
                    <span>חודש אחרון</span>
                  </label>
                </div>
              </div>
              <div className={styles.btnContainer}>
                <button onClick={onFilterConfirm}>אישור</button>
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
          {!!filteredData.length && (
            <Tooltip
              info={['קשה', 'בינוני', 'קל']}
              colors={['#3bc3fb', '#c1d750', '#167070']}
              content={<CustomTooltip />}
            />
          )}
          <Area
            type='monotone'
            dataKey='serious'
            stackId='1'
            stroke='#3bc3fb'
            fill='#3bc3fb'
            legendType='dot'
            dot={{
              fill: '#14b3f5',
              strokeWidth: 0.5,
              stroke: 'white',
              r: 4,
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
              fill: '#3fa80f',
              strokeWidth: 0.5,
              stroke: 'white',
              r: 4,
            }}
          />
          <Area
            type='monotone'
            dataKey='light'
            stackId='1'
            stroke='#167070'
            fill='#167070'
            legendType='dot'
            dot={{
              fill: '#167070',
              strokeWidth: 0.8,
              stroke: 'white',
              r: 4,
            }}
          />
        </AreaChart>
      </div>
    </div>
  );
};
