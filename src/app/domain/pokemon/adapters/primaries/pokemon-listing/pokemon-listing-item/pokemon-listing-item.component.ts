import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { map } from 'rxjs';
import { PokemonSnapshotType } from 'src/app/domain/pokemon/entity/pokemon-snapshot';
import { PokemonType } from 'src/app/domain/pokemon/entity/pokemon-type';
import { IGetPokemonsTypes } from 'src/app/domain/pokemon/usecases/IGetPokemonsTypes';

@Component({
  selector: 'pokemon-listing-item',
  templateUrl: './pokemon-listing-item.component.html',
  styleUrls: ['./pokemon-listing-item.component.scss'],
})
export class PokemonListingItemComponent implements OnInit {
  @Input() pokemon!: PokemonSnapshotType;
  @Input() isParent: boolean = false;
  @Output() addPokemon: EventEmitter<PokemonSnapshotType> = new EventEmitter();

  public currentPokemonTypes: PokemonType[] = [];

  constructor(
    @Inject('IGetPokemonTypes') private iGetPokemonsTypes: IGetPokemonsTypes
  ) {}

  ngOnInit(): void {
    this.iGetPokemonsTypes
      .execute()
      .pipe(map(this.#initCurrentPokemonTypes))
      .subscribe();
  }

  public onAddPokemonBtnClick() {
    this.addPokemon.emit(this.pokemon);
  }

  #initCurrentPokemonTypes = (pokemonTypes: PokemonType[]): PokemonType[] => {
    this.pokemon.types.forEach((typeName: string): void => {
      const pokemonType = this.#findTypeLogo(typeName, pokemonTypes);

      if (!pokemonType) {
        return;
      }

      this.currentPokemonTypes = [pokemonType, ...this.currentPokemonTypes];
    });

    return pokemonTypes;
  };

  #findTypeLogo = (
    typeName: string,
    pokemonTypes: PokemonType[]
  ): PokemonType | undefined => {
    return pokemonTypes?.find((pokemonType) => pokemonType.name === typeName);
  };
}
