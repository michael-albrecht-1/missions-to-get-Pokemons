import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PokemonModule } from './domain/pokemon/adapters/primaries/pokemon.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MissionModule } from './domain/mission/adapters/primaries/mission.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    PokemonModule,
    MissionModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
    ]),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
