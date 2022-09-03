import { Observable } from 'rxjs';
import { MissionSnapshot } from '../entity/mission-snapshot';

export interface MissionLoader {
  post(mission: MissionSnapshot): Observable<MissionSnapshot>;
}
