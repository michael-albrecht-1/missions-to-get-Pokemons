import { HttpClient } from '@angular/common/http';
import { SOURCES } from 'config/sources';
import { environment } from 'src/environments/environment';
import { InMemoryCaughtPokemonsLoader } from '../adapters/secondaries/inmemory/inMemoryCaughtPokemons.loader';
import { CaughtPokemonMongoLoader } from '../adapters/secondaries/real/REST-mongo/caughtPokemonMongo.loader';
import { CaughtPokemon } from '../domain/entity/caughtPokemon';

export class CaughtPokemonDIFactory {
  static pokemonCaughtLoader(
    http: HttpClient
  ): CaughtPokemonMongoLoader | InMemoryCaughtPokemonsLoader {
    switch (environment.pokemonCaughtSource) {
      case SOURCES.mongo:
        return new CaughtPokemonMongoLoader(http);
      default:
        const Snorlax: CaughtPokemon = new CaughtPokemon({
          number: '143',
          name: 'Snorlax',
        });
        const Zangoose: CaughtPokemon = new CaughtPokemon({
          number: '335',
          name: 'Zangoose',
        });
        return new InMemoryCaughtPokemonsLoader([Snorlax, Zangoose]);
    }
  }
}
