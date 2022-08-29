import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { PokemonDTO } from '../../adapters/secondaries/real/REST-poke-api/PokemonDTO';
import { RESTPokeApiPokemonLoader } from '../../adapters/secondaries/real/REST-poke-api/RESTPokeApiPokemon.loader';
import { Pokemon } from '../../entity/pokemon';
import { PokemonLoader } from '../../loaders/PokemonLoader';
import { PokemonBuilder } from '../../usecases/pokemon.builder';
import { PokemonHandler } from '../../usecases/pokemon.handler';

describe('Integration | RestPokeApiLoader fetches', () => {
  it('A list with pokemon', (done) => {
    const fakeHttpClient = { get: () => of() } as unknown as HttpClient;
    const fakePokemonResponse: PokemonDTO = {
      id: 1,
      name: 'pokemonDTO',
      base_experience: 150,
      height: 2,
      is_default: true,
      order: 1,
      weight: 1,
      abilities: [],
      held_items: [],
      location_area_encounters: '',
      moves: [],
      species: null,
      sprites: {
        front_default: '',
        front_shiny: '',
        front_female: '',
        front_shiny_female: '',
        back_default: '',
        back_shiny: '',
        back_female: '',
        back_shiny_female: '',
      },
      stats: [],
      types: [],
      past_types: [],
    };

    const expectedPokemon: Pokemon = new PokemonBuilder()
      .withName('name')
      .withNumber('1')
      .withDescription('desc')
      .withHeight(1)
      .withWeight(2)
      .withAvatar('avatar')
      .withTypes(['water'])
      .build();

    const pokemonLoader: PokemonLoader = new RESTPokeApiPokemonLoader(
      fakeHttpClient
    );
    const pokemonHandler: PokemonHandler = new PokemonHandler(pokemonLoader);

    spyOn(fakeHttpClient, 'get').and.returnValue(of(fakePokemonResponse));

    pokemonHandler.all().subscribe((pokemons) => {
      expect(pokemons).toEqual([expectedPokemon]);
      done();
    });
  });
});
