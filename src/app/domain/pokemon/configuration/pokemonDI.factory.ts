import { HttpClient } from '@angular/common/http';
import { PokemonBuilder } from '../usecases/pokemon.builder';
import { RESTPokemonLoader } from '../adapters/secondaries/real/RESTPokemon.loader';
import { Pokemon } from '../entity/pokemon';
import { PokemonLoader } from '../loaders/PokemonLoader';
import { InMemoryPokemonLoader } from '../adapters/secondaries/inmemory/inmemoryPokemon.loader';
import { environment, SOURCES } from 'src/environments/environment';

export class PokemonDIFactory {
  static pokemonLoader(http: HttpClient): PokemonLoader {
    switch (environment.source) {
      case SOURCES.rest:
        return new RESTPokemonLoader(http);
      default:
        const pickachu: Pokemon = new PokemonBuilder()
          .withNumber('25')
          .withName('Pickachu')
          .withDescription('Lorem Ipsum of pickachu')
          .withHeight(1.3)
          .withWeight(0.7)
          .withAvatar('http://via.placeholder.com/475px475')
          .build();
        const salameche: Pokemon = new PokemonBuilder()
          .withNumber('4')
          .withName('Salameche')
          .withDescription('Lorem Ipsum of salameche')
          .withHeight(1.7)
          .withWeight(30)
          .withAvatar('http://via.placeholder.com/475px475')
          .build();
        const mewtwo: Pokemon = new PokemonBuilder()
          .withNumber('150')
          .withName('Mewtwo')
          .withDescription('Lorem Ipsum of mewtwo')
          .withHeight(2)
          .withWeight(100)
          .withAvatar('http://via.placeholder.com/475px475')
          .build();
        return new InMemoryPokemonLoader([pickachu, salameche, mewtwo]);
    }
  }
}
