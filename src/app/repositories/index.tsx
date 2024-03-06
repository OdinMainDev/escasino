import { PropsWithChildren } from 'react';
import { SettingsProvider } from './settings';
import { IsAuthProvider } from './auth';
import { HomeGamesProvider } from './homegames';

function Repositories({ children }: PropsWithChildren) {
  return (
    <SettingsProvider>
      <IsAuthProvider>
        <HomeGamesProvider>{children}</HomeGamesProvider>
      </IsAuthProvider>
    </SettingsProvider>
  );
}

export default Repositories;
