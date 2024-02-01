import { TextareaHTMLAttributes, useState } from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  containerClassName?: string;
}

const Textarea = ({ value, placeholder, containerClassName, ...otherProps }: IProps) => {
  const [isActive, setIsActive] = useState(!!value);

  const handleFocus = () => setIsActive(true);
  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) =>
    setIsActive(e.target.value !== '');

  return (
    <label className={classNames(styles.container, containerClassName)}>
      <textarea
        {...otherProps}
        placeholder=""
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={classNames(styles.textarea, otherProps.className, {
          [styles.active]: isActive,
        })}
      ></textarea>
      <span className={styles.placeholder}>{placeholder}</span>
    </label>
  );
};

export default Textarea;
