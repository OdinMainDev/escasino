import Modal from '@/shared/ui/Modal';
import React, { useState } from 'react';
import { I2FAPasswordData, IPasswordData } from '../../models/password';
import { IModal } from '@/shared/models/interfaces/modal';
import Input from '@/shared/ui/Input';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import { IResponseError } from '@/shared/models/interfaces/misc';
import { ErrorResponseAsString } from '@/app/api/helpers';
import Button from '@/shared/ui/Button';
import { change2FAPasswordHandler } from '../../api/password';
import Loader from '@/shared/ui/Loader';

interface IProps extends IModal {
  passwordData: IPasswordData;
  hash: string;
}
const ProfileResetPasswordModal = ({ isOpen, close, passwordData, hash }: IProps) => {
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  const [loader, setLoader] = useState(false);
  const [errorData, setErrorData] = useState<IResponseError>();
  const resetSetPassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setLoader(true);
      const changeData: I2FAPasswordData = {
        ...passwordData,
        hash,
        code,
      };
      await change2FAPasswordHandler(changeData);
      if (close) close();
    } catch (e) {
      const passwordError = e as IResponseError;
      const loginErrorList = Object.keys(passwordError.errors);

      if (!Array.isArray(loginErrorList)) {
        return;
      }
      setErrorData(passwordError);
      console.log(passwordError);
    } finally {
      setLoader(false);
    }
  };

  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.modal}>
        <div className={styles.title}>{t('codeFromMail')}</div>
        {loader && (
          <div className={styles.loading}>
            <Loader />
          </div>
        )}
        <Input
          containerClassName={styles.input}
          placeholder={t('confirmationCode')}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          isError={typeof errorData?.errors === 'object' && !!errorData.errors['code']}
          message={ErrorResponseAsString('code', t('enterCorrectConfirmationCode'), errorData)}
        />
        <Button className={styles.save_button} onClick={(e) => void resetSetPassword(e)}>
          {t('send')}
        </Button>
      </div>
    </Modal>
  );
};

export default ProfileResetPasswordModal;
