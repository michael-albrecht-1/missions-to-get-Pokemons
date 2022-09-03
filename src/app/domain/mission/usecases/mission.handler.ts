import { Observable } from 'rxjs';
import { MissionSnapshot } from '../entity/mission-snapshot';
import { MissionLoader } from '../loaders/mission.loader';

export class MissionHandler {
  constructor(private missionSource: MissionLoader) {}

  post(mission: MissionSnapshot): Observable<MissionSnapshot> {
    return this.missionSource.post(mission);
  }
}
