import ProfileForm from '@/features/Profile/ui/ProfileForm/ProfileForm';
import styles from './styles.module.scss';
import ProfileModals from './modals';
import { PageHeader } from '@/widgets/Header';

const ProfileEdit = () => {
  return (
    <>
      <div className={styles.container}>
        <PageHeader customBackPath="/profile" title="Редактировать профиль" />
        <ProfileForm />
      </div>
      <ProfileModals />
    </>
  );
};

export default ProfileEdit;
