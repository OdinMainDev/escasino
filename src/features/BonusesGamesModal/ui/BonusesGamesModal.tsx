import Modal from '@/shared/ui/Modal';
import styles from './BonusesGamesModal.module.scss';
import { IModal } from '@/shared/models/interfaces/modal';
import { IGame } from '@/shared/models/interfaces/game';
import { Game } from '@/entities/Game';
import Input from '@/shared/ui/Input';
import { useEffect, useState } from 'react';
import { useRouter } from '@/shared/helpers/navigation';

interface IProps extends IModal {
  games: IGame[];
  onSelectGame?: (game: IGame) => void;
}

const BonusesGamesModal = ({ close, isOpen, games, onSelectGame }: IProps) => {
  const [allGames, setAllGames] = useState(games);
  const router = useRouter();

  useEffect(() => {
    setAllGames(games);
  }, [games]);

  const searchGames = (value: string) => {
    if (value === '') {
      setAllGames(games);
    } else {
      setAllGames(games.filter((game) => game.name.toLowerCase().includes(value)));
    }
  };

  const selectGame = (game: IGame) => {
    if (!onSelectGame) {
      if (close) {
        close();
      }
      router.push(`/bonus/${game.id}`);
    } else {
      onSelectGame(game);
    }
  };

  return (
    <Modal close={close} isOpen={!!isOpen}>
      <div className={styles.container}>
        <div className={styles.title}>Выберите игру для бонуса</div>
        <div className={styles.header}>
          <Input
            elType="search"
            onClear={() => {
              setAllGames(games);
            }}
            onChange={(e) => searchGames(e.target.value)}
            placeholder="Поиск игр"
          />
        </div>
        <div className={styles.games}>
          {allGames.map((item) => (
            <Game onClick={() => selectGame(item)} game={item} key={item.id} />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default BonusesGamesModal;
