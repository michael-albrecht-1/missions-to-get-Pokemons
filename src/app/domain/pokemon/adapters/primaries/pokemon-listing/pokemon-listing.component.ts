import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonSnapshotType } from '../../../entity/pokemon-snapshot';
import { PokemonSearchParams } from '../../../loaders/PokemonSearchParams';
import { PokemonHandler } from '../../../usecases/pokemon.handler';

@Component({
  templateUrl: './pokemon-listing.component.html',
  styleUrls: ['./pokemon-listing.component.scss'],
})
export class PokemonListingComponent {
  pokemonList$: Observable<PokemonSnapshotType[]> | undefined;

  constructor(
    @Inject('PokemonHandler') private pokemonHandler: PokemonHandler
  ) {}

  onSelectPokemonType = (pokemonType: string) => {
    const pokemonSearchParams: PokemonSearchParams = {
      types: [pokemonType],
    };
    this.pokemonList$ = this.pokemonHandler.all(pokemonSearchParams);
  };
}
