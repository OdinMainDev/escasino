import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from '@/shared/helpers/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import Modal from '@/shared/ui/Modal';
import Input from '@/shared/ui/Input';
import Game from './Game';
import styles from './BonusesGamesModal.module.scss';
import { IModal } from '@/shared/models/interfaces/modal';
import { IGame } from '@/shared/models/interfaces/game';
import { fetchBonusGames } from '@/store/slices/getBonusGamesSlice';

interface IProps extends IModal {
  onSelectGame?: (game: IGame) => void;
  isNoDeposit?: boolean;
  bonusId?: number;
}

const BonusesGamesModal = ({ close, isOpen, onSelectGame, isNoDeposit, bonusId }: IProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();

  const { allGames } = useAppSelector((state) => state.fetchBonusGames);

  useEffect(() => {
    if (bonusId != undefined) void dispatch(fetchBonusGames({ bonusId: bonusId }));
  }, [bonusId]);

  const searchGames = (value: string) => {
    setSearch(value);
  };

  const filteredGames = allGames.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase()),
  );

  const selectGame = (game: IGame) => {
    if (!onSelectGame) {
      if (close) close();

      const route = isNoDeposit ? `/bonus/nodeposit/${game.id}` : `/bonus/${game.id}`;
      router.push(route);
    } else {
      onSelectGame(game);
    }
  };

  return (
    <Modal close={close} isOpen={!!isOpen}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>{t('chooseGameForBonus')}</div>
          <Input
            withoutLabel
            value={search}
            placeholder={t('findGames')}
            elType="search"
            onChange={(e) => searchGames(e.target.value)}
          />
        </div>
        <div className={styles.games}>
          {filteredGames.map((item) => {
            // Если это последний элемент, добавляем реф
            return <Game onClick={() => selectGame(item)} game={item} key={item.id} />;
          })}
        </div>
        {<div className={styles.noMoreGames}>{t('noMoreGames')}</div>}
      </div>
    </Modal>
  );
};

export default BonusesGamesModal;
