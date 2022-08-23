import { Observable } from 'rxjs';
import { Pokemon } from '../entity/pokemon';
import { PokemonLoader } from '../loaders/PokemonLoader';

export class PokemonHandler {
  constructor(private pokemonSource: PokemonLoader) {}

  get(number: string): Observable<Pokemon> {
    return this.pokemonSource.get(number);
  }

  all(): Observable<Pokemon[]> {
    return this.pokemonSource.all();
  }
}
