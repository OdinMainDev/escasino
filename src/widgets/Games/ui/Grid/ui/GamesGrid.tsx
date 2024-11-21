import { IGame } from '@/shared/models/interfaces/game';
import styles from './GamesGrid.module.scss';
import { GridItem } from '@/widgets/Games/ui/GridItem';
import { useEffect, useRef } from 'react';

interface IProps {
  games: IGame[];
  viewLastElement?: () => void;
}

const GamesGrid = ({ games, viewLastElement }: IProps) => {
  const lastElementRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          viewLastElement?.();
        }
      },
      { threshold: 1.0 },
    );

    const currentRef = lastElementRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [viewLastElement]);

  return (
    <div className={styles.container}>
      <div className={styles.table}>
        {games.map((item, index) => (
          <div
            className={styles.game}
            key={index}
            ref={index === games.length - 1 ? lastElementRef : null}
          >
            <GridItem game={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesGrid;
