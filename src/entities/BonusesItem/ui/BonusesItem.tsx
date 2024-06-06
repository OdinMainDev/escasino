import { IBonusTemplate } from '@/shared/models/interfaces/bonuses';
import styles from './BonusesItem.module.scss';
import PlaceholderImage from '@/app/assets/images/Placeholder/PlaceholderGame.png';
import { BaseHTMLAttributes } from 'react';

interface IProps extends BaseHTMLAttributes<HTMLElement> {
  template: IBonusTemplate;
}
const BonusesItem = ({ template, ...otherProps }: IProps) => {
  const data = false;
  return (
    <div className={styles.container} {...otherProps}>
      {data ? (
        <img className={styles.img} alt={template.id.toString()} src="" />
      ) : (
        <img className={styles.img} alt={template.id.toString()} src={PlaceholderImage} />
      )}
      <div className="flex flex-col gap-[8px]">
        <div className={styles.subtitle}>{template.id}</div>
        <div className={styles.title}>{template.bonus_percent}</div>
      </div>
    </div>
  );
};

export default BonusesItem;
