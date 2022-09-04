import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PokemonModule } from './domain/pokemon/adapters/primaries/pokemon.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MissionModule } from './domain/mission/adapters/primaries/mission.module';
import { MainLayoutModule } from './core/main-layout/main-layout.module';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    FormsModule,
    PokemonModule,
    MissionModule,
    MainLayoutModule,
    RouterModule.forChild(routes),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
