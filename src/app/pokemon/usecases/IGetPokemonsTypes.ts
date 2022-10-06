import { Observable, of } from 'rxjs';
import { PokemonType } from '../domain/entity/pokemon-type';
import { PokemonTypesLoader } from './loaders/PokemonTypesLoader';

export class IGetPokemonsTypes {
  constructor(private source: PokemonTypesLoader) {}

  execute(): Observable<PokemonType[]> {
    return this.source.all();
  }
}
