import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { RESTClient } from './RESTClient';

export class ObservableRESTClient implements RESTClient {
  get<R>(endpoint: string): Observable<R> {
    return ajax.getJSON<R>(endpoint);
  }
}
