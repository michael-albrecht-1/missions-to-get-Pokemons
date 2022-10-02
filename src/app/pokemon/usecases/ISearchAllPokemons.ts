import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usecase } from 'src/app/shared/usecase.interface';
import { Pokemon } from '../domain/entity/pokemon';
import { PokemonLoader } from '../domain/loaders/PokemonLoader';

export class ISearchAllPokemons implements Usecase<Observable<Pokemon[]>> {
  constructor(private pokemonSource: PokemonLoader) {}

  execute(): Observable<Pokemon[]> {
    return this.pokemonSource.all();
  }
}
