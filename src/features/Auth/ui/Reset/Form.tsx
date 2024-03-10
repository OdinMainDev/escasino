import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import styles from './Form.module.scss';
import {
  validateEmail,
  validatePhone,
  validateResetPassword,
} from '@/features/Auth/helpers/validators';
import { autoCompleteHandler } from '@/features/Auth/helpers/autoCompleteHandler';

import Loader from '@/shared/components/Loader';
import Input from '@/shared/components/Input';
import Button from '@/shared/components/Button';
import { useAuthProvider } from '@/app/providers/AuthProvider';
import { useModal } from '@/app/providers/ModalProvider';
import { getVisitorId } from '@/shared/helpers/getVisitorId';
import { useAppSelector } from '@/store/hooks/redux';
import { AuthErrorResponse, IAuthError } from '@/app/api/auth/entity';
import { isAppDebug } from '@/app/config/app';
import { IResetData, doResetApi, sampleIResetData } from '@/app/api/auth/doReset';

interface IProps {
  openLoginModal: () => void;
}

const AuthResetForm = ({ openLoginModal }: IProps) => {
  const { settings, loading: loadingSettings } = useAppSelector((state) => state.settingsReducer);
  const { isAuth, setAuthenticated } = useAuthProvider();
  const { doSetResetHash, doCloseModals } = useModal();
  const [loader, setLoader] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<IAuthError>();
  const [resetData, setResetData] = useState<IResetData>(sampleIResetData);

  const formType =
    settings?.auth.login.phone && settings?.auth.login.email
      ? 'full'
      : settings?.auth.login.phone
        ? 'phone'
        : 'email';

  // OVERRIDE FOR TESTS
  // TODO: проверить с этими параметрами включенными и поправить верстку
  // const formType = 'full';

  const sendData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setLoader(true);
      const fid = await getVisitorId();
      const data = await doResetApi({ ...resetData, fid });
      // doSetResetHash(data.token);
      // setAuthenticated(data.token);
      // doCloseModals();
      // document.body.classList.remove('overflow-hidden');
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

  return (
    <form className={styles.container}>
      {(loader || loadingSettings || isAuth || !settings) && (
        <div className={styles.loader_container}>
          <Loader />
        </div>
      )}
      <div>
        <div className={styles.title}>Забыли пароль?</div>
        {formType == 'full' && (
          <div className="row">
            <div className="tab" style={{ display: 'flex' }}>
              <Input
                placeholder="Электронная почта"
                type="email"
                onChange={(e) => {
                  setResetData((prev) => ({ ...prev, email: e.target.value }));
                  if (!isAppDebug) {
                    setResetData((prev) => ({ ...prev, phone: '' }));
                  }
                }}
                containerClassName={styles.input}
                validationFunction={validateEmail}
                autoComplete={autoCompleteHandler('email')}
                isError={!!errorData?.errors['email']}
                message={AuthErrorResponse('email', 'Введите корректный e-mail', errorData)}
              />
              <Input
                placeholder={'Телефон'}
                type={'text'}
                containerClassName={styles.input}
                isError={!!errorData?.errors['phone']}
                validationFunction={validatePhone}
                autoComplete={autoCompleteHandler('phone')}
                onChange={(e) => {
                  setResetData((prev) => ({ ...prev, phone: e.target.value }));
                  if (!isAppDebug) {
                    setResetData((prev) => ({ ...prev, email: '' }));
                  }
                }}
                message={AuthErrorResponse('phone', 'Введите корректный телефон', errorData)}
              />
            </div>
          </div>
        )}
        {settings?.auth.reset.captcha && (
          <ReCAPTCHA
            className={styles.captcha}
            sitekey={settings?.captcha_site_key ?? ''}
            onChange={(value: string | null) =>
              setResetData((prev) => ({ ...prev, captcha: value ?? '' }))
            }
          />
        )}
        ,
        <Button
          disabled={!validateResetPassword(resetData)}
          className={styles.button}
          onClick={(e) => void sendData(e)}
        >
          Сбросить
        </Button>
        <div className={styles.label} onClick={openLoginModal}>
          Вспомнили аккаунт?
        </div>
      </div>
    </form>
  );
};

export default AuthResetForm;
