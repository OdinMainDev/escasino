'use client';

import Input from '@/shared/ui/Input';
import styles from './ProfileForm.module.scss';
import Button from '@/shared/ui/Button';
import Checkbox from '@/shared/ui/Checkbox';
import { IUserData } from '../models/user';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { formatDateType, userDataMapper } from '../mapper/userDataMapper';
import Loader from '@/shared/ui/Loader';
import Icons from '@/shared/ui/Icons';
import Select from '@/shared/ui/Select';
import { genderSelect } from '../constants/genderSelect';
import { editProfileHandlerApi } from '../api/profile';
// import { verificationEmailHandlerApi } from '../api/verifyEmail';
import { getVisitorId } from '@/features/AuthForm/helpers/getVisitorId';
import { getMeUser } from '@/store/slices/userSlice';

const ProfileForm = () => {
  const { user, loading } = useAppSelector((state) => state.userReducer);
  // TODO: исправить настройки
  const { settings, loading: loadingSettings } = useAppSelector((state) => state.settingsReducer);
  const [loader, setLoader] = useState(false);
  const dispatch = useAppDispatch();
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
    fid: '',
    promo: true,
  });

  useEffect(() => {
    if (user) {
      setUserData(userDataMapper(user));
    }
  }, [user]);

  if (user?.balance.currency == '') {
    // TODO: тут нужно сделать обновление user так как после регистрации он может долго регистрироваться
    // пока у него не будет баланса то тут надо держать лоадер и обновлять юзера
    return;
  }

  const sendData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setLoader(true);
      const fid = await getVisitorId();
      const formattedDate = formatDateType(typeof userData.dob === 'number' ? userData.dob : 0);
      await editProfileHandlerApi({
        ...userData,
        dob: new Date(formattedDate).getTime(),
        fid,
      });
      await dispatch(getMeUser());
    } catch (e: unknown) {
      /* empty */
    } finally {
      setLoader(false);
    }
  };

  // const verifyEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   try {
  //     e.preventDefault();
  //     setLoader(true);
  //     const fid = await getVisitorId();
  //     const resp = await verificationEmailHandlerApi({ fid });
  //     console.log(resp);
  //     console.log(resp?.hash);

  //     // TODO: затем мы открываем модалку подтвердите адрес электронной почты
  //     // открываем его но там еще должен быть инпут введите код из почтового письма
  //     // мы должны отправить код с хешем  ( console.log(resp?.hash))
  //   } catch (e: unknown) {
  //     /* empty */
  //   } finally {
  //     setLoader(false);
  //   }
  // };

  return (
    <form className={styles.container}>
      {(loading || loadingSettings || loader) && (
        <div className={styles.loading}>
          <Loader />
        </div>
      )}

      <div className={styles.user_names}>
        {settings?.profile.has_username ?? (
          <Input
            containerClassName={styles.input}
            placeholder="Username"
            value={userData.username}
            onChange={(e) => setUserData((prev) => ({ ...prev, username: e.target.value }))}
            disabled={settings?.profile.user_can_change_data && userData.username != ''}
            readOnly={settings?.profile.user_can_change_data && userData.username != ''}
          />
        )}
        {settings?.profile.has_last_name ?? (
          <Input
            containerClassName={styles.input}
            placeholder="Фамилия"
            value={userData.last_name}
            onChange={(e) => setUserData((prev) => ({ ...prev, last_name: e.target.value }))}
            disabled={settings?.profile.user_can_change_data && userData.last_name != ''}
            readOnly={settings?.profile.user_can_change_data && userData.last_name != ''}
          />
        )}
        {settings?.profile.has_first_name ?? (
          <Input
            containerClassName={styles.input}
            placeholder="Имя"
            value={userData.first_name}
            onChange={(e) => setUserData((prev) => ({ ...prev, first_name: e.target.value }))}
            disabled={settings?.profile.user_can_change_data && userData.first_name != ''}
            readOnly={settings?.profile.user_can_change_data && userData.first_name != ''}
          />
        )}
        {settings?.profile.has_second_name ?? (
          <Input
            containerClassName={styles.input}
            placeholder="Отчество"
            value={userData.second_name}
            onChange={(e) => setUserData((prev) => ({ ...prev, second_name: e.target.value }))}
            disabled={settings?.profile.user_can_change_data && userData.second_name != ''}
            readOnly={settings?.profile.user_can_change_data && userData.second_name != ''}
          />
        )}
      </div>
      {settings?.profile.has_email ?? (
        <div className={styles.email_container}>
          {!user?.data.email_verified_at && (
            <div className={styles.email_title}>
              <Icons icon="warning" />
              {!user?.data.phone_verified_at ? (
                <span>
                  Подтвердите адрес электронной почты, чтобы получить бездепозитный бонус.
                </span>
              ) : (
                <span>Подтвердите адрес электронной почты.</span>
              )}
            </div>
          )}
          <Input
            type="email"
            containerClassName={styles.input}
            placeholder="Электронная почта"
            disabled={settings?.profile.user_can_change_data && userData.email != ''}
            readOnly={settings?.profile.user_can_change_data && userData.email != ''}
            value={userData.email}
            onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))}
          />
          {/* ПРИ НАЖАТИИ ПРОВЕРЯЕТ НА ТО ИЗМЕНЕНО ИЛИ НЕТ ТЕКУЩЕЕ ПОЛЕ И ПОТОМ ОТКРЫВАЕТ МОДАЛКУ */}
          <Button
            elType="outlined"
            className={styles.email_button}
            // onClick={verifyEmail}
            type="button"
          >
            Подтвердить электронную почту
          </Button>
        </div>
      )}
      {settings?.profile.has_phone ?? (
        <div className={styles.email_container}>
          {user?.data.phone_verified_at === 0 && (
            <div className={styles.email_title}>
              <Icons icon="warning" />
              {user?.data.email_verified_at === 0 ? (
                <span>Подтвердите номер телефона, чтобы получить бездепозитный бонус.</span>
              ) : (
                <span>Подтвердите номер телефона.</span>
              )}
            </div>
          )}
          <Input
            type="text"
            containerClassName={styles.input}
            placeholder="Номер телефона"
            disabled={settings?.profile.user_can_change_data && userData.phone != ''}
            readOnly={settings?.profile.user_can_change_data && userData.phone != ''}
            value={userData.phone}
            onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
          />
          {/* ПРИ НАЖАТИИ ПРОВЕРЯЕТ НА ТО ИЗМЕНЕНО ИЛИ НЕТ ТЕКУЩЕЕ ПОЛЕ И ПОТОМ ОТКРЫВАЕТ МОДАЛКУ */}
          <Button
            elType="outlined"
            className={styles.email_button}
            // onClick={verifyEmail}
            type="button"
          >
            Подтвердить телефон
          </Button>
        </div>
      )}

      {settings?.profile.has_dob ?? (
        <Input
          placeholder="Дата рождения"
          type="datetime-local"
          containerClassName={styles.input}
          value={userData.dob}
          disabled={settings?.profile.user_can_change_data && userData.dob != 0}
          readOnly={settings?.profile.user_can_change_data && userData.dob != 0}
          onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
        />
      )}
      {settings?.profile.has_gender ?? (
        <div>
          <Select
            optionList={genderSelect}
            value={userData.gender}
            disabled={settings?.profile.user_can_change_data && userData.gender != ''}
            onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
          />
          <br />
          <br />
        </div>
      )}
      {settings?.profile.has_country ?? (
        <div className={styles.textarea}>
          <Input
            placeholder="Страна"
            containerClassName={styles.input}
            value={userData.country}
            disabled={settings?.profile.user_can_change_data && userData.country != ''}
            readOnly={settings?.profile.user_can_change_data && userData.country != ''}
            onChange={(e) => setUserData((prev) => ({ ...prev, country: e.target.value }))}
          />
        </div>
      )}
      {settings?.profile.has_city ?? (
        <div className={styles.textarea}>
          <Input
            placeholder="Город"
            containerClassName={styles.input}
            value={userData.city}
            disabled={settings?.profile.user_can_change_data && userData.city != ''}
            readOnly={settings?.profile.user_can_change_data && userData.city != ''}
            onChange={(e) => setUserData((prev) => ({ ...prev, city: e.target.value }))}
          />
        </div>
      )}
      {settings?.profile.has_address ?? (
        <div className={styles.textarea}>
          <Input
            placeholder="Адрес"
            containerClassName={styles.input}
            value={userData.address}
            disabled={settings?.profile.user_can_change_data && userData.address != ''}
            readOnly={settings?.profile.user_can_change_data && userData.address != ''}
            onChange={(e) => setUserData((prev) => ({ ...prev, address: e.target.value }))}
          />
        </div>
      )}
      {settings?.profile.has_zip ?? (
        <div className={styles.textarea}>
          <Input
            placeholder="Почтовый индекс"
            containerClassName={styles.input}
            value={userData.zip}
            disabled={settings?.profile.user_can_change_data && userData.zip != ''}
            readOnly={settings?.profile.user_can_change_data && userData.zip != ''}
            onChange={(e) => setUserData((prev) => ({ ...prev, zip: e.target.value }))}
          />
        </div>
      )}
      {settings?.profile.has_promo ?? (
        <div className={styles.textarea}>
          <Checkbox
            value={userData.promo}
            onChange={(val) => setUserData((prev) => ({ ...prev, promo: val }))}
          />
          <div>Разрешить присылать промоакции</div>
        </div>
      )}

      <Button className={styles.save_button} onClick={(e) => void sendData(e)}>
        Сохранить
      </Button>
    </form>
  );
};

export default ProfileForm;
