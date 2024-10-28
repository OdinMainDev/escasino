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
import Cookies from 'js-cookie';
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
import { useTranslation } from 'react-i18next';

interface IProps {
  openRegistration: () => void;
  openResetModal: () => void;
}

const AuthLoginForm = ({ openRegistration, openResetModal }: IProps) => {
  const { t } = useTranslation();
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
      Cookies.set('cainoToken', import.meta.env.VITE_APP_CHAT_API_TOKEN as string);
      doCloseModals();
      document.body.classList.remove('overflow-hidden');
      window.location.reload();
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
        <div className={styles.title}>{t('enterPersonalOffice')}</div>

        <div className="row">
          {formType === 'full' && (
            <Tabs
              className="mb-[36px]"
              value={selectedType}
              onChange={(value) => setSelectedType(value.value.toString())}
              tabs={[
                {
                  value: 'email',
                  label: t('email'),
                },
                {
                  value: 'phone',
                  label: t('phone'),
                },
              ]}
            />
          )}

          <div className="tab">
            {(formType === 'full' && selectedType === 'email') || formType === 'email' ? (
              <Input
                placeholder={t('email')}
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
                isError={typeof errorData?.errors === 'object' && !!errorData?.errors['email']}
                message={ErrorResponseAsString('email', t('enterCorrectEmail'), errorData)}
              />
            ) : null}
            {(formType === 'full' && selectedType === 'phone') || formType === 'phone' ? (
              <Input
                placeholder={t('phone')}
                type="phone"
                value={loginData.phone}
                containerClassName="mb-[10px]"
                isError={typeof errorData?.errors === 'object' && !!errorData?.errors['phone']}
                validationFunction={validatePhone}
                autoComplete={autoCompleteHandler('phone')}
                onChangePhone={(value) => {
                  setLoginData((prev) => ({ ...prev, phone: value }));
                  if (!isAppDebug) {
                    setLoginData((prev) => ({ ...prev, email: '' }));
                  }
                }}
                message={ErrorResponseAsString('phone', t('enterCorrectPhone'), errorData)}
              />
            ) : null}
          </div>
          <div className={styles.input_label}>{t('willUseAsLogin')}</div>
        </div>

        <Input
          placeholder={t('password')}
          type="password"
          isError={typeof errorData?.errors === 'object' && !!errorData?.errors['password']}
          value={loginData.password}
          containerClassName="mb-[10px]"
          validationFunction={validatePasswordLength}
          autoComplete={autoCompleteHandler('password')}
          message={ErrorResponseAsString('password', t('enterCorrectPassword'), errorData)}
          onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
        />
        <div className={styles.forgot}>
          {hasRemember && (
            <Checkbox
              value={false}
              label={t('rememberMe')}
              onChange={(value) => setLoginData((prev) => ({ ...prev, remember: value }))}
            />
          )}
          <div className={styles.forgot_text} onClick={openResetModal}>
            {t('forgotPassword')}
          </div>
        </div>
        {hasSocials ? (
          <div>
            <hr className={styles.linehr} />
            <div className={styles.subtitle}>{t('usingSocials')}</div>
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
          {t('enter')}
        </Button>
        <div className={styles.label}>
          {t('notAccount')} <span onClick={openRegistration}>{t('signUp')}</span>
        </div>
      </div>
    </form>
  );
};

export default AuthLoginForm;
