import { useModal } from '@/app/providers/ModalProvider';
import AuthLoginModal from './AuthLoginModal';
import AuthRegistrationModal from './AuthRegistrationModal';
import AuthResetPasswordModal from './AuthResetPasswordModal';

const AuthModal = () => {
  const { doOpenModal, doCloseModals } = useModal();
  const openLogin = () => {
    document.body.classList.add('overflow-hidden');
    doOpenModal('login');
  };

  const openRegistration = () => {
    document.body.classList.add('overflow-hidden');
    doOpenModal('register');
  };

  const openReset = () => {
    document.body.classList.add('overflow-hidden');
    doOpenModal('reset');
  };

  const closeLogin = () => {
    document.body.classList.remove('overflow-hidden');
    doCloseModals();
  };

  const closeRegistration = () => {
    document.body.classList.remove('overflow-hidden');
    doCloseModals();
  };

  const closeResetPassword = () => {
    document.body.classList.remove('overflow-hidden');
    doCloseModals();
  };

  return (
    <>
      <AuthLoginModal
        close={closeLogin}
        openRegistrationModal={openRegistration}
        openResetModal={openReset}
      />
      <AuthRegistrationModal close={closeRegistration} openLoginModal={openLogin} />
      <AuthResetPasswordModal close={closeResetPassword} openLoginModal={openLogin} />
    </>
  );
};

export default AuthModal;
