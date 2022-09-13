import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { MongoMissionMapper } from '../../adapters/secondaries/real/mission.mapper';
import { MongoMissionLoader } from '../../adapters/secondaries/real/mongoMission.loader';
import { MongoMissionDTO } from '../../adapters/secondaries/real/mongoMissionDTO';
import { MissionSnapshot } from '../../entity/mission.snapshot';
import { MissionLoader } from '../../loaders/mission.loader';
import { MissionStatus } from '../../shared/MissionStatus';
import { MissionStub } from '../mission.stub';
import { MongoMissionDTOMock } from './MongoMissionDTOMock';

describe('Integration | MongoMissionLoader', () => {
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
        `http://localhost:5500/missions`,
        expectedMission
      );
      done();
    });
  });

  it('complete a mission', (done) => {
    const mission: MissionSnapshot = new MissionStub().build().snapshot();
    const missionResponse: MissionSnapshot = {
      ...mission,
      status: MissionStatus.done,
    };

    const fakeHttpClient = { patch: () => of() } as unknown as HttpClient;

    const fakeMongoResponse: MongoMissionDTO = {
      ...MongoMissionMapper.mapToMissionDTO(missionResponse),
      status: MissionStatus.done,
    };

    const missionLoader: MissionLoader = new MongoMissionLoader(fakeHttpClient);

    spyOn(fakeHttpClient, 'patch').and.returnValue(of(fakeMongoResponse));

    missionLoader.complete(mission).subscribe((missionApiResponse) => {
      expect(missionApiResponse.name).toEqual(missionResponse.name);
      expect(missionApiResponse.status).toEqual(missionResponse.status);
      expect(fakeHttpClient.patch).toHaveBeenCalledWith(
        `http://localhost:5500/missions/complete/${mission.uuid}`,
        mission
      );
      done();
    });
  });
});
