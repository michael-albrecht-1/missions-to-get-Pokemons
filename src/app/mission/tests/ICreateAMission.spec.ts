import { InMemoryMissionLoader } from '../adapters/secondaries/inmemory/inmemoryMission.loader';
import { MissionSnapshot } from '../domain/entity/mission.snapshot';
import { ICreateAMission } from '../usecases/ICreateAMission';
import { MissionStub } from './mission.stub';

describe('As a parent, I create a mission', () => {
  const expectedResult = new MissionStub().build().snapshot();

  beforeEach(() => {});

  it('that contain an uuid, a name, a descrition and a list of rewards', (done) => {
    const { name, description, rewards } = expectedResult;

    const missionSource = new InMemoryMissionLoader([]);

    new ICreateAMission(missionSource)
      .execute(name, description, rewards)
      .subscribe((mission: MissionSnapshot) => {
        expect(mission.name).toBe(expectedResult.name);
        expect(mission.description).toBe(expectedResult.description);
        expect(mission.rewards).toBe(expectedResult.rewards);
        done();
      });
  });
});
