import React from 'react';
import styles from './CustomLabel.module.css';
export const CustomLabel = ({ viewBox, content }) => {
  return (
    <text className={styles.container} x={viewBox.x} y={viewBox.y} dy={-15}>
      {content.key}
    </text>
  );
};
