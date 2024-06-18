import styles from './styles.module.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import dateFormatter from '@/shared/helpers/dateFormatter';
import { IVerificationHistoryItem } from '../models';

interface IProps {
  verification: IVerificationHistoryItem;
}

const HistoryItem = ({ verification }: IProps) => {
  const { t } = useTranslation();

  const getStatus = (status: number) => {
    switch (status) {
      case 1:
        return 'Accept';
      case 2:
        return 'Decline';
    }

    return 'Pending';
  };

  return (
    <div className={styles.container}>
      <div className="flex justify-between mb-[16px]">
        <div
          className={classNames(styles.status, {
            [styles.good]: getStatus(verification.status) === 'Accept',
            [styles.middle]: getStatus(verification.status) == 'Pending',
            [styles.bad]:
              getStatus(verification.status) === 'Decline' ||
              getStatus(verification.status) == 'Decline',
          })}
        >
          {t('historyVerificationStatuses.' + getStatus(verification.status))}
        </div>
      </div>
      <div className="flex justify-between mb-[10px]">
        <div className={styles.data}>
          <div className={styles.label}>Дата отправки</div>
          <div className={styles.value}>{dateFormatter(verification.created_at)}</div>
        </div>
        <div className={styles.data}>
          <div className={styles.label}>Тип документа</div>
          <div className={styles.value}>{verification.tag}</div>
        </div>
      </div>
      {verification.reason != '' && (
        <div className="flex justify-between mb-[10px]">
          <div className={styles.data}>
            <div className={styles.label}>Причина отказа</div>
            <div className={styles.value}>{verification.reason}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryItem;
