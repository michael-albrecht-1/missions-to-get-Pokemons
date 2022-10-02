import { Observable } from 'rxjs';
import { PokemonType } from '../entity/pokemon-type';

export interface PokemonTypesLoader {
  all(): Observable<PokemonType[]>;
}
