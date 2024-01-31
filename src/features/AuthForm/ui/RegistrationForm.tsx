'use client';

import styles from './RegistrationForm.module.scss';

import Button from '@/shared/ui/Button';
import Checkbox from '@/shared/ui/Checkbox';
import Input from '@/shared/ui/Input';
import { Telegram, Twitter, VK } from './Icons';
import Select from '@/shared/ui/Select';
import { useAppSelector } from '@/shared/hooks/redux';
import { ISelectOption } from '@/shared/models/interfaces/select';
import { useState } from 'react';
import { IRegisterData } from '../models/register';
import {
  validateEmail,
  validatePasswordLength,
  validatePasswordMatching,
} from '../helpers/validators';
import { getVisitorId } from '../helpers/getVisitorId';
import { registerHandlerApi } from '../api/registerApi';
import { IAuthError } from '../models/auth';

interface IProps {
  openLogin: () => void;
}

const RegistrationForm = ({ openLogin }: IProps) => {
  const { settings, loading } = useAppSelector((state) => state.settingsReducer);
  const [errorList, setErrorList] = useState<string[]>([]);
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

  const sendData = async () => {
    try {
      const fid = await getVisitorId();
      await registerHandlerApi({ ...registerData, fid });
    } catch (e: unknown) {
      const regError = e as IAuthError;
      const errorList = Object.keys(regError.error);
      if (Array.isArray(errorList)) {
        console.log(errorList);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Регистрация нового игрока</div>
      <Input
        placeholder="Электронная почта"
        type="email"
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
        optionList={optionList}
        value={registerData.currency}
        onChange={(e) => setRegisterData((prev) => ({ ...prev, currency: e.target.value }))}
      />
      <div className={styles.checkbox}>
        <Checkbox
          value={registerData.terms}
          onChange={(value) => setRegisterData((prev) => ({ ...prev, terms: value }))}
        />
        <div>
          Я ознакомился с <span>правилами и условиями</span>
        </div>
      </div>
      <div className={styles.subtitle}>C помощью социальных сетей</div>
      <div className={styles.social}>
        <Telegram />
        <Twitter />
        <VK />
      </div>
      <Button type="submit" className={styles.button} onClick={() => void sendData()}>
        Зарегистрироваться
      </Button>
      <div className={styles.label}>
        У вас уже есть личный кабинет? <span onClick={openLogin}>Войти</span>
      </div>
    </div>
  );
};

export default RegistrationForm;
