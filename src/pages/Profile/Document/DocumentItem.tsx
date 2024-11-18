import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import Statuses, { StatusesType } from '@/entities/Statuses';
import { documentType, IVerificationHistoryItem } from './models';
import Button from '@/shared/ui/Button';
import { useEffect, useState } from 'react';
import Icons from '@/shared/ui/Icons';
import classNames from 'classnames';

interface IProps {
  title: string;
  verifications: IVerificationHistoryItem[];
  type: 'passport' | 'card' | 'something';
  loading: boolean;
  openModalHandler: (val: documentType) => void;
}
const DocumentItem = ({ title, verifications, openModalHandler, type, loading }: IProps) => {
  const { t } = useTranslation();
  const [documentLoader, setDocumentLoader] = useState(loading);
  const [active, setActive] = useState<boolean>(false);
  const statusConverter = (status: number): StatusesType => {
    if (status === 0) {
      return 'middle';
    }

    if (status === 1) {
      return 'good';
    }
    return 'bad';
  };

  useEffect(() => {
    if (!loading) {
      setActive(true);
      setTimeout(() => {
        setDocumentLoader(false);
        setActive(false);
      }, 1000);
    } else {
      setDocumentLoader(true);
    }
  }, [loading]);

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
      {!documentLoader ? (
        verifications.find((item) => item.tag === type) && (
          <Statuses
            status={statusConverter(
              Number(verifications.find((item) => item.tag === type)?.status),
            )}
            text={statusConvertToText(
              Number(verifications.find((item) => item.tag === type)?.status),
            )}
          />
        )
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.loading}>
            <Icons icon="clock" />
            {t('loading...')}
          </div>
          <div className={styles.loading_progress}>
            <div
              className={classNames(styles.loading_status, {
                [styles.is_active]: active,
              })}
            />
          </div>
        </div>
      )}

      <Button elType="outlined" className="w-[100%]" onClick={() => openModalHandler(type)}>
        {t('upload')}
      </Button>
    </div>
  );
};

export default DocumentItem;
