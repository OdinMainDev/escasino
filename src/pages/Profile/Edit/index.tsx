import ProfileForm from '@/features/Profile/ui/ProfileForm/ProfileForm';
import styles from './styles.module.scss';
import ProfileModals from './modals';
import { PageHeader } from '@/widgets/Header';
import { useTranslation } from 'react-i18next';
import Tabs, { ITab } from '@/entities/Tabs';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const newLocal = '.desktop-wrapper ';
    document.querySelector(newLocal)?.scrollTo(0, 0);
  }, []);

  return (
    <div key="profile_edit">
      {/* Фиксируем весь header + tabs */}
      <div className="sticky top-0 w-full z-10 bg-[--primary] shadow-md after:content-[''] after:block after:h-[8px] after:w-full after:bg-gradient-to-b after:from-black after:to-transparent">
        <PageHeader customBackPath="/profile" title={t('editProfile')} />
        <Tabs
          tabs={tabs}
          value={selectedTab.value}
          className="w-full"
          onChange={(value) => setSelectedTab(value)}
        />
      </div>

      {/* Контент с отступом, чтобы не перекрывался хедером */}
      <div className="pt-[24px]">
        {selectedTab.value === 'about' ? (
          <div className={styles.container}>
            <ProfileForm />
          </div>
        ) : (
          <div className={styles.container}>
            <ProfilePasswordForm />
          </div>
        )}
      </div>

      <ProfileModals />
    </div>
  );
};

export default ProfileEdit;
