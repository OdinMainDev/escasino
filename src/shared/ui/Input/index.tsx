'use client';

import { InputHTMLAttributes, forwardRef, useState, useMemo, useRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import Icons from '../Icons';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  elType?: 'input' | 'search';
  elSize?: 'm' | 's';
  isError?: boolean;
  message?: string | null;
  containerClassName?: string;
  validationTimeout?: number;
  validationFunction?: (value: string) => boolean;
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
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
      validationFunction,
      validationTimeout = 0,
      ...otherProps
    },
    ref,
  ) => {
    const [isPassword, setIsPassword] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState(message);
    const time = useRef<NodeJS.Timeout | null>(null);
    const messageRef = useRef(message);

    useEffect(() => {
      messageRef.current = message;
    }, [message]);

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

    const onChangeHandler = (e: React.FocusEvent<HTMLInputElement>) => {
      if (otherProps.onChange) {
        otherProps.onChange(e);
      }
      const value = e.target.value;
      setIsValid(true);
      if (time.current) {
        clearTimeout(time.current);
      }

      if (validationFunction) {
        if (value.length > 0) {
          setErrorMessage(null);
        } else {
          setErrorMessage(messageRef.current);
        }
        time.current = setTimeout(() => {
          setIsValid(validationFunction(value));
          setErrorMessage(messageRef.current);
        }, validationTimeout);
      }
    };

    return (
      <div
        className={classNames(styles.container, containerClassName, {
          [styles.error]: isError || !isValid,
        })}
      >
        <label className={containerClass}>
          <input
            {...otherProps}
            ref={ref}
            onChange={onChangeHandler}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder=""
            className={inputClass}
            type={type === 'password' ? (isPassword ? 'password' : 'text') : type}
          />
          <span className={styles.placeholder}>{placeholder}</span>
          {renderIcon()}
        </label>
        {errorMessage && <div className={styles.message}>{errorMessage}</div>}
      </div>
    );
  },
);

export default Input;
