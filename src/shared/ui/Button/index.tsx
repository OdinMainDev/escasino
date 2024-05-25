import { ButtonHTMLAttributes, ReactElement } from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';
import Loader from '@/shared/ui/Loader';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  childred?: ReactElement;
  loading?: boolean;
  size?: 'm' | 's';
  elType?: 'outlined' | 'contained';
  disabledOpacityOff?: boolean;
  theme?: 'light' | 'dark';
}

const Button = ({
  children,
  elType = 'contained',
  loading,
  disabled,
  disabledOpacityOff,
  size = 'm',
  theme = 'dark',
  ...otherProps
}: IProps) => {
  return (
    <button
      {...otherProps}
      disabled={disabled}
      className={classNames(
        styles.container,
        {
          [styles.contained]: elType === 'contained',
          [styles.outlined]: elType === 'outlined',
          [styles.disabled]: disabled && !disabledOpacityOff,
          [styles.size_m]: size === 'm',
          [styles.size_s]: size === 's',
          [styles.dark]: theme === 'dark',
          [styles.light]: theme === 'light',
        },
        otherProps.className,
      )}
    >
      {loading && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}

      {children}
    </button>
  );
};

export default Button;
