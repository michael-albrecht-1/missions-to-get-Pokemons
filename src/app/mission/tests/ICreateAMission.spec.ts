import { InMemoryMissionLoader } from '../adapters/secondaries/inmemory/inmemoryMission.loader';
import { Mission } from '../domain/entity/mission';
import { ICreateAMission } from '../usecases/ICreateAMission';
import { MissionStub } from './mission.stub';

describe('As a parent, I create a mission', () => {
  const expectedResult = new MissionStub().build();

  beforeEach(() => {});

  it('that contain an uuid, a name, a descrition and a list of rewards', (done) => {
    const { name, description, rewards } = expectedResult.snapshot();

    const missionSource = new InMemoryMissionLoader([]);

    new ICreateAMission(missionSource)
      .execute(name, description, rewards)
      .subscribe((mission: Mission) => {
        expect(mission.snapshot().name).toEqual(expectedResult.snapshot().name);
        expect(mission.snapshot().description).toEqual(
          expectedResult.snapshot().description
        );
        expect(mission.snapshot().rewards).toEqual(
          expectedResult.snapshot().rewards
        );
        done();
      });
  });
});
