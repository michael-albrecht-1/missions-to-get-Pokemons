import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, EMPTY, map, tap } from 'rxjs';
import { ICreateAMission } from '../../../usecases/ICreateAMission';

enum AlertClass {
  danger = 'alert-danger',
  success = 'alert-success',
}

@Component({
  selector: 'app-mission-create',
  templateUrl: './mission-create.component.html',
  styleUrls: ['./mission-create.component.scss'],
})
export class MissionCreateComponent implements OnInit {
  form!: FormGroup;
  alertClass: AlertClass | undefined;
  alertMessage: string | undefined;

  constructor(
    @Inject('ICreateAMission') private iCreateAMission: ICreateAMission,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      reward: ['', [Validators.required]],
    });
    this.form.valueChanges.subscribe((v) => console.warn(v));
  }

  onSubmit = () => {
    const { name, description, reward } = this.form.value;

    this.iCreateAMission
      .execute(name, description, reward)
      .pipe(
        map(() => {
          this.form.reset();
          this.alertClass = AlertClass.success;
          this.alertMessage = 'Mission enregistréé !';
        }),
        catchError((e) => {
          this.alertClass = AlertClass.danger;
          this.alertMessage =
            "L'enregistrement de cette mission est un échec !";
          return EMPTY;
        })
      )
      .subscribe();
  };

  onSelectPokemon = (event: any) => {
    console.warn('yess on est dans mission : ' + event);
  };
}
