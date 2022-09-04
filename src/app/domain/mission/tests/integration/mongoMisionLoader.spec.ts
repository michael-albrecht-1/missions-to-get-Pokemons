import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { MongoMissionLoader } from '../../adapters/secondaries/real/mongoMission.loader';
import { MongoMissionDTO } from '../../adapters/secondaries/real/mongoMissionDTO';
import { Mission } from '../../entity/mission';
import { MissionSnapshot } from '../../entity/mission-snapshot';
import { MissionLoader } from '../../loaders/mission.loader';
import { ICreateAMission } from '../../usecases/ICreateAMission';
import { MongoMissionDTOMock } from './MongoMissionDTOMock';

describe('Integration | MongoMissionLoader', () => {
  it('post a mission', (done) => {
    const fakeHttpClient = { get: () => of() } as unknown as HttpClient;
    const fakeMongoResponse: MongoMissionDTO = MongoMissionDTOMock;

    const expectedMission: MissionSnapshot = new Mission(
      'ti',
      'desc',
      []
    ).snapshot();

    const missionLoader: MissionLoader = new MongoMissionLoader(fakeHttpClient);
    const iCreateMission: ICreateAMission = new ICreateAMission(missionLoader);

    spyOn(fakeHttpClient, 'post').and.returnValue(of(fakeMongoResponse));

    iCreateMission.execute('ti', 'desc', []).subscribe((mission) => {
      expect(mission).toEqual(expectedMission);
      expect(fakeHttpClient.get).toHaveBeenCalledWith(
        `https://pokeapi.co/api/v2/pokemon/1`
      );
      done();
    });
  });
});
