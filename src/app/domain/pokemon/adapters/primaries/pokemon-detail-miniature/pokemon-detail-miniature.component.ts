import { Component, Inject, Input, OnInit } from '@angular/core';
import { first, map, Observable } from 'rxjs';
import { Pokemon } from '../../../entity/pokemon';
import { ISearchAPokemonByNumber } from '../../../usecases/ISearchAPokemonByNumber';

@Component({
  selector: 'pokemon-detail-miniature',
  templateUrl: './pokemon-detail-miniature.component.html',
  styleUrls: ['./pokemon-detail-miniature.component.scss'],
})
export class PokemonDetailMiniatureComponent implements OnInit {
  pokemon: Pokemon | undefined;
  @Input() pokemonNumber!: string;

  constructor(
    @Inject('ISearchAPokemonByNumber')
    private iSearchAPokemonByNumber: ISearchAPokemonByNumber
  ) {}

  ngOnInit(): void {
    this.iSearchAPokemonByNumber
      .execute(this.pokemonNumber || '')
      .pipe(
        first(),
        map((pokemon: Pokemon) => (this.pokemon = pokemon))
      )
      .subscribe();
  }
}
