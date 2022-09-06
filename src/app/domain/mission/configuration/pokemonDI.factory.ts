import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MissionSnapshot } from '../entity/mission-snapshot';
import { Mission } from '../entity/mission';
import { MissionLoader } from '../loaders/mission.loader';
import { InMemoryMissionLoader } from '../adapters/secondaries/inmemory/inmemoryMission.loader';
import { MongoMissionLoader } from '../adapters/secondaries/real/mongoMission.loader';
import { SOURCES } from 'src/config/sources';

export class MissionDIFactory {
  static missionLoader(http: HttpClient): MissionLoader {
    switch (environment.missionSource) {
      case SOURCES.rest:
        return new MongoMissionLoader(http);
      default:
        const mission1: MissionSnapshot = new Mission(
          'Make cookies !',
          'Make delicious cookies with dad or mum.',
          ['Mewto']
        ).snapshot();
        return new InMemoryMissionLoader([mission1]);
    }
  }
}
