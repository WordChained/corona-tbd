import React, { useEffect, useRef, useState } from 'react';
import styles from './Dashboard.module.css';
import { Overlook } from '../cmps/Overlook/Overlook';
import { MainStats } from '../cmps/MainStats/MainStats';
import { VaxOnMorbidity } from '../cmps/VaxOnMorbidity/VaxOnMorbidity';
import { FurtherInterrogations } from '../cmps/FurtherInterrogations/FurtherInterrogations';
import { Deceased } from '../cmps/Deceased/Deceased';
import { PopulationVaccination } from '../cmps/PopulationVaccination/PopulationVaccination';
import { Stoplight } from '../cmps/Stoplight/Stoplight';
import { useIntersection } from '../customHooks/useIntersection';
import { useWindowSize } from '../customHooks/useWindowSize';

//
// import { GeneralMorbidity } from "../cmps/GeneralMorbidity/GeneralMorbidity";
// import { ChildrenMorbidity } from "../cmps/ChildrenMorbidity/ChildrenMorbidity";
// import { AbroadMorbidity } from "../cmps/AbroadMorbidity/AbroadMorbidity";
// import { IllAndHospitalized } from "../cmps/IllAndHospitalized/IllAndHospitalized";
//
import { MOCK_DATA } from '../mock-data';

export const Dashboard = ({ setElementInView, clickedTitle }) => {
  const windowSize = useWindowSize();
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [dailyData, setDailyData] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null);
  const [totalDaysData, setTotalDaysData] = useState(null);
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();
  const ref7 = useRef();

  const ref1InView = useIntersection(ref1, '-70px');
  const ref2InView = useIntersection(ref2, '-70px');
  const ref3InView = useIntersection(ref3, '-70px');
  const ref4InView = useIntersection(ref4, '-70px');
  const ref5InView = useIntersection(ref5, '-70px');
  const ref6InView = useIntersection(ref6, '-70px');
  const ref7InView = useIntersection(ref7, '-70px');

  const title1Ref = useRef();
  const title2Ref = useRef();
  const title3Ref = useRef();
  const title4Ref = useRef();
  const title5Ref = useRef();
  const title6Ref = useRef();
  const title7Ref = useRef();

  // const [elementInView, setElementInView] = useState(ref1.current);
  useEffect(() => {
    if (ref1InView) setElementInView(ref1.current);
    else if (ref2InView) setElementInView(ref2.current);
    else if (ref3InView) setElementInView(ref3.current);
    else if (ref4InView) setElementInView(ref4.current);
    else if (ref5InView) setElementInView(ref5.current);
    else if (ref6InView) setElementInView(ref6.current);
    else if (ref7InView) setElementInView(ref7.current);
  }, [
    ref1InView,
    ref2InView,
    ref3InView,
    ref4InView,
    ref5InView,
    ref6InView,
    ref7InView,
  ]);
  useEffect(() => {
    jumpToElement(clickedTitle);
  }, [clickedTitle]);

  useEffect(() => {
    if (windowSize.width > 800) setIsHeaderFixed(true);
    else setIsHeaderFixed(false);
  }, [windowSize.width]);

  useEffect(() => {
    setDailyData(MOCK_DATA.getMockData_daily());
    setWeeklyData(MOCK_DATA.getMockData_weekly());
    const getDataByDays = MOCK_DATA.getMockDataByDays_total();
    setTotalDaysData(getDataByDays);
  }, []);

  const jumpToElement = (idx) => {
    switch (+idx) {
      case 1:
        window.scrollTo(0, 0);
        // ref1.current.scrollIntoView({ block: "start" });
        break;
      case 2:
        title2Ref.current.scrollIntoView(true);
        break;
      case 3:
        title3Ref.current.scrollIntoView(true);
        break;
      case 4:
        title4Ref.current.scrollIntoView(true);
        break;
      case 5:
        title5Ref.current.scrollIntoView(true);
        break;
      case 6:
        title6Ref.current.scrollIntoView(true);
        break;
      case 7:
        title7Ref.current.scrollIntoView(true);
        break;

      default:
        break;
    }
  };
  return (
    <main
      className={`${styles.container} ${isHeaderFixed ? styles.pushUp : ''}`}
    >
      <h2 ref={title1Ref}>מבט על</h2>
      <div ref={ref1} id='overlook'>
        <Overlook weeklyData={weeklyData} dailyData={dailyData} />
      </div>
      <h2 ref={title2Ref}>מדדים מרכזיים</h2>
      <div ref={ref2} id='main-stats'>
        {totalDaysData && <MainStats totalDaysData={totalDaysData} />}
      </div>
      {/* <h2>מדדי תחלואה כללית</h2>
      <div id="general-morbidity">
        <GeneralMorbidity />
      </div> */}
      {/* <h2>תחלואת ילדים</h2>
      <div id="children-morbidity">
        <ChildrenMorbidity />
      </div> */}
      {/* <h2>תחלואה מחו"ל</h2>
      <div id="abroad-morbidity">
        <AbroadMorbidity />
      </div> */}
      <h2 ref={title3Ref}>השפעת ההתחסנות על התחלואה</h2>
      <div ref={ref3} id='vax-on-morbidity'>
        <VaxOnMorbidity />
      </div>
      {/* <h2>חולים קשה ומאושפזים</h2>
      <div id="ill-and-hospitalized">
        <IllAndHospitalized />
      </div> */}
      <h2 ref={title4Ref}>נפטרים</h2>
      <div ref={ref4} id='deceased'>
        <Deceased totalDaysData={totalDaysData} />
      </div>
      <h2 ref={title5Ref}>תחקורים נוספים</h2>
      <div ref={ref5} id='further-interrogations'>
        <FurtherInterrogations totalDaysData={totalDaysData} />
      </div>
      <h2 ref={title6Ref}>התחסנות האוכלוסיה</h2>
      <div ref={ref6} id='population-vaccination'>
        <PopulationVaccination />
      </div>
      <h2 ref={title7Ref}>רמזור</h2>
      <div ref={ref7} id='Stoplight'>
        <Stoplight />
      </div>
    </main>
  );
};
