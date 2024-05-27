import {
  InputHTMLAttributes,
  forwardRef,
  useState,
  useMemo,
  useRef,
  useEffect,
  ReactNode,
} from 'react';
import 'react-phone-input-2/lib/style.css';

import classNames from 'classnames';
import styles from './styles.module.scss';
import Icons from '../Icons';
import InputMask from 'react-input-mask';
import PhoneInput from 'react-phone-input-2';
import { defaultLanguage } from '@/app/config/locales';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  elType?: 'input' | 'search';
  elSize?: 'm' | 's';
  isError?: boolean;
  message?: ReactNode | string | null;
  containerClassName?: string;
  validationTimeout?: number;
  icon?: ReactNode;
  validationFunction?: (value: string) => boolean;
  disabledOpacityOff?: boolean;
  mask?: string | null;
  onChangePhone?: (value: string) => void;
  onClear?: () => void;
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
      value,
      validationFunction,
      validationTimeout = 100,
      disabled,
      disabledOpacityOff,
      mask,
      icon,
      onChangePhone,
      onClear,
      ...otherProps
    },
    ref,
  ) => {
    const [isPassword, setIsPassword] = useState(true);
    const [isActive, setIsActive] = useState(!!value);
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState(message);
    const time = useRef<NodeJS.Timeout | null>(null);
    const messageRef = useRef(message);

    useEffect(() => {
      messageRef.current = message;
      setErrorMessage(message);
      setIsActive(!!value);
    }, [message, value]);

    const handleFocus = () => setIsActive(true);
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) =>
      setIsActive(e.target.value !== '');

    const containerClass = useMemo(
      () =>
        classNames(styles.label, styles[elSize], className, {
          [styles.disabled]: disabled && !disabledOpacityOff,
          [styles.withoutPlaceholder]: !placeholder,
        }),
      [elSize, className, disabled, disabledOpacityOff, placeholder],
    );

    const inputClass = classNames(styles.input, {
      [styles.active]: isActive,
    });

    const renderIcon = () => {
      if (icon) {
        return <div className={styles.icon}>{icon}</div>;
      }
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

      if (validationFunction || isError) {
        if (value.length > 0) {
          setErrorMessage(null);
        } else {
          setErrorMessage(messageRef.current);
        }
        time.current = setInterval(() => {
          if (validationFunction) {
            setIsValid(validationFunction(value));
          }
          setErrorMessage(messageRef.current);
        }, validationTimeout);
      }
    };

    const onChangePhoneHandler = (phone: string) => {
      if (onChangePhone) {
        onChangePhone(phone);
      }
      const value = phone;
      setIsValid(true);
      if (time.current) {
        clearTimeout(time.current);
      }

      if (validationFunction || isError) {
        if (value.length > 0) {
          setErrorMessage(null);
        } else {
          setErrorMessage(messageRef.current);
        }
        time.current = setInterval(() => {
          if (validationFunction) {
            setIsValid(validationFunction(value));
          }
          setErrorMessage(messageRef.current);
        }, validationTimeout);
      }
    };

    if (mask) {
      return (
        <div
          className={classNames(styles.container, containerClassName, {
            [styles.error]: isError || !isValid,
          })}
        >
          <label className={containerClass}>
            <InputMask
              mask={mask}
              maskChar={null}
              alwaysShowMask={true}
              {...otherProps}
              value={value}
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
    }

    if (type === 'phone') {
      return (
        <div
          className={classNames(styles.container, containerClassName, {
            [styles.error]: isError || !isValid,
          })}
        >
          <PhoneInput
            value={value as string}
            onChange={onChangePhoneHandler}
            country={defaultLanguage}
            inputClass={styles.phone_input}
            containerClass={styles.phone_input_continer}
            buttonClass={styles.input_button}
          />
          {errorMessage && <div className={styles.message}>{errorMessage}</div>}
        </div>
      );
    }

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
            value={value}
            onChange={onChangeHandler}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder=""
            className={inputClass}
            type={type === 'password' ? (isPassword ? 'password' : 'text') : type}
          />
          <span className={styles.placeholder}>{placeholder}</span>
          {value && onClear && (
            <div className={styles.clear_button} onClick={onClear}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 1L1 13M1 1L13 13"
                  stroke="#000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
          {renderIcon()}
        </label>
        {errorMessage && <div className={styles.message}>{errorMessage}</div>}
      </div>
    );
  },
);

export default Input;
