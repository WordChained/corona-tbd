import React, { useEffect, useState } from "react";
import styles from "./Deceased.module.css";
import { BigCard } from "../../UI/BigCard";
import { deceasedChartInfo } from "../../views/infoBoxData";
import { DeceasedChart } from "../charts/DeceasedChart";
import { useWindowSize } from "../../customHooks/useWindowSize";

export const Deceased = ({ totalDaysData }) => {
  const [data, setData] = useState([]);

  const windowSize = useWindowSize();

  const [chartSize, setChartSize] = useState(0);

  useEffect(() => {
    if (!data.length) deceasedDataToArray();
    if (windowSize.width > 750) setChartSize(590);
    else if (windowSize.width < 750) setChartSize(windowSize.width - 40);
    // else setChartSize(590);
  }, [windowSize.width]);

  const deceasedDataToArray = () => {
    const totalDays = [];
    let confirmedCasesAccumulator = 0;
    let avg = 0;
    for (const year in totalDaysData) {
      const years = totalDaysData[year];
      for (const month in years) {
        const months = totalDaysData[year][month];
        for (const day in months) {
          confirmedCasesAccumulator += months[day].confirmed.total;

          totalDays.push({
            date: months[day].date,
            deceased: months[day].deceased.total,
            deceasedAvg: avg,
          });
        }
      }
    }
    setData(totalDays);
  };
  return (
    <section className={styles.container}>
      <BigCard title={"נפטרים - יומי"} info={deceasedChartInfo}>
        {!!data.length && <DeceasedChart data={data} chartSize={chartSize} />}
      </BigCard>
    </section>
  );
};
