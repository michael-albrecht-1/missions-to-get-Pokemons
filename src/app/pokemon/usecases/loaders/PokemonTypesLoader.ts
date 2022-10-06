import { Observable } from 'rxjs';
import { PokemonType } from '../../domain/entity/pokemon-type';

export interface PokemonTypesLoader {
  all(): Observable<PokemonType[]>;
}
