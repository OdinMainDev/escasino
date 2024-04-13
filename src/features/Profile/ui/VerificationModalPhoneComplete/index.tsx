import { IModal } from '@/shared/models/interfaces/modal';
import styles from '../Modals.module.scss';
import { useModal } from '@/app/providers/ModalProvider';
import Modal from '@/shared/ui/Modal';
import Form from './Form';

const ProfileVerificationPhoneCompleteModal = ({ close }: IModal) => {
  const { modalName, isModalOpen } = useModal();
  const isOpen = !isModalOpen ? false : modalName == 'verification-phone-complete';
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <Form />
      </div>
    </Modal>
  );
};

export default ProfileVerificationPhoneCompleteModal;
