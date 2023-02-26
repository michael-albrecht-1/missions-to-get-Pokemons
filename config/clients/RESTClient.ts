import { Observable } from 'rxjs';

export interface RESTClient {
  get<R>(endpoint: string): Observable<R>;
}
