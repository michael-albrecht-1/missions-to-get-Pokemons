import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonSnapshotType } from '../../../entity/pokemon-snapshot';
import { PokemonSearchParams } from '../../../loaders/PokemonSearchParams';

@Component({
  selector: 'pokemon-listing',
  templateUrl: './pokemon-listing.component.html',
  styleUrls: ['./pokemon-listing.component.scss'],
})
export class PokemonListingComponent {
  @Input() pokemons: PokemonSnapshotType[] = [];
  @Input() isParent: boolean = false;
  @Output() addPokemon: EventEmitter<PokemonSnapshotType> = new EventEmitter();

  filteredPokemons: PokemonSnapshotType[] = [];

  onSelectPokemonType = (pokemonType: string) => {
    const pokemonSearchParams: PokemonSearchParams = { types: [pokemonType] };

    this.filteredPokemons = this.#filterPokemons(
      this.pokemons,
      pokemonSearchParams
    );
  };

  onAddPokemon(event: any) {
    this.addPokemon.emit(event);
  }

  #filterPokemons = (
    pokemons: PokemonSnapshotType[],
    pokemonSearchParams?: PokemonSearchParams
  ): PokemonSnapshotType[] => {
    if (!pokemonSearchParams?.types?.length) {
      return pokemons;
    }
    const pokemonFilteredType = pokemonSearchParams.types[0];
    return pokemons.filter(
      (pokemon: PokemonSnapshotType) =>
        !pokemon.types.every((t) => t !== pokemonFilteredType)
    );
  };
}
