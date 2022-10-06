import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MissionSnapshot } from '../domain/entity/mission.snapshot';
import { MissionLoader } from '../usecases/loaders/mission.loader';
import { InMemoryMissionLoader } from '../adapters/secondaries/inmemory/inmemoryMission.loader';
import { MongoMissionLoader } from '../adapters/secondaries/real/mongoMission.loader';
import { SOURCES } from 'config/sources';
import { MissionStub } from '../tests/mission.stub';
import { Mission } from '../domain/entity/mission';

export class MissionDIFactory {
  static missionLoader(http: HttpClient): MissionLoader {
    switch (environment.missionSource) {
      case SOURCES.mongo:
        return new MongoMissionLoader(http);
      default:
        const mission1: Mission = new MissionStub()
          .withName('Faire des cookies !')
          .withRewards([{ name: 'Snorlax', number: '143' }])
          .build();
        const mission2: Mission = new MissionStub()
          .withName('Faire une pizza !')
          .withRewards([{ name: 'Mewtwo', number: '150' }])
          .build();
        return new InMemoryMissionLoader([mission1, mission2]);
    }
  }
}
