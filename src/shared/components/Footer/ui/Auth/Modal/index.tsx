import { useModal } from '@/app/providers/ModalProvider';
import AuthLoginModal from '@/features/Auth/ui/Login';
import AuthRegisterModal from '@/features/Auth/ui/Register';
// import AuthResetModal from '@/features/Auth/ui/Reset';
// import AuthResetModal from '@/features/Auth/ui/ResetSendComplete';
// import AuthResetModal from '@/features/Auth/ui/ResetSetPassword';

const FooterAuthModals = () => {
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
      <AuthRegisterModal close={closeRegistration} openLoginModal={openLogin} />
      {/* <AuthResetPasswordModal close={closeResetPassword} openLoginModal={openLogin} /> */}
    </>
  );
};

export default FooterAuthModals;
