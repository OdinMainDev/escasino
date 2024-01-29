import styles from '../Header.module.scss';

interface IProps {
  quantity?: number;
}

const FilterIcon = ({ quantity }: IProps) => {
  return (
    <div className={styles.filter}>
      {quantity ? <div className={styles.filter_quantity}>{quantity}</div> : null}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M6 12H18M3 6H21M9 18H15"
          stroke="#E1E1E1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default FilterIcon;
