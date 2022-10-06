import { map, Observable, of } from 'rxjs';
import { PokemonType } from '../../../../domain/entity/pokemon-type';
import { PokemonTypesLoader } from '../../../../usecases/loaders/PokemonTypesLoader';
import { PokemonTypeMapper } from './pokemonType.mapper';
import { PokemonTypesDataFromPokeApi } from './pokemonTypesDataFromPokeApi';

export class InMemoryPokemonTypeLoader implements PokemonTypesLoader {
  constructor() {}

  all(): Observable<PokemonType[]> {
    return of(PokemonTypesDataFromPokeApi.map(PokemonTypeMapper.toPokemonType));
  }
}
