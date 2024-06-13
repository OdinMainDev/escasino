import { IBonus, ISetActiveBonus } from '@/shared/models/interfaces/bonuses';
import styles from './BonusesItem.module.scss';
import { useCurrentLanguage } from '@/app/providers/LangProvider';
import PlaceholderImage from '@/app/assets/images/Placeholder/PlaceholderGame.png';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import Button from '@/shared/ui/Button';
import dateFormatter from '@/shared/helpers/dateFormatter';
import { IGame } from '@/shared/models/interfaces/game';
import { BonusesGamesModal } from '@/features/BonusesGamesModal';
import { useEffect, useState } from 'react';
import Loader from '@/shared/ui/Loader';
import {
  postSetMyActiveBonusApi,
  postSetMyActiveBonusCancelApi,
} from '@/app/api/bonuses/bonusesApi';
import { getVisitorId } from '@/shared/helpers/getVisitorId';
import { useModal } from '@/app/providers/ModalProvider';
import { getBonuses } from '@/store/slices/bonusesSlices';
import { useRouter } from '@/shared/helpers/navigation';

interface IProps {
  bonus: IBonus | null;
  isMain?: boolean;
}
const BonusesItem = ({ bonus, isMain }: IProps) => {
  const currentLanguage = useCurrentLanguage();
  const { games } = useAppSelector((state) => state.gamesAllSlice);
  const { activeBonus } = useAppSelector((state) => state.bonusesSlice);
  const [selectedGames, setSelectedGames] = useState<IGame[]>([]);
  const template = bonus?.bonus_template;
  const [openGamesModal, setOpenGamesModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { doOpenModal } = useModal();
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (games && games.length > 0) {
      setSelectedGames(games.filter((item) => bonus?.bonus_template.game_ids.includes(item.id)));
    }
  }, [bonus?.bonus_template.game_ids, games]);

  const getImage = () => {
    if (template?.meta.image) return template.meta.image;
    if (bonus && bonus?.data.bonuses_list.length > 0) {
      const game = games?.find((game) => game.id === bonus?.data.bonuses_list[0].game_id);
      if (game?.image) return game.image;
    }
    return PlaceholderImage;
  };

  const getGameName = () => {
    if (bonus && bonus?.data.bonuses_list.length > 0) {
      const game = games?.find((game) => game.id === bonus?.data.bonuses_list[0].game_id);
      if (game) {
        return (
          game.data.texts?.find((item) => item.language.toLowerCase() === currentLanguage)?.value ??
          game.name
        );
      }
    }
    return 'Игра не выбрана';
  };

  const getBonusTitle = () => {
    const bonusTitle = template
      ? template.meta.texts?.find((item) => item.language.toLowerCase() === currentLanguage)
          ?.value || ''
      : '';
    if (bonusTitle) return bonusTitle;
    return 'Бонус';
  };

  const getBonusStatus = () => {
    switch (bonus?.status) {
      case 1:
        return 'Не активный бонус';
      case 2:
        return 'Активный бонус';
      case 3:
        return 'Завершенный бонус';
      case 4:
        return 'Отмененный бонус';
      case 5:
        return 'Истекший бонус';
      default:
        return null;
    }
  };

  const getButton = () => {
    switch (bonus?.status) {
      case 1:
        return (
          <Button
            onClick={() => {
              if (bonus?.data.bonuses_list[0].game_id === 0) {
                setOpenGamesModal(true);
              } else {
                void setActiveBonus(bonus?.data.bonuses_list[0].game_id);
              }
            }}
          >
            Активировать бонус
          </Button>
        );
      case 2:
        if (bonus?.bonus_template.is_cancel) {
          return (
            <Button disabled elType="outlined">
              Бонус нельзя отменить
            </Button>
          );
        }
        return (
          <Button
            elType="outlined"
            onClick={() => void cancelBonus(bonus?.data.bonuses_list[0].game_id)}
          >
            Отменить боунс
          </Button>
        );
      case 3:
      case 4:
      case 5:
      default:
        return null;
    }
  };

  const setActiveBonus = async (game_id: number) => {
    if (!activeBonus && bonus) {
      try {
        setOpenGamesModal(false);
        setLoading(true);
        const data: ISetActiveBonus = {
          id: bonus?.id,
          game_ids: [game_id],
          fid: await getVisitorId(),
        };
        await postSetMyActiveBonusApi(data);
        void dispatch(getBonuses());
      } catch (e) {
        /* empty */
      } finally {
        setLoading(false);
      }
    } else {
      doOpenModal('alert');
    }
  };

  const cancelBonus = async (game_id: number) => {
    if (bonus) {
      try {
        setOpenGamesModal(false);
        setLoading(true);
        const data: ISetActiveBonus = {
          id: bonus?.id,
          game_ids: [game_id],
          fid: await getVisitorId(),
        };
        await postSetMyActiveBonusCancelApi(data);
      } catch (e) {
        /* empty */
      } finally {
        setLoading(false);
      }
    }
  };

  const image = getImage();
  const gameName = getGameName();
  const bonusTitle = getBonusTitle();
  const bonusStatus = getBonusStatus();
  return (
    <div className={styles.container}>
      <div className="flex items-center justify-between mb-[16px]">
        <div className={styles.title}>{bonusStatus}</div>
        {isMain && (
          <div onClick={() => router.push('/bonus/list')} className={styles.side_url}>
            Cмотреть все
          </div>
        )}
      </div>
      <div className={styles.info}>
        <div className={styles.info_block}>
          <div className={styles.label}>Бонусный ставка</div>
          <div className={styles.value}>
            {bonus?.bonus_template.configurator.bet_amount}{' '}
            {bonus?.bonus_template.configurator.currency}
          </div>
        </div>
        <div className={styles.info_block}>
          <div className={styles.label}>Количество FS</div>
          <div className={styles.value}>{bonus?.bonus_template.spins_count}</div>
        </div>
        <div className={styles.info_block}>
          <div className={styles.label}>Максимальная сумма</div>
          <div className={styles.value}>{bonus?.bonus_template.bonus_settings.max_amount}</div>
        </div>
        <div className={styles.info_block}>
          <div className={styles.label}>Минимальная сумма</div>
          <div className={styles.value}>{bonus?.bonus_template.bonus_settings.min_amount}</div>
        </div>
        <div className={styles.info_block}>
          <div className={styles.label}>Отыгрыш истекает</div>
          <div className={styles.value}>{bonus ? dateFormatter(bonus?.expired_at) : ''}</div>
        </div>
      </div>
      <div className={styles.game}>
        <img className={styles.game_img} alt="sw" src={image} />
        <div className="flex flex-col gap-[8px] flex-1">
          <div className={styles.game_subtitle}>{bonusTitle}</div>
          <div className={styles.game_title}>{gameName}</div>
        </div>
      </div>
      <div className={styles.buttons}>{getButton()}</div>
      {bonus?.data.bonuses_list[0].game_id === 0 && (
        <BonusesGamesModal
          onSelectGame={(game) => void setActiveBonus(game.id)}
          games={selectedGames}
          isOpen={openGamesModal}
          close={() => setOpenGamesModal(false)}
        />
      )}
      {loading && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}
    </div>
  );
};

export default BonusesItem;
