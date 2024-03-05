import ReCAPTCHA from 'react-google-recaptcha';
import Cookies from 'js-cookie';
import { useState } from 'react';
import styles from './LoginForm.module.scss';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import Checkbox from '@/shared/ui/Checkbox';
import { ILoginData } from '../models/login';
import { loginHandlerApi } from '../api/loginApi';
import { getVisitorId } from '../helpers/getVisitorId';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { Telegram, Twitter, VK } from './Icons';
import { autoCompleteHandler } from '../helpers/autoCompleteHandler';
import Loader from '@/shared/ui/Loader';
import { validateLogin } from '../helpers/validators';
import { getMeUser } from '@/store/slices/userSlice';
import { closeLoginModal, openResetPasswordModal } from '@/store/slices/authModalSlice';

interface IProps {
  openRegistration: () => void;
}

const LoginForm = ({ openRegistration }: IProps) => {
  const { settings, loading } = useAppSelector((state) => state.settingsReducer);
  const [isError, setIsError] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [loginData, setLoginData] = useState<ILoginData>({
    email: '',
    phone: '',
    password: '',
    fid: '',
    captcha: '',
    remember: false,
  });

  const handleInputChange = (name: string, value: string) => {
    setLoginData((prev) => ({ ...prev, [name]: value }));
    setIsError(false);
  };

  const sendData = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    try {
      e.preventDefault();
      setLoader(true);
      const fid = await getVisitorId();
      const data = await loginHandlerApi({ ...loginData, fid });
      Cookies.set('token', data.token);
      document.body.classList.remove('overflow-hidden');
      dispatch(closeLoginModal());
      await dispatch(getMeUser());
    } catch (e: unknown) {
      setIsError(true);
    } finally {
      setLoader(false);
    }
  };

  let typeOfForm = settings?.auth.login.phone && settings?.auth.login.email ? 'full' : 'email';
  typeOfForm = typeOfForm == 'full' ? 'full' : settings?.auth.login.phone ? 'phone' : 'email';

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
      {typeOfForm == 'full' && (
        <div className="row">
          <div className="tab" style={{ display: 'flex' }}>
            <Input
              placeholder={'Почта'}
              type={'email'}
              containerClassName={styles.input}
              value={String(loginData['email' as keyof ILoginData])}
              autoComplete={autoCompleteHandler('email')}
              isError={isError}
              message={isError ? 'Почта или пароль введены неверно' : null}
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
              message={isError ? 'Телефон или пароль введены неверно' : null}
              onChange={(e) => {
                handleInputChange('email', '');
                handleInputChange('phone', e.target.value);
              }}
            />
          </div>
        </div>
      )}

      {typeOfForm == 'email' && (
        <div className="row">
          <div className="tab" style={{ display: 'flex' }}>
            <Input
              placeholder={'Почта'}
              type={'email'}
              containerClassName={styles.input}
              value={String(loginData['email' as keyof ILoginData])}
              autoComplete={autoCompleteHandler('email')}
              isError={isError}
              message={isError ? 'Почта или пароль введены неверно' : null}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>
        </div>
      )}

      {typeOfForm == 'phone' && (
        <div className="row">
          <div className="tab" style={{ display: 'flex' }}>
            <Input
              placeholder={'Телефон'}
              type={'text'}
              containerClassName={styles.input}
              value={String(loginData['phone' as keyof ILoginData])}
              autoComplete={autoCompleteHandler('phone')}
              isError={isError}
              message={isError ? 'Телефон или пароль введены неверно' : null}
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
        message={isError ? 'Логин или пароль введены неверно' : null}
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
            onClick={() => dispatch(openResetPasswordModal())}
            style={{ float: 'right', textAlign: 'right', width: '70%' }}
          >
            Я забыл пароль
          </div>
        </div>
      ) : (
        <div className={styles.forgot} onClick={() => dispatch(openResetPasswordModal())}>
          Я забыл пароль
        </div>
      )}
      <div className={styles.subtitle}>C помощью социальных сетей</div>
      <div className={styles.social}>
        <Telegram />
        <Twitter />
        <VK />
      </div>

      {!loading && settings?.auth.login.captcha && (
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
