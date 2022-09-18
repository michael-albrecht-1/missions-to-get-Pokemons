import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first, map, switchMap, tap } from 'rxjs';
import { CaughtPokemon } from 'src/app/domain/caughtPokemon/entity/caughtPokemon';
import { IGetCaughtPokemons } from 'src/app/domain/caughtPokemon/usecases/IGetCaughtPokemons';
import { Pokemon } from '../../../entity/pokemon';
import { ISearchAllPokemons } from '../../../usecases/ISearchAllPokemons';

@Component({
  selector: 'pokemon-listing',
  templateUrl: './pokemon-listing.component.html',
  styleUrls: ['./pokemon-listing.component.scss'],
})
export class PokemonListingComponent {
  @Input() title: string = 'Pokedex';
  @Input() isAddToMissionActive: boolean = false;
  @Output() addPokemon: EventEmitter<Pokemon> = new EventEmitter();

  public filteredPokemons: Pokemon[] = [];
  public caughtPokemons: CaughtPokemon[] = [];
  public form: FormGroup = this.#initForm();

  #pokemons: Pokemon[] = [];

  constructor(
    @Inject('ISearchAllPokemons')
    private iSearchAllPokemons: ISearchAllPokemons,
    @Inject('IGetCaughtPokemons')
    private iGetCaughtPokemons: IGetCaughtPokemons,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        map((formValue) => {
          const filtredPokemonsByTypes = this.#filterPokemonsByType(
            this.#pokemons,
            formValue.pokemonType
          );

          const filtredPokemonsByTypesAndCaught = this.#filterPokemonsByCaught(
            filtredPokemonsByTypes,
            formValue.filterCaughtPokemons
          );

          this.filteredPokemons = filtredPokemonsByTypesAndCaught;
        })
      )
      .subscribe();

    this.#getPokemonCaught$()
      .pipe(
        switchMap(this.#getAllPokemons$),
        tap(() => this.form.controls['filterCaughtPokemons'].setValue(true))
      )

      .subscribe();
  }

  onAddPokemon(event: any) {
    this.addPokemon.emit(event);
  }

  #getPokemonCaught$ = () => {
    return this.iGetCaughtPokemons.execute().pipe(
      first(),
      map(
        (caughtPokemons: CaughtPokemon[]) =>
          (this.caughtPokemons = caughtPokemons)
      )
    );
  };

  #getAllPokemons$ = () => {
    return this.iSearchAllPokemons.execute().pipe(
      first(),
      map((pokemons: Pokemon[]) => (this.#pokemons = pokemons))
    );
  };

  #initForm() {
    return this.fb.group({
      pokemonType: [],
      filterCaughtPokemons: [true, { nonNullable: true }],
    });
  }

  #filterPokemonsByCaught(
    pokemons: Pokemon[],
    filterCaughtPokemon: boolean
  ): Pokemon[] {
    if (!filterCaughtPokemon) {
      return pokemons;
    }

    return pokemons.filter((pokemon: Pokemon): boolean =>
      this.#filterCaughtPokemons(pokemon)
    );
  }

  #filterCaughtPokemons = (pokemon: Pokemon): boolean => {
    const caughtPokemon = this.caughtPokemons.find(
      (caughtPokemon: CaughtPokemon) => caughtPokemon.number === pokemon.number
    );

    return caughtPokemon ? true : false;
  };

  #filterPokemonsByType = (
    pokemons: Pokemon[],
    pokemonType: string
  ): Pokemon[] => {
    if (!pokemonType) {
      return pokemons;
    }
    return pokemons.filter((pokemon: Pokemon): boolean =>
      this.#filterPokemonByType(pokemon, pokemonType)
    );
  };

  #filterPokemonByType = (pokemon: Pokemon, pokemonType: string): boolean =>
    !pokemon.types.every((t) => t !== pokemonType);
}
