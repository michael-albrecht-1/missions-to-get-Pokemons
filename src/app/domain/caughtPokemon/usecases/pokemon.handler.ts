import { Observable } from 'rxjs';
import { PokemonSnapshotType } from '../entity/pokemon-snapshot';
import { PokemonLoader } from '../loaders/PokemonLoader';
import { PokemonSearchParams } from '../loaders/PokemonSearchParams';

export class PokemonHandler {
  constructor(private pokemonSource: PokemonLoader) {}

  get(number: string): Observable<PokemonSnapshotType> {
    return this.pokemonSource.get(number);
  }

  all(
    pokemonSearchParams?: PokemonSearchParams
  ): Observable<PokemonSnapshotType[]> {
    return this.pokemonSource.all(pokemonSearchParams);
  }
}
