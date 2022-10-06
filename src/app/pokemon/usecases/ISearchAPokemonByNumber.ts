import { Observable } from 'rxjs';
import { Usecase } from 'src/app/shared/usecase.interface';
import { Pokemon } from '../domain/entity/pokemon';
import { PokemonLoader } from './loaders/PokemonLoader';

export class ISearchAPokemonByNumber implements Usecase<Observable<Pokemon>> {
  constructor(private pokemonSource: PokemonLoader) {}

  execute(number: string): Observable<Pokemon> {
    return this.pokemonSource.get(number);
  }
}
