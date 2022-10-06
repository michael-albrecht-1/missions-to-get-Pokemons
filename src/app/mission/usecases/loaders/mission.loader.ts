import { Observable } from 'rxjs';
import { MissionSnapshot } from '../../domain/entity/mission.snapshot';

export interface MissionLoader {
  post(mission: MissionSnapshot): Observable<MissionSnapshot>;
  search(): Observable<MissionSnapshot[]>;
  complete(mission: MissionSnapshot): Observable<MissionSnapshot>;
}
