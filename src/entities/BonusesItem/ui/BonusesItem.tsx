import {
  IBonus,
  IBonusesList,
  IBonusTemplate,
  ISetActiveBonus,
} from '@/shared/models/interfaces/bonuses';
import styles from './BonusesItem.module.scss';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import Button from '@/shared/ui/Button';
import dateFormatter from '@/shared/helpers/dateFormatter';
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
import { TabItem } from '@/entities/TabItem';
import BonusGame from './BonusGame';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import Icons from '@/shared/ui/Icons';

interface IProps {
  bonus: IBonus | null;
  isMain?: boolean;
  className?: string;
}
const BonusesItem = ({ bonus, isMain, className }: IProps) => {
  const { t } = useTranslation();
  const { activeBonuses } = useAppSelector((state) => state.bonusesSlice);
  const [selectedTemplate, setSelectedTemplate] = useState<IBonusTemplate | null>(
    bonus?.bonus_template[0] ?? null,
  );
  const { games } = useAppSelector((state) => state.gamesAllSlice);
  const [selectedGamesIds, setSelectedGamesIds] = useState<IBonusesList[]>(
    bonus?.data.bonuses_list.filter((item) => item.type === 'freespins') || [],
  );
  const [openGamesModal, setOpenGamesModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState<{
    index: number;
    game_id: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const { doOpenModal } = useModal();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const getBonusStatus = () => {
    switch (bonus?.status) {
      case 1:
        return t('nonActiveBonus');
      case 2:
        return t('activeBonus');
      case 3:
        return t('endedBonus');
      case 4:
        return t('canceledBonus');
      case 5:
        return t('expiredBonus');
      default:
        return null;
    }
  };

  useEffect(() => {
    if (bonus?.bonus_template && bonus?.bonus_template.length > 0) {
      setSelectedTemplate(bonus?.bonus_template[0]);
    }
    if (bonus?.data.bonuses_list && bonus?.data.bonuses_list.length > 0) {
      setSelectedGamesIds(
        bonus?.data.bonuses_list.filter((item) => item.type === 'freespins') || [],
      );
    }
  }, [bonus]);

  useEffect(() => {
    const selectedGames =
      bonus?.data.bonuses_list.filter((item) => item.type === 'freespins') || [];
    if (selectedGames.find((item) => item.game_id === 0)) {
      selectedGamesIds.forEach((item, index) => {
        if (bonus?.status !== 2) {
          const findedTemplate = bonus?.bonus_template.find((template) => template.id === item.id);
          if (findedTemplate) {
            const findedGames = games?.filter((item) => findedTemplate.game_ids.includes(item.id));
            if (findedGames && findedGames.length === 1) {
              updateNumberAtIndex(index, findedGames[index].id);
            }
          }
        }
      });
    }
  }, [bonus, games]);

  const getButton = () => {
    switch (bonus?.status) {
      case 1:
        if (!selectedGamesIds.find((item) => item.game_id > 0)) {
          return <Button disabled>{t('chooseBonusForGame')}</Button>;
        }
        return (
          <Button
            onClick={() => {
              void setActiveBonus();
            }}
          >
            {t('activateBonus')}
          </Button>
        );
      case 2:
        if (!bonus?.data.is_cancel) {
          return (
            <Button disabled elType="outlined">
              {t('bonusCantCancel')}
            </Button>
          );
        }
        return (
          <Button
            elType="outlined"
            onClick={() => void cancelBonus(bonus?.data.bonuses_list[0].game_id)}
          >
            {t('cancelBonus')}
          </Button>
        );
      case 3:
      case 4:
      case 5:
      default:
        return null;
    }
  };

  const setActiveBonus = async () => {
    if (!bonus) {
      doOpenModal('alert');
      return;
    }
    if (activeBonuses.length > 0) {
      for (let i = 0; i < bonus.bonus_template.length; i++) {
        if (!bonus.bonus_template[i].is_bonus_can_activate_always) {
          doOpenModal('alert');
          return;
        }
      }
    }
    try {
      setLoading(true);
      const data: ISetActiveBonus = {
        id: bonus?.id,
        game_ids: selectedGamesIds.map((item) => item.game_id),
        fid: await getVisitorId(),
      };
      await postSetMyActiveBonusApi(data);
      void dispatch(getBonuses());
    } catch (e) {
      /* empty */
    } finally {
      setLoading(false);
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
        void dispatch(getBonuses());
      } catch (e) {
        /* empty */
      } finally {
        setLoading(false);
      }
    }
  };

  const selectTemplate = (template: IBonusTemplate) => {
    setSelectedTemplate(template);
  };

  const updateNumberAtIndex = (index: number, game_id: number) => {
    const newNumbers = [...selectedGamesIds];
    newNumbers[index] = { ...newNumbers[index], game_id };
    setSelectedGamesIds(newNumbers);
    setOpenGamesModal(false);
  };

  const bonusStatus = getBonusStatus();

  if (!bonus && isMain) {
    return (
      <div className={classNames(styles.container, className)}>
        <div className="flex items-center justify-between mb-[70px]">
          <div className={styles.title}>{t('activeBonuseNoSelected')}</div>
          {isMain && (
            <div onClick={() => router.push('/bonus/list')} className={styles.side_url}>
              {t('history')}
            </div>
          )}
        </div>
        <div className={styles.buttons}>
          <Button onClick={() => router.push('/bonus/list')}>{t('chooseActiveBonus')}</Button>
        </div>
        {loading && (
          <div className={styles.loader}>
            <Loader />
          </div>
        )}
      </div>
    );
  }

  const onClickGame = (item: IBonusesList, index: number) => {
    if (!isMain) {
      if (bonus?.status !== 2) {
        const findedTemplate = bonus?.bonus_template.find((template) => template.id === item.id);
        if (findedTemplate) {
          setOpenGamesModal(true);
          setSelectedGame({ index, game_id: item.game_id });
        }
      }
    } else {
      router.push('/games/details/' + item.game_id);
    }
  };
  return (
    <div className={classNames(styles.container, className)}>
      <div className="flex items-center justify-between mb-[16px]">
        <div className={styles.title}>{bonusStatus}</div>
        {isMain && (
          <div onClick={() => router.push('/bonus/list')} className={styles.side_url}>
            <Icons icon="clock" />
          </div>
        )}
      </div>
      <div className={styles.tabs}>
        {bonus?.bonus_template.map((item, index) => (
          <TabItem
            selected={item.id === selectedTemplate?.id}
            key={index}
            onClick={() => selectTemplate(item)}
          >
            {t('template')} #{index + 1}
          </TabItem>
        ))}
      </div>
      <div className={styles.info}>
        <div className={styles.info_block}>
          <div className={styles.label}>{t('bonusBet')}</div>
          <div className={styles.value}>
            {selectedTemplate?.configurator.bet_amount} {selectedTemplate?.configurator.currency}
          </div>
        </div>
        <div className={styles.info_block}>
          <div className={styles.label}>{t('FSQuantity')}</div>
          <div className={styles.value}>{selectedTemplate?.spins_count}</div>
        </div>
        <div className={styles.info_block}>
          <div className={styles.label}>{t('maxSum')}</div>
          <div className={styles.value}>{selectedTemplate?.bonus_settings.max_amount}</div>
        </div>
        <div className={styles.info_block}>
          <div className={styles.label}>{t('minSum')}</div>
          <div className={styles.value}>{selectedTemplate?.bonus_settings.min_amount}</div>
        </div>
        <div className={styles.info_block}>
          <div className={styles.label}>{t('wageringExpires')}</div>
          <div className={styles.value}>{bonus ? dateFormatter(bonus?.expired_at) : ''}</div>
        </div>
      </div>
      <div>
        {selectedGamesIds.map((item, index) => (
          <BonusGame key={index} gameId={item.game_id} onClick={() => onClickGame(item, index)} />
        ))}
      </div>
      <div className={styles.buttons}>{getButton()}</div>
      {selectedGamesIds.length === 0 && (
        <BonusesGamesModal
          onSelectGame={(game) => updateNumberAtIndex(selectedGame?.index || 0, game.id)}
          bonusId={bonus?.id}
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
