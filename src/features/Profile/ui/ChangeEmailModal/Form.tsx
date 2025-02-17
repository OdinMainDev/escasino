import styles from './Form.module.scss';
import Button from '@/shared/ui/Button';
import { useModal } from '@/app/providers/ModalProvider';
import Input from '@/shared/ui/Input';
import Loader from '@/shared/ui/Loader';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { useState } from 'react';
import { IResponseError } from '@/shared/models/interfaces/misc';

import { getVisitorId } from '@/shared/helpers/getVisitorId';
import { ErrorResponseAsString } from '@/app/api/helpers';
import {
  IChangeEmailSendData,
  doChangeEmailSendApi,
  sampleIChangeEmailSendData,
} from '@/app/api/auth/change/emailChange';
import { getUser } from '@/store/slices/userSlice';
import { useTranslation } from 'react-i18next';
import { getEmailVerificationCode, getEmailVerificationHash } from '@/shared/helpers/location';
import { useEffect } from 'react';

const ProfileChangeEmailForm = () => {
  const { t } = useTranslation();
  const { settings, loading: loadingSettings } = useAppSelector((state) => state.settingsReducer);
  const { changeHash, doSetChangeHash, doOpenModal } = useModal();
  const [loader, setLoader] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<IResponseError>();
  const [changeData, setChangeData] = useState<IChangeEmailSendData>(sampleIChangeEmailSendData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const emailCode = getEmailVerificationCode();
    const emailHash = getEmailVerificationHash();
    if (emailCode && emailHash) {
      setChangeData((prev) => ({ ...prev, code: emailCode, hash: emailHash }));
    }
  }, []);

  const sendData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setLoader(true);
      const fid = await getVisitorId();
      await doChangeEmailSendApi({ ...changeData, hash: changeHash, fid });
      doSetChangeHash('');
      doOpenModal('change-email-complete');
      void dispatch(getUser());
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

  return (
    <form className={styles.container}>
      {(loader || loadingSettings || !settings) && (
        <div className={styles.loader_container}>
          <Loader />
        </div>
      )}
      <div>
        <div className={styles.title}>{t('changeEmail')}</div>
        <Input
          placeholder={t('enterCodeFromOldEmail')}
          type="text"
          isError={typeof errorData?.errors === 'object' && !!errorData?.errors['code']}
          containerClassName={styles.input}
          value={changeData.code}
          message={ErrorResponseAsString('code', t('enterCorrectConfirmationCode'), errorData)}
          onChange={(e) => setChangeData((prev) => ({ ...prev, code: e.target.value }))}
        />

        <Button className={styles.button} onClick={(e) => void sendData(e)}>
          {t('submit')}
        </Button>
      </div>
    </form>
  );
};

export default ProfileChangeEmailForm;
