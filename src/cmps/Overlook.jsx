import React from "react";
import styles from "./Overlook.module.css";
import { Card } from "../UI/Card";
export const Overlook = () => {
  return (
    <section className={styles.container}>
      <div className={styles.cardsContainer}>
        <Card title="מאומתים אתמול">
          <h4>2761</h4>
          <span className={styles.breakable}>
            <span className={styles.bold}>409</span>
            <span>מחצות</span>
            <span className={styles.bold}>4,097,175</span>
            <span>סה"כ</span>
          </span>
        </Card>
        <Card title="חולים קשה">
          <div></div>
        </Card>
        <Card title="מתחסנים">
          <div></div>
        </Card>
        <Card title="נפטרים מצטבר">
          <div></div>
        </Card>
        <Card title="אחוז נבדקים חיוביים אתמול">
          <div></div>
        </Card>
        <Card title="מבודדים חדשים אתמול">
          <div></div>
        </Card>
        <Card title="נפטרים מצטבר">
          <div></div>
        </Card>
      </div>
      <div className={styles.bigCard}>
        <h3>סיכום 7 ימים אחרונים</h3>
        <div className={styles.innerCardsContainer}>
          <Card title="מספר המאומתים"></Card>
          <Card title="מספר חולים קשה"></Card>
          <Card title="מספר הנפטרים"></Card>
          <Card title="מספר נבדקים"></Card>
        </div>
      </div>
    </section>
  );
};
