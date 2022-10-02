import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/pokedex',
    pathMatch: 'full',
  },
  {
    path: 'pokedex',
    loadChildren: () =>
      import('../../../pokemon/adapters/primaries/pokemon.module').then(
        (m) => m.PokemonModule
      ),
  },
  {
    path: 'missions',
    loadChildren: () =>
      import('../../../mission/adapters/primaries/mission.module').then(
        (m) => m.MissionModule
      ),
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
