import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/main-layout/main-layout.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'pokemons',
        loadChildren: () =>
          import('./domain/pokemon/adapters/primaries/pokemon.module').then(
            (m) => m.PokemonModule
          ),
      },
      {
        path: 'mission',
        loadChildren: () =>
          import('./domain/mission/adapters/primaries/mission.module').then(
            (m) => m.MissionModule
          ),
      },
    ],
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];
