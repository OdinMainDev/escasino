import React from 'react';
import { usePreloader } from '@/app/providers/preloader';

const Preloader: React.FC = () => {
  const { isLoading } = usePreloader();

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        color: '#fff',
        fontSize: '32px',
      }}
    >
      <div>Loading...</div>
    </div>
  );
};

export default Preloader;
