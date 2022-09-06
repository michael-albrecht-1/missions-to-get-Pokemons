import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { first, map } from 'rxjs';
import { PokemonSnapshotType } from '../../../entity/pokemon-snapshot';
import { PokemonHandler } from '../../../usecases/pokemon.handler';

@Component({
  selector: 'pokemon-pokedex',
  templateUrl: './pokemon-pokedex.component.html',
  styleUrls: ['./pokemon-pokedex.component.scss'],
})
export class PokemonPokedexComponent implements OnInit {
  @Input() isParent: boolean = false;
  @Output() addPokemon: EventEmitter<PokemonSnapshotType> = new EventEmitter();

  pokemons!: PokemonSnapshotType[];

  constructor(
    @Inject('PokemonHandler') private pokemonHandler: PokemonHandler
  ) {}

  ngOnInit(): void {
    this.pokemonHandler
      .all()
      .pipe(
        first(),
        map((pokemons: PokemonSnapshotType[]) => (this.pokemons = pokemons))
      )
      .subscribe();
  }

  onAddPokemon(event: any) {
    console.warn(event);
    this.addPokemon.emit(event);
  }
}
