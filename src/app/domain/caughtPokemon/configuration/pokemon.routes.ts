import { Routes } from '@angular/router';
import { CaughtPokemonsComponent } from '../adapters/primaries/caught-pokemons/caught-pokemons.component';

export const PokemonRoutes: Routes = [
  {
    path: 'caughtPokemons',
    children: [{ path: '', component: CaughtPokemonsComponent }],
  },
];
