import ProfileForm from '@/features/Profile/ui/ProfileForm/ProfileForm';
import styles from './styles.module.scss';
import ProfileModals from './modals';
import { PageHeader } from '@/widgets/Header';
import { useTranslation } from 'react-i18next';

const ProfileEdit = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader customBackPath="/profile" title={t('editProfile')} />
      <div className={styles.container}>
        <ProfileForm />
      </div>
      <ProfileModals />
    </>
  );
};

export default ProfileEdit;
