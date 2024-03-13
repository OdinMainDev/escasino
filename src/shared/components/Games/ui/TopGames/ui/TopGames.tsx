import classNames from 'classnames';
import styles from './TopGames.module.scss';
import { IGame } from '@/entities/Game';
import { GamesSlider } from '@/shared/components/Games/ui/Slider';

interface IProps {
  games: IGame[];
}

const TopGames = ({ games }: IProps) => {
  return (
    <div className={styles.container}>
      <div className={classNames('title', styles.title)}>Top Games</div>
      <GamesSlider games={games} />
    </div>
  );
};

export default TopGames;
