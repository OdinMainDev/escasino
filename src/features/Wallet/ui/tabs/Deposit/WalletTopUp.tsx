import { useEffect, useState } from 'react';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import { TabBlock } from '@/entities/TabBlock';
import { TabItem } from '@/entities/TabItem';
import { useAppSelector } from '@/store/hooks/redux';
import { defaultLanguage } from '@/app/config/locales';
import { createPayment } from '@/features/Wallet/api/paymentApi';
import { getVisitorId } from '@/shared/helpers/getVisitorId';
import { IPaymentProvider } from '@/shared/models/interfaces/paymentProviders';
import { ICreatePaymentData, IProviderLayout } from '@/features/Wallet/models/interfaces';
import styles from '../styles.module.scss';
import classNames from 'classnames';

const WalletTopUp = () => {
  const { billingGroups, loading: billingLoading } = useAppSelector(
    (store) => store.billingGroupsReducer,
  );
  const { paymentProviders, loading: providersLoading } = useAppSelector(
    (store) => store.paymentProvidersReducer,
  );

  const [selectedBillingGroup, setSelectedBillingGroup] = useState<number>(-1);
  const [selectedProvider, setSelectedProvider] = useState<IPaymentProvider | null>(null);
  const [layout, setLayout] = useState<IProviderLayout>({});
  const [amount, setAmount] = useState<string>('');

  useEffect(() => {
    if (billingGroups && billingGroups.length > 0) {
      const firstBillingGroup = billingGroups[0].id;
      setSelectedBillingGroup(firstBillingGroup);

      const initialProvider = paymentProviders?.find((provider) =>
        provider.billing_groups.includes(firstBillingGroup),
      );
      setSelectedProvider(initialProvider ?? null);
    }
  }, [billingGroups, paymentProviders]);

  const handleGroupSelection = (id: number) => {
    setSelectedBillingGroup(id);
    const provider = paymentProviders?.find((provider) => provider.billing_groups.includes(id));
    setSelectedProvider(provider ?? null);
  };

  const handleProviderSelection = (provider: IPaymentProvider) => {
    setSelectedProvider(provider);
  };

  const handlePayment = async () => {
    try {
      const fid = await getVisitorId();
      const data: ICreatePaymentData = {
        provider: Number(selectedProvider?.id),
        fid,
        amount: Number(amount),
        ...layout,
      };
      await createPayment(data);
    } catch (e) {
      console.error('Payment failed:', e);
    }
  };

  return (
    <div className={styles.content}>
      <Button className={styles.button}>
        <svg
          width="23"
          height="22"
          viewBox="0 0 23 22"
          fill="#000"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5 5V21M11.5 5H7.96429C7.44332 5 6.9437 4.78929 6.57533 4.41421C6.20695 4.03914 6 3.53043 6 3C6 2.46957 6.20695 1.96086 6.57533 1.58579C6.9437 1.21071 7.44332 1 7.96429 1C10.7143 1 11.5 5 11.5 5ZM11.5 5H15.0357C15.5567 5 16.0563 4.78929 16.4247 4.41421C16.793 4.03914 17 3.53043 17 3C17 2.46957 16.793 1.96086 16.4247 1.58579C16.0563 1.21071 15.5567 1 15.0357 1C12.2857 1 11.5 5 11.5 5ZM19.5 10V17.8C19.5 18.9201 19.5 19.4802 19.282 19.908C19.0903 20.2843 18.7843 20.5903 18.408 20.782C17.9802 21 17.4201 21 16.3 21H6.7C5.57989 21 5.01984 21 4.59202 20.782C4.21569 20.5903 3.90973 20.2843 3.71799 19.908C3.5 19.4802 3.5 18.9201 3.5 17.8V10M1.5 6.6V8.4C1.5 8.96005 1.5 9.24008 1.60899 9.45399C1.70487 9.64215 1.85785 9.79513 2.04601 9.89101C2.25992 10 2.53995 10 3.1 10H19.9C20.4601 10 20.7401 10 20.954 9.89101C21.1422 9.79513 21.2951 9.64215 21.391 9.45399C21.5 9.24008 21.5 8.96005 21.5 8.4V6.6C21.5 6.03995 21.5 5.75992 21.391 5.54601C21.2951 5.35785 21.1422 5.20487 20.954 5.10899C20.7401 5 20.4601 5 19.9 5H3.1C2.53995 5 2.25992 5 2.04601 5.10899C1.85785 5.20487 1.70487 5.35785 1.60899 5.54601C1.5 5.75992 1.5 6.03995 1.5 6.6Z"
            stroke="var(--primary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Играть с бонусом
      </Button>
      <div className={styles.block}>
        <div className={styles.title}>Способ оплаты</div>
        <div className={styles.slider}>
          {billingLoading
            ? Array(3)
                .fill(0)
                .map((_, index) => <TabItem key={index} skeleton />)
            : billingGroups?.map((item, index) => (
                <TabItem
                  key={index}
                  className={styles.billing}
                  selected={item.id === selectedBillingGroup}
                  onClick={() => handleGroupSelection(item.id)}
                >
                  {item.data.image && <img src={item.data.image} className={styles.billing_img} />}
                  {
                    item.data.texts.find((text) => text.language.toLowerCase() === defaultLanguage)
                      ?.value
                  }
                </TabItem>
              ))}
        </div>
        {paymentProviders && paymentProviders?.length > 0 ? (
          <div className={styles.title}>Провайдеры</div>
        ) : null}
        <div className={styles.provider}>
          {providersLoading
            ? Array(3)
                .fill(0)
                .map((_, index) => <TabBlock key={index} skeleton />)
            : paymentProviders
                ?.filter((provider) => provider.billing_groups.includes(selectedBillingGroup))
                .map((provider) => (
                  <TabBlock
                    key={provider.id}
                    className={styles.billing}
                    selected={selectedProvider?.id === provider.id}
                    onClick={() => handleProviderSelection(provider)}
                  >
                    <img src={provider.meta.image} className={styles.provider_img} />
                  </TabBlock>
                ))}
        </div>
      </div>
      {selectedProvider?.layout && (
        <>
          <div className={styles.provider_title}>
            {
              selectedProvider.meta.texts.find(
                (text) => text.language.toLowerCase() === defaultLanguage,
              )?.value
            }
          </div>
          <div
            className={classNames(styles.block_grid, {
              [styles.block_line]: selectedProvider.layout.length > 0,
            })}
          >
            {selectedProvider.layout.map((item, index) => (
              <div className={item.className?.toString()} key={index}>
                <div className={styles.title}>{item.name}</div>
                <Input
                  placeholder={item.name?.toString()}
                  type={item.type?.toString()}
                  onChange={(e) =>
                    setLayout((prev) => ({
                      ...prev,
                      [item.name as string]: e.target.value,
                    }))
                  }
                />
              </div>
            ))}
          </div>
        </>
      )}
      <div className={styles.block}>
        <div className={styles.title}>Сумма депозита</div>
        <Input
          placeholder="Сумма"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          message={
            selectedProvider
              ? selectedProvider.conditions.limit_minimum > 0
                ? `Mинимум: ${selectedProvider.conditions.limit_minimum}${selectedProvider.currency} Максимум: ${selectedProvider.conditions.limit_maximum}${selectedProvider.currency}`
                : `Максимум: ${selectedProvider.conditions.limit_maximum}${selectedProvider.currency}`
              : null
          }
        />
      </div>
      <Button onClick={() => void handlePayment()} className={styles.button}>
        Пополнить счет
      </Button>
    </div>
  );
};

export default WalletTopUp;
