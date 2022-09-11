import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PokemonRoutes } from '../../configuration/pokemon.routes';

import { HttpClientModule } from '@angular/common/http';
import { CaughtPokemonsComponent } from './caught-pokemons/caught-pokemons.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    RouterModule.forChild(PokemonRoutes),
    HttpClientModule,
  ],
  declarations: [CaughtPokemonsComponent],
  exports: [],
  providers: [],
})
export class PokemonModule {}
