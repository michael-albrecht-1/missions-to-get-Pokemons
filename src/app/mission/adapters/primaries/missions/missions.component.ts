import { Component, Inject, OnInit } from '@angular/core';
import { catchError, EMPTY, first, map, tap } from 'rxjs';
import { Mission } from 'src/app/mission/domain/entity/mission';
import { MissionStatus } from '../../../shared/MissionStatus';
import { ICompleteAMission } from '../../../usecases/ICompleteAMission';
import { ISearchMissions } from '../../../usecases/ISearchMissions';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
})
export class MissionsComponent implements OnInit {
  public missions!: Mission[];
  public missionStatuscreated: MissionStatus = 'created';

  constructor(
    @Inject('ISearchMissions') private iSearchMissions: ISearchMissions,
    @Inject('ICompleteAMission') private iCompleteAMission: ICompleteAMission
  ) {}

  ngOnInit(): void {
    this.iSearchMissions
      .execute()
      .pipe(
        first(),
        map((missions: Mission[]): Mission[] => (this.missions = missions))
      )
      .subscribe();
  }

  onCompleteMissionBtnClick(mission: Mission) {
    this.iCompleteAMission
      .execute(mission)
      .pipe(
        first(),
        map(this.#updateMissions),
        tap(console.warn),
        catchError((_e) => {
          console.error('mission completion failed');
          return EMPTY;
        })
      )
      .subscribe();
  }

  #updateMissions = (mission: Mission): Mission[] => {
    return (this.missions = this.missions.map((m) =>
      m.snapshot().uuid === mission.snapshot().uuid ? mission : m
    ));
  };
}
