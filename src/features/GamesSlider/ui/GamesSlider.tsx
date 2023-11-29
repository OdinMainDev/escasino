'use client';

import Slider from 'react-slick';
import './GamesSlider.scss';
import { IGame } from '@/shared/models/interfaces/games';
import { Game } from '@/entities/Game';
import { settings } from '../constants';

interface IProps {
  games: IGame[];
}

const GamesSlider = ({ games }: IProps) => {
  return (
    <div className="games-slider">
      <Slider {...settings}>
        {games.map((item) => (
          <div className="games-slider__slide" key={item.id}>
            <Game game={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GamesSlider;
