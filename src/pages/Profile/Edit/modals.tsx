import { useModal } from '@/app/providers/ModalProvider';
import ProfileVerificationEmailModal from '@/features/Profile/ui/VerificationModalEmail';
import ProfileVerificationEmailCompleteModal from '@/features/Profile/ui/VerificationModalEmailComplete';

const FooterAuthModals = () => {
  const { doCloseModals } = useModal();
  const closeAll = () => {
    document.body.classList.remove('overflow-hidden');
    doCloseModals();
  };

  return (
    <>
      <ProfileVerificationEmailModal close={closeAll} />
      <ProfileVerificationEmailCompleteModal close={closeAll} />
    </>
  );
};

export default FooterAuthModals;
