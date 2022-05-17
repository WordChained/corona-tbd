import axios from "axios";

const getLocationsData = async (limit = 100) => {
  const locations = [];
  try {
    const citiesNames = await axios.get(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=${limit}`
    );
    // console.log(citiesNames.data.result.records);
    citiesNames.data.result.records.forEach((cityName) => {
      if (cityName._id === 1) return;
      locations.push({
        _id: cityName._id,
        location: cityName["שם_ישוב"],
        vaxShot1: _getRandomInt(70, 95),
        vaxShot2: _getRandomInt(60, 91),
        vaxShot3: _getRandomInt(10, 50),
        activeMorbidPer10K: _getRandomDecimal(0, 100, 1),
        dailyScore: _getRandomDecimal(0, 10, 1),
        newCasesPer10K: _getRandomDecimal(0, 100, 1),
        rateOfConfirmed: _getRandomInt(-100, 100),
        activeMorbid: _getRandomInt(0, 2000),
      });
    });
  } catch (error) {
    console.log("getLocationsData error:", error);
  }
  return locations;
};

const getMockData_daily = () => {
  return {
    morbid: {
      serious: {
        critical: 57,
        connectedToEcmo: 6,
        respirated: 50,
        total: 115,
      },
      medium: 31,
      light: 223,
      active: {
        total: 18015,
        fromMidnight: -1378, //relative to yesterday
        hospitalized: 352,
      },
    },
    confirmed: {
      totalToday: 2107,
      fromMidnight: 409,
      total: 4097175,
    },
    active: {
      fromMidnight: -1378, //relative number to what it was in midnight,
      currentlyInHospital: 352,
    },
    vaccinated: {
      shot_1: 6708172,
      shot_2: 6137909,
      shot_3: 4490607,
      shot_4: 806266,
    },
    deceased: {
      total: 10749,
    },
    tested: {
      positive_percent: 5.66,
      primaryTestsTotal: 35571,
      total: 40065,
    },
    isolated: {
      new: 25815,
      currentlyIsolated: 22579,
    },
    hospitalized: {},
  };
};
const getMockData_weekly = () => {
  return {
    morbid: {
      serious: {
        totalPast7Days: 57,
        relativeToPast7Days_percent: 36.6, // percent relative to the avg of the past 7 days
      },
    },
    confirmed: {
      totalPast7Days: 15754,
      relativeToPast7Days_percent: 9.6, // percent relative to the avg of the past 7 days
    },
    deceased: {
      totalPast7Days: 3,
      relativeToPast7Days_percent: -87.5, // percent relative to the avg of the past 7 days
    },
    tested: {
      totalPast7Days: 355380,
      relativeToPast7Days_percent: 18.6, // percent relative to the avg of the past 7 days
      positive_percent: 4.4, // the positive results percent out of all the tests
    },
  };
};

function _getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
function _getRandomDecimal(min, max, decimalPlaces) {
  var rand =
    Math.random() < 0.5
      ? (1 - Math.random()) * (max - min) + min
      : Math.random() * (max - min) + min; // could be min or max or anything in between
  var power = Math.pow(10, decimalPlaces);
  return Math.floor(rand * power) / power;
}
const getMockDataByDays_total = () => {
  //fist covid-19 case was 21/2/2020, so no january in 2020
  //this is probably how the "days" collection will look like

  return {
    2020: {
      feb: {
        0: {
          date: Date.parse("01 feb 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
          confirmed: {
            total: _getRandomInt(1, 100),
          },
          active: {
            unVaccinated: _getRandomInt(1, 100),
            expiredVaccination: _getRandomInt(1, 100),
            vaccinated: _getRandomInt(1, 100),
            total: _getRandomInt(200, 300),
          },
          deceased: { total: _getRandomInt(1, 100) },
        },
        1: {
          date: Date.parse("08 feb 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 feb 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 feb 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
      mar: {
        0: {
          date: Date.parse("01 mar 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 mar 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 mar 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 mar 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
      apr: {
        0: {
          date: Date.parse("01 apr 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 apr 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 apr 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 apr 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
      may: {
        0: {
          date: Date.parse("01 may 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 may 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 may 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 may 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
      jun: {
        0: {
          date: Date.parse("01 jun 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 jun 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 jun 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 jun 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
      jul: {
        0: {
          date: Date.parse("01 jul 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 jul 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 jul 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 jul 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
      aug: {
        0: {
          date: Date.parse("01 aug 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 aug 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 aug 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 aug 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
      sep: {
        0: {
          date: Date.parse("01 sep 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 sep 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 sep 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 sep 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
      oct: {
        0: {
          date: Date.parse("01 oct 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 oct 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 oct 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 oct 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
      nov: {
        0: {
          date: Date.parse("01 nov 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 nov 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 nov 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 nov 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
      dec: {
        0: {
          date: Date.parse("01 dec 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 dec 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 dec 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 dec 2020 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
    },
    2021: {
      jan: {
        0: {
          date: Date.parse("01 jan 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 jan 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 jan 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 jan 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
      feb: {
        0: {
          date: Date.parse("01 feb 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 feb 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 feb 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 feb 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
      mar: {
        0: {
          date: Date.parse("01 mar 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 mar 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 mar 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 mar 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
      apr: {
        0: {
          date: Date.parse("01 apr 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 apr 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 apr 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 apr 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
      may: {
        0: {
          date: Date.parse("01 may 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 may 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 may 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 may 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
      jun: {
        0: {
          date: Date.parse("01 jun 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 jun 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 jun 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 jun 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
      jul: {
        0: {
          date: Date.parse("01 jul 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 jul 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 jul 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 jul 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
      aug: {
        0: {
          date: Date.parse("01 aug 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 aug 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 aug 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 aug 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
      sep: {
        0: {
          date: Date.parse("01 sep 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 sep 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 sep 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 sep 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
      oct: {
        0: {
          date: Date.parse("01 oct 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 oct 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 oct 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 oct 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
      nov: {
        0: {
          date: Date.parse("01 nov 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 nov 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 nov 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 nov 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
      dec: {
        0: {
          date: Date.parse("01 dec 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 dec 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 dec 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 dec 2021 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
    },
    2022: {
      jan: {
        0: {
          date: Date.parse("01 jan 2022 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 jan 2022 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 jan 2022 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 jan 2022 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
      feb: {
        0: {
          date: Date.parse("01 feb 2022 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 feb 2022 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 feb 2022 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 feb 2022 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
      mar: {
        0: {
          date: Date.parse("01 mar 2022 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 mar 2022 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 mar 2022 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 mar 2022 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
      apr: {
        0: {
          date: Date.parse("01 apr 2022 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 apr 2022 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 apr 2022 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 apr 2022 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
      may: {
        0: {
          date: Date.parse("01 may 2022 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 may 2022 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 may 2022 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 may 2022 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
      jun: {
        0: {
          date: Date.parse("01 jun 2022 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        1: {
          date: Date.parse("08 jun 2022 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        2: {
          date: Date.parse("12 jun 2022 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
        3: {
          date: Date.parse("24 jun 2022 07:20:00"),
          morbid: {
            light: _getRandomInt(1, 100),
            medium: _getRandomInt(1, 100),
            serious: {
              total: _getRandomInt(1, 100),
              critial: _getRandomInt(1, 50),
              respirated: _getRandomInt(1, 50),
            },
            total: _getRandomInt(200, 300),
          },
        },
      },
      jul: {},
      aug: {},
      sep: {},
      oct: {},
      nov: {},
      dec: {},
    },
  };
};
const getMockHospitalizedData_total = () => {
  return {};
};
const getMockHospitalizedData_lastMonth = () => {
  return {};
};
const getMockHospitalizedData_last3Months = () => {
  return {};
};
const getMockHospitalizedData_last6Months = () => {
  return {};
};
const getMockHospitalizedData_lastYear = () => {
  return {};
};

//this is the logic of a single person, to be used in the back and in the admin page

// const getMockMorbidPeople = (num) => {
//     const morbidPeople = []
//     for (let i = 0; i < num; i++) {
//         morbidPeople.push(createMockMorbidPerson())
//     }
//     return morbidPeople
// }
// const createMockMorbidPerson = () => {
//     return {

//     }
// }
// const getRandomPerson = async () => {
//     try {
//         const user = await axios.get('https://randomuser.me/api/')
//         return user.data.results[0]
//     } catch (error) {
//         console.log('getRandomPerson Error: ', error)
//     }
// }

export const MOCK_DATA = {
  getMockData_daily,
  getMockData_weekly,
  getMockDataByDays_total,
  getLocationsData,
};
