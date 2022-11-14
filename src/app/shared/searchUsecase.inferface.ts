import { Observable } from 'rxjs';
import { SearchResponse } from './mongoSearchResponse.interface';
export abstract class SearchUsecase<T> {
  public page!: number;
  public params!: Object;

  abstract execute(params: Object): Observable<SearchResponse<T[]>>;

  protected formatResponse = (
    searchResponse: SearchResponse<T[]>
  ): SearchResponse<T[]> => {
    this.page = searchResponse.currentPage + 1;

    return searchResponse;
  };
}
