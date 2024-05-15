import classNames from 'classnames';

import styles from './styles.module.scss';
import { useAppSelector } from '@/store/hooks/redux';
import { useRouter } from '@/shared/helpers/navigation';
import { useAuthProvider } from '@/app/providers/AuthProvider';
import GoBackButton from '@/shared/ui/GoBackButton';
import Button from '@/shared/ui/Button';
import Loader from '@/shared/ui/Loader';

const Profile = () => {
  const { user, loading: loadingUser } = useAppSelector((state) => state.userReducer);
  const { settings } = useAppSelector((state) => state.settingsReducer);
  const router = useRouter();
  const { unsetAuthenticated } = useAuthProvider();

  const logoutHandler = () => {
    unsetAuthenticated();
    router.push('/');
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
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.back}>
          <GoBackButton customPath="/" />
        </div>
        <div className="header_title">Профиль</div>
        {/* <SupportButton /> */}
      </div>
      <div className={styles.block}>
        {loadingUser && (
          <div className={styles.loading}>
            <Loader />
          </div>
        )}
        <div className={styles.block_header}>
          <div className={styles.title}>Баланс</div>
          {settings && settings?.currencies?.length > 1 ? (
            <div onClick={() => router.push('/wallet/currencies')} className={styles.side_url}>
              {user?.balance.currency}: сменить
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className={styles.balance}>
          <div className={styles.balance_title}>Реальный счет</div>
          <div className={styles.balance_value}>
            {Number(user?.balance.balance_real) / 100 || 0} {user?.balance.currency}
          </div>
        </div>
        <div className={styles.balance}>
          <div className={styles.balance_title}>Бонусный счет</div>
          <div className={styles.balance_bonus}>
            {user?.balance.balance_bonus || 0} {user?.balance.currency}
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
            Вывести
          </Button>
          <Button
            className={styles.button}
            onClick={() => {
              router.push('/wallet/deposit/replenish');
            }}
          >
            Пополнить
          </Button>
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.block_header}>
          <div className={styles.title}>Активный бонус</div>
          <div onClick={() => router.push('/profile/edit')} className={styles.side_url}>
            смотреть
          </div>
        </div>
        <div className={styles.balance}>
          <div className={styles.balance_title}>Вейджер {user?.balance.formatted_wager}</div>
          <div className={styles.balance_value}>{user?.balance.formatted_wager}</div>
        </div>
        <div className={styles.buttons}>
          <Button elType="outlined" className={styles.button}>
            Отказаться от бонуса
          </Button>
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.title}>Документы</div>
        <div
          className={classNames(styles.profile_verification, {
            [styles.is_verificated]: !IsUserVerified,
          })}
        >
          {IsUserVerified ? 'Документы верифицирован' : 'Документы не верифицирован'}
        </div>
        <div className={styles.buttons}>
          <Button
            elType="outlined"
            className={styles.button}
            onClick={() => router.push('/profile/document')}
          >
            Посмотреть документ
          </Button>
        </div>
      </div>
      <div className={styles.block}>
        {loadingUser && (
          <div className={styles.loading}>
            <Loader />
          </div>
        )}
        <div className={styles.block_header}>
          <div className={styles.title}>Персональные данные</div>
          <div onClick={() => router.push('/profile/edit')} className={styles.side_url}>
            редактировать
          </div>
        </div>
        <div className={styles.profile}>
          {user?.data.first_name ? (
            <div className={styles.profile_info}>
              <div className={styles.profile_label}>ФИО</div>
              <div className={styles.profile_value}>
                {user?.data.first_name} {user?.data.last_name}
              </div>
            </div>
          ) : null}
          {user?.email ? (
            <div className={styles.profile_info}>
              <div className={styles.profile_label}>Электронная почта</div>
              <div className={styles.profile_value}>{user?.email}</div>
            </div>
          ) : null}
          {user?.phone ? (
            <div className={styles.profile_info}>
              <div className={styles.profile_label}>Телефон</div>
              <div className={styles.profile_value}>{user?.phone}</div>
            </div>
          ) : null}
          {user?.username ? (
            <div className={styles.profile_info}>
              <div className={styles.profile_label}>Username</div>
              <div className={styles.profile_value}>{user?.username}</div>
            </div>
          ) : null}
          <div
            className={classNames(styles.profile_verification, {
              [styles.is_verificated]: !IsUserVerified,
            })}
          >
            {IsUserVerified ? 'Игрок верифицирован' : 'Игрок не верифицирован'}
          </div>
        </div>
      </div>
      <Button onClick={logoutHandler}>Выйти из аккаунта</Button>
    </div>
  );
};

export default Profile;
