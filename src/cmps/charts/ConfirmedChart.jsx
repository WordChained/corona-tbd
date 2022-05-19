import React, { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ComposedChart,
  Bar,
  Line,
} from "recharts";
import { Sorter } from "../../UI/Sorter";
import { CustomTooltip } from "../../UI/CustomTooltip";
import styles from "./ConfirmedChart.module.css";
export const ConfirmedChart = ({ data, chartSize }) => {
  const [timeframe, setTimeframe] = useState("1-month");
  const [avg, setAvg] = useState(null);
  const [total, setTotal] = useState(null);

  const [filteredData, setFilteredData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState("חודש אחרון");

  const onFilterConfirm = () => {
    let newPlaceholder = "";
    switch (timeframe) {
      case "1-month":
        newPlaceholder += "חודש אחרון";
        break;
      case "3-months":
        newPlaceholder += "3 חודשים";
        break;
      case "6-months":
        newPlaceholder += "6 חודשים";
        break;
      case "year":
        newPlaceholder += "שנה";
        break;
      case "all":
        newPlaceholder += "עד עכשיו";
        break;
      default:
        break;
    }
    setPlaceholder(newPlaceholder);
    setIsOpen(false);
    let filteredDataByTimeframe;
    let oneDayInMIlliseconds = 86400000;
    filteredDataByTimeframe = data.filter((item) => {
      switch (timeframe) {
        case "1-month":
          return item.date > new Date().getTime() - oneDayInMIlliseconds * 30;
        case "3-months":
          return item.date > new Date().getTime() - oneDayInMIlliseconds * 90;
        case "6-months":
          return item.date > new Date().getTime() - oneDayInMIlliseconds * 180;
        case "year":
          return item.date > new Date().getTime() - oneDayInMIlliseconds * 365;
        default:
          return true;
      }
    });
    setFilteredData(filteredDataByTimeframe);
  };
  const onFilterWindowToggle = (ev) => {
    console.log(ev.target.parentElement.parentElement);
    setIsOpen(!isOpen);
  };
  const onFilterCancel = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if (!filteredData.length) onFilterConfirm();
    const totalConfirmed = data.reduce((acc, item) => {
      acc += item.confirmed;
    }, 0);
    const confirmedAvg = totalConfirmed / data.length;
    setTotal(totalConfirmed);
    setAvg(confirmedAvg);
  }, [filteredData, data]);

  const onRadioToggle = (ev) => {
    setTimeframe(ev.target.value);
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
                <h4>זמן</h4>
                <div className={styles.radioBtns}>
                  <label>
                    <input
                      type="radio"
                      name="time"
                      id=""
                      checked={timeframe === "all"}
                      onChange={onRadioToggle}
                      value="all"
                    />
                    <span>עד עכשיו</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="time"
                      id=""
                      checked={timeframe === "year"}
                      onChange={onRadioToggle}
                      value="year"
                    />
                    <span>שנה</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="time"
                      id=""
                      checked={timeframe === "6-months"}
                      onChange={onRadioToggle}
                      value="6-months"
                    />
                    <span>6 חודשים</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="time"
                      id=""
                      checked={timeframe === "3-months"}
                      onChange={onRadioToggle}
                      value="3-months"
                    />
                    <span>3 חודשים</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="time"
                      id=""
                      checked={timeframe === "1-month"}
                      onChange={onRadioToggle}
                      value="1-month"
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
              style={{ backgroundColor: "#50cbfd" }}
              className={styles.circle}
            ></span>
            <span>מאומתים חדשים</span>
          </div>
          <div>
            <span
              style={{ backgroundColor: "#ff7d67" }}
              className={styles.circle}
            ></span>
            <span>ממוצע נע מאומתים</span>
          </div>
        </div>
        <span className={styles.yHeader}>מאומתים חדשים</span>
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
            dataKey="date"
            fontSize={"0.75rem"}
            tickMargin={5}
            tickSize={12}
            tickLine={{ strokeWidth: 0.2 }}
            axisLine={{ stroke: "#cccccc" }}
            tickFormatter={(value) => [
              new Date(value).toLocaleDateString("he-IL", {
                day: "2-digit",
                month: "2-digit",
              }),
            ]}
            label={{ value: `תאריך`, position: "bottom", fontSize: "0.9rem" }}
          />
          <YAxis
            fontSize={"0.75rem"}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={{ stroke: "black", strokeWidth: 0.1 }}
          />
          <Tooltip
            info={["מאומתים", "ממוצע נע מאומתים", "מאומתים מצטבר"]}
            colors={["#50cbfd", "#ff7d67", "transparent"]}
            content={<CustomTooltip />}
          />
          <CartesianGrid vertical={false} />
          <Bar dataKey="confirmed" barSize={20} fill="#50cbfd" />
          <Line
            type="monotone"
            dataKey="confirmed"
            stroke="#ff7d67"
            strokeWidth={2}
            dot={{ fill: "#ff7d67", stroke: "white", r: 4, strokeWidth: 1 }}
          />
        </ComposedChart>
      </div>
    </div>
  );
};
