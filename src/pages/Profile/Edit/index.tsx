import ProfileForm from '@/features/Profile/ui/ProfileForm/ProfileForm';
import styles from './styles.module.scss';
import GoBackButton from '@/shared/components/GoBackButton';
import { useAppSelector } from '@/store/hooks/redux';
import { usePreloader } from '@/app/providers/PreloaderProvider';

const ProfileEdit = () => {
  const { loading: loadingUser } = useAppSelector((state) => state.userReducer);
  const { loading: loadingSettings } = useAppSelector((state) => state.settingsReducer);
  const { hidePreloader } = usePreloader();

  if (loadingUser || loadingSettings) {
    return;
  }

  hidePreloader();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.back}>
          <GoBackButton />
        </div>
        <div className="header_title">Персональные данные</div>
      </div>
      <ProfileForm />
    </div>
  );
};

export default ProfileEdit;
