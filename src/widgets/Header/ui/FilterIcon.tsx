import Icons from '@/shared/ui/Icons';
import styles from '../styles.module.scss';

interface IProps {
  quantity?: number;
}

const FilterIcon = ({ quantity }: IProps) => {
  return (
    <div className={styles.filter}>
      {quantity ? <div className={styles.filter_quantity}>{quantity}</div> : null}
      <Icons icon="filter" />
    </div>
  );
};

export default FilterIcon;
