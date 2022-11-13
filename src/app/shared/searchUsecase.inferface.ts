import { Observable } from 'rxjs';
import { SearchResponse } from './mongoSearchResponse.interface';
export abstract class SearchUsecase<T> {
  public page: number = 0;

  public size: number = 20;
  public params!: Object;

  abstract execute(params: Object): Observable<SearchResponse<T[]>>;

  public getAllPages = async (): Promise<T[]> => {
    const { page, size } = this;

    this.size = 100;
    this.page = 0;
    let items: T[] = [];

    do {
      const getPage$ = this.execute(this.params);
      const res = await getPage$.toPromise();

      if (!res) {
        return [];
      }

      items = [...items, ...res.data];
    } while (this.page !== null);

    this.page = page;
    this.size = size;
    return items;
  };

  protected formatResponse = (
    searchResponse: SearchResponse<T[]>
  ): SearchResponse<T[]> => {
    this.page = searchResponse.currentPage + 1;

    return searchResponse;
  };
}
