import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../../domain/entity/pokemon';

@Component({
  selector: 'pokemon-selected',
  templateUrl: './pokemon-selected.component.html',
  styleUrls: ['./pokemon-selected.component.scss'],
})
export class PokemonSelectedComponent {
  @Input() pokemon!: Pokemon;
  @Output() removePokemon: EventEmitter<Pokemon> = new EventEmitter();

  public onRemovePokemonBtnClick() {
    this.removePokemon.emit(this.pokemon);
  }

  public getImgSrc(pokemonNumber: string): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonNumber}.svg`;
  }
}
