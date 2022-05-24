export const option = {
  textStyle: {
    color: darkMode ? "white" : "black",
  },
  tooltip: {
    dataSet: filteredData,
    trigger: "axis",
    axisPointer: {
      lineStyle: { type: "solid", color: "#a6abb6" },
    },
    className: `${styles.customTooltipContainer} ${
      darkMode ? styles.dark : ""
    }`,
    backgroundColor: darkMode ? "#1c2836" : "white",
    color: darkMode ? "white" : "black",
    formatter: (params) => {
      const currentAgeGroup = filteredData.find((item) => {
        return item.range === params[0].axisValue;
      });

      params[0].seriesName = "גברים";
      params[1].seriesName = "נשים";
      return `
          <div class="${styles.customTooltip}">
            <span class=${styles.bold}>${params[0].axisValue}</span>
            <div class=${styles.row}>
            <div style='background-color: ${
              darkMode ? "#2cd2db" : "#50cbfd"
            }' class=${styles.circle}></div>
            <span> <span class=${styles.bold}>${Math.abs(
        params[0].value
      )}%</span> <span/>  <span>${params[0].seriesName}</span>
        (${currentAgeGroup.men.toLocaleString()})
        </div>
        <div class=${styles.row}>
            <div style="background-color: ${
              darkMode ? "#fd8264" : "#b6ca51"
            }" class=${styles.circle}></div>
             <span> <span class=${styles.bold}>${Math.abs(
        params[1].value
      )}% </span> <span/> <span>${params[1].seriesName}</span>
        (${Math.abs(currentAgeGroup.women).toLocaleString()})
        </div>
          </div>
            `;
      // return `${(<CustomTooltip />)}`;
    },
  },
  grid: {
    left: "6%",
    right: "4%",
    bottom: "18%",
    top: "0%",
    containLabel: true,
    show: true,
    borderWidth: 0,
  },
  xAxis: [
    {
      splitLine: {
        show: true,
        lineStyle: {
          color: darkMode ? "white" : "#e5e5e5",
          width: 0.5,
        },
      },
      type: "value",
      // data: bottomAxisStaticArray,
      // interval: 10,
      min: -30,
      max: 30,
      color: darkMode ? "white" : "grey",
      axisTick: {
        alignWithLabel: true,
        show: true,
        length: 5,
        color: darkMode ? "white" : "black",
      },
      axisLabel: {
        margin: 10,
        formatter: (val) => {
          return Math.abs(val);
        },
      },
    },
  ],
  yAxis: [
    {
      // nameTextStyle: { color: darkMode ? 'white' : 'grey' },
      splitLine: {
        show: true,
        lineStyle: {
          color: darkMode ? "white" : "#e5e5e5",
          width: 0.5,
        },
      },
      type: "category",
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      data: ageGroupStaticStringArray,
    },
  ],
  series: [
    {
      // silent: true,
      name: "Men",
      type: "bar",
      stack: "Total",
      color: darkMode ? "#2cd2db" : "#50cbfd",
      cursor: "pointer",
      label: {
        show: true,
        position: "right",
        color: darkMode ? "white" : "black",
        formatter: (value) => {
          return value.data + "%";
        },
      },
      emphasis: {},
      data: menData,
    },
    {
      // silent: true,
      name: "Women",
      type: "bar",
      color: darkMode ? "#fd8264" : "#b6ca51",
      stack: "Total",
      barWidth: 8,
      label: {
        show: true,
        position: "left",
        color: darkMode ? "white" : "black",
        formatter: (value) => {
          return -value.data + "%";
        },
      },
      emphasis: {},
      data: womenData,
    },
  ],
};
