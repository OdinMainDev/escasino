import styles from './styles.module.scss';
import Loader from '@/shared/ui/Loader';
import { useAppSelector } from '@/store/hooks/redux';
import BalanceItem from '@/features/Wallet/ui/BalanceItem';
import { PageHeader } from '@/widgets/Header';
import { useTranslation } from 'react-i18next';

const Currencies = () => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.userReducer);
  const { settings } = useAppSelector((state) => state.settingsReducer);

  return (
    <>
      <PageHeader title={t('accounts')} />
      <div className={styles.container}>
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
    </>
  );
};

export default Currencies;
