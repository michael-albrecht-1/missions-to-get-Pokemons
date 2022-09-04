import { Routes } from '@angular/router';
import { MissionCreateComponent } from '../adapters/primaries/mission-create/mission-create.component';

export const MissionRoutes: Routes = [
  {
    path: '',
    children: [{ path: '', component: MissionCreateComponent }],
  },
];
