import { Settings } from 'react-slick';

export const settings: Settings = {
  dots: false,
  infinite: false,
  speed: 500,
  rows: 1,
  slidesToShow: 2,
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 320,
      settings: {
        slidesToShow: 2.3,
      },
    },
  ],
};
