import GoBackButton from '@/shared/ui/GoBackButton';
import styles from './styles.module.scss';
import { getGamesById } from '@/shared/api/gamesApi';
import Image from 'next/image';
import Button from '@/shared/ui/Button';
import Icons from '@/shared/ui/Icons';
import classNames from 'classnames';
import { WinningsList } from '@/features/WinningsList';
import { Footer } from '@/widgets/Footer';

interface IProps {
  params: {
    id: string;
  };
}

const GameItem = async ({ params }: IProps) => {
  const game = await getGamesById(Number(params.id));

  if (!game) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <GoBackButton />
      </div>
      <div className={styles.provider}>
        <div className={styles.provider_name}>{game.game_provider}</div>
        <div className={styles.provider_favorite}>
          <Icons icon="star" />
        </div>
      </div>
      <div className={styles.image_container}>
        {game?.image ? (
          <Image src={game.image} alt={game.name} className={styles.image} fill />
        ) : (
          <div className={styles.image}></div>
        )}
      </div>

      <div className={styles.buttons}>
        <Button elType="outlined" className={styles.button}>
          Демо-игра
        </Button>
        <Button elType="contained" className={styles.button}>
          Играть на деньги
        </Button>
        <Button elType="outlined" className={classNames(styles.button, styles.button_big)}>
          <Icons icon="settings" />
          <span>Сконфигурировать бонус</span>
        </Button>
      </div>
      <div className={styles.winnings}>
        <WinningsList />
      </div>
      <div className={styles.description}>
        <div className={styles.description_title}>Monster Blox</div>
        <div className={styles.description_info}>
          Heroes gather at the old tavern where the bounty for hunting them down are on display and
          for the taken. The rewards are grand for the bravest warriors, those who can take down the
          biggest ones.
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GameItem;
