import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import styles from './Form.module.scss';
import { FB, OK, Telegram, Twitter, VK } from '../Icons';
import {
  validateEmail,
  validatePasswordLength,
  validatePasswordMatching,
  validatePhone,
  validateRegister,
} from '@/features/Auth/helpers/validators';

import Loader from '@/shared/ui/Loader';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import { useAuthProvider } from '@/app/providers/AuthProvider';
import { useModal } from '@/app/providers/ModalProvider';
import Checkbox from '@/shared/ui/Checkbox';
import { getVisitorId } from '@/shared/helpers/getVisitorId';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { IRegisterData, doRegisterApi, sampleIRegisterData } from '@/app/api/auth/doRegister';
import { Link } from 'react-router-dom';
import Select, { ISelectOption } from '@/shared/ui/Select';
import { isAppDebug } from '@/app/config/app';
import classNames from 'classnames';
import { getCountries } from '@/store/slices/countriesSlice';
import { genderSelect } from '@/app/constants/genders';
import { IResponseError } from '@/shared/models/interfaces/misc';
import { ErrorResponseAsString } from '@/app/api/helpers';
import Tabs from '@/entities/Tabs';

interface IProps {
  openLoginModal: () => void;
}

const AuthRegisterForm = ({ openLoginModal }: IProps) => {
  const { settings, loading: loadingSettings } = useAppSelector((state) => state.settingsReducer);
  const { isAuth, setAuthenticated } = useAuthProvider();
  const { doCloseModals } = useModal();
  const [loader, setLoader] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<IResponseError>();
  const [registerData, setRegisterData] = useState<IRegisterData>(sampleIRegisterData);
  const [selectedType, setSelectedType] = useState('email');

  const {
    isFinished: isFinishedCountries,
    loading: loadingCountries,
    countries,
  } = useAppSelector((state) => state.countriesReducer);
  const dispatch = useAppDispatch();
  if (!loadingCountries && !isFinishedCountries) {
    void dispatch(getCountries());
  }
  const formType =
    settings?.auth.register.phone && settings?.auth.register.email
      ? 'full'
      : settings?.auth.register.phone
        ? 'phone'
        : 'email';
  const hasSocials =
    settings?.auth.social_vk ||
    settings?.auth.social_ok ||
    settings?.auth.social_fb ||
    settings?.auth.social_tg ||
    settings?.auth.social_tw;
  const hasUsername = settings?.auth.register.username;
  const hasFullName = settings?.auth.register.full_name;
  const hasCity = settings?.auth.register.city;
  const hasDob = settings?.auth.register.dob;
  const hasAddress = settings?.auth.register.address;
  const hasGender = settings?.auth.register.gender;
  const hasPromo = settings?.auth.register.promo;

  const isFastAuth = settings?.auth.register.use_fast_auth;

  // OVERRIDE FOR TESTS
  // const formType = 'full';
  // const hasSocials = false;
  // const hasUsername = true;
  // const hasFullName = true;
  // const hasCity = true;
  // const hasDob = true;
  // const hasAddress = true;
  // const hasGender = true;
  // const hasPromo = true;

  let currenciesList: ISelectOption[] = [{ value: 'PLN', label: 'PLN', disabled: false }];

  if (!settings || settings.currencies.length == 0) {
    currenciesList = [{ value: 'PLN', label: 'PLN', disabled: false }];
  } else if (settings.currencies.length == 1) {
    currenciesList = [
      { value: settings.currencies[0], label: settings.currencies[0], disabled: false },
    ];
  } else if (settings.currencies.length > 1) {
    currenciesList = [
      { value: '', label: 'Выберите валюту', disabled: true },
      ...settings.currencies.map((item) => ({ label: item, value: item })),
    ];
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

  const sendData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setLoader(true);
      const fid = await getVisitorId();
      const postData = { ...registerData, fid };
      if (currenciesList.length == 1) {
        postData.currency = settings?.currencies[0] ? settings?.currencies[0] : '';
      }
      const data = await doRegisterApi(postData);
      setAuthenticated(data.token);
      doCloseModals();
      document.body.classList.remove('overflow-hidden');
      // navigate('/profile/edit');
    } catch (e: unknown) {
      const regError = e as IResponseError;
      const regErrorList = Object.keys(regError.errors);
      if (!Array.isArray(regErrorList)) {
        return;
      }
      setErrorData(regError);
    } finally {
      setLoader(false);
    }
  };

  return (
    <form className={styles.container}>
      {(loader || loadingSettings || isAuth || !settings) && (
        <div className={styles.loader_container}>
          <Loader />
        </div>
      )}
      <div className={styles.title}>Регистрация</div>
      <div className="row">
        {formType === 'full' && (
          <Tabs
            className="mb-[36px]"
            value={selectedType}
            onChange={(value) => setSelectedType(value.value.toString())}
            tabs={[
              {
                value: 'email',
                label: 'Электронная почта',
              },
              {
                value: 'phone',
                label: 'Телефон',
              },
            ]}
          />
        )}
        <div className="tab">
          {(formType === 'full' && selectedType === 'email') || formType === 'email' ? (
            <Input
              placeholder="Электронная почта"
              type="email"
              onChange={(e) => {
                setRegisterData((prev) => ({ ...prev, email: e.target.value }));
                if (!isAppDebug) {
                  setRegisterData((prev) => ({ ...prev, phone: '' }));
                }
              }}
              containerClassName={styles.input}
              validationFunction={validateEmail}
              isError={!!errorData?.errors['email']}
              message={ErrorResponseAsString('email', 'Введите корректный e-mail', errorData)}
            />
          ) : null}
          {(formType === 'full' && selectedType === 'phone') || formType === 'phone' ? (
            <Input
              placeholder="Номер телефона"
              type="phone"
              onChangePhone={(value) => {
                setRegisterData((prev) => ({ ...prev, phone: value }));
                if (!isAppDebug) {
                  setRegisterData((prev) => ({ ...prev, email: '' }));
                }
              }}
              containerClassName={styles.input}
              validationFunction={validatePhone}
              isError={!!errorData?.errors['phone']}
              message={
                validatePhone(registerData.phone)
                  ? 'Будет использоваться как логин для входа'
                  : 'Введите корректный телефон'
              }
            />
          ) : null}
        </div>
      </div>

      {!isFastAuth && (
        <>
          <Input
            placeholder="Пароль"
            type="password"
            isError={!!errorData?.errors['password']}
            containerClassName={styles.input}
            value={registerData.password}
            validationFunction={validatePasswordLength}
            message={ErrorResponseAsString('password', 'Введите корректный пароль', errorData)}
            onChange={(e) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))}
          />
          <Input
            placeholder="Повторите пароль"
            type="password"
            isError={!!errorData?.errors['repeat_password']}
            containerClassName={styles.input}
            validationFunction={(value) => validatePasswordMatching(registerData.password, value)}
            message={ErrorResponseAsString(
              'repeat_password',
              'Введите корректный пароль',
              errorData,
            )}
            onChange={(e) =>
              setRegisterData((prev) => ({ ...prev, repeat_password: e.target.value }))
            }
          />
        </>
      )}
      {currenciesList.length > 1 ? (
        <Select
          isError={!!errorData?.errors['currency']}
          optionList={currenciesList}
          value={registerData.currency}
          containerClassName={styles.input}
          message={ErrorResponseAsString('currency', 'Введите корректный пароль', errorData)}
          onChange={(e) => setRegisterData((prev) => ({ ...prev, currency: e.target.value }))}
        />
      ) : (
        ''
      )}
      {hasUsername && (
        <Input
          placeholder={'Username'}
          type={'text'}
          containerClassName={styles.input}
          isError={!!errorData?.errors['username']}
          message={ErrorResponseAsString('username', 'Введите корректный username', errorData)}
          onChange={(e) => setRegisterData((prev) => ({ ...prev, username: e.target.value }))}
        />
      )}

      {/* Тут красиво группировать */}
      {hasFullName && (
        <div className="tab">
          <Input
            placeholder={'Фамилия'}
            type={'text'}
            containerClassName={styles.input}
            isError={!!errorData?.errors['last_name']}
            message={ErrorResponseAsString('last_name', 'Введите фамилию корректно', errorData)}
            onChange={(e) => setRegisterData((prev) => ({ ...prev, last_name: e.target.value }))}
          />
          <Input
            placeholder={'Имя'}
            type={'text'}
            containerClassName={styles.input}
            isError={!!errorData?.errors['first_name']}
            message={ErrorResponseAsString('first_name', 'Введите имя корректно', errorData)}
            onChange={(e) => setRegisterData((prev) => ({ ...prev, first_name: e.target.value }))}
          />
          <Input
            placeholder={'Отчество'}
            type={'text'}
            containerClassName={styles.input}
            isError={!!errorData?.errors['second_name']}
            message={ErrorResponseAsString('second_name', 'Введите отчество корректно', errorData)}
            onChange={(e) => setRegisterData((prev) => ({ ...prev, second_name: e.target.value }))}
          />
        </div>
      )}
      {hasCity && (
        <div className="tab">
          <Select
            isError={!!errorData?.errors['country']}
            optionList={countriesList}
            value={registerData.country}
            containerClassName={styles.input}
            message={ErrorResponseAsString('second_name', 'Укажите страну из списка', errorData)}
            onChange={(e) => setRegisterData((prev) => ({ ...prev, country: e.target.value }))}
          />
          <Input
            placeholder={'Город'}
            type={'text'}
            containerClassName={styles.input}
            isError={!!errorData?.errors['city']}
            message={ErrorResponseAsString('city', 'Укажите город правильно', errorData)}
            onChange={(e) => setRegisterData((prev) => ({ ...prev, city: e.target.value }))}
          />
        </div>
      )}

      {hasDob && (
        <Input
          placeholder={'Дата рождения'}
          type="datetime-local"
          containerClassName={styles.input}
          isError={!!errorData?.errors['dob']}
          message={ErrorResponseAsString('dob', 'Укажите дату рождения корректно', errorData)}
          onChange={(e) => {
            const inputDate = new Date(e.target.value);
            const timestamp = Math.floor(inputDate.getTime() / 1000);
            setRegisterData((prev) => ({ ...prev, dob: timestamp }));
          }}
        />
      )}

      {/* Тут красиво группировать */}
      {hasAddress && (
        <div className="tab">
          <Input
            placeholder={'Адрес'}
            type={'text'}
            containerClassName={styles.input}
            isError={!!errorData?.errors['address']}
            message={ErrorResponseAsString('address', 'Укажите адрес корректно', errorData)}
            onChange={(e) => setRegisterData((prev) => ({ ...prev, address: e.target.value }))}
          />
          <Input
            placeholder={'Почтовый индекс'}
            type={'text'}
            containerClassName={styles.input}
            isError={!!errorData?.errors['zip']}
            message={ErrorResponseAsString('zip', 'Укажите почтовый индекс корректно', errorData)}
            onChange={(e) => setRegisterData((prev) => ({ ...prev, zip: e.target.value }))}
          />
        </div>
      )}

      {hasGender && (
        <Select
          isError={!!errorData?.errors['gender']}
          optionList={genderSelect}
          value={registerData.gender}
          containerClassName={styles.input}
          message={ErrorResponseAsString('zip', 'Укажите гендер корректно', errorData)}
          onChange={(e) => setRegisterData((prev) => ({ ...prev, gender: e.target.value }))}
        />
      )}
      {hasPromo && (
        <div className={classNames(styles.checkbox, styles.promo)}>
          <Checkbox
            value={registerData.promo}
            label="Я согласен на промо рассылку"
            onChange={(value) => setRegisterData((prev) => ({ ...prev, promo: value }))}
          />
        </div>
      )}

      <div className={styles.checkbox}>
        <Checkbox
          isError={!!errorData?.errors['terms']}
          value={registerData.terms}
          label={
            <span>
              Я ознакомился с <Link to="/rules">правилами и условиями</Link>
            </span>
          }
          onChange={(value) => setRegisterData((prev) => ({ ...prev, terms: value }))}
        />
      </div>
      <div className={styles.line}></div>
      {hasSocials ? (
        <div>
          <div className={styles.subtitle}>C помощью социальных сетей</div>
          <div className={styles.social}>
            <VK />
            <Telegram />
            <OK />
            <Twitter />
            <FB />
          </div>
        </div>
      ) : (
        ''
      )}

      {settings?.auth.register.captcha && (
        <ReCAPTCHA
          className={styles.captcha}
          sitekey={settings?.captcha_site_key ?? ''}
          onChange={(value: string | null) =>
            setRegisterData((prev) => ({ ...prev, captcha: value ?? '' }))
          }
        />
      )}
      <Button
        type="submit"
        disabled={
          !validateRegister(registerData, settings?.auth.register, isFastAuth ? true : false)
        }
        className={styles.button}
        onClick={(e) => void sendData(e)}
      >
        Зарегистрироваться
      </Button>
      <div className={styles.label}>
        У вас уже есть личный кабинет? <span onClick={openLoginModal}>Войти</span>
      </div>
    </form>
  );
};

export default AuthRegisterForm;
