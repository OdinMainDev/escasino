import ReCAPTCHA from 'react-google-recaptcha';
import Cookies from 'js-cookie';
import { useState } from 'react';
import styles from './LoginForm.module.scss';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import { ILoginData } from '../models/login';
import { loginHandlerApi } from '../api/loginApi';
import { getVisitorId } from '../helpers/getVisitorId';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { Telegram, Twitter, VK } from './Icons';
import { loginInputs } from '../constants/login';
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

  return (
    <form className={styles.container}>
      {loader && (
        <div className={styles.loader_container}>
          <Loader />
        </div>
      )}
      <div className={styles.title}>Войти в личный кабинет</div>
      {loginInputs.map((item, index) => (
        <Input
          key={index}
          placeholder={item.placeholder}
          type={item.type}
          containerClassName={styles.input}
          value={String(loginData[item.name as keyof ILoginData])}
          autoComplete={autoCompleteHandler(item.type)}
          isError={isError}
          message={index === 1 && isError ? 'Логин или пароль введены неверно' : null}
          onChange={(e) => handleInputChange(item.name ?? '', e.target.value)}
        />
      ))}
      <div className={styles.forgot} onClick={() => dispatch(openResetPasswordModal())}>
        Я забыл пароль
      </div>
      <div className={styles.subtitle}>C помощью социальных сетей</div>
      <div className={styles.social}>
        <Telegram />
        <Twitter />
        <VK />
      </div>
      {!loading ? (
        <ReCAPTCHA
          className={styles.captcha}
          sitekey={settings?.captcha_site_key ?? ''}
          onChange={(value: string | null) =>
            setLoginData((prev) => ({ ...prev, captcha: value ?? '' }))
          }
        />
      ) : null}
      ,
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
