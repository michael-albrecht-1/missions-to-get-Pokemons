import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PokemonRoutes } from '../../configuration/pokemon.routes';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PokemonListingComponent } from './pokemon-listing/pokemon-listing.component';
import { PokemonListingItemComponent } from './pokemon-listing/pokemon-listing-item/pokemon-listing-item.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokemonDIFactory } from '../../configuration/pokemonDI.factory';
import { IGetPokemonsTypes } from '../../usecases/IGetPokemonsTypes';
import { PokemonTypesDIFactory } from '../../configuration/pokemonTypesDI.factory';
import { PokemonTypesDropdownComponent } from './pokemon-types-dropdown/pokemon-types-dropdown.component';
import { PokemonSelectedComponent } from './pokemon-selected/pokemon-selected.component';

import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { bootstrapIcons } from 'config/angular/bootstrap-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PokemonDIProvider } from '../../configuration/pokemonDI.provider';
import { ISearchAPokemonByNumber } from '../../usecases/ISearchAPokemonByNumber';
import { ISearchAllPokemons } from '../../usecases/ISearchAllPokemons';
import { IGetCaughtPokemons } from 'src/app/caughtPokemon/usecases/IGetCaughtPokemons';
import { CaughtPokemonDIFactory } from 'src/app/caughtPokemon/configuration/pokemonDI.factory';
import { PokemonCaughtDIProvider } from 'src/app/caughtPokemon/configuration/pokemonDI.provider';
import { PokemonDetailMiniatureComponent } from './pokemon-detail-miniature/pokemon-detail-miniature.component';

// Select some icons (use an object, not an array)
const icons = bootstrapIcons;

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forChild(PokemonRoutes),
    HttpClientModule,
    NgxBootstrapIconsModule.pick(icons, {
      width: '2em',
      height: '2em',
    }),
    NgbModule,
  ],
  declarations: [
    PokemonListingComponent,
    PokemonListingItemComponent,
    PokemonDetailsComponent,
    PokemonTypesDropdownComponent,
    PokemonSelectedComponent,
    PokemonDetailMiniatureComponent,
  ],
  exports: [
    PokemonSelectedComponent,
    PokemonListingComponent,
    PokemonDetailMiniatureComponent,
  ],
  providers: [
    {
      provide: PokemonDIProvider.iSearchAPokemonByNumber,
      useFactory: (http: HttpClient) =>
        new ISearchAPokemonByNumber(PokemonDIFactory.pokemonLoader(http)),
      deps: [HttpClient],
    },
    {
      provide: PokemonDIProvider.iSearchAllPokemons,
      useFactory: (http: HttpClient) =>
        new ISearchAllPokemons(PokemonDIFactory.pokemonLoader(http)),
      deps: [HttpClient],
    },
    {
      provide: PokemonDIProvider.iGetPokemonTypes,
      useFactory: () =>
        new IGetPokemonsTypes(PokemonTypesDIFactory.pokemonTypesLoader()),
    },
    {
      provide: PokemonCaughtDIProvider.iGetCaughtPokemons,
      useFactory: (http: HttpClient) =>
        new IGetCaughtPokemons(
          CaughtPokemonDIFactory.pokemonCaughtLoader(http)
        ),
      deps: [HttpClient],
    },
  ],
})
export class PokemonModule {}
