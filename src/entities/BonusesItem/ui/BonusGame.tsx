import { IGame } from '@/shared/models/interfaces/game';
import styles from './BonusesItem.module.scss';
import { BaseHTMLAttributes, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { fetchBonusGames } from '@/store/slices/getBonusGamesSlice';

interface IProps extends BaseHTMLAttributes<HTMLDivElement> {
  gameId: number;
}
const BonusGame = ({ gameId, onClick, ...otherProps }: IProps) => {
  const { t } = useTranslation();
  const { allGames } = useAppSelector((state) => state.fetchBonusGames);
  const  allGamesFetched  = useAppSelector((state) => state.fetchBonusGames.isFinished);
  const  allGamesLoading  = useAppSelector((state) => state.fetchBonusGames.loading);
  const dispatch = useAppDispatch();

  const [game, setGame] = useState<IGame | null>(null);
  const imagePath = game
    ? game.system_name
      ? `${import.meta.env.VITE_IMAGE_PATH}/${game.game_provider}/${import.meta.env.VITE_IMAGE_SIZE}/${game.system_name}.png`
      : game.image
    : '';

  useEffect(() => {
    if (!allGamesFetched && !allGamesLoading) {
      void dispatch(fetchBonusGames({ bonusId: undefined }));
    }
  }, []);

  useEffect(() => {
    if (gameId !== 0) {
      setGame(allGames?.find((item) => item.id === gameId) ?? null);
    }
    
    
  }, [gameId, allGames ]);

  if (!game && gameId === 0) {
    return (
      <div
        {...otherProps}
        className={classNames(styles.game, otherProps.className)}
        onClick={onClick}
      >
        <div className={classNames(styles.game_img, styles.empty)} />
        <div className="flex flex-col gap-[8px] flex-1">
          <div className={styles.game_subtitle}>{t('chooseGame')}</div>
          <div className={styles.game_title}>{t('clickToChooseGame')}</div>
        </div>
      </div>
    );
  }
  return (
    <div
      {...otherProps}
      className={classNames(styles.game, otherProps.className)}
      onClick={onClick}
    >
      {imagePath ? (
        <img className={styles.game_img} alt="sw" src={imagePath} />
      ) : (
        <div className={classNames(styles.game_img, styles.empty)} />
      )}
      <div className="flex flex-col gap-[8px] flex-1">
        <div className={styles.game_subtitle}>{game?.game_provider}</div>
        <div className={styles.game_title}>{game?.name}</div>
      </div>
    </div>
  );
};

export default BonusGame;
