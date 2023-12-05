import Input from '@/shared/ui/Input';
import styles from './ProfileForm.module.scss';
import Button from '@/shared/ui/Button';
import Textarea from '@/shared/ui/Textarea';

const ProfileForm = () => {
  return (
    <form className={styles.container}>
      <div className={styles.user_names}>
        <Input className={styles.input} placeholder="Фамилия" />
        <Input className={styles.input} placeholder="Имя" />
        <Input className={styles.input} placeholder="Отчество" />
      </div>
      <div className={styles.email_container}>
        <div className={styles.email_title}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M7.99976 5.99997V8.66664M7.99976 11.3333H8.00642M7.07663 2.59445L1.59338 12.0655C1.28924 12.5909 1.13717 12.8535 1.15965 13.0691C1.17925 13.2571 1.27776 13.428 1.43067 13.5392C1.60597 13.6666 1.90948 13.6666 2.5165 13.6666H13.483C14.09 13.6666 14.3935 13.6666 14.5688 13.5392C14.7217 13.428 14.8203 13.2571 14.8399 13.0691C14.8623 12.8535 14.7103 12.5909 14.4061 12.0655L8.92288 2.59445C8.61983 2.07101 8.46831 1.80929 8.27062 1.72139C8.09818 1.64471 7.90133 1.64471 7.72889 1.72139C7.5312 1.80929 7.37968 2.07101 7.07663 2.59445Z"
              stroke="#CF6679"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Подтвердите адрес электронной почты, чтобы получить бездепозитный бонус.</span>
        </div>
        <Input type="email" className={styles.email} placeholder="Электронная почта" />
        <Button elType="outlined" className={styles.email_button}>
          Подтвердить электронную почту
        </Button>
        <Input placeholder="Телефон" />
      </div>
      <Textarea placeholder="Адрес" className={styles.textarea} />
      <Button className={styles.save_button}>Сохранить</Button>
    </form>
  );
};

export default ProfileForm;
