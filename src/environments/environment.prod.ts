import { SOURCES } from 'config/sources';

enum mongoURL {
  mongoLocal = 'http://localhost:5500',
  mongoVercel = 'https://missions-to-get-pokemons-backend-wxop.vercel.app',
}
export const environment = {
  production: false,
  pokemonSource: SOURCES.restPokeApi,
  pokemonCaughtSource: SOURCES.mongo,
  pokemonTypesSource: SOURCES.inmemory,
  missionSource: SOURCES.mongo,

  mongoURL: mongoURL.mongoVercel,
};
