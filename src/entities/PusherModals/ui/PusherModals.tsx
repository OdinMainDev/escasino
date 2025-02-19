import Replenish from './Replenish';
import Lottery from './Lottery';
import BonusPusher from './BonusPusher';

export type typeOfPosherModal =
  | 'success-replenish'
  | 'lottery-ticket'
  | 'get-bonus'
  | 'bonus_receive'
  | 'bonus_expire'
  | 'bonus_cancel'
  | 'do_bonus_activate'
  | 'bonus_scratch_receive'
  | 'bonus_scratch_complete'
  | 'bonus_complete'
  | 'do_update_active_bonuses';

const PusherModals = () => {
  return (
    <>
      <Lottery />
      <Replenish />
      <BonusPusher />
    </>
  );
};

export default PusherModals;
