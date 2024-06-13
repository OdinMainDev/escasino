import { ReactNode, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

interface IProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  isError?: boolean;
  label?: string | ReactNode;
}

const Checkbox = ({ value, onChange, isError, label }: IProps) => {
  const [checked, setChecked] = useState<boolean>(value ?? false);
  useEffect(() => {
    setChecked(!!value);
  }, [value]);

  const onCheck = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (onChange) {
      onChange(e.target.checked);
    }
    setChecked(e.target.checked);
  };

  return (
    <label
      className={classNames(styles.container, {
        [styles.error]: isError,
      })}
    >
      <input type="checkbox" checked={checked} onChange={onCheck} />
      <div className={styles.checkbox_container}>
        {checked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="var(--secondary)"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5 3C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5ZM18.6936 8.72032C19.0915 8.33723 19.1034 7.70418 18.7203 7.30636C18.3372 6.90854 17.7042 6.89659 17.3064 7.27968L9.69231 14.6117L6.69364 11.7241C6.29582 11.341 5.66277 11.353 5.27968 11.7508C4.89659 12.1486 4.90854 12.7817 5.30636 13.1648L8.99867 16.7203C9.38591 17.0932 9.9987 17.0932 10.3859 16.7203L18.6936 8.72032Z"
              fill="var(--secondary)"
            />
          </svg>
        ) : (
          <div className={styles.checkbox}></div>
        )}
      </div>

      <div className={styles.label}>{label}</div>
    </label>
  );
};

export default Checkbox;
