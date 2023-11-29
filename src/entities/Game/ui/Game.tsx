import { IGame } from '@/shared/models/interfaces/games';
import styles from './Game.module.scss';
import Image from 'next/image';

interface IProps {
  game: IGame;
}

const Game = ({ game }: IProps) => {
  return (
    <div className={styles.container}>
      <Image src={game.image} alt={game.name} className={styles.image} fill />
    </div>
  );
};

export default Game;
