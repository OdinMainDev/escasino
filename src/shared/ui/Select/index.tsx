import { SelectHTMLAttributes } from 'react';
import styles from './styles.module.scss';
import { ISelectOption } from '@/shared/models/interfaces/select';
import classNames from 'classnames';

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  optionList?: ISelectOption[];
  isError?: boolean;
}

const Select = ({ optionList, isError, ...otherProps }: IProps) => {
  return (
    <label
      className={classNames(styles.container, {
        [styles.error]: isError,
      })}
    >
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
          fill="#000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L7 7L13 1"
            stroke="#A3A3A3"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </label>
  );
};

export default Select;
