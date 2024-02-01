import GoBackButton from '@/shared/ui/GoBackButton';
import styles from './styles.module.scss';
import { ProfileForm } from '@/features/ProfileForm';

const EditProfile = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.back}>
          <GoBackButton />
        </div>
        <div className={styles.title}>Профиль</div>
      </div>
      <ProfileForm />
    </div>
  );
};

export default EditProfile;
