import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import styles from './Form.module.scss';
import { validatePhone, validateResetPassword } from '@/features/Auth/helpers/validators';
import { autoCompleteHandler } from '@/features/Auth/helpers/autoCompleteHandler';

import Loader from '@/shared/ui/Loader';
import Input from '@/shared/ui/Input';
import Button from '@/shared/ui/Button';
import { useAuthProvider } from '@/app/providers/AuthProvider';
import { useModal } from '@/app/providers/ModalProvider';
import { getVisitorId } from '@/shared/helpers/getVisitorId';
import { useAppSelector } from '@/store/hooks/redux';
import { isAppDebug } from '@/app/config/app';
import { IResetData, doResetApi, sampleIResetData } from '@/app/api/auth/doReset';
import { IResponseError } from '@/shared/models/interfaces/misc';
import { ErrorResponseAsString } from '@/app/api/helpers';
import Tabs from '@/entities/Tabs';
import { useTranslation } from 'react-i18next';

interface IProps {
  openLoginModal: () => void;
}

const AuthResetForm = ({ openLoginModal }: IProps) => {
  const { t } = useTranslation();
  const { settings, loading: loadingSettings } = useAppSelector((state) => state.settingsReducer);
  const { isAuth } = useAuthProvider();
  const { doSetResetHash, doOpenModal } = useModal();
  const [loader, setLoader] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<IResponseError>();
  const [resetData, setResetData] = useState<IResetData>(sampleIResetData);
  const [selectedType, setSelectedType] = useState('email');

  const formType =
    settings?.auth.login.phone && settings?.auth.login.email
      ? 'full'
      : settings?.auth.login.phone
        ? 'phone'
        : 'email';

  const sendData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      setLoader(true);
      const fid = await getVisitorId();
      const data = await doResetApi({ ...resetData, fid });
      if (!settings?.auth.reset.use_alternative_method) {
        doSetResetHash(data.hash);
        doOpenModal(resetData.email != '' ? 'reset-confirm-email' : 'reset-confirm-phone');
      } else {
        doOpenModal('reset-send-complete');
      }
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
        <div className={styles.title}>{t('passwordRecovery')}</div>
        <div className="row">
          {formType === 'full' && (
            <Tabs
              className="mb-[36px]"
              value={selectedType}
              onChange={(value) => setSelectedType(value.value.toString())}
              tabs={[
                {
                  value: 'email',
                  label: t('email'),
                },
                {
                  value: 'phone',
                  label: t('phone'),
                },
              ]}
            />
          )}
          <div className="tab">
            {(formType === 'full' && selectedType === 'email') || formType === 'email' ? (
              <Input
                placeholder={t('email')}
                type="email"
                onChange={(e) => {
                  setResetData((prev) => ({ ...prev, email: e.target.value }));
                  if (!isAppDebug) {
                    setResetData((prev) => ({ ...prev, phone: '' }));
                  }
                }}
                containerClassName={styles.input}
                autoComplete={autoCompleteHandler('email')}
                isError={typeof errorData?.errors === 'object' && !!errorData?.errors['email']}
                message={ErrorResponseAsString('email', t('enterCorrectEmail'), errorData)}
              />
            ) : null}
            {(formType === 'full' && selectedType === 'phone') || formType === 'phone' ? (
              <Input
                placeholder={t('phone')}
                type="phone"
                containerClassName={styles.input}
                isError={typeof errorData?.errors === 'object' && !!errorData?.errors['phone']}
                validationFunction={validatePhone}
                // autoComplete={autoCompleteHandler('phone')}
                onChangePhone={(value) => {
                  setResetData((prev) => ({ ...prev, phone: value }));
                  if (!isAppDebug) {
                    setResetData((prev) => ({ ...prev, email: '' }));
                  }
                }}
                message={ErrorResponseAsString('phone', t('enterCorrectPhone'), errorData)}
              />
            ) : null}
          </div>
        </div>
        {settings?.auth.reset.captcha && (
          <ReCAPTCHA
            className={styles.captcha}
            sitekey={settings?.captcha_site_key ?? ''}
            onChange={(value: string | null) =>
              setResetData((prev) => ({ ...prev, captcha: value ?? '' }))
            }
          />
        )}

        <div className={styles.reset_text}>{t('reset-text')}</div>

        <Button
          disabled={!validateResetPassword(resetData)}
          className={styles.button}
          onClick={(e) => void sendData(e)}
        >
          {t('continue')}
        </Button>
        <div className={styles.label} onClick={openLoginModal}>
          {t('rememberAccount')}
        </div>
      </div>
    </form>
  );
};

export default AuthResetForm;
