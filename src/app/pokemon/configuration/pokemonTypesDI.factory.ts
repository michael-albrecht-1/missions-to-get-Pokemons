import { environment } from 'src/environments/environment';
import { PokemonTypesLoader } from '../domain/loaders/PokemonTypesLoader';
import { InMemoryPokemonTypeLoader } from '../adapters/secondaries/inmemory/PokemonType/inmemoryPokemonType.loader';

export class PokemonTypesDIFactory {
  static pokemonTypesLoader(): PokemonTypesLoader {
    switch (environment.pokemonTypesSource) {
      default:
        return new InMemoryPokemonTypeLoader();
    }
  }
}
