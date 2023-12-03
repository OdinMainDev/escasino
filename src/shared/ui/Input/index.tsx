'use client';

import { InputHTMLAttributes, forwardRef, useState, useMemo } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import Icons from '../Icons';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  elType?: 'input' | 'search';
  elSize?: 'm' | 's';
}

const Input = forwardRef<HTMLInputElement, IProps>(
  ({ elType = 'input', elSize = 'm', className, type, ...otherProps }, ref) => {
    const [isPassword, setIsPassword] = useState(true);

    const containerClass = useMemo(
      () => classNames(styles.container, styles[elSize], className),
      [elSize, className],
    );

    const renderIcon = () => {
      if (type === 'password') {
        return (
          <div className={styles.icon} onClick={() => setIsPassword((prev) => !prev)}>
            <Icons icon={isPassword ? 'eye-off' : 'eye'} />
          </div>
        );
      }

      if (elType === 'search') {
        return (
          <div className={styles.icon}>
            <Icons icon="search" />
          </div>
        );
      }

      return null;
    };

    return (
      <label className={containerClass}>
        <input
          {...otherProps}
          ref={ref}
          className={styles.input}
          type={type === 'password' ? (isPassword ? 'password' : 'text') : type}
        />
        {renderIcon()}
      </label>
    );
  },
);

export default Input;
