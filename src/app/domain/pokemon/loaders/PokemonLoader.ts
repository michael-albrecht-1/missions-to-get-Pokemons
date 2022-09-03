import { Observable } from 'rxjs';
import { PokemonSnapshotType } from '../entity/pokemon-snapshot';

export interface PokemonLoader {
  all(): Observable<PokemonSnapshotType[]>;

  get(number: string): Observable<PokemonSnapshotType>;
}
