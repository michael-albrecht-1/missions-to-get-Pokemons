import { Observable } from 'rxjs';
import { Usecase } from 'src/app/base/usecase.interface';
import { Pokemon } from '../entity/pokemon';
import { PokemonLoader } from '../loaders/PokemonLoader';
import { PokemonSearchParams } from '../loaders/PokemonSearchParams';

export class ISearchAllPokemons implements Usecase<Observable<Pokemon[]>> {
  constructor(private pokemonSource: PokemonLoader) {}

  execute(pokemonSearchParams?: PokemonSearchParams): Observable<Pokemon[]> {
    return this.pokemonSource.all(pokemonSearchParams);
  }
}
