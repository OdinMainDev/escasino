import styles from './styles.module.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

interface IProps {
  tabs: ITab[];
  value?: string | number;
  onChange?: (tab: ITab) => void;
  className?: string;
}

export interface ITab {
  value: string | number;
  label: string;
}

const Tabs = ({ tabs, onChange, value, className }: IProps) => {
  const [activeTab, setActiveTab] = useState<string | number | null>(value ?? null);

  useEffect(() => {
    setActiveTab(value ?? null);
  }, [value]);

  const selectTab = (tab: ITab) => {
    setActiveTab(tab.value);
    if (onChange) {
      onChange(tab);
    }
  };

  return (
    <div className={classNames(styles.container, className)}>
      {tabs.map((item, index) => (
        <div
          key={index}
          onClick={() => selectTab(item)}
          className={classNames(styles.tab, {
            [styles.active]: activeTab === item.value,
          })}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
