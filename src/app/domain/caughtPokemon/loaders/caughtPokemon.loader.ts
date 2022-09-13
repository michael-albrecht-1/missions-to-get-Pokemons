import { Observable } from 'rxjs';

export interface CaughtPokemonLoader {
  get(): Observable<any>;
}
