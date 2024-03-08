import { Settings } from 'react-slick';

export const settings: Settings = {
  dots: false,
  infinite: true,
  speed: 300,
  rows: 1,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplaySpeed: 4000,
  autoplay: true,
  responsive: [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 320,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};
