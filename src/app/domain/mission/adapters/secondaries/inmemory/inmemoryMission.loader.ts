import { BehaviorSubject, map, Observable, of, Subject } from 'rxjs';
import { MissionSnapshot } from '../../../entity/mission-snapshot';
import { MissionLoader } from '../../../loaders/mission.loader';

export class InMemoryMissionLoader implements MissionLoader {
  #missions$: Subject<MissionSnapshot[]> = new BehaviorSubject(this.missions);

  constructor(private missions: MissionSnapshot[]) {}

  post(mission: MissionSnapshot): Observable<MissionSnapshot> {
    this.#missions$.pipe(
      map((missions: MissionSnapshot[]) =>
        this.#missions$.next([mission, ...missions])
      )
    );
    return of(mission);
  }
}
