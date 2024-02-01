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
import Select from '@/shared/ui/Select';
import { genderSelect } from '../constants/genderSelect';

const ProfileForm = () => {
  const { user, loading } = useAppSelector((state) => state.userReducer);
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState<IUserData>({
    email: '',
    phone: '',
    username: '',
    first_name: '',
    second_name: '',
    last_name: '',
    gender: '',
    dob: 0,
    country: '',
    city: '',
    address: '',
    zip: '',
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
          containerClassName={styles.input}
          placeholder="Электронная почта"
          disabled
          value={userData.email}
        />
        {/* <Button elType="outlined" className={styles.email_button}>
          Подтвердить электронную почту
        </Button> */}
        <Input
          placeholder="Дата рождения"
          type="datetime-local"
          containerClassName={styles.input}
          value={userData.phone}
          onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
        />
        <Input
          placeholder="Телефон"
          type="number"
          containerClassName={styles.input}
          value={userData.phone}
          onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
        />
        <Input
          containerClassName={styles.input}
          placeholder="username"
          value={userData.username}
          onChange={(e) => setUserData((prev) => ({ ...prev, username: e.target.value }))}
        />
        <Select
          optionList={genderSelect}
          value={userData.gender}
          onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
        />
      </div>
      <div className={styles.textarea}>
        <Input
          placeholder="Страна"
          containerClassName={styles.input}
          value={userData.country}
          onChange={(e) => setUserData((prev) => ({ ...prev, country: e.target.value }))}
        />
        <Input
          placeholder="Город"
          containerClassName={styles.input}
          value={userData.city}
          onChange={(e) => setUserData((prev) => ({ ...prev, city: e.target.value }))}
        />
        <Input
          placeholder="Zip"
          containerClassName={styles.input}
          value={userData.zip}
          onChange={(e) => setUserData((prev) => ({ ...prev, zip: e.target.value }))}
        />
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
