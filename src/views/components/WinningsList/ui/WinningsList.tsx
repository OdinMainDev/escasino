import Slider from 'react-slick';
import { getWinningsList } from '../api/winnningsApi';
import WinningsItem from './WinningsItem';
import './WinningsList.scss';
import { settings } from '../constants';

const WinningsList = () => {
  const winnings = getWinningsList();

  // TODO: сделать тут прокрутку ( карусельку )
  return (
    <div className="winnings-list__container">
      <div className="winnings-list__title">Последние выигрыши</div>
      <Slider {...settings} className="winnings-list__list">
        {winnings.map((item, index) => (
          <div className="winnings-list__item" key={index}>
            <WinningsItem {...item} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default WinningsList;
