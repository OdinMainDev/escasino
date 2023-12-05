import { TextareaHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = ({ ...otherProps }: IProps) => {
  return (
    <textarea
      {...otherProps}
      className={classNames(styles.textarea, otherProps.className)}
    ></textarea>
  );
};

export default Textarea;
