import { Observable } from 'rxjs';
import { Mission } from '../../domain/entity/mission';

export interface MissionLoader {
  post(mission: Mission): Observable<Mission>;
  search(): Observable<Mission[]>;
  complete(mission: Mission): Observable<Mission>;
}
