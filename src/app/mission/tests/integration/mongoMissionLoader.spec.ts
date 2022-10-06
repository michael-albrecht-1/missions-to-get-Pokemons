import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { MongoMissionMapper } from '../../adapters/secondaries/real/mission.mapper';
import { MongoMissionLoader } from '../../adapters/secondaries/real/mongoMission.loader';
import { MongoMissionDTO } from '../../adapters/secondaries/real/mongoMission.DTO';
import { MissionLoader } from '../../usecases/loaders/mission.loader';
import { MissionStub } from '../mission.stub';
import { MongoMissionDTOMock } from './MongoMissionDTOMock';
import { environment } from 'src/environments/environment';
import { Mission } from '../../domain/entity/mission';

describe('Integration | MongoMissionLoader', () => {
  const baseUrl: string = environment.mongoURL;

  it('post a mission', (done) => {
    const fakeHttpClient = { post: () => of() } as unknown as HttpClient;
    const fakeMongoResponse: MongoMissionDTO = MongoMissionDTOMock;

    const mission: Mission = new MissionStub().build();

    const expectedMission = MongoMissionMapper.mapToMissionDTO(mission);

    const missionLoader: MissionLoader = new MongoMissionLoader(fakeHttpClient);

    spyOn(fakeHttpClient, 'post').and.returnValue(of(fakeMongoResponse));

    missionLoader.post(mission).subscribe((mission) => {
      expect(mission.snapshot()).toEqual(mission.snapshot());
      expect(fakeHttpClient.post).toHaveBeenCalledWith(
        `${baseUrl}/missions`,
        expectedMission
      );
      done();
    });
  });

  it('complete a mission', (done) => {
    const mission: Mission = new MissionStub().build();
    const missionResponse: Mission = new MissionStub('done').build();

    const fakeHttpClient = { patch: () => of() } as unknown as HttpClient;

    const fakeMongoResponse: MongoMissionDTO = {
      ...MongoMissionMapper.mapToMissionDTO(missionResponse),
    };

    const missionLoader: MissionLoader = new MongoMissionLoader(fakeHttpClient);

    spyOn(fakeHttpClient, 'patch').and.returnValue(of(fakeMongoResponse));

    missionLoader.complete(mission).subscribe((missionApiResponse) => {
      expect(mission.snapshot()).toEqual(mission.snapshot());
      expect(fakeHttpClient.patch).toHaveBeenCalledWith(
        `${baseUrl}/missions/complete/${mission.snapshot().uuid}`,
        mission
      );
      done();
    });
  });
});
