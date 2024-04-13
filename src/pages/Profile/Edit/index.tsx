import ProfileForm from '@/features/Profile/ui/ProfileForm/ProfileForm';
import styles from './styles.module.scss';
import GoBackButton from '@/shared/ui/GoBackButton';
import ProfileModals from './modals';

const ProfileEdit = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.back}>
            <GoBackButton />
          </div>
          <div className="header_title">Редактировать профиль</div>
        </div>
        <ProfileForm />
      </div>
      <ProfileModals />
    </>
  );
};

export default ProfileEdit;
