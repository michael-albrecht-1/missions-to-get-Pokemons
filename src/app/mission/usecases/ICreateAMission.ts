import { Observable } from 'rxjs';
import { Usecase } from 'src/app/shared/usecase.interface';
import { Mission } from '../domain/entity/mission';
import { MissionLoader } from './loaders/mission.loader';
import { MissionReward } from '../shared/MissionReward';

export class ICreateAMission implements Usecase<Observable<Mission>> {
  constructor(private missionSource: MissionLoader) {}

  public execute(
    _name: string,
    _description: string,
    _rewards: MissionReward[]
  ): Observable<Mission> {
    const mission = new Mission({
      name: _name,
      description: _description,
      rewards: _rewards,
      status: 'created',
    });
    return this.missionSource.post(mission);
  }
}
