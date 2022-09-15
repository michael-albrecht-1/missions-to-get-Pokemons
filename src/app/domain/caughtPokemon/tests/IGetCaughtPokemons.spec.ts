import { InMemoryCaughtPokemonsLoader } from '../adapters/secondaries/inmemory/inMemoryCaughtPokemons.loader';
import { CaughtPokemon } from '../entity/caughtPokemon';
import { CaughtPokemonSnapshot } from '../entity/caughtPokemon.snapshot';
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

  it('There are 1 pokemons as result.', (done) => {
    const ronflex = new CaughtPokemon('42', 'ronflex').snapshot();

    const pokemonsCaughtSource: CaughtPokemonLoader =
      new InMemoryCaughtPokemonsLoader([ronflex]);
    const iGetCaughtPokemons: IGetCaughtPokemons = new IGetCaughtPokemons(
      pokemonsCaughtSource
    );

    iGetCaughtPokemons
      .execute()
      .subscribe((caughtPokemons: CaughtPokemonSnapshot[]) => {
        expect(caughtPokemons.length).toBe(1);
        expect(caughtPokemons[0].number).toBe(ronflex.number);
        expect(caughtPokemons[0].name).toBe(ronflex.name);
        done();
      });
  });

  it('There are 2 pokemons as result.', (done) => {
    const ronflex = new CaughtPokemon('42', 'ronflex').snapshot();
    const togepi = new CaughtPokemon('43', 'togepi').snapshot();

    const pokemonsCaughtSource: CaughtPokemonLoader =
      new InMemoryCaughtPokemonsLoader([ronflex, togepi]);
    const iGetCaughtPokemons: IGetCaughtPokemons = new IGetCaughtPokemons(
      pokemonsCaughtSource
    );

    iGetCaughtPokemons
      .execute()
      .subscribe((caughtPokemons: CaughtPokemonSnapshot[]) => {
        expect(caughtPokemons.length).toBe(2);
        expect(caughtPokemons[0].number).toBe(ronflex.number);
        expect(caughtPokemons[0].name).toBe(ronflex.name);
        expect(caughtPokemons[1].number).toBe(togepi.number);
        expect(caughtPokemons[1].name).toBe(togepi.name);
        done();
      });
  });
});
