import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonSnapshotType } from 'src/app/domain/pokemon/entity/pokemon-snapshot';

@Component({
  selector: 'pokemon-selected',
  templateUrl: './pokemon-selected.component.html',
  styleUrls: ['./pokemon-selected.component.scss'],
})
export class PokemonSelectedComponent {
  @Input() pokemon!: PokemonSnapshotType;
  @Output() removePokemon: EventEmitter<PokemonSnapshotType> =
    new EventEmitter();

  onRemovePokemonBtnClick() {
    this.removePokemon.emit(this.pokemon);
  }
}
