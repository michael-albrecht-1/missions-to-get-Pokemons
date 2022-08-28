import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Pokemon } from '../../../../entity/pokemon';
import { PokemonLoader } from '../../../../loaders/PokemonLoader';
import { PokemonMapper } from './pokemon.mapper';
import { PokemonDTO } from './PokemonDTO';

export class RESTMongoPokemonLoader implements PokemonLoader {
  constructor(private http: HttpClient) {}

  all(): Observable<Pokemon[]> {
    return this.http
      .get<PokemonDTO[]>('http://localhost:5500/' + 'pokemons')
      .pipe(
        map<PokemonDTO[], Pokemon[]>((pokemons) =>
          pokemons.map(PokemonMapper.mapToPokemon)
        )
      );
  }

  get(number: string): Observable<Pokemon> {
    return of();
  }
}
