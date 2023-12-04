import Input from '@/shared/ui/Input';
import styles from './Header.module.scss';
import { ProvidersList } from '@/features/ProvidersList';
import UserIcon from './UserIcon';
import GoBackButton from './GoBackButton';
const Header = () => {
  const containerStyles = {
    backgroundColor: `#${process.env.HEADER_COLOR}`,
  };

  return (
    <div className={styles.container} style={containerStyles}>
      <div className={styles.search}>
        <GoBackButton className={styles.back} />
        <Input placeholder="Поиск игры" elType="search" className={styles.input} elSize="s" />
        <UserIcon />
      </div>
      <ProvidersList />
    </div>
  );
};

export default Header;
