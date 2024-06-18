import { SelectHTMLAttributes } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

export interface ISelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  optionList?: ISelectOption[];
  isError?: boolean;
  containerClassName?: string;
  message?: string | null;
}

const Select = ({ optionList, isError, containerClassName, message, ...otherProps }: IProps) => {
  return (
    <div
      className={classNames(styles.wrapper, containerClassName, {
        [styles.error]: isError,
      })}
    >
      <label className={classNames(styles.select_container)}>
        <select className={styles.select} {...otherProps}>
          {optionList &&
            optionList.map((item, index) => (
              <option value={item.value} key={index} disabled={item.disabled}>
                {item.label}
              </option>
            ))}
        </select>
        <span className={styles.arrow}>
          <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L7 7L13 1"
              stroke="var(--text-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </label>
      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
};

export default Select;
