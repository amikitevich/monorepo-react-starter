import React from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  isShort?: boolean;
  [prop: string]: any;
}

export const Button = ({ children, isLoading, isShort, ...restProps }: ButtonProps) => {
  return (
    <button {...restProps} className={cn(styles.button, { [styles.short]: isShort })}>
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
