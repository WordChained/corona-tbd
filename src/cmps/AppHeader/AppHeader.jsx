import { useState, useEffect, useRef } from 'react';
import styles from './AppHeader.module.css';
import logo from '../../assets/imgs/logo_DAshboard-01.png';
import brightnessDark from '../../assets/icons/brightness_dark.png';
import brightnessLight from '../../assets/icons/brightness_light.png';
import { useIntersection } from '../../customHooks/useIntersection';

import { IoMenuOutline } from 'react-icons/io5';
export const AppHeader = () => {
  const navRef = useRef();
  const inViewPort = useIntersection(navRef, '-50px');
  useEffect(() => {
    if (!navRef) return;
  }, [inViewPort]);

  return (
    <section className={styles.overContainer}>
      <header className={styles.mainHeader}>
        <div className={styles.headerRight}>
          <button className={styles.menuHamburgerBtn}>
            <IoMenuOutline />
          </button>
          <div className={styles.imgContainer}>
            <img className={styles.logo} src={logo} alt='' />
          </div>
        </div>
        <button className={styles.brightnessBtn}>
          <img src={brightnessDark} alt='' />
        </button>
        <h1 className={styles.updateTitle}>
          <b>נגיף הקורונה בישראל - תמונת מצב כללית</b>
          <div className={styles.UpdateSubtitle}>
            <span>עדכון אחרון: </span>
            <span>10 במאי 2022 | 07:37</span>
          </div>
        </h1>
      </header>
      <nav ref={navRef} className={styles.navbar}>
        <ul>
          <li className={styles.active}>מבט על</li>
          <li>מדדים מרכזיים</li>
          <li>מדדי תחלואה כללית</li>
          <li>תחלואת ילדים</li>
          <li>תחלואה מחו"ל</li>
          <li>השפע ההתחסנות על התחלואה</li>
          <li>חולים קשה ומאושפזים</li>
          <li>נפטרים</li>
          <li>בדיקות</li>
          <li>תחקורים נוספים</li>
          <li>תחלואה חוזרת ומחלימים</li>
          <li>התחסנות האוכלוסייה</li>
          <li>רמזור בישובים</li>
          <li>עולם הדאטה</li>
        </ul>
      </nav>
      <nav className={`${styles.navbar2} ${!inViewPort ? styles.show : ''}`}>
        <ul>
          <li className={styles.active}>מבט על</li>
          <li>מדדים מרכזיים</li>
          <li>מדדי תחלואה כללית</li>
          <li>תחלואת ילדים</li>
          <li>תחלואה מחו"ל</li>
          <li>השפע ההתחסנות על התחלואה</li>
          <li>חולים קשה ומאושפזים</li>
          <li>נפטרים</li>
          <li>בדיקות</li>
          <li>תחקורים נוספים</li>
          <li>תחלואה חוזרת ומחלימים</li>
          <li>התחסנות האוכלוסייה</li>
          <li>רמזור בישובים</li>
          <li>עולם הדאטה</li>
        </ul>
      </nav>
    </section>
  );
};
