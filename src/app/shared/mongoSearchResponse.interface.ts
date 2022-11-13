export interface SearchResponse<T> {
  currentPage: number;
  nbResults: number;
  lastPage: number;
  data: T;
}
