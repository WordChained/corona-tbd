import React, { useEffect, useState } from "react";
import { BigCard } from "../../UI/BigCard";
import styles from "./MainStats.module.css";
import { useWindowSize } from "../../customHooks/useWindowSize";

import { numberOfHospitalizedInfo } from "../../views/infoBoxData";
import { HospitalizedChart } from "../charts/HospitalizedChart";
import { ConfirmedChart } from "../charts/ConfirmedChart";

export const MainStats = ({ totalDaysData }) => {
  const [data, setData] = useState([]);
  const windowSize = useWindowSize();
  const [chartSize, setChartSize] = useState(0);

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
            light: months[day].morbid.light,
            medium: months[day].morbid.medium,
            serious: months[day].morbid.serious.total,
            confirmed: months[day].confirmed.total,
          });
        }
      }
    }
    setData(totalDays);
  };

  return (
    <section className={styles.container}>
      <BigCard title={"מספר מאושפזים - יומי"} info={numberOfHospitalizedInfo}>
        {!!data.length && (
          <HospitalizedChart
            totalDaysData={totalDaysData}
            data={data}
            chartSize={chartSize}
          />
        )}
      </BigCard>
      <BigCard title={"מאומתים חדשים - יומי"}>
        {!!data.length && (
          <ConfirmedChart
            totalDaysData={totalDaysData}
            data={data}
            chartSize={chartSize}
          />
        )}
      </BigCard>
    </section>
  );
};
