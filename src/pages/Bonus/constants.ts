import { Settings } from 'react-slick';

export const settings: Settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 430,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 380,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};
