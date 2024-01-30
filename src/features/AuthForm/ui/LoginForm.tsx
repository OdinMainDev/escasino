import ReCAPTCHA from 'react-google-recaptcha';
import { useState } from 'react';
import styles from './LoginForm.module.scss';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import { ILoginData } from '../models/login';
import { loginHandlerApi } from '../api/loginApi';
import { getVisitorId } from '../helpers/getVisitorId';
import { useAppSelector } from '@/shared/hooks/redux';

interface IProps {
  openRegistration: () => void;
}

const LoginForm = ({ openRegistration }: IProps) => {
  const { settings, loading } = useAppSelector((state) => state.settingsReducer);
  const [loginData, setLoginData] = useState<ILoginData>({
    email: '',
    password: '',
    fid: '',
    captcha: '',
    remember: false,
  });

  const sendData = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    try {
      e.preventDefault();
      const fid = await getVisitorId();
      await loginHandlerApi({ ...loginData, fid });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className={styles.container}>
      <div className={styles.title}>Войти в личный кабинет</div>
      <Input
        placeholder="Электронная почта"
        type="email"
        containerClassName={styles.input}
        value={loginData.email}
        onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
      />
      <Input
        placeholder="Пароль"
        type="password"
        containerClassName={styles.input}
        value={loginData.password}
        onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
      />
      <div className={styles.forgot}>Я забыл пароль</div>
      <div className={styles.subtitle}>C помощью социальных сетей</div>
      <div className={styles.social}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <rect x="0.5" y="0.5" width="39" height="39" rx="3.5" stroke="#1F1F1F" />
          <path
            d="M18.0518 21.9635L17.7702 26.1828C18.184 26.1828 18.3669 25.9936 18.5978 25.769L20.586 23.8357L24.7223 26.8917C25.4835 27.3117 26.0329 27.0942 26.2225 26.185L28.9379 13.3894C29.2159 12.2748 28.513 11.7693 27.7848 12.0999L11.8404 18.2479C10.7521 18.6845 10.7584 19.2917 11.6421 19.5622L15.7337 20.8393L25.2064 14.8631C25.6536 14.5919 26.064 14.7377 25.7271 15.0367L18.0516 21.9633L18.0518 21.9635Z"
            fill="#E1E1E1"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <rect x="0.5" y="0.5" width="39" height="39" rx="3.5" stroke="#1F1F1F" />
          <path
            d="M19.74 16.957L19.779 17.6004L19.1287 17.5216C16.7617 17.2196 14.6937 16.1954 12.9379 14.4754L12.0795 13.6219L11.8584 14.2521C11.3902 15.6571 11.6893 17.1408 12.6648 18.1387C13.185 18.6902 13.068 18.769 12.1705 18.4407C11.8584 18.3357 11.5853 18.2569 11.5593 18.2963C11.4682 18.3882 11.7804 19.5831 12.0275 20.0558C12.3656 20.7123 13.0549 21.3557 13.8093 21.7365L14.4466 22.0385L13.6922 22.0516C12.9639 22.0516 12.9379 22.0647 13.0159 22.3404C13.276 23.1939 14.3035 24.0999 15.448 24.4938L16.2544 24.7696L15.5521 25.1897C14.5116 25.7937 13.2891 26.1351 12.0665 26.1614C11.4812 26.1745 11 26.227 11 26.2664C11 26.3977 12.5867 27.133 13.5102 27.4219C16.2804 28.2754 19.5709 27.9077 22.0421 26.4503C23.7979 25.413 25.5537 23.3515 26.3731 21.3557C26.8153 20.2921 27.2575 18.3488 27.2575 17.4166C27.2575 16.8126 27.2965 16.7338 28.0248 16.0116C28.454 15.5914 28.8572 15.1319 28.9353 15.0006C29.0653 14.7511 29.0523 14.7511 28.389 14.9743C27.2835 15.3682 27.1274 15.3157 27.6737 14.7248C28.0769 14.3047 28.5581 13.5431 28.5581 13.3199C28.5581 13.2805 28.363 13.3461 28.1419 13.4643C27.9078 13.5956 27.3876 13.7926 26.9974 13.9108L26.295 14.134L25.6578 13.7007C25.3066 13.4643 24.8124 13.2017 24.5522 13.1229C23.8889 12.9391 22.8745 12.9654 22.2762 13.1755C20.6504 13.7663 19.623 15.2894 19.74 16.957Z"
            fill="#E1E1E1"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <rect x="0.5" y="0.5" width="39" height="39" rx="3.5" stroke="#1F1F1F" />
          <path
            d="M20.8827 25.0379C20.8827 25.0379 21.2076 25.0024 21.374 24.827C21.5263 24.6663 21.521 24.3629 21.521 24.3629C21.521 24.3629 21.5008 22.9466 22.1707 22.7374C22.831 22.5318 23.6788 24.1071 24.5786 24.7129C25.2582 25.171 25.7741 25.0707 25.7741 25.0707L28.1785 25.0379C28.1785 25.0379 29.4356 24.9618 28.8396 23.9913C28.7903 23.9118 28.4919 23.2732 27.0525 21.9614C25.5444 20.5882 25.7469 20.8103 27.5622 18.4347C28.668 16.988 29.1099 16.1049 28.9717 15.7272C28.8405 15.366 28.027 15.4619 28.027 15.4619L25.3207 15.4783C25.3207 15.4783 25.12 15.4515 24.9712 15.5388C24.826 15.6244 24.7318 15.824 24.7318 15.824C24.7318 15.824 24.3039 16.9431 23.7325 17.8954C22.5273 19.9038 22.0457 20.0101 21.8485 19.8856C21.3898 19.5944 21.5043 18.7173 21.5043 18.0942C21.5043 16.1472 21.8054 15.3357 20.9188 15.1257C20.6248 15.0557 20.4082 15.0099 19.6555 15.0022C18.6897 14.9927 17.8727 15.0056 17.4096 15.2277C17.1015 15.3755 16.8638 15.7056 17.0091 15.7246C17.1878 15.7479 17.5928 15.8318 17.8076 16.1187C18.0849 16.4894 18.0752 17.3208 18.0752 17.3208C18.0752 17.3208 18.2346 19.6126 17.7028 19.8969C17.3383 20.0922 16.8383 19.6938 15.7633 17.8712C15.2131 16.9379 14.7976 15.9061 14.7976 15.9061C14.7976 15.9061 14.7174 15.7134 14.5739 15.6097C14.4005 15.4844 14.1584 15.4455 14.1584 15.4455L11.5868 15.4619C11.5868 15.4619 11.2003 15.4723 11.0586 15.6373C10.9327 15.7834 11.0489 16.0867 11.0489 16.0867C11.0489 16.0867 13.0623 20.7109 15.3425 23.0416C17.4334 25.1779 19.8069 25.0379 19.8069 25.0379H20.8827Z"
            fill="#E1E1E1"
          />
        </svg>
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
      <Button className={styles.button} onClick={(e) => void sendData(e)}>
        Войти
      </Button>
      <div className={styles.label}>
        Нет личного кабинета? <span onClick={openRegistration}>Зарегистрироваться</span>
      </div>
    </form>
  );
};

export default LoginForm;
