import {
  BehaviorSubject,
  EMPTY,
  map,
  Observable,
  of,
  Subject,
  switchMap,
} from 'rxjs';
import { Mission } from 'src/app/mission/domain/entity/mission';
import { MissionBuilder } from 'src/app/mission/domain/mission.builder';
import { MissionSnapshot } from '../../../domain/entity/mission.snapshot';
import { MissionLoader } from '../../../usecases/loaders/mission.loader';
import { MissionNotFoundError } from './missionNotFound.error';

export class InMemoryMissionLoader implements MissionLoader {
  #missions$: Subject<Mission[]> = new BehaviorSubject(this.missions);

  constructor(private missions: Mission[]) {
    this.#missions$.next(missions);
  }

  post(mission: Mission): Observable<Mission> {
    this.#missions$.pipe(
      map((missions: Mission[]) => this.#missions$.next([mission, ...missions]))
    );
    return of(mission);
  }

  search(): Observable<Mission[]> {
    return this.#missions$;
  }

  complete(mission: Mission): Observable<Mission> {
    return this.#missions$.pipe(
      switchMap((missions: Mission[]): Observable<Mission> => {
        const foundMission = missions?.find(
          (missionMemory) =>
            missionMemory.snapshot().uuid === mission.snapshot().uuid
        );
        if (!foundMission) {
          throw new MissionNotFoundError(mission.snapshot().uuid);
        }
        return of(foundMission);
      })
    );
  }
}
