import { useEffect, useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from '@/shared/helpers/navigation';
import { getBonusGames } from '../api/bonusGamesApi';
import Modal from '@/shared/ui/Modal';
import Input from '@/shared/ui/Input';
import Game from './Game';
import styles from './BonusesGamesModal.module.scss';
import { IModal } from '@/shared/models/interfaces/modal';
import { IGame } from '@/shared/models/interfaces/game';

interface IProps extends IModal {
  onSelectGame?: (game: IGame) => void;
  isNoDeposit?: boolean;
  bonusId?: number;
}

const BonusesGamesModal = ({ close, isOpen, onSelectGame, isNoDeposit, bonusId }: IProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [allGames, setAllGames] = useState<IGame[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const getGamesHandler = async (currentPage: number) => {
    try {
      const { data } = await getBonusGames(currentPage, bonusId);
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setAllGames((prevGames) => [...prevGames, ...data]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (hasMore) {
      void getGamesHandler(page);
    }
  }, [page]);

  const searchGames = (value: string) => {
    setSearch(value);
  };

  const selectGame = (game: IGame) => {
    if (!onSelectGame) {
      if (close) close();
      const route = isNoDeposit ? `/bonus/nodeposit/${game.id}` : `/bonus/${game.id}`;
      router.push(route);
    } else {
      onSelectGame(game);
    }
  };

  const lastGameElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore],
  );

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
          {allGames.map((item, index) => {
            // Если это последний элемент, добавляем реф
            if (allGames.length === index + 1) {
              return (
                <div ref={lastGameElementRef} key={item.id}>
                  <Game onClick={() => selectGame(item)} game={item} />
                </div>
              );
            }
            return <Game onClick={() => selectGame(item)} game={item} key={item.id} />;
          })}
        </div>
        {!hasMore && <div className={styles.noMoreGames}>{t('noMoreGames')}</div>}
      </div>
    </Modal>
  );
};

export default BonusesGamesModal;
