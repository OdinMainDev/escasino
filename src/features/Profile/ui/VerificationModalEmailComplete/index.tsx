import { IModal } from '@/entities/modal';
import styles from '../Modals.module.scss';
import { useModal } from '@/app/providers/ModalProvider';
import Modal from '@/shared/components/Modal';
import Form from './Form';

const ProfileVerificationEmailCompleteModal = ({ close }: IModal) => {
  const { modalName, isModalOpen } = useModal();
  const isOpen = !isModalOpen ? false : modalName == 'verification-email-complete';
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <Form />
      </div>
    </Modal>
  );
};

export default ProfileVerificationEmailCompleteModal;
