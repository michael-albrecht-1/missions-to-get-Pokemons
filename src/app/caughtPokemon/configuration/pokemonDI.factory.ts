import { HttpClient } from '@angular/common/http';
import { SOURCES } from 'config/sources';
import { environment } from 'src/environments/environment';
import { InMemoryCaughtPokemonsLoader } from '../adapters/secondaries/inmemory/inMemoryCaughtPokemons.loader';
import { CaughtPokemonMongoLoader } from '../adapters/secondaries/real/REST-mongo/caughtPokemonMongo.loader';
import { CaughtPokemon } from '../entity/caughtPokemon';

export class CaughtPokemonDIFactory {
  static pokemonCaughtLoader(
    http: HttpClient
  ): CaughtPokemonMongoLoader | InMemoryCaughtPokemonsLoader {
    switch (environment.pokemonCaughtSource) {
      case SOURCES.mongo:
        return new CaughtPokemonMongoLoader(http);
      default:
        const ronflex: CaughtPokemon = { number: '42', name: 'ronflex' };
        const togepi: CaughtPokemon = { number: '43', name: 'togepi' };
        return new InMemoryCaughtPokemonsLoader([ronflex, togepi]);
    }
  }
}
