import { InMemoryPokemonLoader } from '../adapters/secondaries/inmemoryPokemon.loader';
import { Pokemon } from '../entity/pokemon';
import { PokemonLoader } from '../loaders/PokemonLoader';
import { PokemonHandler } from '../usecases/pokemon.handler';
import { StubPokemonBuilder } from './stubs/stubPokemonBuilder';

describe('Pokemon handler fetches', () => {
  let pikachu: Pokemon;

  beforeEach(() => {
    pikachu = new StubPokemonBuilder().withName('pikachu').build();
  });

  describe('A list', () => {
    it('With 0 pokemons if there is 0 pokemons in the source', (done) => {
      const pokemonHandler = createPokemonHandler([]);
      pokemonHandler
        .all()
        .subscribe((pokemons: Pokemon[]) => {
          expect(pokemons).toEqual([]);
          done();
        })
        .unsubscribe();
    });

    it('With 1 pokemon if there is 1 pokemons in the source', (done) => {
      const pokemonHandler = createPokemonHandler([pikachu]);
      pokemonHandler
        .all()
        .subscribe((pokemons: Pokemon[]) => {
          verifyListOfPokemons(pokemons, [pikachu]);
          done();
        })
        .unsubscribe();
    });

    it('With 2 pokemons if there is 2 pokemons in the source', (done) => {
      const salameche: Pokemon = new StubPokemonBuilder()
        .withName('salameche')
        .withNumber('2')
        .build();
      const pokemonHandler = createPokemonHandler([pikachu, salameche]);
      pokemonHandler
        .all()
        .subscribe((pokemons: Pokemon[]) => {
          verifyListOfPokemons(pokemons, [pikachu, salameche]);
          done();
        })
        .unsubscribe();
    });

    function verifyListOfPokemons(
      pokemons: Pokemon[],
      expectedPokemons: Pokemon[]
    ) {
      expect(pokemons).toEqual(expectedPokemons);
      expect(pokemons.length).toEqual(expectedPokemons.length);

      pokemons.forEach((pokemon: Pokemon, indice: number) => {
        verifyOnePokemon(pokemon, expectedPokemons[indice]);
      });
    }
  });

  it('A details of one pokemon', (done) => {
    const salameche: Pokemon = new StubPokemonBuilder()
      .withName('salameche')
      .withNumber('2')
      .build();
    const pokemonHandler = createPokemonHandler([pikachu, salameche]);

    pokemonHandler
      .get('2')
      .subscribe((pokemon: Pokemon) => {
        verifyOnePokemon(pokemon, salameche);
        done();
      })
      .unsubscribe();
  });

  function createPokemonHandler(pokemons: Pokemon[]): PokemonHandler {
    const pokemonSource: PokemonLoader = new InMemoryPokemonLoader(pokemons);
    return new PokemonHandler(pokemonSource);
  }

  function verifyOnePokemon(pokemon: Pokemon, expected: Pokemon) {
    expect(pokemon.number).toEqual(expected.number);
    expect(pokemon.name).toEqual(expected.name);
    expect(pokemon.description).toEqual(expected.description);
    expect(pokemon.weight).toEqual(expected.weight);
    expect(pokemon.height).toEqual(expected.height);
    expect(pokemon.avatar).toEqual(expected.avatar);
  }
});
