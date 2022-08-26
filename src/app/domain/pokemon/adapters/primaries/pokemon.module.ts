import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PokemonRoutes } from '../../configuration/pokemon.routes';

import { HttpClientModule } from '@angular/common/http';
import { PokemonHandler } from '../../usecases/pokemon.handler';
import { PokemonBuilder } from '../../usecases/pokemon.builder';
import { PokemonListingComponent } from './pokemon-listing/pokemon-listing.component';
import { PokemonListingItemComponent } from './pokemon-listing/pokemon-listing-item/pokemon-listing-item.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { Pokemon } from '../../entity/pokemon';
import { InMemoryPokemonLoader } from '../secondaries/inmemoryPokemon.loader';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
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
      provide: 'PokemonHandler',
      useFactory: () => {
        const pickachu: Pokemon = new PokemonBuilder()
          .withNumber('25')
          .withName('Pickachu')
          .withDescription('Lorem Ipsum of pickachu')
          .withHeight(1.3)
          .withWeight(0.7)
          .withAvatar('http://via.placeholder.com/475px475')
          .build();
        const salameche: Pokemon = new PokemonBuilder()
          .withNumber('4')
          .withName('Salameche')
          .withDescription('Lorem Ipsum of salameche')
          .withHeight(1.7)
          .withWeight(30)
          .withAvatar('http://via.placeholder.com/475px475')
          .build();
        const mewtwo: Pokemon = new PokemonBuilder()
          .withNumber('150')
          .withName('Mewtwo')
          .withDescription('Lorem Ipsum of mewtwo')
          .withHeight(2)
          .withWeight(100)
          .withAvatar('http://via.placeholder.com/475px475')
          .build();
        return new PokemonHandler(
          new InMemoryPokemonLoader([pickachu, salameche, mewtwo])
        );
      },
    },
  ],
})
export class PokemonModule {}
