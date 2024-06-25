import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { IUserData, doSetUserData, sampleIUserData } from '@/app/api/user/setUserData';
import { getVisitorId } from '@/shared/helpers/getVisitorId';
import Loader from '@/shared/ui/Loader';
import Input from '@/shared/ui/Input';
import Icons from '@/shared/ui/Icons';
import Button from '@/shared/ui/Button';
import Select, { ISelectOption } from '@/shared/ui/Select';
import { genderSelect } from '@/app/constants/genders';
import Checkbox from '@/shared/ui/Checkbox';
import { userDataMapper } from '../../helpers/user';
import { ErrorResponseAsString } from '@/app/api/helpers';
import { IResponseError } from '@/shared/models/interfaces/misc';
import { doVerifyEmailSendApi } from '@/app/api/auth/verification/emailSend';
import { useModal } from '@/app/providers/ModalProvider';
import { getUser } from '@/store/slices/userSlice';
import { doVerifyPhoneSendApi } from '@/app/api/auth/verification/phoneSend';
import { getCountries } from '@/store/slices/countriesSlice';
import DatePicker from '@/shared/ui/DatePicker';
import { AlertModal, IAlert } from '@/entities/AlertModal';

const ProfileForm = () => {
  const { user, loading: loadingUser } = useAppSelector((state) => state.userReducer);
  const { settings } = useAppSelector((state) => state.settingsReducer);
  // const settings = {
  //   profile: {
  //     user_can_change_data: true,
  //     has_email: true,
  //     has_phone: true,
  //     has_username: true,
  //     has_first_name: true,
  //     has_second_name: true,
  //     has_last_name: true,
  //     has_country: true,
  //     has_city: true,
  //     has_address: true,
  //     has_zip: true,
  //     has_dob: true,
  //     has_gender: true,
  //     has_avatar: true,
  //     has_promo: true,
  //   },
  // };
  const { doSetVerifyHash, doSetChangeHash, doOpenModal, doCloseModals } = useModal();
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState<IUserData>(sampleIUserData);
  const [errorData, setErrorData] = useState<IResponseError>();
  const [alertData, setAlertData] = useState<IAlert>({
    title: '',
    text: '',
    buttons: [],
    close: doCloseModals,
  });
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

  const sendData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setLoader(true);
      const fid = await getVisitorId();
      const data = await doSetUserData({
        ...userData,
        dob: Math.floor(new Date(userData.dob).getTime() / 1000),
        fid,
      });
      if (data.hasErrors) {
        setErrorData({
          errors: data.errors,
          success: true,
        });
      }

      if (data.email_change_hash) {
        doCloseModals();
        doSetChangeHash(data.email_change_hash);
        doOpenModal('change-email');
      } else if (data.phone_change_hash) {
        doCloseModals();
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
      doCloseModals();
      setLoader(false);
    }
  };

  const verifyEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (userData.email === '') {
      doOpenModal('alert');
      setAlertData((prev) => ({
        ...prev,
        text: 'Сначала надо сохранить данные, а потом уже их верифицировать!',
        title: 'Предупреждение',
        buttons: [
          {
            text: 'Ок',
            type: 'contained',
            onClick: doCloseModals,
          },
        ],
      }));
      return;
    }
    if (userData.email !== user?.email) {
      doOpenModal('alert');
      setAlertData((prev) => ({
        ...prev,
        text: 'Вы изменили email, сохранить новый? Или вы хотите подтвердить старый?',
        title: 'Предупреждение',
        buttons: [
          {
            text: 'Сохранить',
            type: 'contained',
            onClick: () => void sendData(e),
          },
          {
            text: 'Подтвердить',
            type: 'outlined',
            onClick: () => void sendVerifyEmail(e),
          },
        ],
      }));
    } else {
      void sendVerifyEmail(e);
    }
  };

  const sendVerifyEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
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

  const sendVerifyPhone = async (e: React.MouseEvent<HTMLButtonElement>) => {
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

  const verifyPhone = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (userData.phone == '') {
      doOpenModal('alert');
      setAlertData((prev) => ({
        ...prev,
        text: 'Сначала надо сохранить данные, а потом уже их верифицировать!',
        title: 'Предупреждение',
        buttons: [
          {
            text: 'Ок',
            type: 'contained',
            onClick: doCloseModals,
          },
        ],
      }));
      return;
    }
    e.preventDefault();
    if (userData.phone !== user?.phone) {
      doOpenModal('alert');
      setAlertData((prev) => ({
        ...prev,
        text: 'Вы изменили телефон, сохранить новый? Или вы хотите подтвердить старый?',
        title: 'Предупреждение',
        buttons: [
          {
            text: 'Сохранить',
            type: 'contained',
            onClick: () => void sendData(e),
          },
          {
            text: 'Подтвердить',
            type: 'outlined',
            onClick: () => void sendVerifyPhone(e),
          },
        ],
      }));
    } else {
      void sendVerifyPhone(e);
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
            type="phone"
            containerClassName={styles.input}
            placeholder="Номер телефона"
            disabled={!settings?.profile.user_can_change_data && !!user?.phone}
            readOnly={!settings?.profile.user_can_change_data && !!user?.phone}
            value={userData.phone}
            onChangePhone={(phone) => setUserData((prev) => ({ ...prev, phone: phone }))}
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
        <DatePicker
          containerClassName={styles.input}
          selected={new Date(userData.dob)}
          onChange={(date) => {
            setUserData((prev) => ({ ...prev, dob: date.getTime() }));
          }}
          isError={!!errorData?.errors['dob']}
          message={ErrorResponseAsString('dob', 'Введите корректный dob', errorData)}
          placeholder="Дата рождения"
        />
        // <Input
        //   placeholder="Дата рождения"
        //   type="datepicker"
        //   containerClassName={styles.input}
        //   value={userData.dob}
        //   disabled={!settings?.profile.user_can_change_data && !!user?.data.dob}
        //   readOnly={!settings?.profile.user_can_change_data && !!user?.data.dob}
        //   onChange={(e) => {
        //     setUserData((prev) => ({ ...prev, dob: e.target.value }));
        //   }}
        //   isError={!!errorData?.errors['dob']}
        //   message={ErrorResponseAsString('dob', 'Введите корректный dob', errorData)}
        // />
      )}
      {settings?.profile.has_gender && (
        <Select
          containerClassName={styles.input}
          optionList={genderSelect}
          value={userData.gender}
          disabled={!settings?.profile.user_can_change_data && !!user?.data.gender}
          onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
          isError={!!errorData?.errors['gender']}
        />
      )}
      {settings?.profile.has_country && (
        <Select
          isError={!!errorData?.errors['country']}
          optionList={countriesList}
          value={userData.country}
          containerClassName={styles.input}
          message={ErrorResponseAsString('second_name', 'Укажите страну из списка', errorData)}
          onChange={(e) => setUserData((prev) => ({ ...prev, country: e.target.value }))}
        />
      )}
      {settings?.profile.has_city && (
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
      )}
      {settings?.profile.has_address && (
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
      )}
      {settings?.profile.has_zip && (
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
      )}
      {settings?.profile.has_promo && (
        <div className={styles.checkbox}>
          <Checkbox
            value={userData.promo}
            label="Разрешить присылать промоакции"
            onChange={(val) => setUserData((prev) => ({ ...prev, promo: val }))}
          />
        </div>
      )}
      <AlertModal {...alertData} />
      <Button className={styles.save_button} onClick={(e) => void sendData(e)}>
        Сохранить
      </Button>
    </form>
  );
};

export default ProfileForm;
