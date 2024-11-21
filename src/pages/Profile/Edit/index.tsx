import ProfileForm from '@/features/Profile/ui/ProfileForm/ProfileForm';
import styles from './styles.module.scss';
import ProfileModals from './modals';
import { PageHeader } from '@/widgets/Header';
import { useTranslation } from 'react-i18next';
import Tabs, { ITab } from '@/entities/Tabs';
import { useState } from 'react';
import ProfilePasswordForm from '@/features/Profile/ui/PasswordForm/ProfilePasswordForm';

const ProfileEdit = () => {
  const { t } = useTranslation();
  const tabs: ITab[] = [
    {
      label: 'aboutMe',
      value: 'about',
    },
    {
      label: 'Password to login',
      value: 'passwords',
    },
  ];
  const [selectedTab, setSelectedTab] = useState<ITab>(tabs[0]);
  return (
    <>
      <PageHeader customBackPath="/profile" title={t('editProfile')} />
      <Tabs
        tabs={tabs}
        value={selectedTab.value}
        className="mb-[24px]"
        onChange={(value) => setSelectedTab(value)}
      />
      {selectedTab.value === 'about' ? (
        <div className={styles.container}>
          <ProfileForm />
        </div>
      ) : (
        <div className={styles.container}>
          <ProfilePasswordForm />
        </div>
      )}

      <ProfileModals />
    </>
  );
};

export default ProfileEdit;
