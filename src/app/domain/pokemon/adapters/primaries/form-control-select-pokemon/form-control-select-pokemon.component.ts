import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';
import { PokemonSnapshotType } from '../../../entity/pokemon-snapshot';
import { PokemonHandler } from '../../../usecases/pokemon.handler';

@Component({
  selector: './form-control-select-pokemon',
  templateUrl: './form-control-select-pokemon.component.html',
  styleUrls: ['./form-control-select-pokemon.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FormControlSelectPokemonComponent,
      multi: true,
    },
  ],
})
export class FormControlSelectPokemonComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  selectedPokemon!: PokemonSnapshotType;
  pokemons!: PokemonSnapshotType[];
  #destroy$: Subject<boolean> = new Subject();

  constructor(
    @Inject('PokemonHandler') private pokemonHandler: PokemonHandler
  ) {}

  ngOnInit(): void {
    this.pokemonHandler
      .all()
      .pipe(
        map((pokemons) => (this.pokemons = pokemons)),
        map(this.#generateRandomSelectedPokemon),
        takeUntil(this.#destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.#destroy$.next(true);
  }

  #generateRandomSelectedPokemon = (pokemons: PokemonSnapshotType[]): void => {
    const randomPokemonIndex = Math.floor(Math.random() * pokemons.length);

    this.selectedPokemon = pokemons[randomPokemonIndex];
    this.onSelectPokemon(this.selectedPokemon);
  };

  #onChange: any = () => {};
  #onTouch: any = () => {};

  //accessors
  onSelectPokemon = (pokemon: PokemonSnapshotType) => {
    console.warn(pokemon);
    this.#onChange(pokemon?.name);
    this.#onTouch(pokemon?.name);
  };

  writeValue() {}

  registerOnChange(fn: any) {
    this.#onChange = fn;
  }

  registerOnTouched(onTouched: Function) {
    this.#onTouch = onTouched;
  }
}
