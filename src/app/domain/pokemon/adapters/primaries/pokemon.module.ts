import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PokemonRoutes } from '../../configuration/pokemon.routes';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PokemonHandler } from '../../usecases/pokemon.handler';
import { PokemonListingComponent } from './pokemon-listing/pokemon-listing.component';
import { PokemonListingItemComponent } from './pokemon-listing/pokemon-listing-item/pokemon-listing-item.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokemonDIProvider } from '../../configuration/pokemonDI.provider';
import { PokemonDIFactory } from '../../configuration/pokemonDI.factory';
import { IGetPokemonsTypes } from '../../usecases/IGetPokemonsTypes';
import { PokemonTypesDIFactory } from '../../configuration/pokemonTypesDI.factory';
import { PokemonTypesDropdownComponent } from './pokemon-types-dropdown/pokemon-types-dropdown.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forChild(PokemonRoutes),
    HttpClientModule,
  ],
  declarations: [
    PokemonListingComponent,
    PokemonListingItemComponent,
    PokemonDetailsComponent,
    PokemonTypesDropdownComponent,
  ],
  exports: [PokemonListingComponent, PokemonDetailsComponent],
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
