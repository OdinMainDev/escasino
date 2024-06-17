import GoBackButton from '@/shared/ui/GoBackButton';
import styles from './styles.module.scss';
import Button from '@/shared/ui/Button';
import Icons from '@/shared/ui/Icons';
import { ProgressBar } from '@/entities/ProgressBar';
import { useAppSelector } from '@/store/hooks/redux';
import VerificationModal from './DocumentVerificationModal';
import { IVerificationHistoryItem, documentType } from './models';
import { useEffect, useState } from 'react';
import { getVerifications } from './api/historyApi';
import HistoryItem from './HistoryItem';
import { useNavigate } from 'react-router-dom';

const ProfileDocument = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const [verifications, setVerifications] = useState<IVerificationHistoryItem[]>([]);
  const [disabledVerifications, setDisabledVerifications] = useState<string[]>([]);
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

  useEffect(() => {
    if (user?.data.documents_verified_at && user?.data.documents_verified_at > 0) {
      navigate('/profile');
      return;
    }
    const getData = async () => {
      setVerifications(await getVerifications());
    };
    void getData();
  }, []);

  useEffect(() => {
    const temp: string[] = [];
    verifications.map((item) => {
      if (item.status == 0) {
        temp.push(item.tag);
      }
    });
    setDisabledVerifications(temp);
  }, [verifications]);


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.back}>
          <GoBackButton />
        </div>
        <div className="header_title">Документы</div>
      </div>
      <div className={styles.body}>
        <div className={styles.title}>Вeрификация документов</div>
        <div className={styles.subtitle}>Добавьте все документы чтобы быть верифицированным</div>
        <div className={styles.buttons}>
          <Button
            elType="outlined"
            className={styles.button}
            onClick={() => openModalHandler('passport')}
            disabled={disabledVerifications.includes('passport')}
          >
            <Icons icon="passport" />
            Отправьте ваш паспорт
          </Button>
          <Button
            elType="outlined"
            className={styles.button}
            onClick={() => openModalHandler('card')}
            disabled={disabledVerifications.includes('card')}
          >
            <Icons icon="card" />
            Отправьте вашу карту
          </Button>
          <Button
            elType="outlined"
            className={styles.button}
            onClick={() => openModalHandler('something')}
            disabled={disabledVerifications.includes('something')}
          >
            <Icons icon="document" />
            Отправьте еще что то
          </Button>
        </div>
        {verifications.map((item, index) => (
          <HistoryItem key={index} verification={item} />
        ))}
      </div>
      <div className={styles.footer}>
        Процесс верификации
        <div className={styles.progress}>
          <ProgressBar
            progress={
              disabledVerifications.length == 0
                ? 0
                : disabledVerifications.length == 1
                  ? 30
                  : disabledVerifications.length == 2
                    ? 60
                    : 90
            }
          />
        </div>
      </div>
      <VerificationModal
        isOpen={openModal.isOpen}
        close={closeModal}
        modalType={openModal.modalType}
      />
    </div>
  );
};

export default ProfileDocument;
