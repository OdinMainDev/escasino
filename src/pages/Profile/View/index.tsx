import classNames from 'classnames';

import styles from './styles.module.scss';
import { useAppSelector } from '@/store/hooks/redux';
import { useRouter } from '@/shared/helpers/navigation';
import { useAuthProvider } from '@/app/providers/AuthProvider';
import GoBackButton from '@/shared/components/GoBackButton';
import Button from '@/shared/components/Button';

const Profile = () => {
  const { user } = useAppSelector((state) => state.userReducer);
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
          <GoBackButton />
        </div>
        <div className="header_title">Профиль</div>
        {/* <SupportButton /> */}
      </div>
      <div className={styles.block}>
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
            {user?.balance.balance_real} {user?.balance.currency}
          </div>
        </div>
        <div className={styles.balance}>
          <div className={styles.balance_title}>Бонусный счет</div>
          <div className={styles.balance_bonus}>
            {user?.balance.balance_bonus} {user?.balance.currency}
          </div>
        </div>
        <div className={styles.buttons}>
          <Button elType="outlined" className={styles.button}>
            Вывести
          </Button>
          <Button
            className={styles.button}
            onClick={() => {
              router.push('/wallet/deposit');
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
          ) : (
            <div></div>
          )}
          {user?.email ? (
            <div className={styles.profile_info}>
              <div className={styles.profile_label}>Электронная почта</div>
              <div className={styles.profile_value}>{user?.email}</div>
            </div>
          ) : (
            <div></div>
          )}
          {user?.phone ? (
            <div className={styles.profile_info}>
              <div className={styles.profile_label}>Телефон</div>
              <div className={styles.profile_value}>{user?.phone}</div>
            </div>
          ) : (
            <div></div>
          )}
          {user?.username ? (
            <div className={styles.profile_info}>
              <div className={styles.profile_label}>Username</div>
              <div className={styles.profile_value}>{user?.username}</div>
            </div>
          ) : (
            <div></div>
          )}
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
