import { useState } from 'react';
import Cookies from 'js-cookie';
import ReCAPTCHA from 'react-google-recaptcha';

import styles from './RegistrationForm.module.scss';
import { useSettings } from '@/app/repositories/settings';
import { useIsAuth } from '@/app/repositories/auth';
import Loader from '@/views/components/Loader';
import Input from '@/views/components/Input';
import Select, { ISelectOption } from '@/views/components/Select';
import {
  validateEmail,
  validatePasswordLength,
  validatePasswordMatching,
  validatePhone,
  validateRegister,
} from '@/views/components/AuthForm/helpers/validators';
import Checkbox from '@/views/components/Checkbox';
import { FB, OK, Telegram, Twitter, VK } from './Icons';
import Button from '@/views/components/Button';
import { IRegisterData, doRegisterApi } from '@/app/api/auth/doRegister';
import { getVisitorId } from '@/app/helpers/getVisitorId';
import { IAuthError } from '@/app/api/auth/entity';
import { useModal } from '@/app/providers/ModalProvider';
import { Link, useNavigate } from 'react-router-dom';

interface IProps {
  openLoginModal: () => void;
}

const RegistrationForm = ({ openLoginModal }: IProps) => {
  const { settings, loading: loadingSettings } = useSettings();
  const { isAuth, setAuthenticated } = useIsAuth();
  const { doCloseModals } = useModal();
  const [loader, setLoader] = useState<boolean>(false);
  const [errorList, setErrorList] = useState<string[]>([]);
  // const errorTimout = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState<IRegisterData>({
    currency: '',
    password: '',
    repeat_password: '',
    terms: false,
    email: '',
    phone: '',
    username: '',
    first_name: '',
    second_name: '',
    last_name: '',
    city: '',
    country: '',
    dob: 0,
    zip: '',
    address: '',
    gender: '',
    promo: true,
    fid: '',
    captcha: '',
  });

  if (loadingSettings || isAuth || !settings) {
    return '';
  }
  const formType =
    settings?.auth.register.phone && settings?.auth.register.email
      ? 'full'
      : settings?.auth.register.phone
        ? 'phone'
        : 'email';

  const currenciesList: ISelectOption[] = [
    { value: '', label: 'Выберите валюту', disabled: true },
    ...settings.currencies.map((item) => ({ label: item, value: item })),
  ];

  const genderList: ISelectOption[] = [
    { value: '', label: 'Ваш пол', disabled: true },
    { value: 'male', label: 'Мужской' },
    { value: 'female', label: 'Женский' },
    { value: 'other', label: 'Другое' },
  ];
  const countriesList: ISelectOption[] = [
    { value: '', label: 'Ваша страна', disabled: true },
    { value: 'RU', label: 'RU', disabled: false },
    { value: 'US', label: 'US', disabled: false },
    // тут надо из запроса выдавать список ( /api/v1/public/get/countries )
  ];

  const sendData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setLoader(true);
      const fid = await getVisitorId();
      const data = await doRegisterApi({ ...registerData, fid });
      Cookies.set('token', data.token);
      document.body.classList.remove('overflow-hidden');
      setAuthenticated();
      doCloseModals();
      navigate('/profile/edit');
    } catch (e: unknown) {
      const regError = e as IAuthError;
      const errorList = Object.keys(regError.error);
      if (!Array.isArray(errorList)) {
        return;
      }
      setErrorList(errorList);
    } finally {
      setLoader(false);
    }
  };

  return (
    <form className={styles.container}>
      {loader && (
        <div className={styles.loader_container}>
          <Loader />
        </div>
      )}
      <div className={styles.title}>Регистрация нового игрока</div>
      {formType == 'full' && (
        <div className="row">
          <div className="tab" style={{ display: 'flex' }}>
            <Input
              placeholder="Электронная почта"
              type="email"
              isError={!!errorList.find((item) => item === 'email')}
              validationTimeout={2500}
              validationFunction={validateEmail}
              onChange={(e) => {
                setRegisterData((prev) => ({ ...prev, email: e.target.value }));
                setRegisterData((prev) => ({ ...prev, phone: '' }));
              }}
              containerClassName={styles.input}
              message={
                validateEmail(registerData.email)
                  ? 'Будет использоваться как логин для входа'
                  : 'Введите корректный e-mail'
              }
            />
            <Input
              placeholder={'Телефон'}
              type={'text'}
              containerClassName={styles.input}
              isError={!!errorList.find((item) => item === 'phone')}
              validationTimeout={2500}
              validationFunction={validatePhone}
              onChange={(e) => {
                setRegisterData((prev) => ({ ...prev, phone: e.target.value }));
                setRegisterData((prev) => ({ ...prev, email: '' }));
              }}
              message={
                validatePhone(registerData.phone)
                  ? 'Будет использоваться как логин для входа'
                  : 'Введите корректный телефон'
              }
            />
          </div>
        </div>
      )}

      {formType == 'email' && (
        <Input
          placeholder="Электронная почта"
          type="email"
          isError={!!errorList.find((item) => item === 'email')}
          validationTimeout={2500}
          validationFunction={validateEmail}
          onChange={(e) => setRegisterData((prev) => ({ ...prev, email: e.target.value }))}
          containerClassName={styles.input}
          message={
            validateEmail(registerData.email)
              ? 'Будет использоваться как логин для входа'
              : 'Введите корректный e-mail'
          }
        />
      )}

      {formType == 'phone' && (
        <Input
          placeholder={'Телефон'}
          type={'text'}
          containerClassName={styles.input}
          isError={!!errorList.find((item) => item === 'phone')}
          validationTimeout={2500}
          onChange={(e) => setRegisterData((prev) => ({ ...prev, phone: e.target.value }))}
          validationFunction={validatePhone}
          message={
            validatePhone(registerData.phone)
              ? 'Будет использоваться как логин для входа'
              : 'Введите корректный телефон'
          }
        />
      )}

      <Input
        placeholder="Пароль"
        type="password"
        isError={!!errorList.find((item) => item === 'password')}
        containerClassName={styles.input}
        value={registerData.password}
        validationTimeout={2500}
        validationFunction={validatePasswordLength}
        message={
          !validatePasswordLength(registerData.password)
            ? 'Пароль должен быть не менее 8 символов'
            : null
        }
        onChange={(e) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))}
      />
      <Input
        placeholder="Повторите пароль"
        type="password"
        isError={!!errorList.find((item) => item === 'repeat_password')}
        containerClassName={styles.input}
        validationTimeout={2500}
        validationFunction={(value) => validatePasswordMatching(registerData.password, value)}
        message={
          !validatePasswordMatching(registerData.password, registerData.repeat_password)
            ? 'Пароли не совпадают'
            : null
        }
        onChange={(e) => setRegisterData((prev) => ({ ...prev, repeat_password: e.target.value }))}
      />
      <Select
        isError={!!errorList.find((item) => item === 'currency')}
        optionList={currenciesList}
        value={registerData.currency}
        onChange={(e) => setRegisterData((prev) => ({ ...prev, currency: e.target.value }))}
      />
      <br />
      {settings?.auth.register.username && (
        <Input
          placeholder={'Username'}
          type={'text'}
          containerClassName={styles.input}
          isError={!!errorList.find((item) => item === 'username')}
          onChange={(e) => setRegisterData((prev) => ({ ...prev, username: e.target.value }))}
        />
      )}

      {/* Тут красиво группировать */}
      {settings?.auth.register.full_name && (
        <div className="row" style={{ display: 'flex' }}>
          <Input
            placeholder={'Фамилия'}
            type={'text'}
            containerClassName={styles.input}
            isError={!!errorList.find((item) => item === 'last_name')}
            onChange={(e) => setRegisterData((prev) => ({ ...prev, last_name: e.target.value }))}
          />
          <Input
            placeholder={'Имя'}
            type={'text'}
            containerClassName={styles.input}
            isError={!!errorList.find((item) => item === 'first_name')}
            onChange={(e) => setRegisterData((prev) => ({ ...prev, first_name: e.target.value }))}
          />
          <Input
            placeholder={'Отчество'}
            type={'text'}
            containerClassName={styles.input}
            isError={!!errorList.find((item) => item === 'second_name')}
            onChange={(e) => setRegisterData((prev) => ({ ...prev, second_name: e.target.value }))}
          />
        </div>
      )}

      {/* Тут красиво группировать */}
      {settings?.auth.register.city && (
        <div className="row" style={{ display: 'flex' }}>
          <Select
            isError={!!errorList.find((item) => item === 'country')}
            optionList={countriesList}
            value={registerData.country}
            onChange={(e) => setRegisterData((prev) => ({ ...prev, country: e.target.value }))}
          />
          <Input
            placeholder={'Город'}
            type={'text'}
            containerClassName={styles.input}
            isError={!!errorList.find((item) => item === 'city')}
            onChange={(e) => setRegisterData((prev) => ({ ...prev, city: e.target.value }))}
          />
        </div>
      )}

      {settings?.auth.register.dob && (
        <Input
          placeholder={'Дата рождения'}
          type="datetime-local"
          containerClassName={styles.input}
          isError={!!errorList.find((item) => item === 'dob')}
          onChange={(e) => {
            const inputDate = new Date(e.target.value);
            const timestamp = Math.floor(inputDate.getTime() / 1000);
            setRegisterData((prev) => ({ ...prev, dob: timestamp }));
          }}
        />
      )}

      {/* Тут красиво группировать */}
      {settings?.auth.register.address && (
        <div className="row" style={{ display: 'flex' }}>
          <Input
            placeholder={'Адрес'}
            type={'text'}
            containerClassName={styles.input}
            isError={!!errorList.find((item) => item === 'address')}
            onChange={(e) => setRegisterData((prev) => ({ ...prev, address: e.target.value }))}
          />
          <Input
            placeholder={'Почтовый индекс'}
            type={'text'}
            containerClassName={styles.input}
            isError={!!errorList.find((item) => item === 'city')}
            onChange={(e) => setRegisterData((prev) => ({ ...prev, zip: e.target.value }))}
          />
        </div>
      )}

      {settings?.auth.register.gender && (
        <Select
          isError={!!errorList.find((item) => item === 'gender')}
          optionList={genderList}
          value={registerData.gender}
          onChange={(e) => setRegisterData((prev) => ({ ...prev, gender: e.target.value }))}
        />
      )}

      <div className={styles.checkbox}>
        <Checkbox
          isError={!!errorList.find((item) => item === 'terms')}
          value={registerData.terms}
          onChange={(value) => setRegisterData((prev) => ({ ...prev, terms: value }))}
        />
        <div>
          Я ознакомился с <Link to="/terms">правилами и условиями</Link>
        </div>
      </div>
      {settings?.auth.register.promo && (
        <div className={styles.checkbox}>
          <Checkbox
            isError={!!errorList.find((item) => item === 'promo')}
            value={registerData.promo}
            onChange={(value) => setRegisterData((prev) => ({ ...prev, promo: value }))}
          />
          <div>Я согласен на промо рассылку</div>
        </div>
      )}
      <div className={styles.subtitle}>C помощью социальных сетей</div>
      <div className={styles.social}>
        <VK />
        <Telegram />
        <OK />
        <FB />
        <Twitter />
      </div>

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
        disabled={!validateRegister(registerData)}
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

export default RegistrationForm;
