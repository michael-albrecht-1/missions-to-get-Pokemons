import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MissionCreateComponent } from './mission-create/mission-create.component';
import { MissionRoutes } from '../../configuration/mission.routes';
import { ICreateAMission } from '../../usecases/ICreateAMission';
import { MissionDIProvider } from '../../configuration/pokemonDI.provider';
import { MissionDIFactory } from '../../configuration/pokemonDI.factory';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forChild(MissionRoutes),
    HttpClientModule,
  ],
  declarations: [MissionCreateComponent],
  exports: [MissionCreateComponent],
  providers: [
    {
      provide: MissionDIProvider.ICreateAMission,
      useFactory: (http: HttpClient) =>
        new ICreateAMission(MissionDIFactory.missionLoader(http)),
      deps: [HttpClient],
    },
  ],
})
export class MissionModule {}
