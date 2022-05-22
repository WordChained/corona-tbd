import { useState, useEffect, useRef, useContext } from "react";
import styles from "./AppHeader.module.css";
import logo from "../../assets/imgs/logo_DAshboard-01.png";
import brightnessDark from "../../assets/icons/brightness_dark.png";
import brightnessLight from "../../assets/icons/brightness_light.png";
import { useIntersection } from "../../customHooks/useIntersection";
import { useWindowSize } from "../../customHooks/useWindowSize";
import { IoMenuOutline } from "react-icons/io5";

import { ThemeContext } from "../../store/context/ThemeContext";
export const AppHeader = ({ elementInView, setClickedTitle }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const onThemeChange = () => {
    if (darkMode) {
      theme.dispatch({ type: "LIGHTMODE" });
    } else {
      theme.dispatch({ type: "DARKMODE" });
    }
  };

  const [stickHeader, setStickHeader] = useState(false);
  const [showNavbar2, setShowNavbar2] = useState(false);
  const windowSize = useWindowSize();
  const navRef = useRef();
  const navRef2 = useRef();

  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();
  const ref7 = useRef();

  const ref1nav2 = useRef();
  const ref2nav2 = useRef();
  const ref3nav2 = useRef();
  const ref4nav2 = useRef();
  const ref5nav2 = useRef();
  const ref6nav2 = useRef();
  const ref7nav2 = useRef();

  const inViewPort = useIntersection(navRef, "-50px");
  // const inViewPort2 = useIntersection(navRef2, "-50px");

  useEffect(() => {
    if (windowSize.width >= 800) setStickHeader(true);
    else setStickHeader(false);
  }, [windowSize.width]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 120) setShowNavbar2(true);
      else setShowNavbar2(false);
    };
    window.addEventListener("scroll", onScroll);
  }, []);

  const jumpToTitle = () => {
    if (elementInView === null) return;
    const children = navRef.current.firstChild.children;
    const children2 = navRef2.current.firstChild.children;
    removeClasses(children);
    removeClasses(children2);
    switch (elementInView.id) {
      case "overlook":
        children[0].classList.add(`${styles.active}`);
        children2[0].classList.add(`${styles.active}`);
        inViewPort
          ? children[0].scrollIntoView({ inline: "center" })
          : children2[0].scrollIntoView({ inline: "center" });
        break;
      case "main-stats":
        children[1].classList.add(`${styles.active}`);
        children2[1].classList.add(`${styles.active}`);
        inViewPort
          ? children[1].scrollIntoView({ inline: "center" })
          : children2[1].scrollIntoView({ inline: "center" });
        break;
      case "vax-on-morbidity":
        children[2].classList.add(`${styles.active}`);
        children2[2].classList.add(`${styles.active}`);
        inViewPort
          ? children[2].scrollIntoView({ inline: "center" })
          : children2[2].scrollIntoView({ inline: "center" });
        break;
      case "deceased":
        children[3].classList.add(`${styles.active}`);
        children2[3].classList.add(`${styles.active}`);
        inViewPort
          ? children[3].scrollIntoView({ inline: "center" })
          : children2[3].scrollIntoView({ inline: "center" });
        break;
      case "further-interrogations":
        children[4].classList.add(`${styles.active}`);
        children2[4].classList.add(`${styles.active}`);
        inViewPort
          ? children[4].scrollIntoView({ inline: "center" })
          : children2[4].scrollIntoView({ inline: "center" });
        break;
      case "population-vaccination":
        children[5].classList.add(`${styles.active}`);
        children2[5].classList.add(`${styles.active}`);
        inViewPort
          ? children[5].scrollIntoView({ inline: "center" })
          : children2[5].scrollIntoView({ inline: "center" });
        break;
      case "Stoplight":
        children[6].classList.add(`${styles.active}`);
        children2[6].classList.add(`${styles.active}`);
        inViewPort
          ? children[6].scrollIntoView({ inline: "center" })
          : children2[6].scrollIntoView({ inline: "center" });
        break;
      default:
        break;
    }
  };

  const removeClasses = (children) => {
    if (!children) return;
    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove(`${styles.active}`);
    }
  };

  useEffect(() => {
    if (elementInView === null || !navRef.current) return;
    if (window.scrollY === 0) {
      const children = navRef.current.firstChild.children;
      const children2 = navRef2.current.firstChild.children;
      removeClasses(children);
      removeClasses(children2);
      children[0].classList.add(`${styles.active}`);
      children2[0].classList.add(`${styles.active}`);

      return;
    }

    jumpToTitle();
  }, [elementInView]);

  const jumpToSection = (ev) => {
    //pretty sure calling null first doesnt help since the state doesnt change yet..
    setClickedTitle(null);
    setClickedTitle(ev.target.id);
    const children = navRef.current.firstChild.children;
    const children2 = navRef2.current.firstChild.children;
    removeClasses(children);
    removeClasses(children2);
    ev.target.scrollIntoView({ inline: "center" });
    children[ev.target.id - 1].classList.add(`${styles.active}`);
    children2[ev.target.id - 1].classList.add(`${styles.active}`);
    inViewPort
      ? children[ev.target.id - 1].scrollIntoView({ inline: "center" })
      : children2[ev.target.id - 1].scrollIntoView({ inline: "center" });
  };

  return (
    <section
      className={`${styles.overContainer} ${stickHeader ? styles.stick : ""}`}
    >
      <div className={styles.line}></div>
      <header className={styles.mainHeader}>
        <div className={styles.headerRight}>
          <button className={styles.menuHamburgerBtn}>
            <IoMenuOutline />
          </button>
          <div className={styles.imgContainer}>
            <img className={styles.logo} src={logo} alt="" />
          </div>
        </div>
        <button
          onClick={onThemeChange}
          className={`${styles.brightnessBtn} ${darkMode ? styles.dark : ""}`}
        >
          <img src={darkMode ? brightnessLight : brightnessDark} alt="" />
        </button>
        <h1 className={styles.updateTitle}>
          <b>נגיף הקורונה בישראל - תמונת מצב כללית</b>
          <div className={styles.UpdateSubtitle}>
            <span>עדכון אחרון: </span>
            <span>10 במאי 2022 | 07:37</span>
          </div>
        </h1>
      </header>
      <nav
        ref={navRef}
        className={`${styles.navbar} ${darkMode ? styles.dark : ""}`}
      >
        <ul>
          <li onClick={jumpToSection} id="1" ref={ref1}>
            מבט על
          </li>
          <li onClick={jumpToSection} id="2" ref={ref2}>
            מדדים מרכזיים
          </li>
          <li onClick={jumpToSection} id="3" ref={ref3}>
            השפעת ההתחסנות על התחלואה
          </li>
          <li onClick={jumpToSection} id="4" ref={ref4}>
            נפטרים
          </li>
          <li onClick={jumpToSection} id="5" ref={ref5}>
            תחקורים נוספים
          </li>
          <li onClick={jumpToSection} id="6" ref={ref6}>
            התחסנות האוכלוסייה
          </li>
          <li onClick={jumpToSection} id="7" ref={ref7}>
            רמזור בישובים
          </li>
        </ul>
      </nav>
      <nav
        ref={navRef2}
        className={`${styles.navbar2} ${
          showNavbar2 && windowSize.width <= 800 ? styles.show : ""
        } ${darkMode ? styles.dark : ""}`}
      >
        <ul>
          <li onClick={jumpToSection} id="1" ref={ref1nav2}>
            מבט על
          </li>
          <li onClick={jumpToSection} id="2" ref={ref2nav2}>
            מדדים מרכזיים
          </li>
          <li onClick={jumpToSection} id="3" ref={ref3nav2}>
            השפעת ההתחסנות על התחלואה
          </li>
          <li onClick={jumpToSection} id="4" ref={ref4nav2}>
            נפטרים
          </li>
          <li onClick={jumpToSection} id="5" ref={ref5nav2}>
            תחקורים נוספים
          </li>
          <li onClick={jumpToSection} id="6" ref={ref6nav2}>
            התחסנות האוכלוסייה
          </li>
          <li onClick={jumpToSection} id="7" ref={ref7nav2}>
            רמזור בישובים
          </li>
        </ul>
      </nav>
    </section>
  );
};
