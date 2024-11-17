import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

interface IProps {
  status: 'verified' | 'not-verified';
}

const Statuses = ({ status }: IProps) => {
  const { t } = useTranslation();

  if (status === 'not-verified') {
    return (
      <div className={styles.not_verified}>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.585786 2.84279L2.84279 0.585786C3.21786 0.210713 3.72657 0 4.257 0H7.743C8.27343 0 8.78214 0.210714 9.15722 0.585786L11.4142 2.84279C11.7893 3.21786 12 3.72657 12 4.257V7.743C12 8.27343 11.7893 8.78214 11.4142 9.15722L9.15721 11.4142C8.78214 11.7893 8.27343 12 7.743 12H4.257C3.72657 12 3.21786 11.7893 2.84279 11.4142L0.585786 9.15721C0.210713 8.78214 0 8.27343 0 7.743V4.257C0 3.72657 0.210714 3.21786 0.585786 2.84279ZM6 1.9C6.33137 1.9 6.6 2.16863 6.6 2.5V6C6.6 6.33137 6.33137 6.6 6 6.6C5.66863 6.6 5.4 6.33137 5.4 6V2.5C5.4 2.16863 5.66863 1.9 6 1.9ZM7 9C7 9.55228 6.55228 10 6 10C5.44772 10 5 9.55228 5 9C5 8.44771 5.44772 8 6 8C6.55228 8 7 8.44771 7 9Z"
            fill="var(--error-primary)"
          />
        </svg>

        <span>{t('documentNoVerified')}</span>
      </div>
    );
  }
  return (
    <div className={styles.verified}>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12ZM9.42426 4.42426C9.65858 4.18995 9.65858 3.81005 9.42426 3.57574C9.18995 3.34142 8.81005 3.34142 8.57574 3.57574L5 7.15147L3.42426 5.57574C3.18995 5.34142 2.81005 5.34142 2.57574 5.57574C2.34142 5.81005 2.34142 6.18995 2.57574 6.42426L4.57574 8.42426C4.81005 8.65858 5.18995 8.65858 5.42426 8.42426L9.42426 4.42426Z"
          fill="var(--success-primary)"
        />
      </svg>

      <span>{t('playerVerified')}</span>
    </div>
  );
};

export default Statuses;
