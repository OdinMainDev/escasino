import ReactDatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styles from './styles.module.scss';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { ru } from 'date-fns/locale/ru';
import './styles.scss';

registerLocale('ru', ru);

interface IProps {
  selected?: Date;
  onChange?: (value: Date) => void;
  elSize?: 'm' | 's';
  placeholder?: string;
  validationTimeout?: number;
  message?: string | null;
  popperClassName?: string;
  containerClassName?: string;
  validationFunction?: (value: Date) => boolean;
  isError?: boolean;
  selectsStart?: boolean;
  selectsEnd?: boolean;
  startDate?: Date;
  endDate?: Date;
}

const DatePicker = ({
  selected,
  onChange = () => {},
  elSize = 'm',
  placeholder,
  validationTimeout = 100,
  message,
  containerClassName,
  validationFunction,
  isError,
  selectsEnd,
  selectsStart,
  popperClassName,
  startDate,
  endDate,
}: IProps) => {
  const [isActive, setIsActive] = useState(true);
  const [errorMessage, setErrorMessage] = useState(message);
  const messageRef = useRef(message);
  const [isValid, setIsValid] = useState(true);
  const time = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    messageRef.current = message;
    setErrorMessage(message);
  }, [message, selected]);

  const changeDateHandler = (data: Date) => {
    if (onChange) {
      onChange(data);
    }

    setIsValid(true);
    if (time.current) {
      clearTimeout(time.current);
    }

    if (validationFunction || isError) {
      if (data) {
        setErrorMessage(null);
      } else {
        setErrorMessage(messageRef.current);
      }
      time.current = setInterval(() => {
        if (validationFunction) {
          setIsValid(validationFunction(data));
        }
        setErrorMessage(messageRef.current);
      }, validationTimeout);
    }
  };

  const handleFocus = () => setIsActive(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => setIsActive(e.target.value !== '');

  return (
    <div
      className={classNames(styles.container, containerClassName, {
        [styles.error]: isError || !isValid,
      })}
    >
      <div className="relative">
        <span
          className={classNames(styles.placeholder, {
            [styles.active]: isActive,
          })}
        >
          {placeholder}
        </span>
        <ReactDatePicker
          dateFormat="dd-MM-yyyy"
          popperClassName={classNames(styles.popper, popperClassName)}
          wrapperClassName={classNames(styles.wrapper, styles[elSize])}
          selected={selected}
          dayClassName={(date) => {
            return date.getTime() === selected?.getTime() ? styles.selected_day : styles.day;
          }}
          onChange={changeDateHandler}
          onFocus={handleFocus}
          onBlur={handleBlur}
          maxDate={new Date()}
          showMonthDropdown
          showYearDropdown
          selectsStart={selectsStart}
          selectsEnd={selectsEnd}
          dropdownMode="select"
          locale="ru"
          startDate={startDate}
          endDate={endDate}
          className={styles.input}
        />
      </div>

      {errorMessage && <div className={styles.message}>{errorMessage}</div>}
    </div>
  );
};

export default DatePicker;
