import { useEffect, useRef, useState } from 'react';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import { TabBlock } from '@/entities/TabBlock';
import { TabItem } from '@/entities/TabItem';
import { useAppSelector } from '@/store/hooks/redux';
import { defaultLanguage } from '@/app/config/locales';
import { createPayment, paymentTransaction } from '@/features/Wallet/api/replenishApi';
import { getVisitorId } from '@/shared/helpers/getVisitorId';
import {
  IPaymentProvider,
  IPaymentProviderLayout,
} from '@/shared/models/interfaces/paymentProviders';
import {
  ICreatePaymentData,
  IPaymentTransaction,
  IProviderLayout,
} from '@/features/Wallet/models/interfaces';
import styles from '../styles.module.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { checkAmount, generateLimitText } from '@/features/Wallet/helpers/payment';
import SuccessPaymentModal from '../../SuccessPaymentModal';
import {
  errorValidator,
  validateByInputName,
  validateData,
} from '@/features/Wallet/helpers/validators';
import { IErrorResponse } from '@/shared/models/interfaces/error';
import { AxiosError } from 'axios';
import { generateMask } from '@/features/Wallet/helpers/generateMask';
import { generateErrorMessages } from '@/features/Wallet/helpers/generateMessages';

const WalletReplenish = () => {
  const { billingGroups, loading: billingLoading } = useAppSelector(
    (store) => store.billingGroupsReducer,
  );
  const { paymentProviders, loading: providersLoading } = useAppSelector(
    (state) => state.paymentProvidersReducer,
  );
  const { paymentAllProviders, loading: providersAllLoading } = useAppSelector(
    (state) => state.paymentAllProvidersSlice,
  );
  const { t } = useTranslation();
  const [selectedBillingGroup, setSelectedBillingGroup] = useState<number>(-1);
  const [selectedProvider, setSelectedProvider] = useState<IPaymentProvider | null>(null);
  const [layout, setLayout] = useState<IProviderLayout>({});
  const [amount, setAmount] = useState<string>('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState<IErrorResponse>();
  const [transaction, setTransaction] = useState<IPaymentTransaction | null>(null);
  const intervalIdRef = useRef<number | null>(null);

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
    if (provider) {
      handleProviderSelection(provider);
    }
  };

  const handleProviderSelection = (provider: IPaymentProvider) => {
    const data = provider.layout.reduce(
      (accumulator, currentValue) => ({
        ...accumulator,
        [currentValue.name]: '',
      }),
      {},
    );
    setLayout(data);
    setSelectedProvider(provider);
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      setOpenModal(true);
      const fid = await getVisitorId();
      const payment: ICreatePaymentData = {
        provider: Number(selectedProvider?.id),
        fid,
        amount: Number(amount),
        ...layout,
      };
      const { data } = await createPayment(payment);
      startFetching(data.hash);
    } catch (e) {
      const axiosError = e as AxiosError;
      setError(axiosError?.response?.data as IErrorResponse);
      setLoading(false);
      setIsError(true);
    }
  };

  const paymentTransactionHandler = async (hash: string) => {
    try {
      const { data } = await paymentTransaction(hash);
      setLoading(false);
      if (data.data.status) {
        setTransaction(data.data);
        if (intervalIdRef.current !== null) {
          clearInterval(intervalIdRef.current);
          intervalIdRef.current = null;
        }
      }
    } catch (e) {
      console.error('Payment failed:', e);
      const axiosError = e as AxiosError;
      setError(axiosError?.response?.data as IErrorResponse);
      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
      setLoading(false);
      setIsError(true);
    }
  };

  const startFetching = (hash: string) => {
    if (intervalIdRef.current === null) {
      intervalIdRef.current = window.setInterval(() => void paymentTransactionHandler(hash), 2000);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setIsError(false);
    setError(undefined);
    setTransaction(null);
    setLoading(false);
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }
  };

  const generateLayout = (selectedLayout: IPaymentProviderLayout[]) => {
    const cardLayouts = ['number', 'exp_year', 'exp_month', 'cvc'];

    const found = selectedLayout.every((field) => cardLayouts.includes(field.name ?? ''));
    return selectedLayout.map((item, index) => (
      <div className={classNames(item.className)} key={index}>
        <div className={styles.title}>{t('paymentForm.' + item.name)}</div>
        <Input
          mask={found ? generateMask(item.name) : null}
          value={layout[item.name]}
          placeholder={t('paymentForm.' + item.name)}
          message={
            !validateByInputName(item.name, layout[item.name])
              ? generateErrorMessages(item.name)
              : null
          }
          validationFunction={(value) => validateByInputName(item.name, value)}
          type={item.type?.toString()}
          isError={!layout[item.name]}
          onChange={(e) =>
            setLayout((prev) => ({
              ...prev,
              [item.name]: e.target.value,
            }))
          }
        />
      </div>
    ));
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
        {selectedProvider?.layout && (
          <div className={styles.selected_provider}>
            <div className="flex items-center justify-between mb-[10px]">
              <div className="flex items-center gap-[10px]">
                <img src={selectedProvider.meta.image} className={styles.selected_provider_img} />
                <div className={styles.selected_provider_title}>
                  {
                    selectedProvider.meta.texts.find(
                      (text) => text.language.toLowerCase() === defaultLanguage,
                    )?.value
                  }
                </div>
              </div>
              <div className={styles.selected_provider_currency}>{selectedProvider.currency}</div>
            </div>
            <div className="flex items-center justify-between">
              {selectedProvider.conditions.limit_minimum > 0 && (
                <div className={styles.selected_provider_conditions}>
                  Минимум:{' '}
                  <strong>
                    {selectedProvider.conditions.limit_minimum} {selectedProvider.currency}
                  </strong>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              {selectedProvider.conditions.limit_maximum > 0 && (
                <div className={styles.selected_provider_conditions}>
                  Максимум:{' '}
                  <strong>
                    {selectedProvider.conditions.limit_maximum} {selectedProvider.currency}
                  </strong>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              {selectedProvider.fees.fixed > 0 && (
                <div className={styles.selected_provider_conditions}>
                  Фиксированная комиссия:{' '}
                  <strong>
                    {selectedProvider.fees.fixed} {selectedProvider.currency}
                  </strong>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              {selectedProvider.fees.percent > 0 && (
                <div className={styles.selected_provider_conditions}>
                  Комиссия: <strong>{selectedProvider.fees.percent}%</strong>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              {selectedProvider.rules.compensate_commission && (
                <div className={styles.selected_provider_conditions}>
                  <strong>Мы компенсируем комиссию платежного шлюза</strong>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className={styles.selected_provider_conditions}>
                Вейджер при депозите без бонуса:{' '}
                <strong>{selectedProvider.rules.without_bonus_wager}%</strong>
              </div>
            </div>
          </div>
        )}
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

          {providersLoading || providersAllLoading
            ? Array(3)
                .fill(0)
                .map((_, index) => <TabBlock key={index} skeleton />)
            : paymentAllProviders
                ?.filter((provider) => provider.billing_groups.includes(selectedBillingGroup))
                ?.filter((provider) => !paymentProviders?.some((p) => p.id === provider.id))
                .map((provider) => (
                  <TabBlock
                    key={provider.id}
                    className={classNames(styles.billing, styles.billing_disabled)}
                  >
                    <img src={provider.meta.image} className={styles.provider_img} />
                  </TabBlock>
                ))}
        </div>
      </div>
      <div className={styles.block}>
        {selectedProvider && selectedProvider?.layout.length > 0 ? (
          <div
            className={classNames(styles.block_grid, {
              [styles.block_line]: selectedProvider.layout.length > 0,
            })}
          >
            {generateLayout(selectedProvider.layout)}
          </div>
        ) : null}
        <div className={styles.title}>Сумма депозита</div>
        <Input
          placeholder="Сумма"
          type="number"
          className="mb-[12px]"
          value={amount}
          isError={checkAmount(
            Number(amount),
            Number(selectedProvider?.conditions.limit_maximum),
            Number(selectedProvider?.conditions.limit_minimum),
          )}
          onChange={(e) => setAmount(e.target.value)}
        />
        {selectedProvider && (
          <div className={styles.subtitle}>
            {generateLimitText(
              selectedProvider.conditions.limit_minimum,
              selectedProvider.conditions.limit_maximum,
              selectedProvider.currency,
              Number(amount),
            )}
          </div>
        )}
      </div>
      <Button
        disabled={
          !validateData({
            amount: Number(amount),
            max: Number(selectedProvider?.conditions.limit_maximum),
            min: Number(selectedProvider?.conditions.limit_minimum),
            layout,
          }) || loading
        }
        onClick={() => void handlePayment()}
        className={classNames(styles.button, 'uppercase')}
      >
        Пополнить счет
      </Button>
      {!validateData({
        amount: Number(amount),
        max: Number(selectedProvider?.conditions.limit_maximum),
        min: Number(selectedProvider?.conditions.limit_minimum),
        layout,
      }) && <div className={styles.error}>Заполните все поля</div>}
      <SuccessPaymentModal
        isError={isError}
        transaction={transaction}
        message={isError ? errorValidator(error) : ''}
        isOpen={openModal}
        close={closeModal}
        amount={Number(amount)}
        selectedLayout={selectedProvider && selectedProvider.layout}
        layout={layout}
        loading={loading}
      />
    </div>
  );
};

export default WalletReplenish;
