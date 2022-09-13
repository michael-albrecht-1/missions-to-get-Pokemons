import { InMemoryCaughtPokemonsLoader } from '../adapters/secondaries/inmemory/inMemoryCaughtPokemons.loader';
import { CaughtPokemonLoader } from '../loaders/caughtPokemon.loader';

import { IGetCaughtPokemons } from '../usecases/IGetCaughtPokemons';

describe('As a user I get caught pokemons', () => {
  it('There are 0 pokemons as result.', (done) => {
    const pokemonsCaughtSource: CaughtPokemonLoader =
      new InMemoryCaughtPokemonsLoader([]);
    const iGetCaughtPokemons: IGetCaughtPokemons = new IGetCaughtPokemons(
      pokemonsCaughtSource
    );

    iGetCaughtPokemons.execute().subscribe((caughtPokemons: any[]) => {
      expect(caughtPokemons.length).toBe(0);
      done();
    });
  });
});
