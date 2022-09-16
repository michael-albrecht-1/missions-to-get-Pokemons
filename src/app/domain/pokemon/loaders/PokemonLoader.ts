import { Observable } from 'rxjs';
import { Pokemon } from '../entity/pokemon';
import { PokemonSearchParams } from './PokemonSearchParams';

export interface PokemonLoader {
  all(pokemonSearchParams?: PokemonSearchParams): Observable<Pokemon[]>;

  get(number: string): Observable<Pokemon>;
}
