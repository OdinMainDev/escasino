import Modal from '@/shared/ui/Modal';
import styles from './DocumentVerificationModal.module.scss';
import Button from '@/shared/ui/Button';
import { useState } from 'react';
import { documentType, IDocument } from './models';
import { sendDocument } from '@/app/api/document/documentApi';
import { objectToFormData } from '@/shared/helpers/objectToFormData';
import { getVisitorId } from '@/shared/helpers/getVisitorId';
import { IResponseError } from '@/shared/models/interfaces/misc';
import { ErrorResponseAsString } from '@/app/api/helpers';
import { useTranslation } from 'react-i18next';

interface IProps {
  isOpen: boolean;
  close: () => void;
  modalType: documentType;
  getData: () => void;
}

const VerificationModal = ({ isOpen, close, modalType, getData }: IProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [errorData, setErrorData] = useState<IResponseError>();
  const [documentData, setDocumentData] = useState<IDocument>({
    fid: '',
    file: null,
    tag: '',
  });

  const sendData = async () => {
    try {
      setLoading(true);
      const fid = await getVisitorId();
      const formData = objectToFormData({
        ...documentData,
        tag: modalType,
        fid,
      });
      await sendDocument(formData);
      setDocumentData({
        fid: '',
        file: null,
        tag: '',
      });
      getData();
      close();
    } catch (e) {
      setErrorData(e as IResponseError);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setDocumentData((prev) => ({ ...prev, file: files[0] }));
    }
  };
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.title}>{t('loadingDocument')}</div>
          <label className={styles.image_container}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="var(--text-primary)"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_3_20)">
                <path
                  d="M11.0937 3.4375C10.15 3.56875 9.43125 4.05625 8.95 4.89375C8.79375 5.1625 8.625 5.76875 8.625 6.05V6.24375L5.76875 6.26875C2.6625 6.29375 2.75 6.28125 1.95625 6.66875C1.73125 6.775 1.4125 7.01875 1.11875 7.3125C0.7375 7.6875 0.5875 7.8875 0.3875 8.3125C0.25 8.60625 0.10625 9.0125 0.06875 9.2125C0.01875 9.4625 0 12.1437 0 17.4625C0 23.975 0.01875 25.4125 0.0875 25.7562C0.35625 27.025 1.35625 28.0625 2.71875 28.4812C3.075 28.5875 3.64375 28.5938 16 28.5938C28.1375 28.5938 28.9312 28.5875 29.3062 28.4812C30.4562 28.1687 31.3625 27.3 31.8312 26.0812L31.9687 25.7187L31.9875 17.625C32.0062 8.675 32.0187 9.0625 31.6062 8.2375C31.35 7.71875 30.5437 6.9125 30.0437 6.66875C29.25 6.28125 29.3375 6.29375 26.2375 6.26875L23.3812 6.24375L23.3437 5.95C23.175 4.7375 22.4937 3.925 21.3187 3.5125C21.0687 3.425 20.4562 3.4125 16.25 3.4C13.6187 3.39375 11.3 3.4125 11.0937 3.4375ZM21.0937 5.11875C21.6 5.35 21.75 5.68125 21.75 6.56875C21.75 7.26875 21.8312 7.5375 22.1125 7.73125C22.2687 7.8375 22.5312 7.84375 25.5937 7.875L28.9062 7.90625L29.25 8.06875C29.6875 8.275 30.0375 8.625 30.2437 9.0625L30.4062 9.40625V17.375V25.3437L30.2625 25.7C30.0812 26.1562 29.6625 26.5812 29.2 26.8L28.8437 26.9687H16H3.15625L2.8 26.8C2.33125 26.5812 1.91875 26.15 1.75625 25.7125C1.625 25.375 1.625 25.2937 1.625 17.4375C1.625 9.6125 1.625 9.5 1.75 9.1625C1.91875 8.7125 2.3 8.29375 2.7375 8.08125L3.09375 7.90625L6.40625 7.875C8.8875 7.85 9.75 7.825 9.85625 7.76875C10.1625 7.5875 10.2625 7.35 10.2875 6.66875C10.3062 6.31875 10.3312 5.9375 10.35 5.825C10.3875 5.58125 10.7062 5.2 10.9687 5.0875C11.1187 5.01875 12.1375 5.00625 16 5.00625C20.5687 5 20.8562 5.00625 21.0937 5.11875Z"
                  fill="var(--text-primary)"
                />
                <path
                  d="M15.4062 9.97501C14.5375 10.0938 14.2 10.1625 13.65 10.3438C12.5062 10.7188 11.5937 11.2875 10.7187 12.1563C9.61247 13.2563 8.90622 14.6125 8.61872 16.1875C8.49997 16.85 8.53122 18.1813 8.68122 18.9125C9.40622 22.4188 12.4 24.8813 15.9375 24.8875C16.8687 24.8875 17.3812 24.8125 18.2187 24.5563C19.6812 24.1063 21.0312 23.1625 21.9437 21.9625C22.8 20.8375 23.2937 19.5563 23.4312 18.1063C23.8 14.2563 21.1187 10.75 17.2875 10.0688C16.875 9.99376 15.6937 9.93126 15.4062 9.97501ZM17.4062 11.8C18.0375 11.9813 18.35 12.1 18.8062 12.35C20.2125 13.125 21.2125 14.4063 21.6687 16.0188C21.8187 16.5563 21.85 18 21.725 18.625C21.425 20.1063 20.5187 21.4563 19.2937 22.2688C18.2687 22.95 17.2125 23.2688 16 23.2688C15.0625 23.2688 14.375 23.125 13.5875 22.7563C11.9562 21.9875 10.95 20.8313 10.4 19.0938C10.2312 18.5625 10.2187 18.4688 10.225 17.4688C10.225 16.4938 10.2375 16.3625 10.3937 15.8563C11.0687 13.6625 12.75 12.1375 14.9562 11.7125C15.5687 11.5938 16.8312 11.6438 17.4062 11.8Z"
                  fill="var(--text-primary)"
                />
                <path
                  d="M26.2188 10.0562C25.7 10.3 25.3688 10.825 25.3688 11.4062C25.3688 12.5062 26.4688 13.1937 27.475 12.725C28.5813 12.2125 28.5813 10.6 27.475 10.0875C27.0813 9.90622 26.575 9.88747 26.2188 10.0562Z"
                  fill="var(--text-primary)"
                />
              </g>
              <defs>
                <clipPath id="clip0_3_20">
                  <rect width="32" height="32" fill="var(--text-primary)" />
                </clipPath>
              </defs>
            </svg>

            <input type="file" onChange={handleFileChange} />
            <div className={styles.doc_name}>
              {documentData.file ? documentData.file.name : 'Загрузите фото вашего документа'}
            </div>
          </label>
          <div className={styles.error}>
            {ErrorResponseAsString('MaxFilesSent', t('limitOfSend'), errorData)}
            {ErrorResponseAsString('TagAlreadyUsed', t('youSendThisDocument'), errorData)}
          </div>
        </div>
        <Button onClick={() => void sendData()} disabled={loading} loading={loading}>
          {t('send')}
        </Button>
      </div>
    </Modal>
  );
};

export default VerificationModal;
