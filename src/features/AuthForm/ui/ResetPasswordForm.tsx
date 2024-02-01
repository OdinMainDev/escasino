import ReCAPTCHA from 'react-google-recaptcha';
import Cookies from 'js-cookie';
import { useState } from 'react';
import styles from './LoginForm.module.scss';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import { getVisitorId } from '../helpers/getVisitorId';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { autoCompleteHandler } from '../helpers/autoCompleteHandler';
import Loader from '@/shared/ui/Loader';
import { validateEmail, validateResetPassword } from '../helpers/validators';
import { closeResetPasswordModal, openLoginModal } from '@/store/slices/authModalSlice';
import { IResetPasswordData } from '../models/resetPassword';
import { resetPasswordHandlerApi } from '../api/resetPasswordApi';

const ResetPasswordForm = () => {
  const { settings, loading } = useAppSelector((state) => state.settingsReducer);
  const [isError, setIsError] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [resetPasswordData, setResetPasswordData] = useState<IResetPasswordData>({
    email: '',
    fid: '',
    captcha: '',
    remember: false,
  });

  const handleInputChange = (value: string) => {
    setResetPasswordData((prev) => ({ ...prev, email: value }));
    setIsError(false);
  };

  const sendData = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    try {
      e.preventDefault();
      setLoader(true);
      const fid = await getVisitorId();
      const data = await resetPasswordHandlerApi({ ...resetPasswordData, fid });
      Cookies.set('token', data.token);
      document.body.classList.remove('overflow-hidden');
      dispatch(closeResetPasswordModal());
    } catch (e: unknown) {
      setIsError(true);
    } finally {
      setLoader(false);
    }
  };

  const openLogin = () => {
    document.body.classList.add('overflow-hidden');
    dispatch(openLoginModal());
  };

  return (
    <form className={styles.container}>
      {loader && (
        <div className={styles.loader_container}>
          <Loader />
        </div>
      )}
      <div className={styles.title}>Забыли пароль?</div>
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
        onChange={(e) => handleInputChange(e.target.value)}
      />
      {!loading ? (
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
      <div className={styles.label} onClick={openLogin}>
        Вспомнили аккаунт?
      </div>
    </form>
  );
};

export default ResetPasswordForm;
