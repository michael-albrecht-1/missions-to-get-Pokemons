import { Observable } from 'rxjs';
import { Usecase } from 'src/app/shared/usecase.interface';
import { MissionSnapshot } from '../domain/entity/mission.snapshot';
import { MissionLoader } from './loaders/mission.loader';

export class ICompleteAMission implements Usecase<Observable<MissionSnapshot>> {
  constructor(private missionSource: MissionLoader) {}

  execute(mission: MissionSnapshot): Observable<MissionSnapshot> {
    return this.missionSource.complete(mission);
  }
}
