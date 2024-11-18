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
          <label className={styles.image_container}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 7.87735C1 7.52703 1 7.35187 1.01462 7.20433C1.1556 5.78139 2.28127 4.65572 3.70421 4.51474C3.85174 4.50012 4.03636 4.50012 4.40558 4.50012C4.54785 4.50012 4.61899 4.50012 4.67939 4.49646C5.45061 4.44976 6.12595 3.963 6.41414 3.24612C6.43671 3.18998 6.45781 3.12669 6.5 3.00012C6.54219 2.87355 6.56329 2.81026 6.58586 2.75412C6.87405 2.03725 7.54939 1.55049 8.32061 1.50378C8.38101 1.50012 8.44772 1.50012 8.58114 1.50012H13.4189C13.5523 1.50012 13.619 1.50012 13.6794 1.50378C14.4506 1.55049 15.126 2.03725 15.4141 2.75412C15.4367 2.81026 15.4578 2.87355 15.5 3.00012C15.5422 3.12669 15.5633 3.18998 15.5859 3.24612C15.874 3.963 16.5494 4.44976 17.3206 4.49646C17.381 4.50012 17.4521 4.50012 17.5944 4.50012C17.9636 4.50012 18.1483 4.50012 18.2958 4.51474C19.7187 4.65572 20.8444 5.78139 20.9854 7.20433C21 7.35187 21 7.52703 21 7.87735V15.7001C21 17.3803 21 18.2204 20.673 18.8621C20.3854 19.4266 19.9265 19.8855 19.362 20.1731C18.7202 20.5001 17.8802 20.5001 16.2 20.5001H5.8C4.11984 20.5001 3.27976 20.5001 2.63803 20.1731C2.07354 19.8855 1.6146 19.4266 1.32698 18.8621C1 18.2204 1 17.3803 1 15.7001V7.87735Z"
                stroke="#A1A1AA"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 16.0001C13.2091 16.0001 15 14.2093 15 12.0001C15 9.79098 13.2091 8.00012 11 8.00012C8.79086 8.00012 7 9.79098 7 12.0001C7 14.2093 8.79086 16.0001 11 16.0001Z"
                stroke="#A1A1AA"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(data) => void handleFileChange(data)}
            />
            <div className={styles.doc_name}>{'Сделать фото'}</div>
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
