import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { PokemonSnapshotType } from '../../../entity/pokemon-snapshot';
import { PokemonLoader } from '../../../loaders/PokemonLoader';

export class InMemoryPokemonLoader implements PokemonLoader {
  #pokemons$: Subject<PokemonSnapshotType[]> = new BehaviorSubject(
    this.pokemons
  );

  constructor(private pokemons: PokemonSnapshotType[]) {}

  all(): Observable<PokemonSnapshotType[]> {
    return this.#pokemons$;
  }

  get(number: string): Observable<PokemonSnapshotType> {
    return this.#pokemons$.pipe(
      map(
        (pokemons: PokemonSnapshotType[]): PokemonSnapshotType =>
          pokemons.filter(
            (pokemon: PokemonSnapshotType) => pokemon.number === number
          )[0]
      )
    );
  }
}
