'use client';

import Input from '@/shared/ui/Input';
import styles from './ProfileForm.module.scss';
import Button from '@/shared/ui/Button';
import Textarea from '@/shared/ui/Textarea';
import { IUserData } from '../models/user';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/shared/hooks/redux';
import { userDataMapper } from '../mapper/userDataMapper';
import Loader from '@/shared/ui/Loader';
import Icons from '@/shared/ui/Icons';

const ProfileForm = () => {
  const { user, loading } = useAppSelector((state) => state.userReducer);
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState<IUserData>({
    first_name: '',
    last_name: '',
    second_name: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (user) {
      setUserData(userDataMapper(user));
    }
  }, [user]);

  const sendData = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setLoader(true);
    } catch (e: unknown) {
      /* empty */
    } finally {
      setLoader(false);
    }
  };

  return (
    <form className={styles.container}>
      {(loading || loader) && (
        <div className={styles.loading}>
          <Loader />
        </div>
      )}

      <div className={styles.user_names}>
        <Input
          containerClassName={styles.input}
          placeholder="Имя"
          value={userData.first_name}
          onChange={(e) => setUserData((prev) => ({ ...prev, first_name: e.target.value }))}
        />
        <Input
          containerClassName={styles.input}
          placeholder="Фамилия"
          value={userData.last_name}
          onChange={(e) => setUserData((prev) => ({ ...prev, last_name: e.target.value }))}
        />
        <Input
          containerClassName={styles.input}
          placeholder="Отчество"
          value={userData.second_name}
          onChange={(e) => setUserData((prev) => ({ ...prev, second_name: e.target.value }))}
        />
      </div>
      <div className={styles.email_container}>
        {user?.data.email_verified_at === 0 && (
          <div className={styles.email_title}>
            <Icons icon="warning" />
            <span>Подтвердите адрес электронной почты, чтобы получить бездепозитный бонус.</span>
          </div>
        )}
        <Input
          type="email"
          className={styles.email}
          placeholder="Электронная почта"
          disabled
          value={userData.email}
        />
        {/* <Button elType="outlined" className={styles.email_button}>
          Подтвердить электронную почту
        </Button> */}
        <Input
          placeholder="Телефон"
          type="number"
          value={userData.phone}
          onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
        />
      </div>
      <div className={styles.textarea}>
        <Textarea
          placeholder="Адрес"
          value={userData.address}
          onChange={(e) => setUserData((prev) => ({ ...prev, address: e.target.value }))}
        />
      </div>

      <Button className={styles.save_button} onClick={(e) => sendData(e)}>
        Сохранить
      </Button>
    </form>
  );
};

export default ProfileForm;
