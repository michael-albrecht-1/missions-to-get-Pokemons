import { Observable } from 'rxjs';
import { PokemonSnapshotType } from '../entity/pokemon-snapshot';
import { PokemonLoader } from '../loaders/PokemonLoader';

export class PokemonHandler {
  constructor(private pokemonSource: PokemonLoader) {}

  get(number: string): Observable<PokemonSnapshotType> {
    return this.pokemonSource.get(number);
  }

  all(): Observable<PokemonSnapshotType[]> {
    return this.pokemonSource.all();
  }
}
