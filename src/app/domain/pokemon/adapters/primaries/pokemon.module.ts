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
import { PokemonSelectedComponent } from './pokemon-selected/pokemon-selected.component';
import { PokemonPokedexComponent } from './pokemon-pokedex/pokemon-pokedex.component';
import { PokemonsCaughtComponent } from './pokemons-caught/pokemons-caught.component';

import { NgxBootstrapIconsModule, ColorTheme } from 'ngx-bootstrap-icons';
import {
  fire,
  heart,
  globe,
  flower2,
  droplet,
  lightning,
  hurricane,
  infinity,
  magic,
  magnet,
  moon,
  snow2,
  tornado,
  virus,
  wifi,
} from 'ngx-bootstrap-icons';

// Select some icons (use an object, not an array)
const icons = {
  fire,
  flower2,
  droplet,
  lightning,
  globe,
  heart,
  moon,
  hurricane,
  infinity,
  magic,
  magnet,
  snow2,
  tornado,
  virus,
  wifi,
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    RouterModule.forChild(PokemonRoutes),
    HttpClientModule,
    NgxBootstrapIconsModule.pick(icons, {
      width: '2em',
      height: '2em',
      theme: ColorTheme.Danger,
    }),
  ],
  declarations: [
    PokemonListingComponent,
    PokemonListingItemComponent,
    PokemonDetailsComponent,
    PokemonTypesDropdownComponent,
    PokemonSelectedComponent,
    PokemonPokedexComponent,
    PokemonsCaughtComponent,
  ],
  exports: [
    PokemonSelectedComponent,
    PokemonPokedexComponent,
    PokemonsCaughtComponent,
  ],
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
