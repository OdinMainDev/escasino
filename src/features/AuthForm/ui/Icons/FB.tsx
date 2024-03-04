'use client';

import { useAppSelector } from '@/shared/hooks/redux';
import React from 'react';

const FB = () => {
  const { settings } = useAppSelector((state) => state.settingsReducer);
  if (!settings?.auth?.social_fb) {
    return;
  }
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="#000" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="39" height="39" rx="3.5" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5399 29.25V26.0443C12.5321 24.5163 11.25 22.1894 11.25 19.5833C11.25 14.9809 15.2487 11.25 20.1814 11.25C25.1144 11.25 29.1128 14.9809 29.1128 19.5833C29.1128 24.1854 25.1144 27.9167 20.1814 27.9167C19.2612 27.9167 18.373 27.7867 17.5374 27.5459L14.5399 29.25ZM14.4109 22.4007L19.2276 17.3009L21.5394 19.6639L25.8743 17.3009L21.0848 22.4007L18.7945 19.9956L14.4109 22.4007Z"
        fill="#E1E1E1"
      />
    </svg>
  );
};

export default FB;
