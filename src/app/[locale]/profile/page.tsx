'use client';

import GoBackButton from '@/shared/ui/GoBackButton';
import styles from './styles.module.scss';
import SupportButton from '@/shared/ui/SupportButton';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import Button from '@/shared/ui/Button';
import Icons from '@/shared/ui/Icons';
import classNames from 'classnames';
import { useRouter } from '@/shared/hooks/navigation';
import { logout } from '@/store/slices/userSlice';

const Profile = () => {
  const { user } = useAppSelector((store) => store.userReducer);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logoutHandler = () => {
    dispatch(logout());
    router.push('/');
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.back}>
          <GoBackButton />
        </div>
        <div className="header_title">Профиль</div>
        <SupportButton />
      </div>
      <div className={styles.block}>
        <div className={styles.title}>Баланс</div>
        <div className={styles.balance}>
          <div className={styles.balance_title}>Реальный счет</div>
          <div className={styles.balance_value}>
            {user?.balance.balance_real} {user?.balance.currency}
          </div>
        </div>
        <div className={styles.buttons}>
          <Button elType="outlined" className={styles.button}>
            Вывести
          </Button>
          <Button className={styles.button}>Пополнить</Button>
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.title}>Активный бонус</div>
        <div className={styles.balance}>
          <div className={styles.balance_title}>Бонусный счет</div>
          <div className={styles.balance_value}>
            {user?.balance.balance_bonus} {user?.balance.currency}
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
          <div onClick={() => router.push('/profile/edit')}>
            <Icons icon="edit" />
          </div>
        </div>
        <div className={styles.profile}>
          <div className={styles.profile_info}>
            <div className={styles.profile_label}>ФИО</div>
            <div className={styles.profile_value}>
              {user?.data.first_name} {user?.data.last_name}
            </div>
          </div>
          <div className={styles.profile_info}>
            <div className={styles.profile_label}>Электронная почта</div>
            <div className={styles.profile_value}>{user?.email}</div>
          </div>
          <div className={styles.profile_info}>
            <div className={styles.profile_label}>Телефон</div>
            <div className={styles.profile_value}>{user?.phone}</div>
          </div>
          <div className={styles.profile_info}>
            <div className={styles.profile_label}>Адрес</div>
            <div className={styles.profile_value}>{user?.data.address}</div>
          </div>
          <div
            className={classNames(styles.profile_verification, {
              [styles.is_verificated]: user?.data.email_verified_at === 0,
            })}
          >
            {user?.data.email_verified_at === 0 ? 'Игрок не верифицирован' : 'Игрок верифицирован'}
          </div>
        </div>
      </div>
      <Button onClick={logoutHandler}>Выйти из аккаунта</Button>
    </div>
  );
};

export default Profile;
