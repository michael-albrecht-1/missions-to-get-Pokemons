import { Component, Inject, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import { PokemonType } from '../../../entity/pokemon-type';
import { IGetPokemonsTypes } from '../../../usecases/IGetPokemonsTypes';

@Component({
  selector: 'app-pokemon-types-dropdown',
  templateUrl: './pokemon-types-dropdown.component.html',
  styleUrls: ['./pokemon-types-dropdown.component.scss'],
})
export class PokemonTypesDropdownComponent implements OnInit {
  pokemonTypes: PokemonType[] = [];

  constructor(
    @Inject('IGetPokemonTypes') private iGetPokemonTypes: IGetPokemonsTypes
  ) {}

  ngOnInit(): void {
    this.iGetPokemonTypes
      .execute()
      .pipe(
        map((types: PokemonType[]) => (this.pokemonTypes = types)),
        tap((t) => console.warn(this.pokemonTypes[5].name))
      )
      .subscribe();
  }
}
