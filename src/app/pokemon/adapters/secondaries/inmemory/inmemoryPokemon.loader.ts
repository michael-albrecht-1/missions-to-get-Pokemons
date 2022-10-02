import { BehaviorSubject, map, Observable, Subject, tap } from 'rxjs';
import { Pokemon } from '../../../entity/pokemon';
import { PokemonLoader } from '../../../loaders/PokemonLoader';

export class InMemoryPokemonLoader implements PokemonLoader {
  #pokemons$: Subject<Pokemon[]> = new BehaviorSubject(this.pokemons);

  constructor(private pokemons: Pokemon[]) {}

  all(): Observable<Pokemon[]> {
    return this.#pokemons$;
  }

  get(number: string): Observable<Pokemon> {
    return this.#pokemons$.pipe(
      map(
        (pokemons: Pokemon[]): Pokemon =>
          pokemons.filter((pokemon: Pokemon) => pokemon.number === number)[0]
      )
    );
  }
}
