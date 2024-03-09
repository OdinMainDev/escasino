import { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import styles from './Form.module.scss';
// import { Telegram, Twitter, VK } from './Icons';
// import { autoCompleteHandler } from '@/features/Auth/helpers/autoCompleteHandler';
import {
  validateEmail,
  validateLogin,
  validatePasswordLength,
  validatePhone,
} from '@/features/Auth/helpers/validators';

import Loader from '@/shared/components/Loader';
import Input from '@/shared/components/Input';
import { ILoginData, doLoginApi, sampleILoginData } from '@/app/api/auth/doLogin';
import Button from '@/shared/components/Button';
import { useAuthProvider } from '@/app/providers/AuthProvider';
import { useModal } from '@/app/providers/ModalProvider';
import Checkbox from '@/shared/components/Checkbox';
import { getVisitorId } from '@/shared/helpers/getVisitorId';
import { useAppSelector } from '@/store/hooks/redux';
import { IAuthError } from '@/app/api/auth/entity';

interface IProps {
  openRegistration: () => void;
  openResetModal: () => void;
}

const AuthLoginForm = ({ openRegistration, openResetModal }: IProps) => {
  const { settings, loading: loadingSettings } = useAppSelector((state) => state.settingsReducer);
  const { isAuth, setAuthenticated } = useAuthProvider();
  const { doCloseModals } = useModal();
  const [loader, setLoader] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<IAuthError>();
  const [loginData, setLoginData] = useState<ILoginData>(sampleILoginData);

  const formType =
    settings?.auth.login.phone && settings?.auth.login.email
      ? 'full'
      : settings?.auth.login.phone
        ? 'phone'
        : 'email';
  const hasRemember = settings?.auth.login.remember;

  // // OVERRIDE FOR TESTS
  // const formType = 'full';
  // const hasRemember = true;

  const sendData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setLoader(true);
      const fid = await getVisitorId();
      const data = await doLoginApi({ ...loginData, fid });
      setAuthenticated(data.token);
      doCloseModals();
      document.body.classList.remove('overflow-hidden');
    } catch (e: unknown) {
      const loginError = e as IAuthError;
      const loginErrorList = Object.keys(loginError.errors);
      if (!Array.isArray(loginErrorList)) {
        return;
      }
      setErrorData(loginError);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    console.log(errorData);
  }, [errorData]);

  return (
    <form className={styles.container}>
      {(loader || loadingSettings || isAuth || !settings) && (
        <div className={styles.loader_container}>
          <Loader />
        </div>
      )}
      <div>
        <div className={styles.title}>Войти в личный кабинет</div>

        {/* На будущее */}
        {/* TODO: СДЕЛАТЬ ТУТ НОРМ ВЕРСТКУ В ФУЛЛ ( ЕСЛИ ИЗ АДМИНКИ ВКЛЮЧЕНО ЧТО И ПОЧТА И ТЕЛЕФОН ЕСТЬ ) */}
        {/* TODO: СДЕЛАТЬ ИНПУТ ТЕЛЕФОНА ( НОРМАЛЬНЫЙ А НЕ КАК ЭТО СДЕЛАНО КОНЕЧНО (КРАСИВЕНЬКО)) ) */}
        {formType == 'full' && (
          <div className="row">
            <div className="tab" style={{ display: 'flex' }}>
              <Input
                placeholder="Электронная почта"
                type="email"
                onChange={(e) => {
                  setLoginData((prev) => ({ ...prev, email: e.target.value }));
                  setLoginData((prev) => ({ ...prev, phone: '' }));
                }}
                containerClassName={styles.input}
                validationFunction={validateEmail}
                isError={!!errorData?.errors['email']}
                message={
                  errorData?.errors['email']
                    ? 'Введите корректный e-mail (Ошибка: ' +
                      (errorData?.errors['email'].join(', ') ?? '#UNDEFINED') +
                      ')'
                    : ''
                }
              />
              <Input
                placeholder={'Телефон'}
                type={'text'}
                containerClassName={styles.input}
                isError={!!errorData?.errors['phone']}
                validationFunction={validatePhone}
                onChange={(e) => {
                  setLoginData((prev) => ({ ...prev, phone: e.target.value }));
                  setLoginData((prev) => ({ ...prev, email: '' }));
                }}
                message={
                  errorData?.errors['phone']
                    ? 'Введите корректный телефон (Ошибка: ' +
                      (errorData?.errors['phone'].join(', ') ?? '#UNDEFINED') +
                      ')'
                    : ''
                }
              />
            </div>
          </div>
        )}

        {formType == 'email' && (
          <Input
            placeholder="Электронная почта"
            type="email"
            onChange={(e) => {
              setLoginData((prev) => ({ ...prev, email: e.target.value }));
              setLoginData((prev) => ({ ...prev, phone: '' }));
            }}
            containerClassName={styles.input}
            validationFunction={validateEmail}
            isError={!!errorData?.errors['email']}
            message={
              errorData?.errors['email']
                ? 'Введите корректный e-mail (Ошибка: ' +
                  (errorData?.errors['email'].join(', ') ?? '#UNDEFINED') +
                  ')'
                : ''
            }
          />
        )}

        {formType == 'phone' && (
          <Input
            placeholder={'Телефон'}
            type={'text'}
            containerClassName={styles.input}
            isError={!!errorData?.errors['phone']}
            validationFunction={validatePhone}
            onChange={(e) => {
              setLoginData((prev) => ({ ...prev, phone: e.target.value }));
              setLoginData((prev) => ({ ...prev, email: '' }));
            }}
            message={
              errorData?.errors['phone']
                ? 'Введите корректный телефон (Ошибка: ' +
                  (errorData?.errors['phone'].join(', ') ?? '#UNDEFINED') +
                  ')'
                : ''
            }
          />
        )}

        <Input
          placeholder="Пароль"
          type="password"
          isError={!!errorData?.errors['password']}
          containerClassName={styles.input}
          value={loginData.password}
          validationFunction={validatePasswordLength}
          message={
            errorData?.errors['password']
              ? 'Введите корректный пароль (Ошибка: ' +
                (errorData?.errors['password'].join(', ') ?? '#UNDEFINED') +
                ')'
              : ''
          }
          onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
        />

        {/* TODO: ИСПРАВИТЬ ВЕРСТКУ ЕСЛИ ЕСТЬ ЗАПОМНИТЬ МЕНЯ */}
        {hasRemember ? (
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
          {/* <Telegram />
      <Twitter />
      <VK /> */}
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
      </div>
    </form>
  );
};

export default AuthLoginForm;
