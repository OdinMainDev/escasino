import Modal from '@/shared/ui/Modal';
import styles from './DocumentVerificationModal.module.scss';
import { IDocument } from './models';
import { useTranslation } from 'react-i18next';
import { getVisitorId } from '@/shared/helpers/getVisitorId';

interface IProps {
  isOpen: boolean;
  close: () => void;
  sendData: (documentData: IDocument) => void;
}

const VerificationModal = ({ isOpen, close, sendData }: IProps) => {
  const { t } = useTranslation();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fid = await getVisitorId();
      const data: IDocument = { fid, tag: '', file: files[0] };
      close();
      sendData(data);
    }
  };
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.title}>{t('loadingDocument')}</div>
          <div className={styles.subtitle}>{t('chooseDocument')}</div>
          <label className={styles.image_container}>
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 3.00012L16 5.00012L20 1.00012M10.5 1.00012H5.8C4.11984 1.00012 3.27976 1.00012 2.63803 1.3271C2.07354 1.61472 1.6146 2.07366 1.32698 2.63815C1 3.27989 1 4.11996 1 5.80012V14.2001C1 15.8803 1 16.7204 1.32698 17.3621C1.6146 17.9266 2.07354 18.3855 2.63803 18.6731C3.27976 19.0001 4.11984 19.0001 5.8 19.0001H15C15.93 19.0001 16.395 19.0001 16.7765 18.8979C17.8117 18.6205 18.6204 17.8119 18.8978 16.7766C19 16.3951 19 15.9301 19 15.0001M8.5 6.50012C8.5 7.60469 7.60457 8.50012 6.5 8.50012C5.39543 8.50012 4.5 7.60469 4.5 6.50012C4.5 5.39555 5.39543 4.50012 6.5 4.50012C7.60457 4.50012 8.5 5.39555 8.5 6.50012ZM12.99 9.91827L4.53115 17.6082C4.05536 18.0407 3.81747 18.257 3.79643 18.4443C3.77819 18.6067 3.84045 18.7678 3.96319 18.8757C4.10478 19.0001 4.42628 19.0001 5.06929 19.0001H14.456C15.8951 19.0001 16.6147 19.0001 17.1799 18.7583C17.8894 18.4548 18.4547 17.8896 18.7582 17.18C19 16.6149 19 15.8953 19 14.4561C19 13.9719 19 13.7298 18.9471 13.5043C18.8805 13.2209 18.753 12.9555 18.5733 12.7265C18.4303 12.5443 18.2412 12.3931 17.8631 12.0906L15.0658 9.85278C14.6874 9.55003 14.4982 9.39866 14.2898 9.34523C14.1061 9.29815 13.9129 9.30424 13.7325 9.36281C13.5279 9.42926 13.3486 9.59227 12.99 9.91827Z"
                stroke="#A1A1AA"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input type="file" onChange={(data) => void handleFileChange(data)} />
            <div className={styles.doc_name}>{'Выбрать в галерее'}</div>
          </label>
          {/* <div className={styles.error}>
            {ErrorResponseAsString('MaxFilesSent', t('limitOfSend'), errorData)}
            {ErrorResponseAsString('TagAlreadyUsed', t('youSendThisDocument'), errorData)}
          </div> */}
        </div>
      </div>
    </Modal>
  );
};

export default VerificationModal;
