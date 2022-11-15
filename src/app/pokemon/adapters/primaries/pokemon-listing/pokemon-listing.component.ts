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
  Observable,
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

  public caughtPokemons: CaughtPokemon[] = [];
  public form: FormGroup = this.#initForm();
  #isInfinityScrollActive: boolean = false;
  public pokemons: Pokemon[] = [];
  public caughtPokemonsCount!: number;

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
        map(this.#setCaughtPokemonsCount),
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

  #searchPokemons$ = (): Observable<Pokemon[]> => {
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
      type: [],
      caught: [true, { nonNullable: true }],
    });
  }

  #setCaughtPokemonsCount = (pokemons: Pokemon[]): number => {
    return (this.caughtPokemonsCount = pokemons.filter((pokemon: Pokemon) => {
      const caughtPokemon = this.caughtPokemons.find(
        (caughtPokemon: CaughtPokemon) =>
          caughtPokemon.snapshot().number === pokemon.snapshot().number
      );
      return caughtPokemon ? true : false;
    }).length);
  };

  #infiniteScroll = (event: any): void => {
    const target = event.target;
    const viewportHeight = target.offsetHeight + target.scrollTop;
    const scrollEnd = viewportHeight >= target.scrollHeight;

    if (target.scrollTop > 0 && scrollEnd) {
      this.#isInfinityScrollActive = true;

      this.form.updateValueAndValidity();
    }
  };
}
