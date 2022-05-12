import React, { useEffect, useRef, useState } from "react";
import styles from "./Dashboard.module.css";
import { Overlook } from "../cmps/Overlook/Overlook";
import { MainStats } from "../cmps/MainStats/MainStats";
import { VaxOnMorbidity } from "../cmps/VaxOnMorbidity/VaxOnMorbidity";
import { FurtherInterrogations } from "../cmps/FurtherInterrogations/FurtherInterrogations";
import { Deceased } from "../cmps/Deceased/Deceased";
import { PopulationVaccination } from "../cmps/PopulationVaccination/PopulationVaccination";
import { Stoplight } from "../cmps/Stoplight/Stoplight";
import { useIntersection } from "../customHooks/useIntersection";
import { useWindowSize } from "../customHooks/useWindowSize";

export const Dashboard = ({ setElementInView, clickedTitle }) => {
  const windowSize = useWindowSize();
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();
  const ref7 = useRef();
  const ref1InView = useIntersection(ref1, "-70px");
  const ref2InView = useIntersection(ref2, "-70px");
  const ref3InView = useIntersection(ref3, "-70px");
  const ref4InView = useIntersection(ref4, "-70px");
  const ref5InView = useIntersection(ref5, "-70px");
  const ref6InView = useIntersection(ref6, "-70px");
  const ref7InView = useIntersection(ref7, "-70px");

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
  }, [windowSize.width]);

  const jumpToElement = (idx) => {
    switch (+idx) {
      case 1:
        window.scrollTo(0, 0);
        // ref1.current.scrollIntoView({ block: "start" });
        break;
      case 2:
        ref2.current.scrollIntoView({ block: "start" });
        break;
      case 3:
        ref3.current.scrollIntoView({ block: "start" });
        break;
      case 4:
        ref4.current.scrollIntoView({ block: "start" });
        break;
      case 5:
        ref5.current.scrollIntoView({ block: "start" });
        break;
      case 6:
        ref6.current.scrollIntoView({ block: "start" });
        break;
      case 7:
        ref7.current.scrollIntoView({ block: "start" });
        break;

      default:
        break;
    }
  };
  return (
    <main
      className={`${styles.container} ${isHeaderFixed ? styles.pushUp : ""}`}
    >
      <h2>מבט על</h2>
      <div ref={ref1} id="overlook">
        <Overlook />
      </div>
      <h2>מדדים מרכזיים</h2>
      <div ref={ref2} id="main-stats">
        <MainStats />
      </div>
      <h2>השפעת ההתחסנות על התחלואה</h2>
      <div ref={ref3} id="vax-on-morbidity">
        <VaxOnMorbidity />
      </div>
      <h2>נפטרים</h2>
      <div ref={ref4} id="deceased">
        <Deceased />
      </div>
      <h2>תחקורים נוספים</h2>
      <div ref={ref5} id="further-interrogations">
        <FurtherInterrogations />
      </div>
      <h2>התחסנות האוכלוסיה</h2>
      <div ref={ref6} id="population-vaccination">
        <PopulationVaccination />
      </div>
      <h2>רמזור</h2>
      <div ref={ref7} id="Stoplight">
        <Stoplight />
      </div>
    </main>
  );
};
