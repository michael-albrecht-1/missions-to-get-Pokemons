import { Observable } from 'rxjs';
import { Usecase } from 'src/app/core/angular/configuration/usecase.interface';
import { Pokemon } from '../entity/pokemon';
import { PokemonLoader } from '../loaders/PokemonLoader';

export class ISearchAllPokemons implements Usecase<Observable<Pokemon[]>> {
  constructor(private pokemonSource: PokemonLoader) {}

  execute(): Observable<Pokemon[]> {
    return this.pokemonSource.all();
  }
}
