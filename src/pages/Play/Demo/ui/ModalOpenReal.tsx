import { IModal } from '@/shared/models/interfaces/modal';
import { useModal } from '@/app/providers/ModalProvider';
import { useRouter } from '@/shared/helpers/navigation';
import { useAuthProvider } from '@/app/providers/AuthProvider';
import { useTranslation } from 'react-i18next';
import { AlertModal, IAlert } from '@/entities/AlertModal';
import { useState } from 'react';

interface IProps extends IModal {
  gameId: number;
}

const ModalOpenReal = ({ close, gameId }: IProps) => {
  const { t } = useTranslation();
  const { doOpenModal } = useModal();
  const { isAuth } = useAuthProvider();
  const { doCloseModals } = useModal();
  const router = useRouter();
  const openGame = () => {
    if (!isAuth) {
      void doOpenModal('login');
      return;
    }
    router.push('/play/real/' + gameId?.toString());
  };

  const [alertData] = useState<IAlert>({
    title: t('attention'),
    text: (
      <div>
        <div className="mb-[5px]">{t('notFuckedUpDemoGames')}</div>
      </div>
    ),
    buttons: [
      {
        type: 'outlined',
        text: t('return'),
        onClick: () => close?.(),
      },
      {
        type: 'contained',
        text: t('toReal'),
        onClick: openGame,
      },
    ],
    close: doCloseModals,
  });

  return <AlertModal {...alertData} />;
};

export default ModalOpenReal;
