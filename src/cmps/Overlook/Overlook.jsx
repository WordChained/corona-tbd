import React, { useEffect, useState } from "react";
import styles from "./Overlook.module.css";
import { Card } from "../../UI/Card";
import { useWindowSize } from "../../customHooks/useWindowSize";
export const Overlook = () => {
  const [boldNumberSize, setBoldNumberSize] = useState({ fontSize: "1rem" });
  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width > 700) setBoldNumberSize({ fontSize: "1.4rem" });
    else setBoldNumberSize({ fontSize: "1rem" });
  }, [windowSize.width]);

  return (
    <section className={styles.container}>
      <div className={styles.cardsContainer}>
        <Card title="מאומתים אתמול">
          <span
            style={boldNumberSize}
            className={`${styles.bold} ${styles.numberDirection}`}
          >
            2,761
          </span>
          <span className={styles.breakable}>
            <span className={`${styles.bold} ${styles.numberDirection}`}>
              409
            </span>
            <span>מחצות</span>
            <span className={`${styles.bold} ${styles.numberDirection}`}>
              4,097,175
            </span>
            <span>סה"כ</span>
          </span>
          <div className={styles.activeSick}>
            <span className={styles.bold}>חולים פעילים</span>
            <span
              style={boldNumberSize}
              className={`${styles.bold} ${styles.numberDirection}`}
            >
              18,015
            </span>
          </div>
          <span className={styles.breakable}>
            <span className={`${styles.bold} ${styles.numberDirection}`}>
              -1,378
            </span>
            <span>מחצות</span>
            <span className={`${styles.bold} ${styles.numberDirection}`}>
              371
            </span>
            <span>בבי"ח</span>
          </span>
        </Card>
        <Card title="חולים קשה">
          <span
            style={boldNumberSize}
            className={`${styles.bold} ${styles.numberDirection}`}
          >
            115
          </span>
          <ul className={styles.colorStyleList}>
            <li className={styles.red}>
              <span>מתוכם קריטי</span>
              <span className={`${styles.bold} ${styles.numberDirection}`}>
                57
              </span>
            </li>
            <li className={styles.red}>
              <span>מחוברים לאקמו</span>
              <span className={`${styles.bold} ${styles.numberDirection}`}>
                6
              </span>
            </li>
            <li className={styles.yellow}>
              <span>מונשמים</span>
              <span className={`${styles.bold} ${styles.numberDirection}`}>
                50
              </span>
            </li>
          </ul>
          <ul className={styles.noStyle}>
            <li>
              <span>חולים בינוני</span>
              <span className={`${styles.bold} ${styles.numberDirection}`}>
                31
              </span>
            </li>
            <li>
              <span>חולים קל</span>
              <span className={`${styles.bold} ${styles.numberDirection}`}>
                223
              </span>
            </li>
          </ul>
        </Card>
        <Card title="מתחסנים">
          <ul className={styles.doseList}>
            <li>
              <span>מנה 1</span>
              <span className={styles.numberDirection}>6,707,902</span>
            </li>
            <li>
              <span>מנה 2</span>
              <span className={styles.numberDirection}>6,137,465</span>
            </li>
            <li>
              <span>מנה 3</span>
              <span className={styles.numberDirection}>4,490,030</span>
            </li>
            <li>
              <span>מנה 4</span>
              <span className={styles.numberDirection}>805,105</span>
            </li>
          </ul>
        </Card>
        <Card title="נפטרים מצטבר">
          <div style={boldNumberSize} className={styles.bold}>
            10,749
          </div>
        </Card>
        <Card title="אחוז נבדקים חיוביים אתמול">
          <span
            style={boldNumberSize}
            className={`${styles.bold} ${styles.numberDirection}`}
          >
            3.38%
          </span>
          <div className={styles.positive}>
            <div>
              <span className={styles.numberDirection}>59,686</span>
              <span>נבדקים לגילוי הנגיף אתמול</span>
            </div>
            <div>
              <span className={styles.numberDirection}>73,842</span>
              <span>כלל הבדיקות אתמול</span>
            </div>
          </div>
        </Card>
        <Card title="מבודדים חדשים אתמול">
          <div
            style={boldNumberSize}
            className={`${styles.bold} ${styles.numberDirection}`}
          >
            22,438
          </div>
          <div className={styles.col}>
            <span className={styles.bold}>סה"כ שוהים בבידוד</span>
            <span
              style={boldNumberSize}
              className={`${styles.bold} ${styles.numberDirection}`}
            >
              8,075
            </span>
          </div>
        </Card>
      </div>
      <div className={styles.bigCard}>
        <h3>סיכום 7 ימים אחרונים</h3>
        <div className={styles.innerCardsContainer}>
          <Card title="מספר המאומתים" inSummary={true}>
            <span
              style={boldNumberSize}
              className={`${styles.bold} ${styles.numberDirection}`}
            >
              14,560
            </span>
            <div className={styles.bigCardRow}>
              <span className={`${styles.bold} ${styles.numberDirection}`}>
                {-11.5}%
              </span>
              <span>משבעה ימים קודמים</span>
            </div>
          </Card>
          <Card inSummary={true} title="מספר חולים קשה">
            <div
              style={boldNumberSize}
              className={`${styles.bold} ${styles.numberDirection}`}
            >
              57
            </div>
            <div className={styles.bigCardRow}>
              <span className={`${styles.bold} ${styles.numberDirection}`}>
                {-44.1}%
              </span>
              <span>משבעה ימים קודמים</span>
            </div>
          </Card>
          <Card inSummary={true} title="מספר הנפטרים">
            <div
              className={`${styles.bold} ${styles.numberDirection}`}
              style={boldNumberSize}
            >
              3
            </div>
            <div className={styles.bigCardRow}>
              <span className={`${styles.bold} ${styles.numberDirection}`}>
                {-87.5}%
              </span>
              <span>משבעה ימים קודמים</span>
            </div>
          </Card>
          <Card inSummary={true} title="מספר נבדקים">
            <div
              style={boldNumberSize}
              className={`${styles.bold} ${styles.numberDirection}`}
            >
              355,380
            </div>
            <div className={styles.bigCardRow}>
              <span className={`${styles.bold} ${styles.numberDirection}`}>
                +{5.1}%
              </span>
              <span>משבעה ימים קודמים</span>
            </div>
            <div className={styles.bigCardRow}>
              <span className={`${styles.bold} ${styles.numberDirection}`}>
                {4.2}%
              </span>
              <span>נבדקים חיוביים</span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
