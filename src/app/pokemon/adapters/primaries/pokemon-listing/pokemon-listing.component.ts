import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  combineLatest,
  map,
  startWith,
  Subject,
  takeUntil,
  fromEvent,
  switchMap,
} from 'rxjs';
import { CaughtPokemon } from 'src/app/caughtPokemon/domain/entity/caughtPokemon';
import { IGetCaughtPokemons } from 'src/app/caughtPokemon/usecases/IGetCaughtPokemons';
import { SearchResponse } from 'src/app/shared/mongoSearchResponse.interface';
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

  @ViewChild('pokemonList', { static: true })
  pokemonList!: ElementRef;

  public filteredPokemons: Pokemon[] = [];
  public caughtPokemons: CaughtPokemon[] = [];
  public form: FormGroup = this.#initForm();
  #isInfinityScrollActive: boolean = false;
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

    const pokemonsCaught$ = this.#getPokemonCaught$();

    combineLatest([formChanges$, pokemonsCaught$])
      .pipe(
        switchMap(this.#searchPokemons$),
        map(() => this.form.value),
        map(this.#setFiltredPokemons),
        map(this.#setFiltredTypeCaughtPokemonsCount),
        takeUntil(this.#destroy$)
      )
      .subscribe();

    fromEvent(this.pokemonList.nativeElement, 'scroll')
      .pipe(map(this.#infiniteScroll), takeUntil(this.#destroy$))
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

  #searchPokemons$ = () => {
    if (!this.#isInfinityScrollActive) {
      this.pokemons = [];
      this.iSearchAllPokemons.page = 0;
    }

    return this.iSearchAllPokemons.execute(this.form.value).pipe(
      map((res: SearchResponse<Pokemon[]>) => {
        return (this.pokemons = this.#isInfinityScrollActive
          ? [...this.pokemons, ...res.data]
          : res.data);
      })
    );
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

  #infiniteScroll = (event: any) => {
    const target = event.target;
    const viewportHeight = target.offsetHeight + target.scrollTop;
    const scrollEnd = viewportHeight >= target.scrollHeight;

    if (target.scrollTop > 0 && scrollEnd) {
      this.#isInfinityScrollActive = true;

      this.form.updateValueAndValidity();
      return console.warn('on est au bottom');
    }
  };
}
