import { Observable } from 'rxjs';
import { PokemonSnapshotType } from '../entity/pokemon-snapshot';
import { PokemonSearchParams } from './PokemonSearchParams';

export interface PokemonLoader {
  all(
    pokemonSearchParams?: PokemonSearchParams
  ): Observable<PokemonSnapshotType[]>;

  get(number: string): Observable<PokemonSnapshotType>;
}
