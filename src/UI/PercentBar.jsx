import React from 'react';
import styles from './PercentBar.module.css';
export const PercentBar = ({ width, backColor, frontColor }) => {
  return (
    <div className={styles.container}>
      <canvas
        width={`60`}
        height='20'
        style={{
          // position: 'absolute',

          width: `100%`,
          height: '10px',
          userSelect: 'none',
          padding: '0px',
          margin: '0px',
          borderWidth: '0px',
          backgroundColor: backColor,
          position: 'relative',
        }}
      ></canvas>
      <canvas
        width={`60`}
        height='20'
        style={{
          position: 'absolute',
          right: '0px',
          top: '0px',
          width: `${width}%`,
          height: '10px',
          userSelect: 'none',
          padding: '0px',
          margin: '0px',
          borderWidth: '0px',
          backgroundColor: frontColor,
          zIndex: '2',
        }}
      ></canvas>
    </div>
  );
};
