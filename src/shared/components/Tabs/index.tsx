import styles from './styles.module.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

interface IProps {
  tabs: ITab[];
  value?: ITab;
  onChange?: (tab: ITab) => void;
}

export interface ITab {
  value: string;
  label: string;
}

const Tabs = ({ tabs, onChange, value }: IProps) => {
  const [activeTab, setActiveTab] = useState<ITab | null>(value ?? null);

  useEffect(() => {
    setActiveTab(value ?? null);
  }, [value]);

  const selectTab = (tab: ITab) => {
    setActiveTab(tab);
    if (onChange) {
      onChange(tab);
    }
  };

  return (
    <div className={styles.container}>
      {tabs.map((item, index) => (
        <div
          key={index}
          onClick={() => selectTab(item)}
          className={classNames(styles.tab, {
            [styles.active]: activeTab?.value === item.value,
          })}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
