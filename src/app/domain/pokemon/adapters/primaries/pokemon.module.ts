import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PokemonRoutes } from '../../configuration/pokemon.routes';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PokemonHandler } from '../../usecases/pokemon.handler';
import { PokemonBuilder } from '../../usecases/pokemon.builder';
import { PokemonListingComponent } from './pokemon-listing/pokemon-listing.component';
import { PokemonListingItemComponent } from './pokemon-listing/pokemon-listing-item/pokemon-listing-item.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { Pokemon } from '../../entity/pokemon';
import { InMemoryPokemonLoader } from '../secondaries/inmemory/inmemoryPokemon.loader';
import { RESTPokemonLoader } from '../secondaries/real/RESTPokemon.loader';
import { PokemonDIProvider } from '../../configuration/pokemonDI.provider';
import { PokemonDIFactory } from '../../configuration/pokemonDI.factory';

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
  ],
  exports: [PokemonListingComponent, PokemonDetailsComponent],
  providers: [
    {
      provide: PokemonDIProvider.pokemonHandler,
      useFactory: (http: HttpClient) =>
        new PokemonHandler(PokemonDIFactory.pokemonLoader(http)),
      deps: [HttpClient],
    },
  ],
})
export class PokemonModule {}
