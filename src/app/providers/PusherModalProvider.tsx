import { PusherModals } from '@/entities/PusherModals';
import { getVisitorId } from '@/shared/helpers/getVisitorId';
import { IBonus, ISetActiveBonus } from '@/shared/models/interfaces/bonuses';
import { IBonusPusher } from '@/shared/models/interfaces/pusher/bonus';
import PusherService from '@/shared/service/PusherService';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { openPusherModal } from '@/store/slices/pusherSlice';
import { PropsWithChildren, useEffect } from 'react';
import { postSetMyActiveBonusApi } from '../api/bonuses/bonusesApi';
import { getBonuses, resetBonuses } from '@/store/slices/bonusesSlices';
import { getNodepositBonuses } from '@/store/slices/nodepositSlice';
import { useRouter } from '@/shared/helpers/navigation';
import { useCurrentLanguage } from './LangProvider';

const PusherModalProvider = ({ children }: PropsWithChildren) => {
  const { settings } = useAppSelector((state) => state.settingsReducer);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentLanguage = useCurrentLanguage();
  const { user } = useAppSelector((state) => state.userReducer);

  function getRandomGameId(arr: number[]): number {
    if (arr.length === 1) {
      return arr[0];
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }

  useEffect(() => {
    const addActiveBonus = async (bonus: IBonusPusher) => {
      try {
        const freeSpinsBonuses = bonus.data.bonuses_list.filter(
          (item) => item.type === 'freespins',
        );
        const fid = await getVisitorId();
        const data: ISetActiveBonus = {
          id: bonus.id,
          game_ids: freeSpinsBonuses.map((item) => item.game_id),
          fid,
        };
        for (let index = 0; index < data.game_ids.length; index++) {
          const choosenGameId = data.game_ids[index];
          if (choosenGameId != 0) {
            continue;
          }
          const template = bonus.bonus_template[index];
          data.game_ids[index] = getRandomGameId(template.game_ids);
        }
        await postSetMyActiveBonusApi(data);
        void dispatch(getBonuses());
      } catch (e) {
        /* empty */
      }
    };
    if (settings && settings.pusher.cluster && settings.pusher.key && user?.pusher_id) {
      const pusher = PusherService.getInstance(settings.pusher.key, settings.pusher.cluster);
      pusher.subscribe(user.pusher_id, 'payment_receive', () => {
        dispatch(openPusherModal('success-replenish'));
      });
      pusher.subscribe(user.pusher_id, 'payment_complete', () => {
        dispatch(openPusherModal('success-replenish'));
      });
      pusher.subscribe(user.pusher_id, 'lottery_win', () => {
        dispatch(openPusherModal('lottery-ticket'));
      });
      pusher.subscribe(user.pusher_id, 'bonus_receive', (data) => {
        const bonus = data as IBonusPusher;
        console.log(bonus);
        dispatch(openPusherModal('bonus_receive'));
      });
      pusher.subscribe(user.pusher_id, 'bonus_expire', () => {
        dispatch(openPusherModal('bonus_expire'));
      });
      pusher.subscribe(user.pusher_id, 'bonus_cancel', () => {
        dispatch(openPusherModal('bonus_cancel'));
      });
      pusher.subscribe(user.pusher_id, 'do_bonus_activate', (data) => {
        const bonus = data as IBonusPusher;
        void addActiveBonus(bonus);
      });
      pusher.subscribe(user.pusher_id, 'do_update_active_bonuses', () => {
        dispatch(resetBonuses());
      });
      pusher.subscribe(user.pusher_id, 'bonus_scratch_receive', (data) => {
        dispatch(openPusherModal('bonus_scratch_receive'));
        console.log(data);
      });
      pusher.subscribe(user.pusher_id, 'bonus_scratch_complete', (data) => {
        dispatch(openPusherModal('bonus_scratch_complete'));
        console.log(data);
      });
      pusher.subscribe(user.pusher_id, 'bonus_complete', () => {
        dispatch(openPusherModal('bonus_complete'));
      });
      pusher.subscribe(user.pusher_id, 'do_update_nodeposit_bonuses', () => {
        void dispatch(getNodepositBonuses());
      });
      pusher.subscribe(user.pusher_id, 'do_open_bonus_game', (data) => {
        const bonusData = data as IBonus;
        if (bonusData.bonus_template.length > 0) {
          const nodepositGameId = localStorage.getItem('nodeposit_game_id');
          let findedIndex = bonusData.bonus_template[0].game_ids.findIndex(
            (item) => item === Number(nodepositGameId),
          );
          if (findedIndex < 0) {
            findedIndex = 0;
          }
          const gameId = bonusData.bonus_template[0].game_ids[findedIndex];
          router.push(`/${currentLanguage}/play/real/${gameId}`);
        }
      });
      pusher.subscribe(user.pusher_id, 'do_open_profile_bonuses', () => {
        router.push('/bonus/list');
      });
      pusher.subscribe(user.pusher_id, 'do_open_nodeposit_configurator', () => {
        router.push('/bonus/nodeposit/' + settings.bonus.default_game_id.toString());
      });
    }
  }, [dispatch, settings, user?.pusher_id]);

  return (
    <div>
      <PusherModals />
      {children}
    </div>
  );
};

export default PusherModalProvider;
