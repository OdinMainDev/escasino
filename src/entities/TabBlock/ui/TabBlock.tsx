import { BaseHTMLAttributes, ReactNode } from 'react';
import styles from './TabBlock.module.scss';
import classNames from 'classnames';

interface IProps extends BaseHTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  selected?: boolean;
  skeleton?: boolean;
}

const TabBlock = ({ children, selected, skeleton, ...otherProps }: IProps) => {
  if (skeleton) {
    return <div className={styles.skeleton}></div>;
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

export default TabBlock;
