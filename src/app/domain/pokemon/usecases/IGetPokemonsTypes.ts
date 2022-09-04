import { Observable, of } from 'rxjs';
import { PokemonType } from '../entity/pokemon-type';
import { PokemonTypesLoader } from '../loaders/PokemonTypesLoader';

export class IGetPokemonsTypes {
  constructor(source: PokemonTypesLoader) {}

  execute(): Observable<PokemonType[]> {
    return of();
  }
}
