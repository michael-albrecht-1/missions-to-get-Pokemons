import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/domain/pokemon/entity/pokemon';

@Component({
  selector: 'pokemon-listing-item',
  templateUrl: './pokemon-listing-item.component.html',
  styleUrls: ['./pokemon-listing-item.component.scss'],
})
export class PokemonListingItemComponent implements OnInit {
  @Input() pokemon!: Pokemon;

  ngOnInit() {
    console.warn(this.pokemon);
  }
}
