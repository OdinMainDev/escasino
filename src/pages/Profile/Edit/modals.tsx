import { useModal } from '@/app/providers/ModalProvider';
import ProfileChangePhoneModal from '@/features/Profile/ui/ChangePhoneModal';
import ProfileChangePhoneCompleteModal from '@/features/Profile/ui/ChangePhoneModalComplete';
import ProfileVerificationEmailModal from '@/features/Profile/ui/VerificationModalEmail';
import ProfileVerificationEmailCompleteModal from '@/features/Profile/ui/VerificationModalEmailComplete';
import ProfileVerificationPhoneModal from '@/features/Profile/ui/VerificationModalPhone';
import ProfileVerificationPhoneCompleteModal from '@/features/Profile/ui/VerificationModalPhoneComplete';

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
      <ProfileVerificationPhoneModal close={closeAll} />
      <ProfileVerificationPhoneCompleteModal close={closeAll} />
      <ProfileChangePhoneModal close={closeAll} />
      <ProfileChangePhoneCompleteModal close={closeAll} />
    </>
  );
};

export default FooterAuthModals;
