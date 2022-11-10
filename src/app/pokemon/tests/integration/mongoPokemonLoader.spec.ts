import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { PokemonLoader } from '../../usecases/loaders/PokemonLoader';
import { PokemonBuilder } from '../../domain/pokemon.builder';
import { Pokemon } from '../../domain/entity/pokemon';
import { ISearchAllPokemons } from '../../usecases/ISearchAllPokemons';
import { ISearchAPokemonByNumber } from '../../usecases/ISearchAPokemonByNumber';
import { environment } from 'src/environments/environment';
import { MongoPokemonDTO } from '../../adapters/secondaries/real/mongo-pokemon-loader/mongoPokemonDTO';
import { MongoPokemonDTOMock } from './mocks/mongoPokemonDTOMock';
import { MongoPokemonLoader } from '../../adapters/secondaries/real/mongo-pokemon-loader/mongoPokemon.loader';

describe('Integration | MongoPokemonsLoader fetches', () => {
  const baseUrl: string = environment.mongoURL;

  it('A list with 1 pokemon', (done) => {
    const fakeHttpClient = { get: () => of() } as unknown as HttpClient;

    const fakePokemonResponsePokemons: MongoPokemonDTO[] = [
      MongoPokemonDTOMock[0],
    ];

    const expectedPokemons: Pokemon[] =
      fakePokemonResponsePokemons.map(getExpectedPokemon);

    const pokemonLoader: PokemonLoader = new MongoPokemonLoader(fakeHttpClient);
    const iSearchAllPokemons: ISearchAllPokemons = new ISearchAllPokemons(
      pokemonLoader
    );

    spyOn(fakeHttpClient, 'get').and.returnValue(
      of(fakePokemonResponsePokemons)
    );

    iSearchAllPokemons.execute().subscribe((pokemons: Pokemon[]) => {
      expect(pokemons.length).toEqual(1);
      expect(pokemons[0].snapshot()).toEqual(expectedPokemons[0].snapshot());
      expect(fakeHttpClient.get).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('The detail of one pokemon', (done) => {
    const fakeHttpClient = { get: () => of() } as unknown as HttpClient;
    const fakePokemonResponsePokemon: MongoPokemonDTO = MongoPokemonDTOMock[0];

    const expectedPokemon: Pokemon = getExpectedPokemon(
      fakePokemonResponsePokemon
    );
    const pokemonLoader: PokemonLoader = new MongoPokemonLoader(fakeHttpClient);

    const iSearchAPokemonByNumber: ISearchAPokemonByNumber =
      new ISearchAPokemonByNumber(pokemonLoader);

    spyOn(fakeHttpClient, 'get').and.returnValue(
      of(fakePokemonResponsePokemon)
    );

    iSearchAPokemonByNumber.execute('1').subscribe((pokemon: Pokemon) => {
      expect(pokemon.snapshot()).toEqual(expectedPokemon.snapshot());
      expect(fakeHttpClient.get).toHaveBeenCalledWith(`${baseUrl}/pokemons/1`);
      done();
    });
  });
});

function getExpectedPokemon(pokemonDTO: MongoPokemonDTO) {
  return new PokemonBuilder()
    .withNumber(pokemonDTO.id.toString())
    .withName(pokemonDTO.name)
    .withDescription('')
    .withHeight(pokemonDTO.height)
    .withWeight(pokemonDTO.weight)
    .withTypes(pokemonDTO.types.map((type) => type?.type?.name))
    .build();
}
