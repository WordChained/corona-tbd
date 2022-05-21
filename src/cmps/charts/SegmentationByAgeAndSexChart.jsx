import React, { useEffect, useState } from 'react';
import styles from './SegmentationByAgeAndSexChart.module.css';
import EChartsReact from 'echarts-for-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
// import Chart, {
//   CommonSeriesSettings,
//   ValueAxis,
//   Label,
//   Series,
//   Tooltip,
//   Legend,
// } from 'devextreme-react/chart';
import { Sorter } from '../../UI/Sorter';
import { CustomTooltip } from '../../UI/CustomTooltip';
import { CustomLabel } from '../../UI/CustomLabel';
export const SegmentationByAgeAndSexChart = ({ data, chartSize }) => {
  const xAxisTickInfo = [
    '0-9',
    '10-19',
    '20-29',
    '30-39',
    '40-49',
    '50-59',
    '60-69',
    '70-79',
    '80-89',
    '+90',
  ];
  const yAxisArray = ['30', '20', '10', '0', '10', '20', '30'];

  const [timeframe, setTimeframe] = useState('1-month');
  const [typeOfCases, setTypeOfCases] = useState('confirmed');
  const [menData, setMenData] = useState([]);
  const [womenData, setWomenData] = useState([]);
  // const [total, setTotal] = useState(null);

  const [filteredData, setFilteredData] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    'חולים פעילים, ל-100 אלף תושבים'
  );

  const onFilterConfirm = () => {
    let newPlaceholder = '';
    let dataToProcess;
    switch (typeOfCases) {
      case 'confirmed':
        newPlaceholder += 'מאומתים, ';
        dataToProcess = data.confirmed;
        break;
      case 'deceased':
        newPlaceholder += 'נפטרים, ';
        dataToProcess = data.deceased;
        break;
      case 'respirated':
        newPlaceholder += 'מונשמים, ';
        dataToProcess = data.respirated;
        break;
      default:
        newPlaceholder += 'מצב קשה, ';
        dataToProcess = data.seriouslyMorbid;
        break;
    }
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

    let ageGroups = [];
    for (let i = 0; i < 10; i++) {
      ageGroups.push({
        men: 0,
        women: 0,
      });
    }
    dataToProcess.forEach((item) => {
      //need to create array of object of people
      // const ageGroups = {vaccinated: 0, notVaccinated: 0, vaxExpired : 0};
      let indexOfGroup = 0;
      switch (true) {
        case item.age > 0 && item.age < 10:
          indexOfGroup = 0;
          ageGroups[0].range = '0-9';
          break;
        case item.age > 9 && item.age < 20:
          indexOfGroup = 1;
          ageGroups[1].range = '10-19';
          break;
        case item.age > 19 && item.age < 30:
          indexOfGroup = 2;
          ageGroups[2].range = '20-29';
          break;
        case item.age > 29 && item.age < 40:
          indexOfGroup = 3;
          ageGroups[3].range = '30-39';
          break;
        case item.age > 39 && item.age < 50:
          indexOfGroup = 4;
          ageGroups[4].range = '40-49';
          break;
        case item.age > 49 && item.age < 60:
          indexOfGroup = 5;
          ageGroups[5].range = '50-59';
          break;
        case item.age > 59 && item.age < 70:
          indexOfGroup = 6;
          ageGroups[6].range = '60-69';
          break;
        case item.age > 69 && item.age < 80:
          indexOfGroup = 7;
          ageGroups[7].range = '70-79';
          break;
        case item.age > 79 && item.age <= 90:
          indexOfGroup = 8;
          ageGroups[8].range = '80-89';
          break;
        case item.age > 90:
          indexOfGroup = 8;
          ageGroups[9].range = '+90';
          break;
      }
      if (item.sex === 'male') ageGroups[indexOfGroup].men++;
      else ageGroups[indexOfGroup].women--;
      const totalCasesInType = dataToProcess.length / 2;
      ageGroups[indexOfGroup].men_percent = +(
        (ageGroups[indexOfGroup].men / totalCasesInType) *
        100
      ).toFixed(2);
      ageGroups[indexOfGroup].women_percent = +(
        (ageGroups[indexOfGroup].women / totalCasesInType) *
        100
      ).toFixed(2);
    });
    console.log(ageGroups);
    setFilteredData(ageGroups);

    setMenData(dataToProcess.map((item) => item.men));
    setWomenData(dataToProcess.map((item) => item.women));
  };

  const onFilterWindowToggle = (ev) => {
    // console.log(ev.target.parentElement.parentElement);
    setIsOpen(!isOpen);
  };
  const onFilterCancel = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if (!filteredData.length) onFilterConfirm();
  }, [filteredData, data]);

  const onRadioToggle = (ev) => {
    // console.log(ev.target.value);
    setTypeOfCases(ev.target.value);
  };
  const onRadioToggle2 = (ev) => {
    console.log(ev.target.value);
    setTimeframe(ev.target.value);
  };

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'value',
      },
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: {
          show: false,
        },
        data: xAxisTickInfo,
      },
    ],
    series: [
      {
        name: 'men',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: menData,
      },
      {
        name: 'women',
        type: 'bar',
        stack: 'Total',
        label: {
          show: true,
          position: 'left',
        },
        emphasis: {
          focus: 'series',
        },
        data: womenData,
      },
    ],
  };
  if (!filteredData.length) return <div>loader</div>;
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
                <h4>הצג לפי</h4>
                <div className={styles.radioBtns}>
                  <label>
                    <input
                      type='type'
                      name='active'
                      id=''
                      checked={typeOfCases === 'confirmed'}
                      onChange={onRadioToggle}
                      value='active'
                    />
                    <span>מאומתים</span>
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='type'
                      id=''
                      checked={typeOfCases === 'deceased'}
                      onChange={onRadioToggle}
                      value='serious'
                    />
                    <span>נפטרים</span>
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='type'
                      id=''
                      checked={typeOfCases === 'respirated'}
                      onChange={onRadioToggle}
                      value='serious'
                    />
                    <span>מונשמים</span>
                  </label>
                  <label>
                    <input
                      type='radio'
                      name='type'
                      id=''
                      checked={typeOfCases === 'serious'}
                      onChange={onRadioToggle}
                      value='serious'
                    />
                    <span>מצב קשה</span>
                  </label>
                </div>
                <h4>זמן</h4>
                <div className={styles.radioBtns}>
                  <label>
                    <input
                      type='radio'
                      name='time1'
                      id=''
                      checked={timeframe === 'all'}
                      onChange={onRadioToggle2}
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
                      onChange={onRadioToggle2}
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
                      onChange={onRadioToggle2}
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
                      onChange={onRadioToggle2}
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
                      onChange={onRadioToggle2}
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
              style={{ backgroundColor: '#50cbfd' }}
              className={styles.circle}
            ></span>
            <span>גברים</span>
          </div>
          <div>
            <span
              style={{ backgroundColor: '#b6ca51' }}
              className={styles.circle}
            ></span>
            <span>נשים</span>
          </div>
        </div>
        <span className={styles.yHeader}>קבוצת גיל</span>
        <span className={styles.xHeader}>% סה"כ</span>
      </div>
      <div
        className={styles.chartContainer}
        style={{ width: chartSize, height: 300 }}
      >
        <EChartsReact option={option} />
        {/* <BarChart
          width={chartSize}
          height={300}
          data={filteredData}
          margin={{
            top: 45,
            right: 10,
            left: 20,
            bottom: 50,
          }}
          barCategoryGap={0}
          barGap={2}
          layout={'vertical'}
          //   reverseStackOrder={true}
        >
          <CartesianGrid />
          <YAxis
            dataKey='range'
            // ticks={[xAxisTickInfo]}

            fontSize={'0.75rem'}
            // tickCount={10}
            tickMargin={10}
            tickSize={12}
            tickLine={{ strokeWidth: 0.2 }}
            axisLine={{ stroke: '#cccccc' }}
            // tickFormatter={(value, idx) => {
            //   return xAxisTickInfo[idx];
            // }}
            type='category'
            reversed={true}
          />
          <XAxis
            tickCount={6}
            tickFormatter={(value, idx) => {
              //this is percentange so we can have fixed ticks
              //no need for more than 30%, hence why 30 is the max
              if (idx > 6) return '';
              return yAxisArray[idx];
            }}
            fontSize={'0.75rem'}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={{ stroke: 'black', strokeWidth: 0.1 }}
            type='catagory'
          />
          <Tooltip
            info={['גברים', 'נשים']}
            colors={['#50cbfd', '#b6ca51']}
            isAgeGroups={true}
            ageGroups={xAxisTickInfo}
            content={<CustomTooltip />}
          />
          <Bar dataKey='women_percent' fill='#b6ca51' />
          <Bar dataKey={'men_percent'} fill='#50cbfd' label={<CustomLabel />} />
        </BarChart> */}
      </div>
    </div>
  );
};
