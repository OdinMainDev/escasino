import styles from './Form.module.scss';
import Button from '@/shared/ui/Button';
import { useModal } from '@/app/providers/ModalProvider';
import Input from '@/shared/ui/Input';
import Loader from '@/shared/ui/Loader';
import { useAppSelector } from '@/store/hooks/redux';
import { useState } from 'react';
import { IResponseError } from '@/shared/models/interfaces/misc';

import { getVisitorId } from '@/shared/helpers/getVisitorId';
import { ErrorResponseAsString } from '@/app/api/helpers';
import {
  IVerifyEmailConfirmData,
  doVerifyEmailConfirmApi,
  sampleIVerifyEmailConfirmData,
} from '@/app/api/auth/verification/emailVerify';

const ProfileVerificationEmailForm = () => {
  const { settings, loading: loadingSettings } = useAppSelector((state) => state.settingsReducer);
  const { verifyHash, doSetVerifyHash, doOpenModal } = useModal();
  const [loader, setLoader] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<IResponseError>();
  const [verifyData, setVerifyData] = useState<IVerifyEmailConfirmData>(
    sampleIVerifyEmailConfirmData,
  );

  const sendData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setLoader(true);
      const fid = await getVisitorId();
      await doVerifyEmailConfirmApi({ ...verifyData, hash: verifyHash, fid });
      doSetVerifyHash('');
      doOpenModal('verification-email-complete');
    } catch (e: unknown) {
      const errors = e as IResponseError;
      const errorList = Object.keys(errors.errors);
      if (!Array.isArray(errorList)) {
        return;
      }
      setErrorData(errors);
    } finally {
      setLoader(false);
    }
  };

  // TODO: исправить отображение ошибок
  return (
    <form className={styles.container}>
      {(loader || loadingSettings || !settings) && (
        <div className={styles.loader_container}>
          <Loader />
        </div>
      )}
      <div>
        <div className={styles.title}>Подтверждение почты</div>
        <Input
          placeholder="Введите код отправленный на почту"
          type="text"
          isError={!!errorData?.errors['code']}
          containerClassName={styles.input}
          value={verifyData.code}
          message={ErrorResponseAsString('code', 'Проверочный код указан не верно', errorData)}
          onChange={(e) => setVerifyData((prev) => ({ ...prev, code: e.target.value }))}
        />

        <Button className={styles.button} onClick={(e) => void sendData(e)}>
          Подтвердить
        </Button>
      </div>
    </form>
  );
};

export default ProfileVerificationEmailForm;
