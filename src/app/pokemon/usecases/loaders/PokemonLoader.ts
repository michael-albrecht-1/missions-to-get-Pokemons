import { Observable } from 'rxjs';
import { SearchResponse } from 'src/app/shared/mongoSearchResponse.interface';
import { Pokemon } from '../../domain/entity/pokemon';

export interface PokemonLoader {
  search(params?: any): Observable<SearchResponse<Pokemon[]>>;

  get(number: string): Observable<Pokemon>;
}
