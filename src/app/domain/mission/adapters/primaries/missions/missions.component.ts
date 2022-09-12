import { Component, Inject, OnInit } from '@angular/core';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { MissionSnapshot } from '../../../entity/mission.snapshot';
import { ICompleteAMission } from '../../../usecases/ICompleteAMission';
import { ISearchMissions } from '../../../usecases/ISearchMissions';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss'],
})
export class MissionsComponent implements OnInit {
  constructor(
    @Inject('ISearchMissions') private iSearchMissions: ISearchMissions,
    @Inject('ICompleteAMission') private iCompleteAMission: ICompleteAMission
  ) {}

  missions$: Observable<MissionSnapshot[]> = this.iSearchMissions.execute();
  ngOnInit(): void {}

  onCompleteMissionBtnClick(mission: MissionSnapshot) {
    console.warn('onCompleteMissionBtnClick');
    this.iCompleteAMission
      .execute(mission)
      .pipe(
        map((mission: MissionSnapshot) => console.log(mission)),
        catchError((e) => {
          console.error('mission completion failed');
          return EMPTY;
        })
      )
      .subscribe();
  }
}
