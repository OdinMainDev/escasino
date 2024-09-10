import { PusherModals } from '@/entities/PusherModals';
import { getVisitorId } from '@/shared/helpers/getVisitorId';
import { ISetActiveBonus } from '@/shared/models/interfaces/bonuses';
import { IBonusPusher } from '@/shared/models/interfaces/pusher/bonus';
import PusherService from '@/shared/service/PusherService';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { openPusherModal } from '@/store/slices/pusherSlice';
import { PropsWithChildren, useEffect } from 'react';
import { postSetMyActiveBonusApi } from '../api/bonuses/bonusesApi';
import { getBonuses } from '@/store/slices/bonusesSlices';

const PusherModalProvider = ({ children }: PropsWithChildren) => {
  const { settings } = useAppSelector((state) => state.settingsReducer);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    const addActiveBonus = async (bonus: IBonusPusher) => {
      try {
        const data: ISetActiveBonus = {
          id: bonus.id,
          game_ids: bonus.data.bonuses_list
            .filter((item) => item.type === 'freespins')
            .map((item) => item.game_id),
          fid: await getVisitorId(),
        };
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
