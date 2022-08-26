import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/domain/pokemon/entity/pokemon';

@Component({
  selector: 'pokemon-listing-item',
  templateUrl: './pokemon-listing-item.component.html',
  styleUrls: ['./pokemon-listing-item.component.scss'],
})
export class PokemonListingItemComponent {
  @Input() pokemon!: Pokemon;
}
