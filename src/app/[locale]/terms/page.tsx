import GoBackButton from '@/shared/ui/GoBackButton';
import styles from './styles.module.scss';
import Icons from '@/shared/ui/Icons';
import Tabs from '@/shared/ui/Tabs';
import { ITab } from '@/shared/models/interfaces/tabs';

const Terms = () => {
  const tabs: ITab[] = [
    {
      value: 'all',
      label: 'Общие',
    },
    {
      value: 'bonus',
      label: 'Бонусные',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <GoBackButton />
        <div className="title">Правила и условия</div>
        <Icons icon="chat" />
      </div>
      <Tabs tabs={tabs} value={tabs[0]} />
    </div>
  );
};

export default Terms;
