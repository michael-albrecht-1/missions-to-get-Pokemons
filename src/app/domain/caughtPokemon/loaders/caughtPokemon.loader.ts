import { Observable } from 'rxjs';
import { CaughtPokemonSnapshot } from '../entity/caughtPokemon.snapshot';

export interface CaughtPokemonLoader {
  get(): Observable<CaughtPokemonSnapshot[]>;
}
