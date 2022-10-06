import { Observable } from 'rxjs';
import { Usecase } from 'src/app/shared/usecase.interface';
import { Mission } from '../domain/entity/mission';
import { MissionLoader } from './loaders/mission.loader';

export class ISearchMissions implements Usecase<Observable<Mission[]>> {
  constructor(private missionSource: MissionLoader) {}

  execute(): Observable<Mission[]> {
    return this.missionSource.search();
  }
}
