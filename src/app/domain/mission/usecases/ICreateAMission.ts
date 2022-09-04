import { Observable } from 'rxjs';
import { Mission } from '../entity/mission';
import { MissionSnapshot } from '../entity/mission-snapshot';
import { MissionLoader } from '../loaders/mission.loader';

export class ICreateAMission {
  constructor(private missionSource: MissionLoader) {}

  public execute(
    _name: string,
    _description: string,
    _rewards: any[]
  ): Observable<MissionSnapshot> {
    const mission = new Mission(_name, _description, _rewards).snapshot();
    return this.missionSource.post(mission);
  }
}
