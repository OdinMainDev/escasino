import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { IUserData, doSetUserData, sampleIUserData } from '@/app/api/user/setUserData';
import { getVisitorId } from '@/shared/helpers/getVisitorId';
import Loader from '@/shared/components/Loader';
import Input from '@/shared/components/Input';
import Icons from '@/shared/components/Icons';
import Button from '@/shared/components/Button';
import Select, { ISelectOption } from '@/shared/components/Select';
import { genderSelect } from '@/app/constants/genders';
import Checkbox from '@/shared/components/Checkbox';
import { userDataMapper } from '../../helpers/user';
import { ErrorResponseAsString } from '@/app/api/helpers';
import { IResponseError } from '@/entities/misc';
import { doVerifyEmailSendApi } from '@/app/api/auth/verification/emailSend';
import { useModal } from '@/app/providers/ModalProvider';
import { getUser } from '@/store/slices/userSlice';
import { doVerifyPhoneSendApi } from '@/app/api/auth/verification/phoneSend';
import { getCountries } from '@/store/slices/countriesSlice';

const ProfileForm = () => {
  const { user, loading: loadingUser } = useAppSelector((state) => state.userReducer);
  const { settings } = useAppSelector((state) => state.settingsReducer);
  const { doSetVerifyHash, doSetChangeHash, doOpenModal } = useModal();
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState<IUserData>(sampleIUserData);
  const [errorData, setErrorData] = useState<IResponseError>();
  const {
    isFinished: isFinishedCountries,
    loading: loadingCountries,
    countries,
  } = useAppSelector((state) => state.countriesReducer);
  const dispatch = useAppDispatch();
  if (!loadingCountries && !isFinishedCountries) {
    void dispatch(getCountries());
  }

  let countriesList: ISelectOption[] = [];

  if (countries.length == 0) {
    countriesList = [{ value: '', label: 'Загрузка стран', disabled: true }];
  } else if (countries.length == 1) {
    countriesList = [{ value: countries[0], label: countries[0], disabled: false }];
  } else {
    countriesList = [
      { value: '', label: 'Ваша страна', disabled: true },
      ...countries.map((item) => ({ label: item, value: item })),
    ];
  }

  useEffect(() => {
    if (user) {
      setUserData(userDataMapper(user));
    }
  }, [user]);

  // TODO поправить отображение ошибок тут
  const sendData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setLoader(true);
      const fid = await getVisitorId();
      // const formattedDate = formatDateType(typeof userData.dob === 'number' ? userData.dob : 0);
      if (typeof userData.dob !== 'number') {
        const inputDate = new Date(userData.dob);
        const timestamp = Math.floor(inputDate.getTime() / 1000);
        userData.dob = timestamp;
      }
      const data = await doSetUserData({
        ...userData,
        dob: userData.dob, // почему то та что отправляется != той что устанавливается
        fid,
      });
      // TODO поправить отображение ошибок и тут ( обводиться но не пишется ошибка )
      if (data.hasErrors) {
        setErrorData({
          errors: data.errors,
          success: true,
        });
      }

      // Делаем так чтобы 2 модалки не открылось одновременно
      if (data.email_change_hash) {
        doSetChangeHash(data.email_change_hash);
        doOpenModal('change-email');
      } else if (data.phone_change_hash) {
        doSetChangeHash(data.phone_change_hash);
        doOpenModal('change-phone');
      }

      void dispatch(getUser());
    } catch (e: unknown) {
      const loginError = e as IResponseError;
      const loginErrorList = Object.keys(loginError.errors);
      if (!Array.isArray(loginErrorList)) {
        return;
      }
      setErrorData(loginError);
    } finally {
      setLoader(false);
    }
  };

  const verifyEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // TODO: сделать красивую модалку под проверку, или алерт
    if (userData.email == '') {
      alert('Сначала надо сохранить данные, а потом уже их верифицировать!');
      return;
    }
    e.preventDefault();
    if (userData.email != user?.email) {
      // TODO: сделать сюда красивую модалку
      if (confirm('Вы изменили email, сохранить новый? Или вы хотите подтвердить старый?')) {
        // TODO: наверное сюда не очень хорошо отправлять этот 'e' но может и похуй, проверить стоит

        // TODO: так же сделать проверку на то что в ответе нет ошибок,
        // ( если почта занята то будет 200ый ответ но в нем внутри ошибки, так как остальные данные заменяются )
        void sendData(e);
      }
    }
    try {
      e.preventDefault();
      setLoader(true);
      const fid = await getVisitorId();
      const data = await doVerifyEmailSendApi({ fid });
      doSetVerifyHash(data.hash);
      doOpenModal('verification-email');
    } catch (e: unknown) {
      /* empty */
    } finally {
      setLoader(false);
    }
  };

  const verifyPhone = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // TODO: сделать красивую модалку под проверку, или алерт
    if (userData.phone == '') {
      alert('Сначала надо сохранить данные, а потом уже их верифицировать!');
      return;
    }
    e.preventDefault();
    if (userData.phone != user?.phone) {
      // TODO: сделать сюда красивую модалку
      if (confirm('Вы изменили телефон, сохранить новый? Или вы хотите подтвердить старый?')) {
        // TODO: наверное сюда не очень хорошо отправлять этот 'e' но может и похуй, проверить стоит

        // TODO: так же сделать проверку на то что в ответе нет ошибок,
        // ( если почта занята то будет 200ый ответ но в нем внутри ошибки, так как остальные данные заменяются )
        void sendData(e);
      }
    }
    try {
      e.preventDefault();
      setLoader(true);
      const fid = await getVisitorId();
      const data = await doVerifyPhoneSendApi({ fid });
      doSetVerifyHash(data.hash);
      doOpenModal('verification-phone');
    } catch (e: unknown) {
      /* empty */
    } finally {
      setLoader(false);
    }
  };

  return (
    <form className={styles.container}>
      {loadingUser || loader ? (
        <div className={styles.loading}>
          <Loader />
        </div>
      ) : (
        <div></div>
      )}

      <div className={styles.user_names}>
        {settings?.profile.has_username && (
          <Input
            containerClassName={styles.input}
            placeholder="Username"
            value={userData.username}
            onChange={(e) => setUserData((prev) => ({ ...prev, username: e.target.value }))}
            disabled={!settings?.profile.user_can_change_data && !!user?.username}
            readOnly={!settings?.profile.user_can_change_data && !!user?.username}
            isError={!!errorData?.errors['username']}
            message={ErrorResponseAsString('username', 'Введите корректный username', errorData)}
          />
        )}
        {settings?.profile.has_last_name && (
          <Input
            containerClassName={styles.input}
            placeholder="Фамилия"
            value={userData.last_name}
            onChange={(e) => setUserData((prev) => ({ ...prev, last_name: e.target.value }))}
            disabled={!settings?.profile.user_can_change_data && !!user?.data.last_name}
            readOnly={!settings?.profile.user_can_change_data && !!user?.data.last_name}
            isError={!!errorData?.errors['last_name']}
            message={ErrorResponseAsString('last_name', 'Введите корректный last_name', errorData)}
          />
        )}
        {settings?.profile.has_first_name && (
          <Input
            containerClassName={styles.input}
            placeholder="Имя"
            value={userData.first_name}
            onChange={(e) => setUserData((prev) => ({ ...prev, first_name: e.target.value }))}
            disabled={!settings?.profile.user_can_change_data && !!user?.data.first_name}
            readOnly={!settings?.profile.user_can_change_data && !!user?.data.first_name}
            isError={!!errorData?.errors['first_name']}
            message={ErrorResponseAsString(
              'first_name',
              'Введите корректный first_name',
              errorData,
            )}
          />
        )}
        {settings?.profile.has_second_name && (
          <Input
            containerClassName={styles.input}
            placeholder="Отчество"
            value={userData.second_name}
            onChange={(e) => setUserData((prev) => ({ ...prev, second_name: e.target.value }))}
            disabled={!settings?.profile.user_can_change_data && !!user?.data.second_name}
            readOnly={!settings?.profile.user_can_change_data && !!user?.data.second_name}
            isError={!!errorData?.errors['second_name']}
            message={ErrorResponseAsString(
              'second_name',
              'Введите корректный second_name',
              errorData,
            )}
          />
        )}
      </div>
      {settings?.profile.has_email && (
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
            disabled={!settings?.profile.user_can_change_data && !!user?.email}
            readOnly={!settings?.profile.user_can_change_data && !!user?.email}
            value={userData.email}
            onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))}
            isError={!!errorData?.errors['email']}
            message={ErrorResponseAsString('email', 'Введите корректный email', errorData)}
          />
          {!user?.data.email_verified_at && (
            <Button
              elType="outlined"
              className={styles.email_button}
              onClick={(e) => void verifyEmail(e)}
              type="button"
            >
              Подтвердить электронную почту
            </Button>
          )}
        </div>
      )}
      {settings?.profile.has_phone && (
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
            disabled={!settings?.profile.user_can_change_data && !!user?.phone}
            readOnly={!settings?.profile.user_can_change_data && !!user?.phone}
            value={userData.phone}
            onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
            isError={!!errorData?.errors['phone']}
            message={ErrorResponseAsString('phone', 'Введите корректный phone', errorData)}
          />
          {!user?.data.phone_verified_at && (
            <Button
              elType="outlined"
              className={styles.email_button}
              onClick={(e) => void verifyPhone(e)}
              type="button"
            >
              Подтвердить телефон
            </Button>
          )}
        </div>
      )}

      {settings?.profile.has_dob && (
        <Input
          placeholder="Дата рождения"
          type="datetime-local"
          containerClassName={styles.input}
          value={userData.dob}
          disabled={!settings?.profile.user_can_change_data && !!user?.data.dob}
          readOnly={!settings?.profile.user_can_change_data && !!user?.data.dob}
          onChange={(e) => {
            setUserData((prev) => ({ ...prev, dob: e.target.value }));
          }}
          isError={!!errorData?.errors['dob']}
          message={ErrorResponseAsString('dob', 'Введите корректный dob', errorData)}
        />
      )}
      {settings?.profile.has_gender && (
        <div>
          <Select
            optionList={genderSelect}
            value={userData.gender}
            disabled={!settings?.profile.user_can_change_data && !!user?.data.gender}
            onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
            isError={!!errorData?.errors['gender']}
          />
        </div>
      )}
      {settings?.profile.has_country && (
        <div className={styles.textarea}>
          <Select
            isError={!!errorData?.errors['country']}
            optionList={countriesList}
            value={userData.country}
            // containerClassName={styles.input} // TODO
            // message={ErrorResponseAsString('second_name', 'Укажите страну из списка', errorData)} // TODO
            onChange={(e) => setUserData((prev) => ({ ...prev, country: e.target.value }))}
          />
        </div>
      )}
      {settings?.profile.has_city && (
        <div className={styles.textarea}>
          <Input
            placeholder="Город"
            containerClassName={styles.input}
            value={userData.city}
            disabled={!settings?.profile.user_can_change_data && !!user?.data.city}
            readOnly={!settings?.profile.user_can_change_data && !!user?.data.city}
            onChange={(e) => setUserData((prev) => ({ ...prev, city: e.target.value }))}
            isError={!!errorData?.errors['city']}
            message={ErrorResponseAsString('city', 'Введите корректный city', errorData)}
          />
        </div>
      )}
      {settings?.profile.has_address && (
        <div className={styles.textarea}>
          <Input
            placeholder="Адрес"
            containerClassName={styles.input}
            value={userData.address}
            disabled={!settings?.profile.user_can_change_data && !!user?.data.address}
            readOnly={!settings?.profile.user_can_change_data && !!user?.data.address}
            onChange={(e) => setUserData((prev) => ({ ...prev, address: e.target.value }))}
            isError={!!errorData?.errors['address']}
            message={ErrorResponseAsString('address', 'Введите корректный address', errorData)}
          />
        </div>
      )}
      {settings?.profile.has_zip && (
        <div className={styles.textarea}>
          <Input
            placeholder="Почтовый индекс"
            containerClassName={styles.input}
            value={userData.zip}
            disabled={!settings?.profile.user_can_change_data && !!user?.data.zip}
            readOnly={!settings?.profile.user_can_change_data && !!user?.data.zip}
            onChange={(e) => setUserData((prev) => ({ ...prev, zip: e.target.value }))}
            isError={!!errorData?.errors['zip']}
            message={ErrorResponseAsString('zip', 'Введите корректный zip', errorData)}
          />
        </div>
      )}
      {settings?.profile.has_promo && (
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
