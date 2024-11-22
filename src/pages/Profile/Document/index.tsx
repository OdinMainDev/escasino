import styles from './styles.module.scss';
// import { ProgressBar } from '@/entities/ProgressBar';
import { useAppSelector } from '@/store/hooks/redux';
import VerificationModal from './DocumentVerificationModal';
import { IDocument, IVerificationHistoryItem, documentType } from './models';
import { useEffect, useState } from 'react';
import { getVerifications } from './api/historyApi';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DocumentItem from './DocumentItem';
import { PageHeader } from '@/widgets/Header';
import { objectToFormData } from '@/shared/helpers/objectToFormData';
import { sendDocument } from '@/app/api/document/documentApi';

const ProfileDocument = () => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.userReducer);
  const [verifications, setVerifications] = useState<IVerificationHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  // const [disabledVerifications, setDisabledVerifications] = useState<string[]>([]);
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState<{ isOpen: boolean; modalType: documentType }>({
    isOpen: false,
    modalType: 'passport',
  });

  const closeModal = () => {
    setOpenModal((prev) => ({ ...prev, isOpen: false }));
    document.body.classList.remove('overflow-hidden');
  };

  const openModalHandler = (type: documentType) => {
    document.body.classList.add('overflow-hidden');
    setOpenModal({
      isOpen: true,
      modalType: type,
    });
  };

  const getData = async () => {
    setVerifications(await getVerifications());
  };

  useEffect(() => {
    if (user?.data.documents_verified_at && user?.data.documents_verified_at > 0) {
      navigate('/profile');
      return;
    }
    void getData();
  }, []);

  const sendData = async (documentData: IDocument) => {
    try {
      setLoading(true);
      const formData = objectToFormData({
        ...documentData,
        tag: openModal.modalType,
      });
      await sendDocument(formData);
      await getData();
    } catch (e) {
      // setErrorData(e as IResponseError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <PageHeader fixed title={t('documents')} customBackPath="/profile" />
      <div className={styles.body}>
        <div className={styles.subtitle}>{t('addDocumentsToVerify')}</div>
        <div className={styles.buttons}>
          <DocumentItem
            title={t('sendYourPassword')}
            loading={loading && openModal.modalType === 'passport'}
            verifications={verifications}
            openModalHandler={openModalHandler}
            type="passport"
          />
          <DocumentItem
            title={t('sendYourCard')}
            loading={loading && openModal.modalType === 'card'}
            verifications={verifications}
            openModalHandler={openModalHandler}
            type="card"
          />
          <DocumentItem
            title={t('sendMore')}
            loading={loading && openModal.modalType === 'something'}
            verifications={verifications}
            openModalHandler={openModalHandler}
            type="something"
          />
        </div>
      </div>
      <VerificationModal
        sendData={(data) => void sendData(data)}
        isOpen={openModal.isOpen}
        close={closeModal}
      />
    </div>
  );
};

export default ProfileDocument;
