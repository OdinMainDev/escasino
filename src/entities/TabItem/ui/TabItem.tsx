import { BaseHTMLAttributes, ReactNode } from 'react';
import styles from './TabItem.module.scss';
import classNames from 'classnames';

interface IProps extends BaseHTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  selected?: boolean;
  skeleton?: boolean;
}

const TabItem = ({ children, selected, skeleton, ...otherProps }: IProps) => {
  if (skeleton) {
    return <div className={classNames(styles.skeleton, otherProps.className)}></div>;
  }

  return (
    <div
      {...otherProps}
      className={classNames(
        styles.container,
        {
          [styles.selected]: selected,
        },
        otherProps.className,
      )}
    >
      {children}
    </div>
  );
};

export default TabItem;
