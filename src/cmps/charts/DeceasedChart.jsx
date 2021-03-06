import styles from './DeceasedChart.module.css';
import React, { useContext, useEffect, useState } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ComposedChart,
  Bar,
  Line,
} from 'recharts';
import { Sorter } from '../../UI/Sorter';
import { CustomTooltip } from '../../UI/CustomTooltip';
import { ThemeContext } from '../../store/context/ThemeContext';
export const DeceasedChart = ({ data, chartSize }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const [timeframe, setTimeframe] = useState('1-month');

  const [filteredData, setFilteredData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState('חודש אחרון');

  const onFilterConfirm = () => {
    let newPlaceholder = '';
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
    let filteredDataByTimeframe;
    let oneDayInMIlliseconds = 86400000;
    filteredDataByTimeframe = data.filter((item) => {
      //if this was a real database id use : new Date().getTime() to get "now"
      //but this is fake so...
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
    //the following function calculates the avg of the past 7 days and adds it to the data
    //first days need a special calculation, since there arent 7 past days
    //so we calculate the days past by the idx, since its sorted by ascending dates
    //and add the total to a local variable (acc)
    //we access the previous days with the for loop and accumulate the total confirmed

    //0 is the first day so we just set the avg to the toatl of the day

    const dataWithAvgConfirmed = filteredDataByTimeframe.map((item, idx) => {
      let acc = 0;
      if (idx < 7) {
        for (let i = 0; i < idx; i++) {
          acc += filteredDataByTimeframe[i].deceased;
        }
        if (idx === 0) item.deceasedAvg = filteredDataByTimeframe[0].deceased;
        else item.deceasedAvg = Math.round(acc / idx);
      } else {
        for (let i = 0; i < 7; i++) {
          acc += filteredDataByTimeframe[idx - i].deceased;
        }
        item.deceasedAvg = Math.round(acc / 7);
      }
      return item;
    });
    setFilteredData(dataWithAvgConfirmed);
  };

  const onFilterWindowToggle = (ev) => {
    console.log(ev.target.parentElement.parentElement);
    setIsOpen(!isOpen);
  };
  const onFilterCancel = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    let oneDayInMIlliseconds = 86400000;
    if (!filteredData.length) onFilterConfirm();
  }, [filteredData, data]);

  const onRadioToggle = (ev) => {
    console.log(ev.target.value);
    setTimeframe(ev.target.value);
  };

  if (!data || !data.length) return <div>loader</div>;
  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ''}`}>
      <div>
        <div style={{ marginTop: '20px' }}>
          <Sorter
            isOpen={isOpen}
            openFunction={onFilterWindowToggle}
            placeholder={placeholder}
          >
            <div className={styles.sorterChildrenContainer}>
              <div className={styles.innerList}>
                <h4>זמן</h4>
                <div className={styles.radioBtns}>
                  <label>
                    <input
                      type='radio'
                      name='time1'
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
                      name='time1'
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
                      name='time1'
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
                      name='time1'
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
                      name='time1'
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
              style={{ backgroundColor: darkMode ? '#9be985' : '#237d7d' }}
              className={styles.circle}
            ></span>
            <span>נפטרים</span>
          </div>
          <div>
            <span
              style={{ backgroundColor: darkMode ? '#fcc537' : '#ff7d67' }}
              className={styles.circle}
            ></span>
            <span>ממוצע נע נפטרים</span>
          </div>
        </div>
        <span className={styles.yHeader}>מספר נפטרים</span>
      </div>
      <div className={styles.chartContainer}>
        <ComposedChart
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
          <XAxis
            dataKey='date'
            fontSize={'0.75rem'}
            tickMargin={5}
            tickSize={14}
            tickLine={{
              strokeWidth: 1,
              stroke: '#cccccc',
            }}
            axisLine={{ stroke: '#cccccc' }}
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
          />
          <Tooltip
            info={['נפטרים', 'ממוצע נע נפטרים']}
            colors={darkMode ? ['#9be985', '#fcc537'] : ['#237d7d', '#ff7d67']}
            content={<CustomTooltip />}
          />
          <CartesianGrid vertical={false} />
          <Bar
            dataKey='deceased'
            barSize={10}
            fill={darkMode ? '#9be985' : '#237d7d'}
          />
          <Line
            type='linear'
            dataKey='deceasedAvg'
            stroke={darkMode ? '#fcc537' : '#ff7d67'}
            strokeWidth={2}
            dot={{
              fill: darkMode ? '#fcc537' : '#ff7d67',
              stroke: 'white',
              r: 4,
              strokeWidth: 1.5,
            }}
          />
        </ComposedChart>
      </div>
    </div>
  );
};
