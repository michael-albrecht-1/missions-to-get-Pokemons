import { Observable } from 'rxjs';
import { Pokemon } from '../../domain/entity/pokemon';

export interface PokemonLoader {
  all(): Observable<Pokemon[]>;

  get(number: string): Observable<Pokemon>;
}
