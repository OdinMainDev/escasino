import { useEffect, useState } from 'react';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import { TabBlock } from '@/entities/TabBlock';
import { TabItem } from '@/entities/TabItem';
import { useAppSelector } from '@/store/hooks/redux';
import { createWithdraw } from '@/features/Wallet/api/withdrawApi';
import { getVisitorId } from '@/shared/helpers/getVisitorId';
import { IWithdrawProvider } from '@/shared/models/interfaces/withdrawProviders';
import { ICreateWithdrawtData, IProviderLayout } from '@/features/Wallet/models/interfaces';
import styles from '../styles.module.scss';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { checkAmount } from '@/features/Wallet/helpers/payment';
import SuccessPaymentModal from '../../SuccessPaymentModal';
import { IErrorResponse } from '@/shared/models/interfaces/error';
import { errorValidator } from '@/features/Wallet/helpers/validators';
import { AxiosError } from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { useCurrentLanguage } from '@/app/providers/LangProvider';
import LimitTextDisplay from '../LimitTextDisplay/LimitTextDisplay';
import { IBillingGroup } from '@/shared/models/interfaces/billingGroups';

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
  const { withdrawProviders, loading: providersLoading } = useAppSelector(
    (state) => state.withdrawProvidersReducer,
  );
  const { withdrawAllProviders, loading: providersAllLoading } = useAppSelector(
    (state) => state.withdrawAllProvidersSlice,
  );
  const [filteredBillingGroups, setFilteredBillingGroups] = useState<IBillingGroup[]>([]);
  const { t } = useTranslation();
  const currentLanguage = useCurrentLanguage();
  const [selectedBillingGroup, setSelectedBillingGroup] = useState<number>(-1);
  const [selectedProvider, setSelectedProvider] = useState<IWithdrawProvider | null>(null);
  const [layout, setLayout] = useState<IProviderLayout>({});
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<IErrorResponse>();
  const [withdrawData, setWithdrawData] = useState({
    amount: '',
    to_address: '',
  });
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const filtered =
      billingGroups?.filter((billingGroup) =>
        withdrawProviders?.some((provider) => provider.billing_groups.includes(billingGroup.id)),
      ) ?? [];

    setFilteredBillingGroups(filtered);

    if (filtered.length > 0) {
      const firstBillingGroup = filtered[0].id;
      setSelectedBillingGroup(firstBillingGroup);

      const initialProvider = withdrawProviders?.find((provider) =>
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

  const handleProviderSelection = (provider: IWithdrawProvider) => {
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

  const handleWithdraw = async () => {
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
      const axiosError = e as AxiosError;
      setError(axiosError?.response?.data as IErrorResponse);
      console.error('Withdraw failed:', e);
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
    setError(undefined);
    setOpenModal(false);
    setLoading(false);
    setTimeout(() => {
      setIsError(false);
    }, 100);
  };

  const getProviderName = () => {
    if (!selectedProvider) {
      return '';
    }
    return (
      selectedProvider.meta.texts.find((item) => item.language.toLowerCase() === currentLanguage)
        ?.value ?? ''
    );
  };

  return (
    <div className={styles.content}>
      <div className={styles.block}>
        <div className={styles.title}>{t('depositWay')}</div>
        {billingLoading ? (
          <div className={styles.slider}>
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <TabItem key={index} skeleton />
              ))}
          </div>
        ) : (
          <Swiper
            modules={[FreeMode]}
            slidesPerView="auto"
            spaceBetween={10}
            freeMode={true}
            className={styles.slider}
          >
            {filteredBillingGroups?.map((item, index) => (
              <SwiperSlide className="w-auto" key={index}>
                <TabItem
                  className={styles.billing}
                  selected={item.id === selectedBillingGroup}
                  onClick={() => handleGroupSelection(item.id)}
                >
                  {item.data.image && <img src={item.data.image} className={styles.billing_img} />}
                  {
                    item.data.texts.find((text) => text.language.toLowerCase() === currentLanguage)
                      ?.value
                  }
                </TabItem>
              </SwiperSlide>
            ))}
          </Swiper>
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

          {providersLoading || providersAllLoading
            ? Array(3)
                .fill(0)
                .map((_, index) => <TabBlock key={index} skeleton />)
            : withdrawAllProviders
                ?.filter((provider) => provider.billing_groups.includes(selectedBillingGroup))
                ?.filter((provider) => !withdrawProviders?.some((p) => p.id === provider.id))
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
        {selectedProvider && (
          <div className={styles.selected_provider}>
            <div className="flex items-center justify-between">
              <div className={styles.selected_provider_title}>{getProviderName()}</div>
            </div>
            <div className="flex items-center justify-between">
              {selectedProvider.conditions.limit_minimum > 0 &&
                selectedProvider.conditions.limit_maximum == 0 && (
                  <>
                    <div className={styles.selected_provider_conditions}>{t('sum')}</div>
                    <div className={styles.selected_provider_value}>
                      {selectedProvider.conditions.limit_minimum} – ∞ {selectedProvider.currency}
                    </div>
                  </>
                )}
              {selectedProvider.conditions.limit_maximum > 0 && (
                <>
                  <div className={styles.selected_provider_conditions}>{t('sum')}</div>
                  <div className={styles.selected_provider_value}>
                    {selectedProvider.conditions.limit_minimum} –{' '}
                    {selectedProvider.conditions.limit_maximum} {selectedProvider.currency}
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-between">
              {selectedProvider.fees.percent > 0 && (
                <>
                  <div className={styles.selected_provider_conditions}>{t('fee')}</div>
                  <div className={styles.selected_provider_value}>
                    {selectedProvider.fees.percent}%
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        {selectedProvider && selectedProvider?.layout.length > 0 ? (
          <div
            className={classNames(styles.block_grid, {
              [styles.block_line]: selectedProvider.layout.length > 0,
            })}
          >
            {selectedProvider.layout.map((item, index) => (
              <div className={classNames(item.className?.toString())} key={index}>
                <div className={styles.title}>
                  {t('withdrawForm.' + (item.name || 'undefined'))}
                </div>
                <Input
                  autoComplete="off"
                  value={layout[item.name]}
                  placeholder={t('withdrawForm.' + (item.name || 'undefined') + '_placeholder')}
                  type={item.type?.toString()}
                  isError={layout[item.name]?.length > 0 && !layout[item.name]}
                  onChange={(e) =>
                    setLayout((prev) => ({
                      ...prev,
                      [item.name]: e.target.value,
                    }))
                  }
                />
              </div>
            ))}
          </div>
        ) : null}
        <div className={styles.title}>{t('withdrawSum')}</div>
        {selectedProvider && (
          <LimitTextDisplay
            minAmount={selectedProvider.conditions.limit_minimum}
            maxAmount={selectedProvider.conditions.limit_maximum}
            selectedProvider={selectedProvider}
            amount={withdrawData.amount}
          />
        )}
        <Input
          placeholder={t('sum')}
          type="number"
          wrapperClassName="mb-[12px]"
          autoComplete="off"
          value={withdrawData.amount}
          isError={
            withdrawData.amount.length > 0
              ? checkAmount(
                  Number(withdrawData.amount),
                  Number(selectedProvider?.conditions.limit_maximum),
                  Number(selectedProvider?.conditions.limit_minimum),
                )
              : false
          }
          onChange={(e) => setWithdrawData((prev) => ({ ...prev, amount: e.target.value }))}
        />
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
        onClick={() => void handleWithdraw()}
        className={classNames(styles.button)}
      >
        {t('withdraw')}
      </Button>
      {/* {!validateData({
        amount: Number(withdrawData.amount),
        max: Number(selectedProvider?.conditions.limit_maximum),
        min: Number(selectedProvider?.conditions.limit_minimum),
        layout,
      }) && <div className={styles.error}>{t('fillAllFields')}</div>} */}
      <SuccessPaymentModal
        isError={isError}
        message={isError ? t(errorValidator(error)) : t('withdrawalSuccessfullySubmitted')}
        isOpen={openModal}
        close={closeModal}
        loading={loading}
      />
    </div>
  );
};

export default WalletWithdraw;
