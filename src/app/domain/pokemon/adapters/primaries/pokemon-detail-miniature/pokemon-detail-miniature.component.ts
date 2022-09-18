import { Component, Inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from '../../../entity/pokemon';
import { ISearchAPokemonByNumber } from '../../../usecases/ISearchAPokemonByNumber';

@Component({
  selector: 'pokemon-detail-miniature',
  templateUrl: './pokemon-detail-miniature.component.html',
  styleUrls: ['./pokemon-detail-miniature.component.scss'],
})
export class PokemonDetailMiniatureComponent implements OnInit {
  pokemon$: Observable<Pokemon> | undefined;
  @Input() pokemonNumber!: string;

  constructor(
    @Inject('ISearchAPokemonByNumber')
    private iSearchAPokemonByNumber: ISearchAPokemonByNumber
  ) {}

  ngOnInit(): void {
    this.pokemon$ = this.iSearchAPokemonByNumber.execute(
      this.pokemonNumber || ''
    );
  }
}
