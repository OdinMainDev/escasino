import { IGame } from '@/app/entities/game';
import styles from './Game.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GoBackButton from '@/views/components/GoBackButton';
import Icons from '@/views/components/Icons';
import Button from '@/views/components/Button';
import { Footer } from '@/views/components/Footer';
import classNames from 'classnames';
import { getGameByIdApi } from '@/app/api/games/getGameById';
import { usePreloader } from '@/app/providers/preloader';
import { WinningsList } from '@/views/components/WinningsList';
import { ImagePlaceholder } from '@/views/components/ImagePlaceholder';

export default function Game() {
  const [game, setGame] = useState<IGame | null>(null);
  const { id } = useParams();
  const { hidePreloader } = usePreloader();

  useEffect(() => {
    const getGameById = async () => {
      const data = await getGameByIdApi(Number(id));
      setGame(data);
      hidePreloader();
    };

    void getGameById();
  }, []);

  if (!game) {
    return null;
  }

  // TODO: плейсхолдер так же вставить сюда если нет изображения
  // TODO: исправить изображение ( размер не тот, сделать железобетонно чтобы размер контейнера не зависил от размера изображения )
  // TODO: а само изображение background-size: cover;
  // TODO: исправить как текст показывается ( заголовок и описание игры ( у дизайна отступы больше, да и как будто бы шрифты не подтянулись ) )
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <GoBackButton />
        <div className={styles.provider_name}>{game.game_provider}</div>
        <Icons icon="chat" />
      </div>
      <div className={styles.image_container}>
        {game?.image ? (
          <img src={game.image} alt={game.name} className={styles.image} />
        ) : (
          <ImagePlaceholder {...game} />
        )}
      </div>

      <div className={styles.buttons}>
        <Button elType="outlined" className={styles.button}>
          Демо-игра
        </Button>
        <Button elType="contained" className={styles.button}>
          Играть на деньги
        </Button>
        {!game?.has_freerounds ? (
          ''
        ) : (
          <Button elType="outlined" className={classNames(styles.button, styles.button_big)}>
            <Icons icon="settings" />
            <span>Сконфигурировать бонус</span>
          </Button>
        )}
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
}
