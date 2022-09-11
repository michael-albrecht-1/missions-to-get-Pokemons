import { Observable, of } from 'rxjs';
import { Usecase } from 'src/app/base/usecase.interface';
import { MissionSnapshot } from '../entity/mission.snapshot';

export class ICompleteAMission implements Usecase<Observable<MissionSnapshot>> {
  execute(): Observable<MissionSnapshot> {
    return of();
  }
}
