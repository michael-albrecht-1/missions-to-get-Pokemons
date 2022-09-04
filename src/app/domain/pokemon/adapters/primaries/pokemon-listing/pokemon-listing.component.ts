import { Component, Inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PokemonSnapshotType } from '../../../entity/pokemon-snapshot';
import { PokemonHandler } from '../../../usecases/pokemon.handler';

@Component({
  templateUrl: './pokemon-listing.component.html',
  styleUrls: ['./pokemon-listing.component.scss'],
})
export class PokemonListingComponent implements OnInit {
  pokemonList$: Observable<PokemonSnapshotType[]> | undefined;

  constructor(
    @Inject('PokemonHandler') private pokemonHandler: PokemonHandler
  ) {}

  ngOnInit(): void {
    this.pokemonList$ = this.pokemonHandler.all();
    // this.pokemonList$ = of();
  }
}
