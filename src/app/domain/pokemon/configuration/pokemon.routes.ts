import { Routes } from '@angular/router';
import { PokemonDetailsComponent } from '../adapters/primaries/pokemon-details/pokemon-details.component';
import { PokemonListingComponent } from '../adapters/primaries/pokemon-listing/pokemon-listing.component';

export const PokemonRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: PokemonListingComponent },
      { path: ':number', component: PokemonDetailsComponent },
    ],
  },
];
