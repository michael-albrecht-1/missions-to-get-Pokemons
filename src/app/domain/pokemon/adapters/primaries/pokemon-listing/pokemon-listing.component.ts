import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { first, map } from 'rxjs';
import { CaughtPokemon } from 'src/app/domain/caughtPokemon/entity/caughtPokemon';
import { IGetCaughtPokemons } from 'src/app/domain/caughtPokemon/usecases/IGetCaughtPokemons';
import { Pokemon } from '../../../entity/pokemon';
import { PokemonSearchParams } from '../../../loaders/PokemonSearchParams';
import { ISearchAllPokemons } from '../../../usecases/ISearchAllPokemons';

@Component({
  selector: 'pokemon-listing',
  templateUrl: './pokemon-listing.component.html',
  styleUrls: ['./pokemon-listing.component.scss'],
})
export class PokemonListingComponent {
  @Input() title: string = 'Pokedex';
  @Input() isParent: boolean = false;
  @Output() addPokemon: EventEmitter<Pokemon> = new EventEmitter();

  #pokemons: Pokemon[] = [];
  public filteredPokemons: Pokemon[] = [];
  public caughtPokemons: CaughtPokemon[] = [];

  constructor(
    @Inject('ISearchAllPokemons')
    private iSearchAllPokemons: ISearchAllPokemons,
    @Inject('IGetCaughtPokemons') private iGetCaughtPokemons: IGetCaughtPokemons
  ) {}

  ngOnInit(): void {
    this.iGetCaughtPokemons
      .execute()
      .pipe(
        first(),
        map((caughtPokemons: CaughtPokemon[]) => {
          this.caughtPokemons = caughtPokemons;
          return caughtPokemons;
        })
      )
      .subscribe();

    this.iSearchAllPokemons
      .execute()
      .pipe(
        first(),
        map((pokemons: Pokemon[]) => (this.#pokemons = pokemons))
      )
      .subscribe();
  }

  onSelectPokemonType = (pokemonType: string) => {
    const pokemonSearchParams: PokemonSearchParams = { types: [pokemonType] };

    this.filteredPokemons = this.#filterPokemons(
      this.#pokemons,
      pokemonSearchParams
    );
  };

  onAddPokemon(event: any) {
    this.addPokemon.emit(event);
  }

  #filterPokemons = (
    pokemons: Pokemon[],
    pokemonSearchParams?: PokemonSearchParams
  ): Pokemon[] => {
    if (!pokemonSearchParams?.types?.length) {
      return pokemons;
    }
    const pokemonFilteredType = pokemonSearchParams.types[0];
    return pokemons.filter(
      (pokemon: Pokemon) =>
        !pokemon.types.every((t) => t !== pokemonFilteredType)
    );
  };
}
