import { PropsWithChildren } from 'react';
import { SettingsProvider } from './settings';
import { IsAuthProvider } from './auth';
import { HomeGamesProvider } from './homegames';
import { GamesFilterProvider } from './gamesfilter';
import { CountriesProvider } from './countries';

function Repositories({ children }: PropsWithChildren) {
  return (
    <SettingsProvider>
      <IsAuthProvider>
        <HomeGamesProvider>
          <CountriesProvider>
            <GamesFilterProvider>{children}</GamesFilterProvider>
          </CountriesProvider>
        </HomeGamesProvider>
      </IsAuthProvider>
    </SettingsProvider>
  );
}

export default Repositories;
