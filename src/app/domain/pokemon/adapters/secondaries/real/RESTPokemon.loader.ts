import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { Pokemon } from '../../../entity/pokemon';
import { PokemonLoader } from '../../../loaders/PokemonLoader';
import { PokemonDTO } from './DTO/PokemonDTO';
import { PokemonMapper } from './mappers/pokemon.mapper';

export class RESTPokemonLoader implements PokemonLoader {
  constructor(private http: HttpClient) {}

  all(): Observable<Pokemon[]> {
    return this.http
      .get<PokemonDTO[]>('http://localhost:5500/' + 'pokemons')
      .pipe(
        tap((a) => console.warn(a)),
        map<PokemonDTO[], Pokemon[]>((pokemons) =>
          pokemons.map(PokemonMapper.mapToPokemon)
        )
      );
  }

  get(number: string): Observable<Pokemon> {
    return of();
  }
}
