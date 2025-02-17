import { IModal } from '@/shared/models/interfaces/modal';
import { useModal } from '@/app/providers/ModalProvider';
import { useRouter } from '@/shared/helpers/navigation';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { AlertModal, IAlert } from '@/entities/AlertModal';

interface IProps extends IModal {
  gameId?: number;
}

const ModalZeroBalance = ({ close, gameId }: IProps) => {
  const { t } = useTranslation();
  const { doCloseModals } = useModal();
  const router = useRouter();
  const openGame = () => {
    if (close) {
      void close();
    }
    router.push('/play/real/' + gameId?.toString());
  };
  const openDeposit = () => {
    if (close) {
      void close();
    }
    router.push('/wallet/deposit');
  };

  const [alertData] = useState<IAlert>({
    title: t('attention'),
    text: (
      <div>
        <div className="mb-[5px]">{t('balanceEmpty')}</div>
      </div>
    ),
    buttons: [
      {
        type: 'outlined',
        text: t('toGame'),
        onClick: openGame,
      },
      {
        type: 'contained',
        text: t('topUpBalance'),
        onClick: openDeposit,
      },
    ],
    close: doCloseModals,
  });

  return <AlertModal {...alertData} />;
};

export default ModalZeroBalance;
