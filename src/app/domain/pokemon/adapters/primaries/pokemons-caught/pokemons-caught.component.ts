import { Component, Inject, Input, OnInit } from '@angular/core';
import { first, map } from 'rxjs';
import { PokemonSnapshotType } from '../../../entity/pokemon-snapshot';
import { PokemonHandler } from '../../../usecases/pokemon.handler';

@Component({
  selector: 'pokemons-caught',
  templateUrl: './pokemons-caught.component.html',
  styleUrls: ['./pokemons-caught.component.scss'],
})
export class PokemonsCaughtComponent implements OnInit {
  @Input() caughtPokemons: any[] = [];
  pokemons!: PokemonSnapshotType[];

  constructor(
    @Inject('PokemonHandler') private pokemonHandler: PokemonHandler
  ) {}

  ngOnInit(): void {
    this.pokemonHandler
      .all()
      .pipe(
        first(),
        map((pokemons: PokemonSnapshotType[]) =>
          pokemons.filter(this.#filterCaugthPokemons)
        ),
        map((pokemons: PokemonSnapshotType[]) => (this.pokemons = pokemons))
      )
      .subscribe();
  }

  #filterCaugthPokemons = (
    pokemonSnapshotType: PokemonSnapshotType
  ): boolean => {
    return false;
  };
}
