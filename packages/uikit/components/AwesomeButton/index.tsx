import React from 'react';

import styles from './style.module.scss';
import { ReactComponent as Crown } from './crown.svg';

const AwesomeButton = ({ children, ...buttonAttr }) => {
  const { className } = buttonAttr;
  return (
    <button {...buttonAttr} className={`${className} ${styles.button}`}>
      <Crown />
      {children}
    </button>
  );
};

export default AwesomeButton;
