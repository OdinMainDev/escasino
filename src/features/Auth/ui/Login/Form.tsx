import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import styles from './Form.module.scss';
import { FB, OK, Telegram, Twitter, VK } from '../Icons';
import {
  validateLogin,
  validatePasswordLength,
  validatePhone,
} from '@/features/Auth/helpers/validators';
import { autoCompleteHandler } from '@/features/Auth/helpers/autoCompleteHandler';

import Loader from '@/shared/ui/Loader';
import Input from '@/shared/ui/Input';
import { ILoginData, doLoginApi, sampleILoginData } from '@/app/api/auth/doLogin';
import Button from '@/shared/ui/Button';
import { useAuthProvider } from '@/app/providers/AuthProvider';
import { useModal } from '@/app/providers/ModalProvider';
import Checkbox from '@/shared/ui/Checkbox';
import { getVisitorId } from '@/shared/helpers/getVisitorId';
import { useAppSelector } from '@/store/hooks/redux';
import { isAppDebug } from '@/app/config/app';
import { IResponseError } from '@/shared/models/interfaces/misc';
import { ErrorResponseAsString } from '@/app/api/helpers';
import { formTypeTypes } from '../../models/types';
import Tabs from '@/entities/Tabs';

interface IProps {
  openRegistration: () => void;
  openResetModal: () => void;
}

const AuthLoginForm = ({ openRegistration, openResetModal }: IProps) => {
  const { settings, loading: loadingSettings } = useAppSelector((state) => state.settingsReducer);
  const { isAuth, setAuthenticated } = useAuthProvider();
  const { doCloseModals } = useModal();
  const [loader, setLoader] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<IResponseError>();
  const [loginData, setLoginData] = useState<ILoginData>(sampleILoginData);
  const [selectedType, setSelectedType] = useState('email');

  const formType: formTypeTypes =
    settings?.auth.login.phone && settings?.auth.login.email
      ? 'full'
      : settings?.auth.login.phone
        ? 'phone'
        : 'email';
  const hasRemember = settings?.auth.login.remember;
  const hasSocials =
    settings?.auth.social_vk ||
    settings?.auth.social_ok ||
    settings?.auth.social_fb ||
    settings?.auth.social_tg ||
    settings?.auth.social_tw;

  // OVERRIDE FOR TESTS
  // const formType: formTypeTypes = 'full';
  // const hasRemember = true;
  // const hasSocials = true;

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

  return (
    <form className={styles.container}>
      {(loader || loadingSettings || isAuth || !settings) && (
        <div className={styles.loader_container}>
          <Loader />
        </div>
      )}
      <div>
        <div className={styles.title}>Авторизация</div>

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
                containerClassName="mb-[10px]"
                onChange={(e) => {
                  setLoginData((prev) => ({ ...prev, email: e.target.value }));
                  if (!isAppDebug) {
                    setLoginData((prev) => ({ ...prev, phone: '' }));
                  }
                }}
                value={loginData.email}
                autoComplete={autoCompleteHandler('email')}
                isError={!!errorData?.errors['email']}
                message={ErrorResponseAsString('email', 'Введите корректный e-mail', errorData)}
              />
            ) : null}
            {(formType === 'full' && selectedType === 'phone') || formType === 'phone' ? (
              <Input
                placeholder={'Телефон'}
                type="phone"
                value={loginData.phone}
                containerClassName="mb-[10px]"
                isError={!!errorData?.errors['phone']}
                validationFunction={validatePhone}
                autoComplete={autoCompleteHandler('phone')}
                onChangePhone={(value) => {
                  setLoginData((prev) => ({ ...prev, phone: value }));
                  if (!isAppDebug) {
                    setLoginData((prev) => ({ ...prev, email: '' }));
                  }
                }}
                message={ErrorResponseAsString('phone', 'Введите корректный телефон', errorData)}
              />
            ) : null}
          </div>
          <div className={styles.input_label}>Будет использоваться как логин для входа</div>
        </div>

        <Input
          placeholder="Пароль"
          type="password"
          isError={!!errorData?.errors['password']}
          value={loginData.password}
          containerClassName="mb-[10px]"
          validationFunction={validatePasswordLength}
          autoComplete={autoCompleteHandler('password')}
          message={ErrorResponseAsString('password', 'Введите корректный пароль', errorData)}
          onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
        />
        <div className={styles.forgot}>
          {hasRemember && (
            <Checkbox
              value={false}
              label="Запомнить меня"
              onChange={(value) => setLoginData((prev) => ({ ...prev, remember: value }))}
            />
          )}
          <div className={styles.forgot_text} onClick={openResetModal}>
            Забыли пароль?
          </div>
        </div>
        {hasSocials ? (
          <div>
            <hr className={styles.linehr} />
            <div className={styles.subtitle}>Или с помощью социальных сетей</div>
            <div className={styles.social}>
              <VK />
              <Telegram />
              <OK />
              <Twitter />
              <FB />
            </div>
          </div>
        ) : null}

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
          Все еще нет аккаунта? <span onClick={openRegistration}>Зарегистрироваться</span>
        </div>
      </div>
    </form>
  );
};

export default AuthLoginForm;
