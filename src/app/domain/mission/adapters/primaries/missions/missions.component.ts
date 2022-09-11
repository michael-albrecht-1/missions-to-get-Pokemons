import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MissionSnapshot } from '../../../entity/mission.snapshot';
import { ISearchMissions } from '../../../usecases/ISearchMissions';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss'],
})
export class MissionsComponent implements OnInit {
  constructor(
    @Inject('ISearchMissions') private iSearchMissions: ISearchMissions
  ) {}

  missions$: Observable<MissionSnapshot[]> = this.iSearchMissions.execute();
  ngOnInit(): void {}

  onCompleteMissionBtnClick() {
    console.warn('onCompleteMissionBtnClick');
  }
}
