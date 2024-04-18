import { useModal } from '@/app/providers/ModalProvider';
import AuthLoginModal from '@/features/Auth/ui/Login';
import AuthRegisterModal from '@/features/Auth/ui/Register';
import AuthResetModal from '@/features/Auth/ui/Reset';
import AuthResetFormSetPasswordModal from '@/features/Auth/ui/ResetSetPassword';
import AuthResetSetPasswordCompleteModal from '@/features/Auth/ui/ResetSetPasswordComplete';

const FooterAuthModals = () => {
  const { doOpenModal, doCloseModals } = useModal();
  const openLogin = () => {
    document.body.classList.add('overflow-hidden');
    doCloseModals();
    doOpenModal('login');
  };

  const openRegistration = () => {
    document.body.classList.add('overflow-hidden');
    doCloseModals();
    doOpenModal('register');
  };

  const openReset = () => {
    document.body.classList.add('overflow-hidden');
    doCloseModals();
    doOpenModal('reset');
  };

  const closeAll = () => {
    document.body.classList.remove('overflow-hidden');
    doCloseModals();
  };

  return (
    <>
      <AuthLoginModal
        close={closeAll}
        openRegistrationModal={openRegistration}
        openResetModal={openReset}
      />
      <AuthRegisterModal close={closeAll} openLoginModal={openLogin} />
      <AuthResetModal close={closeAll} openLoginModal={openLogin} />
      <AuthResetFormSetPasswordModal close={closeAll} />
      <AuthResetSetPasswordCompleteModal close={closeAll} />
    </>
  );
};

export default FooterAuthModals;
