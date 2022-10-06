import { Observable } from 'rxjs';
import { CaughtPokemon } from '../../domain/entity/caughtPokemon';

export interface CaughtPokemonLoader {
  get(): Observable<CaughtPokemon[]>;
}
