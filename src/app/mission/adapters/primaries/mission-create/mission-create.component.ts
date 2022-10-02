import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, EMPTY, map } from 'rxjs';
import { Pokemon } from 'src/app/pokemon/domain/entity/pokemon';
import { MissionReward } from '../../../shared/MissionReward';
import { ICreateAMission } from '../../../usecases/ICreateAMission';

enum AlertClass {
  danger = 'alert-danger',
  success = 'alert-success',
  info = 'alert-info',
  warn = 'alert-warning',
}

@Component({
  selector: 'app-mission-create',
  templateUrl: './mission-create.component.html',
  styleUrls: ['./mission-create.component.scss'],
})
export class MissionCreateComponent implements OnInit {
  form!: FormGroup;
  alertClass: AlertClass = AlertClass.warn;
  alertMessage: string =
    'Créée une mission et choisis un pokemon en récompense !';
  selectedPokemons: Pokemon[] = [];

  constructor(
    @Inject('ICreateAMission') private iCreateAMission: ICreateAMission,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
    });
  }

  onAddPokemon(selectedPokemon: Pokemon) {
    if (this.#pokemonAlreadySelected(selectedPokemon)) {
      return;
    }

    this.selectedPokemons = [selectedPokemon, ...this.selectedPokemons];
  }

  onRemovePokemon(selectedPokemon: Pokemon) {
    const pokemonIndex = this.selectedPokemons.findIndex(
      (pokemon: Pokemon) =>
        pokemon.snapshot().number === selectedPokemon.snapshot().number
    );

    if (pokemonIndex === null) {
      throw new Error('Selected Pokemon not found !');
    }

    this.selectedPokemons.splice(pokemonIndex, 1);
  }

  onSubmit = () => {
    const { name, description } = this.form.value;

    const rewards: MissionReward[] = this.selectedPokemons?.map(
      (pokemon: Pokemon) => ({
        name: pokemon.snapshot().name,
        number: pokemon.snapshot().number,
      })
    );

    this.iCreateAMission
      .execute(name, description, rewards)
      .pipe(
        map(() => {
          this.form.reset();
          this.selectedPokemons = [];
          this.alertClass = AlertClass.success;
          this.alertMessage = 'Mission enregistrée !';
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

  #pokemonAlreadySelected(selectedPokemon: Pokemon): boolean {
    const foundPokemon = this.selectedPokemons.find(
      (pokemon) =>
        pokemon.snapshot().number === selectedPokemon.snapshot().number
    );
    return !!foundPokemon ? true : false;
  }
}
