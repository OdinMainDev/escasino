import React from 'react';
import { Outlet } from 'react-router-dom';
import { SettingsProvider } from './settings';
import { IsAuthProvider } from './auth';
import { HomeGamesProvider } from './homegames';

function Repositories() {
  return (
    <SettingsProvider>
      <IsAuthProvider>
        <HomeGamesProvider>
          <Outlet />
        </HomeGamesProvider>
      </IsAuthProvider>
    </SettingsProvider>
  );
}

export default Repositories;
