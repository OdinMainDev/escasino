import { IModal } from '@/shared/models/interfaces/modal';
import styles from '../AuthForm.module.scss';
import stylesText from './styles.module.scss';
import { useModal } from '@/app/providers/ModalProvider';
import Modal from '@/shared/ui/Modal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const TextAfterRegisterdModal = ({ close }: IModal) => {
  const { t } = useTranslation();
  const { modalName, isModalOpen } = useModal();

  const [isOpen, setIsOpen] = useState(isModalOpen && modalName == 'text-after-register');

  useEffect(() => {
    setIsOpen(isModalOpen && modalName == 'text-after-register');
  }, [isModalOpen, modalName]);

  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <p className={stylesText.text}>{t('textAfterRegister')}</p>
      </div>
    </Modal>
  );
};

export default TextAfterRegisterdModal;
