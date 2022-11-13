import { BehaviorSubject, map, Observable, Subject, tap } from 'rxjs';
import { SearchResponse } from 'src/app/shared/mongoSearchResponse.interface';
import { Pokemon } from '../../../domain/entity/pokemon';
import { PokemonLoader } from '../../../usecases/loaders/PokemonLoader';

export class InMemoryPokemonLoader implements PokemonLoader {
  #pokemons$: Subject<Pokemon[]> = new BehaviorSubject(this.pokemons);

  constructor(private pokemons: Pokemon[]) {}

  search(): Observable<SearchResponse<Pokemon[]>> {
    return this.#pokemons$.pipe(
      map<Pokemon[], SearchResponse<Pokemon[]>>((pokemons) => ({
        currentPage: 0,
        nbResults: pokemons.length,
        lastPage: 0,
        data: pokemons,
      }))
    );
  }

  get(number: string): Observable<Pokemon> {
    return this.#pokemons$.pipe(
      map(
        (pokemons: Pokemon[]): Pokemon =>
          pokemons.filter(
            (pokemon: Pokemon) => pokemon.snapshot().number === number
          )[0]
      )
    );
  }
}
