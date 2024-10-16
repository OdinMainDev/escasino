import { IGame } from '@/shared/models/interfaces/game';
import styles from './BonusesItem.module.scss';
import { BaseHTMLAttributes, useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks/redux';
import PlaceholderImage from '@/app/assets/images/Placeholder/PlaceholderGame.png';

interface IProps extends BaseHTMLAttributes<HTMLDivElement> {
  gameId: number;
}
const BonusGame = ({ gameId, onClick }: IProps) => {
  const { games } = useAppSelector((state) => state.gamesAllSlice);
  const [game, setGame] = useState<IGame | null>(null);
  const imagePath = game
    ? game.system_name
      ? `${import.meta.env.VITE_IMAGE_PATH}/${game.game_provider}/${import.meta.env.VITE_IMAGE_SIZE}/${game.system_name}.png`
      : game.image
    : '';

  useEffect(() => {
    if (gameId !== 0) {
      setGame(games?.find((item) => item.id === gameId) ?? null);
    }
  }, [gameId, games]);

  if (!game && gameId === 0) {
    return (
      <div className={styles.game} onClick={onClick}>
        <img className={styles.game_img} alt="sw" src={PlaceholderImage} />
        <div className="flex flex-col gap-[8px] flex-1">
          <div className={styles.game_subtitle}>Выберите игру</div>
          <div className={styles.game_title}>Нажмите чтобы выбрать игру</div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.game} onClick={onClick}>
      <img className={styles.game_img} alt="sw" src={imagePath ? imagePath : PlaceholderImage} />
      <div className="flex flex-col gap-[8px] flex-1">
        <div className={styles.game_subtitle}>{game?.game_provider}</div>
        <div className={styles.game_title}>{game?.name}</div>
      </div>
    </div>
  );
};

export default BonusGame;
