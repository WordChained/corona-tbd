import React, { useState, useRef, useEffect, useContext } from "react";
import { BigCard } from "../../UI/BigCard";
import styles from "./PopulationVaccination.module.css";
import { Sorter } from "../../UI/Sorter";
import { CoronaTable } from "../../UI/CoronaTable";
import { IoIosCloseCircle } from "react-icons/io";
import { MOCK_DATA } from "../../mock-data";
import { PercentBar } from "../../UI/PercentBar";
import { vaxByLocationInfo } from "../../views/infoBoxData";
import { ThemeContext } from "../../store/context/ThemeContext";
export const PopulationVaccination = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const [isOpen, setIsOpen] = useState(false);
  const [isText, setIsText] = useState(false);
  const [data, setData] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef();
  const onSortClick = () => {
    setIsOpen(!isOpen);
  };
  const onSortCancel = () => {
    setIsOpen(false);
  };

  const onInput = (ev) => {
    if (ev.target.value.length > 0) {
      setIsText(true);
    } else setIsText(false);
    filterSuggestions(ev.target.value);
  };

  const onXClick = () => {
    inputRef.current.value = "";
    setIsText(false);
    filterSuggestions([]);
  };

  const getColorForDailyScore = (score) => {
    switch (true) {
      case score <= 4.5:
        return "#b8de92";
      //green
      case score <= 6:
        return "#fcfc70";
      //yellow
      case score <= 7.5:
        return "#f2c580";
      //orange
      case score === "אין מידע":
        return "transparent";
      default:
        return "#fa9e8f";
      //red
    }
  };
  const getLocations = async () => {
    try {
      const locationsData = await MOCK_DATA.getLocationsData(100);
      // console.log('locations:', locationsData);
      setData(locationsData);
    } catch (er) {
      console.log(er);
    }
  };
  const sortLocations = (titleIdx, direction) => {
    // console.log("sorting...", titleIdx);
    switch (+titleIdx) {
      //ישוב
      case 0:
        switch (true) {
          case direction < 0:
            //-1
            setData(
              [...data].sort((a, b) => {
                return b._id - a._id;
              })
            );
            break;
          default:
            //direction === 0
            setData(
              [...data].sort((a, b) => {
                return a._id - b._id;
              })
            );
            break;
        }
        break;
      case 1:
        //מתחסנים מנה ראשונה
        switch (true) {
          case direction < 0:
            setData(
              [...data].sort((a, b) => {
                return b.vaxShot1 - a.vaxShot1;
              })
            );
            break;
          default:
            //direction === 0
            setData(
              [...data].sort((a, b) => {
                return a.vaxShot1 - b.vaxShot1;
              })
            );
            break;
        }
        break;
      case 2:
        //מתחסנים מנה שנייה
        switch (true) {
          case direction < 0:
            setData(
              [...data].sort((a, b) => {
                return b.vaxShot2 - a.vaxShot2;
              })
            );
            break;
          default:
            //direction === 0
            setData(
              [...data].sort((a, b) => {
                return a.vaxShot2 - b.vaxShot2;
              })
            );
            break;
        }
        break;
      case 3:
        //מתחסנים מנה שלישית
        switch (true) {
          case direction < 0:
            setData(
              [...data].sort((a, b) => {
                return b.vaxShot3 - a.vaxShot3;
              })
            );
            break;
          default:
            //direction === 0
            setData(
              [...data].sort((a, b) => {
                return a.vaxShot3 - b.vaxShot3;
              })
            );
            break;
        }
        break;
      case 4:
        //חולים פעילים לכל 10,000 נפש
        switch (true) {
          case direction < 0:
            setData(
              [...data].sort((a, b) => {
                return b.activeMorbidPer10K - a.activeMorbidPer10K;
              })
            );
            break;
          default:
            //direction === 0
            setData(
              [...data].sort((a, b) => {
                return a.activeMorbidPer10K - b.activeMorbidPer10K;
              })
            );
            break;
        }
        break;
      case 5:
        //ציון יומי מחושב
        switch (true) {
          case direction < 0:
            setData(
              [...data].sort((a, b) => {
                return b.dailyScore - a.dailyScore;
              })
            );
            break;
          default:
            //direction === 0
            setData(
              [...data].sort((a, b) => {
                return a.dailyScore - b.dailyScore;
              })
            );
            break;
        }
        break;

      default:
        setData(
          [...data].sort((a, b) => {
            return a._id - b._id;
          })
        );
        break;
    }
  };
  const filterSuggestions = (term) => {
    if (!term.length) {
      setSuggestions([]);
      return;
    }
    // setSuggestions();
    //returning only 5 options
    let filteredLocations = data.filter((d) => {
      return d.location.includes(term);
    });
    filteredLocations = filteredLocations.filter((d, idx) => idx < 5);
    setSuggestions(filteredLocations.map((loc) => loc.location) || []);
  };

  const filterData = () => {
    if (!inputRef.current.value.length) getLocations();
    setData(
      [...data].filter((d) => d.location.includes(inputRef.current.value))
    );
  };
  const pickSuggestions = (ev) => {
    inputRef.current.value = ev.target.innerText;
    setSuggestions([]);
  };
  useEffect(() => {
    if (!data.length) getLocations();
  }, [data]);

  return (
    <section className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
      <BigCard
        title={"התחסנות לפי ישובים"}
        isFullWidth={true}
        info={vaxByLocationInfo}
      >
        <Sorter
          placeholder={"כלל הישובים"}
          isOpen={isOpen}
          openFunction={onSortClick}
        >
          <div className={styles.sorterChildrenContainer}>
            <div>
              <input
                ref={inputRef}
                type="text"
                placeholder="חפש ישוב"
                onInput={onInput}
              />
              <span
                className={`${styles.closeIcon} ${isText ? styles.show : ""}`}
                onClick={onXClick}
              >
                <IoIosCloseCircle />
              </span>
            </div>
            <div
              className={`${styles.btnContainer} ${
                darkMode ? styles.dark : ""
              }`}
            >
              {!suggestions.length ? (
                <>
                  <button onClick={filterData}>אישור</button>
                  <button onClick={onSortCancel}>ביטול</button>
                </>
              ) : (
                <div className={styles.suggestions}>
                  {suggestions.map((loc, idx) => (
                    <span onClick={pickSuggestions} key={idx}>
                      {loc}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Sorter>
        <CoronaTable
          titles={[
            "ישוב",
            "% מתחסנים מנה ראשונה ",
            "% מתחסנים מנה שנייה ",
            "% מתחסנים מנה שלישית ",
            "חולים פעילים לכל 10,000 נפש",
            "ציון יומי מחושב",
          ]}
          sortFunction={sortLocations}
        >
          <div className={styles.allRows}>
            {data.map((row, idx) => (
              <div key={idx} className={styles.row}>
                {/* {console.log('row:', row)} */}
                <div className={styles.location}>{row.location}</div>
                <div className={styles.percentContainer}>
                  {row.vaxShot1 && row.vaxShot1 < 90 && (
                    <PercentBar
                      width={row.vaxShot1}
                      backColor={"#bed8e9"}
                      frontColor={"#1c7d7e"}
                    />
                  )}
                  <span>
                    {!row.vaxShot1
                      ? "אין מידע"
                      : row.vaxShot1 < 90
                      ? row.vaxShot1 + "%"
                      : "מעל 90%"}
                  </span>
                </div>
                <div className={styles.percentContainer}>
                  {row.vaxShot2 && row.vaxShot2 < 90 && (
                    <PercentBar
                      width={row.vaxShot2}
                      backColor={"#d5dbba"}
                      frontColor={"#b6ca51"}
                    />
                  )}
                  <span>
                    {!row.vaxShot2
                      ? "אין מידע"
                      : row.vaxShot2 < 90
                      ? row.vaxShot2 + "%"
                      : "מעל 90%"}
                  </span>
                </div>
                <div className={styles.percentContainer}>
                  {row.vaxShot3 && row.vaxShot3 < 90 && (
                    <PercentBar
                      width={row.vaxShot3}
                      backColor={"#cbdce7"}
                      frontColor={"#50cbfd"}
                    />
                  )}
                  <span>
                    {!row.vaxShot3
                      ? "אין מידע"
                      : row.vaxShot3 < 90
                      ? row.vaxShot3 + "%"
                      : "מעל 90%"}
                  </span>
                </div>
                <div>
                  {row.activeMorbidPer10K ? row.activeMorbidPer10K : "אין מידע"}
                </div>
                <div>
                  <div
                    style={{
                      color: darkMode ? "black" : "white",
                      fontWeight: 900,
                      backgroundColor: getColorForDailyScore(
                        row.dailyScore ? row.dailyScore : "אין מידע"
                      ),
                    }}
                  >
                    {row.dailyScore ? row.dailyScore : "אין מידע"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CoronaTable>
      </BigCard>
    </section>
  );
};
