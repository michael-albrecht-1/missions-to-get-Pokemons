import { Routes } from '@angular/router';
import { MissionCreateComponent } from '../adapters/primaries/mission-create/mission-create.component';
import { MissionsComponent } from '../adapters/primaries/missions/missions.component';

export const MissionRoutes: Routes = [
  {
    path: 'missions',
    children: [
      { path: '', component: MissionsComponent },
      { path: 'add', component: MissionCreateComponent },
    ],
  },
];
