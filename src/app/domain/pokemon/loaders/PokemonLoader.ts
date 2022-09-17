import { Observable } from 'rxjs';
import { Pokemon } from '../entity/pokemon';

export interface PokemonLoader {
  all(): Observable<Pokemon[]>;

  get(number: string): Observable<Pokemon>;
}
