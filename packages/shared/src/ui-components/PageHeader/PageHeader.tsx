import React from 'react';
import styles from './PageHeader.module.scss';

interface PageHeaderProps {
  children?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  isCustomHeader?: boolean;
}

const PageHeader = ({ children, left, right, isCustomHeader }: PageHeaderProps) => {
  return (
    <header className={styles.wrapper}>
      <div className={styles.left_container}>{left}</div>
      {isCustomHeader ? (
        <div className={styles.mid_container}>children</div>
      ) : (
        <h1 className={styles.mid_container}>{children}</h1>
      )}
      <div className={styles.right_container}>{right}</div>
    </header>
  );
};

export default PageHeader;
