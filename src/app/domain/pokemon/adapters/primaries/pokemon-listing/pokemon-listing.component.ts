import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonSnapshotType } from '../../../entity/pokemon-snapshot';
import { PokemonSearchParams } from '../../../loaders/PokemonSearchParams';
import { PokemonHandler } from '../../../usecases/pokemon.handler';

@Component({
  selector: 'pokemon-listing',
  templateUrl: './pokemon-listing.component.html',
  styleUrls: ['./pokemon-listing.component.scss'],
})
export class PokemonListingComponent {
  @Input() isParent: boolean = false;
  @Output() addPokemon: EventEmitter<PokemonSnapshotType> = new EventEmitter();

  pokemonList$!: Observable<PokemonSnapshotType[]>;

  constructor(
    @Inject('PokemonHandler') private pokemonHandler: PokemonHandler
  ) {}

  onSelectPokemonType = (pokemonType: string) => {
    const pokemonSearchParams: PokemonSearchParams = {
      types: [pokemonType],
    };
    this.pokemonList$ = this.pokemonHandler.all(pokemonSearchParams);
  };

  onAddPokemon(event: any) {
    this.addPokemon.emit(event);
  }
}
