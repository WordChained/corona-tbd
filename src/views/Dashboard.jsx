import React from "react";
import styles from "./Dashboard.module.css";
import { Overlook } from "../cmps/Overlook";
import { MainStats } from "../cmps/MainStats";
export const Dashboard = () => {
  return (
    <main className={styles.container}>
      <h2 id="overlook-title">מבט על</h2>
      <Overlook />
      <h2 id="main-stats-title">מדדים מרכזיים</h2>
      <MainStats />
    </main>
  );
};
