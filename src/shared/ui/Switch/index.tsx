import styles from './styles.module.scss';

interface IProps {
  isToggled?: boolean;
  onToggle?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Switch = ({ isToggled, onToggle }: IProps) => {
  return (
    <label className={styles.container}>
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className={styles.switch} />
    </label>
  );
};

export default Switch;
