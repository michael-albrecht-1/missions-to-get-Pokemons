import { InMemoryPokemonTypeLoader } from '../adapters/secondaries/inmemory/PokemonType/inmemoryPokemonType.loader';
import { PokemonTypeMapper } from '../adapters/secondaries/inmemory/PokemonType/pokemonType.mapper';
import { PokemonTypesDataFromPokeApi } from '../adapters/secondaries/inmemory/PokemonType/pokemonTypesDataFromPokeApi';
import { PokemonType } from '../entity/pokemon-type';
import { PokemonTypesLoader } from '../loaders/PokemonTypesLoader';
import { IGetPokemonsTypes } from '../usecases/IGetPokemonsTypes';
import { StubPokemonBuilder } from './stubs/stubPokemonBuilder';

describe('As a user I get a list', () => {
  const expectedPokemonsTypes: PokemonType[] = PokemonTypesDataFromPokeApi.map(
    PokemonTypeMapper.toPokemonType
  );

  it('with pokemon types', (done) => {
    const iGetPokemonTypes = createIGetPokemonsTypes();
    iGetPokemonTypes
      .execute()
      .subscribe((pokemonsTypes: PokemonType[]) => {
        verifyListOfPokemonsTypes(pokemonsTypes, expectedPokemonsTypes);
        done();
      })
      .unsubscribe();

    function verifyListOfPokemonsTypes(
      pokemonsTypes: PokemonType[],
      expectedPokemonsTypes: PokemonType[]
    ) {
      expect(pokemonsTypes).toEqual(expectedPokemonsTypes);
      expect(pokemonsTypes.length).toEqual(expectedPokemonsTypes.length);

      pokemonsTypes.forEach((pokemonType: PokemonType, indice: number) => {
        verifyOnePokemonType(pokemonType, expectedPokemonsTypes[indice]);
      });
    }
  });

  function createIGetPokemonsTypes(): IGetPokemonsTypes {
    const pokemonTypeSource: PokemonTypesLoader =
      new InMemoryPokemonTypeLoader();
    return new IGetPokemonsTypes(pokemonTypeSource);
  }

  function verifyOnePokemonType(
    pokemonType: PokemonType,
    expected: PokemonType
  ) {
    expect(pokemonType.name).toEqual(expected.name);
    expect(pokemonType.detailUrl).toEqual(expected.detailUrl);
    expect(pokemonType.logo).toEqual(expected.logo);
  }
});
