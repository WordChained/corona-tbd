import React, { useState, useRef, useEffect } from 'react';
import styles from './CoronaTable.module.css';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
export const CoronaTable = ({ titles = [], children, sortFunction }) => {
  const [isDownSort, setIsDownSort] = useState(false);
  const [currentElement, setCurrentElement] = useState(null);
  const tableHeaderRef = useRef();
  useEffect(() => {
    const removeActiveClasses = (ev) => {
      ev.stopPropagation();
      if (
        ev.target.parentElement === tableHeaderRef.current ||
        ev.target.parentElement.parentElement === tableHeaderRef.current
      )
        return;
      const children = tableHeaderRef.current.children;
      for (let i = 0; i < children.length; i++) {
        tableHeaderRef.current.children[i].classList.remove(`${styles.active}`);
      }
    };
    document.addEventListener('click', removeActiveClasses);
    return () => {
      document.removeEventListener('click', removeActiveClasses);
    };
  }, []);

  const onHeaderClick = (ev) => {
    if (ev.target.parentElement !== tableHeaderRef.current) return;
    const children = tableHeaderRef.current.children;
    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove(`${styles.active}`);
    }
    ev.target.classList.add(`${styles.active}`);
  };
  const onTitleClick = (ev) => {
    const children = tableHeaderRef.current.children;
    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove(`${styles.active}`);
    }
    ev.target.parentElement.classList.add(`${styles.active}`);
    if (ev.target !== currentElement) {
      setCurrentElement(ev.target);
      setIsDownSort(true);
      sortFunction(ev.target.id, -1);
      return;
    }
    if (!currentElement) {
      setCurrentElement(ev.target);
      setIsDownSort(true);
      sortFunction(ev.target.id, -1);
    } else if (isDownSort && currentElement) {
      setIsDownSort(false);
      sortFunction(ev.target.id, 1);
    } else {
      setIsDownSort(false);
      setCurrentElement(null);
      //making the default in the sort function work by sending a number we didnt do a case for
      sortFunction(8, 0);
    }
  };

  return (
    <div className={styles.container}>
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
