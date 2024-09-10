import Replenish from './Replenish';
import Lottery from './Lottery';
import Bonus from './Bonus';
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
  | 'bonus_complete';

const PusherModals = () => {
  return (
    <>
      <Replenish />
      <Lottery />
      <Bonus />
      <BonusPusher />
    </>
  );
};

export default PusherModals;
