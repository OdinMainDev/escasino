import GoBackButton from '@/shared/ui/GoBackButton';
import styles from './ProfileEdit.module.scss';
import { ProfileForm } from '@/features/ProfileForm';

const ProfileEdit = () => {
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
