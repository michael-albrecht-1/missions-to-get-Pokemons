import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { map, tap } from 'rxjs';
import { PokemonType } from '../../../entity/pokemon-type';
import { IGetPokemonsTypes } from '../../../usecases/IGetPokemonsTypes';

@Component({
  selector: 'app-pokemon-types-dropdown',
  templateUrl: './pokemon-types-dropdown.component.html',
  styleUrls: ['./pokemon-types-dropdown.component.scss'],
})
export class PokemonTypesDropdownComponent implements OnInit {
  selectedType!: PokemonType;
  @Output() onSelectType: EventEmitter<string> = new EventEmitter();

  pokemonTypes: PokemonType[] = [];

  constructor(
    @Inject('IGetPokemonTypes') private iGetPokemonTypes: IGetPokemonsTypes
  ) {}

  ngOnInit(): void {
    this.iGetPokemonTypes
      .execute()
      .pipe(
        map((types: PokemonType[]) => (this.pokemonTypes = types)),
        map(this.#generateRandomSelectedType),
        tap(this.handleSelectType)
      )
      .subscribe();
  }

  #generateRandomSelectedType = (): PokemonType => {
    const randomType = Math.floor(Math.random() * this.pokemonTypes.length);
    return (this.selectedType = this.pokemonTypes[randomType]);
  };

  handleSelectType = (type: PokemonType) => {
    this.selectedType = type;
    return this.onSelectType.emit(type.name);
  };
}
