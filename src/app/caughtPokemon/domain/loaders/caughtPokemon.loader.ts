import { Observable } from 'rxjs';
import { CaughtPokemon } from '../entity/caughtPokemon';

export interface CaughtPokemonLoader {
  get(): Observable<CaughtPokemon[]>;
}
