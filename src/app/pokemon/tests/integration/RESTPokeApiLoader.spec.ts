import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PokeApiPokemonLoader } from '../../adapters/secondaries/real/REST-poke-api/PokeApiPokemon.loader';
import { PokemonDTO } from '../../adapters/secondaries/real/REST-poke-api/PokemonDTO';
import { PokemonLoader } from '../../usecases/loaders/PokemonLoader';
import { PokemonBuilder } from '../../domain/pokemon.builder';
import { pokeApiPokemonDTOMock } from './mocks/RESTPokeApiPokemonDTOMock';
import { Pokemon } from '../../domain/entity/pokemon';
import { ISearchAllPokemons } from '../../usecases/ISearchAllPokemons';
import { ISearchAPokemonByNumber } from '../../usecases/ISearchAPokemonByNumber';

type PokemonNameAndLink = {
  name: string;
  url: string;
};

describe('Integration | RestPokeApiLoader fetches', () => {
  it('A list with pokemon', (done) => {
    const fakeHttpClient = { get: () => of() } as unknown as HttpClient;
    const fakePokemonResponsePokemonsLinks: PokemonNameAndLink[] = [
      { name: 'pickatchu', url: 'https://pokeapi.co/api/v2/pickachu' },
    ];
    const fakePokemonResponsePokemons: PokemonDTO = pokeApiPokemonDTOMock;

    const expectedPokemon: Pokemon = getExpectedPokemon(
      fakePokemonResponsePokemons
    );

    const pokemonLoader: PokemonLoader = new PokeApiPokemonLoader(
      fakeHttpClient
    );
    const iSearchAllPokemons: ISearchAllPokemons = new ISearchAllPokemons(
      pokemonLoader
    );

    spyOn(localStorage, 'getItem').and.returnValue('');
    spyOn(fakeHttpClient, 'get').and.callFake(function (
      arg: string
    ): Observable<any> {
      if (arg === 'https://pokeapi.co/api/v2/pokemon?limit=649&offset=0') {
        return of({ results: fakePokemonResponsePokemonsLinks });
      }

      return of(fakePokemonResponsePokemons);
    });

    iSearchAllPokemons.execute().subscribe((pokemons: Pokemon[]) => {
      expect(pokemons.length).toEqual(1);
      expect(pokemons[0].snapshot()).toEqual(expectedPokemon.snapshot());
      expect(fakeHttpClient.get).toHaveBeenCalledTimes(2);
      done();
    });
  });

  it('The detail of one pokemon', (done) => {
    const fakeHttpClient = { get: () => of() } as unknown as HttpClient;
    const fakePokemonResponsePokemons: PokemonDTO = pokeApiPokemonDTOMock;

    const expectedPokemon: Pokemon = getExpectedPokemon(
      fakePokemonResponsePokemons
    );
    const pokemonLoader: PokemonLoader = new PokeApiPokemonLoader(
      fakeHttpClient
    );
    const iSearchAPokemonByNumber: ISearchAPokemonByNumber =
      new ISearchAPokemonByNumber(pokemonLoader);

    spyOn(localStorage, 'getItem').and.returnValue('');

    spyOn(fakeHttpClient, 'get').and.returnValue(
      of(fakePokemonResponsePokemons)
    );

    iSearchAPokemonByNumber.execute('1').subscribe((pokemon: Pokemon) => {
      expect(pokemon.snapshot()).toEqual(expectedPokemon.snapshot());
      expect(fakeHttpClient.get).toHaveBeenCalledWith(
        `https://pokeapi.co/api/v2/pokemon/1`
      );
      done();
    });
  });
});

function getExpectedPokemon(pokemonDTO: PokemonDTO) {
  return new PokemonBuilder()
    .withNumber(pokemonDTO.id.toString())
    .withName(pokemonDTO.name)
    .withDescription('')
    .withHeight(pokemonDTO.height)
    .withWeight(pokemonDTO.weight)
    .withAvatar(pokemonDTO.sprites.front_default)
    .withTypes(pokemonDTO.types)
    .build();
}
