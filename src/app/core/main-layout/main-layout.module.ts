import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { MainRoutingModule } from './main-routing.module';
import { HeaderComponent } from './header/header.component';
import { PokemonModule } from 'src/app/domain/pokemon/adapters/primaries/pokemon.module';
import { MissionModule } from 'src/app/domain/mission/adapters/primaries/mission.module';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

@NgModule({
  declarations: [MainLayoutComponent, HeaderComponent, PageNotFoundComponent],
  imports: [CommonModule, PokemonModule, MissionModule, MainRoutingModule],
  exports: [MainLayoutComponent],
})
export class MainLayoutModule {}
