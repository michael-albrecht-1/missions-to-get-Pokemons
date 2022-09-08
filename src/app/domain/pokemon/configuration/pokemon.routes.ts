import { Routes } from '@angular/router';
import { PokemonDetailsComponent } from '../adapters/primaries/pokemon-details/pokemon-details.component';
import { PokemonListingComponent } from '../adapters/primaries/pokemon-listing/pokemon-listing.component';
import { PokemonPokedexComponent } from '../adapters/primaries/pokemon-pokedex/pokemon-pokedex.component';

export const PokemonRoutes: Routes = [
  {
    path: 'pokedex',
    children: [
      { path: '', component: PokemonPokedexComponent },
      { path: ':number', component: PokemonDetailsComponent },
    ],
  },
];
