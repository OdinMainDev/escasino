import { ButtonHTMLAttributes, ReactElement } from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';
import Loader from '../Loader';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  childred?: ReactElement;
  loading?: boolean;
  elType?: 'outlined' | 'contained';
}

const Button = ({ children, elType = 'contained', loading, disabled, ...otherProps }: IProps) => {
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
