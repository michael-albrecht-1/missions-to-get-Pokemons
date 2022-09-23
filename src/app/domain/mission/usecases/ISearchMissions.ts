import { Observable, of } from 'rxjs';
import { Usecase } from 'src/app/core/configuration/usecase.interface';
import { MissionSnapshot } from '../entity/mission.snapshot';
import { MissionLoader } from '../loaders/mission.loader';

export class ISearchMissions implements Usecase<Observable<MissionSnapshot[]>> {
  constructor(private missionSource: MissionLoader) {}

  execute(): Observable<MissionSnapshot[]> {
    return this.missionSource.search();
  }
}
