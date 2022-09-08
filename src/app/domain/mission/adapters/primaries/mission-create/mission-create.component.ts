import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, EMPTY, map, tap } from 'rxjs';
import { PokemonSnapshotType } from 'src/app/domain/pokemon/entity/pokemon-snapshot';
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
  selectedPokemons: PokemonSnapshotType[] = [];

  constructor(
    @Inject('ICreateAMission') private iCreateAMission: ICreateAMission,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
    });
    this.form.valueChanges.subscribe((v) => console.warn(v));
  }

  onAddPokemon(selectedPokemon: PokemonSnapshotType) {
    if (this.#pokemonAlreadySelected(selectedPokemon)) {
      return;
    }

    this.selectedPokemons = [selectedPokemon, ...this.selectedPokemons];
  }

  onRemovePokemon(selectedPokemon: PokemonSnapshotType) {
    const pokemonIndex = this.selectedPokemons.findIndex(
      (pokemon: PokemonSnapshotType) =>
        pokemon.number === selectedPokemon.number
    );

    if (pokemonIndex === null) {
      throw new Error('Selected Pokemon not found !');
    }

    this.selectedPokemons.splice(pokemonIndex, 1);
  }

  onSubmit = () => {
    const { name, description } = this.form.value;

    const rewards: string[] = this.selectedPokemons?.map(
      (pokemon: PokemonSnapshotType) => pokemon.name
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

  #pokemonAlreadySelected(selectedPokemon: PokemonSnapshotType): boolean {
    const foundPokemon = this.selectedPokemons.find(
      (pokemon) => pokemon.number === selectedPokemon.number
    );
    return !!foundPokemon ? true : false;
  }
}
