import { Component, Inject, OnInit } from '@angular/core';
import {
  catchError,
  EMPTY,
  first,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { MissionSnapshot } from '../../../entity/mission.snapshot';
import { MissionStatus } from '../../../shared/MissionStatus';
import { ICompleteAMission } from '../../../usecases/ICompleteAMission';
import { ISearchMissions } from '../../../usecases/ISearchMissions';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss'],
})
export class MissionsComponent implements OnInit {
  public missions!: MissionSnapshot[];
  public missionStatuscreated = MissionStatus.created;

  constructor(
    @Inject('ISearchMissions') private iSearchMissions: ISearchMissions,
    @Inject('ICompleteAMission') private iCompleteAMission: ICompleteAMission
  ) {}

  ngOnInit(): void {
    this.iSearchMissions
      .execute()
      .pipe(
        first(),
        map(
          (missions: MissionSnapshot[]): MissionSnapshot[] =>
            (this.missions = missions)
        )
      )
      .subscribe();
  }

  onCompleteMissionBtnClick(mission: MissionSnapshot) {
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

  #updateMissions = (mission: MissionSnapshot): MissionSnapshot[] => {
    console.warn(mission);

    return (this.missions = this.missions.map((m) =>
      m.uuid === mission.uuid ? mission : m
    ));
  };
}
