import React, { useContext, useEffect, useState } from 'react';
import styles from './HospitalizedChart.module.css';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { Sorter } from '../../UI/Sorter';
import { CustomTooltip } from '../../UI/CustomTooltip';
import { CustomLabel } from '../../UI/CustomLabel';
import { ThemeContext } from '../../store/context/ThemeContext';
export const HospitalizedChart = ({ data, chartSize }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

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
    <div className={`${styles.container}${darkMode ? styles.dark : ''}`}>
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
              <div
                className={`${styles.btnContainer} ${
                  darkMode ? styles.dark : ''
                }`}
              >
                <button onClick={onFilterConfirm}>אישור</button>
                <button onClick={onFilterCancel}>ביטול</button>
              </div>
            </div>
          </Sorter>
        </div>
        <div className={styles.legend}>
          <div>
            <span
              style={{ backgroundColor: darkMode ? '#2cd2db' : '#3bc3fb' }}
              className={styles.circle}
            ></span>
            <span>קשה</span>
          </div>
          <div>
            <span
              style={{ backgroundColor: darkMode ? '#fd8264' : '#c1d750' }}
              className={styles.circle}
            ></span>
            <span>בינוני</span>
          </div>
          <div>
            <span
              style={{ backgroundColor: darkMode ? '#9be985' : '#167070' }}
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
          height={300}
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
            padding={{ right: 10, left: 10 }}
            dataKey='date'
            fontSize={'0.75rem'}
            // color={darkMode ? "white" : "black"}
            // axisLine={false}
            // tickLine={false}
            tickMargin={5}
            tickSize={12}
            tickLine={{
              strokeWidth: 0.3,
              stroke: darkMode ? 'white' : 'black',
            }}
            axisLine={{ stroke: darkMode ? '#fff' : '#cccccc' }}
            tickFormatter={(value) => [
              new Date(value).toLocaleDateString('he-IL', {
                day: '2-digit',
                month: '2-digit',
              }),
            ]}
            label={{
              value: `תאריך`,
              position: 'bottom',
              fontSize: '0.9rem',
              fill: darkMode ? 'white' : 'black',
            }}
            tick={{
              fill: darkMode ? 'white' : 'black',
              strokeWidth: 0.2,
              stroke: darkMode ? 'white' : 'black',
            }}
            // label={<CustomLabel key='תאריך' />}
          />
          <YAxis
            fontSize={'0.75rem'}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={{
              fill: darkMode ? 'white' : 'black',
              strokeWidth: 0.2,
              stroke: darkMode ? 'white' : 'black',
            }}
            // label={{
            //   value: `מספר מאושפזים`,
            //   position: 'top',
            // }}
            // label={<CustomLabel key='מספר מאושפזים' />}
          />
          {!!filteredData.length && (
            <Tooltip
              info={['קשה', 'בינוני', 'קל']}
              colors={
                darkMode
                  ? ['#30abb6', '#c27363', '#7dbb7a']
                  : ['#3bc3fb', '#c1d750', '#167070']
              }
              content={<CustomTooltip />}
            />
          )}
          <Area
            type='linear'
            dataKey='serious'
            stackId='1'
            stroke={darkMode ? '#30abb6' : '#50cbfd'}
            strokeWidth={2}
            fillOpacity={0.85}
            fill={darkMode ? '#30abb6' : '#71d1f9'}
            legendType='dot'
            dot={{
              fill: darkMode ? '#2cd2db' : '#50cbfd',
              strokeWidth: darkMode ? 0.8 : 1.5,
              stroke: darkMode ? 'black' : 'white',
              r: 4,
              strokeOpacity: 1,
              fillOpacity: 1,
            }}
          />
          <Area
            type='linear'
            dataKey='medium'
            stackId='1'
            stroke={darkMode ? '#fd8264' : '#b6ca51'}
            fill={darkMode ? '#c27363' : '#c1d750'}
            strokeWidth={2}
            fillOpacity={0.85}
            legendType='dot'
            strokeOpacity={1}
            dot={{
              fill: darkMode ? '#fd8264' : '#b6ca51',
              strokeWidth: darkMode ? 0.8 : 1.5,
              stroke: darkMode ? 'black' : 'white',
              r: 4,
              strokeOpacity: 1,
              fillOpacity: 1,
            }}
          />
          <Area
            type='linear'
            dataKey='light'
            stackId='1'
            stroke={darkMode ? '#9be985' : '#167070'}
            strokeWidth={2}
            fillOpacity={0.85}
            strokeOpacity={1}
            fill={darkMode ? '#7dbb7a' : '#478787'}
            legendType='dot'
            dot={{
              fill: darkMode ? '#9be985' : '#167070',
              strokeWidth: darkMode ? 0.8 : 1.5,
              stroke: darkMode ? 'black' : 'white',
              r: 4,
              strokeOpacity: 1,
              fillOpacity: 1,
            }}
          />
        </AreaChart>
      </div>
    </div>
  );
};
