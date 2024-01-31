import { ButtonHTMLAttributes, ReactElement } from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  childred?: ReactElement;
  elType?: 'outlined' | 'contained';
}

const Button = ({ children, elType = 'contained', disabled, ...otherProps }: IProps) => {
  return (
    <button
      {...otherProps}
      disabled={disabled}
      className={classNames(
        styles.container,
        {
          [styles.contained]: elType === 'contained',
          [styles.outlined]: elType === 'outlined',
          [styles.disabled]: disabled,
        },
        otherProps.className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
