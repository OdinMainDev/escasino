import Icons from '@/shared/ui/Icons';
import styles from '../Header.module.scss';

interface IProps {
  quantity?: number;
}

const FilterIcon = ({ quantity }: IProps) => {
  return (<Icons icon="filter" />)
};

export default FilterIcon;
