import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import Statuses, { StatusesType } from '@/entities/Statuses';
import { documentType, IVerificationHistoryItem } from './models';
import Button from '@/shared/ui/Button';

interface IProps {
  title: string;
  verifications: IVerificationHistoryItem[];
  type: 'passport' | 'card' | 'something';
  openModalHandler: (val: documentType) => void;
}
const DocumentItem = ({ title, verifications, openModalHandler, type }: IProps) => {
  const { t } = useTranslation();
  const statusConverter = (status: number): StatusesType => {
    if (status === 0) {
      return 'middle';
    }

    if (status === 1) {
      return 'good';
    }
    return 'bad';
  };

  const statusConvertToText = (status: number): StatusesType => {
    if (status === 0) {
      return t('historyVerificationStatuses.Pending');
    }

    if (status === 1) {
      return t('historyVerificationStatuses.Accept');
    }

    return t('historyVerificationStatuses.Decline');
  };
  return (
    <div className={styles.document}>
      <div className={styles.document_title}>{title}</div>
      {verifications.find((item) => item.tag === type) && (
        <Statuses
          status={statusConverter(Number(verifications.find((item) => item.tag === type)?.status))}
          text={statusConvertToText(
            Number(verifications.find((item) => item.tag === type)?.status),
          )}
        />
      )}

      <Button elType="outlined" className="w-[100%]" onClick={() => openModalHandler(type)}>
        {t('upload')}
      </Button>
    </div>
  );
};

export default DocumentItem;
