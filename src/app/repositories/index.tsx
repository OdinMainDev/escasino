import { PropsWithChildren } from 'react';
import { SettingsProvider } from './settings';
import { IsAuthProvider } from './auth';
import { HomeGamesProvider } from './homegames';
import { GamesFilterProvider } from './gamesfilter';

function Repositories({ children }: PropsWithChildren) {
  return (
    <SettingsProvider>
      <IsAuthProvider>
        <HomeGamesProvider>
          <GamesFilterProvider>{children}</GamesFilterProvider>
        </HomeGamesProvider>
      </IsAuthProvider>
    </SettingsProvider>
  );
}

export default Repositories;
