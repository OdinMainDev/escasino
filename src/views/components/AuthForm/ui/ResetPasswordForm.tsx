import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import styles from './LoginForm.module.scss';
import { useSettings } from '@/app/repositories/settings';
import { useIsAuth } from '@/app/repositories/auth';
// import { useModal } from '@/app/providers/ModalProvider';
import Loader from '../../Loader';
import Input from '../../Input';
import { validateEmail, validatePhone, validateResetPassword } from '../helpers/validators';
import { autoCompleteHandler } from '../helpers/autoCompleteHandler';
import Button from '../../Button';
import { IResetPasswordData, doResetApi } from '@/app/api/auth/doReset';
import { getVisitorId } from '@/app/helpers/getVisitorId';

interface IProps {
  openLoginModal: () => void;
}

const ResetPasswordForm = ({ openLoginModal }: IProps) => {
  const { settings, loading: loadingSettings } = useSettings();
  const { isAuth } = useIsAuth();
  // const { doOpenModal } = useModal();
  const [loader, setLoader] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [resetPasswordData, setResetPasswordData] = useState<IResetPasswordData>({
    email: '',
    phone: '',
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

  const sendData = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    try {
      e.preventDefault();
      setLoader(true);
      const fid = await getVisitorId();
      const data = await doResetApi({ ...resetPasswordData, fid });
      console.log(data);
      // TODO: сделать вторую часть модалки ( 3 поля ввода, код с почты/смс и новый пароль + повторить пароль)
      // TODO: в ответе приходит хеш, который так же нужно отправлять
      // doOpenModal("reset-complete")
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
      <div className={styles.title}>Забыли пароль?</div>
      {formType == 'full' && (
        <div className="row">
          <div className="tab" style={{ display: 'flex' }}>
            <Input
              placeholder="Электронная почта"
              type="email"
              containerClassName={styles.input}
              value={String(resetPasswordData.email)}
              validationFunction={validateEmail}
              validationTimeout={2500}
              message={!validateEmail(resetPasswordData.email) ? 'Введите корректный e-mail' : null}
              autoComplete={autoCompleteHandler('email')}
              isError={isError}
              onChange={(e) => {
                setResetPasswordData((prev) => ({ ...prev, email: e.target.value }));
                setResetPasswordData((prev) => ({ ...prev, phone: '' }));
              }}
            />
            <Input
              placeholder="Номер телефона"
              type="text"
              containerClassName={styles.input}
              value={String(resetPasswordData.phone)}
              validationFunction={validatePhone}
              validationTimeout={2500}
              message={
                !validatePhone(resetPasswordData.phone) ? 'Введите корректный телефон' : null
              }
              autoComplete={autoCompleteHandler('phone')}
              isError={isError}
              onChange={(e) => {
                setResetPasswordData((prev) => ({ ...prev, email: '' }));
                setResetPasswordData((prev) => ({ ...prev, phone: e.target.value }));
              }}
            />
          </div>
        </div>
      )}
      {formType == 'email' && (
        <Input
          placeholder="Электронная почта"
          type="email"
          containerClassName={styles.input}
          value={String(resetPasswordData.email)}
          validationFunction={validateEmail}
          validationTimeout={2500}
          message={!validateEmail(resetPasswordData.email) ? 'Введите корректный e-mail' : null}
          autoComplete={autoCompleteHandler('email')}
          isError={isError}
          onChange={(e) => setResetPasswordData((prev) => ({ ...prev, email: e.target.value }))}
        />
      )}
      {formType == 'phone' && (
        <Input
          placeholder="Номер телефона"
          type="text"
          containerClassName={styles.input}
          value={String(resetPasswordData.phone)}
          validationFunction={validatePhone}
          validationTimeout={2500}
          message={!validatePhone(resetPasswordData.phone) ? 'Введите корректный телефон' : null}
          autoComplete={autoCompleteHandler('phone')}
          isError={isError}
          onChange={(e) => setResetPasswordData((prev) => ({ ...prev, phone: e.target.value }))}
        />
      )}
      {settings?.auth.reset.captcha ? (
        <ReCAPTCHA
          className={styles.captcha}
          sitekey={settings?.captcha_site_key ?? ''}
          onChange={(value: string | null) =>
            setResetPasswordData((prev) => ({ ...prev, captcha: value ?? '' }))
          }
        />
      ) : null}
      ,
      <Button
        disabled={!validateResetPassword(resetPasswordData)}
        className={styles.button}
        onClick={(e) => void sendData(e)}
      >
        Сбросить
      </Button>
      <div className={styles.label} onClick={openLoginModal}>
        Вспомнили аккаунт?
      </div>
    </form>
  );
};

export default ResetPasswordForm;
