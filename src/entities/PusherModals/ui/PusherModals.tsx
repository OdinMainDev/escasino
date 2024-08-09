import Replenish from './Replenish';
import Lottery from './Lottery';
import Bonus from './Bonus';
import BonusAdded from './BonusAdded';

export type typeOfPosherModal =
  | 'success-replenish'
  | 'lottery-ticket'
  | 'get-bonus'
  | 'bonus-added';

const PusherModals = () => {
  return (
    <>
      <Replenish />;
      <Lottery />
      <Bonus />
      <BonusAdded />
    </>
  );
};

export default PusherModals;
