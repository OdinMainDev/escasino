import Icons from '@/shared/ui/Icons';

interface IProps {
  quantity?: number;
}

const FilterIcon = ({ quantity }: IProps) => {
  console.log(quantity);
  return <Icons icon="filter" />;
};

export default FilterIcon;
