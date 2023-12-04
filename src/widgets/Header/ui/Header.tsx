import Input from '@/shared/ui/Input';
import styles from './Header.module.scss';
import { ProvidersList } from '@/features/ProvidersList';
import UserIcon from './UserIcon';

const Header = () => {
  const containerStyles = {
    backgroundColor: `#${process.env.HEADER_COLOR}`,
  };

  return (
    <div className={styles.container} style={containerStyles}>
      <div className={styles.search}>
        <Input placeholder="Поиск игры" elType="search" className={styles.input} elSize="s" />
        <UserIcon />
      </div>
      <ProvidersList />
    </div>
  );
};

export default Header;
