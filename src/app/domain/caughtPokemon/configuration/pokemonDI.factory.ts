import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class CaughtPokemonDIFactory {
  static pokemonLoader(http: HttpClient): any {
    switch (environment.pokemonSource) {
    }
  }
}
