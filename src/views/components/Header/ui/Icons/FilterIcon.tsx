import Icons from '@/views/components/Icons';
import styles from '../Header.module.scss';

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
