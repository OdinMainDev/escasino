'use client';

import { InputHTMLAttributes, forwardRef, useState, useMemo } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import Icons from '../Icons';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  elType?: 'input' | 'search';
  elSize?: 'm' | 's';
  isError?: boolean;
  message?: string;
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, IProps>(
  (
    {
      elType = 'input',
      elSize = 'm',
      isError,
      className,
      containerClassName,
      type,
      placeholder,
      message,
      ...otherProps
    },
    ref,
  ) => {
    const [isPassword, setIsPassword] = useState(true);
    const [isActive, setIsActive] = useState(false);

    const handleFocus = () => setIsActive(true);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) =>
      setIsActive(e.target.value !== '');

    const containerClass = useMemo(
      () => classNames(styles.label, styles[elSize], className),
      [elSize, className],
    );

    const inputClass = classNames(styles.input, {
      [styles.active]: isActive,
    });

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
      <div
        className={classNames(styles.container, containerClassName, {
          [styles.error]: isError,
        })}
      >
        <label className={containerClass}>
          <input
            {...otherProps}
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder=""
            className={inputClass}
            type={type === 'password' ? (isPassword ? 'password' : 'text') : type}
          />
          <span className={styles.placeholder}>{placeholder}</span>
          {renderIcon()}
        </label>
        <div className={styles.message}>{message}</div>
      </div>
    );
  },
);

export default Input;
