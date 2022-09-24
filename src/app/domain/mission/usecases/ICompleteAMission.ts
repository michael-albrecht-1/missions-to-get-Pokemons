import { Observable, of } from 'rxjs';
import { Usecase } from 'src/app/core/angular/configuration/usecase.interface';
import { MissionSnapshot } from '../entity/mission.snapshot';
import { MissionLoader } from '../loaders/mission.loader';

export class ICompleteAMission implements Usecase<Observable<MissionSnapshot>> {
  constructor(private missionSource: MissionLoader) {}

  execute(mission: MissionSnapshot): Observable<MissionSnapshot> {
    return this.missionSource.complete(mission);
  }
}
