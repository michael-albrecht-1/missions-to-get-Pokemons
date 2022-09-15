import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PokeApiPokemonLoader } from '../../adapters/secondaries/real/REST-poke-api/PokeApiPokemon.loader';
import { PokemonDTO } from '../../adapters/secondaries/real/REST-poke-api/PokemonDTO';
import { PokemonSnapshotType } from '../../entity/pokemon-snapshot';
import { PokemonLoader } from '../../loaders/PokemonLoader';
import { PokemonBuilder } from '../../usecases/pokemon.builder';
import { PokemonHandler } from '../../usecases/pokemon.handler';
import { pokeApiPokemonDTOMock } from './mocks/RESTPokeApiPokemonDTOMock';

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

    const expectedPokemon: PokemonSnapshotType = new PokemonBuilder()
      .withNumber(fakePokemonResponsePokemons.id.toString())
      .withName(fakePokemonResponsePokemons.name)
      .withDescription('')
      .withHeight(fakePokemonResponsePokemons.height)
      .withWeight(fakePokemonResponsePokemons.weight)
      .withAvatar(fakePokemonResponsePokemons.sprites.front_default)
      .withTypes(fakePokemonResponsePokemons.types)
      .build()
      .snapshot();

    const pokemonLoader: PokemonLoader = new PokeApiPokemonLoader(
      fakeHttpClient
    );
    const pokemonHandler: PokemonHandler = new PokemonHandler(pokemonLoader);

    spyOn(localStorage, 'getItem').and.returnValue('');
    spyOn(fakeHttpClient, 'get').and.callFake(function (
      arg: string
    ): Observable<any> {
      if (arg === 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0') {
        return of({ results: fakePokemonResponsePokemonsLinks });
      }

      return of(fakePokemonResponsePokemons);
    });

    pokemonHandler.all().subscribe((pokemons) => {
      expect(pokemons).toEqual([expectedPokemon]);
      expect(fakeHttpClient.get).toHaveBeenCalledTimes(2);
      done();
    });
  });

  it('The detail of one pokemon', (done) => {
    const fakeHttpClient = { get: () => of() } as unknown as HttpClient;
    const fakePokemonResponsePokemons: PokemonDTO = pokeApiPokemonDTOMock;
    // const fakeLocalStorageGetPokemons = {}

    const expectedPokemon: PokemonSnapshotType = new PokemonBuilder()
      .withNumber(fakePokemonResponsePokemons.id.toString())
      .withName(fakePokemonResponsePokemons.name)
      .withDescription('')
      .withHeight(fakePokemonResponsePokemons.height)
      .withWeight(fakePokemonResponsePokemons.weight)
      .withAvatar(fakePokemonResponsePokemons.sprites.front_default)
      .withTypes(fakePokemonResponsePokemons.types)
      .build()
      .snapshot();

    const pokemonLoader: PokemonLoader = new PokeApiPokemonLoader(
      fakeHttpClient
    );
    const pokemonHandler: PokemonHandler = new PokemonHandler(pokemonLoader);

    spyOn(localStorage, 'getItem').and.returnValue('');

    spyOn(fakeHttpClient, 'get').and.returnValue(
      of(fakePokemonResponsePokemons)
    );

    pokemonHandler.get('1').subscribe((pokemon) => {
      expect(pokemon).toEqual(expectedPokemon);
      expect(fakeHttpClient.get).toHaveBeenCalledWith(
        `https://pokeapi.co/api/v2/pokemon/1`
      );
      done();
    });
  });
});
