import { useState } from 'react';
import Cookies from 'js-cookie';
import ReCAPTCHA from 'react-google-recaptcha';

import styles from './LoginForm.module.scss';
import { Telegram, Twitter, VK } from './Icons';
import { autoCompleteHandler } from '../helpers/autoCompleteHandler';
import { validateLogin } from '@/views/components/AuthForm/helpers/validators';

import { useSettings } from '@/app/repositories/settings';
import Loader from '@/views/components/Loader';
import Input from '@/views/components/Input';
import { ILoginData, doLoginApi } from '@/app/api/auth/doLogin';
import Checkbox from '@/views/components/Checkbox';
import Button from '@/views/components/Button';
import { useIsAuth } from '@/app/repositories/auth';
import { getVisitorId } from '@/app/helpers/getVisitorId';
import { useModal } from '@/app/providers/ModalProvider';

interface IProps {
  openRegistration: () => void;
  openResetModal: () => void;
}

const LoginForm = ({ openRegistration, openResetModal }: IProps) => {
  const { settings, loading: loadingSettings } = useSettings();
  const { isAuth, setAuthenticated } = useIsAuth();
  const { doCloseModals } = useModal();
  const [loader, setLoader] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<ILoginData>({
    email: '',
    phone: '',
    password: '',
    fid: '',
    captcha: '',
    remember: false,
  });

  if (loadingSettings || isAuth || !settings) {
    return '';
  }
  const formType =
    settings?.auth.login.phone && settings?.auth.login.email
      ? 'full'
      : settings?.auth.login.phone
        ? 'phone'
        : 'email';

  const handleInputChange = (name: string, value: string) => {
    setLoginData((prev) => ({ ...prev, [name]: value }));
    setIsError(false);
  };

  const sendData = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    try {
      e.preventDefault();
      setLoader(true);
      const fid = await getVisitorId();
      const data = await doLoginApi({ ...loginData, fid });
      Cookies.set('token', data.token);
      document.body.classList.remove('overflow-hidden');
      setAuthenticated();
      doCloseModals();
      // await dispatch(getMeUser());
    } catch (e: unknown) {
      setIsError(true);
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
      <div className={styles.title}>Войти в личный кабинет</div>

      {/* На будущее */}
      {/* TODO: СДЕЛАТЬ ТУТ НОРМ ВЕРСТКУ В ФУЛЛ ( ЕСЛИ ИЗ АДМИНКИ ВКЛЮЧЕНО ЧТО И ПОЧТА И ТЕЛЕФОН ЕСТЬ ) */}
      {/* TODO: СДЕЛАТЬ ИНПУТ ТЕЛЕФОНА ( НОРМАЛЬНЫЙ А НЕ КАК ЭТО СДЕЛАНО КОНЕЧНО (КРАСИВЕНЬКО)) ) */}
      {formType == 'full' && (
        <div className="row">
          <div className="tab" style={{ display: 'flex' }}>
            <Input
              placeholder={'Почта'}
              type={'email'}
              containerClassName={styles.input}
              value={String(loginData['email' as keyof ILoginData])}
              autoComplete={autoCompleteHandler('email')}
              isError={isError}
              message={
                isError
                  ? 'Пользователя с такими данными у нас нет, либо они введены не правильно'
                  : null
              }
              onChange={(e) => {
                handleInputChange('phone', '');
                handleInputChange('email', e.target.value);
              }}
            />
            <Input
              placeholder={'Телефон'}
              type={'text'}
              containerClassName={styles.input}
              value={String(loginData['phone' as keyof ILoginData])}
              autoComplete={autoCompleteHandler('phone')}
              isError={isError}
              message={
                isError
                  ? 'Пользователя с такими данными у нас нет, либо они введены не правильно'
                  : null
              }
              onChange={(e) => {
                handleInputChange('email', '');
                handleInputChange('phone', e.target.value);
              }}
            />
          </div>
        </div>
      )}

      {formType == 'email' && (
        <div className="row">
          <div className="tab" style={{ display: 'flex' }}>
            <Input
              placeholder={'Почта'}
              type={'email'}
              containerClassName={styles.input}
              value={String(loginData['email' as keyof ILoginData])}
              autoComplete={autoCompleteHandler('email')}
              isError={isError}
              message={
                isError
                  ? 'Пользователя с такими данными у нас нет, либо они введены не правильно'
                  : null
              }
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>
        </div>
      )}

      {formType == 'phone' && (
        <div className="row">
          <div className="tab" style={{ display: 'flex' }}>
            <Input
              placeholder={'Телефон'}
              type={'text'}
              containerClassName={styles.input}
              value={String(loginData['phone' as keyof ILoginData])}
              autoComplete={autoCompleteHandler('phone')}
              isError={isError}
              message={
                isError
                  ? 'Пользователя с такими данными у нас нет, либо они введены не правильно'
                  : null
              }
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>
        </div>
      )}

      <Input
        placeholder={'Пароль'}
        type={'password'}
        containerClassName={styles.input}
        value={String(loginData['password' as keyof ILoginData])}
        autoComplete={autoCompleteHandler('password')}
        isError={isError}
        message={
          isError ? 'Пользователя с такими данными у нас нет, либо они введены не правильно' : null
        }
        onChange={(e) => handleInputChange('password', e.target.value)}
      />

      {/* TODO: ИСПРАВИТЬ ВЕРСТКУ ЕСЛИ ЕСТЬ ЗАПОМНИТЬ МЕНЯ */}
      {settings?.auth.login.remember ? (
        <div className={styles.forgot} style={{ display: 'flex' }}>
          <Checkbox
            value={false}
            onChange={(value) => setLoginData((prev) => ({ ...prev, remember: value }))}
          />
          <div style={{ margin: '0px 0px 0px 5px' }}>Запомнить меня</div>
          <div
            className={styles.forgot}
            // onClick={() => dispatch(openResetPasswordModal())}
            style={{ float: 'right', textAlign: 'right', width: '70%' }}
          >
            Я забыл пароль
          </div>
        </div>
      ) : (
        <div className={styles.forgot} onClick={openResetModal}>
          Я забыл пароль
        </div>
      )}
      <div className={styles.subtitle}>C помощью социальных сетей</div>
      <div className={styles.social}>
        <Telegram />
        <Twitter />
        <VK />
      </div>

      {settings?.auth.login.captcha && (
        <ReCAPTCHA
          className={styles.captcha}
          sitekey={settings?.captcha_site_key ?? ''}
          onChange={(value: string | null) =>
            setLoginData((prev) => ({ ...prev, captcha: value ?? '' }))
          }
        />
      )}
      <Button
        disabled={!validateLogin(loginData)}
        className={styles.button}
        onClick={(e) => void sendData(e)}
      >
        Войти
      </Button>
      <div className={styles.label}>
        Нет личного кабинета? <span onClick={openRegistration}>Зарегистрироваться</span>
      </div>
    </form>
  );
};

export default LoginForm;
