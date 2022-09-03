import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MissionSnapshot } from '../../../entity/mission-snapshot';
import { MissionLoader } from '../../../loaders/mission.loader';

export class MongoMissionLoader implements MissionLoader {
  constructor(http: HttpClient) {}

  post(mission: MissionSnapshot): Observable<MissionSnapshot> {
    return of(mission);
  }
}
