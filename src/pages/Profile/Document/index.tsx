import GoBackButton from '@/shared/ui/GoBackButton';
import styles from './styles.module.scss';
// import { ProgressBar } from '@/entities/ProgressBar';
import { useAppSelector } from '@/store/hooks/redux';
import VerificationModal from './DocumentVerificationModal';
import { IVerificationHistoryItem, documentType } from './models';
import { useEffect, useState } from 'react';
import { getVerifications } from './api/historyApi';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DocumentItem from './DocumentItem';

const ProfileDocument = () => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.userReducer);
  const [verifications, setVerifications] = useState<IVerificationHistoryItem[]>([]);
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.back}>
          <GoBackButton customPath="/profile" />
        </div>
        <div className="header_title">{t('documents')}</div>
      </div>
      <div className={styles.body}>
        <div className={styles.title}>{t('verifactionDocument')}</div>
        <div className={styles.subtitle}>{t('addDocumentsToVerify')}</div>
        <div className={styles.buttons}>
          <DocumentItem
            title={t('sendYourPassword')}
            verifications={verifications}
            openModalHandler={openModalHandler}
            type="passport"
          />
          <DocumentItem
            title={t('sendYourCard')}
            verifications={verifications}
            openModalHandler={openModalHandler}
            type="card"
          />
          <DocumentItem
            title={t('sendMore')}
            verifications={verifications}
            openModalHandler={openModalHandler}
            type="something"
          />
        </div>
      </div>
      <VerificationModal
        getData={() => void getData()}
        isOpen={openModal.isOpen}
        close={closeModal}
        modalType={openModal.modalType}
      />
    </div>
  );
};

export default ProfileDocument;
