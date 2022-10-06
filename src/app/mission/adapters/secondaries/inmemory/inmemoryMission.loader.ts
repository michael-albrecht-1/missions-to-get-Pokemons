import {
  BehaviorSubject,
  EMPTY,
  map,
  Observable,
  of,
  Subject,
  switchMap,
} from 'rxjs';
import { MissionSnapshot } from '../../../domain/entity/mission.snapshot';
import { MissionLoader } from '../../../domain/loaders/mission.loader';
import { MissionNotFoundError } from './missionNotFound.error';

export class InMemoryMissionLoader implements MissionLoader {
  #missions$: Subject<MissionSnapshot[]> = new BehaviorSubject(this.missions);

  constructor(private missions: MissionSnapshot[]) {
    this.#missions$.next(missions);
  }

  post(mission: MissionSnapshot): Observable<MissionSnapshot> {
    this.#missions$.pipe(
      map((missions: MissionSnapshot[]) =>
        this.#missions$.next([mission, ...missions])
      )
    );
    return of(mission);
  }

  search(): Observable<MissionSnapshot[]> {
    return this.#missions$;
  }

  complete(mission: MissionSnapshot): Observable<MissionSnapshot> {
    return this.#missions$.pipe(
      switchMap((missions: MissionSnapshot[]): Observable<MissionSnapshot> => {
        const foundMission = missions?.find(
          (missionMemory) => missionMemory.uuid === mission.uuid
        );
        if (!foundMission) {
          throw new MissionNotFoundError(mission.uuid);
        }
        return of({
          ...foundMission,
          status: 'done',
        });
      })
    );
  }
}
