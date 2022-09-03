import { InMemoryPokemonLoader } from '../adapters/secondaries/inmemory/inmemoryPokemon.loader';
import { PokemonSnapshotType } from '../entity/pokemon-snapshot';
import { PokemonLoader } from '../loaders/PokemonLoader';
import { PokemonHandler } from '../usecases/pokemon.handler';
import { StubPokemonBuilder } from './stubs/stubPokemonBuilder';

describe('Pokemon handler fetches', () => {
  let pikachu: PokemonSnapshotType;

  beforeEach(() => {
    pikachu = new StubPokemonBuilder().withName('pikachu').build().snapshot();
  });

  describe('A list', () => {
    it('With 0 pokemons if there is 0 pokemons in the source', (done) => {
      const pokemonHandler = createPokemonHandler([]);
      pokemonHandler
        .all()
        .subscribe((pokemons: PokemonSnapshotType[]) => {
          expect(pokemons).toEqual([]);
          done();
        })
        .unsubscribe();
    });

    it('With 1 pokemon if there is 1 pokemons in the source', (done) => {
      const pokemonHandler = createPokemonHandler([pikachu]);
      pokemonHandler
        .all()
        .subscribe((pokemons: PokemonSnapshotType[]) => {
          verifyListOfPokemons(pokemons, [pikachu]);
          done();
        })
        .unsubscribe();
    });

    it('With 2 pokemons if there is 2 pokemons in the source', (done) => {
      const salameche: PokemonSnapshotType = new StubPokemonBuilder()
        .withName('salameche')
        .withNumber('2')
        .build()
        .snapshot();
      const pokemonHandler = createPokemonHandler([pikachu, salameche]);
      pokemonHandler
        .all()
        .subscribe((pokemons: PokemonSnapshotType[]) => {
          verifyListOfPokemons(pokemons, [pikachu, salameche]);
          done();
        })
        .unsubscribe();
    });

    function verifyListOfPokemons(
      pokemons: PokemonSnapshotType[],
      expectedPokemons: PokemonSnapshotType[]
    ) {
      expect(pokemons).toEqual(expectedPokemons);
      expect(pokemons.length).toEqual(expectedPokemons.length);

      pokemons.forEach((pokemon: PokemonSnapshotType, indice: number) => {
        verifyOnePokemon(pokemon, expectedPokemons[indice]);
      });
    }
  });

  it('A details of one pokemon', (done) => {
    const salameche: PokemonSnapshotType = new StubPokemonBuilder()
      .withName('salameche')
      .withNumber('2')
      .build()
      .snapshot();
    const pokemonHandler = createPokemonHandler([pikachu, salameche]);

    pokemonHandler
      .get('2')
      .subscribe((pokemon: PokemonSnapshotType) => {
        verifyOnePokemon(pokemon, salameche);
        done();
      })
      .unsubscribe();
  });

  function createPokemonHandler(
    pokemons: PokemonSnapshotType[]
  ): PokemonHandler {
    const pokemonSource: PokemonLoader = new InMemoryPokemonLoader(pokemons);
    return new PokemonHandler(pokemonSource);
  }

  function verifyOnePokemon(
    pokemon: PokemonSnapshotType,
    expected: PokemonSnapshotType
  ) {
    expect(pokemon.number).toEqual(expected.number);
    expect(pokemon.name).toEqual(expected.name);
    expect(pokemon.description).toEqual(expected.description);
    expect(pokemon.weight).toEqual(expected.weight);
    expect(pokemon.height).toEqual(expected.height);
    expect(pokemon.avatar).toEqual(expected.avatar);
    expect(pokemon.types.length).toEqual(expected.types.length);
  }
});
