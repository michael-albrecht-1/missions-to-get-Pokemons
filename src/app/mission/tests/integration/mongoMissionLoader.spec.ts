import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { MongoMissionMapper } from '../../adapters/secondaries/real/mission.mapper';
import { MongoMissionLoader } from '../../adapters/secondaries/real/mongoMission.loader';
import { MongoMissionDTO } from '../../adapters/secondaries/real/mongoMission.DTO';
import { MissionSnapshot } from '../../domain/entity/mission.snapshot';
import { MissionLoader } from '../../domain/loaders/mission.loader';
import { MissionStub } from '../mission.stub';
import { MongoMissionDTOMock } from './MongoMissionDTOMock';
import { environment } from 'src/environments/environment';

describe('Integration | MongoMissionLoader', () => {
  const baseUrl: string = environment.mongoURL;

  it('post a mission', (done) => {
    const fakeHttpClient = { post: () => of() } as unknown as HttpClient;
    const fakeMongoResponse: MongoMissionDTO = MongoMissionDTOMock;

    const mission: MissionSnapshot = new MissionStub().build().snapshot();

    const expectedMission = MongoMissionMapper.mapToMissionDTO(mission);

    const missionLoader: MissionLoader = new MongoMissionLoader(fakeHttpClient);

    spyOn(fakeHttpClient, 'post').and.returnValue(of(fakeMongoResponse));

    missionLoader.post(mission).subscribe((mission) => {
      expect(mission.name).toEqual(mission.name);
      expect(mission.description).toEqual(mission.description);
      expect(fakeHttpClient.post).toHaveBeenCalledWith(
        `${baseUrl}/missions`,
        expectedMission
      );
      done();
    });
  });

  it('complete a mission', (done) => {
    const mission: MissionSnapshot = new MissionStub().build().snapshot();
    const missionResponse: MissionSnapshot = {
      ...mission,
      status: 'done',
    };

    const fakeHttpClient = { patch: () => of() } as unknown as HttpClient;

    const fakeMongoResponse: MongoMissionDTO = {
      ...MongoMissionMapper.mapToMissionDTO(missionResponse),
      status: 'done',
    };

    const missionLoader: MissionLoader = new MongoMissionLoader(fakeHttpClient);

    spyOn(fakeHttpClient, 'patch').and.returnValue(of(fakeMongoResponse));

    missionLoader.complete(mission).subscribe((missionApiResponse) => {
      expect(missionApiResponse.name).toEqual(missionResponse.name);
      expect(missionApiResponse.status).toEqual(missionResponse.status);
      expect(fakeHttpClient.patch).toHaveBeenCalledWith(
        `${baseUrl}/missions/complete/${mission.uuid}`,
        mission
      );
      done();
    });
  });
});
