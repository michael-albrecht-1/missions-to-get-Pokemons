import { Component, Input } from '@angular/core';
import { PokemonSnapshotType } from 'src/app/domain/pokemon/entity/pokemon-snapshot';

@Component({
  selector: 'pokemon-listing-item',
  templateUrl: './pokemon-listing-item.component.html',
  styleUrls: ['./pokemon-listing-item.component.scss'],
})
export class PokemonListingItemComponent {
  @Input() pokemon!: PokemonSnapshotType;
}
