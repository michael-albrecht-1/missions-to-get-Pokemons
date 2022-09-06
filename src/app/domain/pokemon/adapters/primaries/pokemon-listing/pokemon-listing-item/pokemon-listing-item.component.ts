import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonSnapshotType } from 'src/app/domain/pokemon/entity/pokemon-snapshot';

@Component({
  selector: 'pokemon-listing-item',
  templateUrl: './pokemon-listing-item.component.html',
  styleUrls: ['./pokemon-listing-item.component.scss'],
})
export class PokemonListingItemComponent {
  @Input() pokemon!: PokemonSnapshotType;
  @Input() isParent: boolean = false;
  @Output() addPokemon: EventEmitter<PokemonSnapshotType> = new EventEmitter();

  onAddPokemonBtnClick() {
    this.addPokemon.emit(this.pokemon);
  }
}
