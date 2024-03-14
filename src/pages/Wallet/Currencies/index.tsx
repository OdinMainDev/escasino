import styles from './styles.module.scss';
import GoBackButton from '@/shared/components/GoBackButton';
import Loader from '@/shared/components/Loader';
import { useAppSelector } from '@/store/hooks/redux';
import BalanceItem from '@/features/Wallet/ui/BalanceItem';

const Currencies = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const { settings } = useAppSelector((state) => state.settingsReducer);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.back}>
          <GoBackButton />
        </div>
        <div className="header_title">Счета</div>
        {/* <SupportButton /> */}
      </div>
      {!user || !settings ? (
        <Loader />
      ) : (
        <>
          {user.balances.map((balance, index) => {
            let isChoosen = false;
            if (user.balance.currency == balance.currency) {
              isChoosen = true;
            }
            return (
              <BalanceItem
                key={index}
                currency={balance.currency}
                isChoosen={isChoosen}
                balanceReal={balance.formatted_balance_real}
                balanceBonus={balance.formatted_balance_bonus}
              />
            );
          })}
          {settings.currencies.map((currency, index) => {
            let check = false;
            user.balances.forEach((element) => {
              if (element.currency == currency) {
                check = true;
              }
            });
            if (check) {
              return;
            }
            return <BalanceItem key={index} currency={currency} />;
          })}
        </>
      )}
    </div>
  );
};

export default Currencies;
