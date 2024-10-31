import classNames from 'classnames';
import styles from './TopGames.module.scss';
import { IGame } from '@/shared/models/interfaces/game';
import { GamesSlider } from '@/widgets/Games/ui/Slider';
import { useTranslation } from 'react-i18next';

interface IProps {
  games: IGame[];
}

const TopGames = ({ games }: IProps) => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={classNames('title', styles.title)}>{t('topGames')}</div>
      <GamesSlider games={games} />
    </div>
  );
};

export default TopGames;
