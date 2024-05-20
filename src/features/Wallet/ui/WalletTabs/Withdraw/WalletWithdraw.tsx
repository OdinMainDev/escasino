import { useEffect, useState } from 'react';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import { TabBlock } from '@/entities/TabBlock';
import { TabItem } from '@/entities/TabItem';
import { useAppSelector } from '@/store/hooks/redux';
import { defaultLanguage } from '@/app/config/locales';
import { createWithdraw, getWithdrawProvidersApi } from '@/features/Wallet/api/withdrawApi';
import { getVisitorId } from '@/shared/helpers/getVisitorId';
import { IPaymentProvider } from '@/shared/models/interfaces/paymentProviders';
import { ICreateWithdrawtData, IProviderLayout } from '@/features/Wallet/models/interfaces';
import styles from '../styles.module.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import {
  checkAmount,
  generateComissionText,
  generateLimitText,
} from '@/features/Wallet/helpers/payment';
import SuccessPaymentModal from '../../SuccessPaymentModal';

interface IValidateData {
  amount: number;
  max: number;
  min: number;
  layout: IProviderLayout;
}

const WalletWithdraw = () => {
  const { billingGroups, loading: billingLoading } = useAppSelector(
    (store) => store.billingGroupsReducer,
  );
  const [withdrawProviders, setWithdrawProviders] = useState<IPaymentProvider[]>([]);
  const [providersLoading, setProvidersLoading] = useState(false);
  const { t } = useTranslation();
  const [selectedBillingGroup, setSelectedBillingGroup] = useState<number>(-1);
  const [selectedProvider, setSelectedProvider] = useState<IPaymentProvider | null>(null);
  const [layout, setLayout] = useState<IProviderLayout>({});
  const [isError, setIsError] = useState(false);
  const [withdrawData, setWithdrawData] = useState({
    amount: '',
    to_address: '',
  });
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const getWithdrawProvidersHandler = async () => {
      try {
        setProvidersLoading(true);
        const data = await getWithdrawProvidersApi();
        if (data.withdrawProviders) {
          setWithdrawProviders(data.withdrawProviders);
        }
      } catch (e) {
        /* empty */
      } finally {
        setProvidersLoading(false);
      }
    };

    void getWithdrawProvidersHandler();
  }, []);

  useEffect(() => {
    if (billingGroups && billingGroups.length > 0) {
      const firstBillingGroup = billingGroups[0].id;
      setSelectedBillingGroup(firstBillingGroup);

      const initialProvider = withdrawProviders.find((provider) =>
        provider.billing_groups.includes(firstBillingGroup),
      );
      setSelectedProvider(initialProvider ?? null);
    }
  }, [billingGroups, withdrawProviders]);

  const handleGroupSelection = (id: number) => {
    setSelectedBillingGroup(id);
    const provider = withdrawProviders?.find((provider) => provider.billing_groups.includes(id));
    if (provider) {
      handleProviderSelection(provider);
    }
  };

  const handleProviderSelection = (provider: IPaymentProvider) => {
    const data = provider.layout.reduce(
      (accumulator, currentValue) => ({
        ...accumulator,
        [currentValue.name as string]: '',
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
      const payment: ICreateWithdrawtData = {
        provider: Number(selectedProvider?.id),
        fid,
        ...withdrawData,
        amount: Number(withdrawData.amount),
        ...layout,
      };
      await createWithdraw(payment);
    } catch (e) {
      console.error('Payment failed:', e);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const validateData = ({ amount, max, min, layout }: IValidateData) => {
    if (checkAmount(Number(amount), max, min)) {
      return false;
    }
    for (const key in layout) {
      if (!layout[key]) {
        return false;
      }
    }

    return true;
  };

  const closeModal = () => {
    setIsError(false);
    setOpenModal(false);
  };

  return (
    <div className={styles.content}>
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
        {withdrawProviders && withdrawProviders?.length > 0 ? (
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
                  Минимум: <strong>{selectedProvider.conditions.limit_minimum}</strong>
                </div>
              )}
              {selectedProvider.conditions.limit_maximum > 0 && (
                <div className={styles.selected_provider_conditions}>
                  Максимум: <strong>{selectedProvider.conditions.limit_maximum}</strong>
                </div>
              )}
            </div>
          </div>
        )}
        <div className={styles.provider}>
          {providersLoading
            ? Array(3)
                .fill(0)
                .map((_, index) => <TabBlock key={index} skeleton />)
            : withdrawProviders
                ?.filter((provider) => provider?.billing_groups.includes(selectedBillingGroup))
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
      <div className={styles.block}>
        {selectedProvider && selectedProvider?.layout.length > 0 ? (
          <div
            className={classNames(styles.block_grid, {
              [styles.block_line]: selectedProvider.layout.length > 0,
            })}
          >
            {selectedProvider.layout.map((item, index) => (
              <div className={item.className?.toString()} key={index}>
                <div className={styles.title}>
                  {t('withdrawForm.' + (item.name || 'undefined'))}
                </div>
                <Input
                  value={layout[item.name as string]}
                  placeholder={t('withdrawForm.' + (item.name || 'undefined'))}
                  type={item.type?.toString()}
                  isError={!layout[item.name as string]}
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
        ) : null}

        <div className={styles.title}>Адрес получателя</div>
        <Input
          placeholder="Адрес получателя"
          type="number"
          className="mb-[12px]"
          value={withdrawData.to_address}
          isError={!withdrawData.to_address}
          onChange={(e) => setWithdrawData((prev) => ({ ...prev, to_address: e.target.value }))}
        />
        <div className={styles.title}>Сумма депозита</div>
        {selectedProvider &&
          selectedProvider.conditions.limit_minimum !== 0 &&
          selectedProvider.conditions.limit_maximum !== 0 && (
            <div className={classNames(styles.subtitle, 'mb-[12px]')}>
              {generateLimitText(
                selectedProvider.conditions.limit_minimum,
                selectedProvider.conditions.limit_maximum,
                selectedProvider.currency,
                Number(withdrawData.amount),
              )}
            </div>
          )}

        <Input
          placeholder="Сумма"
          type="number"
          className="mb-[12px]"
          value={withdrawData.amount}
          isError={checkAmount(
            Number(withdrawData.amount),
            Number(selectedProvider?.conditions.limit_maximum),
            Number(selectedProvider?.conditions.limit_minimum),
          )}
          onChange={(e) => setWithdrawData((prev) => ({ ...prev, amount: e.target.value }))}
        />
        {selectedProvider && (
          <div className={styles.subtitle}>
            {generateComissionText(selectedProvider.rules, selectedProvider.fees)}
          </div>
        )}
      </div>
      <Button
        disabled={
          !validateData({
            amount: Number(withdrawData.amount),
            max: Number(selectedProvider?.conditions.limit_maximum),
            min: Number(selectedProvider?.conditions.limit_minimum),
            layout,
          }) || loading
        }
        onClick={() => void handlePayment()}
        className={classNames(styles.button, 'uppercase')}
      >
        Вывести
      </Button>
      {!validateData({
        amount: Number(withdrawData.amount),
        max: Number(selectedProvider?.conditions.limit_maximum),
        min: Number(selectedProvider?.conditions.limit_minimum),
        layout,
      }) && <div className={styles.error}>Заполните все поля</div>}
      <SuccessPaymentModal
        message={isError ? 'ошибка платежа, попробуйте позжe ' : 'заявка на вывод успешно подана'}
        type={isError ? 'bad' : !loading ? 'good' : 'payment'}
        isOpen={openModal}
        close={closeModal}
        loading={loading}
      />
    </div>
  );
};

export default WalletWithdraw;
