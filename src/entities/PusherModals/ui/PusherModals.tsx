import Replenish from './Replenish';
import Lottery from './Lottery';
import Bonus from './Bonus';

export type typeOfPosherModal = 'success-replenish' | 'lottery-ticket' | 'get-bonus';

const PusherModals = () => {
  return (
    <>
      <Replenish />;
      <Lottery />
      <Bonus />
    </>
  );
};

export default PusherModals;
