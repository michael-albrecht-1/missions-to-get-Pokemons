import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../../../entity/pokemon';
import { PokemonHandler } from '../../../usecases/pokemon.handler';

@Component({
  templateUrl: './pokemon-listing.component.html',
  styleUrls: ['./pokemon-listing.component.scss'],
})
export class PokemonListingComponent implements OnInit {
  pokemonList$: Observable<Pokemon[]> | undefined;

  constructor(
    @Inject('PokemonHandler') private pokemonHandler: PokemonHandler
  ) {}

  ngOnInit(): void {
    this.pokemonList$ = this.pokemonHandler.all();
  }
}
