import Modal from '@/shared/ui/Modal';
import styles from './FilterModal.module.scss';
import { IModal } from '@/shared/models/interfaces/modal';
import Switch from '@/shared/ui/Switch';

const FilterModal = ({ isOpen, close }: IModal) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className={styles.container}>
        <div className={styles.title}>Фильтр и сортировка</div>
        <div className={styles.bonus}>
          <div className={styles.bonus_info}>
            <div className={styles.subtitle}>Собери бонус</div>
            <div className={styles.bonus_subtitle}>Игры с возможностью создать свой бонус</div>
          </div>
          <div className={styles.bonus_active}>
            <Switch />
          </div>
        </div>
        <div className={styles.type}>
          <div className={styles.subtitle}>Тип игры</div>
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;
