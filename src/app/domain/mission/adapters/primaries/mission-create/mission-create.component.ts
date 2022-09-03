import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { ICreateAMission } from '../../../usecases/ICreateAMission';

@Component({
  selector: 'app-mission-create',
  templateUrl: './mission-create.component.html',
  styleUrls: ['./mission-create.component.scss'],
})
export class MissionCreateComponent implements OnInit {
  form!: FormGroup;
  constructor(
    @Inject('ICreateAMission') private iCreateAMission: ICreateAMission,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      rewards: [],
    });
  }

  onSubmit = () => {
    const { name, description } = this.form.value;

    this.iCreateAMission.execute(name, description, []).subscribe();
  };
}
