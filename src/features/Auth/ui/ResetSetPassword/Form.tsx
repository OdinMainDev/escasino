import { useState } from 'react';

import styles from './Form.module.scss';
import {
  validatePasswordLength,
  validatePasswordMatching,
  validateResetSetPassword,
} from '@/features/Auth/helpers/validators';

import Loader from '@/shared/ui/Loader';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import { useAuthProvider } from '@/app/providers/AuthProvider';
import { useModal } from '@/app/providers/ModalProvider';
import { getVisitorId } from '@/shared/helpers/getVisitorId';
import { useAppSelector } from '@/store/hooks/redux';
import {
  IResetSetPasswordData,
  doResetSetPasswordApi,
  sampleIResetSetPasswordData,
} from '@/app/api/auth/doResetSetPassword';
import { IResponseError } from '@/shared/models/interfaces/misc';
import { ErrorResponseAsString } from '@/app/api/helpers';

interface IProps {
  isPhone: boolean;
}

const AuthResetSetPassword = ({ isPhone }: IProps) => {
  const { settings, loading: loadingSettings } = useAppSelector((state) => state.settingsReducer);
  const { isAuth } = useAuthProvider();
  const { resetHash, doSetResetHash, doOpenModal } = useModal();
  const [loader, setLoader] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<IResponseError | null>(null);
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
      setErrorData(resetError);
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
        <div className={styles.title}>Код подтверждения</div>
        <Input
          placeholder={isPhone ? 'Введите код из смс' : 'Введите код отправленный на почту'}
          isError={!!errorData?.errors['сode']}
          containerClassName={styles.input}
          validationFunction={() => true}
          value={resetData.code}
          message={ErrorResponseAsString('сode', 'Проверочный код указан не верно', errorData)}
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
