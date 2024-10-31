import classNames from 'classnames';

import styles from './styles.module.scss';
import { useAppSelector } from '@/store/hooks/redux';
import { useRouter } from '@/shared/helpers/navigation';
import { useAuthProvider } from '@/app/providers/AuthProvider';
import Button from '@/shared/ui/Button';
import Loader from '@/shared/ui/Loader';
import { BonusesItem } from '@/entities/BonusesItem';
import { PageHeader } from '@/widgets/Header';

import PusherService from '@/shared/service/PusherService';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t } = useTranslation();
  const { user, loading: loadingUser } = useAppSelector((state) => state.userReducer);
  const { settings } = useAppSelector((state) => state.settingsReducer);
  const router = useRouter();
  const { activeBonuses } = useAppSelector((state) => state.bonusesSlice);
  const { unsetAuthenticated } = useAuthProvider();

  const logoutHandler = () => {
    if (settings && settings.pusher.cluster && settings.pusher.key && user?.pusher_id) {
      const pusher = PusherService.getInstance(settings.pusher.key, settings.pusher.cluster);
      pusher.disconnect();
    }
    const supportDiv = document.getElementById('essupport');
    if (supportDiv) {
      supportDiv.setAttribute('data-user-token', '');
    }
    unsetAuthenticated();
    router.push('/');
    window.location.reload();
  };

  const IsUserVerified =
    user?.data.email_verified_at == 0
      ? false
      : user?.data.phone_verified_at == 0
        ? false
        : user?.data.documents_verified_at == 0
          ? false
          : true;
  return (
    <>
      <PageHeader customBackPath="/" title={t('profile')} />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.block}>
            {loadingUser && (
              <div className={styles.loading}>
                <Loader />
              </div>
            )}
            <div className={styles.block_header}>
              <div className={styles.title}>{t('balance')}</div>
              {settings && settings?.currencies?.length > 1 ? (
                <div onClick={() => router.push('/wallet/currencies')} className={styles.side_url}>
                  {user?.balance.currency.toLowerCase()}: {t('change')}
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className={styles.balance}>
              <div className={styles.balance_title}>{t('realAccount')}</div>
              <div className={styles.balance_value}>
                {user?.balance.formatted_balance_real || 0} {user?.balance.currency}
              </div>
            </div>
            <div className={styles.balance}>
              <div className={styles.balance_title}>{t('bonusAccount')}</div>
              <div className={styles.balance_bonus}>
                {user?.balance.formatted_balance_bonus || 0} {user?.balance.currency}
              </div>
            </div>
            <div className={styles.buttons}>
              <Button
                elType="outlined"
                className={styles.button}
                onClick={() => {
                  router.push('/wallet/deposit/withdraw');
                }}
              >
                {t('withdraw')}
              </Button>
              <Button
                className={styles.button}
                onClick={() => {
                  router.push('/wallet/deposit/replenish');
                }}
              >
                {t('refill')}
              </Button>
            </div>
          </div>
          <BonusesItem bonus={activeBonuses[0]} isMain />
          {user?.data.documents_verified_at == 0 && (
            <div className={styles.block}>
              <div className={styles.title}>{t('verifactionDocument')}</div>
              <div
                className={classNames(styles.profile_verification, {
                  [styles.is_not_verificated]: true,
                })}
              >
                {t('documentNoVerified')}
              </div>
              <div className={styles.buttons}>
                <Button className={styles.button} onClick={() => router.push('/profile/document')}>
                  {t('verify')}
                </Button>
              </div>
            </div>
          )}
          <div className={styles.block}>
            {loadingUser && (
              <div className={styles.loading}>
                <Loader />
              </div>
            )}
            <div className={styles.block_header}>
              <div className={styles.title}>{t('personalData')}</div>
              <div onClick={() => router.push('/profile/edit')} className={styles.side_url}>
                {t('edit').toLocaleLowerCase()}
              </div>
            </div>
            <div className={styles.profile}>
              {user?.data.first_name ? (
                <div className={styles.profile_info}>
                  <div className={styles.profile_label}>{t('fullName')}</div>
                  <div className={styles.profile_value}>
                    {user?.data.first_name} {user?.data.last_name}
                  </div>
                </div>
              ) : null}
              {user?.email ? (
                <div className={styles.profile_info}>
                  <div className={styles.profile_label}>{t('email')}</div>
                  <div className={styles.profile_value}>{user?.email}</div>
                </div>
              ) : null}
              {user?.phone ? (
                <div className={styles.profile_info}>
                  <div className={styles.profile_label}>{t('phone')}</div>
                  <div className={styles.profile_value}>{user?.phone}</div>
                </div>
              ) : null}
              {user?.username ? (
                <div className={styles.profile_info}>
                  <div className={styles.profile_label}>{t('username')}</div>
                  <div className={styles.profile_value}>{user?.username}</div>
                </div>
              ) : null}
              <div
                className={classNames(styles.profile_verification, {
                  [styles.is_not_verificated]: !IsUserVerified,
                })}
              >
                {IsUserVerified ? t('playerVerified') : t('playerNoVerified')}
              </div>
            </div>
          </div>
          <Button onClick={logoutHandler}>{t('logOut')}</Button>
        </div>
      </div>
    </>
  );
};

export default Profile;
