import { IBonusTemplate } from '@/shared/models/interfaces/bonuses';
import styles from './BonusesItem.module.scss';
import PlaceholderImage from '@/app/assets/images/Placeholder/PlaceholderGame.png';
import { BaseHTMLAttributes } from 'react';
import { useAppDispatch } from '@/store/hooks/redux';
import { deleteCartBonusesItem } from '@/store/slices/cartBonusesSlice';

interface IProps extends BaseHTMLAttributes<HTMLElement> {
  template: IBonusTemplate;
}
const BonusesItem = ({ template, ...otherProps }: IProps) => {
  const data = false;
  const dispatch = useAppDispatch();
  return (
    <div className={styles.container} {...otherProps}>
      {data ? (
        <img className={styles.img} alt={template.id.toString()} src="" />
      ) : (
        <img className={styles.img} alt={template.id.toString()} src={PlaceholderImage} />
      )}
      <div className="flex flex-col gap-[8px] flex-1">
        <div className={styles.subtitle}>{template.id}</div>
        <div className={styles.title}>{template.bonus_percent}</div>
      </div>
      <div
        onClick={() => {
          dispatch(deleteCartBonusesItem(template.id));
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 1L1 13M1 1L13 13"
            stroke="#FFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default BonusesItem;
