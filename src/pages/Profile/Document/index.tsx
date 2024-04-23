import GoBackButton from '@/shared/ui/GoBackButton';
import styles from './styles.module.scss';
import Button from '@/shared/ui/Button';
import Icons from '@/shared/ui/Icons';
import { ProgressBar } from '@/entities/ProgressBar';
import { useAppSelector } from '@/store/hooks/redux';
import VerificationModal from './DocumentVerificationModal';
import { documentType } from './models';
import { useState } from 'react';

const ProfileDocument = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  // const [verificationStatus, setVerificationStatus] = useState({
  //   card: false,
  //   passport: false,
  //   something: false,
  // });
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
            disabled={user?.data.documents_verified_at !== 0}
          >
            <Icons icon="passport" />
            Отправьте ваш паспорт
          </Button>
          <Button
            elType="outlined"
            className={styles.button}
            onClick={() => openModalHandler('card')}
          >
            <Icons icon="card" />
            Отправьте вашу карту
          </Button>
          <Button
            elType="outlined"
            className={styles.button}
            onClick={() => openModalHandler('something')}
          >
            <Icons icon="document" />
            Отправьте еще что то
          </Button>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.progress}>
          <ProgressBar progress={10} />
        </div>
        <Button>Верифицировать</Button>
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
