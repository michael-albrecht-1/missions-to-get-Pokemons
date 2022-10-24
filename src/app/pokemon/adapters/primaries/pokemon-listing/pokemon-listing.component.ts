import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  combineLatest,
  first,
  map,
  startWith,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { CaughtPokemon } from 'src/app/caughtPokemon/domain/entity/caughtPokemon';
import { IGetCaughtPokemons } from 'src/app/caughtPokemon/usecases/IGetCaughtPokemons';
import { Pokemon } from '../../../domain/entity/pokemon';
import { ISearchAllPokemons } from '../../../usecases/ISearchAllPokemons';

@Component({
  selector: 'pokemon-listing',
  templateUrl: './pokemon-listing.component.html',
})
export class PokemonListingComponent {
  @Input() title: string = 'Pokedex';
  @Input() isAddToMissionActive: boolean = false;
  @Output() addPokemon: EventEmitter<Pokemon> = new EventEmitter();

  public filteredPokemons: Pokemon[] = [];
  public caughtPokemons: CaughtPokemon[] = [];
  public form: FormGroup = this.#initForm();

  public pokemons: Pokemon[] = [];
  public fiteredTypeCaughtPokemonsCount!: number;

  #destroy$ = new Subject<void>();

  constructor(
    @Inject('ISearchAllPokemons')
    private iSearchAllPokemons: ISearchAllPokemons,
    @Inject('IGetCaughtPokemons')
    private iGetCaughtPokemons: IGetCaughtPokemons,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const formChanges$ = this.form.valueChanges.pipe(
      startWith(this.form.value)
    );
    const allPokemons$ = this.#getAllPokemons$();
    const pokemonsCaught$ = this.#getPokemonCaught$();

    combineLatest([formChanges$, allPokemons$, pokemonsCaught$])
      .pipe(
        map(() => this.form.value),
        map(this.#setFiltredPokemons),
        map(this.#setFiltredTypeCaughtPokemonsCount),
        takeUntil(this.#destroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

  onAddPokemon(event: any) {
    this.addPokemon.emit(event);
  }

  #getPokemonCaught$ = () => {
    return this.iGetCaughtPokemons
      .execute()
      .pipe(
        map(
          (caughtPokemons: CaughtPokemon[]) =>
            (this.caughtPokemons = caughtPokemons)
        )
      );
  };

  #getAllPokemons$ = () => {
    return this.iSearchAllPokemons
      .execute()
      .pipe(map((pokemons: Pokemon[]) => (this.pokemons = pokemons)));
  };

  #initForm(): FormGroup<any> {
    return this.fb.group({
      pokemonType: [],
      filterCaughtPokemons: [true, { nonNullable: true }],
    });
  }

  #setFiltredPokemons = (formValue: any): Pokemon[] => {
    const filtredPokemonsByTypes = this.#filterPokemonsByType(
      this.pokemons,
      formValue.pokemonType
    );

    const filtredPokemonsByTypesAndCaught = this.#filterPokemonsByCaught(
      filtredPokemonsByTypes,
      formValue.filterCaughtPokemons
    );

    return (this.filteredPokemons = filtredPokemonsByTypesAndCaught);
  };

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
      (caughtPokemon: CaughtPokemon) =>
        caughtPokemon.snapshot().number === pokemon.snapshot().number
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
      pokemon.hasType(pokemonType)
    );
  };

  #setFiltredTypeCaughtPokemonsCount = (
    filteredPokemons: Pokemon[]
  ): number => {
    return (this.fiteredTypeCaughtPokemonsCount = filteredPokemons.filter(
      (pokemon: Pokemon) => {
        const caughtPokemon = this.caughtPokemons.find(
          (caughtPokemon: CaughtPokemon) =>
            caughtPokemon.snapshot().number === pokemon.snapshot().number
        );
        return caughtPokemon ? true : false;
      }
    ).length);
  };
}
