import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../../../entity/pokemon';

@Component({
  selector: 'pokemon-selected',
  templateUrl: './pokemon-selected.component.html',
  styleUrls: ['./pokemon-selected.component.scss'],
})
export class PokemonSelectedComponent {
  @Input() pokemon!: Pokemon;
  @Output() removePokemon: EventEmitter<Pokemon> = new EventEmitter();

  onRemovePokemonBtnClick() {
    this.removePokemon.emit(this.pokemon);
  }
}
