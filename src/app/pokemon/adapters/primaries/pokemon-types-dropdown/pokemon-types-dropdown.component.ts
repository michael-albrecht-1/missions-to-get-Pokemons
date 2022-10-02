import {
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { first, map } from 'rxjs';
import { PokemonType } from '../../../domain/entity/pokemon-type';
import { IGetPokemonsTypes } from '../../../usecases/IGetPokemonsTypes';

@Component({
  selector: 'app-pokemon-types-dropdown',
  templateUrl: './pokemon-types-dropdown.component.html',
  styleUrls: ['./pokemon-types-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PokemonTypesDropdownComponent),
      multi: true,
    },
  ],
})
export class PokemonTypesDropdownComponent
  implements OnInit, ControlValueAccessor
{
  selectedType: PokemonType | undefined;
  @Output() onSelectType: EventEmitter<string> = new EventEmitter();

  pokemonTypes: PokemonType[] = [];

  constructor(
    @Inject('IGetPokemonTypes') private iGetPokemonTypes: IGetPokemonsTypes
  ) {}

  ngOnInit(): void {
    this.iGetPokemonTypes
      .execute()
      .pipe(
        first(),
        map((types: PokemonType[]) => (this.pokemonTypes = types))
      )
      .subscribe();
  }

  handleSelectType = (type: PokemonType) => {
    this.selectedType = type;
    this.onChange(type.name);
  };

  public changed = (pokemonTypeName: string): void => {};

  public touched!: () => void;

  public writeValue(pokemonTypeName: string): void {
    this.selectedType =
      this.pokemonTypes.find((p) => p.name === pokemonTypeName) || undefined;
  }

  public onChange(pokemonTypeName: string): void {
    this.changed(pokemonTypeName);
  }

  public registerOnChange(fn: any): void {
    this.changed = fn;
  }

  public registerOnTouched(fn: any): void {
    this.touched = fn;
  }
}
