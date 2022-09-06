import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PokemonRoutes } from '../../configuration/pokemon.routes';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PokemonHandler } from '../../usecases/pokemon.handler';
import { PokemonDIProvider } from '../../configuration/pokemonDI.provider';
import { PokemonDIFactory } from '../../configuration/pokemonDI.factory';
import { IGetPokemonsTypes } from '../../usecases/IGetPokemonsTypes';
import { PokemonTypesDIFactory } from '../../configuration/pokemonTypesDI.factory';
import { CaughtPokemonsComponent } from './caught-pokemons/caught-pokemons.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    RouterModule.forChild(PokemonRoutes),
    HttpClientModule,
  ],
  declarations: [
    CaughtPokemonsComponent
  ],
  exports: [],
  providers: [
    {
      provide: PokemonDIProvider.pokemonHandler,
      useFactory: (http: HttpClient) =>
        new PokemonHandler(PokemonDIFactory.pokemonLoader(http)),
      deps: [HttpClient],
    },
    {
      provide: PokemonDIProvider.iGetPokemonTypes,
      useFactory: () =>
        new IGetPokemonsTypes(PokemonTypesDIFactory.pokemonTypesLoader()),
    },
  ],
})
export class PokemonModule {}
