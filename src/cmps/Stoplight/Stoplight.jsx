import React, { useState, useRef, useEffect } from "react";
import styles from "./Stoplight.module.css";
import { BigCard } from "../../UI/BigCard";
import { stoplightInfo } from "../../views/infoBoxData";
import { IoIosInformationCircle } from "react-icons/io";
import { FiSearch, FiArrowDown } from "react-icons/fi";
import { GrShareOption } from "react-icons/gr";
import { CoronaTable } from "../../UI/CoronaTable";
import { MOCK_DATA } from "../../mock-data";
import { formatNumber } from "../../services/utilService";
export const Stoplight = () => {
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
  const [isOpen, setIsOpen] = useState(false);
  const [isText, setIsText] = useState(false);
  const [data, setData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef();
  const onInput = (ev) => {
    if (ev.target.value.length > 0) {
      setIsText(true);
    } else setIsText(false);
    filterSuggestions(ev.target.value);
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
  useEffect(() => {
    if (!data.length) getLocations();
  }, [data]);
  return (
    <section className={styles.container}>
      <BigCard
        title={"תכנית הרמזור"}
        showMoreIcon={false}
        info={stoplightInfo}
        isFullWidth={true}
      >
        <span className={styles.ast}>
          *מרכיבי ציון הרמזור (לפי נתוני השבוע האחרון)
        </span>
        <div className={styles.upperPart}>
          <div className={styles.leftBox}>
            <div className={styles.warning}>
              <span className={styles.infoIcon}>
                <IoIosInformationCircle />
              </span>
              <span>
                הנתונים נכונים לתאריך <span>16/05/2022</span>
              </span>
            </div>
            <div className={styles.inputAndBtns}>
              <div className={styles.inputContainer}>
                <span>
                  <FiSearch />
                </span>
                <input ref={inputRef} type="text" placeholder={"חיפוש ישוב"} />
              </div>
              <div className={styles.btns}>
                <span>
                  <GrShareOption />
                </span>
                <span>
                  <FiArrowDown />
                </span>
              </div>
            </div>
          </div>
          <div className={styles.colorBoxes}>
            <div>
              <span className={styles.box1}></span>
              <div className={styles.colorDescription}>
                <span>אדום</span>
                <span>ציון 7.5 ומעלה</span>
              </div>
            </div>
            <div>
              <span className={styles.box2}></span>
              <div className={styles.colorDescription}>
                <span>כתום</span>
                <span>ציון בין 6 ל - 7.5</span>
              </div>
            </div>
            <div>
              <span className={styles.box3}></span>
              <div className={styles.colorDescription}>
                <span>צהוב</span>
                <span>ציון בין 4.5 ל - 6</span>
              </div>
            </div>
            <div>
              <span className={styles.box4}></span>
              <div className={styles.colorDescription}>
                <span>ירוק</span>
                <span>ציון עד 4.5</span>
              </div>
            </div>
          </div>
        </div>
        <CoronaTable
          titles={[
            "ישוב",
            "ציון וצבע יומי",
            "חולים חדשים לכל 10,000 נפש *",
            "% הבדיקות החיוביות *",
            "שיעור שינוי מאומתים *",
            "חולים פעילים",
          ]}
          sortFunction={sortLocations}
        >
          <div className={styles.allRows}>
            {data.map((row, idx) => (
              <div key={idx} className={styles.row}>
                {/* {console.log('row:', row)} */}
                <div className={styles.location}>{row.location}</div>
                <div className={styles.dailyScore}>
                  <div
                    style={{
                      backgroundColor: getColorForDailyScore(
                        row.dailyScore ? row.dailyScore : "אין מידע"
                      ),
                    }}
                  >
                    {row.dailyScore ? row.dailyScore : "אין מידע"}
                  </div>
                </div>
                <div>
                  {row.newCasesPer10K ? row.newCasesPer10K : "אין מידע"}
                </div>
                <div>
                  <span>
                    {!row.rateOfPositiveCases
                      ? "אין מידע"
                      : row.rateOfPositiveCases < 90
                      ? row.rateOfPositiveCases + "%"
                      : "מעל 90%"}
                  </span>
                </div>
                <div>
                  <span>
                    {!row.rateOfConfirmed
                      ? "אין מידע"
                      : formatNumber(row.rateOfConfirmed) + "%"}
                  </span>
                </div>
                <div>
                  <span>
                    {!row.activeMorbid
                      ? "אין מידע"
                      : row.activeMorbid >= 15
                      ? row.activeMorbid
                      : "קטן מ-15"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CoronaTable>
      </BigCard>
    </section>
  );
};
