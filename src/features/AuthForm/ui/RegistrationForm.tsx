'use client';

import styles from './RegistrationForm.module.scss';
import Cookies from 'js-cookie';
import Button from '@/shared/ui/Button';
import Checkbox from '@/shared/ui/Checkbox';
import Input from '@/shared/ui/Input';
import { Telegram, Twitter, VK } from './Icons';
import Select from '@/shared/ui/Select';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux';
import { ISelectOption } from '@/shared/models/interfaces/select';
import { useRef, useState } from 'react';
import { IRegisterData } from '../models/register';
import {
  validateEmail,
  validatePasswordLength,
  validatePasswordMatching,
  validateRegister,
} from '../helpers/validators';
import { getVisitorId } from '../helpers/getVisitorId';
import { registerHandlerApi } from '../api/registerApi';
import { IAuthError } from '../models/auth';
import { registerRequireInputs } from '../constants/register';
import Loader from '@/shared/ui/Loader';
import { Link, useRouter } from '@/shared/hooks/navigation';
import { getMeUser } from '@/store/slices/userSlice';
import { closeRegistrationModal } from '@/store/slices/authModalSlice';

interface IProps {
  openLogin: () => void;
}

const RegistrationForm = ({ openLogin }: IProps) => {
  const { settings, loading } = useAppSelector((state) => state.settingsReducer);
  const [loader, setLoader] = useState<boolean>(false);
  const [errorList, setErrorList] = useState<string[]>([]);
  const errorTimout = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [registerData, setRegisterData] = useState<IRegisterData>({
    promo: false,
    email: '',
    password: '',
    terms: false,
    fid: '',
    currency: '',
    repeat_password: '',
  });
  const optionList: ISelectOption[] =
    !loading && settings
      ? [
          { value: '', label: 'Выберите валюту', disabled: true },
          ...settings.currencies.map((item) => ({ label: item, value: item })),
        ]
      : [];

  const sendData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setLoader(true);
      const fid = await getVisitorId();
      const data = await registerHandlerApi({ ...registerData, fid });
      Cookies.set('token', data.token);
      document.body.classList.remove('overflow-hidden');
      dispatch(closeRegistrationModal());
      await dispatch(getMeUser());
      router.push('/profile/edit');
    } catch (e: unknown) {
      const regError = e as IAuthError;
      const errorList = Object.keys(regError.error);
      if (Array.isArray(errorList)) {
        setErrorList(errorList);
      } else {
        if (errorTimout.current) {
          clearTimeout(errorTimout.current);
        }
        setErrorList(registerRequireInputs);
        errorTimout.current = setTimeout(() => {
          setErrorList([]);
        }, 1000);
      }
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
      <div className={styles.title}>Регистрация нового игрока</div>
      <Input
        placeholder="Электронная почта"
        type="email"
        isError={!!errorList.find((item) => item === 'email')}
        validationTimeout={2500}
        validationFunction={validateEmail}
        onChange={(e) => setRegisterData((prev) => ({ ...prev, email: e.target.value }))}
        containerClassName={styles.input}
        message={
          validateEmail(registerData.email)
            ? 'Будет использоваться как логин для входа'
            : 'Введите корректный e-mail'
        }
      />
      <Input
        placeholder="Пароль"
        type="password"
        isError={!!errorList.find((item) => item === 'password')}
        containerClassName={styles.input}
        value={registerData.password}
        validationTimeout={2500}
        validationFunction={validatePasswordLength}
        message={
          !validatePasswordLength(registerData.password)
            ? 'Пароль должен быть не менее 8 символов'
            : null
        }
        onChange={(e) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))}
      />
      <Input
        placeholder="Повторите пароль"
        type="password"
        isError={!!errorList.find((item) => item === 'repeat_password')}
        containerClassName={styles.input}
        validationTimeout={2500}
        validationFunction={(value) => validatePasswordMatching(registerData.password, value)}
        message={
          !validatePasswordMatching(registerData.password, registerData.repeat_password)
            ? 'Пароли не совпадают'
            : null
        }
        onChange={(e) => setRegisterData((prev) => ({ ...prev, repeat_password: e.target.value }))}
      />
      <Select
        isError={!!errorList.find((item) => item === 'currency')}
        optionList={optionList}
        value={registerData.currency}
        onChange={(e) => setRegisterData((prev) => ({ ...prev, currency: e.target.value }))}
      />
      <div className={styles.checkbox}>
        <Checkbox
          isError={!!errorList.find((item) => item === 'terms')}
          value={registerData.terms}
          onChange={(value) => setRegisterData((prev) => ({ ...prev, terms: value }))}
        />
        <div>
          Я ознакомился с <Link href="/terms">правилами и условиями</Link>
        </div>
      </div>
      <div className={styles.subtitle}>C помощью социальных сетей</div>
      <div className={styles.social}>
        <Telegram />
        <Twitter />
        <VK />
      </div>
      <Button
        type="submit"
        disabled={!validateRegister(registerData)}
        className={styles.button}
        onClick={(e) => void sendData(e)}
      >
        Зарегистрироваться
      </Button>
      <div className={styles.label}>
        У вас уже есть личный кабинет? <span onClick={openLogin}>Войти</span>
      </div>
    </form>
  );
};

export default RegistrationForm;
