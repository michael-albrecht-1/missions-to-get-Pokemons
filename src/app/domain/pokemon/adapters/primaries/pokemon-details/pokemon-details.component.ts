import { Component, Inject, OnInit } from '@angular/core';
import { PokemonHandler } from '../../../usecases/pokemon.handler';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PokemonSnapshotType } from '../../../entity/pokemon-snapshot';

@Component({
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  pokemon$: Observable<PokemonSnapshotType> | undefined;

  constructor(
    @Inject('PokemonHandler') private pokemonHandler: PokemonHandler,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.pokemon$ = this.pokemonHandler.get(
      this.route.snapshot.paramMap.get('number') || ''
    );
  }
}
