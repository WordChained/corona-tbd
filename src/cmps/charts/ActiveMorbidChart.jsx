import React, { useEffect, useState } from "react";
import styles from "./ActiveMorbidChart.module.css";
import { XAxis, YAxis, CartesianGrid, Tooltip, Bar, BarChart } from "recharts";
import { Sorter } from "../../UI/Sorter";
import { CustomTooltip } from "../../UI/CustomTooltip";
import { useWindowSize } from "../../customHooks/useWindowSize";

export const ActiveMorbidChart = ({ data, chartSize, seriouslyIllData }) => {
  const xAxisTickInfo = [
    "5-11",
    "12-15",
    "16-19",
    "20-29",
    "30-39",
    "40-49",
    "50-59",
    "60-69",
    "70-79",
    "+80",
  ];
  const [typeOfCases, setTypeOfCases] = useState("active");
  const [typeOfAnalysis, setTypeOfAnalysis] = useState("per100k");
  const [isPer100K, setIsPer100K] = useState(true);
  const windowSize = useWindowSize();
  // const [total, setTotal] = useState(null);

  const [filteredData, setFilteredData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState(
    "חולים פעילים, ל-100 אלף תושבים"
  );

  const onFilterConfirm = () => {
    let newPlaceholder = "";
    switch (typeOfCases) {
      case "active":
        newPlaceholder += "חולים פעילים, ";
        break;
      default:
        newPlaceholder += "חולים קשה, ";
        break;
    }
    switch (typeOfAnalysis) {
      case "per100k":
        newPlaceholder += "ל-100 אלף תושבים";
        break;
      default:
        newPlaceholder += "מספר מוחלט";
        break;
    }
    setPlaceholder(newPlaceholder);
    setIsOpen(false);

    let ageGroups = [];
    for (let i = 0; i < 10; i++) {
      ageGroups.push({
        vaccinated: 0,
        notVaccinated: 0,
        vaxExpired: 0,
      });
    }
    let dataToUse;
    dataToUse = typeOfCases === "active" ? data : seriouslyIllData;
    dataToUse.forEach((item) => {
      //need to create array of object of people
      // const ageGroups = {vaccinated: 0, notVaccinated: 0, vaxExpired : 0};
      let indexOfGroup = 0;
      switch (true) {
        case item.age < 11:
          indexOfGroup = 0;
          break;
        case item.age > 11 && item.age < 16:
          indexOfGroup = 1;
          break;
        case item.age > 15 && item.age < 20:
          indexOfGroup = 2;
          break;
        case item.age > 19 && item.age < 30:
          indexOfGroup = 3;
          break;
        case item.age > 29 && item.age < 40:
          indexOfGroup = 4;
          break;
        case item.age > 39 && item.age < 50:
          indexOfGroup = 5;
          break;
        case item.age > 49 && item.age < 60:
          indexOfGroup = 6;
          break;
        case item.age > 59 && item.age < 70:
          indexOfGroup = 7;
          break;
        case item.age > 69 && item.age <= 80:
          indexOfGroup = 8;
          break;
        case item.age > 80:
          indexOfGroup = 9;
          break;
      }

      if (item.isVaccinated) {
        if (item.isVaxExpired) ageGroups[indexOfGroup].vaxExpired++;
        else ageGroups[indexOfGroup].vaccinated++;
      } else ageGroups[indexOfGroup].notVaccinated++;
    });

    const totalConfirmed = ageGroups.reduce((acc, item) => {
      acc += item.vaccinated + item.vaxExpired + item.notVaccinated;
      return acc;
    }, 0);

    if (isPer100K) {
      ageGroups = ageGroups.map((item) => {
        item.vaccinated =
          item.vaccinated === 0
            ? 0
            : (item.vaccinated * totalConfirmed) / 100000;
        item.notVaccinated =
          item.notVaccinated === 0
            ? 0
            : (item.notVaccinated * totalConfirmed) / 100000;
        item.vaxExpired =
          item.vaxExpired === 0
            ? 0
            : (item.vaxExpired * totalConfirmed) / 100000;
        return item;
      });
    }
    // console.log(ageGroups);
    setFilteredData(ageGroups);
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
    // console.log(ev.target.value);
    setTypeOfAnalysis(ev.target.value);
    if (ev.target.value === "per100k") setIsPer100K(true);
    else if (ev.target.value === "abs") setIsPer100K(false);
  };
  if (!data || !data.length) return <div>loader</div>;
  return (
    <div className={styles.container}>
      <div>
        <div style={{ marginTop: "20px" }}>
          <Sorter
            isOpen={isOpen}
            openFunction={onFilterWindowToggle}
            placeholder={placeholder}
          >
            <div className={styles.sorterChildrenContainer}>
              <div className={styles.innerList}>
                <h4>משתנה</h4>
                <div className={styles.radioBtns}>
                  <label>
                    <input
                      type="radio"
                      name="active"
                      id=""
                      checked={typeOfCases === "active"}
                      onChange={onRadioToggle}
                      value="active"
                    />
                    <span>חולים פעילים</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="active"
                      id=""
                      checked={typeOfCases === "serious"}
                      onChange={onRadioToggle}
                      value="serious"
                    />
                    <span>חולים קשה</span>
                  </label>
                </div>
                <h4>סוג ניתוח</h4>
                <div className={styles.radioBtns}>
                  <label>
                    <input
                      type="radio"
                      name="type"
                      id=""
                      checked={typeOfAnalysis === "abs"}
                      onChange={onRadioToggle2}
                      value="abs"
                    />
                    <span>מספר מוחלט</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="type"
                      id=""
                      checked={typeOfAnalysis === "per100k"}
                      onChange={onRadioToggle2}
                      value="per100k"
                    />
                    <span>ל-100 אלף תושבים</span>
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
              style={{ backgroundColor: "#50cbfd" }}
              className={styles.circle}
            ></span>
            <span>לא מחוסנים</span>
          </div>
          <div>
            <span
              style={{ backgroundColor: "#b6ca51" }}
              className={styles.circle}
            ></span>
            <span>מחוסנים ללא תוקף</span>
          </div>
          <div>
            <span
              style={{ backgroundColor: "#237d7d" }}
              className={styles.circle}
            ></span>
            <span>מחוסנים</span>
          </div>
        </div>
        <span className={styles.yHeader}>מספר חולים פעילים</span>
        <span className={styles.xHeader}>קבוצת גיל</span>
      </div>
      <div className={styles.chartContainer}>
        <BarChart
          width={chartSize}
          height={300}
          data={filteredData}
          margin={{
            top: 45,
            right: 10,
            left: 20,
            bottom: 50,
          }}
          barCategoryGap={12}
          barGap={0}
        >
          <CartesianGrid />
          <XAxis
            // dataKey='name'
            // ticks={[xAxisTickInfo]}
            tickFormatter={(value, idx) => {
              return xAxisTickInfo[idx];
            }}
            angle={-45}
            fontSize={"0.75rem"}
            tickMargin={10}
            tickSize={12}
            tickLine={{ strokeWidth: 0.2 }}
            axisLine={{ stroke: "#cccccc" }}
            tickCount={10}
          />
          <YAxis
            fontSize={"0.75rem"}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={{ stroke: "black", strokeWidth: 0.1 }}
          />
          <Tooltip
            info={["לא מחוסנים", "מחוסנים ללא תוקף", "מחוסנים"]}
            colors={["#50cbfd", "#b6ca51", "#237d7d"]}
            isAgeGroups={true}
            ageGroups={xAxisTickInfo}
            content={<CustomTooltip />}
          />
          <Bar dataKey="notVaccinated" fill="#50cbfd" />
          <Bar dataKey="vaxExpired" fill="#b6ca51" />
          <Bar dataKey="vaccinated" fill="#237d7d" />
        </BarChart>
      </div>
    </div>
  );
};
