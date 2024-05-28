import { useRouter } from '@/shared/helpers/navigation';
import styles from './styles.module.scss';
import { getVisitorId } from '@/shared/helpers/getVisitorId';
import { doSetUserCurrency } from '@/app/api/user/setUserCurrency';
import Button from '@/shared/ui/Button';
import { resetPaymentProviders } from '@/store/slices/paymentProvidersSlice';
import { useAppDispatch } from '@/store/hooks/redux';
import { resetPaymentAllProviders } from '@/store/slices/paymentAllProvidersSlice';
import { resetWithdrawProviders } from '@/store/slices/withdrawProvidersSlice';
import { resetWithdrawAllProviders } from '@/store/slices/withdrawAllProvidersSlice';

interface IProps {
  currency?: string;
  isChoosen?: boolean;
  balanceReal?: number;
  balanceBonus?: number;
}

const BalanceItem = ({ currency, isChoosen, balanceReal, balanceBonus }: IProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const activateBalance = async () => {
    if (!currency) {
      return;
    }
    const fid = await getVisitorId();
    await doSetUserCurrency({ currency, fid });
    dispatch(resetPaymentProviders());
    dispatch(resetPaymentAllProviders());
    dispatch(resetWithdrawProviders());
    dispatch(resetWithdrawAllProviders());
    router.push('/profile');
  };
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>
              <div className={styles.label}>Валюта</div>
            </th>
            <th>
              <div className={styles.label}>Доступный баланс(бонусный)</div>
            </th>
            <th>
              <div className={styles.label}>Статус</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.value}>{currency ?? ''}</div>
            </td>
            <td>
              {balanceReal == undefined ? (
                <div className={styles.value}>-</div>
              ) : (
                <div className={styles.value}>
                  {(balanceReal ?? 0) + (balanceBonus ?? 0)}({balanceBonus ?? 0}) {currency ?? ''}
                </div>
              )}
            </td>
            <td>
              <div>
                {isChoosen ? (
                  <Button disabled={true} elType="outlined" className={styles.button}>
                    Активный
                  </Button>
                ) : (
                  <Button
                    onClick={() => void activateBalance()}
                    elType="contained"
                    className={styles.button}
                  >
                    {balanceReal == undefined ? 'Добавить' : 'Активировать'}
                  </Button>
                )}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    // <div className={styles.container}>
    //   <div className="flex justify-between mb-[16px]">
    //     <div className={styles.data}>
    //       <div className={styles.label}>Валюта</div>
    //       <div className={styles.value}>{currency ?? ''}</div>
    //     </div>
    //     <div className={styles.data}>
    //       <div className={styles.label}>Доступный баланс(бонусный)</div>
    //       {balanceReal == undefined ? (
    //         <div className={styles.value}>-</div>
    //       ) : (
    //         <div className={styles.value}>
    //           {(balanceReal ?? 0) + (balanceBonus ?? 0)}({balanceBonus ?? 0}) {currency ?? ''}
    //         </div>
    //       )}
    //     </div>
    //     {isChoosen ? (
    //       <div className={styles.cancel}>
    //         <svg
    //           width="24"
    //           height="24"
    //           viewBox="0 0 24 24"
    //           fill="#000"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path
    //             d="M17 7L7 17M7 7L17 17"
    //             stroke="black"
    //             strokeOpacity="0.87"
    //             strokeWidth="2"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //           />
    //         </svg>
    //       </div>
    //     ) : (
    //       <div className={styles.cancel} onClick={() => void activateBalance()}>
    //         <svg
    //           width="24"
    //           height="24"
    //           viewBox="0 0 24 24"
    //           fill="#000"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path
    //             d="M17 7L7 17M7 7L17 17"
    //             stroke="black"
    //             strokeOpacity="0.87"
    //             strokeWidth="2"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //           />
    //         </svg>
    //         <span>{balanceReal == undefined ? 'Добавить счет' : 'Активировать счет'}</span>
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

export default BalanceItem;
