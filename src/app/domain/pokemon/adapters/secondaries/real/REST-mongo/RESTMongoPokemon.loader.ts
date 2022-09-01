import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { PokemonSnapshotType } from 'src/app/domain/pokemon/entity/pokemon-snapshot';
import { Pokemon } from '../../../../entity/pokemon';
import { PokemonLoader } from '../../../../loaders/PokemonLoader';
import { PokemonMapper } from './pokemon.mapper';
import { PokemonDTO } from './PokemonDTO';

export class RESTMongoPokemonLoader implements PokemonLoader {
  constructor(private http: HttpClient) {}

  all(): Observable<PokemonSnapshotType[]> {
    return this.http
      .get<PokemonDTO[]>('http://localhost:5500/' + 'pokemons')
      .pipe(
        map<PokemonDTO[], PokemonSnapshotType[]>((pokemons) =>
          pokemons.map(PokemonMapper.mapToPokemon)
        )
      );
  }

  get(number: string): Observable<PokemonSnapshotType> {
    return of();
  }
}
