import { useGenerateLimitText } from '@/features/Wallet/helpers/payment';
import styles from '../styles.module.scss';

interface LimitTextDisplayProps {
  minAmount: number;
  maxAmount: number;
  selectedProvider: {
    conditions: {
      limit_minimum: number;
      limit_maximum: number;
    };
    currency: string;
  };
  amount: string;
}

const LimitTextDisplay: React.FC<LimitTextDisplayProps> = ({
  minAmount,
  maxAmount,
  selectedProvider,
  amount,
}) => {
  const limitText = useGenerateLimitText(
    minAmount > 0 && minAmount > selectedProvider?.conditions.limit_minimum
      ? minAmount
      : selectedProvider?.conditions.limit_minimum,
    maxAmount > 0 &&
      (maxAmount < selectedProvider?.conditions.limit_maximum ||
        selectedProvider?.conditions.limit_maximum === 0)
      ? maxAmount
      : selectedProvider?.conditions.limit_maximum,
    selectedProvider.currency,
    amount,
  );

  return (
    <div className={styles.subtitle}>
      <div className="flex items-center justify-between">
        {limitText.minimum}
        {limitText.maximum}
      </div>
    </div>
  );
};

export default LimitTextDisplay;
