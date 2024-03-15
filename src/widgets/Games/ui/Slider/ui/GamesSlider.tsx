import Slider, { Settings } from 'react-slick';
import './GamesSlider.scss';
import { settingsResponsive } from '../constants';
import { IGame } from '@/entities/game';
import { GridItem } from '@/widgets/Games/ui/GridItem';

interface IProps {
  games: IGame[];
}

interface IArrowProps {
  onClick?: () => void;
}

const PrevArrow = ({ onClick }: IArrowProps) => {
  return (
    <div onClick={onClick} className="games-slider__button games-slider__button_prev">
      <svg width="6" height="10" viewBox="0 0 6 10" fill="#000" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.70711 0.292893C6.09763 0.683417 6.09763 1.31658 5.70711 1.70711L2.41421 5L5.70711 8.29289C6.09763 8.68342 6.09763 9.31658 5.70711 9.70711C5.31658 10.0976 4.68342 10.0976 4.29289 9.70711L0.292893 5.70711C-0.0976311 5.31658 -0.0976311 4.68342 0.292893 4.29289L4.29289 0.292893C4.68342 -0.0976311 5.31658 -0.0976311 5.70711 0.292893Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

const NextArrow = ({ onClick }: IArrowProps) => {
  return (
    <div onClick={onClick} className="games-slider__button games-slider__button_next">
      <svg width="6" height="10" viewBox="0 0 6 10" fill="#000" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L5.70711 4.29289C6.09763 4.68342 6.09763 5.31658 5.70711 5.70711L1.70711 9.70711C1.31658 10.0976 0.683417 10.0976 0.292893 9.70711C-0.0976311 9.31658 -0.0976311 8.68342 0.292893 8.29289L3.58579 5L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

const GamesSlider = ({ games }: IProps) => {
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 300,
    rows: 1,
    slidesToShow: 3.5,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: settingsResponsive,
  };

  return (
    <div className="games-slider">
      <Slider {...settings}>
        {games.map((item) => (
          <div className="games-slider__slide" key={item.id}>
            <GridItem game={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GamesSlider;
