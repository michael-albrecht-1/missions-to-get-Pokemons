import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MissionSnapshot } from '../entity/mission.snapshot';
import { MissionLoader } from '../loaders/mission.loader';
import { InMemoryMissionLoader } from '../adapters/secondaries/inmemory/inmemoryMission.loader';
import { MongoMissionLoader } from '../adapters/secondaries/real/mongoMission.loader';
import { SOURCES } from 'src/config/sources';
import { MissionStub } from '../tests/mission.stub';

export class MissionDIFactory {
  static missionLoader(http: HttpClient): MissionLoader {
    switch (environment.missionSource) {
      case SOURCES.rest:
        return new MongoMissionLoader(http);
      default:
        const mission1: MissionSnapshot = new MissionStub()
          .withName('Faire des cookies !')
          .build()
          .snapshot();
        const mission2: MissionSnapshot = new MissionStub()
          .withName('Faire une pizza !')
          .build()
          .snapshot();
        return new InMemoryMissionLoader([mission1, mission2]);
    }
  }
}
