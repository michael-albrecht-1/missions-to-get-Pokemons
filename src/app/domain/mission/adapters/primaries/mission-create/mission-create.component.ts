import { Component, Inject, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ICreateAMission } from '../../../usecases/ICreateAMission';

@Component({
  selector: 'app-mission-create',
  templateUrl: './mission-create.component.html',
  styleUrls: ['./mission-create.component.scss'],
})
export class MissionCreateComponent implements OnInit {
  constructor(
    @Inject('ICreateAMission') private iCreateAMission: ICreateAMission
  ) {}

  ngOnInit(): void {
    this.iCreateAMission
      .execute(
        "laver le coussin plein de crotte d'eliott la croote",
        'lasrt',
        []
      )
      .pipe(tap((r) => console.warn({ r })))
      .subscribe();
  }
}
