import React, { useState, useRef, useEffect, useContext } from "react";
import styles from "./CoronaTable.module.css";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { ThemeContext } from "../store/context/ThemeContext";
export const CoronaTable = ({ titles = [], children, sortFunction }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const [isDownSort, setIsDownSort] = useState(false);
  const [currentElement, setCurrentElement] = useState(null);
  const tableHeaderRef = useRef();
  useEffect(() => {
    const removeActiveClasses = (ev) => {
      ev.stopPropagation();
      let target;
      switch (ev.target.tagName.toLowerCase()) {
        case "span":
          target = ev.target.parentElement;
          break;
        case "svg":
          target = ev.target?.parentElement?.parentElement;
          break;
        case "path":
          target = ev.target?.parentElement?.parentElement;
          break;
        default:
          target = ev.target;
          break;
      }
      if (
        target?.parentElement === tableHeaderRef.current ||
        target?.parentElement?.parentElement === tableHeaderRef.current
      )
        return;
      const children = tableHeaderRef.current.children;
      for (let i = 0; i < children.length; i++) {
        tableHeaderRef.current.children[i].firstChild.classList.remove(
          `${styles.active}`
        );
      }
    };
    document.addEventListener("click", removeActiveClasses);
    return () => {
      document.removeEventListener("click", removeActiveClasses);
    };
  }, []);

  const onHeaderClick = (ev) => {
    let target;
    switch (ev.target.tagName.toLowerCase()) {
      case "span":
        target = ev.target.parentElement;
        break;
      case "svg":
        target = ev.target.parentElement.parentElement;
        break;
      case "path":
        target = ev.target.parentElement.parentElement.parentElement;
        break;
      default:
        target = ev.target;
        break;
    }
    const children = tableHeaderRef.current.children;
    for (let i = 0; i < children.length; i++) {
      children[i].firstChild.classList.remove(`${styles.active}`);
    }
    target.classList.add(`${styles.active}`);
  };

  const onTitleClick = (ev) => {
    let target;
    switch (ev.target.tagName.toLowerCase()) {
      case "span":
        target = ev.target.parentElement;
        break;
      case "svg":
        target = ev.target.parentElement.parentElement;
        break;
      case "path":
        target = ev.target.parentElement.parentElement.parentElement;
        break;
      default:
        target = ev.target;
        break;
    }
    const children = tableHeaderRef.current.children;
    for (let i = 0; i < children.length; i++) {
      children[i].firstChild.classList.remove(`${styles.active}`);
    }
    if (target !== currentElement) {
      setCurrentElement(target);
      setIsDownSort(true);
      sortFunction(target.id, -1);
      return;
    }
    if (!currentElement) {
      setCurrentElement(target);
      setIsDownSort(true);
      sortFunction(target.id, -1);
    } else if (isDownSort && currentElement) {
      setIsDownSort(false);
      sortFunction(target.id, 1);
    } else {
      setIsDownSort(false);
      setCurrentElement(null);
      //making the default in the sort function work by sending a number we didnt do a case for
      sortFunction(8, 0);
    }
  };

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
      {
        <div ref={tableHeaderRef} className={styles.tableHeader}>
          {titles.map((title, idx) => (
            <div key={idx} onClick={onHeaderClick}>
              <div className={styles.title} onClick={onTitleClick} id={idx}>
                {title}
                {currentElement && +currentElement.id === idx && (
                  <span className={styles.arrow}>
                    {isDownSort ? <FaCaretDown /> : <FaCaretUp />}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      }
      {children}
    </div>
  );
};
