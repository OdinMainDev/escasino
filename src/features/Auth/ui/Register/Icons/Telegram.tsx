'use client';

import React from 'react';

import { useAppSelector } from '@/store/hooks/redux';

const Telegram = () => {
  const { settings, loading } = useAppSelector((state) => state.settingsReducer);
  if (loading || !settings?.auth?.social_tg) {
    return;
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="#000">
      <rect x="0.5" y="0.5" width="39" height="39" rx="3.5" stroke="#1F1F1F" />
      <path
        d="M18.0518 21.9635L17.7702 26.1828C18.184 26.1828 18.3669 25.9936 18.5978 25.769L20.586 23.8357L24.7223 26.8917C25.4835 27.3117 26.0329 27.0942 26.2225 26.185L28.9379 13.3894C29.2159 12.2748 28.513 11.7693 27.7848 12.0999L11.8404 18.2479C10.7521 18.6845 10.7584 19.2917 11.6421 19.5622L15.7337 20.8393L25.2064 14.8631C25.6536 14.5919 26.064 14.7377 25.7271 15.0367L18.0516 21.9633L18.0518 21.9635Z"
        fill="#E1E1E1"
      />
    </svg>
  );
};

export default Telegram;
