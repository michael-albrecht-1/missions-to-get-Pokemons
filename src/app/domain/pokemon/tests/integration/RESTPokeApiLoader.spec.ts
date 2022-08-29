import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { PokeApiPokemonLoader } from '../../adapters/secondaries/real/REST-poke-api/PokeApiPokemon.loader';
import { PokemonDTO } from '../../adapters/secondaries/real/REST-poke-api/PokemonDTO';
import { Pokemon } from '../../entity/pokemon';
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

    const expectedPokemon: Pokemon = new PokemonBuilder()
      .withNumber(fakePokemonResponsePokemons.id.toString())
      .withName(fakePokemonResponsePokemons.name)
      .withDescription('')
      .withHeight(fakePokemonResponsePokemons.height)
      .withWeight(fakePokemonResponsePokemons.weight)
      .withAvatar(fakePokemonResponsePokemons.sprites.front_default)
      .withTypes(fakePokemonResponsePokemons.types)
      .build();

    const pokemonLoader: PokemonLoader = new PokeApiPokemonLoader(
      fakeHttpClient
    );
    const pokemonHandler: PokemonHandler = new PokemonHandler(pokemonLoader);

    spyOn(fakeHttpClient, 'get').and.callFake(function (
      arg: string
    ): Observable<any> {
      if (arg === 'https://pokeapi.co/api/v2/pokemon') {
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
});
