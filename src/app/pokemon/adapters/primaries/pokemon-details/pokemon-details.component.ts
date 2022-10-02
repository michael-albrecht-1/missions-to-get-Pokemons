import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Pokemon } from '../../../entity/pokemon';
import { ISearchAPokemonByNumber } from '../../../usecases/ISearchAPokemonByNumber';

@Component({
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  pokemon$: Observable<Pokemon> | undefined;

  constructor(
    @Inject('ISearchAPokemonByNumber')
    private iSearchAPokemonByNumber: ISearchAPokemonByNumber,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pokemon$ = this.iSearchAPokemonByNumber.execute(
      this.route.snapshot.paramMap.get('number') || ''
    );
  }

  public getImgSrc(pokemonNumber: string): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonNumber}.svg`;
  }
}
