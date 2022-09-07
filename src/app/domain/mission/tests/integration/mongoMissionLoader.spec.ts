import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { MongoMissionMapper } from '../../adapters/secondaries/real/mission.mapper';
import { MongoMissionLoader } from '../../adapters/secondaries/real/mongoMission.loader';
import { MongoMissionDTO } from '../../adapters/secondaries/real/mongoMissionDTO';
import { Mission } from '../../entity/mission';
import { MissionSnapshot } from '../../entity/mission.snapshot';
import { MissionLoader } from '../../loaders/mission.loader';
import { MongoMissionDTOMock } from './MongoMissionDTOMock';

describe('Integration | MongoMissionLoader', () => {
  it('post a mission', (done) => {
    const fakeHttpClient = { post: () => of() } as unknown as HttpClient;
    const fakeMongoResponse: MongoMissionDTO = MongoMissionDTOMock;

    const mission: MissionSnapshot = new Mission(
      MongoMissionDTOMock.title,
      MongoMissionDTOMock.description,
      ['pikachu']
    ).snapshot();

    const expectedMission = MongoMissionMapper.mapToMissionDTO(mission);

    const missionLoader: MissionLoader = new MongoMissionLoader(fakeHttpClient);

    spyOn(fakeHttpClient, 'post').and.returnValue(of(fakeMongoResponse));

    missionLoader.post(mission).subscribe((mission) => {
      expect(mission.name).toEqual(mission.name);
      expect(mission.description).toEqual(mission.description);
      expect(fakeHttpClient.post).toHaveBeenCalledWith(
        `http://localhost:5500/missions`,
        expectedMission
      );
      done();
    });
  });
});
