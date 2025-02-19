import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import Loader from '@/shared/ui/Loader';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import { ErrorResponseAsString } from '@/app/api/helpers';
import { IResponseError } from '@/shared/models/interfaces/misc';

import { useTranslation } from 'react-i18next';
import { IPasswordData } from '../../models/password';
import { getVisitorId } from '@/shared/helpers/getVisitorId';
import { changePasswordHandler } from '../../api/password';
import ProfileResetPasswordModal from './ProfileResetPasswordModal';
import { AlertModal, IAlert } from '@/entities/AlertModal';
import { useModal } from '@/app/providers/ModalProvider';

const ProfilePasswordForm = () => {
  const { t } = useTranslation();
  const [changePassword, setChangePassword] = useState<IPasswordData>({
    password: '',
    fid: '',
    repeat_password: '',
    old_password: '',
  });
  const { doOpenModal, doCloseModals } = useModal();
  const [alertData, setAlertData] = useState<IAlert>({
    title: '',
    text: '',
    buttons: [],
    close: doCloseModals,
  });
  const [hash, setHash] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errorData, setErrorData] = useState<IResponseError>();
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const isChanged = Object.values(changePassword).some((value) => value !== '');
    setHasChanges(isChanged);
  }, [changePassword]);

  const sendData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setLoader(true);
      const passwordData = {
        ...changePassword,
        fid: await getVisitorId(),
      };
      setChangePassword(passwordData);
      const data = await changePasswordHandler(passwordData);
      if (data?.hash) {
        openModal();
        setHash(data.hash);
      } else {
        openSuccessAlert();
      }
      setErrorData(undefined);
    } catch (e) {
      const passwordError = e as IResponseError;
      const loginErrorList = Object.keys(passwordError.errors);

      if (!Array.isArray(loginErrorList)) {
        return;
      }
      setErrorData(passwordError);
    } finally {
      setLoader(false);
    }
  };

  const openSuccessAlert = () => {
    doOpenModal('alert');
    setAlertData({
      title: t('passwordChangedSuccessfully'),
      close: doCloseModals,
      buttons: [
        {
          type: 'contained',
          text: t('continue'),
          onClick: () => doCloseModals(),
        },
      ],
    });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <form className={styles.container}>
      {loader && (
        <div className={styles.loading}>
          <Loader />
        </div>
      )}

      <div className={styles.user_names}>
        <Input
          type="password"
          containerClassName={styles.input}
          placeholder={t('currentPassword')}
          value={changePassword.old_password}
          onChange={(e) => setChangePassword((prev) => ({ ...prev, old_password: e.target.value }))}
          isError={typeof errorData?.errors === 'object' && !!errorData.errors['old_password']}
          message={ErrorResponseAsString('old_password', t('enterCorrectPassword'), errorData)}
        />
        <Input
          type="password"
          containerClassName={styles.input}
          placeholder={t('newPassword')}
          value={changePassword.password}
          onChange={(e) => setChangePassword((prev) => ({ ...prev, password: e.target.value }))}
          isError={typeof errorData?.errors === 'object' && !!errorData.errors['password']}
          message={ErrorResponseAsString('password', t('enterCorrectPassword'), errorData)}
        />
        <Input
          type="password"
          containerClassName={styles.input}
          placeholder={t('repeatNewPassword')}
          value={changePassword.repeat_password}
          onChange={(e) =>
            setChangePassword((prev) => ({ ...prev, repeat_password: e.target.value }))
          }
          isError={typeof errorData?.errors === 'object' && !!errorData.errors['repeat_password']}
          message={ErrorResponseAsString('repeat_password', t('confirmPassword'), errorData)}
        />
      </div>
      <ProfileResetPasswordModal
        isOpen={isOpen}
        close={closeModal}
        openSuccessAlert={openSuccessAlert}
        hash={hash}
        passwordData={changePassword}
      />
      <AlertModal {...alertData} />
      <Button
        className={`${styles.save_button} ${hasChanges ? styles.has_changes : ''}`}
        onClick={(e) => void sendData(e)}
      >
        {t('save')}
      </Button>
    </form>
  );
};

export default ProfilePasswordForm;
