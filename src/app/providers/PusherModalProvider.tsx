import { PusherModals } from '@/entities/PusherModals';
import PusherService from '@/shared/service/PusherService';
import { useAppDispatch, useAppSelector } from '@/store/hooks/redux';
import { openPusherModal } from '@/store/slices/pusherSlice';
import { PropsWithChildren, useEffect } from 'react';

const PusherModalProvider = ({ children }: PropsWithChildren) => {
  const { settings } = useAppSelector((state) => state.settingsReducer);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userReducer);
  useEffect(() => {
    if (settings && settings.pusher.cluster && settings.pusher.key && user?.pusher_id) {
      const pusher = PusherService.getInstance(settings.pusher.key, settings.pusher.cluster);
      pusher.subscribe(user.pusher_id, 'payment_receive', () => {
        dispatch(openPusherModal('success-replenish'));
      });
      pusher.subscribe(user.pusher_id, 'bonus_receive', (data) => {
        dispatch(openPusherModal('bonus-added'));
        console.log(data);
      });
      pusher.subscribe(user.pusher_id, 'lottery_win', () => {
        dispatch(openPusherModal('lottery-ticket'));
      });
      pusher.subscribe(user.pusher_id, 'bonus_complete', () => {
        dispatch(openPusherModal('get-bonus'));
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
