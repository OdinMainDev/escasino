import { PusherModals } from '@/entities/PusherModals';
import PusherService from '@/shared/service/PusherService';
import { useAppSelector } from '@/store/hooks/redux';
import { PropsWithChildren, useEffect } from 'react';

const PusherModalProvider = ({ children }: PropsWithChildren) => {
  const { settings } = useAppSelector((state) => state.settingsReducer);
  const { user } = useAppSelector((state) => state.userReducer);
  useEffect(() => {
    if (settings && settings.pusher.cluster && settings.pusher.key && user?.pusher_id) {
      const pusher = PusherService.getInstance(settings.pusher.key, settings.pusher.cluster);
      pusher.subscribe(user.pusher_id, 'payment_receive', (data) => {
        console.log(data);
      });
      pusher.subscribe(user.pusher_id, 'payment_receive', (data) => {
        console.log(data);
      });
    }
  }, [settings, user?.pusher_id]);
  return (
    <div>
      <PusherModals />
      {children}
    </div>
  );
};

export default PusherModalProvider;
