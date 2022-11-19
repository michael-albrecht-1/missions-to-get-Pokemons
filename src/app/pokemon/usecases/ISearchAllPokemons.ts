import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { cleanObject } from 'src/app/shared/clean-object';
import { SearchResponse } from 'src/app/shared/mongoSearchResponse.interface';
import { SearchUsecase } from 'src/app/shared/searchUsecase.inferface';
import { Pokemon } from '../domain/entity/pokemon';
import { PokemonLoader } from './loaders/PokemonLoader';

export class ISearchAllPokemons extends SearchUsecase<Pokemon> {
  constructor(private pokemonSource: PokemonLoader) {
    super();
  }

  execute(formValue?: any): Observable<SearchResponse<Pokemon[]>> {
    const params = {
      page: this.page,
      ...formValue,
    };

    this.params = cleanObject(params);

    return this.pokemonSource
      .search(this.params)
      .pipe(map(this.formatResponse));
  }
}
