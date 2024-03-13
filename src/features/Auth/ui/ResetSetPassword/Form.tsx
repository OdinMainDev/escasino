import { useState } from 'react';

import styles from './Form.module.scss';
import {
  validatePasswordLength,
  validatePasswordMatching,
  validateResetSetPassword,
} from '@/features/Auth/helpers/validators';

import Loader from '@/shared/components/Loader';
import Input from '@/shared/components/Input';
import Button from '@/shared/components/Button';
import { useAuthProvider } from '@/app/providers/AuthProvider';
import { useModal } from '@/app/providers/ModalProvider';
import { getVisitorId } from '@/shared/helpers/getVisitorId';
import { useAppSelector } from '@/store/hooks/redux';
import {
  IResetSetPasswordData,
  doResetSetPasswordApi,
  sampleIResetSetPasswordData,
} from '@/app/api/auth/doResetSetPassword';
import { IResponseError } from '@/entities/misc';
import { ErrorResponseAsString } from '@/app/api/helpers';

interface IProps {
  isPhone: boolean;
}

const AuthResetSetPassword = ({ isPhone }: IProps) => {
  const { settings, loading: loadingSettings } = useAppSelector((state) => state.settingsReducer);
  const { isAuth } = useAuthProvider();
  const { resetHash, doSetResetHash, doOpenModal } = useModal();
  const [loader, setLoader] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<IResponseError>();
  const [resetData, setResetData] = useState<IResetSetPasswordData>(sampleIResetSetPasswordData);

  const sendData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setLoader(true);
      const fid = await getVisitorId();
      await doResetSetPasswordApi({ ...resetData, hash: resetHash, fid });
      doSetResetHash('');
      doOpenModal('reset-set-password-complete');
    } catch (e: unknown) {
      const resetError = e as IResponseError;
      const errorList = Object.keys(resetError.errors);
      if (!Array.isArray(errorList)) {
        return;
      }
      console.log(errorList);
      setErrorData(resetError);
    } finally {
      setLoader(false);
    }
  };

  // TODO: сделать красивую модалку с визардом ( пошаговое заполнение ) как из дизайна
  // TODO: исправить отображение ошибок из запроса ( ErrorResponseAsString) ошибка при введенном не верном коде не показывается
  return (
    <form className={styles.container}>
      {(loader || loadingSettings || isAuth || !settings) && (
        <div className={styles.loader_container}>
          <Loader />
        </div>
      )}
      <div>
        <div className={styles.title}>Код подтверждения</div>
        <Input
          placeholder={!isPhone ? 'Введите код из смс' : 'Введите код отправленный на почту'}
          type="text"
          isError={!!errorData?.errors['code']}
          containerClassName={styles.input}
          value={resetData.code}
          message={ErrorResponseAsString('code', 'Проверочный код указан не верно', errorData)}
          onChange={(e) => setResetData((prev) => ({ ...prev, code: e.target.value }))}
        />
        <Input
          placeholder="Пароль"
          type="password"
          isError={!!errorData?.errors['password']}
          containerClassName={styles.input}
          value={resetData.password}
          validationFunction={validatePasswordLength}
          message={ErrorResponseAsString('password', 'Введите корректный пароль', errorData)}
          onChange={(e) => setResetData((prev) => ({ ...prev, password: e.target.value }))}
        />
        <Input
          placeholder="Повторите пароль"
          type="password"
          isError={!!errorData?.errors['repeat_password']}
          containerClassName={styles.input}
          validationFunction={(value) => validatePasswordMatching(resetData.password, value)}
          message={ErrorResponseAsString('repeat_password', 'Введите корректный пароль', errorData)}
          onChange={(e) => setResetData((prev) => ({ ...prev, repeat_password: e.target.value }))}
        />

        <Button
          disabled={!validateResetSetPassword(resetData)}
          className={styles.button}
          onClick={(e) => void sendData(e)}
        >
          Сбросить
        </Button>
      </div>
    </form>
  );
};

export default AuthResetSetPassword;
