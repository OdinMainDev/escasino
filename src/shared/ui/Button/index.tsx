import { ButtonHTMLAttributes, ReactElement } from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';
import Loader from '@/shared/ui/Loader';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  childred?: ReactElement;
  loading?: boolean;
  elType?: 'outlined' | 'contained';
  disabledOpacityOff?: boolean;
}

const Button = ({
  children,
  elType = 'contained',
  loading,
  disabled,
  disabledOpacityOff,
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
